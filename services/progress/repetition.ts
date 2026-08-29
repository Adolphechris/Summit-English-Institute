// ============================================================================
// Service de répétition espacée — Écosystème Google (Cloud Firestore)
// Summit English Institute — Algorithme de révision espacée
// ============================================================================

import {
  getUserReviewItems,
  upsertReviewItem,
  listSkills,
  getSkillById,
  markReviewItemMastered,
} from '@/services/database/firestore-repository';
import { APP_CONFIG } from '@/lib/constants';

/**
 * Calculer la prochaine date de révision en fonction de la performance
 */
export function calculateNextReview(
  lastResult: number,
  currentInterval: number,
  _errorCount: number
): Date {
  const now = new Date();
  const intervals = APP_CONFIG.reviewIntervals;

  // Si l'utilisateur a échoué, révision plus rapide
  if (lastResult < 60) {
    const daysToAdd = Math.max(1, Math.floor(currentInterval / 2));
    const next = new Date(now);
    next.setDate(next.getDate() + daysToAdd);
    return next;
  }

  // Si l'utilisateur a réussi, progresser dans les intervalles
  const intervalIndex = intervals.indexOf(currentInterval);
  if (intervalIndex >= 0 && intervalIndex < intervals.length - 1) {
    const next = new Date(now);
    next.setDate(next.getDate() + intervals[intervalIndex + 1]);
    return next;
  }

  // Par défaut, ajouter l'intervalle standard
  const next = new Date(now);
  next.setDate(next.getDate() + currentInterval);
  return next;
}

/**
 * Mettre à jour les éléments de révision pour un utilisateur
 */
export async function updateReviewItems(userId: number, skillId: number, result: number): Promise<void> {
  const items = await getUserReviewItems(userId);
  const existing = items.find((i) => i.skillId === skillId && (i.status === 'due' || i.status === 'in_review'));

  const now = new Date().toISOString();

  if (existing) {
    const nextReview = calculateNextReview(result, 1, existing.errorCount);
    const priority = result < 60 ? 'high' : result < 75 ? 'normal' : 'low';
    const newErrorCount = result < 75 ? existing.errorCount + 1 : existing.errorCount;

    await upsertReviewItem(userId, skillId, {
      lastResult: result,
      errorCount: newErrorCount,
      priority,
      scheduledFor: nextReview.toISOString(),
      lastErrorAt: now,
      updatedAt: now,
    });
  } else if (result < 75) {
    const nextReview = calculateNextReview(result, 1, 0);
    const priority = result < 60 ? 'high' : 'normal';

    await upsertReviewItem(userId, skillId, {
      errorCount: 1,
      lastResult: result,
      priority,
      status: 'due',
      scheduledFor: nextReview.toISOString(),
      lastErrorAt: now,
      updatedAt: now,
    });
  }
}

/**
 * Récupérer les révisions dues pour un utilisateur
 */
export async function getDueReviews(userId: number) {
  const items = await getUserReviewItems(userId);
  const now = Date.now();

  const dueItems = items.filter((i) => {
    if (i.status !== 'due' && i.status !== 'in_review') return false;
    if (!i.scheduledFor) return true;
    return new Date(i.scheduledFor).getTime() <= now;
  });

  const priorityWeight: Record<string, number> = {
    critical: 1,
    high: 2,
    normal: 3,
    low: 4,
  };

  dueItems.sort((a, b) => {
    const pA = priorityWeight[a.priority] || 3;
    const pB = priorityWeight[b.priority] || 3;
    if (pA !== pB) return pA - pB;
    return new Date(b.lastErrorAt || 0).getTime() - new Date(a.lastErrorAt || 0).getTime();
  });

  // Enrichir avec le nom de la compétence
  const enriched = await Promise.all(
    dueItems.map(async (item) => {
      const skill = await getSkillById(item.skillId);
      return {
        id: `${item.userId}_${item.skillId}`,
        skill_id: item.skillId,
        skill_name: skill?.name || `Compétence ${item.skillId}`,
        error_type: item.errorType || null,
        error_count: item.errorCount,
        last_result: item.lastResult ?? null,
        priority: item.priority,
        status: item.status,
      };
    })
  );

  return enriched;
}

/**
 * Marquer un élément de révision comme maîtrisé
 */
export async function markReviewAsMastered(userId: number, skillId: number): Promise<void> {
  await markReviewItemMastered(userId, skillId);
}

/**
 * Initialiser les révisions pour un nouvel utilisateur
 */
export async function initializeReviewsForUser(userId: number): Promise<void> {
  const allSkills = await listSkills();
  const criticalSkills = allSkills.filter((s) => s.isCritical && s.status === 'active');

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  for (const skill of criticalSkills) {
    await upsertReviewItem(userId, skill.id, {
      errorCount: 0,
      lastResult: undefined,
      priority: 'normal',
      status: 'due',
      scheduledFor: tomorrow,
    });
  }
}
