import { NextResponse } from 'next/server';
import { getAssessmentById, getQuestionsByIds, listLevels, listModules, getUserById } from '@/services/database/firestore-repository';
import { getRequestUserId } from '@/services/auth/api';
import { FREE_LEVELS } from '@/lib/constants';
import { isPremiumUser } from '@/lib/entitlements';
import { PREMIUM_REQUIRED_MESSAGE } from '@/lib/pricing';

// GET /api/assessments/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await getRequestUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const assessmentId = parseInt(params.id, 10);
    if (isNaN(assessmentId) || assessmentId <= 0) {
      return NextResponse.json({ error: "Identifiant d'évaluation invalide" }, { status: 400 });
    }

    const assessment = await getAssessmentById(assessmentId);
    if (!assessment || assessment.status === 'archived') {
      return NextResponse.json({ error: 'Évaluation introuvable' }, { status: 404 });
    }

    const [allLevels, allModules] = await Promise.all([listLevels(), listModules()]);
    const level = allLevels.find((l) => l.id === assessment.levelId);
    const moduleItem = allModules.find((m) => m.id === assessment.moduleId);

    // Gating freemium : cumulatives ou niveau > FREE_LEVELS réservées Premium
    const user = await getUserById(userId);
    const levelNumber = level?.number ?? null;
    const isPremiumContent = assessment.isCumulative || (levelNumber !== null && levelNumber > FREE_LEVELS);
    if (isPremiumContent && !isPremiumUser(user)) {
      return NextResponse.json(
        { error: PREMIUM_REQUIRED_MESSAGE, code: 'PREMIUM_REQUIRED' },
        { status: 403 }
      );
    }

    // Récupérer les questions liées
    const questions = await getQuestionsByIds(assessment.questionIds || []);

    const formattedQuestions = questions.map((q) => ({
      id: q.id,
      type: q.type,
      questionText: q.questionText,
      context: q.context || null,
      difficulty: q.difficulty,
      skillId: q.skillId,
      options: q.options || [],
    }));

    return NextResponse.json({
      assessment: {
        id: assessment.id,
        title: assessment.title,
        assessment_type: assessment.assessmentType,
        passing_score: assessment.passingScore,
        level_title: level?.title || null,
        module_title: moduleItem?.title || null,
      },
      questions: formattedQuestions,
    });
  } catch (error) {
    console.error('[ASSESSMENT DETAILS ERROR]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
