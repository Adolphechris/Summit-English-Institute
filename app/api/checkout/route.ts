import { NextResponse } from "next/server";
import { getUserById } from "@/services/database/firestore-repository";
import { getRequestUserId } from "@/services/auth/api";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";
import { isMorConfigured, morCheckoutUrlFor } from "@/lib/mor";
import { config } from "@/lib/config";
import { RegionKey } from "@/lib/pricing";

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

    const region =
      (new URL(request.url).searchParams.get("region") as RegionKey | null) ?? "eu";

    // 1) Merchant of Record : aucune banque locale requise (reversement Payoneer).
    if (isMorConfigured()) {
      const morUrl = morCheckoutUrlFor(region);
      if (morUrl) {
        return NextResponse.json({ url: morUrl });
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
