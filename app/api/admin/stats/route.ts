import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { getAdminStats } from '@/services/database/firestore-repository';

export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const stats = await getAdminStats();
    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
