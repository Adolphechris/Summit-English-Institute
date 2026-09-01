'use client';

import Link from 'next/link';
import { useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { PREMIUM } from '@/lib/pricing';

function formatEur(cents: number): string {
  return (cents / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

export default function PricingCards({ authenticated }: { authenticated: boolean }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ kind: 'info' | 'error'; text: string } | null>(null);

  async function startCheckout() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await apiFetch<{ url: string }>('/api/checkout', { method: 'POST' });
      window.location.href = res.url;
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Erreur inconnue';
      setMessage({ kind: text.includes('bientôt disponible') ? 'info' : 'error', text });
      setLoading(false);
    }
  }

  return (
    <div>
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
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Programme complet
          </div>
          <h3 className="text-lg font-bold text-slate-900">{PREMIUM.name}</h3>
          <p className="text-sm text-slate-500 mt-1">Paiement unique — accès à vie</p>
          <div className="mt-4 mb-1">
            <span className="text-4xl font-black text-blue-900">{formatEur(PREMIUM.priceEurCents)}</span>
            <span className="text-slate-500 text-sm ml-2">≈ {PREMIUM.priceMad} MAD</span>
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
          {authenticated ? (
            <button
              onClick={startCheckout}
              disabled={loading}
              className="mt-8 w-full px-6 py-3 rounded-xl font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirection vers le paiement…' : `Débloquer — ${formatEur(PREMIUM.priceEurCents)}`}
            </button>
          ) : (
            <Link
              href="/register"
              className="mt-8 block text-center px-6 py-3 rounded-xl font-bold bg-blue-900 text-white hover:bg-blue-800 transition-colors shadow-md"
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
        Paiement sécurisé par carte bancaire via Stripe. Paiement local par CMI (Maroc) bientôt disponible.
      </p>
    </div>
  );
}
