import { NextResponse } from 'next/server';
import { listAssessments, listLevels, listModules, getUserById, getLevelById } from '@/services/database/firestore-repository';
import { createAssessmentWithQuestions } from '@/services/assessment/engine';
import { getRequestUserId } from '@/services/auth/api';
import { FREE_LEVELS } from '@/lib/constants';
import { isPremiumUser } from '@/lib/entitlements';
import { PREMIUM_REQUIRED_MESSAGE } from '@/lib/pricing';
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

    const [allAssessments, allLevels, allModules] = await Promise.all([
      listAssessments(),
      listLevels(),
      listModules(),
    ]);

    const levelMap = new Map(allLevels.map((l) => [l.id, l]));
    const moduleMap = new Map(allModules.map((m) => [m.id, m]));

    let filtered = allAssessments.filter((a) => a.status === 'active');

    if (lessonId) filtered = filtered.filter((a) => a.lessonId === parseInt(lessonId, 10));
    if (moduleId) filtered = filtered.filter((a) => a.moduleId === parseInt(moduleId, 10));
    if (levelId) filtered = filtered.filter((a) => a.levelId === parseInt(levelId, 10));
    if (type) filtered = filtered.filter((a) => a.assessmentType === type);

    const assessments = filtered.map((a) => {
      const lvl = a.levelId ? levelMap.get(a.levelId) : undefined;
      // Gating freemium : cumulatives ou niveau > FREE_LEVELS réservées Premium
      const isPremiumContent = a.isCumulative || (lvl ? lvl.number > FREE_LEVELS : false);
      return ({
      id: a.id,
      title: a.title,
      assessment_type: a.assessmentType,
      passing_score: a.passingScore,
      level_id: a.levelId || null,
      module_id: a.moduleId || null,
      lesson_id: a.lessonId || null,
      level_title: a.levelId ? levelMap.get(a.levelId)?.title || null : null,
      module_title: a.moduleId ? moduleMap.get(a.moduleId)?.title || null : null,
      is_premium: isPremiumContent,
      });
    });

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

    // Gating freemium : création d'évaluation sur niveau premium réservée
    if (levelId) {
      const user = await getUserById(userId);
      const lvl = await getLevelById(parseInt(levelId, 10));
      if (lvl && lvl.number > FREE_LEVELS && !isPremiumUser(user)) {
        return NextResponse.json(
          { error: PREMIUM_REQUIRED_MESSAGE, code: 'PREMIUM_REQUIRED' },
          { status: 403 }
        );
      }
    }

    const result = await createAssessmentWithQuestions({
      title,
      assessmentType,
      levelId: levelId ? parseInt(levelId, 10) : undefined,
      moduleId: moduleId ? parseInt(moduleId, 10) : undefined,
      lessonId: lessonId ? parseInt(lessonId, 10) : undefined,
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
