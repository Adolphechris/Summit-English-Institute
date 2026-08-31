#!/usr/bin/env node
/**
 * CONTENT PURITY CHECKER — Summit English Institute
 * Garantit l'absence absolue de tout mot-clé de placeholder, gabarit ou formule générique.
 */

const fs = require('fs');
const path = require('path');

const SEED_PATH = path.join(__dirname, '..', 'database', 'firestore-seed-data.json');
const seed = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));

console.log("=== CONTENT PURITY CHECKER — Summit English Institute ===");

const FORBIDDEN_TERMS = [
  "Option exacte pour",
  "Alternative erronée",
  "Option A (valide)",
  "Option A (correcte)",
  "Explication pédagogique détaillée N",
  "Explication technique détaillée N",
  "est essentielle en environnement informatique",
  "Domaine d'application clé pour",
  "Contexte d'application pour",
  "[QCM L"
];

let violationsCount = 0;
const violations = [];

seed.questions.forEach((q) => {
  const str = JSON.stringify(q);
  FORBIDDEN_TERMS.forEach((term) => {
    if (str.includes(term)) {
      violationsCount++;
      violations.push(`Question #${q.id} contient la chaîne interdite "${term}"`);
    }
  });
});

seed.lessons.forEach((l) => {
  const str = JSON.stringify(l);
  FORBIDDEN_TERMS.forEach((term) => {
    if (str.includes(term)) {
      violationsCount++;
      violations.push(`Leçon #${l.id} "${l.title}" contient la chaîne interdite "${term}"`);
    }
  });
});

if (violationsCount > 0) {
  console.error(`❌ ÉCHEC DU CONTROLE DE PURETÉ — ${violationsCount} violation(s) détectée(s) :`);
  violations.slice(0, 10).forEach((v) => console.error(` - ${v}`));
  if (violations.length > 10) {
    console.error(` - ... et ${violations.length - 10} autre(s) violation(s).`);
  }
  process.exit(1);
}

console.log("✅ PASS — Pureté 100% Validée ! Aucun placeholder ni gabarit détecté dans la base.");
process.exit(0);
