// ============================================================================
// Summit English Institute — Types TypeScript
// Version: 1.0
// Conforme au cahier des charges, tranches 3, 4, 5, 6
// ============================================================================

// ----------------------------------------------------------------------------
// UTILISATEURS
// ----------------------------------------------------------------------------

export type UserRole = 'student' | 'admin' | 'teacher';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  status: UserStatus;
  firstName?: string;
  lastName?: string;
  preferredLanguage: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface Session {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// ----------------------------------------------------------------------------
// FORMATIONS, NIVEAUX, MODULES, LEÇONS
// ----------------------------------------------------------------------------

export type ContentStatus = 'active' | 'archived' | 'draft';

export interface Course {
  id: number;
  title: string;
  description: string;
  status: ContentStatus;
  version: string;
  maxDays: number;
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Level {
  id: number;
  courseId: number;
  number: number;
  title: string;
  objective: string;
  description?: string;
  passingScore: number;
  orderIndex: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: number;
  levelId: number;
  title: string;
  objective: string;
  description?: string;
  orderIndex: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  objective: string;
  explanation: string;
  examples: LessonExample[];
  vocabulary: VocabularyItem[];
  expressions: ExpressionItem[];
  itContext?: string;
  practice: PracticeItem[];
  summary?: string;
  orderIndex: number;
  status: ContentStatus;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------------------------------------------------------------
// CONTENU PÉDAGOGIQUE
// ----------------------------------------------------------------------------

export interface LessonExample {
  sentence: string;
  meaning?: string;
  itContext?: string;
}

export interface VocabularyItem {
  word: string;
  pronunciation?: string;
  definition: string;
  translation?: string;
  example?: string;
  itExample?: string;
  category?: string;
  domain: string;
  level: 'A' | 'B' | 'C' | 'D';
}

export interface ExpressionItem {
  expression: string;
  meaning: string;
  context?: string;
  example: string;
  category?: string;
  classification: ExpressionClassification;
  difficulty: 'A' | 'B' | 'C' | 'D';
}

export type ExpressionClassification = 'general' | 'professional' | 'it' | 'cybersecurity' | 'academic';

export interface PracticeItem {
  type: PracticeType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  skillCode?: string;
}

export type PracticeType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'matching'
  | 'ordering'
  | 'transformation'
  | 'error_correction'
  | 'translation'
  | 'sentence_building'
  | 'scenario'
  | 'production';

// ----------------------------------------------------------------------------
// COMPÉTENCES
// ----------------------------------------------------------------------------

export type SkillDomain = 'grammar' | 'conjugation' | 'conversation' | 'it' | 'cybersecurity' | 'professional' | 'academic' | 'idioms';
export type SkillDifficulty = 'A' | 'B' | 'C' | 'D';
export type MasteryStatus = 'new' | 'learning' | 'practicing' | 'stable' | 'mastered' | 'review_required';
export type Priority = 'critical' | 'high' | 'normal' | 'low';

export interface Skill {
  id: number;
  code: string;
  name: string;
  description: string;
  domain: SkillDomain;
  category: string;
  difficulty: SkillDifficulty;
  isCritical: boolean;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------------------------------------------------------------
// QUESTIONS ET ÉVALUATIONS
// ----------------------------------------------------------------------------

export type AssessmentType =
  | 'micro_check'
  | 'lesson_quiz'
  | 'module_assessment'
  | 'level_assessment'
  | 'cumulative_review'
  | 'final_assessment';

export type AttemptStatus = 'in_progress' | 'completed' | 'abandoned';
export type AttemptResult = 'passed' | 'failed' | 'pending';

export interface Question {
  id: number;
  type: PracticeType;
  questionText: string;
  context?: string;
  difficulty: SkillDifficulty;
  skillId: number;
  lessonId?: number;
  explanation?: string;
  options?: string[];
  tags: string[];
  status: ContentStatus;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  isCorrect: boolean;
  orderIndex?: number;
}

export interface Assessment {
  id: number;
  title: string;
  assessmentType: AssessmentType;
  levelId?: number;
  moduleId?: number;
  lessonId?: number;
  passingScore: number;
  questionCount?: number;
  timeLimitMinutes?: number;
  distribution?: AssessmentDistribution;
  isCumulative: boolean;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssessmentDistribution {
  [skillCode: string]: number; // Pourcentage de questions par compétence
}

export interface AssessmentQuestion {
  id: number;
  assessmentId: number;
  questionId: number;
  orderIndex: number;
  weight: number;
}

export interface Attempt {
  id: number;
  userId: number;
  assessmentId: number;
  startedAt: Date;
  finishedAt?: Date;
  score?: number;
  status: AttemptStatus;
  result?: AttemptResult;
  createdAt: Date;
}

export interface AttemptAnswer {
  id: number;
  attemptId: number;
  questionId: number;
  givenAnswer: string;
  isCorrect?: boolean;
  skillId?: number;
  errorType?: ErrorType;
  pointsEarned: number;
}

export type ErrorType =
  | 'wrong_tense'
  | 'wrong_auxiliary'
  | 'wrong_vocabulary'
  | 'wrong_preposition'
  | 'wrong_word_order'
  | 'misunderstanding'
  | 'wrong_context';

// ----------------------------------------------------------------------------
// PROGRESSION ET MAÎTRISE
// ----------------------------------------------------------------------------

export interface Progress {
  id: number;
  userId: number;
  courseId: number;
  currentLevel: number;
  currentDay: number;
  overallProgress: number; // 0-100
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillProgress {
  id: number;
  userId: number;
  skillId: number;
  masteryScore: number; // 0-100
  masteryStatus: MasteryStatus;
  attemptCount: number;
  correctCount: number;
  lastAttemptAt?: Date;
  nextReviewAt?: Date;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

export interface LevelProgress {
  id: number;
  userId: number;
  levelId: number;
  isStarted: boolean;
  isCompleted: boolean;
  bestScore?: number;
  attemptCount: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleProgress {
  id: number;
  userId: number;
  moduleId: number;
  isStarted: boolean;
  isCompleted: boolean;
  bestScore?: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonProgress {
  id: number;
  userId: number;
  lessonId: number;
  isStarted: boolean;
  isCompleted: boolean;
  bestScore?: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------------------------------------------------------------
// RÉVISION
// ----------------------------------------------------------------------------

export interface ReviewItem {
  id: number;
  userId: number;
  skillId: number;
  errorType?: ErrorType;
  errorCount: number;
  lastErrorAt: Date;
  lastResult?: number;
  priority: Priority;
  status: 'due' | 'in_review' | 'mastered' | 'dismissed';
  scheduledFor?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------------------------------------------------------------
// CERTIFICATS ET ACHIEVEMENTS
// ----------------------------------------------------------------------------

export interface Certificate {
  id: number;
  userId: number;
  courseId: number;
  certificateCode: string;
  finalScore: number;
  status: 'issued' | 'revoked';
  issuedAt: Date;
  createdAt: Date;
}

export interface Achievement {
  id: number;
  code: string;
  name: string;
  description: string;
  icon?: string;
  criteria: AchievementCriteria;
  status: ContentStatus;
  createdAt: Date;
}

export interface AchievementCriteria {
  type: 'login' | 'lesson_complete' | 'assessment_complete' | 'level_pass' | 'streak' | 'perfect_score' | 'course_complete';
  count?: number;
  level?: number;
  days?: number;
}

export interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  earnedAt: Date;
}

// ----------------------------------------------------------------------------
// VERSIONNAGE
// ----------------------------------------------------------------------------

export interface ContentVersion {
  id: number;
  contentType: 'lesson' | 'question' | 'vocabulary' | 'expression';
  contentId: number;
  version: number;
  changeSummary: string;
  changedBy?: number;
  createdAt: Date;
}

// ----------------------------------------------------------------------------
// API RESPONSES
// ----------------------------------------------------------------------------

export interface DashboardData {
  overallProgress: number;
  currentDay: number;
  maxDays: number;
  currentLevel: number;
  currentLevelTitle: string;
  continueLearning: ContinueLearningCard | null;
  reviewCount: number;
  weakAreas: SkillProgress[];
  strongAreas: SkillProgress[];
  recentResults: RecentResult[];
  domainProgress: DomainProgress[];
}

export interface ContinueLearningCard {
  type: 'lesson' | 'assessment' | 'review';
  title: string;
  moduleTitle: string;
  progress: number;
  lessonId?: number;
  moduleId?: number;
}

export interface RecentResult {
  id: number;
  assessmentTitle: string;
  score: number;
  result: AttemptResult;
  completedAt: Date;
}

export interface DomainProgress {
  domain: SkillDomain;
  progress: number;
}

export interface CoursePathDay {
  dayNumber: number;
  title: string;
  status: 'completed' | 'current' | 'available' | 'locked';
  levelId?: number;
  score?: number;
}

// ----------------------------------------------------------------------------
// FORMULAIRE / INPUT
// ----------------------------------------------------------------------------

export interface AssessmentSubmission {
  attemptId: number;
  answers: {
    questionId: number;
    givenAnswer: string;
  }[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// ----------------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------------

export interface AppConfig {
  courseId: number;
  maxDays: number;
  passingScore: number;
  reviewIntervals: number[]; // Jours: [1, 3, 6, 10, 20]
  errorThresholds: {
    normal: number;
    high: number;
    critical: number;
  };
  masteryConfirmationAttempts: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  courseId: 1,
  maxDays: 20,
  passingScore: 75,
  reviewIntervals: [1, 3, 6, 10, 20],
  errorThresholds: {
    normal: 1,
    high: 2,
    critical: 3,
  },
  masteryConfirmationAttempts: 3,
};
