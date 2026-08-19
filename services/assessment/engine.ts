// ============================================================================
// Moteur d'évaluation avec sélection cumulative
// ============================================================================

import { query, queryOne, withTransaction } from '@/services/database/client';
import type { AssessmentDistribution } from '@/types';

/**
 * Sélectionner des questions pour une évaluation en mélangeant
 * nouvelles notions et anciennes notions (cumulative)
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
  const { levelId, moduleId, lessonId, userId, distribution, totalQuestions } = params;

  // Calculer la répartition : 70% nouvelles notions, 30% révision cumulative
  const newQuestionsCount = Math.floor(totalQuestions * 0.7);
  const reviewQuestionsCount = totalQuestions - newQuestionsCount;

  let questions: any[] = [];

  // 1. Sélectionner les nouvelles questions selon le contexte
  const newQuestions = await selectNewQuestions({
    levelId,
    moduleId,
    lessonId,
    count: newQuestionsCount,
    distribution,
  });

  questions = [...questions, ...newQuestions];

  // 2. Sélectionner des questions de révision (compétences faibles ou anciennes)
  if (reviewQuestionsCount > 0) {
    const reviewQuestions = await selectReviewQuestions({
      userId,
      count: reviewQuestionsCount,
      excludeIds: newQuestions.map((q) => q.id),
    });

    questions = [...questions, ...reviewQuestions];
  }

  // Mélanger les questions
  return shuffleArray(questions);
}

/**
 * Sélectionner des questions nouvelles selon le contexte
 */
async function selectNewQuestions(params: {
  levelId?: number;
  moduleId?: number;
  lessonId?: number;
  count: number;
  distribution?: AssessmentDistribution;
}): Promise<any[]> {
  const { levelId, moduleId, lessonId, count, distribution } = params;

  let queryText = `
    SELECT q.id, q.type, q.question_text, q.context, q.difficulty, q.skill_id,
           a.answer_text, a.order_index
    FROM questions q
    LEFT JOIN answers a ON q.id = a.question_id
    WHERE q.status = 'active'
  `;
  const queryParams: any[] = [];
  let paramIndex = 1;

  if (lessonId) {
    queryText += ` AND q.lesson_id = $${paramIndex}`;
    queryParams.push(lessonId);
    paramIndex++;
  } else if (moduleId) {
    queryText += ` AND EXISTS (
      SELECT 1 FROM lessons l
      JOIN modules m ON l.module_id = m.id
      WHERE l.id = q.lesson_id AND m.id = $${paramIndex}
    )`;
    queryParams.push(moduleId);
    paramIndex++;
  } else if (levelId) {
    queryText += ` AND EXISTS (
      SELECT 1 FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN levels lvl ON m.level_id = lvl.id
      WHERE l.id = q.lesson_id AND lvl.id = $${paramIndex}
    )`;
    queryParams.push(levelId);
    paramIndex++;
  }

  // Appliquer la distribution si fournie : une sous-requête paramétrée par
  // compétence (union de sélections LIMIT) — corrige le SQL invalide précédent
  // (`(SELECT id FROM skills WHERE code = '...') LIMIT n` dans une comparaison)
  // et élimine l'injection SQL par interpolation du code de compétence.
  if (distribution && Object.keys(distribution).length > 0) {
    const selections: string[] = [];
    const distParams: any[] = [];

    for (const [skillCode, percentage] of Object.entries(distribution)) {
      const skillCount = Math.max(1, Math.floor((count * percentage) / 100));
      distParams.push(skillCode, skillCount);
      selections.push(
        `SELECT q.id, q.type, q.question_text, q.context, q.difficulty, q.skill_id,
                a.answer_text, a.order_index
         FROM questions q
         JOIN skills s ON q.skill_id = s.id
         LEFT JOIN answers a ON q.id = a.question_id
         WHERE q.status = 'active' AND s.code = $${distParams.length - 1}
         ORDER BY RANDOM()
         LIMIT $${distParams.length}`
      );
    }

    const questions = await query(
      selections.join(' UNION ALL '),
      distParams
    );
    return formatQuestions(questions).slice(0, count);
  }

  queryText += ` ORDER BY RANDOM() LIMIT $${paramIndex}`;
  queryParams.push(count);

  const questions = await query(queryText, queryParams);

  return formatQuestions(questions);
}

/**
 * Sélectionner des questions de révision (cumulative)
 */
async function selectReviewQuestions(params: {
  userId: number;
  count: number;
  excludeIds: number[];
}): Promise<any[]> {
  const { userId, count, excludeIds } = params;

  // 1. D'abord, essayer de prendre des questions sur les compétences faibles
  const weakSkills = await query(
    `SELECT s.id, s.code
     FROM skill_progress sp
     JOIN skills s ON sp.skill_id = s.id
     WHERE sp.user_id = $1 AND sp.mastery_score < 75
     ORDER BY sp.mastery_score ASC
     LIMIT 5`,
    [userId]
  );

  let questions: any[] = [];

  if (weakSkills.length > 0) {
    const skillIds = weakSkills.map((s: any) => s.id).join(',');
    const weakQuestions = await query(
      `SELECT q.id, q.type, q.question_text, q.context, q.difficulty, q.skill_id,
              a.answer_text, a.order_index
       FROM questions q
       LEFT JOIN answers a ON q.id = a.question_id
       WHERE q.status = 'active'
         AND q.skill_id IN (${skillIds})
         AND q.id != ALL($1::int[])
       ORDER BY RANDOM()
       LIMIT $2`,
      [excludeIds, Math.ceil(count * 0.6)]
    );

    questions = [...questions, ...formatQuestions(weakQuestions)];
  }

  // 2. Compléter avec des questions aléatoires si nécessaire
  if (questions.length < count) {
    const remaining = count - questions.length;
    const randomQuestions = await query(
      `SELECT q.id, q.type, q.question_text, q.context, q.difficulty, q.skill_id,
              a.answer_text, a.order_index
       FROM questions q
       LEFT JOIN answers a ON q.id = a.question_id
       WHERE q.status = 'active'
         AND q.id != ALL($1::int[])
       ORDER BY RANDOM()
       LIMIT $2`,
      [excludeIds, remaining]
    );

    questions = [...questions, ...formatQuestions(randomQuestions)];
  }

  return shuffleArray(questions).slice(0, count);
}

/**
 * Formater les questions pour l'interface
 */
function formatQuestions(questions: any[]): any[] {
  const questionMap = new Map();

  for (const q of questions) {
    if (!questionMap.has(q.id)) {
      questionMap.set(q.id, {
        id: q.id,
        type: q.type,
        questionText: q.question_text,
        context: q.context,
        difficulty: q.difficulty,
        skillId: q.skill_id,
        options: [],
      });
    }

    if (q.answer_text) {
      const question = questionMap.get(q.id);
      question.options.push(q.answer_text);
    }
  }

  return Array.from(questionMap.values());
}

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

  // Sélectionner les questions
  const questions = await selectQuestionsForAssessment({
    levelId,
    moduleId,
    lessonId,
    userId,
    distribution,
    totalQuestions,
  });

  // Créer l'évaluation puis associer les questions : ensemble atomique.
  // (évite une évaluation orpheline en cas d'échec d'association)
  const result = await withTransaction(async (client) => {
    const assessment = await client.query(
      `INSERT INTO assessments (title, assessment_type, level_id, module_id, lesson_id, passing_score, question_count, is_cumulative, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true, 'active')
       RETURNING *`,
      [title, assessmentType, levelId || null, moduleId || null, lessonId || null, passingScore, questions.length]
    );

    const created = assessment.rows[0];

    for (let i = 0; i < questions.length; i++) {
      await client.query(
        `INSERT INTO assessment_questions (assessment_id, question_id, order_index, weight)
         VALUES ($1, $2, $3, 1)`,
        [created.id, questions[i].id, i + 1]
      );
    }

    return created;
  });

  return { assessment: result, questions };
}
