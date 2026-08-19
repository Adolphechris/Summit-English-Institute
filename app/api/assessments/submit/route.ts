import { NextResponse } from 'next/server';
import { query, execute, queryOne, withTransaction } from '@/services/database/client';
import { recordAssessmentResult } from '@/services/progress/update';
import { getRequestUserId } from '@/services/auth/api';

// POST /api/assessments/submit
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { assessmentId, answers } = body;

    // Valider l'identifiant de l'évaluation
    const numericAssessmentId = parseInt(assessmentId, 10);
    if (!numericAssessmentId || isNaN(numericAssessmentId)) {
      return NextResponse.json({ error: "Identifiant d'évaluation invalide" }, { status: 400 });
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: 'Aucune réponse fournie' }, { status: 400 });
    }

    // Récupérer l'évaluation (seuil de validation + références de progression)
    const evaluation = await queryOne<{ id: number; passing_score: number; level_id: number | null; lesson_id: number | null; module_id: number | null }>(
      `SELECT id, passing_score, level_id, lesson_id, module_id
       FROM assessments WHERE id = $1 AND status = 'active'`,
      [numericAssessmentId]
    );

    if (!evaluation) {
      return NextResponse.json({ error: 'Évaluation introuvable' }, { status: 404 });
    }

    // Récupérer les bonnes réponses depuis la table answers
    const questionIds = answers.map((a: any) => a.questionId);
    const correctAnswers = await query(
      `SELECT q.id, a.answer_text
       FROM questions q
       JOIN answers a ON q.id = a.question_id AND a.is_correct = true
       WHERE q.id = ANY($1::int[])`,
      [questionIds]
    );

    const correctMap = new Map(correctAnswers.map((a: any) => [a.id, a.answer_text]));

    // Calculer le score
    let correctCount = 0;
    const answerResults = answers.map((answer: any) => {
      const correctAnswer = correctMap.get(answer.questionId);
      const isCorrect = correctAnswer !== undefined && answer.givenAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
      if (isCorrect) correctCount++;
      return {
        ...answer,
        isCorrect,
        correctAnswer,
      };
    });

    const score = Math.round((correctCount / answers.length) * 100);
    const passingScore = evaluation?.passing_score ?? 75;
    const passed = score >= passingScore;

    // Créer la tentative + enregistrer les réponses : ensemble atomique
    const attempt = await withTransaction(async (client) => {
      const created = await client.query(
        `INSERT INTO attempts (user_id, assessment_id, score, status, result, finished_at)
         VALUES ($1, $2, $3, 'completed', $4, NOW())
         RETURNING *`,
        [userId, numericAssessmentId, score, passed ? 'passed' : 'failed']
      );

      const attemptRow = created.rows[0];

      for (const answer of answerResults) {
        await client.query(
          `INSERT INTO attempt_answers (attempt_id, question_id, given_answer, is_correct, points_earned)
           VALUES ($1, $2, $3, $4, $5)`,
          [attemptRow.id, answer.questionId, answer.givenAnswer, answer.isCorrect, answer.isCorrect ? 1 : 0]
        );
      }

      return attemptRow;
    });

    // Alimenter la progression pédagogique (maîtrise par compétence, niveaux, révisions)
    const questionSkillRows = await query<{ id: number; skill_id: number }>(
      `SELECT q.id, q.skill_id FROM questions q WHERE q.id = ANY($1::int[])`,
      [questionIds]
    );

    await recordAssessmentResult({
      userId,
      assessmentId: numericAssessmentId,
      questions: questionSkillRows,
      answerResults: answerResults.map((a) => ({ questionId: a.questionId, isCorrect: a.isCorrect })),
      score,
      passed,
    });

    // Mettre à jour la progression générale à partir du score réel
    const progress = await queryOne(
      `SELECT overall_progress FROM progress WHERE user_id = $1`,
      [userId]
    );

    const currentProgress = progress?.overall_progress || 0;
    const newProgress = passed
      ? Math.min(100, currentProgress + Math.max(5, Math.round(score / 10)))
      : Math.max(0, currentProgress - 2);

    await execute(
      `UPDATE progress SET overall_progress = $1, updated_at = NOW()
       WHERE user_id = $2`,
      [newProgress, userId]
    );

    return NextResponse.json({
      score,
      passed,
      correctCount,
      totalQuestions: answers.length,
      attemptId: attempt.id,
    });
  } catch (error) {
    console.error('[SUBMIT ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
