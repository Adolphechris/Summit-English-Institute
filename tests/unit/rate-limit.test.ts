import { isRateLimited, isRateLimitedAsync, clearRateLimit, setRateLimitStore } from '@/lib/rateLimit';

describe('Rate limiting (mémoire locale)', () => {
  beforeEach(() => {
    setRateLimitStore(null as any);
    clearRateLimit('test:1');
    clearRateLimit('test:2');
    clearRateLimit('test:3');
    clearRateLimit('test:4');
    clearRateLimit('test:5');
  });

  it('autorise les premières tentatives puis bloque au-delà du seuil', () => {
    expect(isRateLimited('test:1', 3, 60_000)).toBe(false);
    expect(isRateLimited('test:1', 3, 60_000)).toBe(false);
    expect(isRateLimited('test:1', 3, 60_000)).toBe(false);
    expect(isRateLimited('test:1', 3, 60_000)).toBe(true);
  });

  it('se réinitialise après la fenêtre (timers simulés)', () => {
    jest.useFakeTimers();
    try {
      // max=2, fenêtre 10 000 ms
      expect(isRateLimited('test:2', 2, 10_000)).toBe(false);
      expect(isRateLimited('test:2', 2, 10_000)).toBe(false);
      expect(isRateLimited('test:2', 2, 10_000)).toBe(true);

      // Une fois la fenêtre écoulée, le compteur repart à zéro
      jest.advanceTimersByTime(10_001);
      expect(isRateLimited('test:2', 2, 10_000)).toBe(false);
    } finally {
      jest.useRealTimers();
    }
  });

  it('supporte un store persistant asynchrone (Redis/Upstash) branché via setRateLimitStore', async () => {
    const store = {
      isRateLimited: jest.fn(async (_key: string, _max?: number, _window?: number) => true),
      clear: jest.fn(async () => undefined),
    };
    setRateLimitStore(store);

    expect(await isRateLimitedAsync('test:3')).toBe(true);
    expect(store.isRateLimited).toHaveBeenCalledWith('test:3', 5, 15 * 60 * 1000);
  });

  it('les clés sont indépendantes', () => {
    expect(isRateLimited('test:4', 1, 60_000)).toBe(false);
    expect(isRateLimited('test:5', 1, 60_000)).toBe(false);
    expect(isRateLimited('test:4', 1, 60_000)).toBe(true);
    expect(isRateLimited('test:5', 1, 60_000)).toBe(true);
  });
});
