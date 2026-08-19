// ============================================================================
// Service de répétition espacée
// ============================================================================

import { query, execute, queryOne } from '@/services/database/client';
import { APP_CONFIG } from '@/lib/constants';

/**
 * Calculer la prochaine date de révision en fonction de la performance
 */
export function calculateNextReview(
  lastResult: number,
  currentInterval: number,
  errorCount: number
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
  // Vérifier s'il existe déjà un élément de révision pour cette compétence
  const existing = await queryOne(
    `SELECT * FROM review_items WHERE user_id = $1 AND skill_id = $2 AND status IN ('due', 'in_review')`,
    [userId, skillId]
  );

  if (existing) {
    // Mettre à jour l'élément existant
    const nextReview = calculateNextReview(result, 1, existing.error_count);
    const priority = result < 60 ? 'high' : result < 75 ? 'normal' : 'low';

    await execute(
      `UPDATE review_items
       SET last_result = $1,
           error_count = error_count + CASE WHEN $1 < 75 THEN 1 ELSE 0 END,
           priority = $2,
           scheduled_for = $3,
           updated_at = NOW()
       WHERE id = $4`,
      [result, priority, nextReview.toISOString(), existing.id]
    );
  } else if (result < 75) {
    // Créer un nouvel élément de révision si la compétence est faible
    const nextReview = calculateNextReview(result, 1, 0);
    await execute(
      `INSERT INTO review_items (user_id, skill_id, error_count, last_result, priority, status, scheduled_for)
       VALUES ($1, $2, 1, $3, $4, 'due', $5)`,
      [userId, skillId, result, result < 60 ? 'high' : 'normal', nextReview.toISOString()]
    );
  }
}

/**
 * Récupérer les révisions dues pour un utilisateur
 */
export async function getDueReviews(userId: number) {
  return query(
    `SELECT ri.id, ri.skill_id, s.name as skill_name, ri.error_type, ri.error_count, ri.last_result, ri.priority, ri.status
     FROM review_items ri
     JOIN skills s ON ri.skill_id = s.id
     WHERE ri.user_id = $1
       AND ri.status IN ('due', 'in_review')
       AND (ri.scheduled_for IS NULL OR ri.scheduled_for <= NOW())
     ORDER BY
       CASE ri.priority
         WHEN 'critical' THEN 1
         WHEN 'high' THEN 2
         WHEN 'normal' THEN 3
         WHEN 'low' THEN 4
       END,
       ri.created_at DESC`,
    [userId]
  );
}

/**
 * Marquer un élément de révision comme maîtrisé
 */
export async function markReviewAsMastered(userId: number, reviewItemId: number): Promise<void> {
  await execute(
    `UPDATE review_items
     SET status = 'mastered',
         completed_at = NOW(),
         updated_at = NOW()
     WHERE id = $1 AND user_id = $2`,
    [reviewItemId, userId]
  );
}

/**
 * Initialiser les révisions pour un nouvel utilisateur
 */
export async function initializeReviewsForUser(userId: number): Promise<void> {
  // Récupérer toutes les compétences critiques
  const criticalSkills = await query(
    `SELECT id FROM skills WHERE is_critical = true AND status = 'active'`
  );

  for (const skill of criticalSkills) {
    await execute(
      `INSERT INTO review_items (user_id, skill_id, error_count, last_result, priority, status, scheduled_for)
       VALUES ($1, $2, 0, NULL, 'normal', 'due', NOW() + INTERVAL '1 day')`,
      [userId, skill.id]
    );
  }
}
