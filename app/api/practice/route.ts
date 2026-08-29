import { NextResponse } from 'next/server';
import { listQuestions, listSkills } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/practice
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const url = new URL(request.url);
    const skillId = url.searchParams.get('skill');
    const difficulty = url.searchParams.get('difficulty');
    const limitRaw = parseInt(url.searchParams.get('limit') || '10', 10);
    const limit = isNaN(limitRaw) ? 10 : Math.min(Math.max(limitRaw, 1), 100);

    const [allQuestions, allSkills] = await Promise.all([
      listQuestions(),
      listSkills(),
    ]);

    const skillMap = new Map(allSkills.map((s) => [s.id, s]));

    let filtered = allQuestions.filter((q) => q.isActive);

    if (skillId) {
      filtered = filtered.filter((q) => q.skillId === parseInt(skillId, 10));
    }
    if (difficulty) {
      filtered = filtered.filter((q) => q.difficulty === difficulty);
    }

    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, limit);

    const exercises = shuffled.map((q) => {
      const skill = skillMap.get(q.skillId);
      return {
        ...q,
        skill_code: skill?.code || 'general',
        skill_name: skill?.name || 'Général',
      };
    });

    return NextResponse.json({ exercises });
  } catch (error) {
    console.error('[PRACTICE ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
