import jwt from 'jsonwebtoken';

jest.mock('@/services/database/client', () => ({
  query: jest.fn(),
  execute: jest.fn(),
  queryOne: jest.fn(),
  pool: { query: jest.fn() },
}));

import { getRequestUserId, getTokenFromRequest, verifyToken, deleteSession } from '@/services/auth/api';
import { queryOne, execute } from '@/services/database/client';

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
    (queryOne as jest.Mock).mockResolvedValueOnce({ user_id: 7 });

    const result = await verifyToken(token);
    expect(result?.userId).toBe(7);
    expect(queryOne).toHaveBeenCalledWith(
      expect.stringContaining('FROM sessions'),
      [token]
    );
  });

  it('REJETTE un token dont la session a été supprimée (logout = révocation réelle)', async () => {
    const token = validToken(7);
    (queryOne as jest.Mock).mockResolvedValueOnce(null); // session absente

    const result = await verifyToken(token);
    expect(result).toBeNull();
  });

  it('deleteSession supprime la ligne en base', async () => {
    (execute as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });
    await deleteSession('abc');
    expect(execute).toHaveBeenCalledWith('DELETE FROM sessions WHERE token = $1', ['abc']);
  });

  it('getRequestUserId combine cookie + vérification de session', async () => {
    const token = validToken(99);
    (queryOne as jest.Mock).mockResolvedValueOnce({ user_id: 99 });

    const request = new Request('http://localhost/api/test', {
      headers: { cookie: `token=${encodeURIComponent(token)}` },
    });

    const userId = await getRequestUserId(request);
    expect(userId).toBe(99);
  });

  it('getRequestUserId retourne null si la session est révoquée', async () => {
    const token = validToken(99);
    (queryOne as jest.Mock).mockResolvedValueOnce(null);

    const request = new Request('http://localhost/api/test', {
      headers: { cookie: `token=${encodeURIComponent(token)}` },
    });

    const userId = await getRequestUserId(request);
    expect(userId).toBeNull();
  });
});
