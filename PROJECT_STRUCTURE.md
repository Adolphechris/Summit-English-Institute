# ============================================================================
# Summit English Institute — Structure du Projet
# (structure RÉELLE du dépôt — mise à jour le 19/08/2026)
# ============================================================================

```
summit-english-institute/
├── .env.example                 # Variables d'environnement (template versionné)
├── .env.local                   # Variables locales (NE PAS COMMITTER — ignoré)
├── .gitignore
├── package.json                 # Dépendances et scripts
├── tsconfig.json                # TypeScript strict + chemins absolus @/*
├── next.config.js               # Next.js (CORS API restreint)
├── tailwind.config.js
├── postcss.config.js
├── jest.config.js               # Jest + ts-jest + moduleNameMapper @/*
├── .eslintrc.json               # ESLint next/core-web-vitals
├── middleware.ts                # Protection des routes (cookie httpOnly)
│
├── app/                         # App Router Next.js
│   ├── layout.tsx / page.tsx / loading.tsx / error.tsx / not-found.tsx / globals.css
│   ├── (dashboard)/layout.tsx   # Layout authentifié (sidebar + header mobile)
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── dashboard/page.tsx
│   ├── course/page.tsx
│   ├── lessons/page.tsx + lessons/[id]/page.tsx
│   ├── practice/page.tsx
│   ├── assessments/page.tsx + assessments/[id]/page.tsx
│   ├── review/page.tsx
│   ├── progress/page.tsx
│   ├── profile/page.tsx
│   ├── diagnostic/page.tsx
│   ├── final-assessment/page.tsx + final-assessment/take/page.tsx
│   ├── certificate/[id]/page.tsx
│   │
│   └── api/                     # API Routes (22)
│       ├── auth/ login · register · logout · me
│       ├── dashboard · course/path · lessons(+[id]) · questions · practice
│       ├── progress · review(+master) · assessments(+[id] · submit)
│       ├── diagnostic/ questions · submit
│       ├── final-assessment/ route · questions · submit
│       └── certificate/[id]
│
├── components/ui/               # Design system (9 composants)
│   ├── Button · Card · Badge · Input · Loading · ErrorMessage
│   ├── Modal · ProgressBar · Select
│
├── services/                    # Couche métier (jamais appelée depuis le client)
│   ├── auth/api.ts              # Inscription, connexion, sessions JWT, révocation
│   ├── database/client.ts       # Pool pg + query/execute/queryOne/withTransaction
│   ├── assessment/engine.ts     # Sélection cumulative + création d'évaluation
│   └── progress/                # update.ts (progression) + repetition.ts (révisions)
│
├── lib/                         # Helpers serveur & client
│   ├── config.ts                # Config centralisée + fail-closed des secrets
│   ├── constants.ts · utils.ts · validate.ts · rateLimit.ts
│   ├── coursePath.ts            # Mapping 20 jours → 8 niveaux
│   └── apiClient.ts             # Client API navigateur (cookie httpOnly)
│
├── types/index.ts               # Types TypeScript globaux
│
├── content/                     # Contenu pédagogique séparé du code
│   └── sample-content.json
│
├── database/
│   ├── schema.sql               # Schéma complet (22 tables + triggers)
│   ├── migrations/              # Migrations versionnées
│   │   └── 001_final_assessment_seed.sql
│   └── seeds/                   # Données initiales (idempotentes)
│       ├── initial_data.sql · test_users.sql · enriched_content.sql
│       ├── levels_3_to_8_content.sql · massive_questions.sql
│
├── tests/                       # Jest (8 suites · 60 tests)
│   ├── unit/                    # scoring · progression · course-path · test-users
│   │                            # auth-api · rate-limit
│   └── integration/             # assessment-flow · api-security
│
├── scripts/
│   ├── setup.sh · migrate.sh · backup.sh
│   ├── fix-answers.js · update-*.sh
│
├── .github/workflows/ci.yml     # CI (tsc · eslint · jest · next build)
│
├── PROJECT_RULES.md · PROJECT_STRUCTURE.md · CONSTITUTION.md
├── CAHIER_DES_CHARGES_*.md (8 tranches)
├── README.md · CHANGELOG.md · TODO.md · PROGRESS_TRACKER.md
└── backups/                     # Sauvegardes pg_dump (script backup.sh)
```

## PRINCIPES D'ORGANISATION

1. **Séparation contenu / code** — le contenu pédagogique (`content/`, `database/seeds/`)
   est indépendant du code applicatif : ajouter une leçon, corriger une erreur,
   ajouter 100 questions ne nécessite aucune modification de `app/` ou `services/`.
2. **Services centralisés** — toutes les communications avec la base de données
   passent par `services/database/client.ts` ; l'authentification par
   `services/auth/api.ts` ; la logique pédagogique par `services/progress/`.
3. **API routes = minces, services = métier** — les route handlers valident
   l'authentification (via `getRequestUserId`) puis délèguent aux services.
4. **Types stricts** — `types/index.ts` centralise les structures importantes.
5. **Tests organisés par niveau** — `tests/unit/` (fonctions isolées),
   `tests/integration/` (flux serveur/API simulés).

---

*Cette structure évoluera avec le projet.*
