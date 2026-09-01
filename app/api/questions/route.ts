import { NextResponse } from 'next/server';
import { listQuestions, listSkills, listLessons, listModules, listLevels, getUserById } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';
import { FREE_LEVELS } from '@/lib/constants';
import { isPremiumUser } from '@/lib/entitlements';
import { PREMIUM_REQUIRED_MESSAGE } from '@/lib/pricing';

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

    // Gating freemium : questions des leçons premium (niveaux > FREE_LEVELS)
    // réservées Premium (403 si leçon ciblée, filtrage du pool sinon).
    const user = await getUserById(userId);
    const isPremium = isPremiumUser(user);
    const [allLessons, allModules, allLevels] = await Promise.all([
      listLessons(),
      listModules(),
      listLevels(),
    ]);
    const lessonModuleMap = new Map(allLessons.map((l) => [l.id, l.moduleId]));
    const qModuleMap = new Map(allModules.map((m) => [m.id, m]));
    const qLevelMap = new Map(allLevels.map((l) => [l.id, l]));
    const lessonLevelCache = new Map<number, number>();
    const lessonLevelNumber = (lessonIdNum: number): number => {
      const cached = lessonLevelCache.get(lessonIdNum);
      if (cached !== undefined) return cached;
      const mod = qModuleMap.get(lessonModuleMap.get(lessonIdNum) ?? -1);
      const num = mod ? qLevelMap.get(mod.levelId)?.number ?? 99 : 99;
      lessonLevelCache.set(lessonIdNum, num);
      return num;
    };

    if (lessonId && !isPremium && lessonLevelNumber(parseInt(lessonId, 10)) > FREE_LEVELS) {
      return NextResponse.json(
        { error: PREMIUM_REQUIRED_MESSAGE, code: 'PREMIUM_REQUIRED' },
        { status: 403 }
      );
    }

    if (!isPremium) {
      filtered = filtered.filter(
        (q) => !q.lessonId || lessonLevelNumber(q.lessonId) <= FREE_LEVELS
      );
    }

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
