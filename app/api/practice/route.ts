import { NextResponse } from 'next/server';
import { listQuestions, listSkills, listLessons, listModules, listLevels, getUserById } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';
import { FREE_LEVELS } from '@/lib/constants';
import { isPremiumUser } from '@/lib/entitlements';

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

    // Gating freemium : exercices premium (leçons niveaux > FREE_LEVELS) filtrés
    const user = await getUserById(userId);
    if (!isPremiumUser(user)) {
      const [allLessons, allModules, allLevels] = await Promise.all([
        listLessons(),
        listModules(),
        listLevels(),
      ]);
      const lessonModuleMap = new Map(allLessons.map((l) => [l.id, l.moduleId]));
      const pModuleMap = new Map(allModules.map((m) => [m.id, m]));
      const pLevelMap = new Map(allLevels.map((l) => [l.id, l]));
      const lessonLevelCache = new Map<number, number>();
      const lessonLevelNumber = (lessonIdNum: number): number => {
        const cached = lessonLevelCache.get(lessonIdNum);
        if (cached !== undefined) return cached;
        const mod = pModuleMap.get(lessonModuleMap.get(lessonIdNum) ?? -1);
        const num = mod ? pLevelMap.get(mod.levelId)?.number ?? 99 : 99;
        lessonLevelCache.set(lessonIdNum, num);
        return num;
      };
      filtered = filtered.filter(
        (q) => !q.lessonId || lessonLevelNumber(q.lessonId) <= FREE_LEVELS
      );
    }

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
