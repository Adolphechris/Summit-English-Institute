import { NextResponse } from 'next/server';
import { queryOne } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';

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

    const lessonId = parseInt(params.id);

    // Récupérer la leçon avec ses exemples, vocabulaire, expressions, pratique
    const lesson = await queryOne(
      `SELECT l.*, m.title as module_title, lvl.title as level_title
       FROM lessons l
       JOIN modules m ON l.module_id = m.id
       JOIN levels lvl ON m.level_id = lvl.id
       WHERE l.id = $1 AND l.status = 'active'`,
      [lessonId]
    );

    if (!lesson) {
      return NextResponse.json({ error: 'Leçon introuvable' }, { status: 404 });
    }

    // Pour l'instant, nous retournons la leçon de base
    // Les exemples, vocabulaire, expressions et pratique seront chargés séparément
    // ou inclus dans des champs JSONB

    return NextResponse.json({
      lesson: {
        id: lesson.id,
        moduleId: lesson.module_id,
        title: lesson.title,
        objective: lesson.objective,
        explanation: lesson.explanation,
        examples: lesson.examples || [],
        vocabulary: lesson.vocabulary || [],
        expressions: lesson.expressions || [],
        itContext: lesson.it_context,
        practice: lesson.practice || [],
        summary: lesson.summary,
        orderIndex: lesson.order_index,
        status: lesson.status,
        version: lesson.version,
        moduleTitle: lesson.module_title,
        levelTitle: lesson.level_title,
      },
    });
  } catch (error) {
    console.error('[LESSON ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
