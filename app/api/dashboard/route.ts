import { NextResponse } from 'next/server';
import {
  getUserProgress,
  getUserSkillProgress,
  listSkills,
  getUserAttempts,
  getAssessmentById,
  getUserReviewItems,
  listLessons,
  listModules,
  getLevelById,
} from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';
import type { DashboardData, DomainProgress, ContinueLearningCard, RecentResult } from '@/types';

// GET /api/dashboard
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const [
      progress,
      userSkillProgress,
      skills,
      attempts,
      reviewItems,
      allLessons,
      allModules,
    ] = await Promise.all([
      getUserProgress(userId),
      getUserSkillProgress(userId),
      listSkills(),
      getUserAttempts(userId),
      getUserReviewItems(userId),
      listLessons(),
      listModules(),
    ]);

    const currentLevelNum = progress?.currentLevel || 1;
    const currentLevelDoc = await getLevelById(currentLevelNum);

    const skillMap = new Map(skills.map((s) => [s.id, s]));

    // Progression par domaine
    const domainTotals: Record<string, { totalScore: number; count: number }> = {};
    userSkillProgress.forEach((sp) => {
      const skill = skillMap.get(sp.skillId);
      const domain = skill?.domain || 'grammar';
      if (!domainTotals[domain]) domainTotals[domain] = { totalScore: 0, count: 0 };
      domainTotals[domain].totalScore += sp.masteryScore || 0;
      domainTotals[domain].count += 1;
    });

    const domainProgress: DomainProgress[] = (
      [
        'grammar',
        'conversation',
        'it',
        'cybersecurity',
        'professional',
        'academic',
      ] as const
    ).map((domain) => {
      const data = domainTotals[domain];
      const avg = data && data.count > 0 ? Math.round(data.totalScore / data.count) : 0;
      return { domain, progress: avg };
    });


    // Résultats récents
    const recentAttempts = attempts.slice(0, 5);
    const recentResults: RecentResult[] = await Promise.all(
      recentAttempts.map(async (att) => {
        const ass = await getAssessmentById(att.assessmentId);
        return {
          id: Number(att.id) || Date.now(),
          assessmentTitle: ass?.title || `Évaluation #${att.assessmentId}`,
          score: att.score || 0,
          result: (att.result as 'passed' | 'failed' | 'pending') || 'pending',
          completedAt: new Date(att.finishedAt || att.createdAt || Date.now()),
        };
      })
    );

    // Compétences faibles (< 75%)
    const weakAreas = userSkillProgress
      .filter((sp) => sp.masteryScore < 75 && sp.masteryScore > 0)
      .sort((a, b) => a.masteryScore - b.masteryScore)
      .slice(0, 5)
      .map((sp) => {
        const skill = skillMap.get(sp.skillId);
        return {
          id: sp.skillId,
          userId,
          skillId: sp.skillId,
          skillName: skill?.name || `Compétence ${sp.skillId}`,
          masteryScore: sp.masteryScore,
          masteryStatus: 'practicing' as const,
          attemptCount: sp.attemptCount || 0,
          correctCount: sp.correctCount || 0,
          priority: 'high' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

    // Compétences fortes (>= 85%)
    const strongAreas = userSkillProgress
      .filter((sp) => sp.masteryScore >= 85)
      .sort((a, b) => b.masteryScore - a.masteryScore)
      .slice(0, 5)
      .map((sp) => {
        const skill = skillMap.get(sp.skillId);
        return {
          id: sp.skillId,
          userId,
          skillId: sp.skillId,
          skillName: skill?.name || `Compétence ${sp.skillId}`,
          masteryScore: sp.masteryScore,
          masteryStatus: 'stable' as const,
          attemptCount: sp.attemptCount || 0,
          correctCount: sp.correctCount || 0,
          priority: 'low' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

    // Révisions en attente
    const dueReviews = reviewItems.filter((i) => i.status === 'due' || i.status === 'in_review');

    // Série (streak) + activité de la semaine — calculées depuis les tentatives réelles
    const dayKey = (d: Date) => d.toISOString().slice(0, 10);
    const activeDays = new Set(attempts.map((a) => dayKey(new Date(a.createdAt || Date.now()))));
    const todayKey = dayKey(new Date());
    let streak = 0;
    const cursor = new Date();
    if (!activeDays.has(dayKey(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);
    while (activeDays.has(dayKey(cursor))) {
      streak += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const weekActivity = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - (6 - i));
      return { date: dayKey(d), label: dayLabels[d.getUTCDay()], count: 0 };
    });
    attempts.forEach((a) => {
      const k = dayKey(new Date(a.createdAt || Date.now()));
      const slot = weekActivity.find((w) => w.date === k);
      if (slot) slot.count += 1;
    });
    const todayAttempts = weekActivity.find((w) => w.date === todayKey)?.count || 0;

    // Continuer l'apprentissage
    const moduleMap = new Map(allModules.map((m) => [m.id, m]));
    const firstLesson = allLessons[0];
    const continueLearningCard: ContinueLearningCard | null = firstLesson
      ? {
          type: 'lesson',
          title: firstLesson.title,
          moduleTitle: moduleMap.get(firstLesson.moduleId)?.title || 'Module',
          progress: 0,
          lessonId: firstLesson.id,
        }
      : null;

    const dashboardData: DashboardData = {
      overallProgress: progress?.overallProgress || 0,
      currentDay: progress?.currentDay || 1,
      maxDays: 20,
      currentLevel: currentLevelNum,
      currentLevelTitle: currentLevelDoc?.title || 'Sentence Foundations',
      continueLearning: continueLearningCard,
      reviewCount: dueReviews.length,
      weakAreas,
      strongAreas,
      recentResults,
      domainProgress,
      streak,
      weekActivity,
      todayAttempts,
    };

    const canTakeFinalAssessment = (progress?.overallProgress || 0) >= 70;

    return NextResponse.json({
      ...dashboardData,
      canTakeFinalAssessment,
    });
  } catch (error) {
    console.error('[DASHBOARD ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}