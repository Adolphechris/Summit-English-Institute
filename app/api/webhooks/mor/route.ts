import { NextResponse } from "next/server";
import {
  getUserById,
  getUserByEmail,
  updateUser,
} from "@/services/database/firestore-repository";
import {
  verifyMorWebhookSignature,
  parseMorWebhookPayload,
  getMorWebhookSecret,
} from "@/lib/mor";

// POST /api/webhooks/mor — Activation automatique du plan Premium après paiement via Merchant of Record (Lemon Squeezy / Gumroad / Paddle).
// Endpoint public : authentification via signature HMAC ou token marchand.
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signatureHeader =
      request.headers.get("x-signature") ||
      request.headers.get("x-gumroad-signature") ||
      request.headers.get("x-webhook-signature") ||
      "";

    const secret = getMorWebhookSecret();

    // Si un secret est configuré en production, on valide impérativement la signature
    if (secret) {
      const isValid = verifyMorWebhookSignature(rawBody, signatureHeader, secret);
      if (!isValid) {
        console.warn("[MOR WEBHOOK] Signature de webhook invalide");
        return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
      }
    }

    let payload: any;
    try {
      // 1. Essai de parsing JSON (Lemon Squeezy, Paddle, Gumroad JSON)
      payload = JSON.parse(rawBody);
    } catch {
      // 2. Fallback parsing x-www-form-urlencoded (Gumroad standard POST)
      const params = new URLSearchParams(rawBody);
      const parsedParams: Record<string, any> = {};
      params.forEach((value, key) => {
        parsedParams[key] = value;
      });
      payload = parsedParams;
    }

    const event = parseMorWebhookPayload(payload);
    if (!event) {
      return NextResponse.json({ error: "Format d'événement non reconnu" }, { status: 400 });
    }

    if (event.status === "paid") {
      let targetUser = null;

      // 1. Recherche par userId si présent dans les custom fields
      if (event.userId && Number.isFinite(event.userId) && event.userId > 0) {
        targetUser = await getUserById(event.userId);
      }

      // 2. Fallback recherche par email
      if (!targetUser && event.email) {
        targetUser = await getUserByEmail(event.email);
      }

      if (targetUser && targetUser.id) {
        // Idempotence : ne pas réécrire si la même commande a déjà été validée
        if (targetUser.premiumOrderId !== event.orderId) {
          await updateUser(targetUser.id, {
            plan: "premium",
            premiumSince: new Date().toISOString(),
            premiumOrderId: event.orderId,
            premiumSource: "mor",
          });

          console.log(
            `[MOR WEBHOOK] ✅ Premium activé avec succès pour ${targetUser.email} (User ID: ${targetUser.id}, Order ID: ${event.orderId}, Provider: ${event.provider})`
          );

          return NextResponse.json({
            received: true,
            updated: true,
            userId: targetUser.id,
            orderId: event.orderId,
          });
        } else {
          return NextResponse.json({
            received: true,
            alreadyProcessed: true,
            userId: targetUser.id,
          });
        }
      } else {
        console.warn(
          `[MOR WEBHOOK] Commande payée reçue mais aucun utilisateur correspondant trouvé : ${event.email} (userId: ${event.userId})`
        );
        return NextResponse.json({
          received: true,
          warning: "Utilisateur non trouvé",
          email: event.email,
        });
      }
    }

    return NextResponse.json({ received: true, status: event.status });
  } catch (error) {
    console.error("[MOR WEBHOOK ERROR]", error);
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}
