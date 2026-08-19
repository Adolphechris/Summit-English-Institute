// ============================================================================
// Parcours de 20 jours — mapping jour → niveau + titres
// Utilisé par /api/course/path et testé en unitaire.
// ============================================================================

export const MAX_DAYS = 20;

/**
 * Mapping explicite des 20 jours vers les 8 niveaux du programme.
 * Répartition : 2, 3, 2, 2, 2, 3, 3, 3 = 20 jours (alignée sur les 8 niveaux seedés).
 */
export const DAY_TO_LEVEL: number[] = [
  1, 1, // Niveau 1 — English Sentence Foundations (Diagnostic, Fondamentaux)
  2, 2, 2, // Niveau 2 — Functional Verb System (Present, Past, Future & Modals)
  3, 3, // Niveau 3 — Functional Grammar (Perfect & Consolidation, Grammar Core)
  4, 4, // Niveau 4 — Active Conversation (Questions & Conversation, Active Conversation)
  5, 5, // Niveau 5 — Everyday & Professional English
  6, 6, 6, // Niveau 6 — IT English (Foundations, Systems & Networking, Data/Cloud/Dev)
  7, 7, 7, // Niveau 7 — Cybersecurity English
  8, 8, 8, // Niveau 8 — University & Professional Integration
];

const DAY_TITLES: string[] = [
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

export function getDayTitle(day: number): string {
  return DAY_TITLES[day - 1] || `Jour ${day}`;
}

export function getLevelForDay(day: number): number {
  return DAY_TO_LEVEL[day - 1] ?? 1;
}