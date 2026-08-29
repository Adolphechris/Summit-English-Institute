// ============================================================================
// Services d'authentification — Écosystème Google (Cloud Firestore)
// Summit English Institute — JWT httpOnly + Session Firestore + bcrypt
// ============================================================================

import { hash, compare } from 'bcryptjs';
import { sign, verify, type SignOptions } from 'jsonwebtoken';
import {
  getUserByEmail,
  getUserById,
  createUser as createFirestoreUser,
  updateUser,
  createSession as saveSessionToDb,
  getSession,
  deleteSession as removeSessionFromDb,
} from '@/services/database/firestore-repository';
import type { UserDoc } from '@/services/database/firestore-schema';
import { config } from '@/lib/config';
import type { User, UserRole } from '@/types';

const SALT_ROUNDS = 10;

// Mapper un document Firestore vers le type métier User (camelCase)
export function mapUserDoc(doc: UserDoc): User {
  return {
    id: doc.id,
    email: doc.email,
    role: doc.role as UserRole,
    status: doc.status as User['status'],
    firstName: doc.firstName || undefined,
    lastName: doc.lastName || undefined,
    preferredLanguage: doc.preferredLanguage || 'fr',
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
    lastLoginAt: doc.lastLoginAt ? new Date(doc.lastLoginAt) : undefined,
  };
}

// Créer un utilisateur
export async function createUser(data: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}): Promise<User> {
  const existing = await getUserByEmail(data.email);
  if (existing) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hash(data.password, SALT_ROUNDS);

  const created = await createFirestoreUser({
    email: data.email.toLowerCase().trim(),
    passwordHash: hashedPassword,
    firstName: data.firstName || null,
    lastName: data.lastName || null,
    role: data.role || 'student',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return mapUserDoc(created);
}

// Authentifier un utilisateur
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);

  if (!user || user.status !== 'active') {
    return null;
  }

  const isValid = await compare(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  const now = new Date().toISOString();
  await updateUser(user.id, { lastLoginAt: now });

  return mapUserDoc({ ...user, lastLoginAt: now });
}

// Créer une session
export async function createSession(userId: number): Promise<string> {
  const token = sign({ userId }, config.auth.secret, {
    expiresIn: config.auth.expiry as SignOptions['expiresIn'],
  });

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await saveSessionToDb(token, userId, expiresAt);

  return token;
}

// Vérifier un token (signature + session encore active dans Firestore)
export async function verifyToken(token: string): Promise<{ userId: number } | null> {
  try {
    const decoded = verify(token, config.auth.secret) as { userId: number };

    // Révocation : la session doit exister dans Firestore et ne pas être expirée.
    const session = await getSession(token);
    if (!session) return null;

    if (new Date(session.expiresAt).getTime() < Date.now()) {
      await removeSessionFromDb(token);
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

/**
 * Extraire le token JWT depuis une requête.
 * Source 1 : cookie httpOnly `token` (authentification principale, invisible au JS).
 * Source 2 (rétrocompat) : en-tête Authorization Bearer.
 */
export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
    if (match) {
      try {
        return decodeURIComponent(match[1]);
      } catch {
        return match[1];
      }
    }
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

// Extraire l'identifiant utilisateur depuis une requête (cookie httpOnly ou Bearer).
export async function getRequestUserId(request: Request): Promise<number | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  const decoded = await verifyToken(token);
  return decoded?.userId ?? null;
}

// Trouver un utilisateur par token
export async function findUserByToken(token: string): Promise<User | null> {
  const session = await getSession(token);
  if (!session || new Date(session.expiresAt).getTime() < Date.now()) {
    return null;
  }

  const user = await getUserById(session.userId);
  if (!user || user.status !== 'active') return null;

  return mapUserDoc(user);
}

// Trouver un utilisateur par identifiant (utilisé par GET /api/auth/me)
export async function findUserById(userId: number): Promise<User | null> {
  const user = await getUserById(userId);
  if (!user || user.status !== 'active') return null;
  return mapUserDoc(user);
}

// Déconnexion
export async function deleteSession(token: string): Promise<void> {
  await removeSessionFromDb(token);
}

// Vérifier si la requête provient d'un administrateur
export async function getRequestAdminUser(request: Request): Promise<User | null> {
  const userId = await getRequestUserId(request);
  if (!userId) return null;
  const user = await findUserById(userId);
  if (!user || (user.role as string).toLowerCase() !== 'admin') return null;
  return user;
}
