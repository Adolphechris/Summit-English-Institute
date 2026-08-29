// ============================================================================
// Types et Définition des Collections Google Cloud Firestore
// Summit English Institute — Mode NoSQL optimisé pour l'écosystème Google
// ============================================================================

export const COLLECTIONS = {
  USERS: 'users',
  SESSIONS: 'sessions',
  LEVELS: 'levels',
  MODULES: 'modules',
  LESSONS: 'lessons',
  SKILLS: 'skills',
  QUESTIONS: 'questions',
  ASSESSMENTS: 'assessments',
  ATTEMPTS: 'attempts',
  PROGRESS: 'user_progress',
  SKILL_PROGRESS: 'user_skill_progress',
  LEVEL_PROGRESS: 'user_level_progress',
  LESSON_PROGRESS: 'user_lesson_progress',
  REVIEW_ITEMS: 'user_review_items',
  CERTIFICATES: 'certificates',
} as const;

export type UserRole = 'student' | 'admin' | 'teacher';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface UserDoc {
  id: number;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  firstName?: string | null;
  lastName?: string | null;
  preferredLanguage?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string | null;
}

export interface SessionDoc {
  token: string;
  userId: number;
  expiresAt: string;
  createdAt: string;
}

export interface LevelDoc {
  id: number;
  number: number;
  title: string;
  objective?: string;
  description?: string;
  passingScore: number;
  orderIndex: number;
  status: 'active' | 'archived' | 'draft';
  cefrLevel?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ModuleDoc {
  id: number;
  levelId: number;
  title: string;
  objective?: string;
  description?: string;
  orderIndex: number;
  status: 'active' | 'archived' | 'draft';
  createdAt?: string;
  updatedAt?: string;
}

export interface LessonDoc {
  id: number;
  moduleId: number;
  levelId: number;
  title: string;
  objective: string;
  explanation: string;
  examples?: any[];
  vocabulary?: any[];
  expressions?: any[];
  itContext?: string;
  practice?: any[];
  summary?: string;
  orderIndex: number;
  status: 'active' | 'archived' | 'draft';
  version: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillDoc {
  id: number;
  code: string;
  name: string;
  description?: string;
  domain: string;
  category?: string;
  difficulty: 'A' | 'B' | 'C' | 'D';
  isCritical: boolean;
  status: 'active' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface QuestionDoc {
  id: number;
  type: string;
  questionText: string;
  context?: string | null;
  difficulty: 'A' | 'B' | 'C' | 'D';
  skillId: number;
  lessonId?: number | null;
  explanation?: string | null;
  options?: string[];
  correctAnswer?: string;
  tags?: string[];
  isActive: boolean;
  version: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssessmentDoc {
  id: number;
  title: string;
  assessmentType: string;
  levelId?: number | null;
  moduleId?: number | null;
  lessonId?: number | null;
  passingScore: number;
  questionCount?: number;
  questionIds: number[];
  isCumulative: boolean;
  status: 'active' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface AttemptAnswer {
  questionId: number;
  givenAnswer: string;
  isCorrect: boolean;
  skillId?: number;
  pointsEarned?: number;
}

export interface AttemptDoc {
  id: string | number;
  userId: number;
  assessmentId: number;
  startedAt: string;
  finishedAt?: string;
  score: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  result: 'passed' | 'failed' | 'pending';
  answers: AttemptAnswer[];
  createdAt?: string;
}

export interface ProgressDoc {
  userId: number;
  currentLevel: number;
  currentDay: number;
  overallProgress: number;
  isCompleted: boolean;
  completedAt?: string | null;
  updatedAt: string;
}

export interface SkillProgressDoc {
  userId: number;
  skillId: number;
  masteryScore: number;
  masteryStatus: 'new' | 'learning' | 'practicing' | 'stable' | 'mastered' | 'review_required';
  attemptCount: number;
  correctCount: number;
  priority: 'critical' | 'high' | 'normal' | 'low';
  lastAttemptAt?: string;
  nextReviewAt?: string;
  updatedAt: string;
}

export interface LevelProgressDoc {
  userId: number;
  levelId: number;
  isStarted: boolean;
  isCompleted: boolean;
  bestScore?: number | null;
  attemptCount: number;
  completedAt?: string | null;
  updatedAt: string;
}

export interface LessonProgressDoc {
  userId: number;
  lessonId: number;
  isStarted: boolean;
  isCompleted: boolean;
  bestScore?: number | null;
  completedAt?: string | null;
  updatedAt: string;
}

export interface ReviewItemDoc {
  userId: number;
  skillId: number;
  errorType?: string;
  errorCount: number;
  lastErrorAt: string;
  lastResult?: number;
  priority: 'critical' | 'high' | 'normal' | 'low';
  status: 'due' | 'in_review' | 'mastered' | 'dismissed';
  scheduledFor?: string;
  completedAt?: string | null;
  updatedAt: string;
}

export interface CertificateDoc {
  certificateCode: string;
  userId: number;
  userName: string;
  finalScore: number;
  completedAt: string;
  status: 'issued' | 'revoked';
}
