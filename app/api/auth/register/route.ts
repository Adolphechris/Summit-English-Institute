import { NextResponse } from 'next/server';
import { createUser, createSession } from '@/services/auth/api';
import { getUserByEmail, initOrUpdateProgress } from '@/services/database/firestore-repository';
import { isValidEmail, isValidPassword, normalizeEmail, sanitizeName } from '@/lib/validate';
import { isRateLimitedAsync, clearRateLimitAsync } from '@/lib/rateLimit';

// POST /api/auth/register
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir entre 8 et 72 caractères' },
        { status: 400 }
      );
    }

    // Rate-limit d'inscription : par email et par IP (anti-spam / création de comptes)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateLimitedEmail = await isRateLimitedAsync(`register:${normalizedEmail}`, 5, 15 * 60 * 1000);
    const rateLimitedIp = await isRateLimitedAsync(`register-ip:${ip}`, 20, 60 * 60 * 1000);
    if (rateLimitedEmail || rateLimitedIp) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Réessayez plus tard.' },
        { status: 429 }
      );
    }

    // Vérifier si l'utilisateur existe déjà (email unique dans Firestore)
    const existing = await getUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 409 });
    }

    const user = await createUser({
      email: normalizedEmail,
      password,
      firstName: sanitizeName(firstName),
      lastName: sanitizeName(lastName),
    });

    const token = await createSession(user.id);

    // Initialiser la progression à J1, Niveau 1, 0%
    await initOrUpdateProgress(user.id, {
      currentLevel: 1,
      currentDay: 1,
      overallProgress: 0,
      isCompleted: false,
    });

    // Réinitialiser le compteur d'inscriptions en cas de succès
    await clearRateLimitAsync(`register:${normalizedEmail}`);
    await clearRateLimitAsync(`register-ip:${ip}`);

    const response = NextResponse.json(
      {
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    return NextResponse.json(
      { error: "Impossible de créer le compte. L'email existe peut-être déjà." },
      { status: 500 }
    );
  }
}
