import { NextResponse } from 'next/server';
import { query, queryOne } from '@/services/database/client';
import { selectQuestionsForAssessment } from '@/services/assessment/engine';
import { APP_CONFIG } from '@/lib/constants';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/final-assessment/questions
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Vérifier les prérequis
    const progress = await queryOne(
      `SELECT overall_progress FROM progress WHERE user_id = $1`,
      [userId]
    );

    const overallProgress = progress?.overall_progress || 0;

    if (overallProgress < 70) {
      return NextResponse.json(
        { error: `You need at least 70% completion to take the final assessment. Current: ${overallProgress}%` },
        { status: 403 }
      );
    }

    // Récupérer l'évaluation finale
    const assessment = await queryOne(
      `SELECT * FROM assessments WHERE id = $1 AND status = 'active'`,
      [APP_CONFIG.finalAssessmentId]
    );

    if (!assessment) {
      return NextResponse.json({ error: 'Évaluation finale non disponible' }, { status: 404 });
    }

    // Sélectionner les questions de manière cumulative
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
