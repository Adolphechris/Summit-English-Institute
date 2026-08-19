import { NextResponse } from 'next/server';
import { query } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/progress
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Récupérer la progression par compétence
    const skillProgress = await query(
      `SELECT s.domain, AVG(sp.mastery_score) as progress
       FROM skill_progress sp
       JOIN skills s ON sp.skill_id = s.id
       WHERE sp.user_id = $1
       GROUP BY s.domain`,
      [userId]
    );

    const domainProgress = [
      { domain: 'grammar', progress: 0 },
      { domain: 'conversation', progress: 0 },
      { domain: 'it', progress: 0 },
      { domain: 'cybersecurity', progress: 0 },
      { domain: 'professional', progress: 0 },
      { domain: 'academic', progress: 0 },
    ];

    // Mettre à jour avec les vraies valeurs
    skillProgress.forEach((sp: any) => {
      const domain = domainProgress.find((d) => d.domain === sp.domain);
      if (domain) {
        domain.progress = Math.round(sp.progress || 0);
      }
    });

    return NextResponse.json({ domainProgress });
  } catch (error) {
    console.error('[PROGRESS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
