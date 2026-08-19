# PROGRESS TRACKER — Summit English Institute

> Établi selon le plan approuvé. Chaque tâche est validée (code + test + build) avant passage à la suivante.
> Dernière mise à jour : 2026-08-20 — PHASE 0 TERMINÉE ✅ / PHASE 1 TERMINÉE ✅

## Cadre global

| Chantier | Statut |
|---|---|
| **Phase 0 — Corrections bloquantes (MVP local)** | ✅ **TERMINÉE — build + tests verts** |
| **Phase 1 — Durcissement** | ✅ **TERMINÉE — toutes les sous-tâches clôturées (2026-08-20)** |
| Phase 2 — Continuité développement | ⬜ À venir |
| Phase 3 — Tests | ⬜ À planifier |
| Phase 4 — Déploiement | ⬜ À planifier |
| Phase 5 — Git → GitHub push | ⬜ À planifier |

## PHASE 0 — Terminée ✅ (100 %)

| # | Tâche | Statut |
|---|---|---|
| 0.1 | JSX + dette TS (21 erreurs → 0) | ✅ |
| 0.2 | Tailwind CSS (paquets + configs) | ✅ |
| 0.3 | Stockage JWT `localStorage` | ✅ |
| 0.4 | Hashs bcrypt valides + seeds idempotents | ✅ |
| 0.5 | Doublon email → HTTP 409 | ✅ |
| 0.6 | Migrations + seed évaluation finale (999) | ✅ |
| 0.7 | Pages globales error/404/loading | ✅ |
| 0.8 | `.env.local.save` + `.gitignore` | ✅ |
| 0.9 | `dotenv` devDependency | ✅ |
| 0.10 | N+1 éliminé (`calculateDomainScores`) | ✅ |
| 0.11 | CORS restreint | ✅ |
| 0.12 | Page évaluation `[id]` + API dédiée | ✅ |
| 0.13 | Mapping jours→niveaux (`lib/coursePath`) | ✅ |
| 0.14 | Tests de régression (40 tests) | ✅ |
| 0.15 | **Validation : tsc 0 · ESLint 0 · 40/40 tests · `next build` OK** | ✅ |

> ✅ Phase 0 consolidée : au 2026-08-19, l'ensemble du projet compile avec `tsc --noEmit` (0 erreur), passe `eslint --max-warnings=0` (0 problème), exécute **60/60 tests Jest stables** (8 suites) et build Next.js `BUILD_EXIT=0`.

## PHASE 1 — Durcissement ✅ (100 %, clôturée le 2026-08-20)

| # | Tâche | Statut |
|---|---|---|
| 1.1 | Middleware protégeant **toutes** les routes + cookie httpOnly | ✅ |
| 1.2 | Validation serveur + rate-limiting login | ✅ |
| 1.3 | Client API centralisé `lib/apiClient.ts` (layout refactoré) | ✅ |
| 1.4 | Composants `Modal` + `Select` | ✅ |
| 1.5 | Service `services/progress/update.ts` branché sur les soumissions | ✅ |
| 1.6 | Révisions : `skill_id` correct + `POST /api/review/master` + bouton Maîtrisé | ✅ |
| 1.7 | Erreurs API cohérentes (400/404/409/429/500) sur **les 22 routes** | ✅ |
| 1.8 | Config ESLint + build lint OK | ✅ |
| 1.9 | `scripts/backup.sh` + `scripts/migrate.sh` | ✅ |
| 1.10 | Docs à jour (CHANGELOG, PROJECT_STRUCTURE) | ✅ |
| 1.11 | **Refactor 100 % `apiFetch`** : login + register basculés (option `redirectOn401: false`) | ✅ |
| 1.12 | **Test PostgreSQL réel** : `scripts/smoke-db.js` — 29/29 vérifications | ✅ |

**Clôture 2026-08-20** : toutes les pages utilisent `apiFetch` ; les 22 routes retournent
des erreurs uniformes (401/400/404/409/429/500) ; smoke test réel **29/29** sur `summit_english`.
Découvertes corrigées pendant la clôture : la migration `001_final_assessment_seed.sql` (évaluation
finale id=999) et les comptes de test n'étaient appliqués par AUCUN script → `setup.sh` et
`update-database.sh` bouclent désormais les `database/migrations/*.sql` ; `.env.local` pointait
sur TCP (auth SCRAM impossible sans mot de passe) → repli sur le socket Unix (auth peer).

## Journal de bord

| Étape | Date | Action | Résultat |
|---|---|---|---|
| L1 | 2026-08-18 | Correction 21 erreurs TS + 0.2→0.11 | tsc 0 erreur |
| L2 | 2026-08-18 | 0.12 page évaluation + API `[id]` | 404→chargement réel |
| L3 | 2026-08-18 | 0.14 tests (course-path, test-users) | 40 tests |
| L4 | 2026-08-18 | 0.15 `next build` (2 essais, config ESLint) | ✅ BUILD_EXIT=0 |
| L5 | 2026-08-18 | Phase 1.1→1.6 (auth/cookie/middleware, progression, révisions) | ✅ |
| L6 | 2026-08-18 | Phase 1.4/1.8/1.9/1.10 (UI, eslint, scripts, docs) | ✅ |
| L7 | 2026-08-19 | Mapping SQL→camelCase (`mapUserRow`) + test rate-limit déterministe | ✅ |
| L8 | 2026-08-19 | Validation générale : tsc 0 · ESLint 0 · 60/60 tests · `next build` OK | ✅ |
| L9 | 2026-08-20 | Clôture Phase 1 : `apiFetch` 100 % pages (option `redirectOn401: false` pour login), smoke test DB réel 29/29, migration 999 + users de test appliqués, `setup.sh`/`update-database.sh` bouclent maintenant les migrations, `.env` local → socket peer | ✅ |

---

*Document vivant — mis à jour à chaque tâche et à chaque fin de phase.*
