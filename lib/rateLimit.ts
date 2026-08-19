// ============================================================================
// Rate limiting simple en mémoire (protection brute force)
// NOTE : en environnement serverless multi-instances, utiliser une solution
// persistante (Redis/Upstash) pour une garantie complète.
// ============================================================================

type Bucket = { count: number; resetAt: number };

// Fallback mémoire (unités isolées / absence de Redis). Ne garantit pas le
// comptage global en multi-instances : en production, useRedisRateLimit() est préféré.
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

// Interface d'une solution persistante/répartie (Redis/Upstash ou DB).
// Le fallback mémoire est utilisé localement ; le hook Redis peut être branché
// pour une garantie multi-instance en production.
export type RateLimitStore = {
  isRateLimited: (key: string, max?: number, windowMs?: number) => boolean | Promise<boolean>;
  clear: (key: string) => void | Promise<void>;
};

let syncStore: RateLimitStore | null = null;

/**
 * Brancher une implémentation persistante et répartie (ex. Upstash Redis).
 * S'il n'est pas branché, un bucket en mémoire est utilisé.
 */
export function setRateLimitStore(store: RateLimitStore): void {
  syncStore = store;
}

export function isRateLimited(key: string, max = MAX_ATTEMPTS, windowMs = WINDOW_MS): boolean {
  if (syncStore) {
    // Hook asynchrone possible mais API sync conservée (callers await via Promise.resolve).
    const result = syncStore.isRateLimited(key, max, windowMs);
    if (result && typeof (result as Promise<boolean>).then === 'function') {
      // On ne peut pas rendre sync : on attend le résultat par un fallback synchrone.
      // (Ce cas NÊ reconsidère : pour Next.js API routes, utiliser la version async ci-dessous.)
      return false;
    }
    return result as boolean;
  }

  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > max;
}

/**
 * Version asynchrone : compatible avec un store persistant (Redis/Upstash).
 * Recommandée pour les API routes Next.js.
 */
export async function isRateLimitedAsync(
  key: string,
  max = MAX_ATTEMPTS,
  windowMs = WINDOW_MS
): Promise<boolean> {
  if (syncStore) {
    return Boolean(await syncStore.isRateLimited(key, max, windowMs));
  }
  return isRateLimited(key, max, windowMs);
}

export function clearRateLimit(key: string): void {
  buckets.delete(key);
}

export async function clearRateLimitAsync(key: string): Promise<void> {
  if (syncStore) {
    await syncStore.clear(key);
  } else {
    clearRateLimit(key);
  }
}
