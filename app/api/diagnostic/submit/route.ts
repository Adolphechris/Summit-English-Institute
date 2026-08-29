import { NextResponse } from 'next/server';
import { getQuestionsByIds, listSkills, initOrUpdateProgress } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';

// POST /api/diagnostic/submit
export async function POST(request: Request) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { answers } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Aucune réponse fournie' }, { status: 400 });
    }

    const questionIds = answers.map((a: any) => Number(a.questionId));
    const [questions, skills] = await Promise.all([
      getQuestionsByIds(questionIds),
      listSkills(),
    ]);

    const skillMap = new Map(skills.map((s) => [s.id, s]));
    const questionsMap = new Map(questions.map((q) => [q.id, q]));

    // Calculer le score par domaine
    const domainScores: Record<string, { correct: number; total: number }> = {};
    let totalCorrect = 0;
    let totalQuestions = 0;

    for (const answer of answers) {
      const q = questionsMap.get(Number(answer.questionId));
      if (!q) continue;

      const skill = skillMap.get(q.skillId);
      const domain = skill?.domain || 'grammar';

      if (!domainScores[domain]) {
        domainScores[domain] = { correct: 0, total: 0 };
      }

      domainScores[domain].total++;
      totalQuestions++;

      const isCorrect =
        q.correctAnswer !== undefined &&
        String(answer.givenAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();

      if (isCorrect) {
        domainScores[domain].correct++;
        totalCorrect++;
      }
    }

    const overallScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // Formater les résultats par domaine
    const domains = Object.entries(domainScores).map(([domain, scores]) => ({
      domain,
      score: scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0,
      level: getLevel(scores.total > 0 ? (scores.correct / scores.total) * 100 : 0),
    }));

    // Déterminer les forces et faiblesses
    const strengths = domains
      .filter((d) => d.score >= 70)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((d) => d.domain.replace('_', ' '));

    const weaknesses = domains
      .filter((d) => d.score < 70)
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map((d) => d.domain.replace('_', ' '));

    // Générer des recommandations
    const recommendations = generateRecommendations(domains, overallScore);

    // Mettre à jour la progression avec le score réel du diagnostic
    await initOrUpdateProgress(userId, { overallProgress: overallScore });

    return NextResponse.json({
      overallScore,
      domains,
      strengths,
      weaknesses,
      recommendations,
    });
  } catch (error) {
    console.error('[DIAGNOSTIC SUBMIT ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

function getLevel(score: number): string {
  if (score >= 80) return 'advanced';
  if (score >= 60) return 'intermediate';
  return 'beginner';
}

function generateRecommendations(domains: any[], overallScore: number): string[] {
  const recommendations: string[] = [];

  if (overallScore < 40) {
    recommendations.push('Start with Level 1: English Sentence Foundations');
    recommendations.push('Focus on basic sentence structure and common verbs');
  } else if (overallScore < 70) {
    recommendations.push('Review grammar fundamentals before proceeding');
    recommendations.push('Practice sentence building and conjugation');
  } else {
    recommendations.push('You have a good foundation. Proceed to specialized English');
  }

  // Recommandations par domaine
  domains.forEach((domain) => {
    if (domain.domain === 'grammar' && domain.score < 60) {
      recommendations.push('Strengthen grammar: articles, prepositions, verb tenses');
    }
    if (domain.domain === 'conversation' && domain.score < 60) {
      recommendations.push('Practice active conversation and sentence production');
    }
    if (domain.domain === 'it' && domain.score < 60) {
      recommendations.push('Study IT vocabulary and technical expressions');
    }
    if (domain.domain === 'cybersecurity' && domain.score < 60) {
      recommendations.push('Learn cybersecurity terminology and common phrases');
    }
  });

  return recommendations.slice(0, 5);
}