'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

interface ReviewItem {
  id: number;
  skillId: number;
  skillName: string;
  errorType?: string;
  errorCount: number;
  lastResult?: number;
  priority: string;
  status: string;
}

interface QuestionItem {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function ReviewPage() {
  const router = useRouter();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'due' | 'weak' | 'mistakes'>('due');
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<QuestionItem[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  useEffect(() => {
    apiFetch<{ items: ReviewItem[] }>('/api/review')
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement des révisions SRS..." />
      </div>
    );
  }

  const handleMarkMastered = async (itemId: number) => {
    try {
      await apiFetch('/api/review/master', {
        method: 'POST',
        body: JSON.stringify({ reviewItemId: itemId }),
      });
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } catch {
      // silencieux
    }
  };

  const startQuickSession = async () => {
    try {
      setLoading(true);
      const res = await apiFetch<{ questions: QuestionItem[] }>('/api/questions?limit=10');
      if (res.questions && res.questions.length > 0) {
        setSessionQuestions(res.questions);
        setCurrentQIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setSessionScore(0);
        setSessionActive(true);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const q = sessionQuestions[currentQIndex];
    if (option === q.correctAnswer) {
      setSessionScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < sessionQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Fin de la session
      setSessionActive(false);
    }
  };

  const dueItems = items.filter((item) => item.status === 'due' || item.status === 'in_review');
  const weakItems = items.filter((item) => (item.lastResult !== undefined && item.lastResult < 75) || item.priority === 'high' || item.priority === 'critical');
  const mistakeItems = items.filter((item) => item.errorCount > 0);

  const currentTabItems = activeTab === 'due' ? dueItems : activeTab === 'weak' ? weakItems : mistakeItems;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* En-tête de la page */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 to-indigo-800 p-6 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            <h1 className="text-2xl font-bold">Moteur de Répétition Espacée (SRS)</h1>
          </div>
          <p className="text-blue-100 text-sm mt-1">
            Ancrage mémoriel intelligent basés sur vos erreurs et révisions dues.
          </p>
        </div>
        <Button onClick={startQuickSession} variant="secondary" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
          ⚡ Session de Révision Rapide (10 QCM)
        </Button>
      </div>

      {/* Mode Session Interactive */}
      {sessionActive && sessionQuestions.length > 0 ? (
        <Card className="p-6 space-y-6 border-2 border-indigo-500 shadow-2xl">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <Badge variant="default" className="bg-indigo-600">
                Question {currentQIndex + 1} / {sessionQuestions.length}
              </Badge>
              <span className="ml-3 text-sm text-slate-500 font-medium">Score : {sessionScore} / {currentQIndex + (isAnswered ? 1 : 0)}</span>
            </div>
            <Button size="sm" variant="secondary" onClick={() => setSessionActive(false)}>
              Quitter la session
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {sessionQuestions[currentQIndex].questionText}
            </h3>

            <div className="space-y-3">
              {sessionQuestions[currentQIndex].options.map((opt, idx) => {
                let btnStyle = 'border-slate-200 hover:border-indigo-400 bg-white text-slate-800';
                if (isAnswered) {
                  if (opt === sessionQuestions[currentQIndex].correctAnswer) {
                    btnStyle = 'border-green-500 bg-green-50 text-green-900 font-semibold';
                  } else if (opt === selectedOption) {
                    btnStyle = 'border-red-500 bg-red-50 text-red-900';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 opacity-60';
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSubmit(opt)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${btnStyle}`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn">
              <p className="font-semibold text-slate-900">
                {selectedOption === sessionQuestions[currentQIndex].correctAnswer ? '✅ Bonne réponse !' : '❌ Mauvaise réponse'}
              </p>
              <p className="text-sm text-slate-600">{sessionQuestions[currentQIndex].explanation}</p>
              <Button onClick={handleNextQuestion} className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700">
                {currentQIndex + 1 < sessionQuestions.length ? 'Question Suivante →' : 'Terminer la session 🎉'}
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <>
          {/* Onglets interactifs */}
          <div className="flex border-b border-slate-200 gap-2">
            <button
              onClick={() => setActiveTab('due')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'due'
                  ? 'border-indigo-600 text-indigo-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              📅 À Réviser ({dueItems.length})
            </button>
            <button
              onClick={() => setActiveTab('weak')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'weak'
                  ? 'border-indigo-600 text-indigo-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              ⚠️ Points Faibles ({weakItems.length})
            </button>
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'mistakes'
                  ? 'border-indigo-600 text-indigo-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              ❌ Erreurs Récentes ({mistakeItems.length})
            </button>
          </div>

          {/* Liste des éléments */}
          {currentTabItems.length === 0 ? (
            <Card className="p-8 text-center bg-slate-50 border-dashed">
              <p className="text-4xl mb-3">🎉</p>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Aucune révision dans cette catégorie
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Vos compétences dans cette catégorie sont parfaitement à jour.
              </p>
              <Button onClick={startQuickSession} variant="secondary">
                Démarrer une session d'entraînement générale
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {currentTabItems.map((item) => (
                <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{item.skillName}</p>
                        <Badge
                          variant={
                            item.priority === 'critical' || item.priority === 'high'
                              ? 'warning'
                              : 'default'
                          }
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      {item.errorType && (
                        <p className="text-xs text-slate-500 mt-1">Sujet : {item.errorType}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.errorCount} erreur(s) comptabilisée(s) — Dernier score : {item.lastResult ?? 0}%
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/practice?skill=${item.skillId}`}>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                          S'entraîner
                        </Button>
                      </Link>
                      <Button size="sm" variant="secondary" onClick={() => handleMarkMastered(item.id)}>
                        Maîtrisé ✓
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
