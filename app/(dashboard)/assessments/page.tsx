'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

interface Assessment {
  id: number;
  title: string;
  assessmentType: string;
  passingScore: number;
  questionCount?: number;
  levelTitle?: string;
  moduleTitle?: string;
}

export default function AssessmentsPage() {
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ assessments: Assessment[] }>('/api/assessments')
      .then((data) => {
        setAssessments(data.assessments || []);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement des évaluations..." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Évaluations</h1>
        <p className="text-slate-600 mt-1">Testez vos connaissances</p>
      </div>

      {assessments.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-slate-600">Aucune évaluation disponible pour le moment.</p>
          <p className="text-sm text-slate-400 mt-2">Les évaluations seront disponibles au fur et à mesure de ta progression.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{assessment.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {assessment.levelTitle || assessment.moduleTitle || 'Évaluation générale'}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="info">{assessment.assessmentType}</Badge>
                    <span className="text-sm text-slate-600">
                      Seuil : {assessment.passingScore}%
                    </span>
                    {assessment.questionCount && (
                      <span className="text-sm text-slate-600">
                        {assessment.questionCount} questions
                      </span>
                    )}
                  </div>
                </div>
                <Link href={`/assessments/${assessment.id}`}>
                  <Button>Commencer</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
