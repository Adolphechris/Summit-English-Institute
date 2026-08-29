# Summit English Institute

**Centre de formation numérique spécialisé en anglais professionnel, informatique et cybersécurité.**

[![Tests](https://img.shields.io/badge/tests-97%20passed-brightgreen)](https://github.com/Adolphechris/Summit-English-Institute)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://postgresql.org)

---

## 🎯 Objectif

Formation intensive de **20 jours** pour transformer l'anglais passif en anglais actif fonctionnel. Parcours structuré en **8 niveaux**, **434 questions** actives, évaluation finale et certification.

---

## 🚀 Stack Technique

| Couche | Technologie |
|---|---|
| Frontend | Next.js 14.2 App Router + React 18 + TypeScript strict |
| Style | Tailwind CSS + Design system institutionnel |
| Backend | API Routes Next.js (SSR + Server Components) |
| Base de données | PostgreSQL 16 (local : peer auth socket, prod : Neon.tech) |
| Authentification | JWT httpOnly cookie + bcrypt |
| Déploiement | Vercel (CI/CD automatique via GitHub) |

---

## 📚 Documentation

| Document | Description |
|---|---|
| [PROJECT_RULES.md](./PROJECT_RULES.md) | Règles fondamentales du projet |
| [CONSTITUTION.md](./CONSTITUTION.md) | Constitution du centre — document directeur |
| [PROGRESS_TRACKER.md](./PROGRESS_TRACKER.md) | Suivi des phases de développement |
| [CHANGELOG.md](./CHANGELOG.md) | Journal des modifications |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Structure des fichiers et dossiers |

---

## ⚡ Démarrage Rapide (Local)

### Prérequis
- Node.js 20+
- PostgreSQL 16+ (peer auth activée)
- `npm` ou `yarn`

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/Adolphechris/Summit-English-Institute.git
cd "Summit English Institute"

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs (DATABASE_URL, AUTH_SECRET)

# 4. Créer la base de données et appliquer les seeds
bash scripts/setup.sh

# 5. Lancer le serveur de développement
npm run dev
# → http://localhost:3000
```

### Vérification

```bash
npm test              # 97/97 tests
npx tsc --noEmit      # 0 erreur TypeScript
npm run lint          # 0 warning ESLint
npm run build         # Build production (44 routes)
node scripts/smoke-db.js  # 29/29 checks DB
```

---

## 🏗️ Structure du Projet

```
summit-english/
├── app/                    # Pages Next.js (App Router)
│   ├── (dashboard)/        # Layout protégé (sidebar nav)
│   ├── admin/              # Espace administration
│   ├── api/                # 30+ API routes
│   ├── dashboard/          # Tableau de bord apprenant
│   ├── course/             # Parcours 20 jours
│   ├── lessons/            # Leçons par niveau
│   ├── assessments/        # Évaluations
│   ├── review/             # Révisions espacées
│   ├── progress/           # Suivi progression
│   ├── profile/            # Profil + changement mot de passe
│   └── certificate/        # Certificat de completion
├── components/ui/          # Composants UI réutilisables
├── database/
│   ├── schema.sql          # Schéma PostgreSQL (25 tables)
│   ├── migrations/         # Migrations incrémentales
│   └── seeds/              # Données pédagogiques (434 questions)
├── services/               # Services métier (auth, progress, DB)
├── lib/                    # Utilitaires (apiClient, coursePath, config)
├── tests/                  # 97 tests (unit + integration)
│   ├── unit/
│   └── integration/        # full-user-journey, assessment-flow, api-security
└── scripts/                # Scripts d'administration
```

---

## 🔐 Variables d'Environnement

| Variable | Description | Exemple |
|---|---|---|
| `DATABASE_URL` | Connexion PostgreSQL | `postgresql://user:pass@host/db` |
| `AUTH_SECRET` | Secret JWT (min 32 chars) | `openssl rand -base64 48` |
| `AUTH_EXPIRY` | Durée de vie du token | `7d` |
| `NEXT_PUBLIC_APP_URL` | URL publique de l'app | `https://summit-english.vercel.app` |

> ⚠️ Ne jamais committer `.env.local`. Générer `AUTH_SECRET` avec `openssl rand -base64 48`.

---

## 📊 Contenu Pédagogique

| Niveau | Titre | Jours |
|---|---|---|
| 1 | English Sentence Foundations | 1-2 |
| 2 | Functional Verb System | 3-5 |
| 3 | Functional Grammar | 6-7 |
| 4 | Active Conversation | 8-9 |
| 5 | Everyday & Professional English | 10-11 |
| 6 | IT English | 12-14 |
| 7 | Cybersecurity English | 15-17 |
| 8 | University & Professional Integration | 18-20 |

- **434 questions** actives (QCM, fill-in-the-blank, transformation, scenario)
- **41 compétences** (skills) évaluées
- **Évaluation finale** (id=999) → Certificat de completion
- **Répétition espacée** : compétences < 75% remises en révision automatiquement

---

## 👤 Comptes de Test

| Email | Mot de passe | Rôle |
|---|---|---|
| `admin@summit.local` | `Admin123!` | admin |
| `student@summit.local` | `Student123!` | student |

---

## 🚀 Déploiement Production

### Neon.tech (PostgreSQL Cloud) + Vercel

1. Créer un projet sur [neon.tech](https://neon.tech) → copier la `DATABASE_URL`
2. Appliquer le schéma : `psql "$NEON_URL" -f database/schema.sql`
3. Appliquer les seeds dans l'ordre (voir `scripts/setup.sh`)
4. Sur [vercel.com](https://vercel.com) → importer `Adolphechris/Summit-English-Institute`
5. Configurer les variables d'environnement (voir tableau ci-dessus)
6. Déployer → CI/CD automatique sur chaque push `main`

---

## 🧪 Tests

```bash
npm test                    # Tous les tests (97/97)
npm test -- --watch         # Mode watch
npm test -- --coverage      # Avec couverture de code
```

**9 suites** couvrant :
- Authentification & sécurité API
- Parcours complet apprenant (diagnostic → certification)
- Calcul de score et seuil 75%
- Maîtrise des compétences et répétition espacée
- Gestion du parcours 20 jours

---

## 📄 Licence

Usage interne — Summit English Institute. Tous droits réservés.
