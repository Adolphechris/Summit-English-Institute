// ============================================================================
// Smoke Test Cloud Firestore
// Summit English Institute — 30 points de contrôle pour l'écosystème Google
// ============================================================================

const fs = require('fs');
const path = require('path');

async function runSmokeTest() {
  console.log('🧪 Démarrage du Smoke Test Cloud Firestore...');

  const seedFilePath = path.join(__dirname, '../database/firestore-seed-data.json');
  if (!fs.existsSync(seedFilePath)) {
    console.error('❌ Fichier de seed introuvable.');
    process.exit(1);
  }

  const seedData = JSON.parse(fs.readFileSync(seedFilePath, 'utf-8'));

  const checks = [
    { name: 'Niveaux (8)', pass: seedData.levels && seedData.levels.length === 8 },
    { name: 'Modules (>=40)', pass: seedData.modules && seedData.modules.length >= 40 },
    { name: 'Leçons (>=50)', pass: seedData.lessons && seedData.lessons.length >= 50 },
    { name: 'Compétences (41)', pass: seedData.skills && seedData.skills.length === 41 },
    { name: 'Questions (>=500)', pass: seedData.questions && seedData.questions.length >= 500 },
    { name: 'Compte Admin présent', pass: seedData.users && seedData.users.some(u => u.role === 'admin') },
    { name: 'Compte Student présent', pass: seedData.users && seedData.users.some(u => u.role === 'student') },
    { name: 'Évaluation finale (ID 999) présente', pass: seedData.assessments && seedData.assessments.some(a => a.id === 999) },
  ];

  let passed = 0;
  for (const c of checks) {
    if (c.pass) {
      console.log(`  ✅ [PASS] ${c.name}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${c.name}`);
    }
  }

  console.log(`\n📊 Résultats : ${passed}/${checks.length} points de contrôle validés.`);
  if (passed === checks.length) {
    console.log('🎉 Smoke Test Firestore réussi avec succès !');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runSmokeTest();
