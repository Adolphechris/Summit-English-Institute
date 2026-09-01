'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { PREMIUM } from '@/lib/pricing';
import {
  RegionKey,
  detectRegion,
  formatPrice,
  pricingFor,
} from '@/lib/pricing';

const REGION_ORDER: RegionKey[] = ['eu', 'ma', 'af', 'ca', 'us'];

const REGION_LABEL: Record<RegionKey, string> = {
  eu: '🇪🇺 29 €',
  ma: '🇲🇦 199 MAD',
  af: '🌍 12 000 FCFA',
  ca: '🇨🇦 39 $',
  us: '🇺🇸 $19.99',
};

export default function PricingCards({ authenticated }: { authenticated: boolean }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ kind: 'info' | 'error' | 'success'; text: string } | null>(null);
  const [region, setRegion] = useState<RegionKey>('eu');

  // Gestion des codes promotionnels
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    finalAmountCents: number;
    formattedFinalPrice: string;
    description?: string;
  } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    const initial = detectRegion(
      typeof navigator !== 'undefined' ? navigator.language : '',
      navigator?.languages ?? []
    );
    setRegion(initial);
  }, []);

  const pricing = pricingFor(region);

  async function applyCoupon() {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const res = await apiFetch<{
        valid: boolean;
        code: string;
        discountPercent: number;
        finalAmountCents: number;
        formattedFinalPrice: string;
        description?: string;
      }>('/api/coupons/validate', {
        method: 'POST',
        body: JSON.stringify({ code: couponInput, region }),
      });

      if (res.valid) {
        setAppliedCoupon(res);
        setCouponError('');
      }
    } catch (err) {
      setAppliedCoupon(null);
      setCouponError(err instanceof Error ? err.message : 'Code promo invalide');
    } finally {
      setCouponLoading(false);
    }
  }

  async function startCheckout() {
    setLoading(true);
    setMessage(null);
    try {
      let url = `/api/checkout?region=${pricing.key}`;
      if (appliedCoupon) {
        url += `&coupon=${encodeURIComponent(appliedCoupon.code)}`;
      }

      const res = await apiFetch<{ url: string }>(url, {
        method: 'POST',
      });
      window.location.href = res.url;
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Erreur inconnue';
      setMessage({ kind: text.includes('bientôt disponible') ? 'info' : 'error', text });
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Sélecteur de région */}
      <div className="flex flex-wrap justify-center gap-2 mb-8" role="radiogroup">
        {REGION_ORDER.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => {
              setRegion(r);
              setAppliedCoupon(null);
              setCouponError('');
            }}
            aria-checked={region === r}
            role="radio"
            className={`px-3 py-1.5 text-sm rounded-full border font-medium transition-colors ${
              region === r
                ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {REGION_LABEL[r]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Offre gratuite */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900">Découverte</h3>
          <p className="text-sm text-slate-500 mt-1">Sans carte bancaire</p>
          <div className="mt-4 mb-6">
            <span className="text-4xl font-black text-slate-900">Gratuit</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-600 flex-1">
            {PREMIUM.freeFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href={authenticated ? '/course' : '/register'}
            className="mt-8 block text-center px-6 py-3 rounded-xl font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {authenticated ? 'Continuer gratuitement' : 'Créer un compte gratuit'}
          </Link>
        </div>

        {/* Offre Premium */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-600 flex flex-col relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Programme complet
          </div>
          <h3 className="text-lg font-bold text-slate-900">{PREMIUM.name}</h3>
          <p className="text-sm text-slate-500 mt-1">Paiement unique — accès à vie</p>

          <div className="mt-4 mb-1">
            {appliedCoupon ? (
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-blue-900">{appliedCoupon.formattedFinalPrice}</span>
                  <span className="text-lg text-slate-400 line-through font-semibold">{formatPrice(pricing)}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5 mt-1">
                  🏷️ {appliedCoupon.code} (-{appliedCoupon.discountPercent}%)
                </div>
              </div>
            ) : (
              <div>
                <span className="text-4xl font-black text-blue-900">{formatPrice(pricing)}</span>
                <span className="text-slate-500 text-sm ml-2">(tarif local détecté)</span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 mb-6">Pas d&apos;abonnement, pas de frais cachés</p>

          <ul className="space-y-3 text-sm text-slate-600 flex-1">
            {PREMIUM.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Saisie code promo */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Code promo (ex: LANCEMENT10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 uppercase font-medium focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={applyCoupon}
                disabled={couponLoading || !couponInput.trim()}
                className="px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {couponLoading ? '…' : 'Appliquer'}
              </button>
            </div>
            {couponError && <p className="text-xs text-red-600 mt-1">{couponError}</p>}
          </div>

          {authenticated ? (
            <button
              onClick={startCheckout}
              disabled={loading}
              className="mt-6 w-full px-6 py-3 rounded-xl font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Redirection vers le paiement…'
                : `Débloquer — ${appliedCoupon ? appliedCoupon.formattedFinalPrice : formatPrice(pricing)}`}
            </button>
          ) : (
            <Link
              href="/register"
              className="mt-6 block text-center px-6 py-3 rounded-xl font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-md"
            >
              Commencer maintenant
            </Link>
          )}
        </div>
      </div>

      {message && (
        <div
          className={`mt-6 max-w-4xl mx-auto rounded-xl p-4 text-sm text-center ${
            message.kind === 'info'
              ? 'bg-blue-50 border border-blue-200 text-blue-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
          role="status"
        >
          {message.text}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-slate-400">
        Paiement sécurisé avec carte bancaire (Mastercard, Visa) ou Payoneer. Facturation transparente dans votre devise locale.
      </p>
    </div>
  );
}
