jest.mock('@/services/auth/api', () => ({
  getRequestUserId: jest.fn(),
}));

jest.mock('@/services/database/firestore-repository', () => ({
  getUserById: jest.fn(),
}));

jest.mock('@/lib/stripe', () => ({
  isStripeConfigured: jest.fn(),
  createCheckoutSession: jest.fn(),
}));

jest.mock('@/lib/mor', () => ({
  isMorConfigured: jest.fn(),
  morCheckoutUrlFor: jest.fn(),
}));

import { getRequestUserId } from '@/services/auth/api';
import { getUserById } from '@/services/database/firestore-repository';
import { isStripeConfigured, createCheckoutSession } from '@/lib/stripe';
import { isMorConfigured, morCheckoutUrlFor } from '@/lib/mor';
import { POST } from '@/app/api/checkout/route';

function postCheckout(region?: string): Promise<Response> {
  const url = new URL('http://localhost:3000/api/checkout');
  if (region) url.searchParams.set('region', region);
  return POST(new Request(url, { method: 'POST' }));
}

const activeUser = { id: 42, email: 'student@sei.org', plan: 'free', status: 'active' };

describe('Checkout API — sélection du processeur (MOR > Stripe > 503)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getRequestUserId as jest.Mock).mockResolvedValue(42);
    (getUserById as jest.Mock).mockResolvedValue(activeUser);
  });

  it('redirige vers l’URL MOR quand le MOR est configuré (aucun appel Stripe)', async () => {
    (isMorConfigured as jest.Mock).mockReturnValue(true);
    (morCheckoutUrlFor as jest.Mock).mockReturnValue('https://gumroad.com/l/summit-premium-ma');

    const resp = await postCheckout('ma');
    expect(resp.status).toBe(200);
    await expect(resp.json()).resolves.toEqual({
      url: 'https://gumroad.com/l/summit-premium-ma',
    });
    expect(morCheckoutUrlFor).toHaveBeenCalledWith('ma');
    expect(isStripeConfigured).not.toHaveBeenCalled();
    expect(createCheckoutSession).not.toHaveBeenCalled();
  });

  it('bascule sur Stripe si le MOR n’est pas configuré', async () => {
    (isMorConfigured as jest.Mock).mockReturnValue(false);
    (isStripeConfigured as jest.Mock).mockReturnValue(true);
    (createCheckoutSession as jest.Mock).mockResolvedValue({
      id: 'cs_test_1',
      url: 'https://checkout.stripe.com/pay/cs_test_1',
    });

    const resp = await postCheckout('eu');
    expect(resp.status).toBe(200);
    await expect(resp.json()).resolves.toEqual({
      url: 'https://checkout.stripe.com/pay/cs_test_1',
    });
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 42, email: 'student@sei.org', region: 'eu' })
    );
  });

  it('renvoie 503 en mode waitlist si ni MOR ni Stripe ne sont configurés', async () => {
    (isMorConfigured as jest.Mock).mockReturnValue(false);
    (isStripeConfigured as jest.Mock).mockReturnValue(false);

    const resp = await postCheckout();
    expect(resp.status).toBe(503);
  });

  it('refuse un utilisateur premium (409)', async () => {
    (getUserById as jest.Mock).mockResolvedValue({ ...activeUser, plan: 'premium' });

    const resp = await postCheckout('eu');
    expect(resp.status).toBe(409);
    expect(isMorConfigured).not.toHaveBeenCalled();
    expect(isStripeConfigured).not.toHaveBeenCalled();
  });

  it('refuse un utilisateur non authentifié (401)', async () => {
    (getRequestUserId as jest.Mock).mockResolvedValue(null);

    const resp = await postCheckout('eu');
    expect(resp.status).toBe(401);
    expect(isMorConfigured).not.toHaveBeenCalled();
  });
});