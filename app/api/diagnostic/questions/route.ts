import { NextResponse } from 'next/server';
import { query } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/diagnostic/questions
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Récupérer 15 questions de diagnostic couvrant tous les domaines
    const questions = await query(
      `SELECT q.id, q.type, q.question_text, q.context, q.difficulty,
              a.answer_text, a.order_index
       FROM questions q
       LEFT JOIN answers a ON q.id = a.question_id
       WHERE q.status = 'active'
       ORDER BY RANDOM()
       LIMIT 15`
    );

    // Formater les questions pour le diagnostic
    const formattedQuestions = questions.reduce((acc: any[], q: any) => {
      if (!acc.find(item => item.id === q.id)) {
        const answers = questions
          .filter((a: any) => a.id === q.id)
          .map((a: any) => a.answer_text);
        acc.push({
          id: q.id,
          type: q.type,
          questionText: q.question_text,
          context: q.context,
          options: answers.length > 0 ? answers : undefined,
        });
      }
      return acc;
    }, []);

    return NextResponse.json({ questions: formattedQuestions });
  } catch (error) {
    console.error('[DIAGNOSTIC QUESTIONS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
