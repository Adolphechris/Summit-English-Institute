<<<<<<< HEAD
# Summit-English-Institute
English for Technology Cybersecurity
=======
# Summit English Institute

Centre de formation numérique spécialisé en anglais professionnel, informatique et cybersécurité.

## 🎯 Objectif

Formation intensive de 20 jours maximum pour transformer l'anglais passif en anglais actif fonctionnel.

## 📚 Documentation

| Document | Description |
|---|---|
| [PROJECT_RULES.md](./PROJECT_RULES.md) | Règles fondamentales du projet (référence pour toute modification) |
| [CONSTITUTION.md](./CONSTITUTION.md) | Constitution du centre — document directeur suprême |
| [TODO.md](./TODO.md) | Suivi des tâches et jalons |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Structure du projet |
| [CHANGELOG.md](./CHANGELOG.md) | Journal des modifications |

## 🚀 Stack technique

- **Frontend** : Next.js 14 + React + TypeScript
- **Style** : CSS avec design system institutionnel
- **Backend** : API Routes Next.js
- **Base de données** : PostgreSQL
- **Authentification** : JWT + bcrypt
- **Déploiement** : Vercel (plan Hobby)

## 📋 Pré-requis

- Node.js 18+
- PostgreSQL 14+
- Git

## 🛠️ Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-utilisateur/summit-english-institute.git
cd summit-english-institute

# Copier les variables d'environnement
cp .env.example .env.local

# Installer les dépendances
npm install

# Appliquer le schéma et les seeds
psql -U postgres -c "CREATE DATABASE summit_english;"
psql -U postgres -d summit_english -f database/schema.sql
psql -U postgres -d summit_english -f database/seeds/initial_data.sql
psql -U postgres -d summit_english -f database/seeds/test_users.sql

# Démarrer en développement
npm run dev
```

Puis ouvrir http://localhost:3000

## 🧪 Comptes de test

| Email | Mot de passe | Rôle |
|---|---|---|
| test@summit-english.local | test1234 | Étudiant |
| admin@summit-english.local | admin1234 | Administrateur |

## 📁 Structure du projet

```
app/                      # Pages Next.js App Router
components/ui/            # Composants d'interface réutilisables
services/                 # Couches de service (DB, auth, contenu, évaluation)
types/                    # Types TypeScript
content/                  # Contenu pédagogique séparé du code
database/                 # Schéma, migrations, seeds
docs/                     # Documentation
tests/                    # Tests unitaires, intégration, E2E
lib/                      # Utilitaires, constantes, configuration
assets/                   # Images, fonts, icons
scripts/                  # Scripts utilitaires
middleware.ts             # Middleware d'authentification
```

## 🎓 Fonctionnalités

### Version actuelle (MVP)
- ✅ Authentification (inscription, connexion, déconnexion)
- ✅ Dashboard avec progression et statistiques
- ✅ Parcours des 20 jours
- ✅ Pages de leçons
- ✅ Système d'évaluation avec seuil 75%
- ✅ Page de pratique
- ✅ Système de révision
- ✅ Suivi de progression
- ✅ Page de profil

### À venir
- ⏳ Contenu pédagogique complet des 20 jours
- ⏳ Banque de questions massive
- ⏳ Évaluation finale et certification
- ⏳ Administration complète
- ⏳ IA assistée (Gemini)
- ⏳ Reconnaissance vocale

## 🧩 Architecture

### Couches fonctionnelles
1. **Contenu** → Ce qui doit être appris
2. **Moteur pédagogique** → Ce qui détermine quand et comment apprendre
3. **Moteur d'évaluation** → Ce qui mesure la maîtrise
4. **Profil et progression** → Ce qui conserve l'historique
5. **Interface** → Ce qui permet d'interagir avec le système

### Principes clés
- Production active constamment sollicitée
- Évaluation massive et cumulative
- Seuil de validation à 75%
- Répétition espacée
- Architecture multi-apprenants dès la conception

## 🔒 Sécurité

- Mots de passe hashés avec bcryptjs
- Authentification par JWT dans un **cookie httpOnly** (jamais en `localStorage`)
- **Révocation de session** : le logout supprime la session en base, le token devient invalide
- **Fail-closed** : l'application refuse de démarrer en production sans `AUTH_SECRET` / `DATABASE_URL`
- Rate-limiting du login et de l'inscription (anti brute force / anti-spam)
- Vérification des permissions côté serveur
- Validation des entrées
- Variables d'environnement pour les secrets

## 📝 Licence

Projet interne — Summit English Institute

---

*Construit avec Next.js, PostgreSQL et ❤️*
>>>>>>> 0c421f9 (chore: initial commit — MVP Summit English Institute + durcissement sécurité)
