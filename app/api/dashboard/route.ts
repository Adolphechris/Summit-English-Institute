import { NextResponse } from 'next/server';
import { query, queryOne } from '@/services/database/client';
import { getRequestUserId } from '@/services/auth/api';
import type { DashboardData, DomainProgress, ContinueLearningCard, RecentResult } from '@/types';

// GET /api/dashboard
export async function GET(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Récupérer la progression globale
    const progress = await queryOne(
      `SELECT overall_progress, current_level, current_day, is_completed
       FROM progress
       WHERE user_id = $1`,
      [userId]
    );

    // Récupérer la progression par domaine depuis skill_progress
    const skillProgressData = await query(
      `SELECT s.domain, AVG(sp.mastery_score) as avg_mastery
       FROM skill_progress sp
       JOIN skills s ON sp.skill_id = s.id
       WHERE sp.user_id = $1
       GROUP BY s.domain`,
      [userId]
    );

    const domainMap = new Map(skillProgressData.map((d: any) => [d.domain, Math.round(d.avg_mastery || 0)]));

    const domainProgress: DomainProgress[] = [
      { domain: 'grammar', progress: domainMap.get('grammar') || 0 },
      { domain: 'conversation', progress: domainMap.get('conversation') || 0 },
      { domain: 'it', progress: domainMap.get('it') || 0 },
      { domain: 'cybersecurity', progress: domainMap.get('cybersecurity') || 0 },
      { domain: 'professional', progress: domainMap.get('professional') || 0 },
      { domain: 'academic', progress: domainMap.get('academic') || 0 },
    ];

    // Résultats récents
    const recentResults = await query<RecentResult>(
      `SELECT a.id, a.title as assessment_title, att.score, att.result, att.finished_at as completed_at
       FROM attempts att
       JOIN assessments a ON att.assessment_id = a.id
       WHERE att.user_id = $1 AND att.status = 'completed'
       ORDER BY att.finished_at DESC
       LIMIT 5`,
      [userId]
    );

    // Compétences faibles et fortes avec compteurs réels
    const weakAreas = await query(
      `SELECT sp.id as id, sp.user_id as user_id,
              s.id as skill_id, s.name as skill_name, sp.mastery_score, sp.created_at, sp.updated_at,
              COUNT(DISTINCT att.id) as attempt_count,
              COUNT(CASE WHEN aa.is_correct THEN 1 END) as correct_count
       FROM skill_progress sp
       JOIN skills s ON sp.skill_id = s.id
       LEFT JOIN attempts att ON att.user_id = sp.user_id
       LEFT JOIN attempt_answers aa ON aa.attempt_id = att.id
         AND aa.question_id IN (SELECT q.id FROM questions q WHERE q.skill_id = sp.skill_id)
       WHERE sp.user_id = $1 AND sp.mastery_score < 75 AND sp.mastery_score > 0
       GROUP BY sp.id, s.id, s.name, sp.mastery_score, sp.created_at, sp.updated_at
       ORDER BY sp.mastery_score ASC
       LIMIT 5`,
      [userId]
    );

    const strongAreas = await query(
      `SELECT sp.id as id, sp.user_id as user_id,
              s.id as skill_id, s.name as skill_name, sp.mastery_score, sp.created_at, sp.updated_at,
              COUNT(DISTINCT att.id) as attempt_count,
              COUNT(CASE WHEN aa.is_correct THEN 1 END) as correct_count
       FROM skill_progress sp
       JOIN skills s ON sp.skill_id = s.id
       LEFT JOIN attempts att ON att.user_id = sp.user_id
       LEFT JOIN attempt_answers aa ON aa.attempt_id = att.id
         AND aa.question_id IN (SELECT q.id FROM questions q WHERE q.skill_id = sp.skill_id)
       WHERE sp.user_id = $1 AND sp.mastery_score >= 85
       GROUP BY sp.id, s.id, s.name, sp.mastery_score, sp.created_at, sp.updated_at
       ORDER BY sp.mastery_score DESC
       LIMIT 5`,
      [userId]
    );

    // Révisions en attente
    const reviewCount = await queryOne<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM review_items
       WHERE user_id = $1 AND status IN ('due', 'in_review')`,
      [userId]
    );

    // Continuer l'apprentissage : trouver la prochaine leçon non complétée
    const continueLearning = await queryOne(
      `SELECT l.id as lesson_id, l.title as lesson_title, m.title as module_title,
              lp.is_completed, lp.best_score
       FROM lessons l
       JOIN modules m ON l.module_id = m.id
       LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = $1
       WHERE l.status = 'active'
       ORDER BY l.order_index ASC
       LIMIT 1`,
      [userId]
    );

    const continueLearningCard: ContinueLearningCard | null = continueLearning ? {
      type: 'lesson',
      title: continueLearning.lesson_title,
      moduleTitle: continueLearning.module_title,
      progress: continueLearning.best_score || 0,
      lessonId: continueLearning.lesson_id,
    } : null;

    // Titre du niveau actuel
    const currentLevelTitle = await queryOne<{ title: string }>(
      `SELECT title FROM levels WHERE id = $1`,
      [progress?.current_level || 1]
    );

    const dashboardData: DashboardData = {
      overallProgress: progress?.overall_progress || 0,
      currentDay: progress?.current_day || 1,
      maxDays: 20,
      currentLevel: progress?.current_level || 1,
      currentLevelTitle: currentLevelTitle?.title || 'Sentence Foundations',
      continueLearning: continueLearningCard,
      reviewCount: reviewCount?.count || 0,
      weakAreas: weakAreas.map((w: any) => ({
        id: w.id,
        userId: w.user_id,
        skillId: w.skill_id,
        skillName: w.skill_name,
        masteryScore: w.mastery_score,
        masteryStatus: 'practicing' as const,
        attemptCount: parseInt(w.attempt_count || '0', 10),
        correctCount: parseInt(w.correct_count || '0', 10),
        priority: 'high' as const,
        createdAt: new Date(w.created_at),
        updatedAt: new Date(w.updated_at),
      })),
      strongAreas: strongAreas.map((s: any) => ({
        id: s.id,
        userId: s.user_id,
        skillId: s.skill_id,
        skillName: s.skill_name,
        masteryScore: s.mastery_score,
        masteryStatus: 'stable' as const,
        attemptCount: parseInt(s.attempt_count || '0', 10),
        correctCount: parseInt(s.correct_count || '0', 10),
        priority: 'low' as const,
        createdAt: new Date(s.created_at),
        updatedAt: new Date(s.updated_at),
      })),
      recentResults: recentResults.map((r) => ({
        ...r,
        score: r.score || 0,
        result: (r.result as 'passed' | 'failed' | 'pending') || 'pending',
      })),
      domainProgress,
    };

    // Ajouter un champ pour indiquer si l'utilisateur peut passer l'évaluation finale
    const canTakeFinalAssessment = (progress?.overall_progress || 0) >= 70;

    return NextResponse.json({
      ...dashboardData,
      canTakeFinalAssessment,
    });
  } catch (error) {
    console.error('[DASHBOARD ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}