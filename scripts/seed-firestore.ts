// ============================================================================
// Script de Seed Google Cloud Firestore
// Summit English Institute — Injection Idempotente du Contenu Pédagogique
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { getFirestore } from '../services/database/firebase-admin';
import { COLLECTIONS } from '../services/database/firestore-schema';

async function seedFirestore() {
  console.log('🚀 Démarrage de l\'injection des données dans Cloud Firestore...');

  const db = getFirestore();
  const seedFilePath = path.join(__dirname, '../database/firestore-seed-data.json');

  if (!fs.existsSync(seedFilePath)) {
    throw new Error(`Fichier de seed introuvable : ${seedFilePath}`);
  }

  const rawData = fs.readFileSync(seedFilePath, 'utf-8');
  const seedData = JSON.parse(rawData);

  // Helper pour insérer par lots de max 450 documents (limite Firestore = 500 par batch)
  async function insertBatch<T extends { id?: string | number }>(
    collectionName: string,
    items: T[],
    idField: keyof T = 'id'
  ) {
    if (!items || items.length === 0) return;
    console.log(`⏳ Injection dans ${collectionName} (${items.length} éléments)...`);

    const chunkSize = 400;
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      const batch = db.batch();

      for (const item of chunk) {
        const docId = String(item[idField] ?? (item as any).token ?? (item as any).certificateCode);
        const ref = db.collection(collectionName).doc(docId);
        batch.set(ref, item, { merge: true });
      }

      await batch.commit();
    }
    console.log(`✅ ${collectionName} injecté (${items.length} documents).`);
  }

  // 1. Users
  await insertBatch(COLLECTIONS.USERS, seedData.users, 'id');

  // 2. Levels
  await insertBatch(COLLECTIONS.LEVELS, seedData.levels, 'id');

  // 3. Modules
  await insertBatch(COLLECTIONS.MODULES, seedData.modules, 'id');

  // 4. Lessons
  await insertBatch(COLLECTIONS.LESSONS, seedData.lessons, 'id');

  // 5. Skills
  await insertBatch(COLLECTIONS.SKILLS, seedData.skills, 'id');

  // 6. Questions (434 questions)
  await insertBatch(COLLECTIONS.QUESTIONS, seedData.questions, 'id');

  // 7. Assessments
  await insertBatch(COLLECTIONS.ASSESSMENTS, seedData.assessments, 'id');

  console.log('🎉 Seed Cloud Firestore terminé avec succès !');
}

if (require.main === module) {
  seedFirestore()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Erreur lors du seed Firestore :', err);
      process.exit(1);
    });
}

export { seedFirestore };
