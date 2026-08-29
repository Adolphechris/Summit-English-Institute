'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { apiFetch } from '@/lib/apiClient';

interface Lesson {
  id: number;
  module_id: number;
  title: string;
  objective: string;
  order_index: number;
  status: string;
  module_title: string;
  level_id: number;
  level_title: string;
}

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLessons() {
      try {
        const data = await apiFetch<{ lessons: Lesson[] }>('/api/admin/lessons');
        setLessons(data.lessons);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des leçons.');
      } finally {
        setLoading(false);
      }
    }
    loadLessons();
  }, []);

  if (loading) return <Loading text="Chargement des leçons..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Leçons ({lessons.length})</h1>
          <p className="text-slate-600 text-sm">Liste complète des leçons des 8 niveaux et 40 modules.</p>
        </div>
        <div className="flex gap-3 shrink-0">
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Niveau</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Module</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Titre de la leçon</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200 text-sm">
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">#{lesson.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">Lvl {lesson.level_id}: {lesson.level_title}</td>
                  <td className="px-4 py-3 text-slate-600">{lesson.module_title}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{lesson.title}</td>
                  <td className="px-4 py-3">
                    <Badge variant={lesson.status === 'active' ? 'success' : 'default'}>
                      {lesson.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
