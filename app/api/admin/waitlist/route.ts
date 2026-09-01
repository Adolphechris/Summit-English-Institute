import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { listWaitlistEntries } from '@/services/database/firestore-repository';

// GET /api/admin/waitlist — Liste des leads de la waitlist (accès admin requis)
export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const leads = await listWaitlistEntries();
    return NextResponse.json({ leads, count: leads.length });
  } catch (error) {
    console.error('Error fetching waitlist leads:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
