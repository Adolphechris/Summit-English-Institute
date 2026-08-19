'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

interface ReviewItem {
  id: number;
  skillId: number;
  skillName: string;
  errorType?: string;
  errorCount: number;
  lastResult?: number;
  priority: string;
  status: string;
}

export default function ReviewPage() {
  const router = useRouter();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ items: ReviewItem[] }>('/api/review')
      .then((data) => {
        setItems(data.items);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement des révisions..." />
      </div>
    );
  }

  const handleMarkMastered = async (itemId: number) => {
    try {
      await apiFetch('/api/review/master', {
        method: 'POST',
        body: JSON.stringify({ reviewItemId: itemId }),
      });
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } catch {
      // silencieux : on laisse l'élément en place
    }
  };

  const dueItems = items.filter((item) => item.status === 'due');
  const inReviewItems = items.filter((item) => item.status === 'in_review');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Révisions</h1>
        <p className="text-slate-600 mt-1">Révisez vos points faibles</p>
      </div>

      {items.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-4xl mb-4">🎉</p>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune révision en attente</h3>
          <p className="text-slate-600">Excellent travail ! Continuez votre formation.</p>
          <Link href="/dashboard">
            <Button className="mt-4">Retour au dashboard</Button>
          </Link>
        </Card>
      ) : (
        <>
          {dueItems.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">
                À réviser maintenant ({dueItems.length})
              </h3>
              <div className="space-y-3">
                {dueItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{item.skillName}</p>
                        {item.errorType && (
                          <p className="text-sm text-slate-600">Type d'erreur : {item.errorType}</p>
                        )}
                        <p className="text-sm text-slate-500">
                          {item.errorCount} erreur(s) — Dernier résultat : {item.lastResult}%
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.priority === 'critical'
                              ? 'error'
                              : item.priority === 'high'
                              ? 'warning'
                              : 'default'
                          }
                        >
                          {item.priority}
                        </Badge>
                        <Link href={`/practice?skill=${item.skillId}`}>
                          <Button size="sm">Réviser</Button>
                        </Link>
                        <Button size="sm" variant="secondary" onClick={() => handleMarkMastered(item.id)}>
                          Maîtrisé ✓
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
