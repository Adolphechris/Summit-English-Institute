'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { apiFetch } from '@/lib/apiClient';

interface PracticeExercise {
  id: number;
  type: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export default function PracticePage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<PracticeExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skillId, setSkillId] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const skill = url.searchParams.get('skill');
    setSkillId(skill);

    // Charger des exercices de pratique
    apiFetch<{ exercises: PracticeExercise[] }>(`/api/practice?skill=${skill || ''}&limit=10`)
      .then((data) => {
        setExercises(data.exercises || []);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleAnswer = (exerciseId: number, answer: string) => {
    setAnswers((prev) => new Map(prev).set(exerciseId, answer));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    exercises.forEach((ex) => {
      if (answers.get(ex.id) === ex.correctAnswer) correct++;
    });
    return Math.round((correct / exercises.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement des exercices..." />
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <p className="text-slate-600">Aucun exercice disponible pour le moment.</p>
          <Link href="/dashboard">
            <Button className="mt-4">Retour au dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 75;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Résultats</h2>
          <p className="text-6xl font-bold text-slate-900 my-6">{score}%</p>
          <Badge variant={passed ? 'success' : 'error'} size="lg">
            {passed ? 'PASSED' : 'NOT PASSED'}
          </Badge>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <Link href="/review">
              <Button>Réviser les erreurs</Button>
            </Link>
            <Link href="/practice">
              <Button variant="secondary">Nouvelle session</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-slate-900">Pratique</h1>
          <Badge variant="info">
            {currentIndex + 1} / {exercises.length}
          </Badge>
        </div>
        <ProgressBar value={progress} size="sm" showLabel={false} />
      </div>

      <Card className="p-6 sm:p-8">
        <p className="text-lg font-medium text-slate-900 mb-6">{currentExercise.question}</p>

        <div className="space-y-3">
          {currentExercise.type === 'multiple_choice' && currentExercise.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentExercise.id, option)}
              className={`w-full text-left px-4 py-3 border-2 rounded-lg transition-colors ${
                answers.get(currentExercise.id) === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}

          {currentExercise.type === 'fill_blank' && (
            <input
              type="text"
              value={answers.get(currentExercise.id) || ''}
              onChange={(e) => handleAnswer(currentExercise.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre réponse..."
            />
          )}

          {currentExercise.type === 'transformation' && (
            <textarea
              value={answers.get(currentExercise.id) || ''}
              onChange={(e) => handleAnswer(currentExercise.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Votre réponse..."
            />
          )}
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          Précédent
        </Button>

        {currentIndex < exercises.length - 1 ? (
          <Button onClick={() => setCurrentIndex((prev) => prev + 1)}>
            Suivant
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={answers.size === 0}>
            Terminer
          </Button>
        )}
      </div>
    </div>
  );
}
