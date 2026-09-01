'use client';

import { useApi } from '@/lib/useApi';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { AudioButton } from '@/components/ui/AudioButton';
import { PREMIUM_REQUIRED_MESSAGE } from '@/lib/pricing';
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
    const isPremiumLocked = error === PREMIUM_REQUIRED_MESSAGE;
    return (
      <div className="max-w-2xl mx-auto">
        {isPremiumLocked ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Contenu Premium</h1>
            <p className="text-slate-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tarifs">
                <Button>Voir les tarifs</Button>
              </Link>
              <Link href="/course">
                <Button variant="secondary">Retour au parcours</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-800">{error || 'Leçon introuvable'}</p>
            <Link href="/course">
              <Button className="mt-4">Retour au parcours</Button>
            </Link>
          </div>
        )}
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
        <h2 className="text-lg font-semibold text-slate-900 mb-3">🎯 Objectif Pédagogique</h2>
        <p className="text-slate-700">{lesson.objective}</p>
      </Card>

      {/* Explanation */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">📚 Explication &amp; Notions Clés</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{lesson.explanation}</p>
        </div>
      </Card>

      {/* Examples with Audio */}
      {lesson.examples && lesson.examples.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">💬 Exemples en Contexte Réel</h2>
            <span className="text-xs text-slate-400">Cliquez sur 🔊 pour écouter</span>
          </div>
          <div className="space-y-3">
            {lesson.examples.map((example, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-slate-50 rounded-r-xl">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-slate-900 text-base">"{example.sentence}"</p>
                  <AudioButton text={example.sentence} size="sm" />
                </div>
                {example.meaning && (
                  <p className="text-sm text-slate-600 mt-1">{example.meaning}</p>
                )}
                {example.itContext && (
                  <p className="text-xs text-blue-800 bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 mt-2 inline-block font-medium">
                    🛠️ <strong>Contexte IT :</strong> {example.itContext}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Vocabulary with Audio */}
      {lesson.vocabulary && lesson.vocabulary.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">📖 Vocabulaire Spécialisé IT</h2>
            <span className="text-xs text-slate-400">Prononciation native</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.vocabulary.map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-xl p-3.5 bg-white hover:border-blue-200 transition-colors shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <p className="font-bold text-slate-900 text-base">{item.word}</p>
                    {item.pronunciation && (
                      <p className="text-xs text-slate-400 font-mono">/{item.pronunciation}/</p>
                    )}
                  </div>
                  <AudioButton text={item.word} size="sm" />
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.definition}</p>
                {item.example && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <p className="text-xs text-slate-500 italic">"{item.example}"</p>
                    <AudioButton text={item.example} size="sm" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* IT Context */}
      {lesson.itContext && (
        <Card className="p-6 bg-blue-50/70 border-blue-200">
          <h2 className="text-lg font-semibold text-blue-950 mb-2">⚡ Mise en situation professionnelle</h2>
          <p className="text-blue-900 text-sm leading-relaxed">{lesson.itContext}</p>
        </Card>
      )}

      {/* Practice */}
      {lesson.practice && lesson.practice.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">✍️ Pratique &amp; Exercices</h2>
          <div className="space-y-4">
            {lesson.practice.map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <p className="font-medium text-slate-900 mb-3">{item.question}</p>
                {item.options && (
                  <div className="space-y-2">
                    {item.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="w-full text-left px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                {item.explanation && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-xs font-bold text-emerald-900">
                      ✓ Réponse : {item.correctAnswer}
                    </p>
                    <p className="text-xs text-emerald-800 mt-1 leading-relaxed">{item.explanation}</p>
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
