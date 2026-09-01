#!/usr/bin/env node
/* Audit read-only de la base Firestore de production vs seed local canonique.
   Usage: node scripts/audit-prod-db.js [--json]
   Ne modifie AUCUNE donnée : lectures seules. */
const fs = require("fs");
const path = require("path");

function loadEnvLocal() {
  const p = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(p)) throw new Error(".env.local introuvable");
  const env = {};
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

async function main() {
  const { initializeApp, getApps, cert, deleteApp } = require("firebase-admin");
  const { getFirestore } = require("firebase-admin/firestore");
  const env = loadEnvLocal();
  const pk = (env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !pk.includes("BEGIN PRIVATE KEY")) {
    throw new Error("Credentials Firebase Admin incomplets dans .env.local");
  }
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: pk,
      }),
      projectId: env.FIREBASE_PROJECT_ID,
    });
  }
  const db = getFirestore();

  async function countAndIds(col) {
    const snap = await db.collection(col).select().get();
    return { count: snap.size, ids: snap.docs.map((d) => Number(d.id)).filter((n) => !isNaN(n)).sort((a, b) => a - b) };
  }

  const [lessons, questions, modules, users, assessments] = await Promise.all(
    ["lessons", "questions", "modules", "users", "assessments"].map((c) =>
      countAndIds(c).catch((e) => ({ count: -1, ids: [], error: e.message }))
    )
  );

  const seed = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "database", "firestore-seed-data.json"), "utf8"));
  const seedLessonIds = new Set(seed.lessons.map((l) => Number(l.id)));
  const seedQuestionIds = new Set(seed.questions.map((q) => Number(q.id)));

  const legacyLessons = lessons.ids.filter((i) => !seedLessonIds.has(i));
  const legacyQuestions = questions.ids.filter((i) => !seedQuestionIds.has(i));

  const report = {
    projet: env.FIREBASE_PROJECT_ID,
    firestore: {
      lessons: { prod: lessons.count, seedLocal: seed.lessons.length, legacyAPurger: legacyLessons },
      questions: { prod: questions.count, seedLocal: seed.questions.length, legacyAPurger: legacyQuestions.slice(0, 50).concat(legacyQuestions.length > 50 ? [`...+${legacyQuestions.length - 50}`] : []) },
      modules: { prod: modules.count, seedLocal: (seed.modules || []).length },
      users: { prod: users.count, seedLocal: (seed.users || []).length },
      assessments: { prod: assessments.count, seedLocal: (seed.assessments || []).length },
    },
    verdict: legacyLessons.length === 0 && legacyQuestions.length === 0 ? "PROPRE — prod = seed canonique" : "NETTOYAGE REQUIS — documents legacy détectés",
  };

  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else {
    console.log("=== AUDIT READ-ONLY — Firestore prod vs seed local ===");
    console.log("Projet:", report.projet);
    console.log(`lessons    : prod=${lessons.count}  seed=${seed.lessons.length}  legacy=${legacyLessons.length}`);
    console.log(`questions  : prod=${questions.count}  seed=${seed.questions.length}  legacy=${legacyQuestions.length}`);
    console.log(`modules    : prod=${modules.count}  seed=${(seed.modules || []).length}`);
    console.log(`users      : prod=${users.count}  seed=${(seed.users || []).length}`);
    console.log(`assessments: prod=${assessments.count}  seed=${(seed.assessments || []).length}`);
    if (legacyLessons.length) console.log("IDs lessons legacy:", legacyLessons.join(","));
    if (legacyQuestions.length) console.log(`IDs questions legacy (${legacyQuestions.length}):`, legacyQuestions.slice(0, 20).join(","), legacyQuestions.length > 20 ? "..." : "");
    console.log("=>", report.verdict);
  }
  const app = getApps()[0]; if (app) await deleteApp(app);
}

main().catch((e) => { console.error("AUDIT ERROR:", e.stack); process.exit(1); });
