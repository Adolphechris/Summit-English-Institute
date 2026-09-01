// ============================================================================
// Entitlements — logique d'accès freemium (pure, testable, sans I/O)
// Modèle : diagnostic + niveaux 1-2 gratuits, Premium = niveaux 3-8 + final.
// ============================================================================

import { FREE_LEVELS } from './constants';

export type Plan = 'free' | 'premium';

interface AccessUser {
  plan?: string;
  role?: string;
}

/** L'utilisateur a-t-il l'accès Premium (le staff admin/teacher a un accès complet) ? */
export function isPremiumUser(user: AccessUser | null | undefined): boolean {
  if (!user) return false;
  if (user.plan === 'premium') return true;
  const role = (user.role || '').toLowerCase();
  return role === 'admin' || role === 'teacher';
}

/** L'utilisateur peut-il accéder au contenu du niveau donné (numéro 1-8) ? */
export function canAccessLevelNumber(
  user: AccessUser | null | undefined,
  levelNumber: number
): boolean {
  if (levelNumber <= FREE_LEVELS) return true;
  return isPremiumUser(user);
}
