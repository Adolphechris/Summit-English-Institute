// ============================================================================
// Configuration tarifs — SOURCE UNIQUE DE VÉRITÉ
// ⚠️ MONTANTS PLACEHOLDER : à ajuster par le fondateur avant mise en avant
//    commerciale. Un seul endroit à modifier.
// ============================================================================

export const PREMIUM = {
  name: 'Programme Complet — Premium',
  description:
    'Accès à vie aux 8 niveaux du programme (niveaux 3 à 8) : anglais IT, cybersécurité, conversations professionnelles, évaluations, certification finale.',
  /** Prix Stripe en centimes d'euro (14900 = 149,00 €) — PLACEHOLDER */
  priceEurCents: 14900,
  /** Prix affiché pour le paiement CMI au Maroc (MAD) — PLACEHOLDER */
  priceMad: 1490,
  currency: 'eur',
  features: [
    '8 niveaux complets (CEFR A2 → C1), 20 jours de programme',
    '80 leçons riches : grammaire, vocabulaire IT & cybersécurité',
    '920+ questions QCM avec corrections expliquées',
    'Révisions SRS intelligentes (système de répétition espacée)',
    'Évaluations par niveau + évaluation finale cumulative',
    'Certificat officiel Summit English Institute',
    'Accès à vie, mises à jour incluses',
  ],
  freeFeatures: [
    'Test de positionnement (diagnostic)',
    'Niveaux 1 et 2 complets (fondamentaux)',
    'Tableau de bord et suivi de progression',
    'Révisions SRS sur le contenu gratuit',
  ],
} as const;

/** Message partagé API/client quand un contenu premium est demandé hors Premium. */
export const PREMIUM_REQUIRED_MESSAGE =
  'Ce contenu fait partie du programme Premium (niveaux 3 à 8). Passez Premium pour le débloquer.';
