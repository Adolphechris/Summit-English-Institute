import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { listUsers, getUserById, updateUser } from '@/services/database/firestore-repository';
import type { UserRole, UserStatus } from '@/services/database/firestore-schema';

export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const rawUsers = await listUsers();
    const users = rawUsers.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      status: u.status,
      firstName: u.firstName || null,
      lastName: u.lastName || null,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt || null,
    }));

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

    const existing = await getUserById(Number(userId));
    if (!existing) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updates: Partial<{ role: UserRole; status: UserStatus }> = {};
    if (role) updates.role = role as UserRole;
    if (status) updates.status = status as UserStatus;

    await updateUser(Number(userId), updates);
    const updated = await getUserById(Number(userId));

    return NextResponse.json({
      user: {
        id: updated?.id,
        email: updated?.email,
        role: updated?.role,
        status: updated?.status,
        firstName: updated?.firstName || null,
        lastName: updated?.lastName || null,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
