import { NextResponse } from 'next/server';
import { markReviewAsMastered } from '@/services/progress/repetition';
import { getRequestUserId } from '@/services/auth/api';

// POST /api/review/master
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const rawId = body.reviewItemId || body.skillId;

    let skillId = parseInt(String(rawId), 10);
    if (isNaN(skillId) && typeof rawId === 'string' && rawId.includes('_')) {
      const parts = rawId.split('_');
      skillId = parseInt(parts[1], 10);
    }

    if (!skillId || isNaN(skillId)) {
      return NextResponse.json({ error: 'Identifiant invalide' }, { status: 400 });
    }

    await markReviewAsMastered(userId, skillId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[REVIEW MASTER ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
