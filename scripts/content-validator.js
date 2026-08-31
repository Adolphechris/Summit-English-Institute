/*
 * ============================================================================
 * CONTENT VALIDATOR — Summit English Institute
 * Arbitre automatique des standards de contenu (REMEDIATION_PLAN.md).
 *
 * Usage : node scripts/content-validator.js [--json]
 *   --json : émet le rapport aussi dans content/inventory.json (métriques vivantes)
 *
 * Règles : les gates ci-dessous reflètent la Constitution v2.0 (Titre "Standards
 * de contenu & remédiation"). Un échec = code de sortie 1 = publication bloquée.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const SEED_PATH = path.join(__dirname, '..', 'database', 'firestore-seed-data.json');
const REPORT_PATH = path.join(__dirname, '..', 'content', 'inventory.json');

// ---------------------------------------------------------------------------
// Seuils (alignés sur REMEDIATION_PLAN.md / Constitution v2.0)
// ---------------------------------------------------------------------------
const STANDARDS = {
  lessonsPerLevel: 10,        // 8 niveaux x 10 leçons uniques = 80
  explanationMinChars: 1800,
  examplesMin: 6,
  vocabularyMin: 8,
  expressionsMin: 4,
  practiceMin: 4,
  patternsMin: 3,             // champs patterns[] dans la leçon
  quizMin: 4,                 // champs quiz[] dans la leçon
  qcmsValidOptions: 4,
  questionsPerSkillMin: 5,
  questionsTotalTarget: 900,
  levelsCount: 8,
  skillsCount: 41,
};

if (!fs.existsSync(SEED_PATH)) {
  console.error(`❌ Seed introuvable : ${SEED_PATH}`);
  process.exit(1);
}

const seed = JSON.parse(fs.readFileSync(SEED_PATH, 'utf-8'));

// ---------------------------------------------------------------------------
// Périmètre (parâtre par tranche) — ex. : node content-validator.js --scope=1-2
//   --scope=N-M : ne rendre bloquant que les niveaux N..M (les autres niveaux
//                 sont mesurés mais pas bloquants à ce stade)
//   --full       : toutes les niveaux (gate final, cible 8x10=80, 900 questions)
// ---------------------------------------------------------------------------
const scopeArg = process.argv.find((a) => a.startsWith('--scope='));
const FULL = process.argv.includes('--full');
const scopeRange = scopeArg ? scopeArg.split('=')[1] : null;
let scopeLevels = null;
if (FULL) {
  scopeLevels = [1, 2, 3, 4, 5, 6, 7, 8];
} else if (scopeRange && scopeRange.includes('-')) {
  const [a, b] = scopeRange.split('-').map(Number);
  scopeLevels = [];
  for (let n = a; n <= b; n++) scopeLevels.push(n);
} else if (scopeRange) {
  scopeLevels = scopeRange.split(',').map(Number);
}

const inScopeLevel = (levelId) => !scopeLevels || scopeLevels.includes(Number(levelId));
const scopeLabel = scopeLevels ? scopeLevels.join('-') : 'ALL';

let errors = [];
let warnings = [];
const metrics = {};

const lessons = seed.lessons || [];
const questions = seed.questions || [];
const modules = seed.modules || [];
const levels = seed.levels || [];
const skills = seed.skills || [];
const assessments = seed.assessments || [];

// --- A. Identité et structure ----------------------------------------------

function check(cond, msg, mode = 'error') {
  if (!cond) {
    (mode === 'warning' ? warnings : errors).push(msg);
  }
}

metrics.levels = levels.length;
metrics.skills = skills.length;
metrics.modules = modules.length;
metrics.lessons = lessons.length;
metrics.questions = questions.length;
metrics.assessments = assessments.length;
metrics.scopeLevels = scopeLevels || 'ALL';
metrics.scopeMode = FULL ? 'full' : scopeArg ? 'tranche' : 'all(legacy)';

check(levels.length === STANDARDS.levelsCount, `Niveaux : attendu ${STANDARDS.levelsCount}, trouvé ${levels.length}`);

// --- B. Leçons -------------------------------------------------------------

// 0. Regrouper par niveau (tous) + subset scope
const scopeLessons = lessons.filter((l) => inScopeLevel(l.levelId));
metrics.lessonCountInScope = scopeLessons.length;

// 1. Doublons par titre (anti-duplication) — vérifié sur le périmètre scoped
const titleCount = new Map();
scopeLessons.forEach((l) => {
  const t = (l.title || '').trim().toLowerCase();
  titleCount.set(t, (titleCount.get(t) || 0) + 1);
});
const dupTitles = [...titleCount.entries()].filter(([, n]) => n > 1).map(([t, n]) => `${t} (${n}x)`);
metrics.duplicateLessonTitles = dupTitles.length;
if (dupTitles.length > 0) {
  check(false, `Leçons en doublon (titres) [scope ${scopeLabel}] : ${dupTitles.slice(0, 10).join(' ; ')}`);
} else {
  check(true, `Aucune leçon en doublon (titres uniques) [scope ${scopeLabel}]`);
}

// 2. Répartition par niveau (scoped)
const lessonsPerLevel = {};
lessons.forEach((l) => {
  lessonsPerLevel[l.levelId] = (lessonsPerLevel[l.levelId] || 0) + 1;
});
metrics.lessonsPerLevel = lessonsPerLevel;
for (let n = 1; n <= 8; n++) {
  if (!inScopeLevel(n)) continue;
  const count = lessonsPerLevel[n] || 0;
  check(count >= STANDARDS.lessonsPerLevel, `Niveau ${n} : attendu ≥ ${STANDARDS.lessonsPerLevel} leçons, trouvé ${count}`);
}

// 3. Épaisseur (normalisation chaque leçon) — périmètre scoped
let thinLessons = 0;
scopeLessons.forEach((l) => {
  const expl = (l.explanation || '').length;
  const examples = (l.examples || []).length;
  const vocab = (l.vocabulary || []).length;
  const expressions = (l.expressions || []).length;
  const practice = (l.practice || []).length;
  const patterns = (l.patterns || []).length;
  const quizCount = Array.isArray(l.quiz) ? l.quiz.length : (l.quiz ? 1 : 0);

  let leconOk = true;
  if (expl < STANDARDS.explanationMinChars) {
    check(false, `L${l.id} « ${l.title} » : explication ${expl} car. < ${STANDARDS.explanationMinChars}`);
    leconOk = false;
  }
  if (examples < STANDARDS.examplesMin) {
    check(false, `L${l.id} « ${l.title} » : exemples ${examples} < ${STANDARDS.examplesMin}`);
    leconOk = false;
  }
  if (vocab < STANDARDS.vocabularyMin) {
    check(false, `L${l.id} « ${l.title} » : vocabulaire ${vocab} < ${STANDARDS.vocabularyMin}`);
    leconOk = false;
  }
  if (expressions < STANDARDS.expressionsMin) {
    check(false, `L${l.id} « ${l.title} » : expressions ${expressions} < ${STANDARDS.expressionsMin}`);
    leconOk = false;
  }
  if (practice < STANDARDS.practiceMin) {
    check(false, `L${l.id} « ${l.title} » : pratique ${practice} < ${STANDARDS.practiceMin}`);
    leconOk = false;
  }
  if (patterns < STANDARDS.patternsMin) {
    check(false, `L${l.id} « ${l.title} » : patterns ${patterns} < ${STANDARDS.patternsMin}`);
    leconOk = false;
  }
  if (quizCount < STANDARDS.quizMin) {
    check(false, `L${l.id} « ${l.title} » : mini-quiz ${quizCount} < ${STANDARDS.quizMin}`);
    leconOk = false;
  }
  if (!leconOk) thinLessons++;

  (l.examples || []).forEach((e, i) => {
    check(e && typeof e.sentence === 'string' && e.sentence.length > 0, `L${l.id} ex.${i+1} : champ sentence manquant`);
    check(e && typeof e.meaning === 'string' && e.meaning.length > 0, `L${l.id} ex.${i+1} : champ meaning manquant`);
  });
});
metrics.thinLessons = thinLessons;

// 4. Modules pourvus — périmètre scoped
const scopeModuleIds = new Set(scopeLessons.map((l) => l.moduleId));
const scopeModules = modules.filter((m) => inScopeLevel(m.levelId));
metrics.modulesTotal = modules.length;
metrics.modulesInScope = scopeModules.length;
metrics.modulesReferenced = scopeModuleIds.size;
const orphanModules = scopeModules.filter((m) => !scopeModuleIds.has(m.id)).map((m) => `${m.id}:${m.title}`);
metrics.orphanModules = orphanModules.length;
if (orphanModules.length > 0) {
  check(false, `Modules orphelins (sans leçon) [scope ${scopeLabel}] : ${orphanModules.length} — ex. ${orphanModules.slice(0, 8).join(' ; ')}`);
} else {
  check(true, `Tous les ${scopeModules.length} modules du scope sont pourvus de leçons`);
}

// 5. Doublons de modules (titre + levelId) — périmètre scoped
const moduleDup = new Map();
scopeModules.forEach((m) => {
  const k = `${m.title}|lvl${m.levelId}`;
  moduleDup.set(k, (moduleDup.get(k) || 0) + 1);
});
const dupModules = [...moduleDup.entries()].filter(([, n]) => n > 1).length;
metrics.duplicateModules = dupModules;
check(dupModules === 0, `Modules en doublon (titre+niveau) [scope ${scopeLabel}] : ${dupModules}`);

// --- C. Questions ----------------------------------------------------------

// 0. Sous-ensemble actif pour les gates qualité :
//    - full / legacy : TOUTE la banque (gate final, cible 900)
//    - tranche       : questions rattachées aux leçons du scope
//      (les questions orphelines — lessonId null — sont hors scope :
//       leur remédiation est portée par la tranche qui les rattache,
//       et par le gate final full-mode)
const scopeLessonIds = new Set(scopeLessons.map((l) => l.id));
const scopeQuestions = FULL || !scopeLevels
  ? questions
  : questions.filter((q) => q.lessonId != null && scopeLessonIds.has(q.lessonId));
metrics.questionCountInScope = scopeQuestions.length;

// 1. Unicité des textes (anti-duplication, Constitution art. 46)
const qTexts = new Map();
scopeQuestions.forEach((q) => {
  const t = (q.questionText || '').trim().toLowerCase();
  qTexts.set(t, (qTexts.get(t) || 0) + 1);
});
const dupQuestions = [...qTexts.entries()].filter(([, n]) => n > 1).length;
metrics.duplicateQuestions = dupQuestions;
check(dupQuestions === 0, `Questions en doublon (même texte) [scope ${scopeLabel}] : ${dupQuestions}`);

// 2. Références & correctAnswer (périmètre actif)
const lessonIds = new Set(lessons.map((l) => l.id));
const skillIds = new Set(skills.map((s) => s.id));
scopeQuestions.forEach((q, i) => {
  if (q.lessonId != null && !lessonIds.has(q.lessonId)) {
    check(false, `Q${q.id || i} : lessonId ${q.lessonId} inexistant`);
  }
  if (!skillIds.has(q.skillId)) {
    check(false, `Q${q.id || i} : skillId ${q.skillId} inexistant`);
  }
  if (q.type === 'multiple_choice') {
    const opts = Array.isArray(q.options) ? q.options.filter(Boolean) : [];
    check(opts.length >= STANDARDS.qcmsValidOptions, `Q${q.id || i} : QCM avec ${opts.length} options (< ${STANDARDS.qcmsValidOptions})`);
    check(typeof q.correctAnswer === 'string' && q.correctAnswer.length > 0, `Q${q.id || i} : correctAnswer manquant pour QCM`);
    check(opts.includes(q.correctAnswer), `Q${q.id || i} : correctAnswer hors options`);
  } else {
    check(typeof q.correctAnswer === 'string' && q.correctAnswer.length > 0, `Q${q.id || i} : correctAnswer manquant`);
  }
});

// 3. Lien leçon (Constitution art. 46) — gate final full-mode
//    En mode tranche, les questions du scope sont liées par construction ;
//    le comptage des orphelines reste informatif (dette hors scope).
const orphanQuestions = questions.filter((q) => q.lessonId == null).length;
metrics.questionsOrphan = orphanQuestions;
metrics.questionsLinkedToLesson = questions.length - orphanQuestions;
if (FULL) {
  check(orphanQuestions === 0, `Questions non liées à une leçon : ${orphanQuestions}/${questions.length}`);
}

// 4. Couverture par compétence (≥5 questions) — compétences engagées par le périmètre actif
const qBySkill = {};
scopeQuestions.forEach((q) => {
  qBySkill[q.skillId] = (qBySkill[q.skillId] || 0) + 1;
});
const engagedSkills = scopeQuestions.length > 0 ? skills.filter((s) => qBySkill[s.id] !== undefined) : [];
let skillsCovered = 0;
engagedSkills.forEach((s) => {
  const n = qBySkill[s.id] || 0;
  if (n >= STANDARDS.questionsPerSkillMin) skillsCovered++;
  else check(false, `Compétence ${s.id} « ${s.name} » : ${n} questions < ${STANDARDS.questionsPerSkillMin}`);
});
metrics.skillsCovered = skillsCovered;
metrics.skillsEngaged = engagedSkills.length;
metrics.skillsTotal = skills.length;

// 5. Volume global (uniquement en mode complet)
if (FULL || !scopeLevels) {
  metrics.questionsUniqueTargetReached = questions.length >= STANDARDS.questionsTotalTarget;
  check(questions.length >= STANDARDS.questionsTotalTarget, `Volume questions : ${questions.length} < cible ${STANDARDS.questionsTotalTarget}`);
}

// 6. Répartition des types (global — informatif)
const typeDist = {};
questions.forEach((q) => { typeDist[q.type] = (typeDist[q.type] || 0) + 1; });
metrics.questionTypes = typeDist;

// --- D. Évaluations --------------------------------------------------------

const assessment999 = assessments.find((a) => a.id === 999);
check(Boolean(assessment999), 'Évaluation finale 999 absente');
if (assessment999) {
  const used = assessment999.questionIds || [];
  const missing = used.filter((id) => !questions.some((q) => q.id === id));
  check(missing.length === 0, `Évaluation 999 : ${missing.length} questionIds inexistants`);
}

// --- E. Compteurs "users" (sécurité) ----------------------------------------

const passwordHashOk = (seed.users || []).every((u) => typeof u.passwordHash === 'string' && u.passwordHash.length >= 50);
metrics.usersPasswordHashOk = passwordHashOk;
check(passwordHashOk, 'Un des comptes seed a un passwordHash invalide (bcrypt ~60 car.)');

// ---------------------------------------------------------------------------

// Rapport
const report = {
  generatedAt: new Date().toISOString(),
  status: errors.length === 0 ? 'PASS' : 'FAIL',
  counts: metrics,
  errors: errors,
  warnings: warnings,
  standards: STANDARDS,
};

if (process.argv.includes('--json')) {
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
}

console.log('\n=== CONTENT VALIDATOR — Summit English Institute ===');
console.log(`Scope: ${scopeLabel} (${FULL ? 'full' : scopeArg ? 'tranche' : 'all'})`);
console.log(`Niveaux:${metrics.levels} | Skills:${metrics.skills} | Modules:${metrics.modulesTotal} (scope pourvus:${metrics.modulesReferenced}/${metrics.modulesInScope}) | Leçons:${metrics.lessons} (scope:${metrics.lessonCountInScope}) | Questions:${metrics.questions} (scope:${metrics.questionCountInScope}) | Assessments:${metrics.assessments}`);
console.log(`Doublons leçons:${metrics.duplicateLessonTitles} | doublons modules:${metrics.duplicateModules} | doublons questions:${metrics.duplicateQuestions} | leçons insuffisantes:${metrics.thinLessons}`);
console.log(`Questions liées:${metrics.questionsLinkedToLesson}/${questions.length} (orphelines:${metrics.questionsOrphan}) | Skills couvertes:${metrics.skillsCovered}/${metrics.skillsEngaged} | Modules orphelins:${metrics.orphanModules}`);
if (warnings.length) console.log(`\n⚠️  Warnings (${warnings.length}) :\n - ${warnings.join('\n - ')}`);
if (errors.length) {
  console.error(`\n❌ ÉCHEC — ${errors.length} gate(s) non satisfaits :\n - ${errors.slice(0, 25).join('\n - ')}`);
  if (errors.length > 25) console.error(`   (${errors.length - 25} de plus…)`);
  process.exit(1);
}

if (process.argv.includes('--json')) {
  console.log(`\n✅ PASS — métriques écrites dans ${REPORT_PATH}`);
} else {
  console.log(`\n✅ PASS — tous les standards du scope ${scopeLabel} sont respectés (validator)`);
}