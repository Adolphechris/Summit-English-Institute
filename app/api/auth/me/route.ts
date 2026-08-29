import { NextResponse } from 'next/server';
import { findUserById, getRequestUserId } from '@/services/auth/api';
import { getUserById, updateUser } from '@/services/database/firestore-repository';
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

    const dbUser = await getUserById(userId);
    if (!dbUser) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
    }

    const updates: Partial<{ firstName: string | null; lastName: string | null; passwordHash: string }> = {};

    // Si changement de mot de passe demandé
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Mot de passe actuel requis' }, { status: 400 });
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'Le nouveau mot de passe doit comporter au moins 8 caractères' }, { status: 400 });
      }

      if (!(await compare(currentPassword, dbUser.passwordHash))) {
        return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 400 });
      }

      updates.passwordHash = await hash(newPassword, 10);
    }

    // Mise à jour des informations de profil
    if (firstName !== undefined) updates.firstName = firstName || null;
    if (lastName !== undefined) updates.lastName = lastName || null;

    if (Object.keys(updates).length > 0) {
      await updateUser(userId, updates);
    }

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
