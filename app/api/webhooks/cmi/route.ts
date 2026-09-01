import { getUserById, updateUser } from '@/services/database/firestore-repository';
import { isCmiConfigured, verifyCmiHash } from '@/lib/cmi';

// POST /api/webhooks/cmi — notification serveur CMI (page hébergée 3D Pay).
// CMI poste les résultats en application/x-www-form-urlencoded et attend
// le corps « OK » pour confirmer la réception (sinon il retente).
// ⚠️ Scaffold : l'algorithme de hash doit être validé contre la doc marchand.

export async function POST(request: Request) {
  try {
    if (!isCmiConfigured()) {
      return new Response('CMI non configure', { status: 503 });
    }

    const text = await request.text();
    const params: Record<string, string> = {};
    new URLSearchParams(text).forEach((value, key) => {
      params[key] = value;
    });

    if (!verifyCmiHash(params)) {
      return new Response('INVALID_HASH', { status: 400 });
    }

    const status = (params.Response || params.STATUS || params.status || '').toUpperCase();
    const approved = status === 'OK' || status.includes('PROCESSED') || status.includes('APPROVED');

    // OrderId construit par /api/checkout/cmi : `SE<userId>-<timestamp>`
    const orderId = params.OrderId || params.ORDERID || '';
    const match = /^SE(\d+)-/.exec(orderId);
    const userId = match ? parseInt(match[1], 10) : NaN;

    if (approved && Number.isFinite(userId) && userId > 0) {
      const existing = await getUserById(userId);
      if (existing && existing.premiumOrderId !== orderId) {
        await updateUser(userId, {
          plan: 'premium',
          premiumSince: new Date().toISOString(),
          premiumOrderId: orderId,
          premiumSource: 'cmi',
        });
        console.log(`[CMI WEBHOOK] Premium active pour l'utilisateur ${userId} (${orderId})`);
      }
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('[CMI WEBHOOK ERROR]', error);
    return new Response('ERROR', { status: 500 });
  }
}
