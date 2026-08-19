import { NextResponse } from 'next/server';
import { query, queryOne } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/assessments/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const assessmentId = parseInt(params.id, 10);
    if (isNaN(assessmentId) || assessmentId <= 0) {
      return NextResponse.json({ error: "Identifiant d'évaluation invalide" }, { status: 400 });
    }

    // Récupérer l'évaluation
    const assessment = await queryOne(
      `SELECT a.*, lvl.title as level_title, m.title as module_title
       FROM assessments a
       LEFT JOIN levels lvl ON a.level_id = lvl.id
       LEFT JOIN modules m ON a.module_id = m.id
       WHERE a.id = $1 AND a.status = 'active'`,
      [assessmentId]
    );

    if (!assessment) {
      return NextResponse.json({ error: 'Évaluation introuvable' }, { status: 404 });
    }

    // Récupérer les questions liées à l'évaluation avec leurs options
    const questionRows = await query(
      `SELECT q.id, q.type, q.question_text, q.context, q.difficulty, q.skill_id,
              a.answer_text, a.order_index
       FROM assessment_questions aq
       JOIN questions q ON aq.question_id = q.id
       LEFT JOIN answers a ON q.id = a.question_id
       WHERE aq.assessment_id = $1 AND q.status = 'active'
       ORDER BY aq.order_index ASC, a.order_index ASC`,
      [assessmentId]
    );

    const questions = formatQuestions(questionRows);

    return NextResponse.json({ assessment, questions });
  } catch (error) {
    console.error('[ASSESSMENT DETAILS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

function formatQuestions(rows: any[]): any[] {
  const questionMap = new Map<number, any>();

  for (const row of rows) {
    if (!questionMap.has(row.id)) {
      questionMap.set(row.id, {
        id: row.id,
        type: row.type,
        questionText: row.question_text,
        context: row.context,
        difficulty: row.difficulty,
        skillId: row.skill_id,
        options: [] as string[],
      });
    }

    if (row.answer_text) {
      questionMap.get(row.id).options.push(row.answer_text);
    }
  }

  return Array.from(questionMap.values());
}
