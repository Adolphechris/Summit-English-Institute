# PROGRESS TRACKER — Summit English Institute

> Établi selon le plan approuvé. Chaque tâche est validée (code + test + build) avant passage à la suivante.
> Dernière mise à jour : 2026-08-18 — PHASE 0 TERMINÉE ✅ / PHASE 1 EN COURS

## Cadre global

| Chantier | Statut |
|---|---|
| **Phase 0 — Corrections bloquantes (MVP local)** | ✅ **TERMINÉE — build + tests verts** |
| **Phase 1 — Durcissement** | 🔄 En cours |
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

## PHASE 1 — Durcissement 🔄

| # | Tâche | Statut |
|---|---|---|
| 1.1 | Middleware protégeant **toutes** les routes + cookie httpOnly | ✅ |
| 1.2 | Validation serveur + rate-limiting login | ✅ |
| 1.3 | Client API centralisé `lib/apiClient.ts` (layout refactoré) | ✅ |
| 1.4 | Composants `Modal` + `Select` | ✅ |
| 1.5 | Service `services/progress/update.ts` branché sur les soumissions | ✅ |
| 1.6 | Révisions : `skill_id` correct + `POST /api/review/master` + bouton Maîtrisé | ✅ |
| 1.7 | Erreurs API cohérentes (400/404/409 partiel) | 🔄 Partiel |
| 1.8 | Config ESLint + build lint OK | ✅ |
| 1.9 | `scripts/backup.sh` + `scripts/migrate.sh` | ✅ |
| 1.10 | Docs à jour (CHANGELOG, PROJECT_STRUCTURE) | ✅ |

**Reste Phase 1 (ouvert)** : refactor systématique de toutes les pages vers `apiFetch` ; 404/500 cohérents sur toutes les API ; test manuel sur PostgreSQL réel.

## Journal de bord

| Étape | Date | Action | Résultat |
|---|---|---|---|
| L1 | 2026-08-18 | Correction 21 erreurs TS + 0.2→0.11 | tsc 0 erreur |
| L2 | 2026-08-18 | 0.12 page évaluation + API `[id]` | 404→chargement réel |
| L3 | 2026-08-18 | 0.14 tests (course-path, test-users) | 40 tests |
| L4 | 2026-08-18 | 0.15 `next build` (2 essais, config ESLint) | ✅ BUILD_EXIT=0 |
| L5 | 2026-08-18 | Phase 1.1→1.6 (auth/cookie/middleware, progression, révisions) | ✅ |
| L6 | 2026-08-18 | Phase 1.4/1.8/1.9/1.10 (UI, eslint, scripts, docs) | ✅ |

---

*Document vivant — mis à jour à chaque tâche et à chaque fin de phase.*
