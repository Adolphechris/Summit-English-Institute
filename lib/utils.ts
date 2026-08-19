// ============================================================================
// Utilitaires généraux
// ============================================================================

/**
 * Formater un pourcentage avec 0 ou 1 décimale
 */
export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formater une date en français
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formater une date relative (il y a X jours)
 */
export function formatRelativeDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Aujourd'hui";
  if (days === 1) return 'Hier';
  if (days < 7) return `Il y a ${days} jours`;
  if (days < 30) return `Il y a ${Math.floor(days / 7)} semaines`;
  return formatDate(d);
}

/**
 * Générer un identifiant unique
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculer le pourcentage de progression
 */
export function calculatePercentage(earned: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((earned / total) * 100);
}

/**
 * Déterminer le statut d'un score
 */
export function getScoreStatus(score: number, threshold = 75): 'excellent' | 'strong' | 'passed' | 'remediation' | 'failed' {
  if (score >= 95) return 'excellent';
  if (score >= 85) return 'strong';
  if (score >= threshold) return 'passed';
  if (score >= 60) return 'remediation';
  return 'failed';
}

/**
 * Classe CSS pour le statut de score
 */
export function getScoreStatusColor(status: ReturnType<typeof getScoreStatus>): string {
  const colors = {
    excellent: 'text-green-600 bg-green-50',
    strong: 'text-blue-600 bg-blue-50',
    passed: 'text-blue-600 bg-blue-50',
    remediation: 'text-yellow-600 bg-yellow-50',
    failed: 'text-red-600 bg-red-50',
  };
  return colors[status];
}
