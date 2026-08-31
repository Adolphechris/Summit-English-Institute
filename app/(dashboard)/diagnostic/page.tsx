'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

interface DiagnosticResult {
  overallScore: number;
  domains: { domain: string; score: number; level: string }[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export default function DiagnosticPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Charger les questions de diagnostic
    apiFetch<{ questions: any[] }>('/api/diagnostic/questions')
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch(() => {
        router.push('/dashboard');
      });
  }, [router]);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => new Map(prev).set(questionId, answer));
  };

  const handleSubmit = async () => {
    if (answers.size === 0) return;

    setSubmitting(true);

    try {
      const data = await apiFetch<DiagnosticResult>('/api/diagnostic/submit', {
        method: 'POST',
        body: JSON.stringify({
          answers: Array.from(answers.entries()).map(([questionId, givenAnswer]) => ({
            questionId,
            givenAnswer,
          })),
        }),
      });
      setResult(data);
    } catch (error) {
      console.error('[DIAGNOSTIC ERROR]', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement du diagnostic..." />
      </div>
    );
  }

  if (result) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Diagnostic Complete</h1>
          <p className="text-xl text-slate-600">Overall Score: {result.overallScore}%</p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Your Profile</h3>
          <div className="space-y-3">
            {result.domains.map((domain) => (
              <div key={domain.domain} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 capitalize">
                  {domain.domain.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-3">
                  <ProgressBar value={domain.score} size="sm" showLabel={false} />
                  <span className="text-sm font-medium text-slate-900 w-12 text-right">
                    {domain.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-green-900 mb-3">Strengths</h3>
            <ul className="space-y-2">
              {result.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-green-800">✓ {strength}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-red-900 mb-3">Areas to Improve</h3>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, i) => (
                <li key={i} className="text-sm text-red-800">• {weakness}</li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-slate-700">→ {rec}</li>
            ))}
          </ul>
        </Card>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <p className="text-slate-600">No diagnostic questions available.</p>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-slate-900">Diagnostic</h1>
          <Badge variant="info">
            Question {currentIndex + 1} / {questions.length}
          </Badge>
        </div>
        <ProgressBar value={progress} size="sm" showLabel={false} />
        <p className="text-sm text-slate-600 mt-2">
          This diagnostic helps us understand your starting level. Answer honestly.
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <p className="text-lg font-medium text-slate-900 mb-6">{currentQuestion.questionText}</p>

        {currentQuestion.context && (
          <p className="text-sm text-slate-600 mb-4 italic">"{currentQuestion.context}"</p>
        )}

        <div className="space-y-3">
          {currentQuestion.type === 'multiple_choice' && currentQuestion.options?.map((option: string, index: number) => (
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
              placeholder="Your answer..."
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
          Previous
        </Button>

        {currentIndex < questions.length - 1 ? (
          <Button onClick={() => setCurrentIndex((prev) => prev + 1)}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} loading={submitting} disabled={answers.size === 0}>
            Submit Diagnostic
          </Button>
        )}
      </div>
    </div>
  );
}