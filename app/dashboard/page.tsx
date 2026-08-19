'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';
import type { DashboardData, DomainProgress, ContinueLearningCard, RecentResult } from '@/types';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<DashboardData & { canTakeFinalAssessment?: boolean }>('/api/dashboard')
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement du tableau de bord..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800">{error || 'Impossible de charger le tableau de bord'}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {greeting()}
        </h1>
        <p className="text-slate-600 mt-1">Voici votre progression actuelle</p>
      </div>

      {/* Progression générale */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Progression générale</p>
            <p className="text-4xl font-bold text-slate-900 mt-1">{data.overallProgress}%</p>
            <p className="text-sm text-slate-600 mt-1">
              Jour {data.currentDay} / {data.maxDays}
            </p>
          </div>
          <div className="w-full sm:w-64">
            <ProgressBar value={data.overallProgress} size="lg" showLabel={false} />
          </div>
        </div>
      </Card>

      {/* Continue Learning */}
      {data.continueLearning && (
        <Card className="p-6 border-blue-200 bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Continuer l'apprentissage</p>
              <p className="text-lg font-semibold text-blue-900 mt-1">
                {data.continueLearning.title}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                {data.continueLearning.moduleTitle}
              </p>
            </div>
            <Link href={`/${data.continueLearning.type}s/${data.continueLearning.lessonId || data.continueLearning.moduleId}`}>
              <Button>Continuer</Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Révisions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Révisions</h3>
            {data.reviewCount > 0 && (
              <Badge variant="warning">{data.reviewCount} à revoir</Badge>
            )}
          </div>
          {data.reviewCount === 0 ? (
            <p className="text-sm text-slate-500">Aucune révision en attente. Excellent travail !</p>
          ) : (
            <Link href="/review">
              <Button variant="secondary" className="w-full">
                Réviser maintenant ({data.reviewCount})
              </Button>
            </Link>
          )}
        </Card>

        {/* Niveau actuel */}
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Niveau actuel</h3>
          <p className="text-lg font-medium text-slate-900">
            Niveau {data.currentLevel} — {data.currentLevelTitle}
          </p>
          <p className="text-sm text-slate-600 mt-1">
            Score moyen : {Math.round(data.domainProgress.reduce((acc, d) => acc + d.progress, 0) / data.domainProgress.length)}%
          </p>
        </Card>
      </div>

      {/* Domaines */}
      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Progression par domaine</h3>
        <div className="space-y-4">
          {data.domainProgress.map((domain: DomainProgress) => (
            <ProgressBar
              key={domain.domain}
              value={domain.progress}
              label={domain.domain.charAt(0).toUpperCase() + domain.domain.slice(1).replace('_', ' ')}
              size="sm"
            />
          ))}
        </div>
      </Card>

      {/* Résultats récents */}
      {data.recentResults.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Résultats récents</h3>
          <div className="space-y-3">
            {data.recentResults.slice(0, 5).map((result: RecentResult) => (
              <div key={result.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">{result.assessmentTitle}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(result.completedAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{result.score}%</span>
                  <Badge variant={result.result === 'passed' ? 'success' : 'error'} size="sm">
                    {result.result === 'passed' ? 'Réussi' : 'Échoué'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Évaluation finale */}
      {data.overallProgress >= 70 && (
        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">Final Assessment</p>
              <p className="text-lg font-semibold text-green-900 mt-1">
                You are ready for the final evaluation
              </p>
              <p className="text-sm text-green-700 mt-1">
                Complete the final assessment to get your certificate
              </p>
            </div>
            <Link href="/final-assessment">
              <Button>Start Final Assessment</Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Points forts / faibles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.weakAreas.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Points à améliorer</h3>
            <div className="space-y-3">
              {data.weakAreas.slice(0, 5).map((area) => (
                <Link
                  key={area.skillId}
                  href={`/review?skill=${area.skillId}`}
                  className="flex items-center justify-between py-2 hover:bg-slate-50 rounded-lg px-2 -mx-2 transition-colors"
                >
                  <span className="text-sm text-slate-700">{area.skillId}</span>
                  <span className="text-sm font-medium text-slate-900">{area.masteryScore}%</span>
                </Link>
              ))}
            </div>
          </Card>
        )}

        {data.strongAreas.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Points forts</h3>
            <div className="space-y-3">
              {data.strongAreas.slice(0, 5).map((area) => (
                <div key={area.skillId} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-700">{area.skillId}</span>
                  <span className="text-sm font-medium text-green-600">{area.masteryScore}%</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
