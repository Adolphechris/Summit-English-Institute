import { NextResponse } from 'next/server';
import { authenticateUser, createSession } from '@/services/auth/api';
import { isValidEmail, normalizeEmail } from '@/lib/validate';
import { isRateLimitedAsync, clearRateLimitAsync } from '@/lib/rateLimit';

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    if (password.length === 0) {
      return NextResponse.json({ error: 'Mot de passe requis' }, { status: 400 });
    }

    // Protection contre le brute force (store mémoire local ou Redis/Upstash branché)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateLimitedEmail = await isRateLimitedAsync(`login:${normalizedEmail}`, 5, 15 * 60 * 1000);
    const rateLimitedIp = await isRateLimitedAsync(`login-ip:${ip}`, 20, 15 * 60 * 1000);
    if (rateLimitedEmail || rateLimitedIp) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
        { status: 429 }
      );
    }

    const user = await authenticateUser(normalizedEmail, password);

    if (!user) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    await clearRateLimitAsync(`login:${normalizedEmail}`);
    await clearRateLimitAsync(`login-ip:${ip}`);

    const token = await createSession(user.id);

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });

    // Session dans un cookie httpOnly (protège le middleware et limite l'usage JS)
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    });

    return response;
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return NextResponse.json({ error: 'Connexion échouée' }, { status: 500 });
  }
}
