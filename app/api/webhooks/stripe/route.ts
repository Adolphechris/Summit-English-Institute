import { NextResponse } from 'next/server';
import { getUserById, updateUser } from '@/services/database/firestore-repository';
import { verifyStripeSignature } from '@/lib/stripe';
import { config } from '@/lib/config';

// POST /api/webhooks/stripe — activation du plan Premium après paiement vérifié.
// Endpoint public : l'authentification se fait par signature HMAC (pas par cookie).
// À configurer côté Stripe : événement checkout.session.completed.
export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    if (!config.payments.stripeWebhookSecret) {
      console.error('[STRIPE WEBHOOK] STRIPE_WEBHOOK_SECRET non configuré');
      return NextResponse.json({ error: 'Webhook non configuré' }, { status: 503 });
    }

    if (!verifyStripeSignature(payload, signature, config.payments.stripeWebhookSecret)) {
      return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
    }

    let event: {
      type?: string;
      data?: { object?: Record<string, unknown> };
    };
    try {
      event = JSON.parse(payload);
    } catch {
      return NextResponse.json({ error: 'Payload invalide' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = (event.data?.object || {}) as {
        id?: string;
        payment_status?: string;
        status?: string;
        metadata?: Record<string, string>;
        client_reference_id?: string | null;
      };

      const paid = session.payment_status === 'paid' || session.status === 'complete';
      const rawUserId = session.metadata?.userId || session.client_reference_id || '';
      const userId = parseInt(rawUserId, 10);

      if (paid && Number.isFinite(userId) && userId > 0 && session.id) {
        // Idempotence : ne pas réactiver si la commande a déjà été traitée
        const existing = await getUserById(userId);
        if (existing && existing.premiumOrderId !== session.id) {
          await updateUser(userId, {
            plan: 'premium',
            premiumSince: new Date().toISOString(),
            premiumOrderId: session.id,
            premiumSource: 'stripe',
          });
          console.log(`[STRIPE WEBHOOK] Premium activé pour l'utilisateur ${userId} (${session.id})`);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[STRIPE WEBHOOK ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
