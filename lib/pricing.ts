// ============================================================================
// Configuration tarifs — SOURCE UNIQUE DE VÉRITÉ
// Modèle : paiement UNIQUE (pas d'abonnement récurrent — meilleure acceptation
// francophone & Afrique, moindre friction).
// Prix régionaux calibrés pour acceptation immédiate (psychologie "under 200"):
//   Maroc 199 MAD, UE 29 €, Afrique 12 000 FCFA, Canada 39 $, USA 19,99 $.
// Modifier ici → le pricing s’actualise partout (UI, Stripe Checkout, webhook).
// ============================================================================

export type RegionKey = "ma" | "eu" | "af" | "ca" | "us";

export interface RegionPricing {
  key: RegionKey;
  priceCents: number;
  currency: string;
  symbol: string;
  label: string;
  locale: string;
}

export const REGION_PRICES: Record<RegionKey, RegionPricing> = {
  ma: {
    key: "ma",
    priceCents: 19900,
    currency: "MAD",
    symbol: "MAD",
    label: "199 MAD",
    locale: "fr-MA",
  },
  eu: {
    key: "eu",
    priceCents: 2900,
    currency: "EUR",
    symbol: "€",
    label: "29 €",
    locale: "fr-FR",
  },
  af: {
    key: "af",
    priceCents: 12000,
    currency: "XOF",
    symbol: "FCFA",
    label: "12 000 FCFA",
    locale: "fr-FR",
  },
  ca: {
    key: "ca",
    priceCents: 3900,
    currency: "CAD",
    symbol: "$",
    label: "39 $",
    locale: "fr-CA",
  },
  us: {
    key: "us",
    priceCents: 1999,
    currency: "USD",
    symbol: "$",
    label: "$19.99",
    locale: "en-US",
  },
};

export const DEFAULT_REGION: RegionKey = "eu";

export const REGION_ORDER: RegionKey[] = ["eu", "ma", "af", "ca", "us"];

export const REGION_LABEL: Record<RegionKey, string> = {
  eu: "🇪🇺 29 €",
  ma: "🇲🇦 199 MAD",
  af: "🇫🇷 12 000 FCFA",
  ca: "🇨🇦 39 $",
  us: "🇺🇸 $19.99",
};

/** Détecter une région client depuis les langues/headers du navigateur. */
export function detectRegion(
  locale: string,
  languages: readonly string[],
): RegionKey {
  const code = (locale || languages?.[0] || "").toLowerCase();
  if (
    code.startsWith("fr-ma") ||
    code.startsWith("ary") ||
    code.includes("-ma")
  )
    return "ma";
  if (code.startsWith("fr-ca")) return "ca";
  if (code.startsWith("en-us")) return "us";
  if (code.startsWith("fr")) {
    // francophonie africaine (XOF) si pas d’indication plus précise
    if (
      code.includes("sn") ||
      code.includes("ci") ||
      code.includes("ml") ||
      code.includes("bf") ||
      code.includes("tg") ||
      code.includes("ne") ||
      code.includes("cd")
    )
      return "af";
    return "eu";
  }
  return DEFAULT_REGION;
}

export function pricingFor(region: RegionKey): RegionPricing {
  return REGION_PRICES[region] ?? REGION_PRICES[DEFAULT_REGION];
}

export function formatPrice(p: RegionPricing): string {
  return (p.priceCents / 100).toLocaleString(p.locale, {
    style: "currency",
    currency: p.currency,
    maximumFractionDigits: p.priceCents % 100 === 0 ? 0 : 2,
  });
}

export const PREMIUM = {
  name: "Programme Complet — Premium",
  description:
    "Accès à vie aux 8 niveaux du programme (niveaux 3 à 8) : anglais IT, cybersécurité, conversations professionnelles, évaluations, certification finale, révisions SRS.",
  features: [
    "8 niveaux complets (CEFR A2 → C1), 20 jours de programme",
    "80 leçons riches : grammaire, vocabulaire IT & cybersécurité",
    "920+ questions QCM avec corrections expliquées",
    "Révisions SRS intelligentes (système de répétition espacée)",
    "Évaluations par niveau + évaluation finale cumulative",
    "Certificat officiel Summit English Institute",
    "Accès à vie, mises à jour incluses",
  ],
  freeFeatures: [
    "Test de positionnement (diagnostic)",
    "Niveaux 1 et 2 complets (fondamentaux)",
    "Tableau de bord et suivi de progression",
    "Révisions SRS sur le contenu gratuit",
  ],
} as const;

/** Message partagé API/client quand un contenu premium est demandé hors Premium. */
export const PREMIUM_REQUIRED_MESSAGE =
  "Ce contenu fait partie du programme Premium (niveaux 3 à 8). Passez Premium pour le débloquer.";
