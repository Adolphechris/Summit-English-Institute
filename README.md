# Summit English Institute

> **Plateforme Numérique de Formation en Anglais Informatique, Cybersécurité et Professionnel**
> Version : 2.0 (Post-Remédiation & Conforme à la Constitution v2.0)

[![Build & Test](https://github.com/Adolphechris/Summit-English-Institute/actions/workflows/ci.yml/badge.svg)](https.github.com/Adolphechris/Summit-English-Institute/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Production URL](https://img.shields.io/badge/Production-english.iumorave--ac.org-green.svg)](https://english.iumorave-ac.org)

---

## 📌 Présentation

**Summit English Institute** est une application web moderne et intensive conçue pour transformer la compréhension passive de l'anglais en une compétence active de production orale et écrite, ciblée sur les besoins des étudiants et professionnels en **Informatique**, **DevOps**, **Cloud Infrastructure** et **Cybersécurité**.

### 🌟 Chiffres Clés de la Plateforme (Version 2.0) :
- **8 Niveaux CEFR (N1 à N8)** : Du niveau Débutant (A1) au niveau Executive IT & Leadership (C2).
- **80 Leçons Denses Uniques** (10 leçons par niveau) : Explications ultra-détaillées (≥ 1 800 à 2 600+ caractères/leçon), 7 exemples contextualisés IT, 8 à 12 mots de vocabulaire métier, 5 expressions professionnelles, 4 activités d'application et 1 mini-quiz.
- **920 Questions QCM Uniques** : 100% rattachées aux leçons et aux 41 compétences du référentiel, avec 4 options de réponse et des explications pédagogiques.
- **41 Compétences Pédagogiques** répertoriées et mesurables.
- **9 Évaluations d'Examen** : 8 évaluations de niveau + 1 examen de certification finale (ID 999).

---

## 🏗️ Architecture Technique

La plateforme repose sur une stack moderne, serverless, hautement disponible et performante :

- **Frontend / Framework** : Next.js 14 (App Router, Server Components & Client Widgets).
- **Style / UI** : TailwindCSS, Lucide Icons, Shadcn UI, Design System responsive (Mobile / Tablette / Desktop).
- **Base de Données Cloud** : Google Cloud Firestore (NoSQL Serverless, 0$ de coût fixe, haute disponibilité).
- **Moteur d'IA** : Google Gemini API (Firebase AI Logic) pour l'évaluation interactive et les explications.
- **Authentification & Sécurité** : NextAuth.js v5 (JWT sécurisé, contrôle RBAC `admin` / `student`).
- **Hébergement & CDN** : Vercel Edge Network (Domaine officiel : `https://english.iumorave-ac.org`).

---

## 🛠️ Commandes de Contrôle et de Gestion

### 1. Validation de Contenu (Validator Automatique — Article 48)
```bash
# Vérifier la conformité de l'intégralité des 80 leçons et 920 questions (Gate Full)
node scripts/content-validator.js --full

# Générer les métriques vivantes dans content/inventory.json
node scripts/content-validator.js --json
```

### 2. Synchronisation & Smoke Test Cloud Firestore
```bash
# Injecter l'intégralité du seed (80 leçons, 920 questions, 41 compétences) dans Firestore Cloud
npm run firestore:seed

# Exécuter le test de santé de la base de données cloud (8 points de contrôle)
npm run firestore:smoke
```

### 3. Compilation & Suite de Tests Automatisés
```bash
# Contrôle strict du typage TypeScript
npx tsc --noEmit

# Exécution des 97 tests d'intégration et unitaires Jest
npm test
```

---

## 🔑 Comptes de Démo & Test (Environnement Seed)

| Rôle | Email | Mot de passe | Description |
|---|---|---|---|
| **Administrateur** | `admin@summit.edu` | `Admin2026!` | Accès complet au dashboard de gestion et d'audit |
| **Apprenant (Student)** | `student@summit.edu` | `Student2026!` | Parcours de formation et passage des évaluations |

---

## 📜 Licence & Droits

Ce projet est sous licence **MIT**. Développé pour le centre de formation Summit English Institute.
