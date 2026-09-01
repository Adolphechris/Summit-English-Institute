# 🚀 DÉPLOIEMENT PRODUCTION — Summit English Institute

Stack : **Next.js (App Router) sur Vercel + Cloud Firestore + Gemini AI (optionnel)**.

## 1. Firestore en production (T-1202)
1. Créer/valider le projet Firebase `summit-english-institute` → **Firestore en mode production**.
2. Service account : Firebase Console > Paramètres > Comptes de service > *Générer une clé privée (JSON)*.
3. Sécuriser : règles Firestore fermées par défaut (le client n'y accède jamais directement — tout passe par les routes API + Admin SDK).
4. Peupler : `npm run firestore:seed` (80 leçons, 920 QCM, 9 évaluations) puis vérifier : `npm run firestore:smoke` → **8/8 PASS**.
5. Sauvegardes : activer **PITR** (point-in-time recovery) dans la console GCP.

## 2. Vercel (T-1203)
1. Importer le repo GitHub `Adolphechris/Summit-English-Institute` sur Vercel (framework Next.js auto-détecté, aucune config build à changer).
2. Variables d'environnement (Production + Preview) :
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (clé sur **une seule ligne**, `\n` échappés)
   - `AUTH_SECRET` → `openssl rand -base64 48` ⚠️ **obligatoire** (fail-closed en prod, cf. `lib/config.ts`)
   - `NEXT_PUBLIC_APP_URL=https://<votre-domaine>` · `GOOGLE_AI_API_KEY` (optionnel)
3. Déployer → HTTPS automatique. Brancher le domaine personnalisé si besoin.

## 3. Recette finale ZERO CONFUSION (T-1204)
Parcourir en tant qu'apprenant réel et vérifier : **Où suis-je ? / Que dois-je faire ? / Pourquoi ? / Score ? / Révision ? / Suite ?**
- Inscription → Diagnostic → Lesson 101 → Practice → Review (SRS) → Assessment N1 → Progress → Certificate
- Comptes de test en production (créés le 2026-09-01, vérifiés par login API) :
  - `student@summit.edu` / `Student2026!` (rôle student)
  - `admin@summit.edu` / `Admin2026!` (rôle admin)
  - Comptes seed legacy `*@summit-english.com` et `*@summit-english.local` également actifs (voir `database/firestore-seed-data.json`) ; vérifier aussi la nav sans spinner et l'auto-redirect accueil→dashboard.

## 4. Maintenance (T-1205)
- `scripts/backup.sh` : dump/sauvegarde planifiée (cron recommandé)
- Rollback : Vercel → Deployments → *Promote to Production* (rollback instantané)
- Surveillance : logs Vercel + console Firebase (lectures/écrites, quota)
- MàJ contenu : modifier `database/firestore-seed-data.json` → `npm run firestore:seed` → `npm run content:validate:full` (doit rester **exit 0**)

---
*Vérifications avant push de toute évolution : `npm test` (97 tests) + `npm run content:validate:full` + `npm run build`.*
