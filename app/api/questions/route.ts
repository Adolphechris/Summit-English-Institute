import { NextResponse } from 'next/server';
import { listQuestions, listSkills } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/questions
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const url = new URL(request.url);
    const lessonId = url.searchParams.get('lessonId');
    const skillId = url.searchParams.get('skillId');
    const difficulty = url.searchParams.get('difficulty');
    const type = url.searchParams.get('type');
    const limitRaw = parseInt(url.searchParams.get('limit') || '20', 10);
    const limit = isNaN(limitRaw) ? 20 : Math.min(Math.max(limitRaw, 1), 100);

    const [allQuestions, allSkills] = await Promise.all([
      listQuestions(),
      listSkills(),
    ]);

    const skillMap = new Map(allSkills.map((s) => [s.id, s]));

    let filtered = allQuestions.filter((q) => q.isActive);

    if (lessonId) {
      filtered = filtered.filter((q) => q.lessonId === parseInt(lessonId, 10));
    }
    if (skillId) {
      filtered = filtered.filter((q) => q.skillId === parseInt(skillId, 10));
    }
    if (difficulty) {
      filtered = filtered.filter((q) => q.difficulty === difficulty);
    }
    if (type) {
      filtered = filtered.filter((q) => q.type === type);
    }

    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, limit);

    const questions = shuffled.map((q) => {
      const skill = skillMap.get(q.skillId);
      return {
        ...q,
        question_text: q.questionText,
        skill_code: skill?.code || 'general',
        skill_name: skill?.name || 'Général',
      };
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('[QUESTIONS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
