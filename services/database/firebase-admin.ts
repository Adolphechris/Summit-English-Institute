// ============================================================================
// Initialisation Sécurisée du SDK Google Firebase Admin
// Summit English Institute — Accès Serveur Unifié & Haute Résilience
// ============================================================================

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore, Firestore } from 'firebase-admin/firestore';

let firestoreInstance: Firestore | null = null;

function sanitizeEnvVal(val?: string): string | undefined {
  if (!val) return undefined;
  let clean = val.trim();
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
}

export function getFirebaseAdminApp(): App {
  const apps = getApps();
  if (apps.length > 0 && apps[0]) {
    return apps[0];
  }

  const projectId = sanitizeEnvVal(process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) || 'summit-english-institut';
  let clientEmail = sanitizeEnvVal(process.env.FIREBASE_CLIENT_EMAIL);
  let privateKey = sanitizeEnvVal(process.env.FIREBASE_PRIVATE_KEY);

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  }

  console.error('[FIREBASE ADMIN ERROR] Credentials manquants :', {
    hasProjectId: Boolean(projectId),
    hasClientEmail: Boolean(clientEmail),
    hasPrivateKey: Boolean(privateKey),
  });

  return initializeApp({
    projectId,
  });
}

/**
 * Récupère l'instance singleton Cloud Firestore du SDK Admin
 */
export function getFirestore(): Firestore {
  if (!firestoreInstance) {
    const app = getFirebaseAdminApp();
    firestoreInstance = getAdminFirestore(app);
    firestoreInstance.settings({ ignoreUndefinedProperties: true });
  }
  return firestoreInstance;
}
