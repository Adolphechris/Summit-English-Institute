// ============================================================================
// Service de mise à jour de la progression après une tentative d'évaluation
// Summit English Institute — Écosystème Google (Cloud Firestore)
// ============================================================================

import {
  getSkillProgress,
  upsertSkillProgress,
  getAssessmentById,
  getLevelProgress,
  upsertLevelProgress,
  upsertLessonProgress,
  getUserProgress,
  initOrUpdateProgress,
  listLevels,
} from '@/services/database/firestore-repository';
import { updateReviewItems } from './repetition';

export function masteryStatusFromScore(score: number): 'stable' | 'practicing' | 'learning' | 'new' {
  if (score >= 85) return 'stable';
  if (score >= 75) return 'practicing';
  if (score >= 60) return 'learning';
  return 'new';
}

export function priorityFromScore(score: number): 'high' | 'normal' | 'low' {
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
  const now = new Date().toISOString();

  for (const [skillId, stats] of skillStats) {
    const skillScore = Math.round((stats.correct / stats.total) * 100);
    const existing = await getSkillProgress(userId, skillId);

    if (existing) {
      const newAttemptCount = (existing.attemptCount || 0) + stats.total;
      const newCorrectCount = (existing.correctCount || 0) + stats.correct;
      const newScore = Math.round((newCorrectCount / newAttemptCount) * 100);

      await upsertSkillProgress(userId, skillId, {
        masteryScore: newScore,
        masteryStatus: masteryStatusFromScore(newScore),
        attemptCount: newAttemptCount,
        correctCount: newCorrectCount,
        priority: priorityFromScore(newScore),
        lastAttemptAt: now,
      });
    } else {
      await upsertSkillProgress(userId, skillId, {
        masteryScore: skillScore,
        masteryStatus: masteryStatusFromScore(skillScore),
        attemptCount: stats.total,
        correctCount: stats.correct,
        priority: priorityFromScore(skillScore),
        lastAttemptAt: now,
      });
    }

    // Compétences faibles → révision (règle p. 10 de la Constitution)
    if (skillScore < 75) {
      await updateReviewItems(userId, skillId, skillScore);
    }
  }

  // 3. Progression de niveau (validation)
  const assessment = await getAssessmentById(assessmentId);

  if (assessment?.levelId) {
    const levelId = assessment.levelId;
    const existingLp = await getLevelProgress(userId, levelId);

    if (passed) {
      const bestScore = Math.max(existingLp?.bestScore || 0, score);
      await upsertLevelProgress(userId, levelId, {
        isStarted: true,
        isCompleted: true,
        bestScore,
        attemptCount: (existingLp?.attemptCount || 0) + 1,
        completedAt: existingLp?.completedAt || now,
      });

      // Débloquer le niveau suivant
      const allLevels = await listLevels();
      const currentLevel = allLevels.find((l) => l.id === levelId);
      if (currentLevel) {
        const nextLevel = allLevels.find((l) => l.orderIndex === currentLevel.orderIndex + 1);
        if (nextLevel) {
          const nextLp = await getLevelProgress(userId, nextLevel.id);
          await upsertLevelProgress(userId, nextLevel.id, {
            isStarted: true,
            isCompleted: nextLp?.isCompleted || false,
            attemptCount: nextLp?.attemptCount || 0,
          });
        }
      }
    } else {
      await upsertLevelProgress(userId, levelId, {
        isStarted: true,
        attemptCount: (existingLp?.attemptCount || 0) + 1,
      });
    }

    // Mettre à jour progress général
    const userProg = await getUserProgress(userId);
    const currentDay = Math.min((userProg?.currentDay || 1) + 1, 20);

    await initOrUpdateProgress(userId, {
      currentDay,
      ...(passed ? { currentLevel: levelId } : {}),
    });
  } else if (assessment?.lessonId && passed) {
    await upsertLessonProgress(userId, assessment.lessonId, {
      isStarted: true,
      isCompleted: true,
      bestScore: score,
      completedAt: now,
    });
  }
}
