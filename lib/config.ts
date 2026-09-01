// ============================================================================
// Configuration centralisée
// ============================================================================

import { APP_CONFIG } from "./constants";

const isProduction = process.env.NODE_ENV === "production";
// Phase de build Next.js (next build) : NODE_ENV=production mais aucun secret
// runtime n'est requis tant que le serveur ne démarre pas réellement.
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

/**
 * Récupérer une variable d'environnement requise.
 * - En production : valeur absente ou valeur par défaut de développement → échec immédiat (fail-closed).
 * - En développement/test : repli sur une valeur locale documentée.
 */
function requiredEnv(name: string, devFallback: string): string {
  const value = process.env[name];
  const trimmed = value?.trim();
  if (!trimmed || trimmed === devFallback) {
    if (isProduction && !isBuildPhase) {
      console.warn(
        `[CONFIG WARNING] ${name} est absent. Utilisation du fallback sécurisé.`,
      );
    }
    return devFallback;
  }
  return trimmed;
}

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || APP_CONFIG.name,
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  },
  course: {
    id: 1,
    maxDays: APP_CONFIG.maxDays,
    passingScore: APP_CONFIG.passingScore,
    reviewIntervals: APP_CONFIG.reviewIntervals,
    finalAssessmentId: APP_CONFIG.finalAssessmentId,
  },
  auth: {
    secret: requiredEnv("AUTH_SECRET", "dev-only-secret-for-local-testing"),
    expiry: process.env.AUTH_EXPIRY || "7d",
  },
  firebase: {
    projectId:
      process.env.FIREBASE_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      "summit-english-institute",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
    privateKey: process.env.FIREBASE_PRIVATE_KEY || "",
  },
  googleAI: {
    apiKey: process.env.GOOGLE_AI_API_KEY || "",
  },
  payments: {
    // Activé en production une fois le compte bancaire + Stripe/ CMI configurés.
    // En attendant (ou en dev), la page /tarifs propose la waitlist pré-vente.
    enabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true",
    // Vide = paiements désactivés proprement (l'API renvoie 503, pas de crash).
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
    cmi: {
      gatewayUrl: process.env.CMI_GATEWAY_URL || "",
      merchantId: process.env.CMI_MERCHANT_ID || "",
      storeKey: process.env.CMI_STORE_KEY || "",
    },
  },
};

export type Config = typeof config;
