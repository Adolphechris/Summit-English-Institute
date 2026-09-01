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
  premiumUsers: number;
  waitlistCount: number;
  activeLessons: number;
  activeQuestions: number;
  totalAttempts: number;
  certificatesIssued: number;
}

interface WaitlistLead {
  email: string;
  firstName?: string | null;
  region: string;
  source: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<WaitlistLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, leadsData] = await Promise.all([
          apiFetch<{ stats: Stats }>('/api/admin/stats'),
          apiFetch<{ leads: WaitlistLead[] }>('/api/admin/waitlist').catch(() => ({ leads: [] })),
        ]);
        setStats(statsData.stats);
        setLeads(leadsData.leads || []);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des données administrateur.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const exportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['Email', 'Prenom', 'Region', 'Source', 'Date'];
    const rows = leads.map((l) => [
      l.email,
      l.firstName || '',
      l.region,
      l.source,
      new Date(l.createdAt).toLocaleDateString('fr-FR'),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_waitlist_summit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Loading text="Chargement du cockpit administrateur..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Cockpit Administrateur</h1>
          <p className="text-slate-600 mt-1">Pilotage des leads, conversions Premium, et gestion pédagogique.</p>
        </div>
        <Link href="/dashboard" className="shrink-0">
          <Button variant="outline">← Tableau de bord apprenant</Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center p-5 bg-white border border-slate-200">
          <div className="text-2xl font-black text-blue-900 mb-1">{stats?.totalUsers || 0}</div>
          <div className="text-xs font-semibold text-slate-500">Inscrits totaux</div>
        </Card>
        <Card className="text-center p-5 bg-emerald-50/50 border border-emerald-200">
          <div className="text-2xl font-black text-emerald-700 mb-1">{stats?.premiumUsers || 0}</div>
          <div className="text-xs font-semibold text-emerald-800">Membres Premium</div>
        </Card>
        <Card className="text-center p-5 bg-purple-50/50 border border-purple-200">
          <div className="text-2xl font-black text-purple-700 mb-1">{stats?.waitlistCount || 0}</div>
          <div className="text-xs font-semibold text-purple-800">Leads Waitlist</div>
        </Card>
        <Card className="text-center p-5 bg-white border border-slate-200">
          <div className="text-2xl font-black text-slate-700 mb-1">{stats?.activeLessons || 0}</div>
          <div className="text-xs font-semibold text-slate-500">Leçons actives</div>
        </Card>
        <Card className="text-center p-5 bg-white border border-slate-200">
          <div className="text-2xl font-black text-amber-600 mb-1">{stats?.totalAttempts || 0}</div>
          <div className="text-xs font-semibold text-slate-500">Tentatives quiz</div>
        </Card>
        <Card className="text-center p-5 bg-blue-50/50 border border-blue-200">
          <div className="text-2xl font-black text-blue-700 mb-1">{stats?.certificatesIssued || 0}</div>
          <div className="text-xs font-semibold text-blue-800">Certificats délivrés</div>
        </Card>
      </div>

      {/* Leads Table with CSV Export */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">📥 Leads Waitlist &amp; Pré-ventes ({leads.length})</h2>
            <p className="text-xs text-slate-500 mt-0.5">Contacts capturés pour les campagnes et relances commerciales.</p>
          </div>
          {leads.length > 0 && (
            <Button onClick={exportCsv} variant="outline" size="sm">
              📊 Exporter CSV
            </Button>
          )}
        </div>

        {leads.length === 0 ? (
          <p className="text-sm text-slate-500 italic py-4">Aucun lead inscrit sur la waitlist pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Région</th>
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.slice(0, 10).map((lead, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{lead.email}</td>
                    <td className="py-2.5 px-3 uppercase text-xs font-semibold text-blue-700">{lead.region}</td>
                    <td className="py-2.5 px-3 text-xs text-slate-500">{lead.source}</td>
                    <td className="py-2.5 px-3 text-xs text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Navigation Modules Admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Gestion des Leçons</h2>
          <p className="text-slate-600 text-sm mb-4">
            Consultez, modifiez et créez de nouvelles leçons pour les 20 étapes de formation.
          </p>
          <Link href="/admin/lessons">
            <Button variant="primary" className="w-full">Gérer les 80 leçons</Button>
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Banque de Questions</h2>
          <p className="text-slate-600 text-sm mb-4">
            Gérez les 920 questions d&apos;évaluation et attribuez les compétences.
          </p>
          <Link href="/admin/questions">
            <Button variant="primary" className="w-full">Gérer la banque QCM</Button>
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Gestion des Utilisateurs</h2>
          <p className="text-slate-600 text-sm mb-4">
            Consultez la liste des apprenants, attribuez le statut Premium et gérez les comptes.
          </p>
          <Link href="/admin/users">
            <Button variant="primary" className="w-full">Gérer les utilisateurs</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
