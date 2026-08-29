import { NextResponse } from 'next/server';
import { getDueReviews } from '@/services/progress/repetition';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/review
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const items = await getDueReviews(userId);
    return NextResponse.json({ items });
  } catch (error) {
    console.error('[REVIEW ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
