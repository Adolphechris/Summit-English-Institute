import { NextResponse } from 'next/server';
import { findUserById, getRequestUserId } from '@/services/auth/api';
import { queryOne, execute } from '@/services/database/client';
import { hash, compare } from 'bcryptjs';

// GET /api/auth/me
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const user = await findUserById(userId);

    if (!user) {
      return NextResponse.json({ error: 'Session invalide' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
      },
    });
  } catch (error) {
    console.error('[ME ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT /api/auth/me (mise à jour profil et/ou mot de passe)
export async function PUT(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, currentPassword, newPassword } = body;

    // Si changement de mot de passe demandé
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Mot de passe actuel requis' }, { status: 400 });
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'Le nouveau mot de passe doit comporter au moins 8 caractères' }, { status: 400 });
      }

      const dbUser = await queryOne<{ password_hash: string }>(
        'SELECT password_hash FROM users WHERE id = $1',
        [userId]
      );

      if (!dbUser || !(await compare(currentPassword, dbUser.password_hash))) {
        return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 400 });
      }

      const newHash = await hash(newPassword, 10);
      await execute('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, userId]);
    }

    // Mise à jour des informations de profil
    await execute(
      `UPDATE users
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           updated_at = NOW()
       WHERE id = $3`,
      [firstName || null, lastName || null, userId]
    );

    const updatedUser = await findUserById(userId);

    return NextResponse.json({
      user: {
        id: updatedUser?.id,
        email: updatedUser?.email,
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
        role: updatedUser?.role,
        preferredLanguage: updatedUser?.preferredLanguage,
      },
      message: 'Profil mis à jour avec succès',
    });
  } catch (error) {
    console.error('[PROFILE UPDATE ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
