import { NextResponse } from 'next/server';
import { getUserAttempts, getUserProgress } from '@/services/database/firestore-repository';
import { APP_CONFIG } from '@/lib/constants';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/final-assessment
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const attempts = await getUserAttempts(userId, APP_CONFIG.finalAssessmentId);
    const existingAttempt = attempts.find((a) => a.status === 'completed');

    if (existingAttempt) {
      return NextResponse.json({
        alreadyCompleted: true,
        score: existingAttempt.score,
        passed: existingAttempt.result === 'passed',
        completedAt: existingAttempt.finishedAt || existingAttempt.createdAt,
      });
    }

    const progress = await getUserProgress(userId);
    const overallProgress = progress?.overallProgress || 0;

    if (overallProgress < 70) {
      return NextResponse.json({
        canTake: false,
        reason: `You need at least 70% completion to take the final assessment. Current: ${overallProgress}%`,
      });
    }

    return NextResponse.json({
      canTake: true,
      overallProgress,
    });
  } catch (error) {
    console.error('[FINAL ASSESSMENT CHECK ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
