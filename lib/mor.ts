// ============================================================================
// Merchant of Record (Gumroad / Lemon Squeezy / Paddle) — ADAPTER & SECURITY
//
// Solution d'encaissement SANS compte bancaire local :
//  - Le MOR encaisse le client (toutes devises), gère TVA, fraude, remboursements.
//  - Le MOR délègue le paiement client (PCI) → aucun numéro de carte manipulé ici.
//  - Le MOR reverse ensuite vers un compte Payoneer (carte Mastercard Payoneer
//    = dépense directe, retrait ATM) → zéro IBAN / zéro banque par pays.
// ============================================================================

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { RegionKey } from './pricing';

/** Variables d'environnement attendues pour chaque région. */
export const MOR_REGION_ENV: Record<RegionKey, string> = {
  eu: 'MOR_CHECKOUT_URL_EU',
  ma: 'MOR_CHECKOUT_URL_MA',
  af: 'MOR_CHECKOUT_URL_AF',
  ca: 'MOR_CHECKOUT_URL_CA',
  us: 'MOR_CHECKOUT_URL_US',
};

/** Le MOR est-il configuré ? (le fallback global est la configuration minimale). */
export function isMorConfigured(): boolean {
  return Boolean(process.env.MOR_CHECKOUT_URL_FALLBACK);
}

/** URL de paiement MOR pour une région (spécifique si définie, sinon fallback). */
export function morCheckoutUrlFor(region: RegionKey): string {
  return process.env[MOR_REGION_ENV[region]] || process.env.MOR_CHECKOUT_URL_FALLBACK || '';
}

/** Secret pour valider les webhooks MOR (Lemon Squeezy / Gumroad). */
export function getMorWebhookSecret(): string {
  return process.env.MOR_WEBHOOK_SECRET || process.env.LEMONSQUEEZY_WEBHOOK_SECRET || process.env.GUMROAD_WEBHOOK_SECRET || '';
}

/**
 * Vérifie la signature HMAC SHA-256 d'un webhook Merchant of Record (ex. Lemon Squeezy).
 */
export function verifyMorWebhookSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  secret?: string
): boolean {
  const webhookSecret = secret || getMorWebhookSecret();
  if (!webhookSecret) {
    // Si aucun secret n'est configuré en dev/test
    return false;
  }

  if (!signatureHeader || typeof signatureHeader !== 'string') {
    return false;
  }

  try {
    const hmac = createHmac('sha256', webhookSecret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signature = Buffer.from(signatureHeader.trim(), 'utf8');

    if (digest.length !== signature.length) {
      return false;
    }

    return timingSafeEqual(digest, signature);
  } catch {
    return false;
  }
}

export interface ParsedMorEvent {
  provider: 'lemon_squeezy' | 'gumroad' | 'generic';
  eventName: string;
  orderId: string;
  email: string;
  userId?: number | null;
  amountCents?: number;
  currency?: string;
  status: 'paid' | 'refunded' | 'failed' | 'other';
}

/**
 * Extrait les informations standardisées d'un événement webhook MOR (Lemon Squeezy ou Gumroad).
 */
export function parseMorWebhookPayload(payload: any): ParsedMorEvent | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  // 1. Format Lemon Squeezy
  if (payload.meta && payload.data && payload.data.type === 'orders') {
    const attributes = payload.data.attributes || {};
    const customData = payload.meta.custom_data || {};
    const eventName = payload.meta.event_name || 'order_created';
    const statusStr = attributes.status || '';

    return {
      provider: 'lemon_squeezy',
      eventName,
      orderId: String(payload.data.id || attributes.identifier || `ls_${Date.now()}`),
      email: (attributes.user_email || customData.email || '').toLowerCase().trim(),
      userId: customData.user_id ? Number(customData.user_id) : (attributes.user_id ? Number(attributes.user_id) : null),
      amountCents: attributes.total || attributes.total_usd ? Math.round(Number(attributes.total || attributes.total_usd)) : undefined,
      currency: attributes.currency || 'USD',
      status: statusStr === 'paid' ? 'paid' : (statusStr === 'refunded' ? 'refunded' : 'other'),
    };
  }

  // 2. Format Gumroad (form-urlencoded ou JSON)
  if (payload.sale_id || payload.order_number || payload.seller_id) {
    const customFields = payload.custom_fields || {};
    const isRefunded = Boolean(payload.refunded);

    return {
      provider: 'gumroad',
      eventName: isRefunded ? 'sale.refunded' : 'sale.completed',
      orderId: String(payload.sale_id || payload.order_number || `gum_${Date.now()}`),
      email: (payload.email || payload.purchaser_email || '').toLowerCase().trim(),
      userId: customFields.user_id ? Number(customFields.user_id) : (payload.passthrough ? Number(payload.passthrough) : null),
      amountCents: payload.price ? Math.round(Number(payload.price)) : undefined,
      currency: (payload.currency || 'USD').toUpperCase(),
      status: isRefunded ? 'refunded' : 'paid',
    };
  }

  // 3. Format Generic fallback
  if (payload.orderId || payload.order_id || payload.email) {
    return {
      provider: 'generic',
      eventName: payload.event || payload.type || 'order.completed',
      orderId: String(payload.orderId || payload.order_id || `mor_${Date.now()}`),
      email: (payload.email || '').toLowerCase().trim(),
      userId: payload.userId || payload.user_id ? Number(payload.userId || payload.user_id) : null,
      amountCents: payload.amountCents || payload.amount,
      currency: payload.currency || 'USD',
      status: payload.status === 'paid' || payload.paid ? 'paid' : 'other',
    };
  }

  return null;
}
