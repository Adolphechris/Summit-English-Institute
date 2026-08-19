// ============================================================================
// Service de mise à jour de la progression après une tentative d'évaluation
// Alimente : skill_progress, level_progress, lesson_progress, progress, review_items
// ============================================================================

import { query, execute, queryOne } from '@/services/database/client';
import { updateReviewItems } from './repetition';

export function masteryStatusFromScore(score: number): string {
  if (score >= 85) return 'stable';
  if (score >= 75) return 'practicing';
  if (score >= 60) return 'learning';
  return 'new';
}

export function priorityFromScore(score: number): string {
  if (score < 60) return 'high';
  if (score < 75) return 'normal';
  return 'low';
}

export interface AssessmentQuestionRef {
  id: number;
  skill_id: number;
}

export interface AssessmentAnswerRef {
  questionId: number;
  isCorrect: boolean;
}

/**
 * Enregistre les résultats d'une tentative et met à jour toute la progression
 * pédagogique (maîtrise par compétence, niveaux, leçons, révisions).
 */
export async function recordAssessmentResult(params: {
  userId: number;
  assessmentId: number;
  questions: AssessmentQuestionRef[];
  answerResults: AssessmentAnswerRef[];
  score: number;
  passed: boolean;
}): Promise<void> {
  const { userId, assessmentId, questions, answerResults, score, passed } = params;

  // 1. Regrouper les résultats par compétence
  const skillStats = new Map<number, { correct: number; total: number }>();
  const questionsById = new Map(questions.map((q) => [q.id, q]));

  for (const answer of answerResults) {
    const question = questionsById.get(answer.questionId);
    if (!question) continue;

    const stats = skillStats.get(question.skill_id) ?? { correct: 0, total: 0 };
    stats.total += 1;
    if (answer.isCorrect) stats.correct += 1;
    skillStats.set(question.skill_id, stats);
  }

  // 2. Mettre à jour skill_progress + alimenter les révisions si faible
  for (const [skillId, stats] of skillStats) {
    const skillScore = Math.round((stats.correct / stats.total) * 100);

    const existing = await queryOne<{ attempt_count: number; correct_count: number }>(
      `SELECT attempt_count, correct_count FROM skill_progress WHERE user_id = $1 AND skill_id = $2`,
      [userId, skillId]
    );

    if (existing) {
      const newAttemptCount = (existing.attempt_count || 0) + stats.total;
      const newCorrectCount = (existing.correct_count || 0) + stats.correct;
      const newScore = Math.round((newCorrectCount / newAttemptCount) * 100);

      await execute(
        `UPDATE skill_progress
         SET mastery_score = $1, mastery_status = $2, attempt_count = $3, correct_count = $4,
             priority = $5, last_attempt_at = NOW(), updated_at = NOW()
         WHERE user_id = $6 AND skill_id = $7`,
        [
          newScore,
          masteryStatusFromScore(newScore),
          newAttemptCount,
          newCorrectCount,
          priorityFromScore(newScore),
          userId,
          skillId,
        ]
      );
    } else {
      await execute(
        `INSERT INTO skill_progress (user_id, skill_id, mastery_score, mastery_status, attempt_count, correct_count, last_attempt_at, priority)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)`,
        [
          userId,
          skillId,
          skillScore,
          masteryStatusFromScore(skillScore),
          stats.total,
          stats.correct,
          priorityFromScore(skillScore),
        ]
      );
    }

    // Compétences faibles → révision (règle p. 10 de la Constitution)
    if (skillScore < 75) {
      await updateReviewItems(userId, skillId, skillScore);
    }
  }

  // 3. Progression de niveau (validation)
  const assessment = await queryOne<{ level_id: number | null; lesson_id: number | null }>(
    `SELECT level_id, lesson_id FROM assessments WHERE id = $1`,
    [assessmentId]
  );

  if (assessment?.level_id) {
    if (passed) {
      await execute(
        `UPDATE level_progress
         SET is_started = true, is_completed = true,
             best_score = GREATEST(COALESCE(best_score, 0), $3),
             attempt_count = attempt_count + 1,
             completed_at = COALESCE(completed_at, NOW()),
             updated_at = NOW()
         WHERE user_id = $1 AND level_id = $2`,
        [userId, assessment.level_id, score]
      );

      // Débloquer le niveau suivant
      await execute(
        `INSERT INTO level_progress (user_id, level_id, is_started, is_completed)
         SELECT $1, l.id, true, false
         FROM levels l
         WHERE l.course_id = (SELECT course_id FROM levels l2 WHERE l2.id = $2)
           AND l.order_index = (SELECT order_index + 1 FROM levels l2 WHERE l2.id = $2)
         ON CONFLICT (user_id, level_id) DO UPDATE SET is_started = true, updated_at = NOW()`,
        [userId, assessment.level_id]
      );
    } else {
      await execute(
        `UPDATE level_progress
         SET is_started = true, attempt_count = attempt_count + 1, updated_at = NOW()
         WHERE user_id = $1 AND level_id = $2`,
        [userId, assessment.level_id]
      );
    }

    // Niveau courant / jour courant dans progress (le jour avance toujours,
    // le niveau ne change que lorsque l'évaluation est réussie)
    await execute(
      `UPDATE progress SET current_day = LEAST(current_day + 1, 20), updated_at = NOW() WHERE user_id = $1`,
      [userId]
    );

    if (passed) {
      await execute(
        `UPDATE progress SET current_level = $2, updated_at = NOW() WHERE user_id = $1`,
        [userId, assessment.level_id]
      );
    }
  } else if (assessment?.lesson_id && passed) {
    await execute(
      `INSERT INTO lesson_progress (user_id, lesson_id, is_started, is_completed, best_score, completed_at)
       VALUES ($1, $2, true, true, $3, NOW())
       ON CONFLICT (user_id, lesson_id) DO UPDATE SET
         is_completed = true,
         best_score = GREATEST(COALESCE(lesson_progress.best_score, 0), $3),
         updated_at = NOW()`,
      [userId, assessment.lesson_id, score]
    );
  }
}
