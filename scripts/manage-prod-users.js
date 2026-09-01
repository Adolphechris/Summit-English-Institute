#!/usr/bin/env node
/* Gestion des comptes utilisateurs en Firestore prod.
 * Usage:
 *   node scripts/manage-prod-users.js list
 *   node scripts/manage-prod-users.js create <email> <password> <role:student|admin> <prénom> <nom>
 *   node scripts/manage-prod-users.js delete <email>
 * Création = user doc + user_progress initialisé (J1, N1, 0%) — identique à l'API register.
 * Suppression = user + user_progress + sessions du compte.
 */
const path = require("path");
const fs = require("fs");
const { initializeApp, getApps, cert, deleteApp } = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const bcrypt = require("bcryptjs");

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

function init() {
  const env = loadEnvLocal();
  const pk = (env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!getApps().length) {
    initializeApp({
      credential: cert({ projectId: env.FIREBASE_PROJECT_ID, clientEmail: env.FIREBASE_CLIENT_EMAIL, privateKey: pk }),
      projectId: env.FIREBASE_PROJECT_ID,
    });
  }
  return getFirestore();
}

async function findByEmail(db, email) {
  const snap = await db.collection("users").where("email", "==", email.toLowerCase().trim()).limit(1).get();
  return snap.empty ? null : snap.docs[0];
}

async function list(db) {
  const snap = await db.collection("users").get();
  console.log(`users (${snap.size}):`);
  snap.docs.forEach((d) => {
    const u = d.data();
    console.log(`  #${u.id} ${u.email} role=${u.role} status=${u.status}`);
  });
}

async function create(db, [email, password, role, firstName, lastName]) {
  if (!email || !password || !role) throw new Error("Usage: create <email> <password> <student|admin> [prénom] [nom]");
  if (!["student", "admin"].includes(role)) throw new Error("role doit être student ou admin");
  if (await findByEmail(db, email)) throw new Error(`Compte déjà existant: ${email}`);
  const now = new Date().toISOString();
  const id = Date.now();
  const user = {
    id,
    email: email.toLowerCase().trim(),
    passwordHash: bcrypt.hashSync(password, 10),
    role,
    status: "active",
    firstName: firstName || null,
    lastName: lastName || null,
    preferredLanguage: "fr",
    createdAt: now,
    updatedAt: now,
  };
  await db.collection("users").doc(String(id)).set(user);
  await db.collection("user_progress").doc(String(id)).set({
    userId: id, currentLevel: 1, currentDay: 1, overallProgress: 0, isCompleted: false, updatedAt: now,
  });
  console.log(`✅ Créé: #${id} ${user.email} role=${role} (+ user_progress initialisé)`);
}

async function remove(db, [email]) {
  if (!email) throw new Error("Usage: delete <email>");
  const doc = await findByEmail(db, email);
  if (!doc) throw new Error(`Compte introuvable: ${email}`);
  const u = doc.data();
  await doc.ref.delete();
  await db.collection("user_progress").doc(String(u.id)).delete().catch(() => {});
  const sess = await db.collection("sessions").where("userId", "==", u.id).get();
  for (const s of sess.docs) await s.ref.delete();
  console.log(`🗑️  Supprimé: #${u.id} ${u.email} (+ progress, ${sess.size} session(s))`);
}

async function main() {
  const db = init();
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd === "list") await list(db);
  else if (cmd === "create") await create(db, args);
  else if (cmd === "delete") await remove(db, args);
  else throw new Error("Usage: list | create <email> <password> <role> [prénom] [nom] | delete <email>");
  const app = getApps()[0];
  if (app) await deleteApp(app);
}

main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
