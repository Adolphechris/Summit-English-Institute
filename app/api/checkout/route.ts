import { NextResponse } from "next/server";
import { getUserById } from "@/services/database/firestore-repository";
import { getRequestUserId } from "@/services/auth/api";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";
import { isMorConfigured, morCheckoutUrlFor } from "@/lib/mor";
import { buildMorCheckoutUrl, validateCoupon } from "@/lib/coupons";
import { config } from "@/lib/config";
import { RegionKey, pricingFor } from "@/lib/pricing";

// POST /api/checkout — crée une session de paiement Premium.
// Mode 1 : Merchant of Record (Gumroad/Lemon Squeezy/Paddle) → redirection directe.
// Mode 2 : Stripe Checkout. Sinon → 503 propre (mode waitlist pré-vente).
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const user = await getUserById(userId);
    if (!user || user.status !== "active") {
      return NextResponse.json({ error: "Session invalide" }, { status: 401 });
    }

    if (user.plan === "premium") {
      return NextResponse.json(
        { error: "Vous avez déjà accès au programme Premium." },
        { status: 409 },
      );
    }

    const searchParams = new URL(request.url).searchParams;
    const region = (searchParams.get("region") as RegionKey | null) ?? "eu";
    const couponCode = searchParams.get("coupon") || searchParams.get("code") || undefined;

    // Validation optionnelle du coupon
    let validCouponCode: string | undefined = undefined;
    if (couponCode) {
      const basePricing = pricingFor(region);
      const couponValidation = validateCoupon(couponCode, basePricing.priceCents);
      if (couponValidation.valid) {
        validCouponCode = couponValidation.code;
      }
    }

    // 1) Merchant of Record : aucune banque locale requise (reversement Payoneer).
    if (isMorConfigured()) {
      const baseMorUrl = morCheckoutUrlFor(region);
      if (baseMorUrl) {
        const enrichedMorUrl = buildMorCheckoutUrl(baseMorUrl, {
          email: user.email,
          userId,
          couponCode: validCouponCode,
          region,
        });
        return NextResponse.json({ url: enrichedMorUrl });
      }
    }

    // 2) Stripe Checkout : nécessite un compte Stripe + IBAN pour les payouts.
    if (isStripeConfigured()) {
      const session = await createCheckoutSession({
        userId,
        email: user.email,
        region,
        successUrl: `${config.app.url}/checkout/success`,
        cancelUrl: `${config.app.url}/checkout/cancel`,
      });
      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json(
      {
        error:
          "Le paiement en ligne sera bientôt disponible. Rejoignez la liste d'attente pour être notifié.",
      },
      { status: 503 },
    );
  } catch (error) {
    console.error("[CHECKOUT ERROR]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
