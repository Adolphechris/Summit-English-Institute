'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Loading } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { apiFetch } from '@/lib/apiClient';

interface AssessmentQuestion {
  id: number;
  type: string;
  questionText: string;
  context?: string;
  options?: string[];
}

interface AssessmentDetail {
  id: number;
  title: string;
  assessment_type: string;
  passing_score: number;
  level_title?: string;
  module_title?: string;
}

interface SubmissionResult {
  score: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
}

export default function AssessmentPage() {
  const params = useParams();
  const assessmentId = parseInt(String(params.id), 10);

  const [assessment, setAssessment] = useState<AssessmentDetail | null>(null);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    if (!assessmentId) return;

    apiFetch<{ assessment: AssessmentDetail; questions: AssessmentQuestion[] }>(
      `/api/assessments/${assessmentId}`
    )
      .then((data) => {
        setAssessment(data.assessment);
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [assessmentId]);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => new Map(prev).set(questionId, answer));
  };

  const handleSubmit = async () => {
    if (answers.size === 0) return;

    setSubmitting(true);

    try {
      const data = await apiFetch<SubmissionResult>('/api/assessments/submit', {
        method: 'POST',
        body: JSON.stringify({
          assessmentId,
          answers: Array.from(answers.entries()).map(([questionId, givenAnswer]) => ({
            questionId,
            givenAnswer,
          })),
        }),
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la soumission');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement de l'évaluation..." />
      </div>
    );
  }

  if (error || (!assessment && questions.length === 0)) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <ErrorMessage message={error || 'Évaluation introuvable'} onRetry={() => window.location.reload()} />
          <div className="mt-4">
            <Link href="/assessments">
              <Button variant="secondary">Retour aux évaluations</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (result) {
    const threshold = assessment?.passing_score || 75;
    const passed = result.score >= threshold;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {passed ? 'Réussi !' : 'Pas encore réussi'}
          </h1>
          <p className="text-6xl font-bold text-slate-900 my-6">{result.score}%</p>
          <Badge variant={passed ? 'success' : 'error'} size="lg">
            {passed ? 'VALIDÉ' : 'NON VALIDÉ'} — seuil {threshold}%
          </Badge>
          <p className="text-sm text-slate-600 mt-4">
            {result.correctCount} / {result.totalQuestions} bonnes réponses
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <Link href="/assessments">
              <Button>Autres évaluations</Button>
            </Link>
            {!passed && (
              <Link href={`/assessments/${assessmentId}`}>
                <Button variant="secondary">Réessayer</Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {assessment?.title || 'Évaluation'}
            </h1>
            {assessment?.level_title || assessment?.module_title ? (
              <p className="text-sm text-slate-600">
                {assessment.level_title} {assessment.module_title ? `• ${assessment.module_title}` : ''}
              </p>
            ) : null}
          </div>
          <Badge variant="info">
            Question {currentIndex + 1} / {questions.length}
          </Badge>
        </div>
        <ProgressBar value={progress} size="sm" showLabel={false} />
        <p className="text-sm text-slate-500 mt-1">Seuil de validation : {assessment?.passing_score || 75}%</p>
      </div>

      <Card className="p-6 sm:p-8">
        <p className="text-lg font-medium text-slate-900 mb-6">{currentQuestion.questionText}</p>

        {currentQuestion.context && (
          <p className="text-sm text-slate-600 mb-4 italic">"{currentQuestion.context}"</p>
        )}

        <div className="space-y-3">
          {currentQuestion.type === 'multiple_choice' && currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentQuestion.id, option)}
              className={`w-full text-left px-4 py-3 border-2 rounded-lg transition-colors ${
                answers.get(currentQuestion.id) === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}

          {currentQuestion.type === 'fill_blank' && (
            <input
              type="text"
              value={answers.get(currentQuestion.id) || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre réponse..."
            />
          )}

          {(currentQuestion.type === 'transformation' ||
            currentQuestion.type === 'scenario' ||
            currentQuestion.type === 'error_correction') && (
            <textarea
              value={answers.get(currentQuestion.id) || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
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

        {currentIndex < questions.length - 1 ? (
          <Button onClick={() => setCurrentIndex((prev) => prev + 1)}>Suivant</Button>
        ) : (
          <Button onClick={handleSubmit} loading={submitting} disabled={answers.size === 0}>
            Soumettre
          </Button>
        )}
      </div>
    </div>
  );
}
