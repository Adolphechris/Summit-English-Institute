import { NextResponse } from 'next/server';
import { getUserProgress, getAssessmentById, getUserById } from '@/services/database/firestore-repository';
import { selectQuestionsForAssessment } from '@/services/assessment/engine';
import { APP_CONFIG } from '@/lib/constants';
import { getRequestUserId } from '@/services/auth/api';
import { isPremiumUser } from '@/lib/entitlements';
import { PREMIUM_REQUIRED_MESSAGE } from '@/lib/pricing';

// GET /api/final-assessment/questions
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const progress = await getUserProgress(userId);
    const overallProgress = progress?.overallProgress || 0;

    if (overallProgress < 70) {
      return NextResponse.json(
        { error: `You need at least 70% completion to take the final assessment. Current: ${overallProgress}%` },
        { status: 403 }
      );
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

    const questions = await selectQuestionsForAssessment({
      assessmentId: assessment.id,
      userId,
      totalQuestions: 50,
    });

    return NextResponse.json({ questions, assessmentId: assessment.id });
  } catch (error) {
    console.error('[FINAL ASSESSMENT QUESTIONS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
