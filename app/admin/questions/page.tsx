'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { apiFetch } from '@/lib/apiClient';

interface Question {
  id: number;
  type: string;
  question_text: string;
  context: string | null;
  difficulty: string;
  skill_id: number | null;
  skill_title: string | null;
  tags: string[];
  status: string;
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await apiFetch<{ questions: Question[] }>('/api/admin/questions?limit=100');
        setQuestions(data.questions);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des questions.');
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, []);

  if (loading) return <Loading text="Chargement des questions d'évaluation..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Banque de Questions ({questions.length} affichées)</h1>
          <p className="text-slate-600 text-sm">Gestion des questions et association aux compétences pédagogiques.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin">
            <Button variant="outline">Retour à l&apos;Administration</Button>
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Intitulé de la question</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Diffic.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Compétence</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tags</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200 text-sm">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">#{q.id}</td>
                  <td className="px-4 py-3">
                    <Badge variant="info">{q.type}</Badge>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{q.question_text}</td>
                  <td className="px-4 py-3 font-bold text-slate-700">{q.difficulty}</td>
                  <td className="px-4 py-3 text-slate-600">{q.skill_title || 'Non liée'}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{q.tags?.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
