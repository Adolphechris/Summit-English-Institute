'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

interface FinalAssessmentStatus {
  canTake: boolean;
  reason?: string;
  score?: number;
  passed?: boolean;
  certificateId?: string;
  alreadyCompleted?: boolean;
  completedAt?: string;
  overallProgress?: number;
}

export default function FinalAssessmentPage() {
  const router = useRouter();
  const [status, setStatus] = useState<FinalAssessmentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<FinalAssessmentStatus>('/api/final-assessment')
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch(() => {
        router.push('/dashboard');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Vérification de l'éligibilité..." />
      </div>
    );
  }

  if (!status) {
    return null;
  }

  if (status.alreadyCompleted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Assessment Already Completed</h1>
          <p className="text-xl text-slate-600">Final Score: {status.score}%</p>
          <Badge variant={status.passed ? 'success' : 'error'} size="lg" className="mt-4">
            {status.passed ? 'PASSED' : 'NOT PASSED'}
          </Badge>
          {status.passed && status.certificateId && (
            <div className="mt-6">
              <Link href={`/certificate/${status.certificateId}`}>
                <Button>View Certificate</Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Final Assessment</h1>
          <p className="text-lg text-slate-600 mb-6">
            This is your final evaluation. It covers all domains of the program.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">Assessment Details</h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-blue-700">Questions</p>
                <p className="text-2xl font-bold text-blue-900">50</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Passing Score</p>
                <p className="text-2xl font-bold text-blue-900">75%</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Domains Covered</p>
                <p className="text-2xl font-bold text-blue-900">6</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Type</p>
                <p className="text-2xl font-bold text-blue-900">Cumulative</p>
              </div>
            </div>
          </div>

          {status.canTake ? (
            <div className="space-y-4">
              <p className="text-green-700 font-medium">✓ You are eligible to take the final assessment</p>
              <Link href="/final-assessment/take">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Final Assessment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-red-700 font-medium">⚠️ {status.reason}</p>
              <Link href="/review">
                <Button size="lg" className="w-full sm:w-auto">
                  Review Required Areas
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
