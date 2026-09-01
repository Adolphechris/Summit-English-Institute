'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
        <div className="text-5xl mb-4">🙅</div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Paiement annulé</h1>
        <p className="text-slate-600 mb-8">
          Aucun montant n&apos;a été débité. Vous pouvez reprendre le paiement à tout moment —
          vos niveaux 1-2 gratuits restent accessibles.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/tarifs" className="flex-1">
            <Button className="w-full">Revoir les tarifs</Button>
          </Link>
          <Link href="/dashboard" className="flex-1">
            <Button variant="secondary" className="w-full">
              Tableau de bord
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
