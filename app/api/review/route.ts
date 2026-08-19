import { NextResponse } from 'next/server';
import { query } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/review
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const items = await query(
      `SELECT ri.id, ri.skill_id, s.name as skill_name, ri.error_type, ri.error_count, ri.last_result, ri.priority, ri.status
       FROM review_items ri
       JOIN skills s ON ri.skill_id = s.id
       WHERE ri.user_id = $1 AND ri.status IN ('due', 'in_review')
       ORDER BY
         CASE ri.priority
           WHEN 'critical' THEN 1
           WHEN 'high' THEN 2
           WHEN 'normal' THEN 3
           WHEN 'low' THEN 4
         END,
         ri.created_at DESC`,
      [userId]
    );

    return NextResponse.json({ items });
  } catch (error) {
    console.error('[REVIEW ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
