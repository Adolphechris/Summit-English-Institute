'use client';

import { useApi } from '@/lib/useApi';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageSkeleton } from '@/components/ui/Skeleton';

interface Lesson {
  id: number;
  title: string;
  objective: string;
  moduleId: number;
  orderIndex: number;
  status: string;
}

export default function LessonsPage() {
  const { data, isLoading } = useApi<{ lessons: Lesson[] }>('/api/lessons?limit=50');
  const lessons = data?.lessons || [];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <PageSkeleton cards={3} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Leçons</h1>
        <p className="text-slate-600 mt-1">Toutes les leçons disponibles</p>
      </div>

      {lessons.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-slate-600">Aucune leçon disponible pour le moment.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info">Leçon {lesson.orderIndex}</Badge>
                      <span className="text-sm text-slate-500">Module {lesson.moduleId}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900">{lesson.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{lesson.objective}</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Voir
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
