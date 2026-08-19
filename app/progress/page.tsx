'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';
import type { DomainProgress } from '@/types';

export default function ProgressPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [domainProgress, setDomainProgress] = useState<DomainProgress[]>([]);

  useEffect(() => {
    apiFetch<{ domainProgress: DomainProgress[] }>('/api/progress')
      .then((data) => {
        setDomainProgress(data.domainProgress);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement de la progression..." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Progression</h1>
        <p className="text-slate-600 mt-1">Suivez votre évolution par domaine</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Progression par domaine</h3>
        <div className="space-y-4">
          {domainProgress.map((domain) => (
            <ProgressBar
              key={domain.domain}
              value={domain.progress}
              label={domain.domain.charAt(0).toUpperCase() + domain.domain.slice(1).replace('_', ' ')}
              size="md"
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
