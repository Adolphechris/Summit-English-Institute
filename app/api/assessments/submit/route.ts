import { NextResponse } from 'next/server';
import {
  getAssessmentById,
  getQuestionsByIds,
  getLevelById,
  saveAttempt,
  getUserProgress,
  initOrUpdateProgress,
  getUserById,
} from '@/services/database/firestore-repository';
import { recordAssessmentResult } from '@/services/progress/update';
import { getRequestUserId } from '@/services/auth/api';
import { FREE_LEVELS } from '@/lib/constants';
import { isPremiumUser } from '@/lib/entitlements';
import { PREMIUM_REQUIRED_MESSAGE } from '@/lib/pricing';

// POST /api/assessments/submit
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { assessmentId, answers } = body;

    const numericAssessmentId = parseInt(assessmentId, 10);
    if (!numericAssessmentId || isNaN(numericAssessmentId)) {
      return NextResponse.json({ error: "Identifiant d'évaluation invalide" }, { status: 400 });
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: 'Aucune réponse fournie' }, { status: 400 });
    }

    const evaluation = await getAssessmentById(numericAssessmentId);
    if (!evaluation || evaluation.status === 'archived') {
      return NextResponse.json({ error: 'Évaluation introuvable' }, { status: 404 });
    }

    // Gating freemium : cumulatives ou niveau > FREE_LEVELS réservées Premium
    const user = await getUserById(userId);
    const evalLevel = evaluation.levelId ? await getLevelById(evaluation.levelId) : null;
    const evalLevelNumber = evalLevel?.number ?? null;
    const isPremiumContent = evaluation.isCumulative || (evalLevelNumber !== null && evalLevelNumber > FREE_LEVELS);
    if (isPremiumContent && !isPremiumUser(user)) {
      return NextResponse.json(
        { error: PREMIUM_REQUIRED_MESSAGE, code: 'PREMIUM_REQUIRED' },
        { status: 403 }
      );
    }

    const questionIds = answers.map((a: any) => Number(a.questionId));
    const questions = await getQuestionsByIds(questionIds);
    const questionsMap = new Map(questions.map((q) => [q.id, q]));

    let correctCount = 0;
    const answerResults = answers.map((answer: any) => {
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

    const score = Math.round((correctCount / answers.length) * 100);
    const passingScore = evaluation.passingScore ?? 75;
    const passed = score >= passingScore;

    const now = new Date().toISOString();
    const attempt = await saveAttempt({
      userId,
      assessmentId: numericAssessmentId,
      startedAt: now,
      finishedAt: now,
      score,
      status: 'completed',
      result: passed ? 'passed' : 'failed',
      answers: answerResults,
    });

    const questionSkillRefs = questions.map((q) => ({ id: q.id, skill_id: q.skillId }));

    await recordAssessmentResult({
      userId,
      assessmentId: numericAssessmentId,
      questions: questionSkillRefs,
      answerResults: answerResults.map((a) => ({ questionId: a.questionId, isCorrect: a.isCorrect })),
      score,
      passed,
    });

    const userProg = await getUserProgress(userId);
    const currentProgress = userProg?.overallProgress || 0;
    const newProgress = passed
      ? Math.min(100, currentProgress + Math.max(5, Math.round(score / 10)))
      : Math.max(0, currentProgress - 2);

    await initOrUpdateProgress(userId, { overallProgress: newProgress });

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
