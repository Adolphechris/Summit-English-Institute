import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { query, queryOne, execute } from '@/services/database/client';

export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const lessons = await query(`
      SELECT l.id, l.module_id, l.title, l.objective, l.order_index, l.status,
             m.title as module_title, lev.id as level_id, lev.title as level_title
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN levels lev ON m.level_id = lev.id
      ORDER BY lev.id ASC, m.order_index ASC, l.order_index ASC
    `);

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('Error fetching admin lessons:', error);
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
    const { moduleId, title, objective, explanation, examples, vocabulary, expressions, itContext, practice, summary, orderIndex, status } = body;

    if (!moduleId || !title || !explanation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lesson = await queryOne(`
      INSERT INTO lessons (
        module_id, title, objective, explanation, examples, vocabulary,
        expressions, it_context, practice, summary, order_index, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      moduleId,
      title,
      objective || '',
      explanation,
      JSON.stringify(examples || []),
      JSON.stringify(vocabulary || []),
      JSON.stringify(expressions || []),
      itContext || '',
      JSON.stringify(practice || []),
      summary || '',
      orderIndex || 1,
      status || 'active'
    ]);

    return NextResponse.json({ lesson }, { status: 201 });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
