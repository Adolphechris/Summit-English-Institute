import { NextResponse } from 'next/server';
import { query, queryOne } from '@/services/database/client';
import { DAY_TO_LEVEL, getDayTitle } from '@/lib/coursePath';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/course/path
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Récupérer la progression par niveau
    const levelProgress = await query(
      `SELECT level_id, is_started, is_completed, best_score
       FROM level_progress
       WHERE user_id = $1
       ORDER BY level_id`,
      [userId]
    );

    // Récupérer la progression globale (niveau et jour courants)
    const progress = await queryOne<{ current_level: number; current_day: number }>(
      `SELECT current_level, current_day FROM progress WHERE user_id = $1`,
      [userId]
    );

    const currentLevel = progress?.current_level || 1;
    const currentDay = progress?.current_day || 1;

    // Construire le parcours des 20 jours à partir du mapping explicite jours → niveaux
    const days = DAY_TO_LEVEL.map((levelId, index) => {
      const dayNumber = index + 1;
      const levelProgressData = levelProgress.find((lp) => lp.level_id === levelId);
      const isStarted = levelProgressData?.is_started || false;
      const isCompleted = levelProgressData?.is_completed || false;

      let status: 'completed' | 'current' | 'available' | 'locked';
      if (levelId < currentLevel || isCompleted) {
        status = 'completed';
      } else if (levelId === currentLevel) {
        status = isStarted || dayNumber === currentDay ? 'current' : 'available';
      } else {
        status = 'locked';
      }

      return {
        dayNumber,
        title: getDayTitle(dayNumber),
        status,
        levelId,
        score: levelProgressData?.best_score,
      };
    });

    return NextResponse.json({ days });
  } catch (error) {
    console.error('[COURSE PATH ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

