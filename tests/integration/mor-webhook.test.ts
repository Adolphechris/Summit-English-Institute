import { createHmac } from 'node:crypto';

jest.mock('@/services/database/firestore-repository', () => ({
  getUserById: jest.fn(),
  getUserByEmail: jest.fn(),
  updateUser: jest.fn(),
}));

import {
  getUserById,
  getUserByEmail,
  updateUser,
} from '@/services/database/firestore-repository';
import { POST } from '@/app/api/webhooks/mor/route';
import { verifyMorWebhookSignature } from '@/lib/mor';

const mockSecret = 'test_webhook_secret_12345';

function makeSignedRequest(body: string, secret = mockSecret, signatureHeaderName = 'x-signature') {
  const hmac = createHmac('sha256', secret);
  const signature = hmac.update(body).digest('hex');

  return new Request('http://localhost:3000/api/webhooks/mor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [signatureHeaderName]: signature,
    },
    body,
  });
}

describe('Webhook MOR — /api/webhooks/mor (Lemon Squeezy & Gumroad)', () => {
  const originalSecret = process.env.MOR_WEBHOOK_SECRET;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.MOR_WEBHOOK_SECRET = mockSecret;
  });

  afterAll(() => {
    process.env.MOR_WEBHOOK_SECRET = originalSecret;
  });

  it('vérifie la signature HMAC correctement', () => {
    const payload = JSON.stringify({ test: 'data' });
    const hmac = createHmac('sha256', mockSecret).update(payload).digest('hex');
    expect(verifyMorWebhookSignature(payload, hmac, mockSecret)).toBe(true);
    expect(verifyMorWebhookSignature(payload, 'wrong_signature', mockSecret)).toBe(false);
  });

  it('active Premium pour un événement Lemon Squeezy payé avec userId', async () => {
    const targetUser = { id: 77, email: 'student@summit.org', plan: 'free', status: 'active' };
    (getUserById as jest.Mock).mockResolvedValue(targetUser);

    const payload = JSON.stringify({
      meta: {
        event_name: 'order_created',
        custom_data: { user_id: '77' },
      },
      data: {
        id: 'ls_order_1001',
        type: 'orders',
        attributes: {
          user_email: 'student@summit.org',
          status: 'paid',
          total: 2900,
          currency: 'EUR',
        },
      },
    });

    const req = makeSignedRequest(payload);
    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.received).toBe(true);
    expect(data.updated).toBe(true);
    expect(data.userId).toBe(77);

    expect(updateUser).toHaveBeenCalledWith(77, expect.objectContaining({
      plan: 'premium',
      premiumOrderId: 'ls_order_1001',
      premiumSource: 'mor',
    }));
  });

  it('active Premium pour un événement Gumroad via email', async () => {
    const targetUser = { id: 88, email: 'gumroad.student@summit.org', plan: 'free', status: 'active' };
    (getUserById as jest.Mock).mockResolvedValue(null);
    (getUserByEmail as jest.Mock).mockResolvedValue(targetUser);

    const payload = JSON.stringify({
      sale_id: 'gum_sale_999',
      email: 'gumroad.student@summit.org',
      price: 19900,
      currency: 'MAD',
      refunded: false,
    });

    const req = makeSignedRequest(payload);
    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(updateUser).toHaveBeenCalledWith(88, expect.objectContaining({
      plan: 'premium',
      premiumOrderId: 'gum_sale_999',
      premiumSource: 'mor',
    }));
  });

  it('respecte l\'idempotence si la même commande est reçue deux fois', async () => {
    const alreadyPremiumUser = {
      id: 77,
      email: 'student@summit.org',
      plan: 'premium',
      premiumOrderId: 'ls_order_1001',
    };
    (getUserById as jest.Mock).mockResolvedValue(alreadyPremiumUser);

    const payload = JSON.stringify({
      meta: { event_name: 'order_created', custom_data: { user_id: '77' } },
      data: { id: 'ls_order_1001', type: 'orders', attributes: { status: 'paid' } },
    });

    const req = makeSignedRequest(payload);
    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.alreadyProcessed).toBe(true);
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('rejette les requêtes avec signature invalide (401)', async () => {
    const req = new Request('http://localhost:3000/api/webhooks/mor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': 'signature_invalide',
      },
      body: JSON.stringify({ test: 'payload' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('FAIL-CLOSED : refuse les webhooks si aucun secret n’est configuré (503)', async () => {
    const original = process.env.MOR_WEBHOOK_SECRET;
    delete process.env.MOR_WEBHOOK_SECRET;

    try {
      // Signature même valide côté payload, mais aucun secret de config → refus.
      const hmac = createHmac('sha256', mockSecret);
      const fakeSignature = hmac.update('{}').digest('hex');
      const req = new Request('http://localhost:3000/api/webhooks/mor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-signature': fakeSignature,
        },
        body: '{}',
      });

      const res = await POST(req);
      expect(res.status).toBe(503);
      expect(updateUser).not.toHaveBeenCalled();
    } finally {
      process.env.MOR_WEBHOOK_SECRET = original;
    }
  });
});
