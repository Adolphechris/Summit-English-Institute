import { NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";
import { pricingFor, type RegionKey, formatPrice } from "@/lib/pricing";

// POST /api/coupons/validate — Valider un code promotionnel et calculer le montant remisé
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, region } = body;

    const targetRegion: RegionKey = (region as RegionKey) || "eu";
    const basePricing = pricingFor(targetRegion);

    const result = validateCoupon(code, basePricing.priceCents);

    if (!result.valid) {
      return NextResponse.json(
        {
          valid: false,
          error: result.error || "Code promo invalide",
        },
        { status: 400 }
      );
    }

    const finalPricing = {
      ...basePricing,
      priceCents: result.finalAmountCents,
    };

    return NextResponse.json({
      valid: true,
      code: result.code,
      discountPercent: result.discountPercent,
      discountAmountCents: result.discountAmountCents,
      finalAmountCents: result.finalAmountCents,
      formattedFinalPrice: formatPrice(finalPricing),
      description: result.description,
    });
  } catch (error) {
    console.error("[COUPON VALIDATE ERROR]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// GET /api/coupons/validate?code=LANCEMENT10&region=ma
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || "";
  const region = (searchParams.get("region") as RegionKey) || "eu";

  const basePricing = pricingFor(region);
  const result = validateCoupon(code, basePricing.priceCents);

  if (!result.valid) {
    return NextResponse.json(
      {
        valid: false,
        error: result.error || "Code promo invalide",
      },
      { status: 400 }
    );
  }

  const finalPricing = {
    ...basePricing,
    priceCents: result.finalAmountCents,
  };

  return NextResponse.json({
    valid: true,
    code: result.code,
    discountPercent: result.discountPercent,
    finalAmountCents: result.finalAmountCents,
    formattedFinalPrice: formatPrice(finalPricing),
    description: result.description,
  });
}
