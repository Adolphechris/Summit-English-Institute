// ============================================================================
// Stripe — intégration SANS SDK (API REST via fetch, convention zéro dépendance)
// - createCheckoutSession : Stripe Checkout (mode paiement unique)
// - verifyStripeSignature : vérification HMAC-SHA256 du webhook (node:crypto)
// ============================================================================

import { createHmac, timingSafeEqual } from 'crypto';
import { config } from './config';
import { PREMIUM } from './pricing';
import { pricingFor, RegionKey } from './pricing';

const STRIPE_API = 'https://api.stripe.com/v1';

export function isStripeConfigured(): boolean {
  return Boolean(config.payments.stripeSecretKey);
}

export interface CheckoutSessionResult {
  id: string;
  url: string;
}

/** Créer une Stripe Checkout Session (paiement unique Premium). */
export async function createCheckoutSession(params: {
  userId: number;
  email: string;
  region?: RegionKey;
  successUrl: string;
  cancelUrl: string;
}): Promise<CheckoutSessionResult> {
  const secret = config.payments.stripeSecretKey;
  if (!secret) {
    throw new Error('STRIPE_SECRET_KEY manquant');
  }

  const regionPricing = pricingFor(params.region ?? 'eu');

  const body = new URLSearchParams();
  body.set('mode', 'payment');
  body.set('success_url', params.successUrl);
  body.set('cancel_url', params.cancelUrl);
  body.set('client_reference_id', String(params.userId));
  body.set('customer_email', params.email);
  body.set('metadata[userId]', String(params.userId));
  body.set('metadata[plan]', 'premium');
  body.set('metadata[region]', regionPricing.key);
  body.set('metadata[currency]', regionPricing.currency);
  body.set('line_items[0][quantity]', '1');
  body.set('line_items[0][price_data][currency]', regionPricing.currency);
  body.set('line_items[0][price_data][unit_amount]', String(regionPricing.priceCents));
  body.set('line_items[0][price_data][product_data][name]', PREMIUM.name);
  body.set('line_items[0][price_data][product_data][description]', PREMIUM.description);


  const res = await fetch(`${STRIPE_API}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = (await res.json().catch(() => ({}))) as {
    id?: string;
    url?: string;
    error?: { message?: string };
  };

  if (!res.ok || !data.id || !data.url) {
    throw new Error(data.error?.message || 'Erreur lors de la création de la session de paiement');
  }

  return { id: data.id, url: data.url };
}

/**
 * Vérifier la signature d'un webhook Stripe.
 * Format attendu de l'en-tête `stripe-signature` : `t=<ts>,v1=<sig>[,v1=<sig>…]`
 * Signée = HMAC-SHA256(secret, `${t}.${payload}`), tolérance d'horloge 5 min.
 */
export function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string,
  toleranceSeconds = 300
): boolean {
  if (!payload || !header || !secret) return false;

  let timestamp = '';
  const signatures: string[] = [];
  for (const part of header.split(',')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key === 't') timestamp = value;
    else if (key === 'v1') signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) return false;

  const ts = parseInt(timestamp, 10);
  if (!Number.isFinite(ts)) return false;
  const age = Math.abs(Date.now() / 1000 - ts);
  if (age > toleranceSeconds) return false;

  const expected = createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex');
  const expectedBuf = Buffer.from(expected, 'hex');

  return signatures.some((sig) => {
    try {
      const sigBuf = Buffer.from(sig, 'hex');
      return sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf);
    } catch {
      return false;
    }
  });
}
