import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { query, queryOne } from '@/services/database/client';

export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);

  try {
    const questions = await query(`
      SELECT q.id, q.type, q.question_text, q.context, q.difficulty, q.skill_id,
             q.lesson_id, q.explanation, q.tags, q.status, s.title as skill_title
      FROM questions q
      LEFT JOIN skills s ON q.skill_id = s.id
      ORDER BY q.id DESC
      LIMIT $1
    `, [limit]);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching admin questions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, questionText, context, difficulty, skillId, lessonId, explanation, tags, status } = body;

    if (!type || !questionText) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const question = await queryOne(`
      INSERT INTO questions (
        type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
      type,
      questionText,
      context || null,
      difficulty || 'A',
      skillId || null,
      lessonId || null,
      explanation || null,
      tags || [],
      status || 'active'
    ]);

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
