#!/usr/bin/env node
/* Purge du contenu legacy de Firestore prod (ne touche PAS aux users).
 * - Canonical = database/firestore-seed-data.json (lessons 101-180, questions 1001-1920, modules seed)
 * - DRY-RUN par défaut : `node scripts/purge-legacy-content.js`
 * - Exécution réelle  : `node scripts/purge-legacy-content.js --execute`
 * - Backup des documents supprimés → database/backup-legacy-<ISO>.json
 */
const fs = require("fs");
const path = require("path");
const { initializeApp, getApps, cert, deleteApp } = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

const EXECUTE = process.argv.includes("--execute");

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

async function deleteInBatches(db, colName, ids) {
  const col = db.collection(colName);
  let deleted = 0;
  for (let i = 0; i < ids.length; i += 450) {
    const batch = db.batch();
    for (const id of ids.slice(i, i + 450)) batch.delete(col.doc(String(id)));
    await batch.commit();
    deleted += Math.min(450, ids.length - i);
    process.stdout.write(`  ${colName}: ${deleted}/${ids.length} supprimés\r`);
  }
  process.stdout.write("\n");
  return deleted;
}

async function main() {
  const env = loadEnvLocal();
  const pk = (env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!getApps().length) {
    initializeApp({
      credential: cert({ projectId: env.FIREBASE_PROJECT_ID, clientEmail: env.FIREBASE_CLIENT_EMAIL, privateKey: pk }),
      projectId: env.FIREBASE_PROJECT_ID,
    });
  }
  const db = getFirestore();
  const seed = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "database", "firestore-seed-data.json"), "utf8"));
  const okLesson = new Set(seed.lessons.map((l) => String(l.id)));
  const okQuestion = new Set(seed.questions.map((q) => String(q.id)));
  const okModule = new Set((seed.modules || []).map((m) => String(m.id)));

  const purgePlan = {};
  for (const [col, okSet] of [["lessons", okLesson], ["questions", okQuestion], ["modules", okModule]]) {
    const snap = await db.collection(col).select().get();
    purgePlan[col] = snap.docs.map((d) => d.id).filter((id) => !okSet.has(id));
  }

  console.log(`=== PURGE LEGACY — projet ${env.FIREBASE_PROJECT_ID} — mode: ${EXECUTE ? "EXECUTION REELLE" : "DRY-RUN"} ===`);
  Object.entries(purgePlan).forEach(([col, ids]) => console.log(`${col.padEnd(10)}: ${ids.length} documents à supprimer`));
  const total = Object.values(purgePlan).reduce((a, b) => a + b.length, 0);
  if (total === 0) { console.log("=> Rien à purger, base déjà propre."); return; }

  if (!EXECUTE) {
    console.log("DRY-RUN : aucune suppression effectuée. Relancez avec --execute pour appliquer.");
    return;
  }

  // Backup complet des documents avant suppression
  const backup = { createdAt: new Date().toISOString(), project: env.FIREBASE_PROJECT_ID, collections: {} };
  for (const [col, ids] of Object.entries(purgePlan)) {
    backup.collections[col] = [];
    for (const id of ids) {
      const doc = await db.collection(col).doc(id).get();
      if (doc.exists) backup.collections[col].push({ id: doc.id, data: doc.data() });
    }
  }
  const backupPath = path.join(__dirname, "..", "database", `backup-legacy-${Date.now()}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(backup));
  console.log(`Backup écrit: ${path.basename(backupPath)} (${(fs.statSync(backupPath).size / 1e6).toFixed(1)} Mo)`);

  for (const [col, ids] of Object.entries(purgePlan)) await deleteInBatches(db, col, ids);

  // Vérification finale
  console.log("--- Vérification finale ---");
  for (const col of ["lessons", "questions", "modules"]) {
    const snap = await db.collection(col).select().get();
    console.log(`${col.padEnd(10)}: prod=${snap.size} (attendu: ${col === "lessons" ? 80 : col === "questions" ? 920 : (seed.modules || []).length})`);
  }
  console.log("=> PURGE TERMINÉE");
  const app = getApps()[0];
  if (app) await deleteApp(app);
}

main().catch((e) => { console.error("PURGE ERROR:", e.message); process.exit(1); });
