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
    const reviewItemId = parseInt(body.reviewItemId, 10);

    if (!reviewItemId || isNaN(reviewItemId)) {
      return NextResponse.json({ error: 'Identifiant invalide' }, { status: 400 });
    }

    await markReviewAsMastered(userId, reviewItemId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[REVIEW MASTER ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
