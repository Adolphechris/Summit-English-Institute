'use client';

import Link from 'next/link';
import { useApi } from '@/lib/useApi';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageSkeleton } from '@/components/ui/Skeleton';
import type { CoursePathDay } from '@/types';

export default function CoursePage() {
  const { data, error, isLoading } = useApi<{ days: CoursePathDay[] }>('/api/course/path');
  const days = data?.days || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageSkeleton cards={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  const dayNames = [
    'Diagnostic',
    'Fondamentaux',
    'Present System',
    'Past System',
    'Future & Modals',
    'Perfect & Consolidation',
    'Grammar Core',
    'Questions & Conversation',
    'Active Conversation',
    'Everyday & Professional',
    'Idioms & Phrases',
    'IT Foundations',
    'Systems & Networking',
    'Data, Cloud & Development',
    'Cybersecurity Foundations',
    'Security Operations',
    'Security Technologies',
    'Academic English',
    'Professional IT Communication',
    'Master Review & Final Assessment',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mon Parcours</h1>
        <p className="text-slate-600 mt-1">Votre progression sur les 20 jours de formation</p>
      </div>

      {/* Progression globale */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Progression du programme</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {Math.round((days.filter((d) => d.status === 'completed').length / 20) * 100)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">
              {days.filter((d) => d.status === 'completed').length} / 20 jours complétés
            </p>
          </div>
        </div>
        <ProgressBar
          value={(days.filter((d) => d.status === 'completed').length / 20) * 100}
          size="lg"
          showLabel={false}
        />
      </Card>

      {/* Timeline des jours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {days.map((day, index) => {
          const statusConfig = {
            completed: {
              badge: 'Terminé',
              variant: 'success' as const,
              icon: '✓',
              iconColor: 'text-green-600',
              borderColor: 'border-green-200',
              bgColor: 'bg-green-50',
            },
            current: {
              badge: 'En cours',
              variant: 'info' as const,
              icon: '→',
              iconColor: 'text-blue-600',
              borderColor: 'border-blue-200',
              bgColor: 'bg-blue-50',
            },
            available: {
              badge: 'Disponible',
              variant: 'default' as const,
              icon: '○',
              iconColor: 'text-slate-400',
              borderColor: 'border-slate-200',
              bgColor: 'bg-white',
            },
            locked: {
              badge: 'Verrouillé',
              variant: 'warning' as const,
              icon: '🔒',
              iconColor: 'text-slate-400',
              borderColor: 'border-slate-200',
              bgColor: 'bg-slate-50',
            },
          };

          const premiumLocked = day.premiumRequired && day.status !== 'completed' && day.status !== 'locked';
          const config = premiumLocked
            ? { badge: 'Premium', variant: 'warning' as const, icon: '🔒', iconColor: 'text-amber-500', borderColor: 'border-amber-200', bgColor: 'bg-amber-50' }
            : statusConfig[day.status];

          return (
            <Card
              key={day.dayNumber}
              className={`p-4 ${config.borderColor} ${config.bgColor} ${
                day.status !== 'locked' ? 'hover:shadow-md transition-shadow cursor-pointer' : 'opacity-75'
              }`}
              onClick={() => {
                if (premiumLocked) {
                  window.location.href = '/tarifs';
                } else if (day.status !== 'locked') {
                  window.location.href = `/lessons?day=${day.dayNumber}`;
                }
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${config.iconColor}`}>{config.icon}</span>
                  <span className="text-sm font-medium text-slate-900">
                    Jour {day.dayNumber}
                  </span>
                </div>
                <Badge variant={config.variant} size="sm">
                  {config.badge}
                </Badge>
              </div>

              <h3 className="font-medium text-slate-900 text-sm mb-2 line-clamp-2">
                {day.title || dayNames[day.dayNumber - 1] || `Jour ${day.dayNumber}`}
              </h3>

              {day.score !== undefined && (
                <div className="mt-3">
                  <ProgressBar value={day.score} size="sm" showLabel={true} />
                </div>
              )}

              {premiumLocked && (
                <p className="text-xs text-amber-700 mt-2 font-medium">
                  Débloquez avec Premium →
                </p>
              )}

              {day.status === 'locked' && (
                <p className="text-xs text-slate-500 mt-2">
                  Complétez le jour précédent pour débloquer
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
