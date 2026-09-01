// ============================================================================
// CMI (Centre Monétique Interbancaire — Maroc) — SCAFFOLD
// Paiement local en MAD via la page hébergée CMI (3D Pay Hosting).
// ⚠️ Inactif tant que CMI_GATEWAY_URL / CMI_MERCHANT_ID / CMI_STORE_KEY sont
//    absents. L'algorithme de hash doit être validé contre la documentation
//    marchand CMI fournie à l'ouverture du compte.
// ============================================================================

import { createHmac } from 'crypto';
import { config } from './config';

export function isCmiConfigured(): boolean {
  return Boolean(
    config.payments.cmi.gatewayUrl && config.payments.cmi.merchantId && config.payments.cmi.storeKey
  );
}

export interface CmiPaymentRequest {
  orderId: string;
  amountMad: number;
  email: string;
  /** URL de retour navigateur (client) et de notification serveur (webhook) */
  callbackUrl: string;
  webhookUrl: string;
}

/**
 * Construire les paramètres de formulaire à POSTer vers la passerelle CMI.
 * Convention courante 3D Pay Hosting : hash = HMAC-SHA256(storeKey,
 * `|v1|v2|…|`) sur les valeurs triées alphabétiquement (hors `hash`),
 * en hexadécimal majuscule.
 */
export function buildCmiPaymentRequest(req: CmiPaymentRequest): {
  url: string;
  params: Record<string, string>;
} {
  const { gatewayUrl, merchantId } = config.payments.cmi;
  if (!gatewayUrl || !merchantId || !config.payments.cmi.storeKey) {
    throw new Error('CMI non configuré');
  }

  const params: Record<string, string> = {
    MerchantId: merchantId,
    OrderId: req.orderId,
    Amount: String(Math.round(req.amountMad * 100)), // centimes
    Currency: '504', // ISO 4217 numérique MAD
    BillToEmail: req.email,
    okUrl: req.callbackUrl,
    failUrl: req.callbackUrl,
    callbackUrl: req.webhookUrl,
    TranType: 'Auth',
    encoding: 'UTF-8',
  };

  const keys = Object.keys(params).sort();
  const concatenated = `|${keys.map((k) => params[k]).join('|')}|`;
  params.hash = createHmac('sha256', config.payments.cmi.storeKey)
    .update(concatenated)
    .digest('hex')
    .toUpperCase();

  return { url: gatewayUrl, params };
}

/** Vérifier le hash d'une notification CMI entrante (webhook / retour). */
export function verifyCmiHash(params: Record<string, string>): boolean {
  const received = params.hash;
  if (!received || !config.payments.cmi.storeKey) return false;
  const keys = Object.keys(params).filter((k) => k !== 'hash').sort();
  const concatenated = `|${keys.map((k) => params[k]).join('|')}|`;
  const expected = createHmac('sha256', config.payments.cmi.storeKey)
    .update(concatenated)
    .digest('hex')
    .toUpperCase();
  return received.toUpperCase() === expected;
}
