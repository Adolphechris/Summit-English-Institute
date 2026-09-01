import { NextResponse } from 'next/server';
import { getUserById } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';
import { createCheckoutSession, isStripeConfigured } from '@/lib/stripe';
import { config } from '@/lib/config';

// POST /api/checkout — crée une Stripe Checkout Session pour le plan Premium.
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const user = await getUserById(userId);
    if (!user || user.status !== 'active') {
      return NextResponse.json({ error: 'Session invalide' }, { status: 401 });
    }

    if (user.plan === 'premium') {
      return NextResponse.json(
        { error: 'Vous avez déjà accès au programme Premium.' },
        { status: 409 }
      );
    }

    if (!isStripeConfigured()) {
      return NextResponse.json(
        {
          error:
            "Le paiement en ligne sera bientôt disponible. Contactez-nous pour activer Premium dès maintenant.",
        },
        { status: 503 }
      );
    }

    const session = await createCheckoutSession({
      userId,
      email: user.email,
      successUrl: `${config.app.url}/checkout/success`,
      cancelUrl: `${config.app.url}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[CHECKOUT ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
