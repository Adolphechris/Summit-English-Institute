'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loading } from '@/components/ui/Loading';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { apiFetch } from '@/lib/apiClient';
import type { DashboardData } from '@/types';

export default function CertificatePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<DashboardData>('/api/dashboard'),
      apiFetch<{ user: { id?: string; email: string } }>('/api/auth/me'),
    ])
      .then(([dash, me]) => {
        setData(dash);
        setUserId(me.user.id ?? me.user.email);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Vérification de ton certificat…" />
      </div>
    );
  }

  const progress = data?.overallProgress ?? 0;
  const isEligible = progress >= 80;

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">🎓 Mon Certificat</h1>
        <p className="text-slate-500 mt-1">
          Complète le programme pour obtenir ton certificat Summit English Institute
        </p>
      </div>

      {isEligible ? (
        /* ── Éligible ── */
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-3xl p-8 text-center shadow-sm">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Félicitations !</h2>
          <p className="text-slate-600 mb-6">
            Tu as atteint <span className="font-bold text-amber-700">{progress}%</span> de progression — tu es éligible à ton certificat.
          </p>
          {userId && (
            <Link
              href={`/certificate/${userId}`}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-colors text-lg"
            >
              📄 Voir & Télécharger mon certificat
            </Link>
          )}
          <p className="text-xs text-slate-400 mt-4">
            Certificat officiel Summit English Institute — Programme IT English
          </p>
        </div>
      ) : (
        /* ── Pas encore éligible ── */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">📋</div>
              <h2 className="text-xl font-bold text-slate-900">Certificat verrouillé</h2>
              <p className="text-slate-500 mt-2">
                Complète au moins <span className="font-semibold text-blue-700">80%</span> du programme pour débloquer ton certificat.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">Progression actuelle</span>
                <span className="font-bold text-slate-900">{progress}%</span>
              </div>
              <ProgressBar value={progress} size="lg" showLabel={false} />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>0%</span>
                <span className="text-blue-600 font-semibold">Objectif : 80%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800 font-medium text-center">
                Il te reste encore{' '}
                <span className="font-black">{80 - progress}%</span>{' '}
                à compléter avant de pouvoir télécharger ton certificat.
              </p>
            </div>
          </div>

          {/* Étapes pour progresser */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">🚀 Comment progresser rapidement ?</h3>
            <div className="space-y-3">
              {[
                { icon: '🎯', label: 'Faire le test diagnostique', href: '/diagnostic', desc: 'Connaître ton niveau de départ' },
                { icon: '🗺️', label: 'Suivre le parcours 20 jours', href: '/course', desc: 'Plan structuré jour par jour' },
                { icon: '📖', label: 'Étudier les leçons IT', href: '/lessons', desc: '80 leçons spécialisées' },
                { icon: '📝', label: 'Passer les quiz & tests', href: '/assessments', desc: 'Valider chaque niveau' },
              ].map((step) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-2xl">{step.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{step.label}</p>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                  <span className="text-slate-300 group-hover:text-blue-500 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
