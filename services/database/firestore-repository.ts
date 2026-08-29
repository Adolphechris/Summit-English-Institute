// ============================================================================
// Data Repository Cloud Firestore
// Summit English Institute — Abstraction Complète & Typage Strict
// ============================================================================

import { getFirestore } from './firebase-admin';
import type { Query, DocumentData } from 'firebase-admin/firestore';
import {
  COLLECTIONS,
  type UserDoc,
  type SessionDoc,
  type LevelDoc,
  type ModuleDoc,
  type LessonDoc,
  type SkillDoc,
  type QuestionDoc,
  type AssessmentDoc,
  type AttemptDoc,
  type ProgressDoc,
  type SkillProgressDoc,
  type LevelProgressDoc,
  type LessonProgressDoc,
  type ReviewItemDoc,
  type CertificateDoc,
} from './firestore-schema';

export { getFirestore };
const db = () => getFirestore();


// ============================================================================
// 1. UTILISATEURS & SESSIONS
// ============================================================================

export async function getUserByEmail(email: string): Promise<UserDoc | null> {
  const snapshot = await db()
    .collection(COLLECTIONS.USERS)
    .where('email', '==', email.toLowerCase().trim())
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { ...doc.data(), id: Number(doc.data().id ?? doc.id) } as UserDoc;
}

export async function getUserById(id: number): Promise<UserDoc | null> {
  const doc = await db().collection(COLLECTIONS.USERS).doc(String(id)).get();
  if (!doc.exists) return null;
  return { ...doc.data(), id: Number(doc.data()?.id ?? doc.id) } as UserDoc;
}

export async function createUser(data: Omit<UserDoc, 'id'> & { id?: number }): Promise<UserDoc> {
  const now = new Date().toISOString();
  let userId = data.id;

  if (!userId) {
    // Génération ID séquentiel basé sur le timestamp
    userId = Date.now();
  }

  const user: UserDoc = {
    ...data,
    id: userId,
    email: data.email.toLowerCase().trim(),
    role: data.role || 'student',
    status: data.status || 'active',
    createdAt: data.createdAt || now,
    updatedAt: now,
  };

  await db().collection(COLLECTIONS.USERS).doc(String(userId)).set(user);
  return user;
}

export async function updateUser(id: number, updates: Partial<UserDoc>): Promise<void> {
  const now = new Date().toISOString();
  await db()
    .collection(COLLECTIONS.USERS)
    .doc(String(id))
    .set({ ...updates, updatedAt: now }, { merge: true });
}

export async function listUsers(): Promise<UserDoc[]> {
  const snapshot = await db().collection(COLLECTIONS.USERS).get();
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: Number(doc.data().id ?? doc.id),
  })) as UserDoc[];
}

export async function createSession(token: string, userId: number, expiresAt: Date): Promise<void> {
  const now = new Date().toISOString();
  const session: SessionDoc = {
    token,
    userId,
    expiresAt: expiresAt.toISOString(),
    createdAt: now,
  };
  await db().collection(COLLECTIONS.SESSIONS).doc(token).set(session);
}

export async function getSession(token: string): Promise<SessionDoc | null> {
  const doc = await db().collection(COLLECTIONS.SESSIONS).doc(token).get();
  if (!doc.exists) return null;
  return doc.data() as SessionDoc;
}

export async function deleteSession(token: string): Promise<void> {
  await db().collection(COLLECTIONS.SESSIONS).doc(token).delete();
}

export async function deleteUserSessions(userId: number): Promise<void> {
  const snapshot = await db()
    .collection(COLLECTIONS.SESSIONS)
    .where('userId', '==', userId)
    .get();

  const batch = db().batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
}

// ============================================================================
// 2. NIVEAUX, MODULES & LEÇONS
// ============================================================================

export async function listLevels(): Promise<LevelDoc[]> {
  const snapshot = await db().collection(COLLECTIONS.LEVELS).get();
  const levels = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: Number(doc.data().id ?? doc.id),
  })) as LevelDoc[];
  return levels.sort((a, b) => a.orderIndex - b.orderIndex);
}

export async function getLevelById(id: number): Promise<LevelDoc | null> {
  const doc = await db().collection(COLLECTIONS.LEVELS).doc(String(id)).get();
  if (!doc.exists) return null;
  return { ...doc.data(), id: Number(doc.data()?.id ?? doc.id) } as LevelDoc;
}

export async function getLevelByNumber(num: number): Promise<LevelDoc | null> {
  const snapshot = await db()
    .collection(COLLECTIONS.LEVELS)
    .where('number', '==', num)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { ...doc.data(), id: Number(doc.data().id ?? doc.id) } as LevelDoc;
}

export async function listModules(levelId?: number): Promise<ModuleDoc[]> {
  let queryRef: Query<DocumentData> = db().collection(COLLECTIONS.MODULES);
  if (levelId !== undefined) {
    queryRef = queryRef.where('levelId', '==', levelId);
  }
  const snapshot = await queryRef.get();
  const modules = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: Number(doc.data().id ?? doc.id),
  })) as ModuleDoc[];
  return modules.sort((a, b) => a.orderIndex - b.orderIndex);
}

export async function getModuleById(id: number): Promise<ModuleDoc | null> {
  const doc = await db().collection(COLLECTIONS.MODULES).doc(String(id)).get();
  if (!doc.exists) return null;
  return { ...doc.data(), id: Number(doc.data()?.id ?? doc.id) } as ModuleDoc;
}

export async function listLessons(moduleId?: number, levelId?: number): Promise<LessonDoc[]> {
  let queryRef: Query<DocumentData> = db().collection(COLLECTIONS.LESSONS);
  if (moduleId !== undefined) {
    queryRef = queryRef.where('moduleId', '==', moduleId);
  }
  if (levelId !== undefined) {
    queryRef = queryRef.where('levelId', '==', levelId);
  }
  const snapshot = await queryRef.get();
  const lessons = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: Number(doc.data().id ?? doc.id),
  })) as LessonDoc[];
  return lessons.sort((a, b) => a.orderIndex - b.orderIndex);
}

export async function getLessonById(id: number): Promise<LessonDoc | null> {
  const doc = await db().collection(COLLECTIONS.LESSONS).doc(String(id)).get();
  if (!doc.exists) return null;
  return { ...doc.data(), id: Number(doc.data()?.id ?? doc.id) } as LessonDoc;
}

export async function createLesson(data: Omit<LessonDoc, 'id'> & { id?: number }): Promise<LessonDoc> {
  const now = new Date().toISOString();
  const lessonId = data.id || Date.now();
  const lesson: LessonDoc = {
    ...data,
    id: lessonId,
    status: data.status || 'active',
    version: data.version || 1,
    createdAt: now,
    updatedAt: now,
  };
  await db().collection(COLLECTIONS.LESSONS).doc(String(lessonId)).set(lesson);
  return lesson;
}

// ============================================================================
// 3. COMPÉTENCES (SKILLS)
// ============================================================================

export async function listSkills(domain?: string): Promise<SkillDoc[]> {
  let queryRef: Query<DocumentData> = db().collection(COLLECTIONS.SKILLS);
  if (domain) {
    queryRef = queryRef.where('domain', '==', domain);
  }
  const snapshot = await queryRef.get();
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: Number(doc.data().id ?? doc.id),
  })) as SkillDoc[];
}

export async function getSkillById(id: number): Promise<SkillDoc | null> {
  const doc = await db().collection(COLLECTIONS.SKILLS).doc(String(id)).get();
  if (!doc.exists) return null;
  return { ...doc.data(), id: Number(doc.data()?.id ?? doc.id) } as SkillDoc;
}

export async function getSkillByCode(code: string): Promise<SkillDoc | null> {
  const snapshot = await db()
    .collection(COLLECTIONS.SKILLS)
    .where('code', '==', code)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { ...doc.data(), id: Number(doc.data().id ?? doc.id) } as SkillDoc;
}

// ============================================================================
// 4. QUESTIONS
// ============================================================================

export async function listQuestions(filters?: {
  skillId?: number;
  lessonId?: number;
  type?: string;
  limit?: number;
}): Promise<QuestionDoc[]> {
  let queryRef: Query<DocumentData> = db().collection(COLLECTIONS.QUESTIONS);

  if (filters?.skillId !== undefined) {
    queryRef = queryRef.where('skillId', '==', filters.skillId);
  }
  if (filters?.lessonId !== undefined) {
    queryRef = queryRef.where('lessonId', '==', filters.lessonId);
  }
  if (filters?.type !== undefined) {
    queryRef = queryRef.where('type', '==', filters.type);
  }
  if (filters?.limit) {
    queryRef = queryRef.limit(filters.limit);
  }

  const snapshot = await queryRef.get();
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: Number(doc.data().id ?? doc.id),
  })) as QuestionDoc[];
}

export async function getQuestionById(id: number): Promise<QuestionDoc | null> {
  const doc = await db().collection(COLLECTIONS.QUESTIONS).doc(String(id)).get();
  if (!doc.exists) return null;
  return { ...doc.data(), id: Number(doc.data()?.id ?? doc.id) } as QuestionDoc;
}

export async function getQuestionsByIds(ids: number[]): Promise<QuestionDoc[]> {
  if (ids.length === 0) return [];
  // In Firestore, batch fetch by document references
  const refs = ids.map((id) => db().collection(COLLECTIONS.QUESTIONS).doc(String(id)));
  const docs = await db().getAll(...refs);
  return docs
    .filter((doc) => doc.exists)
    .map((doc) => ({ ...doc.data(), id: Number(doc.data()?.id ?? doc.id) })) as QuestionDoc[];
}

export async function createQuestion(data: Omit<QuestionDoc, 'id'> & { id?: number }): Promise<QuestionDoc> {
  const now = new Date().toISOString();
  const qId = data.id || Date.now();
  const question: QuestionDoc = {
    ...data,
    id: qId,
    isActive: data.isActive !== false,
    version: data.version || 1,
    createdAt: now,
    updatedAt: now,
  };
  await db().collection(COLLECTIONS.QUESTIONS).doc(String(qId)).set(question);
  return question;
}

export async function countQuestions(): Promise<number> {
  const snapshot = await db()
    .collection(COLLECTIONS.QUESTIONS)
    .where('isActive', '==', true)
    .count()
    .get();
  return snapshot.data().count;
}

// ============================================================================
// 5. ÉVALUATIONS & TENTATIVES
// ============================================================================

export async function getAssessmentById(id: number): Promise<AssessmentDoc | null> {
  const doc = await db().collection(COLLECTIONS.ASSESSMENTS).doc(String(id)).get();
  if (!doc.exists) return null;
  return { ...doc.data(), id: Number(doc.data()?.id ?? doc.id) } as AssessmentDoc;
}

export async function listAssessments(): Promise<AssessmentDoc[]> {
  const snapshot = await db().collection(COLLECTIONS.ASSESSMENTS).get();
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: Number(doc.data().id ?? doc.id),
  })) as AssessmentDoc[];
}

export async function saveAttempt(attempt: Omit<AttemptDoc, 'id'> & { id?: string | number }): Promise<AttemptDoc> {
  const now = new Date().toISOString();
  const attemptId = String(attempt.id || `att_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`);
  const record: AttemptDoc = {
    ...attempt,
    id: attemptId,
    createdAt: now,
  };
  await db().collection(COLLECTIONS.ATTEMPTS).doc(attemptId).set(record);
  return record;
}

export async function getUserAttempts(userId: number, assessmentId?: number): Promise<AttemptDoc[]> {
  let queryRef: Query<DocumentData> = db()
    .collection(COLLECTIONS.ATTEMPTS)
    .where('userId', '==', userId);

  if (assessmentId !== undefined) {
    queryRef = queryRef.where('assessmentId', '==', assessmentId);
  }

  const snapshot = await queryRef.get();
  const attempts = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as AttemptDoc[];
  return attempts.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function countTotalAttempts(): Promise<number> {
  const snapshot = await db().collection(COLLECTIONS.ATTEMPTS).count().get();
  return snapshot.data().count;
}

// ============================================================================
// 6. PROGRESSION, MAÎTRISE & RÉVISION
// ============================================================================

export async function getUserProgress(userId: number): Promise<ProgressDoc | null> {
  const doc = await db().collection(COLLECTIONS.PROGRESS).doc(String(userId)).get();
  if (!doc.exists) return null;
  return doc.data() as ProgressDoc;
}

export async function initOrUpdateProgress(userId: number, updates: Partial<ProgressDoc>): Promise<void> {
  const now = new Date().toISOString();
  const docRef = db().collection(COLLECTIONS.PROGRESS).doc(String(userId));
  const existing = await docRef.get();

  if (existing.exists) {
    await docRef.set({ ...updates, updatedAt: now }, { merge: true });
  } else {
    const initial: ProgressDoc = {
      userId,
      currentLevel: 1,
      currentDay: 1,
      overallProgress: 0,
      isCompleted: false,
      updatedAt: now,
      ...updates,
    };
    await docRef.set(initial);
  }
}

export async function getUserSkillProgress(userId: number): Promise<SkillProgressDoc[]> {
  const snapshot = await db()
    .collection(COLLECTIONS.SKILL_PROGRESS)
    .where('userId', '==', userId)
    .get();
  return snapshot.docs.map((doc) => doc.data() as SkillProgressDoc);
}

export async function getSkillProgress(userId: number, skillId: number): Promise<SkillProgressDoc | null> {
  const doc = await db()
    .collection(COLLECTIONS.SKILL_PROGRESS)
    .doc(`${userId}_${skillId}`)
    .get();
  if (!doc.exists) return null;
  return doc.data() as SkillProgressDoc;
}

export async function upsertSkillProgress(
  userId: number,
  skillId: number,
  data: Partial<SkillProgressDoc>
): Promise<void> {
  const now = new Date().toISOString();
  await db()
    .collection(COLLECTIONS.SKILL_PROGRESS)
    .doc(`${userId}_${skillId}`)
    .set({ userId, skillId, ...data, updatedAt: now }, { merge: true });
}

export async function getUserLevelProgress(userId: number): Promise<LevelProgressDoc[]> {
  const snapshot = await db()
    .collection(COLLECTIONS.LEVEL_PROGRESS)
    .where('userId', '==', userId)
    .get();
  return snapshot.docs.map((doc) => doc.data() as LevelProgressDoc);
}

export async function getLevelProgress(userId: number, levelId: number): Promise<LevelProgressDoc | null> {
  const doc = await db()
    .collection(COLLECTIONS.LEVEL_PROGRESS)
    .doc(`${userId}_${levelId}`)
    .get();
  if (!doc.exists) return null;
  return doc.data() as LevelProgressDoc;
}

export async function upsertLevelProgress(
  userId: number,
  levelId: number,
  data: Partial<LevelProgressDoc>
): Promise<void> {
  const now = new Date().toISOString();
  await db()
    .collection(COLLECTIONS.LEVEL_PROGRESS)
    .doc(`${userId}_${levelId}`)
    .set({ userId, levelId, ...data, updatedAt: now }, { merge: true });
}

export async function getUserLessonProgress(userId: number): Promise<LessonProgressDoc[]> {
  const snapshot = await db()
    .collection(COLLECTIONS.LESSON_PROGRESS)
    .where('userId', '==', userId)
    .get();
  return snapshot.docs.map((doc) => doc.data() as LessonProgressDoc);
}

export async function upsertLessonProgress(
  userId: number,
  lessonId: number,
  data: Partial<LessonProgressDoc>
): Promise<void> {
  const now = new Date().toISOString();
  await db()
    .collection(COLLECTIONS.LESSON_PROGRESS)
    .doc(`${userId}_${lessonId}`)
    .set({ userId, lessonId, ...data, updatedAt: now }, { merge: true });
}

export async function getUserReviewItems(userId: number): Promise<ReviewItemDoc[]> {
  const snapshot = await db()
    .collection(COLLECTIONS.REVIEW_ITEMS)
    .where('userId', '==', userId)
    .get();
  return snapshot.docs.map((doc) => doc.data() as ReviewItemDoc);
}

export async function upsertReviewItem(
  userId: number,
  skillId: number,
  data: Partial<ReviewItemDoc>
): Promise<void> {
  const now = new Date().toISOString();
  await db()
    .collection(COLLECTIONS.REVIEW_ITEMS)
    .doc(`${userId}_${skillId}`)
    .set({ userId, skillId, ...data, updatedAt: now }, { merge: true });
}

export async function markReviewItemMastered(userId: number, skillId: number): Promise<void> {
  const now = new Date().toISOString();
  await db()
    .collection(COLLECTIONS.REVIEW_ITEMS)
    .doc(`${userId}_${skillId}`)
    .set(
      {
        status: 'mastered',
        completedAt: now,
        updatedAt: now,
      },
      { merge: true }
    );
}

// ============================================================================
// 7. CERTIFICATS
// ============================================================================

export async function getCertificateByCode(code: string): Promise<CertificateDoc | null> {
  const snapshot = await db()
    .collection(COLLECTIONS.CERTIFICATES)
    .where('certificateCode', '==', code)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as CertificateDoc;
}

export async function getUserCertificate(userId: number): Promise<CertificateDoc | null> {
  const snapshot = await db()
    .collection(COLLECTIONS.CERTIFICATES)
    .where('userId', '==', userId)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as CertificateDoc;
}

export async function createCertificate(cert: CertificateDoc): Promise<CertificateDoc> {
  await db().collection(COLLECTIONS.CERTIFICATES).doc(cert.certificateCode).set(cert);
  return cert;
}

export async function countCertificates(): Promise<number> {
  const snapshot = await db().collection(COLLECTIONS.CERTIFICATES).count().get();
  return snapshot.data().count;
}

// ============================================================================
// 8. STATS ADMINISTRATEUR
// ============================================================================

export async function getAdminStats(): Promise<{
  totalUsers: number;
  activeLessons: number;
  activeQuestions: number;
  totalAttempts: number;
  certificatesIssued: number;
}> {
  const [usersSnap, lessonsSnap, questionsSnap, attemptsSnap, certsSnap] = await Promise.all([
    db().collection(COLLECTIONS.USERS).count().get(),
    db().collection(COLLECTIONS.LESSONS).where('status', '==', 'active').count().get(),
    db().collection(COLLECTIONS.QUESTIONS).where('isActive', '==', true).count().get(),
    db().collection(COLLECTIONS.ATTEMPTS).count().get(),
    db().collection(COLLECTIONS.CERTIFICATES).count().get(),
  ]);

  return {
    totalUsers: usersSnap.data().count,
    activeLessons: lessonsSnap.data().count,
    activeQuestions: questionsSnap.data().count,
    totalAttempts: attemptsSnap.data().count,
    certificatesIssued: certsSnap.data().count,
  };
}
