import { NextResponse } from 'next/server';
import { getUserLevelProgress, getUserProgress } from '@/services/database/firestore-repository';
import { DAY_TO_LEVEL, getDayTitle } from '@/lib/coursePath';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/course/path
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const [levelProgress, progress] = await Promise.all([
      getUserLevelProgress(userId),
      getUserProgress(userId),
    ]);

    const currentLevel = progress?.currentLevel || 1;
    const currentDay = progress?.currentDay || 1;

    const days = DAY_TO_LEVEL.map((levelId, index) => {
      const dayNumber = index + 1;
      const levelProgressData = levelProgress.find((lp) => lp.levelId === levelId);
      const isStarted = levelProgressData?.isStarted || false;
      const isCompleted = levelProgressData?.isCompleted || false;

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
        score: levelProgressData?.bestScore,
      };
    });

    return NextResponse.json({ days });
  } catch (error) {
    console.error('[COURSE PATH ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
