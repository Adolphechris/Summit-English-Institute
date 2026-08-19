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
import { APP_CONFIG } from '@/lib/constants';

interface Question {
  id: number;
  type: string;
  questionText: string;
  context?: string;
  options?: string[];
  correctAnswer?: string;
}

export default function TakeFinalAssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; certificateId?: string } | null>(null);

  useEffect(() => {
    // Charger les questions de l'évaluation finale cumulative
    apiFetch<{ questions: Question[]; assessmentId: number }>('/api/final-assessment/questions')
      .then((data) => {
        if (!data.questions || data.questions.length === 0) {
          throw new Error('No questions');
        }
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('[FINAL ASSESSMENT LOAD ERROR]', error);
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
      const data = await apiFetch<{ score: number; passed: boolean; certificateId?: string }>(
        '/api/final-assessment/submit',
        {
          method: 'POST',
          body: JSON.stringify({
            assessmentId: APP_CONFIG.finalAssessmentId,
            answers: Array.from(answers.entries()).map(([questionId, givenAnswer]) => ({
              questionId,
              givenAnswer,
            })),
          }),
        }
      );
      setResult(data);
    } catch (error) {
      console.error('[FINAL SUBMIT ERROR]', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement de l'évaluation finale..." />
      </div>
    );
  }

  if (result) {
    const passed = result.score >= 75;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {passed ? 'Congratulations!' : 'Not Yet Passed'}
          </h1>
          <p className="text-6xl font-bold text-slate-900 my-6">{result.score}%</p>
          <Badge variant={passed ? 'success' : 'error'} size="lg">
            {passed ? 'PASSED' : 'NOT PASSED'}
          </Badge>
          {!passed && (
            <p className="text-slate-600 mt-4">
              You need 75% to complete the program. Review your weak areas and try again.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            {passed && result.certificateId ? (
              <Link href={`/certificate/${result.certificateId}`}>
                <Button>View Certificate</Button>
              </Link>
            ) : (
              <Link href="/review">
                <Button>Review Weak Areas</Button>
              </Link>
            )}
            <Link href="/dashboard">
              <Button variant="secondary">Back to Dashboard</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <p className="text-slate-600">No questions available for the final assessment.</p>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-slate-900">Final Assessment</h1>
          <Badge variant="info">
            Question {currentIndex + 1} / {questions.length}
          </Badge>
        </div>
        <ProgressBar value={progress} size="sm" showLabel={false} />
      </div>

      {/* Question */}
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
              placeholder="Your answer..."
            />
          )}

          {currentQuestion.type === 'transformation' && (
            <textarea
              value={answers.get(currentQuestion.id) || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Your answer..."
            />
          )}

          {currentQuestion.type === 'scenario' && (
            <textarea
              value={answers.get(currentQuestion.id) || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Write your answer..."
            />
          )}

          {currentQuestion.type === 'error_correction' && (
            <textarea
              value={answers.get(currentQuestion.id) || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Write the corrected sentence..."
            />
          )}
        </div>
      </Card>

      {/* Navigation */}
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
            Submit Final Assessment
          </Button>
        )}
      </div>
    </div>
  );
}
