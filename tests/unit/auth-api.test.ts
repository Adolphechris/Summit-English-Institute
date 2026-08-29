import jwt from 'jsonwebtoken';

jest.mock('@/services/database/firestore-repository', () => ({
  getUserByEmail: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  createSession: jest.fn(),
  getSession: jest.fn(),
  deleteSession: jest.fn(),
}));

import { getRequestUserId, getTokenFromRequest, verifyToken, deleteSession } from '@/services/auth/api';
import { getSession, deleteSession as removeSessionFromDb } from '@/services/database/firestore-repository';

const SECRET = 'dev-only-secret-for-local-testing';

function validToken(userId: number): string {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
}

describe('Auth — récupération du token depuis la requête', () => {
  it('lit le cookie httpOnly (authentification principale)', () => {
    const token = validToken(42);
    const request = new Request('http://localhost/api/test', {
      headers: { cookie: `other=1; token=${encodeURIComponent(token)}; lang=fr` },
    });

    expect(getTokenFromRequest(request)).toBe(token);
  });

  it('supporte l’en-tête Authorization Bearer (rétrocompat)', () => {
    const token = validToken(42);
    const request = new Request('http://localhost/api/test', {
      headers: { authorization: `Bearer ${token}` },
    });

    expect(getTokenFromRequest(request)).toBe(token);
  });

  it('renvoie null sans cookie ni Bearer', () => {
    const request = new Request('http://localhost/api/test');
    expect(getTokenFromRequest(request)).toBeNull();
  });
});

describe('Auth — révocation des sessions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('accepte un token dont la session existe en base', async () => {
    const token = validToken(7);
    (getSession as jest.Mock).mockResolvedValueOnce({
      token,
      userId: 7,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    });

    const result = await verifyToken(token);
    expect(result?.userId).toBe(7);
    expect(getSession).toHaveBeenCalledWith(token);
  });

  it('REJETTE un token dont la session a été supprimée (logout = révocation réelle)', async () => {
    const token = validToken(7);
    (getSession as jest.Mock).mockResolvedValueOnce(null);

    const result = await verifyToken(token);
    expect(result).toBeNull();
  });

  it('deleteSession supprime la session dans Firestore', async () => {
    (removeSessionFromDb as jest.Mock).mockResolvedValueOnce(undefined);
    await deleteSession('abc');
    expect(removeSessionFromDb).toHaveBeenCalledWith('abc');
  });

  it('getRequestUserId combine cookie + vérification de session', async () => {
    const token = validToken(99);
    (getSession as jest.Mock).mockResolvedValueOnce({
      token,
      userId: 99,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    });

    const request = new Request('http://localhost/api/test', {
      headers: { cookie: `token=${encodeURIComponent(token)}` },
    });

    const userId = await getRequestUserId(request);
    expect(userId).toBe(99);
  });

  it('getRequestUserId retourne null si la session est révoquée', async () => {
    const token = validToken(99);
    (getSession as jest.Mock).mockResolvedValueOnce(null);

    const request = new Request('http://localhost/api/test', {
      headers: { cookie: `token=${encodeURIComponent(token)}` },
    });

    const userId = await getRequestUserId(request);
    expect(userId).toBeNull();
  });
});
