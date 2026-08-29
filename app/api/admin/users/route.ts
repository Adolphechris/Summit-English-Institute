import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { query, queryOne, execute } from '@/services/database/client';

export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const users = await query(`
      SELECT id, email, role, status, first_name as "firstName", last_name as "lastName",
             created_at as "createdAt", last_login_at as "lastLoginAt"
      FROM users
      ORDER BY id DESC
    `);

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { userId, role, status } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updatedUser = await queryOne(`
      UPDATE users
      SET role = COALESCE($2, role),
          status = COALESCE($3, status),
          updated_at = NOW()
      WHERE id = $1
      RETURNING id, email, role, status, first_name as "firstName", last_name as "lastName"
    `, [userId, role || null, status || null]);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
