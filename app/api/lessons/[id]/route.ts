import { NextResponse } from 'next/server';
import { getLessonById, getModuleById, getLevelById, getUserById } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';
import { FREE_LEVELS } from '@/lib/constants';
import { isPremiumUser } from '@/lib/entitlements';
import { PREMIUM_REQUIRED_MESSAGE } from '@/lib/pricing';

// GET /api/lessons/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const lessonId = parseInt(params.id, 10);
    if (isNaN(lessonId)) {
      return NextResponse.json({ error: 'Identifiant invalide' }, { status: 400 });
    }

    const lesson = await getLessonById(lessonId);
    if (!lesson || lesson.status === 'archived') {
      return NextResponse.json({ error: 'Leçon introuvable' }, { status: 404 });
    }

    const parentModule = await getModuleById(lesson.moduleId);
    const parentLevel = parentModule ? await getLevelById(parentModule.levelId) : null;

    // Gating freemium : leçons des niveaux > FREE_LEVELS réservées Premium
    const user = await getUserById(userId);
    if (parentLevel && parentLevel.number > FREE_LEVELS && !isPremiumUser(user)) {
      return NextResponse.json(
        { error: PREMIUM_REQUIRED_MESSAGE, code: 'PREMIUM_REQUIRED' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      lesson: {
        id: lesson.id,
        moduleId: lesson.moduleId,
        title: lesson.title,
        objective: lesson.objective,
        explanation: lesson.explanation,
        examples: lesson.examples || [],
        vocabulary: lesson.vocabulary || [],
        expressions: lesson.expressions || [],
        itContext: lesson.itContext,
        practice: lesson.practice || [],
        summary: lesson.summary,
        orderIndex: lesson.orderIndex,
        status: lesson.status,
        version: lesson.version,
        moduleTitle: parentModule?.title || 'Module',
        levelTitle: parentLevel?.title || 'Level',
      },
    });
  } catch (error) {
    console.error('[LESSON ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
