import { createHmac } from 'crypto';
import { NextResponse } from 'next/server';

jest.mock('@/lib/config', () => ({
  config: { app: { url: 'http://localhost:3000', apiUrl: 'http://localhost:3000/api' }, payments: { stripeWebhookSecret: 'whsec_integration_test', stripeSecretKey: '', cmi: {} } },
}));

jest.mock('@/services/database/firestore-repository', () => ({
  getUserById: jest.fn(),
  updateUser: jest.fn(),
}));

import { config } from '@/lib/config';
import { getUserById, updateUser } from '@/services/database/firestore-repository';
import { POST } from '@/app/api/webhooks/stripe/route';

const WEBHOOK_SECRET = config.payments.stripeWebhookSecret!;

function sign(payload: string, timestamp: number): string {
  const sig = createHmac('sha256', WEBHOOK_SECRET).update(`${timestamp}.${payload}`).digest('hex');
  return `t=${timestamp},v1=${sig}`;
}

/** Envelopper une session comme le fait réellement Stripe (type + data.object). */
function envelope(session: Record<string, unknown>): string {
  return JSON.stringify({ type: 'checkout.session.completed', data: { object: session } });
}

async function callWebhook(payload: string, header: string): Promise<{ status: number; body: any }> {

  const req = new Request('http://localhost:3000/api/webhooks/stripe', {
    method: 'POST',
    headers: { 'stripe-signature': header },
    body: payload,
  });
  const resp = await POST(req as any);
  const data = await resp.json();
  return { status: resp.status, body: data };
}

describe('Stripe webhook — checkout.session.completed (intégration)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('active le plan Premium sur paiement vérifié (idempotent OK)', async () => {
    const session = {
      id: 'cs_test_abc123',
      object: 'checkout.session',
      payment_status: 'paid',
      status: 'complete',
      client_reference_id: '42',
      metadata: { userId: '42', plan: 'premium', region: 'eu', currency: 'EUR' },
    };

    const payload = envelope(session);
    const header = sign(payload, Math.floor(Date.now() / 1000));

    // l'utilisateur existe mais n'a pas encore été mis à jour par ce paiement
    (getUserById as jest.Mock).mockResolvedValue({ id: 42, plan: 'free' });
    (updateUser as jest.Mock).mockResolvedValue(true);

    const { status, body } = await callWebhook(payload, header);

    expect(status).toBe(200);
    expect(body).toEqual({ received: true });
    expect(updateUser).toHaveBeenCalledTimes(1);
    expect(updateUser).toHaveBeenCalledWith(42, expect.objectContaining({
      plan: 'premium',
      premiumOrderId: 'cs_test_abc123',
      premiumSource: 'stripe',
      premiumSince: expect.any(String),
    }));
  });

  it('idempotent : ne réactive pas si premiumOrderId déjà égal à la session', async () => {
    const session = { id: 'cs_test_dedup', payment_status: 'paid', status: 'complete', client_reference_id: '7' };
    const payload = envelope(session);
    const header = sign(payload, Math.floor(Date.now() / 1000));

    (getUserById as jest.Mock).mockResolvedValue({ id: 7, plan: 'premium', premiumOrderId: 'cs_test_dedup' });

    const { status } = await callWebhook(payload, header);
    expect(status).toBe(200);
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('refuse une signature invalide (400) et n’appelle pas updateUser', async () => {
    const payload = JSON.stringify({ id: 'cs_x' });
    const { status, body } = await callWebhook(payload, 't=12345,v1=deadbeef');

    expect(status).toBe(400);
    expect(getUserById).not.toHaveBeenCalled();
    expect(body).toEqual({ error: 'Signature invalide' });
  });

  it('refuse un paiement non soldé (payment_status != paid)', async () => {
    const session = { id: 'cs_y', payment_status: 'unpaid', status: 'open', client_reference_id: '9' };
    const payload = envelope(session);
    const header = sign(payload, Math.floor(Date.now() / 1000));

    const { status } = await callWebhook(payload, header);
    expect(status).toBe(200); // reçu mais non traité
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('410/503 si STRIPE_WEBHOOK_SECRET absent', async () => {
    const original = config.payments.stripeWebhookSecret;
    (config.payments as any).stripeWebhookSecret = '';
    try {
      const payload = JSON.stringify({ type: 'checkout.session.completed' });
      const { status, body } = await callWebhook(payload, 't=1,v1=x');
      expect(status).toBe(503);
      expect(body).toEqual({ error: 'Webhook non configuré' });
    } finally {
      (config.payments as any).stripeWebhookSecret = original;
    }
  });
});
