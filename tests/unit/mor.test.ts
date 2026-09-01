import { isMorConfigured, morCheckoutUrlFor, MOR_REGION_ENV } from '@/lib/mor';

describe('Merchant of Record — adapter (lib/mor)', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    Object.keys(MOR_REGION_ENV).forEach((key) => {
      delete process.env[MOR_REGION_ENV[key as keyof typeof MOR_REGION_ENV]];
    });
    delete process.env.MOR_CHECKOUT_URL_FALLBACK;
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('non configuré sans fallback → false + URL vide', () => {
    expect(isMorConfigured()).toBe(false);
    expect(morCheckoutUrlFor('eu')).toBe('');
    expect(morCheckoutUrlFor('ma')).toBe('');
  });

  it('configuré dès que le fallback est présent', () => {
    process.env.MOR_CHECKOUT_URL_FALLBACK = 'https://gumroad.com/l/summit-premium';
    expect(isMorConfigured()).toBe(true);

    Object.keys(MOR_REGION_ENV).forEach((key) => {
      expect(morCheckoutUrlFor(key as keyof typeof MOR_REGION_ENV)).toBe(
        'https://gumroad.com/l/summit-premium'
      );
    });
  });

  it('une URL régionale prioritaire sur le fallback', () => {
    process.env.MOR_CHECKOUT_URL_FALLBACK = 'https://gumroad.com/l/premium';
    process.env.MOR_CHECKOUT_URL_EU = 'https://gumroad.com/l/premium-eur';
    process.env.MOR_CHECKOUT_URL_MA = 'https://gumroad.com/l/premium-mad';

    expect(morCheckoutUrlFor('eu')).toBe('https://gumroad.com/l/premium-eur');
    expect(morCheckoutUrlFor('ma')).toBe('https://gumroad.com/l/premium-mad');
    // Région sans URL spécifique → fallback global
    expect(morCheckoutUrlFor('af')).toBe('https://gumroad.com/l/premium');
  });

  it('recouvre exactement les 5 régions supportées', () => {
    expect(Object.keys(MOR_REGION_ENV).sort()).toEqual(['af', 'ca', 'eu', 'ma', 'us']);
  });
});