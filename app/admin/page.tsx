'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { apiFetch } from '@/lib/apiClient';

interface Stats {
  totalUsers: number;
  activeLessons: number;
  activeQuestions: number;
  totalAttempts: number;
  certificatesIssued: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await apiFetch<{ stats: Stats }>('/api/admin/stats');
        setStats(data.stats);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des statistiques administrateur.');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return <Loading text="Chargement du tableau de bord administrateur..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Administration — Summit English Institute</h1>
          <p className="text-slate-600 mt-1">Gestion du contenu, des apprenants et suivi des performances.</p>
        </div>
        <Link href="/dashboard" className="shrink-0">
          <Button variant="outline">Retour au tableau de bord apprenant</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        <Card className="text-center p-6 bg-white border border-slate-200">
          <div className="text-3xl font-extrabold text-blue-600 mb-1">{stats?.totalUsers || 0}</div>
          <div className="text-sm font-medium text-slate-600">Apprenants inscrits</div>
        </Card>
        <Card className="text-center p-6 bg-white border border-slate-200">
          <div className="text-3xl font-extrabold text-emerald-600 mb-1">{stats?.activeLessons || 0}</div>
          <div className="text-sm font-medium text-slate-600">Leçons actives</div>
        </Card>
        <Card className="text-center p-6 bg-white border border-slate-200">
          <div className="text-3xl font-extrabold text-purple-600 mb-1">{stats?.activeQuestions || 0}</div>
          <div className="text-sm font-medium text-slate-600">Questions actives</div>
        </Card>
        <Card className="text-center p-6 bg-white border border-slate-200">
          <div className="text-3xl font-extrabold text-amber-600 mb-1">{stats?.totalAttempts || 0}</div>
          <div className="text-sm font-medium text-slate-600">Tentatives d&apos;évaluations</div>
        </Card>
        <Card className="text-center p-6 bg-white border border-slate-200">
          <div className="text-3xl font-extrabold text-indigo-600 mb-1">{stats?.certificatesIssued || 0}</div>
          <div className="text-sm font-medium text-slate-600">Certificats délivrés</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Gestion des Leçons</h2>
          <p className="text-slate-600 text-sm mb-4">
            Consultez, modifiez et créez de nouvelles leçons pour les 20 jours de formation.
          </p>
          <Link href="/admin/lessons">
            <Button variant="primary" className="w-full">Gérer les leçons</Button>
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Banque de Questions</h2>
          <p className="text-slate-600 text-sm mb-4">
            Gérez les questions d&apos;évaluation, attribuez des compétences et configurez les options.
          </p>
          <Link href="/admin/questions">
            <Button variant="primary" className="w-full">Gérer la banque de questions</Button>
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Gestion des Utilisateurs</h2>
          <p className="text-slate-600 text-sm mb-4">
            Consultez la liste des apprenants, modifiez les rôles et gérez les comptes.
          </p>
          <Link href="/admin/users">
            <Button variant="primary" className="w-full">Gérer les utilisateurs</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
