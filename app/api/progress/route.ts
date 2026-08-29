import { NextResponse } from 'next/server';
import { getUserSkillProgress, listSkills } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/progress
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const [userSkillProgress, allSkills] = await Promise.all([
      getUserSkillProgress(userId),
      listSkills(),
    ]);

    const skillMap = new Map(allSkills.map((s) => [s.id, s]));

    const domainTotals: Record<string, { totalScore: number; count: number }> = {};

    userSkillProgress.forEach((sp) => {
      const skill = skillMap.get(sp.skillId);
      const domain = skill?.domain || 'grammar';
      if (!domainTotals[domain]) domainTotals[domain] = { totalScore: 0, count: 0 };
      domainTotals[domain].totalScore += sp.masteryScore || 0;
      domainTotals[domain].count += 1;
    });

    const domainProgress = [
      'grammar',
      'conversation',
      'it',
      'cybersecurity',
      'professional',
      'academic',
    ].map((domain) => {
      const data = domainTotals[domain];
      const avg = data && data.count > 0 ? Math.round(data.totalScore / data.count) : 0;
      return { domain, progress: avg };
    });

    return NextResponse.json({ domainProgress });
  } catch (error) {
    console.error('[PROGRESS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
