// ============================================================================
// Gestion des Coupons de Réduction — Summit English Institute
// ============================================================================

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  isActive: boolean;
  expiresAt?: string; // ISO format: YYYY-MM-DD
  maxUses?: number;
  currentUses?: number;
}

/**
 * Catalogue des codes promotionnels actifs.
 * LANCEMENT10 : Offre officielle de lancement (-10%).
 */
export const AVAILABLE_COUPONS: Record<string, Coupon> = {
  LANCEMENT10: {
    code: 'LANCEMENT10',
    discountPercent: 10,
    description: 'Offre spéciale de lancement (-10%)',
    isActive: true,
  },
  LAUNCH50: {
    code: 'LAUNCH50',
    discountPercent: 50,
    description: 'Offre partenaire et early-adopters (-50%)',
    isActive: true,
  },
  CAMPUS100: {
    code: 'CAMPUS100',
    discountPercent: 100,
    description: 'Bourse d\'études / Gratuité totale campus',
    isActive: true,
  },
};

export interface CouponValidationResult {
  valid: boolean;
  code?: string;
  discountPercent: number;
  discountAmountCents: number;
  finalAmountCents: number;
  description?: string;
  error?: string;
}

/**
 * Valide un code coupon et calcule le montant final en centimes.
 */
export function validateCoupon(
  rawCode: string | null | undefined,
  basePriceCents: number
): CouponValidationResult {
  if (!rawCode || typeof rawCode !== 'string' || !rawCode.trim()) {
    return {
      valid: false,
      discountPercent: 0,
      discountAmountCents: 0,
      finalAmountCents: basePriceCents,
      error: 'Code coupon requis',
    };
  }

  const cleanCode = rawCode.trim().toUpperCase();
  const coupon = AVAILABLE_COUPONS[cleanCode];

  if (!coupon) {
    return {
      valid: false,
      discountPercent: 0,
      discountAmountCents: 0,
      finalAmountCents: basePriceCents,
      error: 'Code promotionnel invalide',
    };
  }

  if (!coupon.isActive) {
    return {
      valid: false,
      discountPercent: 0,
      discountAmountCents: 0,
      finalAmountCents: basePriceCents,
      error: 'Ce code promotionnel est désactivé',
    };
  }

  if (coupon.expiresAt) {
    const expiry = new Date(coupon.expiresAt).getTime();
    if (Date.now() > expiry) {
      return {
        valid: false,
        discountPercent: 0,
        discountAmountCents: 0,
        finalAmountCents: basePriceCents,
        error: 'Ce code promotionnel a expiré',
      };
    }
  }

  if (coupon.maxUses && coupon.currentUses && coupon.currentUses >= coupon.maxUses) {
    return {
      valid: false,
      discountPercent: 0,
      discountAmountCents: 0,
      finalAmountCents: basePriceCents,
      error: 'Ce code promotionnel a atteint sa limite d\'utilisation',
    };
  }

  const discountPercent = Math.min(100, Math.max(0, coupon.discountPercent));
  const discountAmountCents = Math.round((basePriceCents * discountPercent) / 100);
  const finalAmountCents = Math.max(0, basePriceCents - discountAmountCents);

  return {
    valid: true,
    code: cleanCode,
    discountPercent,
    discountAmountCents,
    finalAmountCents,
    description: coupon.description,
  };
}

/**
 * Construit l'URL de paiement MOR en lui passant les paramètres de tracking et coupon.
 */
export function buildMorCheckoutUrl(
  baseUrl: string,
  params: {
    email?: string;
    userId?: number | string;
    couponCode?: string;
    region?: string;
  }
): string {
  if (!baseUrl) return '';

  try {
    const url = new URL(baseUrl);
    if (params.email) {
      url.searchParams.set('email', params.email);
    }
    if (params.userId) {
      url.searchParams.set('custom_fields[user_id]', String(params.userId));
      url.searchParams.set('passthrough', String(params.userId));
    }
    if (params.couponCode) {
      url.searchParams.set('code', params.couponCode);
      url.searchParams.set('discount', params.couponCode);
    }
    if (params.region) {
      url.searchParams.set('region', params.region);
    }
    return url.toString();
  } catch {
    // Si URL relative ou format non standard
    return baseUrl;
  }
}
