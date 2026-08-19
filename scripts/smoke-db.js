/* Smoke test PostgreSQL RÉEL — Phase 1, item "test manuel sur PostgreSQL réel".
 * Vérifie que le schéma, les seeds et les flux critiques fonctionnent
 * sur la vraie base (pas de mock).
 * Usage : node scripts/smoke-db.js  (depuis la racine du projet)
 */
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Lire DATABASE_URL depuis .env.local (sans charger dotenv)
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/^DATABASE_URL=(.+)$/m);
if (!match) {
  console.error('DATABASE_URL introuvable dans .env.local');
  process.exit(1);
}
const DATABASE_URL = match[1].trim();

const pool = new Pool({ connectionString: DATABASE_URL, connectionTimeoutMillis: 5000 });

let failures = 0;
let passes = 0;
function check(name, condition, extra = '') {
  if (condition) {
    passes++;
    console.log(`  ✅ ${name}`);
  } else {
    failures++;
    console.error(`  ❌ ${name} ${extra}`);
  }
}

async function run() {
  const res = await pool.connect();
  try {
    await res.query('SET statement_timeout = 10000');
    console.log('🟢 Connexion PostgreSQL établie (réelle).\n');

    // 1. Tables du schéma
    const tables = await res.query(
      `SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY 1`
    );
    const tableNames = tables.rows.map((r) => r.tablename);
    const required = ['users', 'sessions', 'levels', 'modules', 'lessons', 'questions', 'answers', 'assessments', 'assessment_questions', 'attempts', 'attempt_answers', 'progress', 'level_progress', 'lesson_progress', 'skill_progress', 'review_items', 'certificates', 'skills'];
    console.log(`— Schéma — (${tableNames.length} tables)`);
    for (const t of required) {
      check(`table "${t}"`, tableNames.includes(t));
    }

    // 2. Évaluation finale 999 + status
    const fa = await res.query(`SELECT id, status, passing_score, question_count FROM assessments WHERE id = 999`);
    check('évaluation finale 999 présente', fa.rows.length === 1, JSON.stringify(fa.rows[0] || {}));
    check('fa999 active', fa.rows[0]?.status === 'active');
    check('fa999 seuil 75%', fa.rows[0]?.passing_score === 75);

    // 3. Contenu
    const q = await res.query(`SELECT count(*)::int AS n, count(*) FILTER (WHERE status='active')::int AS active FROM questions`);
    check(`questions >= 50 (${q.rows[0].n} totales)`, q.rows[0].n >= 50);
    check(`questions actives >= 50 (${q.rows[0].active})`, q.rows[0].active >= 50);

    const sk = await res.query(`SELECT count(*)::int AS n FROM skills WHERE status='active'`);
    check(`skills actives >= 6 (${sk.rows[0].n})`, sk.rows[0].n >= 6);

    // 4. Utilisateurs de test (hashs bcrypt valides : longueur 60)
    const u = await res.query(
      `SELECT count(*)::int AS total, count(*) FILTER (WHERE length(password_hash)=60)::int AS bcrypt FROM users WHERE role='student'`
    );
    check(`utilisateurs étudiants présents (${u.rows[0].total})`, u.rows[0].total >= 1);
    check(`hashs bcrypt valides (${u.rows[0].bcrypt}/${u.rows[0].total})`, u.rows[0].bcrypt === u.rows[0].total);

    // 5. Flux réel : INSERT + SELECT + ROLLBACK (aucune écriture persistante)
    console.log('\n— Flux réel (transaction ROLLBACK, aucune écriture laissée) —');
    await res.query('BEGIN');
    const insertUser = await res.query(
      `INSERT INTO users (email, password_hash, role)
       VALUES ('smoke.test@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZab', 'student')
       RETURNING id`
    );
    check('INSERT utilisateur OK', insertUser.rows.length === 1);
    const sub = await res.query(`SELECT id FROM users WHERE email='smoke.test@example.com'`);
    check('SELECT après INSERT OK', sub.rows.length === 1);
    await res.query('ROLLBACK');
    const after = await res.query(`SELECT count(*)::int AS n FROM users WHERE email='smoke.test@example.com'`);
    check('ROLLBACK efficace (aucune ligne laissée)', after.rows[0].n === 0);
  } finally {
    await res.release();
    await pool.end();
  }

  console.log(`\n=== RÉSULTAT: ${passes} passés / ${failures} échoués ===`);
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((e) => {
  console.error('Erreur fatale du smoke test :', e.message);
  pool.end().finally(() => process.exit(1));
});