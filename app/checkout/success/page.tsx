'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { apiFetch } from '@/lib/apiClient';

export default function CheckoutSuccessPage() {
  const [state, setState] = useState<'checking' | 'premium' | 'pending' | 'anon'>('checking');

  useEffect(() => {
    let active = true;
    // Rafraîchir le plan une fois — le webhook MOR active premium en quelques secondes.
    (async () => {
      try {
        const data = await apiFetch<{ user: { plan?: string } }>('/api/auth/me');
        if (!active) return;
        setState(data.user?.plan === 'premium' ? 'premium' : 'pending');
      } catch {
        if (active) setState('anon');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const message =
    state === 'checking'
      ? 'Vérification de votre accès…'
      : state === 'premium'
        ? 'Votre paiement a été confirmé et votre accès Premium est actif.'
        : state === 'pending'
          ? 'Paiement reçu — l’activation automatique peut prendre quelques secondes. Rechargez dans un instant si le contenu n’apparaît pas.'
          : 'Paiement confirmé. Connectez-vous pour accéder à votre programme Premium.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Merci pour votre achat !</h1>
        <p className="text-slate-600 mb-2">{message}</p>
        {state === 'checking' && (
          <p className="text-sm text-slate-400 animate-pulse">
            <span role="status">…</span>
          </p>
        )}
        <div className="mt-6">
          {state === 'anon' ? (
            <Link href="/login" className="inline-block w-full">
              <Button className="w-full">Se connecter</Button>
            </Link>
          ) : (
            <Link href="/dashboard">
              <Button className="w-full">Aller au tableau de bord</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
