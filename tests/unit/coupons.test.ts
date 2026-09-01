import { validateCoupon, buildMorCheckoutUrl, AVAILABLE_COUPONS } from '@/lib/coupons';

describe('Système de Coupons — lib/coupons.ts', () => {
  const basePriceCents = 2900; // 29 €

  it('valide le coupon officiel LANCEMENT10 (-10%)', () => {
    const res = validateCoupon('LANCEMENT10', basePriceCents);
    expect(res.valid).toBe(true);
    expect(res.code).toBe('LANCEMENT10');
    expect(res.discountPercent).toBe(10);
    expect(res.discountAmountCents).toBe(290);
    expect(res.finalAmountCents).toBe(2610);
  });

  it('gère l\'insensibilité à la casse et les espaces', () => {
    const res = validateCoupon('  lancement10  ', basePriceCents);
    expect(res.valid).toBe(true);
    expect(res.code).toBe('LANCEMENT10');
  });

  it('valide le coupon LAUNCH50 (-50%)', () => {
    const res = validateCoupon('LAUNCH50', basePriceCents);
    expect(res.valid).toBe(true);
    expect(res.discountPercent).toBe(50);
    expect(res.discountAmountCents).toBe(1450);
    expect(res.finalAmountCents).toBe(1450);
  });

  it('valide le coupon CAMPUS100 (-100%)', () => {
    const res = validateCoupon('CAMPUS100', basePriceCents);
    expect(res.valid).toBe(true);
    expect(res.discountPercent).toBe(100);
    expect(res.discountAmountCents).toBe(basePriceCents);
    expect(res.finalAmountCents).toBe(0);
  });

  it('refuse un code inexistant', () => {
    const res = validateCoupon('FAUX_CODE_999', basePriceCents);
    expect(res.valid).toBe(false);
    expect(res.discountPercent).toBe(0);
    expect(res.finalAmountCents).toBe(basePriceCents);
    expect(res.error).toBe('Code promotionnel invalide');
  });

  it('refuse un code vide ou null', () => {
    const res = validateCoupon('', basePriceCents);
    expect(res.valid).toBe(false);
    expect(res.error).toBe('Code coupon requis');
  });

  it('enrichit correctement l\'URL de checkout MOR avec email, userId et coupon', () => {
    const baseUrl = 'https://gumroad.com/l/summit-premium-eu';
    const enriched = buildMorCheckoutUrl(baseUrl, {
      email: 'dev@summit.org',
      userId: 42,
      couponCode: 'LANCEMENT10',
      region: 'eu',
    });

    const parsed = new URL(enriched);
    expect(parsed.searchParams.get('email')).toBe('dev@summit.org');
    expect(parsed.searchParams.get('custom_fields[user_id]')).toBe('42');
    expect(parsed.searchParams.get('code')).toBe('LANCEMENT10');
    expect(parsed.searchParams.get('region')).toBe('eu');
  });
});
