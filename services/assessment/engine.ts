// ============================================================================
// Moteur d'évaluation avec sélection cumulative — Écosystème Google (Firestore)
// Summit English Institute — Sélection intelligente & cumulativité
// ============================================================================

import {
  listQuestions,
  getUserSkillProgress,
  getQuestionsByIds,
  getFirestore,
} from '@/services/database/firestore-repository';
import { COLLECTIONS } from '@/services/database/firestore-schema';
import type { AssessmentDistribution } from '@/types';

/**
 * Mélanger un tableau (Fisher-Yates)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Sélectionner des questions pour une évaluation en mélangeant
 * nouvelles notions (70%) et anciennes notions (30% cumulatif)
 */
export async function selectQuestionsForAssessment(params: {
  assessmentId?: number;
  levelId?: number;
  moduleId?: number;
  lessonId?: number;
  userId: number;
  distribution?: AssessmentDistribution;
  totalQuestions: number;
}): Promise<any[]> {
  const { levelId, lessonId, userId, totalQuestions } = params;

  const newQuestionsCount = Math.floor(totalQuestions * 0.7);
  const reviewQuestionsCount = totalQuestions - newQuestionsCount;

  // 1. Nouvelles questions
  const allQuestions = await listQuestions({
    lessonId,
    limit: 100,
  });

  let newQuestions = allQuestions;
  if (levelId && !lessonId) {
    newQuestions = allQuestions.filter((q) => {
      // Filtrer par niveau estimé si applicable
      return q.skillId >= (levelId - 1) * 5 && q.skillId <= levelId * 5 + 5;
    });
  }

  const selectedNew = shuffleArray(newQuestions.length > 0 ? newQuestions : allQuestions).slice(
    0,
    newQuestionsCount
  );

  // 2. Questions de révision (compétences faibles)
  let reviewQuestions: any[] = [];
  if (reviewQuestionsCount > 0) {
    const userSkills = await getUserSkillProgress(userId);
    const weakSkills = userSkills.filter((s) => s.masteryScore < 75);

    if (weakSkills.length > 0) {
      const weakSkillIds = new Set(weakSkills.map((s) => s.skillId));
      const pool = allQuestions.filter(
        (q) => weakSkillIds.has(q.skillId) && !selectedNew.some((n) => n.id === q.id)
      );
      reviewQuestions = shuffleArray(pool).slice(0, reviewQuestionsCount);
    }

    if (reviewQuestions.length < reviewQuestionsCount) {
      const remainingCount = reviewQuestionsCount - reviewQuestions.length;
      const otherQuestions = allQuestions.filter(
        (q) =>
          !selectedNew.some((n) => n.id === q.id) &&
          !reviewQuestions.some((r) => r.id === q.id)
      );
      reviewQuestions = [...reviewQuestions, ...shuffleArray(otherQuestions).slice(0, remainingCount)];
    }
  }

  const combined = [...selectedNew, ...reviewQuestions];
  return shuffleArray(combined.length > 0 ? combined : allQuestions.slice(0, totalQuestions));
}

/**
 * Créer une évaluation avec questions sélectionnées
 */
export async function createAssessmentWithQuestions(params: {
  title: string;
  assessmentType: string;
  levelId?: number;
  moduleId?: number;
  lessonId?: number;
  userId: number;
  totalQuestions: number;
  passingScore?: number;
  distribution?: AssessmentDistribution;
}): Promise<any> {
  const { title, assessmentType, levelId, moduleId, lessonId, userId, totalQuestions, passingScore = 75, distribution } = params;

  const questions = await selectQuestionsForAssessment({
    levelId,
    moduleId,
    lessonId,
    userId,
    distribution,
    totalQuestions,
  });

  const now = new Date().toISOString();
  const assessmentId = Date.now();
  const assessmentRecord = {
    id: assessmentId,
    title,
    assessmentType,
    levelId: levelId || null,
    moduleId: moduleId || null,
    lessonId: lessonId || null,
    passingScore,
    questionCount: questions.length,
    questionIds: questions.map((q) => q.id),
    isCumulative: true,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };

  const db = () => getFirestore();
  await db().collection(COLLECTIONS.ASSESSMENTS).doc(String(assessmentId)).set(assessmentRecord);

  return { assessment: assessmentRecord, questions };
}
