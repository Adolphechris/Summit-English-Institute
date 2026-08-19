import { NextResponse } from 'next/server';
import { query, queryOne } from '@/services/database/client';
import { createAssessmentWithQuestions } from '@/services/assessment/engine';
import { getRequestUserId } from '@/services/auth/api';
import type { AssessmentDistribution } from '@/types';

// GET /api/assessments
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const url = new URL(request.url);
    const lessonId = url.searchParams.get('lessonId');
    const moduleId = url.searchParams.get('moduleId');
    const levelId = url.searchParams.get('levelId');
    const type = url.searchParams.get('type');

    let queryText = `
      SELECT a.*, lvl.title as level_title, m.title as module_title
      FROM assessments a
      LEFT JOIN levels lvl ON a.level_id = lvl.id
      LEFT JOIN modules m ON a.module_id = m.id
      WHERE a.status = 'active'
    `;
    const params: any[] = [];

    if (lessonId) {
      queryText += ` AND a.lesson_id = $${params.length + 1}`;
      params.push(parseInt(lessonId));
    }
    if (moduleId) {
      queryText += ` AND a.module_id = $${params.length + 1}`;
      params.push(parseInt(moduleId));
    }
    if (levelId) {
      queryText += ` AND a.level_id = $${params.length + 1}`;
      params.push(parseInt(levelId));
    }
    if (type) {
      queryText += ` AND a.assessment_type = $${params.length + 1}`;
      params.push(type);
    }

    queryText += ' ORDER BY a.created_at DESC LIMIT 50';

    const assessments = await query(queryText, params);

    return NextResponse.json({ assessments });
  } catch (error) {
    console.error('[ASSESSMENTS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/assessments
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { title, assessmentType, levelId, moduleId, lessonId, passingScore, questionCount, distribution } = body;

    if (!title || !assessmentType) {
      return NextResponse.json({ error: 'Titre et type requis' }, { status: 400 });
    }

    // Créer l'évaluation avec questions sélectionnées de manière cumulative
    const result = await createAssessmentWithQuestions({
      title,
      assessmentType,
      levelId: levelId ? parseInt(levelId) : undefined,
      moduleId: moduleId ? parseInt(moduleId) : undefined,
      lessonId: lessonId ? parseInt(lessonId) : undefined,
      userId,
      totalQuestions: questionCount || 10,
      passingScore: passingScore || 75,
      distribution: distribution as AssessmentDistribution | undefined,
    });

    return NextResponse.json({ assessment: result.assessment }, { status: 201 });
  } catch (error) {
    console.error('[CREATE ASSESSMENT ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
