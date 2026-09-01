'use client';

import Link from 'next/link';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { useApi } from '@/lib/useApi';
import type { DashboardData, DomainProgress, RecentResult } from '@/types';

/* ── Mini composants ── */
function StatCard({ value, label, icon, color }: { value: string | number; label: string; icon: string; color: string }) {
  return (
    <div className={`rounded-2xl p-5 text-white ${color} shadow-sm`}>
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-3xl font-black leading-none">{value}</div>
      <div className="text-sm opacity-80 mt-1 font-medium">{label}</div>
    </div>
  );
}

function QuickCard({ href, icon, title, desc, badge, highlight }: {
  href: string; icon: string; title: string; desc: string; badge?: string; highlight?: boolean;
}) {
  return (
    <Link href={href} className={`group block rounded-2xl p-5 border-2 hover:shadow-md transition-all duration-200 ${
      highlight ? 'border-blue-400 bg-blue-50 hover:border-blue-500' : 'border-slate-100 bg-white hover:border-blue-200'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {badge && <Badge variant="warning" size="sm">{badge}</Badge>}
        {highlight && !badge && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">Recommandé</span>}
      </div>
      <h3 className={`font-semibold group-hover:text-blue-700 transition-colors ${highlight ? 'text-blue-900' : 'text-slate-900'}`}>{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </Link>
  );
}

const PROGRAM_LEVELS = [
  { level: 1, cefr: 'A1', title: 'Absolute Beginner', color: 'bg-slate-100 text-slate-600', lessons: '1-10', desc: 'Fondamentaux IT, vocabulaire de base' },
  { level: 2, cefr: 'A2', title: 'Elementary', color: 'bg-blue-50 text-blue-700', lessons: '11-20', desc: 'Emails simples, support technique' },
  { level: 3, cefr: 'B1', title: 'Pre-Intermediate', color: 'bg-indigo-50 text-indigo-700', lessons: '21-30', desc: 'Réunions, APIs & cloud vocabulary' },
  { level: 4, cefr: 'B1+', title: 'Intermediate', color: 'bg-violet-50 text-violet-700', lessons: '31-40', desc: 'Présentations, networking' },
  { level: 5, cefr: 'B2', title: 'Upper-Intermediate', color: 'bg-purple-50 text-purple-700', lessons: '41-50', desc: 'Négociations, architecture IT' },
  { level: 6, cefr: 'B2+', title: 'Advanced IT', color: 'bg-pink-50 text-pink-700', lessons: '51-60', desc: 'Client-facing English, DevOps' },
  { level: 7, cefr: 'C1', title: 'Professional', color: 'bg-rose-50 text-rose-700', lessons: '61-70', desc: 'Conférences, pitch decks, AI & data' },
  { level: 8, cefr: 'C2', title: 'Expert / Mastery', color: 'bg-amber-50 text-amber-700', lessons: '71-80', desc: 'Native-level, thought leadership' },
];

/* ── Page principale ── */
export default function DashboardPage() {
  // Données mises en cache (stale-while-revalidate) : navigation instantanée
  const { data: me } = useApi<{ user: { email: string; firstName?: string; plan?: string } }>('/api/auth/me');
  const { data, error, isLoading, refresh } = useApi<DashboardData>('/api/dashboard');

  const userName = me?.user?.firstName || me?.user?.email?.split('@')[0] || '';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';

  const dayOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][new Date().getDay()];
  const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageSkeleton cards={3} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-red-800 font-medium">{error || 'Impossible de charger le tableau de bord'}</p>
          <Button className="mt-4" onClick={refresh}>Réessayer</Button>
        </div>
      </div>
    );
  }

  const isNewStudent = data.overallProgress === 0;
  const avgScore = data.domainProgress.length
    ? Math.round(data.domainProgress.reduce((acc: number, d: DomainProgress) => acc + d.progress, 0) / data.domainProgress.length)
    : 0;

  return (
    <div className="space-y-8">

      {/* ── HERO BANNER ── */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {dayOfWeek} {dateStr}
                </div>
                {data.streak > 1 && (
                  <div className="inline-flex items-center gap-1.5 bg-orange-400/30 border border-orange-300/40 rounded-full px-3 py-1 text-xs font-bold">
                    🔥 {data.streak} jours de suite
                  </div>
                )}
                {me?.user?.plan === 'premium' ? (
                  <div className="inline-flex items-center gap-1.5 bg-amber-400/30 border border-amber-300/40 rounded-full px-3 py-1 text-xs font-bold">
                    ⭐ Premium
                  </div>
                ) : (
                  <Link
                    href="/tarifs"
                    className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 text-xs font-bold transition-colors"
                  >
                    🆓 Gratuit — Passer Premium
                  </Link>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                {greeting}{userName ? `, ${userName}` : ''} 👋
              </h1>
              {isNewStudent ? (
                <p className="text-blue-100 mt-2 text-base">Bienvenue dans ton espace d'apprentissage IT English !</p>
              ) : (
                <p className="text-blue-100 mt-2 text-lg">Niveau {data.currentLevel} — {data.currentLevelTitle}</p>
              )}

              {!isNewStudent && (
                <div className="flex items-center gap-5 mt-4">
                  <div>
                    <div className="text-4xl font-black">{data.overallProgress}%</div>
                    <div className="text-blue-200 text-xs">Progression</div>
                  </div>
                  <div className="h-10 w-px bg-white/30" />
                  <div>
                    <div className="text-2xl font-bold">Jour {data.currentDay}</div>
                    <div className="text-blue-200 text-xs">sur {data.maxDays}</div>
                  </div>
                  {avgScore > 0 && (
                    <>
                      <div className="h-10 w-px bg-white/30" />
                      <div>
                        <div className="text-2xl font-bold">{avgScore}%</div>
                        <div className="text-blue-200 text-xs">Score moyen</div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:min-w-[190px]">
              {isNewStudent ? (
                <Link href="/diagnostic">
                  <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold text-base py-3 px-6 rounded-xl shadow-md">
                    🎯 Commencer ici
                  </Button>
                </Link>
              ) : (
                <Link href="/course">
                  <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold text-base py-3 px-6 rounded-xl shadow-md">
                    🗺️ Mon parcours
                  </Button>
                </Link>
              )}
              <Link href="/lessons">
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm border border-white/30">
                  📖 Voir les leçons
                </button>
              </Link>
            </div>
          </div>

          {!isNewStudent && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-blue-200 mb-1.5">
                <span>Barre de progression globale</span>
                <span>{data.overallProgress}%</span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${data.overallProgress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── NOUVEL ÉTUDIANT : Par où commencer ── */}
      {isNewStudent && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-5">🚀 Par où commencer — 3 étapes simples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '1', icon: '🎯', title: 'Test diagnostique', desc: 'Évalue ton niveau actuel en 15 min', href: '/diagnostic', cta: 'Commencer le test' },
              { step: '2', icon: '🗺️', title: 'Parcours 20 jours', desc: 'Suis le plan structuré jour par jour', href: '/course', cta: 'Voir le parcours' },
              { step: '3', icon: '📖', title: 'Première leçon', desc: 'Plonge dans la leçon 1 — Foundations', href: '/lessons', cta: 'Voir les leçons' },
            ].map((s) => (
              <Link key={s.step} href={s.href} className="group bg-white rounded-xl p-5 border border-indigo-100 hover:border-indigo-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-black">{s.step}</span>
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <p className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{s.title}</p>
                <p className="text-sm text-slate-500 mt-1 mb-3">{s.desc}</p>
                <span className="text-xs text-indigo-600 font-semibold group-hover:underline">{s.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTINUER L'APPRENTISSAGE ── */}
      {data.continueLearning && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">▶️</div>
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Continuer là où tu t'es arrêté</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{data.continueLearning.title}</p>
              <p className="text-sm text-slate-500">{data.continueLearning.moduleTitle}</p>
            </div>
          </div>
          <Link href={`/${data.continueLearning.type}s/${data.continueLearning.lessonId || data.continueLearning.moduleId}`}>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl">
              Continuer →
            </Button>
          </Link>
        </div>
      )}

      {/* ── AUJOURD'HUI : objectif du jour, révisions, série ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 bg-white border-2 border-blue-100 shadow-sm flex flex-col">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">🎯 Objectif du jour</p>
          <p className="text-2xl font-black text-slate-900">Jour {data.currentDay} / {data.maxDays}</p>
          <p className="text-sm text-slate-500 mt-1 flex-1">
            {data.todayAttempts > 0
              ? `${data.todayAttempts} QCM travaillé${data.todayAttempts > 1 ? 's' : ''} aujourd'hui`
              : 'Aucune activité aujourd\u2019hui — 15 minutes suffisent !'}
          </p>
          <Link href="/course" className="inline-block mt-3 text-sm font-semibold text-blue-600 hover:underline">
            Continuer le parcours →
          </Link>
        </div>

        <div className="rounded-2xl p-5 bg-white border-2 border-orange-100 shadow-sm flex flex-col">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-2">🔄 Révisions SRS</p>
          {data.reviewCount > 0 ? (
            <>
              <p className="text-2xl font-black text-slate-900">{data.reviewCount} à réviser</p>
              <p className="text-sm text-slate-500 mt-1 flex-1">Mémorisation à long terme — ne les laisse pas s&apos;accumuler.</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-black text-slate-900">Rien à réviser 🎉</p>
              <p className="text-sm text-slate-500 mt-1 flex-1">Ta mémoire est à jour. Reviens après tes prochaines leçons.</p>
            </>
          )}
          <Link href="/review" className="inline-block mt-3 text-sm font-semibold text-orange-600 hover:underline">
            Ouvrir les révisions →
          </Link>
        </div>

        <div className="rounded-2xl p-5 bg-white border-2 border-indigo-100 shadow-sm">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-3">
            🔥 Série : {data.streak} jour{data.streak > 1 ? 's' : ''}
          </p>
          <div className="flex items-end justify-between gap-1.5 h-16">
            {(data.weekActivity || []).map((d) => (
              <div key={d.date} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                <div
                  className="w-full rounded-t-md bg-indigo-500"
                  style={{ height: `${Math.max(10, Math.min(100, d.count * 30))}%`, opacity: d.count > 0 ? 1 : 0.2 }}
                  title={`${d.count} activité(s)`}
                />
                <span className="text-[10px] text-slate-400">{d.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Activité des 7 derniers jours</p>
        </div>
      </div>

      {/* ── PROGRESSION PAR DOMAINE ── */}
      {data.domainProgress.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900">📈 Maîtrise par domaine</h2>
            <Link href="/progress" className="text-sm text-blue-600 hover:underline font-medium">Voir tout →</Link>
          </div>
          <div className="space-y-4">
            {data.domainProgress.map((domain: DomainProgress) => (
              <ProgressBar
                key={domain.domain}
                value={domain.progress}
                label={domain.domain.charAt(0).toUpperCase() + domain.domain.slice(1).replace(/_/g, ' ')}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}

      {/* ── ROADMAP 8 NIVEAUX ── */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">🗺️ Roadmap — 8 niveaux du programme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROGRAM_LEVELS.map((lvl) => {
            const isCurrent = lvl.level === data.currentLevel;
            const isDone = data.currentLevel > lvl.level;
            return (
              <Link
                key={lvl.level}
                href="/lessons"
                className={`block rounded-2xl p-4 border-2 transition-all hover:shadow-md ${
                  isCurrent ? 'border-blue-500 bg-blue-50 shadow-sm' : isDone ? 'border-green-200 bg-green-50' : 'border-transparent bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${lvl.color}`}>{lvl.cefr}</span>
                  {isCurrent && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">En cours</span>}
                  {isDone && <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-medium">✓ Terminé</span>}
                </div>
                <p className="text-xs text-slate-400 font-medium">Niv. {lvl.level} — Leçons {lvl.lessons}</p>
                <p className="text-sm font-bold text-slate-900 mt-1">{lvl.title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{lvl.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── RÉSULTATS + POINTS FAIBLES ── */}
      {(data.recentResults.length > 0 || data.weakAreas.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.recentResults.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">🕐 Résultats récents</h2>
              <div className="space-y-3">
                {data.recentResults.slice(0, 5).map((result: RecentResult) => (
                  <div key={result.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{result.assessmentTitle}</p>
                      <p className="text-xs text-slate-400">{new Date(result.completedAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{result.score}%</span>
                      <Badge variant={result.result === 'passed' ? 'success' : 'error'} size="sm">
                        {result.result === 'passed' ? '✓' : '✗'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/assessments" className="block mt-3 text-center text-sm text-blue-600 hover:underline font-medium">
                Voir tous les résultats →
              </Link>
            </div>
          )}

          {data.weakAreas.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">⚡ Points à renforcer</h2>
              <div className="space-y-2">
                {data.weakAreas.slice(0, 5).map((area) => (
                  <Link
                    key={area.skillId}
                    href={`/review?skill=${area.skillId}`}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-orange-50 transition-colors group"
                  >
                    <span className="text-sm text-slate-700 group-hover:text-orange-800">{String((area as unknown as Record<string, unknown>).skillName ?? area.skillId)}</span>
                    <span className="text-sm font-bold text-orange-600">{area.masteryScore}%</span>
                  </Link>
                ))}
              </div>
              <Link href="/review" className="block mt-3 text-center text-sm text-orange-600 hover:underline font-medium">
                Lancer les révisions →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── EXAMEN FINAL (si éligible) ── */}
      {data.overallProgress >= 70 && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏆</div>
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Félicitations !</p>
              <p className="text-lg font-bold text-slate-900">Tu es prêt pour l'examen final</p>
              <p className="text-sm text-slate-500 mt-0.5">Valide ton parcours et obtiens ton certificat Summit English</p>
            </div>
          </div>
          <Link href="/final-assessment">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-md whitespace-nowrap">
              Passer l'examen →
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}
