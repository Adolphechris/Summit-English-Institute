// ============================================================================
// Constantes de l'application
// ============================================================================

export const APP_CONFIG = {
  name: 'Summit English Institute',
  description: 'Formation intensive en anglais professionnel, informatique et cybersécurité',
  maxDays: 20,
  passingScore: 75,
  reviewIntervals: [1, 3, 6, 10, 20] as number[],
  finalAssessmentId: 999,
} as const;

export const MASTERY_STATUS = {
  NEW: 'new',
  LEARNING: 'learning',
  PRACTICING: 'practicing',
  STABLE: 'stable',
  MASTERED: 'mastered',
  REVIEW_REQUIRED: 'review_required',
} as const;

export const ATTEMPT_STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
} as const;

export const ATTEMPT_RESULT = {
  PASSED: 'passed',
  FAILED: 'failed',
  PENDING: 'pending',
} as const;

export const CONTENT_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DRAFT: 'draft',
} as const;

export const USER_ROLE = {
  STUDENT: 'student',
  ADMIN: 'admin',
  TEACHER: 'teacher',
} as const;

export const REVIEW_PRIORITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  NORMAL: 'normal',
  LOW: 'low',
} as const;

export const LEVEL_STATUS = {
  COMPLETED: 'completed',
  CURRENT: 'current',
  AVAILABLE: 'available',
  LOCKED: 'locked',
} as const;
