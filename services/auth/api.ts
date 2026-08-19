// ============================================================================
// Services d'authentification
// ============================================================================

import { hash, compare } from 'bcryptjs';
import { sign, verify, type SignOptions } from 'jsonwebtoken';
import { query, execute, queryOne } from '@/services/database/client';
import { config } from '@/lib/config';
import type { User, UserRole } from '@/types';

const SALT_ROUNDS = 10;

// Ligne de base de la table users (inclut le hash, jamais renvoyé dans les réponses API)
type AuthUserRow = User & { password_hash: string };

// Créer un utilisateur
export async function createUser(data: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}): Promise<User> {
  const hashedPassword = await hash(data.password, SALT_ROUNDS);

  const result = await queryOne<User>(
    `INSERT INTO users (email, password_hash, first_name, last_name, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, role, status, first_name, last_name, preferred_language, created_at, updated_at, last_login_at`,
    [data.email.toLowerCase(), hashedPassword, data.firstName || null, data.lastName || null, data.role || 'student']
  );

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result;
}

// Authentifier un utilisateur
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await queryOne<AuthUserRow>(
    `SELECT id, email, password_hash, role, status, first_name, last_name, preferred_language, created_at, updated_at, last_login_at
     FROM users
     WHERE email = $1 AND status = 'active'`,
    [email.toLowerCase()]
  );

  if (!user) {
    return null;
  }

  const isValid = await compare(password, user.password_hash);
  if (!isValid) {
    return null;
  }

  // Mettre à jour last_login_at
  await execute(
    `UPDATE users SET last_login_at = NOW() WHERE id = $1`,
    [user.id]
  );

  return user;
}

// Créer une session
export async function createSession(userId: number): Promise<string> {
  const token = sign({ userId }, config.auth.secret, {
    expiresIn: config.auth.expiry as SignOptions['expiresIn'],
  });

  await execute(
    `INSERT INTO sessions (user_id, token, expires_at)
     VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
    [userId, token]
  );

  return token;
}

// Vérifier un token (signature + session encore active en base)
// → un token est RÉVOQUÉ dès que sa ligne `sessions` est supprimée (logout).
export async function verifyToken(token: string): Promise<{ userId: number } | null> {
  try {
    const decoded = verify(token, config.auth.secret) as { userId: number };

    // Révocation : la session doit exister et ne pas être expirée.
    const session = await queryOne<{ user_id: number }>(
      `SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`,
      [token]
    );
    if (!session) return null;

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
  const result = await queryOne<User>(
    `SELECT u.id, u.email, u.role, u.status, u.first_name, u.last_name, u.preferred_language, u.created_at, u.updated_at, u.last_login_at
     FROM users u
     JOIN sessions s ON u.id = s.user_id
     WHERE s.token = $1 AND s.expires_at > NOW() AND u.status = 'active'`,
    [token]
  );

  return result || null;
}

// Trouver un utilisateur par identifiant (utilisé par GET /api/auth/me)
export async function findUserById(userId: number): Promise<User | null> {
  const result = await queryOne<User>(
    `SELECT id, email, role, status, first_name, last_name, preferred_language, created_at, updated_at, last_login_at
     FROM users
     WHERE id = $1 AND status = 'active'`,
    [userId]
  );

  return result || null;
}

// Déconnexion
export async function deleteSession(token: string): Promise<void> {
  await execute(`DELETE FROM sessions WHERE token = $1`, [token]);
}
