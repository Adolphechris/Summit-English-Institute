import { NextResponse } from 'next/server';
import { query } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';

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
    const limitRaw = parseInt(url.searchParams.get('limit') || '50', 10);
    const limit = isNaN(limitRaw) ? 50 : Math.min(Math.max(limitRaw, 1), 200);

    let queryText = `
      SELECT l.*, m.title as module_title, lvl.title as level_title
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN levels lvl ON m.level_id = lvl.id
      WHERE l.status = 'active'
    `;
    const params: any[] = [];

    if (moduleId) {
      queryText += ` AND l.module_id = $${params.length + 1}`;
      params.push(parseInt(moduleId));
    }
    if (levelId) {
      queryText += ` AND m.level_id = $${params.length + 1}`;
      params.push(parseInt(levelId));
    }

    queryText += ` ORDER BY l.order_index ASC LIMIT $${params.length + 1}`;
    params.push(limit);

    const lessons = await query(queryText, params);

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('[LESSONS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
