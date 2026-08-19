// ============================================================================
// Services d'authentification
// ============================================================================

import { hash, compare } from 'bcryptjs';
import { sign, verify, type SignOptions } from 'jsonwebtoken';
import { query, execute, queryOne } from '@/services/database/client';
import { config } from '@/lib/config';
import type { User, UserRole } from '@/types';

const SALT_ROUNDS = 10;

// Colonnes SQL de la table users (snake_case)
type UserDbRow = {
  id: number;
  email: string;
  role: string;
  status: string;
  first_name: string | null;
  last_name: string | null;
  preferred_language: string | null;
  created_at: Date;
  updated_at: Date;
  last_login_at: Date | null;
  password_hash?: string;
};

// Mapper une ligne SQL (snake_case) vers le type métier User (camelCase)
function mapUserRow(row: UserDbRow): User {
  return {
    id: row.id,
    email: row.email,
    role: row.role as UserRole,
    status: row.status as User['status'],
    firstName: row.first_name || undefined,
    lastName: row.last_name || undefined,
    preferredLanguage: row.preferred_language || 'fr',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastLoginAt: row.last_login_at || undefined,
  };
}

const USER_SELECT_COLUMNS = `id, email, role, status, first_name, last_name, preferred_language, created_at, updated_at, last_login_at`;

// Créer un utilisateur
export async function createUser(data: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}): Promise<User> {
  const hashedPassword = await hash(data.password, SALT_ROUNDS);

  const result = await queryOne<UserDbRow>(
    `INSERT INTO users (email, password_hash, first_name, last_name, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING ${USER_SELECT_COLUMNS}`,
    [data.email.toLowerCase(), hashedPassword, data.firstName || null, data.lastName || null, data.role || 'student']
  );

  if (!result) {
    throw new Error('Failed to create user');
  }

  return mapUserRow(result);
}

// Authentifier un utilisateur
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await queryOne<UserDbRow & { password_hash: string }>(
    `SELECT ${USER_SELECT_COLUMNS}, password_hash
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

  return mapUserRow(user);
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
  const result = await queryOne<UserDbRow>(
    `SELECT u.${USER_SELECT_COLUMNS}
     FROM users u
     JOIN sessions s ON u.id = s.user_id
     WHERE s.token = $1 AND s.expires_at > NOW() AND u.status = 'active'`,
    [token]
  );

  return result ? mapUserRow(result) : null;
}

// Trouver un utilisateur par identifiant (utilisé par GET /api/auth/me)
export async function findUserById(userId: number): Promise<User | null> {
  const result = await queryOne<UserDbRow>(
    `SELECT ${USER_SELECT_COLUMNS}
     FROM users
     WHERE id = $1 AND status = 'active'`,
    [userId]
  );

  return result ? mapUserRow(result) : null;
}

// Déconnexion
export async function deleteSession(token: string): Promise<void> {
  await execute(`DELETE FROM sessions WHERE token = $1`, [token]);
}
