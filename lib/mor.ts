// ============================================================================
// Merchant of Record (Gumroad / Lemon Squeezy / Paddle) — ADAPTER
//
// Solution d'encaissement SANS compte bancaire local :
//  - Le MOR encaisse le client (toutes devises), gère TVA, fraude, remboursements.
//  - Le MOR délègue le paiement client (PCI) → aucun numéro de carte manipulé ici.
//  - Le MOR reverse ensuite vers un compte Payoneer (carte Mastercard Payoneer
//    = dépense directe, retrait ATM) → zéro IBAN / zéro banque par pays.
//
// Configuration : une URL de paiement par région (produits à prix local), sinon
// un fallback global. Voir .env.example (MOR_CHECKOUT_URL_*).
// ============================================================================

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