# CHANGELOG — Summit English Institute

Toutes les évolutions majeures du projet sont consignées dans ce fichier.

---

## [2.0.0] — 2026-08-31

### 🚀 Refonte Globale & Remédiation du Contenu (Version 2.0)

#### 📚 Contenu Pédagogique & Densité (Articles 44 à 49 de la Constitution v2.0)
- **80 Leçons Denses Uniques** : Réécriture et création intégrale des 8 niveaux (N1 à N8, 10 leçons/niveau) avec une épaisseur moyenne de **2 500+ caractères d'explication par leçon**.
- **Création Intégrale du Niveau 5** : 10 leçons denses créées (Indirect Questions, Third Conditional, Gerund vs Infinitive, Architecture Monolith vs Microservices, SLA/RTO/RPO, Incident Timelines).
- **Banque Massive de 920 Questions QCM Uniques** :
  - Elimination de 100% des doublons de texte de questions.
  - 100% des questions rattachées aux leçons (IDs 101-180) et aux 41 compétences du référentiel.
  - 100% des QCM dotés de 4 options distinctes, d'une réponse exacte et d'une explication pédagogique.

#### 🛠️ Ingénierie & Outils Qualité
- **Validateur Automatique (`scripts/content-validator.js`)** : Intégration de 30+ règles de contrôle qualité bloquantes en CI GitHub Actions.
- **Migration Cloud Serverless** : Bascule intégrale de PostgreSQL vers **Google Cloud Firestore**.
- **Smoke Test Cloud (`scripts/smoke-firestore.js`)** : 8 points de contrôle automatisés pour vérifier l'intégrité de la base en production.
- **Fail-Safe Auth Security** : Correction du handler `AUTH_SECRET` pour empêcher l'échec de build pendant la compilation Next.js tout en maintenant un blocage strict en production.

#### 🌐 Déploiement & SEO
- Déploiement en production du domaine officiel **`https://english.iumorave-ac.org`**.
- Métadonnées OpenGraph, Twitter Cards et schéma JSON-LD `EducationalOrganization` intégrés.
- Fichiers `robots.txt` et `sitemap.xml` dynamiques et validés pour l'indexation Google Search Console.
