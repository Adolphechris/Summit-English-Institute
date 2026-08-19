import { NextResponse } from 'next/server';
import { query, execute } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';

// GET /api/questions
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const url = new URL(request.url);
    const lessonId = url.searchParams.get('lessonId');
    const skillId = url.searchParams.get('skillId');
    const difficulty = url.searchParams.get('difficulty');
    const type = url.searchParams.get('type');
    const limitRaw = parseInt(url.searchParams.get('limit') || '20', 10);
    // Contrainte de limite (évite le 500 PG sur NaN ou valeur abusive)
    const limit = isNaN(limitRaw) ? 20 : Math.min(Math.max(limitRaw, 1), 100);

    let queryText = `
      SELECT q.*, s.code as skill_code, s.name as skill_name
      FROM questions q
      JOIN skills s ON q.skill_id = s.id
      WHERE q.status = 'active'
    `;
    const params: any[] = [];

    if (lessonId) {
      queryText += ` AND q.lesson_id = $${params.length + 1}`;
      params.push(parseInt(lessonId));
    }
    if (skillId) {
      queryText += ` AND q.skill_id = $${params.length + 1}`;
      params.push(parseInt(skillId));
    }
    if (difficulty) {
      queryText += ` AND q.difficulty = $${params.length + 1}`;
      params.push(difficulty);
    }
    if (type) {
      queryText += ` AND q.type = $${params.length + 1}`;
      params.push(type);
    }

    queryText += ` ORDER BY RANDOM() LIMIT $${params.length + 1}`;
    params.push(limit);

    const questions = await query(queryText, params);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('[QUESTIONS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
