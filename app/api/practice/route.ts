import { NextResponse } from 'next/server';
import { query } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/practice
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const url = new URL(request.url);
    const skillId = url.searchParams.get('skill');
    const difficulty = url.searchParams.get('difficulty');
    const limitRaw = parseInt(url.searchParams.get('limit') || '10', 10);
    const limit = isNaN(limitRaw) ? 10 : Math.min(Math.max(limitRaw, 1), 100);

    let queryText = `
      SELECT q.*, s.code as skill_code, s.name as skill_name
      FROM questions q
      JOIN skills s ON q.skill_id = s.id
      WHERE q.status = 'active'
    `;
    const params: any[] = [];

    if (skillId) {
      queryText += ` AND q.skill_id = $${params.length + 1}`;
      params.push(parseInt(skillId));
    }
    if (difficulty) {
      queryText += ` AND q.difficulty = $${params.length + 1}`;
      params.push(difficulty);
    }

    queryText += ` ORDER BY RANDOM() LIMIT $${params.length + 1}`;
    params.push(limit);

    const exercises = await query(queryText, params);

    return NextResponse.json({ exercises });
  } catch (error) {
    console.error('[PRACTICE ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
