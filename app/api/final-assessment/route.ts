import { NextResponse } from 'next/server';
import { query, queryOne } from '@/services/database/client';
import { APP_CONFIG } from '@/lib/constants';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/final-assessment
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Vérifier si l'évaluation finale a déjà été passée
    const existingAttempt = await queryOne(
      `SELECT id, score, result, finished_at
       FROM attempts
       WHERE user_id = $1 AND assessment_id = $2
       AND status = 'completed'
       ORDER BY finished_at DESC
       LIMIT 1`,
      [userId, APP_CONFIG.finalAssessmentId]
    );

    if (existingAttempt) {
      return NextResponse.json({
        alreadyCompleted: true,
        score: existingAttempt.score,
        passed: existingAttempt.result === 'passed',
        completedAt: existingAttempt.finished_at,
      });
    }

    // Vérifier les prérequis : progression suffisante
    const progress = await queryOne(
      `SELECT overall_progress FROM progress WHERE user_id = $1`,
      [userId]
    );

    const overallProgress = progress?.overall_progress || 0;

    // L'utilisateur doit avoir complété au moins 70% du programme
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
