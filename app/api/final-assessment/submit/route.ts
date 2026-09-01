import { NextResponse } from 'next/server';
import {
  getAssessmentById,
  getQuestionsByIds,
  saveAttempt,
  createCertificate,
  initOrUpdateProgress,
  listSkills,
  getUserById,
} from '@/services/database/firestore-repository';
import { APP_CONFIG } from '@/lib/constants';
import { getRequestUserId } from '@/services/auth/api';
import { isPremiumUser } from '@/lib/entitlements';
import { PREMIUM_REQUIRED_MESSAGE } from '@/lib/pricing';

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

    const assessment = await getAssessmentById(APP_CONFIG.finalAssessmentId);
    if (!assessment || assessment.status === 'archived') {
      return NextResponse.json({ error: 'Évaluation finale non disponible' }, { status: 404 });
    }

    // Gating freemium : l'évaluation finale certifie le programme complet → Premium
    const user = await getUserById(userId);
    if (!isPremiumUser(user)) {
      return NextResponse.json(
        { error: PREMIUM_REQUIRED_MESSAGE, code: 'PREMIUM_REQUIRED' },
        { status: 403 }
      );
    }

    const questionIds = userAnswers.map((a: any) => Number(a.questionId));
    const questions = await getQuestionsByIds(questionIds.length > 0 ? questionIds : assessment.questionIds || []);
    const questionsMap = new Map(questions.map((q) => [q.id, q]));

    let correctCount = 0;
    const totalQuestions = userAnswers.length;

    const answerResults = userAnswers.map((answer: any) => {
      const q = questionsMap.get(Number(answer.questionId));
      const correctAnswer = q?.correctAnswer;
      const isCorrect =
        correctAnswer !== undefined &&
        String(answer.givenAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();

      if (isCorrect) correctCount++;
      return {
        questionId: Number(answer.questionId),
        givenAnswer: answer.givenAnswer,
        isCorrect,
        correctAnswer,
        skillId: q?.skillId,
        pointsEarned: isCorrect ? 1 : 0,
      };
    });

    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    const passed = finalScore >= 75;
    const now = new Date().toISOString();

    await saveAttempt({
      userId,
      assessmentId: assessment.id,
      startedAt: now,
      finishedAt: now,
      score: finalScore,
      status: 'completed',
      result: passed ? 'passed' : 'failed',
      answers: answerResults,
    });

    let certificateCode: string | undefined;
    if (passed) {
      const userDoc = await getUserById(userId);
      const userName = userDoc?.firstName && userDoc?.lastName ? `${userDoc.firstName} ${userDoc.lastName}` : userDoc?.email || 'Apprenant';
      certificateCode = `CERT-${Date.now()}-${userId}`;

      await createCertificate({
        certificateCode,
        userId,
        userName,
        finalScore,
        completedAt: now,
        status: 'issued',
      });
    }

    await initOrUpdateProgress(userId, {
      isCompleted: true,
      completedAt: now,
      overallProgress: 100,
    });

    const allSkills = await listSkills();
    const domainScores = calculateDomainScores(questions, answerResults, allSkills);

    return NextResponse.json({
      score: finalScore,
      passed,
      domains: domainScores,
      completion: 100,
      mastery: finalScore,
      certificateId: certificateCode,
    });
  } catch (error) {
    console.error('[FINAL ASSESSMENT SUBMIT ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

function calculateDomainScores(questions: any[], answerResults: any[], skills: any[]) {
  const domainCounts: Record<string, { correct: number; total: number }> = {};
  const domains = ['grammar', 'conversation', 'it', 'cybersecurity', 'professional', 'academic'];

  domains.forEach((d) => {
    domainCounts[d] = { correct: 0, total: 0 };
  });

  const skillMap = new Map(skills.map((s) => [s.id, s]));
  const questionsMap = new Map(questions.map((q) => [q.id, q]));

  for (const answer of answerResults) {
    const q = questionsMap.get(answer.questionId);
    if (!q) continue;

    const skill = skillMap.get(q.skillId);
    const domain = skill?.domain || 'grammar';

    if (!domainCounts[domain]) domainCounts[domain] = { correct: 0, total: 0 };
    domainCounts[domain].total++;
    if (answer.isCorrect) domainCounts[domain].correct++;
  }

  return domains.map((domain) => {
    const counts = domainCounts[domain];
    const score = counts.total > 0 ? Math.round((counts.correct / counts.total) * 100) : 0;
    return { domain, score };
  });
}
