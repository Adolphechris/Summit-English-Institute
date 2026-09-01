'use client';

import { useApi } from '@/lib/useApi';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageSkeleton } from '@/components/ui/Skeleton';
import type { Lesson } from '@/types';

export default function LessonPage() {
  const params = useParams();
  const { data, error, isLoading } = useApi<{ lesson: Lesson }>(`/api/lessons/${params.id}`);
  const lesson = data?.lesson ?? null;

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <PageSkeleton cards={1} />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800">{error || 'Leçon introuvable'}</p>
          <Link href="/course">
            <Button className="mt-4">Retour au parcours</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="info">Leçon</Badge>
          <span className="text-sm text-slate-500">Module {lesson.moduleId}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{lesson.title}</h1>
        <p className="text-slate-600 mt-2">{lesson.objective}</p>
      </div>

      {/* Objective */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Objectif</h2>
        <p className="text-slate-700">{lesson.objective}</p>
      </Card>

      {/* Explanation */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Explication</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 whitespace-pre-wrap">{lesson.explanation}</p>
        </div>
      </Card>

      {/* Examples */}
      {lesson.examples && lesson.examples.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Exemples</h2>
          <div className="space-y-3">
            {lesson.examples.map((example, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4 py-2 bg-slate-50 rounded-r-lg">
                <p className="font-medium text-slate-900">"{example.sentence}"</p>
                {example.meaning && (
                  <p className="text-sm text-slate-600 mt-1">{example.meaning}</p>
                )}
                {example.itContext && (
                  <p className="text-sm text-blue-700 mt-1">
                    <strong>IT :</strong> {example.itContext}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Vocabulary */}
      {lesson.vocabulary && lesson.vocabulary.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Vocabulaire</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.vocabulary.map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-3">
                <p className="font-medium text-slate-900">{item.word}</p>
                {item.pronunciation && (
                  <p className="text-xs text-slate-500">/{item.pronunciation}/</p>
                )}
                <p className="text-sm text-slate-600 mt-1">{item.definition}</p>
                {item.example && (
                  <p className="text-xs text-slate-500 mt-1 italic">"{item.example}"</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* IT Context */}
      {lesson.itContext && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Contexte IT</h2>
          <p className="text-blue-800">{lesson.itContext}</p>
        </Card>
      )}

      {/* Practice */}
      {lesson.practice && lesson.practice.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Pratique</h2>
          <div className="space-y-4">
            {lesson.practice.map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <p className="font-medium text-slate-900 mb-3">{item.question}</p>
                {item.options && (
                  <div className="space-y-2">
                    {item.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        className="w-full text-left px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {item.explanation && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Réponse :</strong> {item.correctAnswer}
                    </p>
                    <p className="text-sm text-green-700 mt-1">{item.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link href={`/assessments?lesson=${lesson.id}`}>
          <Button>Évaluation de la leçon</Button>
        </Link>
        <Link href="/course">
          <Button variant="secondary">Retour au parcours</Button>
        </Link>
      </div>
    </div>
  );
}
