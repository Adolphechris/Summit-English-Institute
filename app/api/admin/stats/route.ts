import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { queryOne } from '@/services/database/client';

export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const usersCount = await queryOne<{ count: string }>('SELECT COUNT(*) FROM users');
    const lessonsCount = await queryOne<{ count: string }>('SELECT COUNT(*) FROM lessons WHERE status = \'active\'');
    const questionsCount = await queryOne<{ count: string }>('SELECT COUNT(*) FROM questions WHERE status = \'active\'');
    const attemptsCount = await queryOne<{ count: string }>('SELECT COUNT(*) FROM attempts');
    const certificatesCount = await queryOne<{ count: string }>('SELECT COUNT(*) FROM certificates');

    return NextResponse.json({
      stats: {
        totalUsers: parseInt(usersCount?.count || '0', 10),
        activeLessons: parseInt(lessonsCount?.count || '0', 10),
        activeQuestions: parseInt(questionsCount?.count || '0', 10),
        totalAttempts: parseInt(attemptsCount?.count || '0', 10),
        certificatesIssued: parseInt(certificatesCount?.count || '0', 10),
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
