import { NextResponse } from 'next/server';
import { listQuestions } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/diagnostic/questions
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const allQuestions = await listQuestions({ limit: 100 });
    // Mélanger et prendre 15 questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 15);

    const formattedQuestions = shuffled.map((q) => ({
      id: q.id,
      type: q.type,
      questionText: q.questionText,
      context: q.context || null,
      options: q.options && q.options.length > 0 ? q.options : undefined,
    }));

    return NextResponse.json({ questions: formattedQuestions });
  } catch (error) {
    console.error('[DIAGNOSTIC QUESTIONS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
