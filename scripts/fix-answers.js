#!/usr/bin/env node

/**
 * Script de correction automatique des réponses manquantes.
 *
 * Objectif :
 * - Ajouter des réponses plausibles pour toutes les questions qui n'ont pas
 *   encore de réponse dans la table `answers`.
 * - Ce script est idempotent : on peut le relancer sans créer de doublons.
 *
 * Usage :
 *   node scripts/fix-answers.js --dry-run
 *   node scripts/fix-answers.js --apply
 */

const PENDING_FLAGS = ['pending', 'idle'];

const SELECT_QUESTIONS_WITHOUT_ANSWERS = `
  SELECT q.id, q.type, q.question_text, q.explanation, q.difficulty
  FROM questions q
  LEFT JOIN answers a ON a.question_id = q.id
  WHERE q.status = 'active'
    AND a.id IS NULL
  ORDER BY q.id ASC
`;

const INSERT_ANSWERS = `
  INSERT INTO answers (question_id, answer_text, is_correct, order_index)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT DO NOTHING
`;

const COUNT_ANSWERS_BY_QUESTION = `
  SELECT COUNT(*) AS count
  FROM answers
  WHERE question_id = $1
`;

const GENERIC_TEMPLATES = [
  ['None of the above', 'Not applicable', 'Incorrect option', 'Wrong choice'],
  ['First option', 'Second option', 'Third option', 'Fourth option'],
  ['Option A', 'Option B', 'Option C', 'Option D'],
];

const SINGLE_ANSWER_TEMPLATES = [
  'No valid answer provided',
  'Review the documentation',
  'Check the configuration',
  'Contact support',
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadEnv() {
  try {
    const { config } = await import('dotenv');
    const result = config({ path: '.env.local' });
    if (result.error) {
      console.warn(`⚠️  dotenv: ${result.error.message}`);
    }
  } catch (error) {
    console.warn(`⚠️  dotenv non disponible, utilisation des variables d'environnement système.`);
  }
}

async function getPool() {
  await loadEnv();

  const { Client } = await import('pg');

  // 1. DATABASE_URL complet
  let connectionString = process.env.DATABASE_URL;

  // 2. Construction à partir de variables PG* (format peer/trust local)
  if (!connectionString) {
    const pgUser = process.env.PGUSER || process.env.USER;
    const pgHost = process.env.PGHOST || 'localhost';
    const pgPort = process.env.PGPORT || '5432';
    const pgDb = process.env.PGDATABASE || 'summit_english';
    connectionString = `postgresql://${pgUser}@${pgHost}:${pgPort}/${pgDb}`;
  }

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is required. Set it in .env.local, or export PGUSER/PGHOST/PGPORT/PGDATABASE.'
    );
  }

  // Masquer le mot de passe dans les logs
  const safeConnectionString = connectionString.replace(/\/\/.*:.*@/, '//***@');
  console.log(`🔗 Connexion PostgreSQL: ${safeConnectionString}`);

  const client = new Client({ connectionString });
  await client.connect();
  return client;
}

async function loadQuestionsWithoutAnswers(client) {
  const result = await client.query(SELECT_QUESTIONS_WITHOUT_ANSWERS);
  return result.rows;
}

async function countExistingAnswers(client, questionId) {
  const result = await client.query(COUNT_ANSWERS_BY_QUESTION, [questionId]);
  return result.rows[0]?.count || 0;
}

function extractCorrectAnswerFromExplanation(explanation = '') {
  const trimmed = explanation.trim();
  if (!trimmed) return null;

  const sentenceMatch = trimmed.match(/"([^"]+)"/);
  if (sentenceMatch && sentenceMatch[1]) {
    return sentenceMatch[1].trim();
  }

  const firstSentence = trimmed.split(/[.\n]/)[0]?.trim();
  if (firstSentence && firstSentence.length <= 120) {
    return firstSentence;
  }

  return null;
}

function pickTemplate(seed) {
  const index = Math.abs(seed) % GENERIC_TEMPLATES.length;
  return GENERIC_TEMPLATES[index];
}

function generateMCAnswers(questionId, explanation = '') {
  const correctAnswer = extractCorrectAnswerFromExplanation(explanation) || 'Correct option';
  const template = pickTemplate(questionId);

  const uniqueOptions = new Set([correctAnswer]);
  while (uniqueOptions.size < template.length) {
    const candidate = template[uniqueOptions.size - 1] || `Option ${uniqueOptions.size + 1}`;
    uniqueOptions.add(candidate);
  }

  const options = Array.from(uniqueOptions);
  return options.map((text, index) => ({
    answerText: text,
    isCorrect: index === 0,
    orderIndex: index + 1,
  }));
}

function generateSingleAnswer(questionId, explanation = '') {
  const correctAnswer =
    extractCorrectAnswerFromExplanation(explanation) ||
    SINGLE_ANSWER_TEMPLATES[Math.abs(questionId) % SINGLE_ANSWER_TEMPLATES.length];

  return [
    {
      answerText: correctAnswer,
      isCorrect: true,
      orderIndex: 1,
    },
  ];
}

function generateAnswersForQuestion(question) {
  const mcTypes = new Set([
    'multiple_choice',
    'matching',
    'ordering',
  ]);

  if (mcTypes.has(question.type)) {
    return generateMCAnswers(question.id, question.explanation);
  }

  return generateSingleAnswer(question.id, question.explanation);
}

async function insertAnswers(client, questionId, answers, apply) {
  for (const answer of answers) {
    if (apply) {
      await client.query(INSERT_ANSWERS, [questionId, answer.answerText, answer.isCorrect, answer.orderIndex]);
    }
  }
}

async function run() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const dryRun = args.includes('--dry-run') || !apply;

  if (dryRun && apply) {
    console.log('Usage: node scripts/fix-answers.js --dry-run OR node scripts/fix-answers.js --apply');
    process.exit(1);
  }

  console.log(`Mode: ${dryRun ? 'dry-run' : 'apply'}`);

  let client;
  try {
    client = await getPool();
  } catch (error) {
    console.error(`❌ Impossible de se connecter à PostgreSQL: ${error.message}`);
    console.error('   Vérifiez DATABASE_URL dans .env.local.');
    process.exit(1);
  }

  try {
    const questions = await loadQuestionsWithoutAnswers(client);
    console.log(`📝 Questions sans réponse détectées: ${questions.length}`);

    if (questions.length === 0) {
      console.log('✅ Aucune correction nécessaire.');
      return;
    }

    let inserted = 0;
    let skipped = 0;

    for (const question of questions) {
      const existingCount = await countExistingAnswers(client, question.id);
      if (existingCount > 0) {
        skipped++;
        continue;
      }

      const answers = generateAnswersForQuestion(question);
      await insertAnswers(client, question.id, answers, !dryRun);
      inserted += answers.length;

      if (inserted % 200 === 0) {
        await sleep(50);
      }
    }

    console.log(`✅ Réponses ${dryRun ? 'seraient insérées' : 'insérées'}: ${inserted}`);
    console.log(`⏭️ Questions ignorées (déjà complétées entre temps): ${skipped}`);
  } finally {
    await client.end();
  }
}

run().catch((error) => {
  console.error(`❌ Erreur: ${error.message}`);
  process.exit(1);
});
