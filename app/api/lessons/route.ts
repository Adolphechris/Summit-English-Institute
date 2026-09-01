import { NextResponse } from 'next/server';
import { listLessons, listModules, listLevels } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';
import { FREE_LEVELS } from '@/lib/constants';

// GET /api/lessons
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const url = new URL(request.url);
    const moduleId = url.searchParams.get('moduleId');
    const levelId = url.searchParams.get('levelId');

    const [allLessons, allModules, allLevels] = await Promise.all([
      listLessons(),
      listModules(),
      listLevels(),
    ]);

    const moduleMap = new Map(allModules.map((m) => [m.id, m]));
    const levelMap = new Map(allLevels.map((l) => [l.id, l]));

    let filtered = allLessons.filter((l) => l.status === 'active');

    if (moduleId) {
      filtered = filtered.filter((l) => l.moduleId === parseInt(moduleId, 10));
    }
    if (levelId) {
      filtered = filtered.filter((l) => {
        const mod = moduleMap.get(l.moduleId);
        return mod?.levelId === parseInt(levelId, 10);
      });
    }

    const lessons = filtered.map((l) => {
      const parentMod = moduleMap.get(l.moduleId);
      const parentLevel = parentMod ? levelMap.get(parentMod.levelId) : undefined;
      return {
        ...l,
        module_title: parentMod?.title || 'Module',
        level_title: parentLevel?.title || 'Level',
        // Gating freemium : leçons des niveaux > FREE_LEVELS réservées Premium
        is_premium: parentLevel ? parentLevel.number > FREE_LEVELS : false,
      };
    });

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('[LESSONS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
