import { NextResponse } from 'next/server';
import { getRequestAdminUser } from '@/services/auth/api';
import { listLessons, listModules, listLevels, createLesson } from '@/services/database/firestore-repository';

export async function GET(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const [allLessons, allModules, allLevels] = await Promise.all([
      listLessons(),
      listModules(),
      listLevels(),
    ]);

    const moduleMap = new Map(allModules.map((m) => [m.id, m]));
    const levelMap = new Map(allLevels.map((l) => [l.id, l]));

    const lessons = allLessons.map((l) => {
      const parentMod = moduleMap.get(l.moduleId);
      const parentLevel = parentMod ? levelMap.get(parentMod.levelId) : undefined;
      return {
        id: l.id,
        module_id: l.moduleId,
        title: l.title,
        objective: l.objective,
        order_index: l.orderIndex,
        status: l.status,
        module_title: parentMod?.title || 'Module',
        level_id: parentLevel?.id || 1,
        level_title: parentLevel?.title || 'Level',
      };
    });

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('Error fetching admin lessons:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getRequestAdminUser(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { moduleId, levelId, title, objective, explanation, examples, vocabulary, expressions, itContext, practice, summary, orderIndex, status } = body;

    if (!moduleId || !title || !explanation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lesson = await createLesson({
      moduleId: Number(moduleId),
      levelId: Number(levelId || 1),
      title,
      objective: objective || '',
      explanation,
      examples: examples || [],
      vocabulary: vocabulary || [],
      expressions: expressions || [],
      itContext: itContext || '',
      practice: practice || [],
      summary: summary || '',
      orderIndex: orderIndex || 1,
      status: status || 'active',
      version: 1,
    });

    return NextResponse.json({ lesson }, { status: 201 });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
