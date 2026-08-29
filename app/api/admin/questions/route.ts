import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { listQuestions, listSkills, createQuestion } from '@/services/database/firestore-repository';

export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);

  try {
    const [allQuestions, allSkills] = await Promise.all([
      listQuestions({ limit }),
      listSkills(),
    ]);

    const skillMap = new Map(allSkills.map((s) => [s.id, s]));

    const questions = allQuestions.map((q) => {
      const skill = skillMap.get(q.skillId);
      return {
        id: q.id,
        type: q.type,
        question_text: q.questionText,
        context: q.context || null,
        difficulty: q.difficulty,
        skill_id: q.skillId,
        lesson_id: q.lessonId || null,
        explanation: q.explanation || null,
        tags: q.tags || [],
        status: q.isActive ? 'active' : 'archived',
        skill_title: skill?.name || 'Général',
      };
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching admin questions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, questionText, context, difficulty, skillId, lessonId, explanation, options, correctAnswer, tags, status } = body;

    if (!type || !questionText) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const question = await createQuestion({
      type,
      questionText,
      context: context || null,
      difficulty: difficulty || 'A',
      skillId: Number(skillId || 1),
      lessonId: lessonId ? Number(lessonId) : null,
      explanation: explanation || null,
      options: options || [],
      correctAnswer: correctAnswer || '',
      tags: tags || [],
      isActive: status !== 'archived',
      version: 1,
    });

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
