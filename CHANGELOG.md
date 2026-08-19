# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet suit le [Semantic Versioning](https://semver.org/lang/fr/).

## [0.2.0] - 2026-08-19

### Ajouté
- **Sécurité — authentification cookie httpOnly uniquement** : le JWT n'est plus
  stocké dans `localStorage` (vulnérabilité XSS supprimée). `lib/apiClient.ts`
  utilise `credentials: 'include'` ; toutes les pages client migrées vers `apiFetch`.
- **Révocation de session réelle** : `verifyToken` vérifie la présence de la session
  en base (`sessions`) → un token révoqué par logout est immédiatement invalide.
- **Fail-closed des secrets** : `lib/config.ts` refuse de démarrer en production
  sans `AUTH_SECRET` / `DATABASE_URL` valides.
- **Rate-limiting de l'inscription** (email + IP) + rate-limiting du login par IP.
- **CI GitHub Actions** (`.github/workflows/ci.yml`) : tsc + ESLint + Jest + `next build`.
- **Transactions DB** : helper `withTransaction` ; tentative+réponses atomiques dans
  `assessments/submit`, `final-assessment/submit` et `createAssessmentWithQuestions`.
- **Moteur d'évaluation** : correction de la distribution par compétence (SQL invalide
  et injection éliminés) + sélection paramétrée.
- **Tests** : 20 tests ajoutés (auth-api : révocation ; rate-limit ; api-security :
  401 sans session, 400 login invalide) → **60 tests au total**.
- `PROJECT_STRUCTURE.md` réécrit pour refléter la structure réelle du dépôt.

### Corrigé
- `/api/questions` exige désormais l'authentification + borne le paramètre `limit`.
- DRY de l'authentification : toutes les API routes utilisent `getRequestUserId`
  (suppression du bloc Bearer dupliqué).
- `scripts/migrate.sh` et `scripts/backup.sh` utilisent `$DATABASE_URL`.
- Dépendance morte `dotenv` retirée.

## [0.1.1] - 2026-08-18

### Corrigé
- **21 erreurs TypeScript éliminées** (JSX `Button`, `Badge` `lg`/`className`, type `Question.options`, `tsconfig.target`, import `Link`, typages `auth`/`dashboard`/`db`) — `tsc --noEmit` passe à 0 erreur.
- **Authentification fonctionnelle** : token JWT stocké dans `localStorage` après connexion/inscription ; cookie `httpOnly` posé côté serveur ; middleware protégeant **toutes** les routes (`diagnostic`, `final-assessment`, `certificate` inclus).
- **Sécurité** : validation serveur (email, mot de passe 8–72, noms bornés), doublon email → HTTP 409, rate-limiting des tentatives de connexion, CORS restreint à `NEXT_PUBLIC_APP_URL`.
- **Comptes de test** : hashs bcrypt valides (60 car.) + seeds idempotents (`ON CONFLICT`).
- **Évaluation finale** : seed idempotent (`id=999`) + migrations versionnées ; N+1 éliminé dans le calcul des scores par domaine.
- **Parcours** : mapping explicite 20 jours → 8 niveaux (`lib/coursePath.ts`) avec verrouillage/déblocage réel selon `level_progress`.
- **Page évaluation `[id]`** : charge l'évaluation depuis l'URL avec ses questions liées ; soumission avec l'identifiant réel et le seuil de validation de l'évaluation.
- **Révisions** : `skill_id` exposé (le lien pointait sur l'id de l'élément), API `POST /api/review/master`, bouton « Maîtrisé ».
- **Progression** : nouveau service `services/progress/update.ts` qui alimente `skill_progress`, `level_progress`, `lesson_progress` et `review_items` à chaque soumission.

### Ajouté
- `lib/validate.ts` (validation serveur), `lib/rateLimit.ts` (protection brute force), `lib/apiClient.ts` (client API centralisé), `lib/coursePath.ts` (mapping pédagogique).
- `database/migrations/001_final_assessment_seed.sql` + `scripts/migrate.sh`, `scripts/backup.sh`.
- Pages globales `app/error.tsx`, `not-found.tsx`, `loading.tsx`.
- Composants `Modal.tsx`, `Select.tsx`.
- Config Tailwind CSS : `tailwind.config.js`, `postcss.config.js` (+ dépendances).
- Config ESLint `.eslintrc.json` (build lint OK).
- Tests : `course-path.test.ts` + `test-users.test.ts` — **40 tests au total**.

## [0.1.0] - 2026-08-17

### Ajouté
- Cahier des charges complet (8 tranches)
  - Constitution fondamentale
  - Architecture pédagogique détaillée
  - Architecture fonctionnelle et logicielle
  - Architecture technique
  - Programme pédagogique détaillé
  - Moteur d'évaluation, maîtrise, progression et certification
  - UX/UI et design system
  - Plan de construction, tests, déploiement et maintenance

- Projet Next.js initialisé avec TypeScript
- Design system de base (Button, Card, ProgressBar, Badge, Input, Loading, ErrorMessage)
- Authentification complète (inscription, connexion, déconnexion, sessions JWT)
- Layout principal avec navigation desktop et mobile
- Page d'accueil
- Dashboard avec progression, weak/strong areas, révisions
- Page "Mon Parcours" (20 jours)
- Pages de leçons
- Système d'évaluation avec soumission et résultats
- Page de pratique
- Page de révisions
- Page de progression
- Page de profil

- API Routes
  - Auth (register, login, logout, me)
  - Dashboard
  - Course path
  - Lessons
  - Questions
  - Assessments
  - Practice
  - Review
  - Progress
  - Final assessment
  - Certificate

- Base de données PostgreSQL
  - Schéma complet (22 tables)
  - Migrations
  - Seeds initiales enrichies (40+ questions, 3+ leçons, modules supplémentaires)
  - Utilisateurs de test

- Évaluation finale et certification
  - Page d'évaluation finale
  - Page de proclamation
  - Page d'attestation/certificat
  - API de génération de certificat

- Moteur de répétition espacée
  - Service de calcul des révisions
  - Initialisation des révisions pour nouveaux utilisateurs
  - Mise à jour des priorités selon performance

- Tests
  - Tests unitaires (scoring, progression)
  - Tests d'intégration (assessment flow)
  - Configuration Jest

- Documentation
  - PROJECT_RULES.md
  - PROJECT_STRUCTURE.md
  - README.md
  - CHANGELOG.md

- Configuration
  - Variables d'environnement (.env.example)
  - .gitignore
  - Scripts de setup et mise à jour DB

## [0.0.1] - 2026-08-17

### Ajouté
- Constitution du centre
- Cahier des charges Tranche 1 (Compréhension du besoin)
