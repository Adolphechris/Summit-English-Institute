'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Merci pour votre achat !</h1>
        <p className="text-slate-600 mb-2">
          Votre paiement a été confirmé et votre accès <strong>Premium</strong> est activé.
        </p>
        <p className="text-sm text-slate-500 mb-8">
          Si le contenu des niveaux 3-8 n&apos;apparaît pas encore, rechargez la page du tableau
          de bord quelques secondes plus tard.
        </p>
        <Link href="/dashboard">
          <Button className="w-full">Aller au tableau de bord</Button>
        </Link>
      </div>
    </div>
  );
}
