import { NextResponse } from 'next/server';
import { query, execute, queryOne, withTransaction } from '@/services/database/client';
import { APP_CONFIG } from '@/lib/constants';
import { getRequestUserId } from '@/services/auth/api';

// POST /api/final-assessment/submit
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { answers: userAnswers } = body;

    if (!userAnswers || !Array.isArray(userAnswers) || userAnswers.length === 0) {
      return NextResponse.json({ error: 'Aucune réponse fournie' }, { status: 400 });
    }

    // Récupérer l'évaluation finale
    const assessment = await queryOne(
      `SELECT * FROM assessments WHERE id = $1 AND status = 'active'`,
      [APP_CONFIG.finalAssessmentId]
    );

    if (!assessment) {
      return NextResponse.json({ error: 'Évaluation finale non disponible' }, { status: 404 });
    }

    // Récupérer toutes les questions avec leurs réponses
    const questions = await query(
      `SELECT q.id, q.type, q.question_text, q.skill_id,
              a.answer_text, a.is_correct
       FROM assessment_questions aq
       JOIN questions q ON aq.question_id = q.id
       LEFT JOIN answers a ON q.id = a.question_id AND a.is_correct = true
       WHERE aq.assessment_id = $1
       ORDER BY aq.order_index ASC`,
      [assessment.id]
    );

    // Récupérer les bonnes réponses
    const questionIds = questions.map((q: any) => q.id);
    const correctAnswers = await query(
      `SELECT q.id, a.answer_text
       FROM questions q
       JOIN answers a ON q.id = a.question_id AND a.is_correct = true
       WHERE q.id = ANY($1::int[])`,
      [questionIds]
    );

    const correctMap = new Map(correctAnswers.map((a: any) => [a.id, a.answer_text]));

    // Calculer le score à partir des réponses réelles
    let correctCount = 0;
    const totalQuestions = questions.length;

    for (const answer of userAnswers) {
      const correctAnswer = correctMap.get(answer.questionId);
      if (correctAnswer && answer.givenAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    }

    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    const passed = finalScore >= 75;

    // Tentative + certificat + progression : ensemble atomique
    const { attemptId, certificateId } = await withTransaction(async (client) => {
      const attemptRow = await client.query(
        `INSERT INTO attempts (user_id, assessment_id, score, status, result, finished_at)
         VALUES ($1, $2, $3, 'completed', $4, NOW())
         RETURNING *`,
        [userId, assessment.id, finalScore, passed ? 'passed' : 'failed']
      );

      let certCode: string | undefined;
      if (passed) {
        const certificate = await client.query(
          `INSERT INTO certificates (user_id, course_id, certificate_code, final_score, status)
           VALUES ($1, $2, $3, $4, 'issued')
           RETURNING *`,
          [userId, 1, `CERT-${Date.now()}-${userId}`, finalScore]
        );
        certCode = certificate.rows[0].certificate_code;
      }

      await client.query(
        `UPDATE progress SET is_completed = true, completed_at = NOW(), overall_progress = 100
         WHERE user_id = $1`,
        [userId]
      );

      return { attemptId: attemptRow.rows[0].id, certificateId: certCode };
    });

    // Calculer les scores par domaine à partir des compétences
    const domainScores = await calculateDomainScores(questions, userAnswers, correctMap);

    return NextResponse.json({
      score: finalScore,
      passed,
      domains: domainScores,
      completion: 100,
      mastery: finalScore,
      certificateId,
    });
  } catch (error) {
    console.error('[FINAL ASSESSMENT SUBMIT ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

/**
 * Calculer les scores par domaine à partir des réponses.
 * Utilise le Map des bonnes réponses déjà récupéré (évite le N+1 en base).
 */
async function calculateDomainScores(questions: any[], userAnswers: any[], correctMap: Map<number, string>) {
  const domainCounts: Record<string, { correct: number; total: number }> = {};

  // Initialiser les compteurs par domaine
  const domains = ['grammar', 'conversation', 'it', 'cybersecurity', 'professional', 'academic'];
  domains.forEach(d => {
    domainCounts[d] = { correct: 0, total: 0 };
  });

  // Récupérer les compétences avec leurs domaines
  const skills = await query(
    `SELECT id, domain FROM skills WHERE status = 'active'`
  );

  const skillDomainMap = new Map(skills.map((s: any) => [s.id, s.domain]));

  // Compter les réponses par domaine
  for (const answer of userAnswers) {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) continue;

    const domain = skillDomainMap.get(question.skill_id);
    if (!domain || !domainCounts[domain]) continue;

    domainCounts[domain].total++;

    const correctAnswer = correctMap.get(answer.questionId);

    if (correctAnswer && answer.givenAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      domainCounts[domain].correct++;
    }
  }

  // Calculer les pourcentages
  return domains.map(domain => {
    const counts = domainCounts[domain];
    const score = counts.total > 0 ? Math.round((counts.correct / counts.total) * 100) : 0;
    return { domain, score };
  });
}
