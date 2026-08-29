// ============================================================================
// Configuration centralisée
// ============================================================================

import { APP_CONFIG } from './constants';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Récupérer une variable d'environnement requise.
 * - En production : valeur absente ou valeur par défaut de développement → échec immédiat (fail-closed).
 * - En développement/test : repli sur une valeur locale documentée.
 */
function requiredEnv(name: string, devFallback: string): string {
  const value = process.env[name];
  if (!value || value === devFallback || value.trim() === '') {
    if (isProduction) {
      throw new Error(
        `[CONFIG FATALE] ${name} est absent ou contient une valeur par défaut de développement. ` +
          `Refus de démarrer en production sans secret configuré.`
      );
    }
    return devFallback;
  }
  return value;
}

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || APP_CONFIG.name,
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
  course: {
    id: 1,
    maxDays: APP_CONFIG.maxDays,
    passingScore: APP_CONFIG.passingScore,
    reviewIntervals: APP_CONFIG.reviewIntervals,
    finalAssessmentId: APP_CONFIG.finalAssessmentId,
  },
  auth: {
    secret: process.env.AUTH_SECRET || 'summit_english_prod_secret_key_2026_x89a7f239b',
    expiry: process.env.AUTH_EXPIRY || '7d',
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'summit-english-institut',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
  },
  googleAI: {
    apiKey: process.env.GOOGLE_AI_API_KEY || '',
  },
};

export type Config = typeof config;

