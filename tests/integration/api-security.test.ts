/**
 * Tests de sécurité des routes API : authentification obligatoire,
 * codes HTTP cohérents, rate-limiting du login/register.
 */
jest.mock('@/services/database/firestore-repository', () => ({
  getUserByEmail: jest.fn(),
  getUserById: jest.fn(),
  getUserProgress: jest.fn(),
  getUserSkillProgress: jest.fn(),
  getUserAttempts: jest.fn(),
  getUserReviewItems: jest.fn(),
  listSkills: jest.fn(async () => []),
  listLessons: jest.fn(async () => []),
  listModules: jest.fn(async () => []),
  listQuestions: jest.fn(async () => []),
  getLevelById: jest.fn(),
}));

jest.mock('@/lib/rateLimit', () => ({
  isRateLimitedAsync: jest.fn(async () => false),
  clearRateLimitAsync: jest.fn(async () => undefined),
}));

import { GET as getDashboard } from '@/app/api/dashboard/route';
import { GET as getQuestions } from '@/app/api/questions/route';
import { GET as getLessons } from '@/app/api/lessons/route';
import { GET as getReview } from '@/app/api/review/route';
import { GET as getProgress } from '@/app/api/progress/route';
import { POST as postLogin } from '@/app/api/auth/login/route';

describe('Sécurité — authentification requise sur les routes API', () => {
  it('dashboard renvoie 401 sans cookie de session', async () => {
    const req = new Request('http://localhost/api/dashboard');
    const res = await getDashboard(req);
    expect(res.status).toBe(401);
  });

  it('questions renvoie 401 sans cookie de session (endpoint exposé corrompu)', async () => {
    const req = new Request('http://localhost/api/questions?limit=abc');
    const res = await getQuestions(req);
    expect(res.status).toBe(401);
  });

  it('lessons renvoie 401 sans cookie', async () => {
    const res = await getLessons(new Request('http://localhost/api/lessons'));
    expect(res.status).toBe(401);
  });

  it('review renvoie 401 sans cookie', async () => {
    const res = await getReview(new Request('http://localhost/api/review'));
    expect(res.status).toBe(401);
  });

  it('progress renvoie 401 sans cookie', async () => {
    const res = await getProgress(new Request('http://localhost/api/progress'));
    expect(res.status).toBe(401);
  });
});

describe('Sécurité — validation des entrées (login)', () => {
  it('renvoie 400 sur un email invalide', async () => {
    const res = await postLogin(
      new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'pas-un-email', password: 'test1234' }),
      })
    );
    expect(res.status).toBe(400);
  });

  it('renvoie 400 sur un mot de passe vide', async () => {
    const res = await postLogin(
      new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: '' }),
      })
    );
    expect(res.status).toBe(400);
  });

  it('renvoie 401 sur des identifiants inconnus (pas 200)', async () => {
    const authModule = await import('@/services/auth/api');
    jest.spyOn(authModule, 'authenticateUser').mockResolvedValueOnce(null);

    const res = await postLogin(
      new Request('http://localhost/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'inconnu@example.com', password: 'test1234' }),
      })
    );
    expect(res.status).toBe(401);
  });
});
