import { NextResponse } from 'next/server';
import { deleteSession, getTokenFromRequest } from '@/services/auth/api';

// POST /api/auth/logout
export async function POST(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (token) {
      await deleteSession(token);
    }

    const response = NextResponse.json({ success: true });

    // Supprimer le cookie de session
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('[LOGOUT ERROR]', error);
    return NextResponse.json({ error: 'Déconnexion échouée' }, { status: 500 });
  }
}
