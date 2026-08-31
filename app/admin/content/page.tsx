'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { apiFetch } from '@/lib/apiClient';

interface LessonItem {
  id: number;
  levelId: number;
  title: string;
  explanation: string;
  orderIndex: number;
}

interface QuestionItem {
  id: number;
  lessonId: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
}

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'lessons' | 'questions'>('lessons');
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    Promise.all([
      apiFetch<{ lessons: LessonItem[] }>('/api/lessons').catch(() => ({ lessons: [] })),
      apiFetch<{ questions: QuestionItem[] }>('/api/questions?limit=100').catch(() => ({ questions: [] })),
    ])
      .then(([lessonsData, questionsData]) => {
        setLessons(lessonsData.lessons || []);
        setQuestions(questionsData.questions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Chargement du contenu d'administration..." />
      </div>
    );
  }

  const filteredLessons = lessons.filter((l) =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) || l.id.toString() === searchTerm
  );

  const filteredQuestions = questions.filter((q) =>
    q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) || q.id.toString() === searchTerm
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      {/* Header Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-indigo-600">Administration</Badge>
            <h1 className="text-2xl font-bold">Gestion du Contenu Pédagogique (CRUD)</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Éditez, contrôlez et gérez les 80 leçons et 920 questions QCM uniques.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button variant="secondary" size="sm">Dashboard Admin</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-white border-white/20">Quitter Admin</Button>
          </Link>
        </div>
      </div>

      {/* Barre de recherche et onglets */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={() => setActiveTab('lessons')}
            variant={activeTab === 'lessons' ? 'primary' : 'secondary'}
            size="sm"
          >
            📚 Leçons ({lessons.length})
          </Button>
          <Button
            onClick={() => setActiveTab('questions')}
            variant={activeTab === 'questions' ? 'primary' : 'secondary'}
            size="sm"
          >
            ❓ Banque de Questions ({questions.length})
          </Button>
        </div>

        <input
          type="text"
          placeholder="Rechercher par titre ou ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* VUE LEÇONS */}
      {activeTab === 'lessons' && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Catalogue des 80 Leçons Denses</h3>
            <span className="text-xs text-slate-500">{filteredLessons.length} leçons affichées</span>
          </div>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {filteredLessons.map((lesson) => (
              <div key={lesson.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-slate-800 text-white font-mono text-xs">
                      ID {lesson.id} | N{lesson.levelId}
                    </Badge>
                    <p className="font-bold text-slate-900 text-sm">{lesson.title}</p>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    Explication : {lesson.explanation?.substring(0, 120)}...
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/lessons/${lesson.id}`} target="_blank">
                    <Button size="sm" variant="outline">Voir la leçon</Button>
                  </Link>
                  <Button size="sm" variant="secondary" onClick={() => alert(`Édition de la leçon ID ${lesson.id} dans l'éditeur.`)}>
                    Éditer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* VUE QUESTIONS */}
      {activeTab === 'questions' && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Banque de Questions QCM</h3>
            <span className="text-xs text-slate-500">{filteredQuestions.length} questions affichées</span>
          </div>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-indigo-800 text-white font-mono text-xs">
                      QCM #{q.id}
                    </Badge>
                    <Badge variant="info" className="text-xs">
                      Leçon {q.lessonId}
                    </Badge>
                    <Badge variant="warning" className="text-xs">
                      Diff : {q.difficulty}
                    </Badge>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => alert(`Édition de la question #${q.id}.`)}>
                    Éditer QCM
                  </Button>
                </div>

                <p className="font-medium text-slate-900 text-sm">{q.questionText}</p>

                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {q.options.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded border ${
                          opt === q.correctAnswer
                            ? 'bg-green-50 border-green-300 font-semibold text-green-900'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}. {opt} {opt === q.correctAnswer && '✓ (Exacte)'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
