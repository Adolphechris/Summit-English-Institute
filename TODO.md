# TODO MAÎTRE — Summit English Institute

> Document de suivi du projet. Chaque tâche a un état, des dépendances et des critères de validation.
> Une tâche est DONE uniquement lorsque : fonctionnalité réalisée + testée + validée.

---

## ÉTATS

| État | Signification |
|---|---|
| BACKLOG | Pas commencée |
| READY | Prête à être démarrée |
| IN PROGRESS | En cours de réalisation |
| BLOCKED | Bloquée par une dépendance |
| REVIEW | Terminée, en attente de vérification |
| DONE | Validée et terminée |

---

## JALONS

| Jalon | Description |
|---|---|
| M0 | Architecture approuvée |
| M1 | Prototype fonctionnel |
| M2 | MVP complet (cycle diagnostic → niveau → certification) |
| M3 | Moteur pédagogique complet |
| M4 | Programme des 20 jours complet |
| M5 | Tests validés |
| M6 | Production |

---

## PHASE 1 — FONDATIONS

### T-001 : Initialiser le projet Next.js
- **État** : DONE
- **Dépendances** : Aucune
- **Critères** : Projet créé, `npm run dev` fonctionne, première page affichée
- **Jalon** : M1

### T-002 : Configurer TypeScript strict
- **État** : DONE
- **Dépendances** : T-001
- **Critères** : `tsc --noEmit` passe sans erreur, chemins absolus configurés
- **Jalon** : M1

### T-003 : Configurer Git et GitHub
- **État** : DONE
- **Dépendances** : Aucune
- **Critères** : Dépôt créé, premier commit, `.gitignore` configuré
- **Jalon** : M0

### T-004 : Créer la structure de dossiers
- **État** : DONE
- **Dépendances** : T-001
- **Critères** : Dossiers `components/`, `features/`, `lib/`, `services/`, `types/`, `data/`, `content/`, `database/`, `docs/`, `tests/`, `assets/` créés
- **Jalon** : M1

### T-005 : Créer le design system de base
- **État** : BACKLOG
- **Dépendances** : T-001, T-002
- **Critères** : Variables CSS, palette, typographie, composants Button/Card/ProgressBar fonctionnels
- **Jalon** : M1

### T-006 : Configurer les variables d'environnement
- **État** : BACKLOG
- **Dépendances** : T-003
- **Critères** : `.env.example` créé, `.env.local` ignoré par Git
- **Jalon** : M0

---

## PHASE 2 — BASE DE DONNÉES

### T-101 : Configurer PostgreSQL
- **État** : BACKLOG
- **Dépendances** : T-004, T-006
- **Critères** : Base de données accessible, connexion testée
- **Jalon** : M1

### T-102 : Créer le schéma complet
- **État** : DONE
- **Dépendances** : Aucune (schéma SQL prêt)
- **Critères** : `schema.sql` créé, 22 tables + fonctions + triggers + données initiales
- **Jalon** : M0

### T-103 : Configurer les migrations
- **État** : BACKLOG
- **Dépendances** : T-101, T-102
- **Critères** : Système de migrations opérationnel, migration initiale appliquée
- **Jalon** : M1

### T-104 : Créer les librairies d'accès aux données
- **État** : BACKLOG
- **Dépendances** : T-103
- **Critères** : Requêtes CRUD basiques fonctionnelles pour chaque table principale
- **Jalon** : M1

---

## PHASE 3 — AUTHENTIFICATION

### T-201 : Implémenter l'inscription
- **État** : DONE
- **Dépendances** : T-104
- **Critères** : Formulaire d'inscription fonctionnel, mot de passe hashé, utilisateur créé en base
- **Jalon** : M1

### T-202 : Implémenter la connexion
- **État** : DONE
- **Dépendances** : T-201
- **Critères** : Login fonctionnel, session créée, redirection vers dashboard
- **Jalon** : M1

### T-203 : Implémenter la déconnexion
- **État** : BACKLOG
- **Dépendances** : T-202
- **Critères** : Déconnexion fonctionnelle, session supprimée, redirection vers accueil
- **Jalon** : M1

### T-204 : Protéger les routes
- **État** : BACKLOG
- **Dépendances** : T-202
- **Critères** : Accès non autorisé redirigé vers login, permissions par rôle vérifiées
- **Jalon** : M1

### T-205 : Page de profil
- **État** : BACKLOG
- **Dépendances** : T-202
- **Critères** : Affichage du profil, modification des informations basiques
- **Jalon** : M2

---

## PHASE 4 — INTERFACE DE BASE

### T-301 : Créer le layout principal
- **État** : BACKLOG
- **Dépendances** : T-005
- **Critères** : Header, navigation, footer, responsive mobile/desktop
- **Jalon** : M1

### T-302 : Créer la page d'accueil
- **État** : BACKLOG
- **Dépendances** : T-301
- **Critères** : Identité du centre, objectif, accès connexion
- **Jalon** : M1

### T-303 : Créer le dashboard
- **État** : BACKLOG
- **Dépendances** : T-302
- **Critères** : Progression, niveau actuel, continue learning, weak/strong areas, review
- **Jalon** : M2

### T-304 : Créer la page "My Course"
- **État** : BACKLOG
- **Dépendances** : T-303
- **Critères** : Vue des 20 jours, 4 états visuels (completed/current/available/locked)
- **Jalon** : M2

### T-305 : Créer la page de niveau
- **État** : BACKLOG
- **Dépendances** : T-304
- **Critères** : Titre, objectif, compétences, progression, statut
- **Jalon** : M2

### T-306 : Créer la page de module
- **État** : BACKLOG
- **Dépendances** : T-305
- **Critères** : Titre, objectif, leçons, exercices, évaluation
- **Jalon** : M2

### T-307 : Créer la page de leçon
- **État** : BACKLOG
- **Dépendances** : T-306
- **Critères** : Header, objective, explanation, examples, IT context, practice, quick check, summary
- **Jalon** : M2

---

## PHASE 5 — CONTENU PÉDAGOGIQUE

### T-401 : Créer le système de chargement du contenu
- **État** : BACKLOG
- **Dépendances** : T-104
- **Critères** : Chargement depuis JSON/DB, mise en cache, séparation contenu/code
- **Jalon** : M2

### T-402 : Créer le contenu du Niveau 1
- **État** : BACKLOG
- **Dépendances** : T-401
- **Critères** : Modules, leçons, exemples, vocabulaire, exercices pour Sentence Foundations
- **Jalon** : M2

### T-403 : Créer le contenu du Niveau 2 (Conjugaison)
- **État** : BACKLOG
- **Dépendances** : T-402
- **Critères** : Present, Past, Future, Modals, Irregular verbs
- **Jalon** : M3

### T-404 : Créer le contenu du Niveau 3 (Grammaire)
- **État** : BACKLOG
- **Dépendances** : T-403
- **Critères** : Articles, prépositions, comparatifs, quantificateurs, conditionnels
- **Jalon** : M3

### T-405 : Créer le contenu du Niveau 4 (Conversation)
- **État** : BACKLOG
- **Dépendances** : T-404
- **Critères** : Situations conversationnelles, production active
- **Jalon** : M3

### T-406 : Créer le contenu du Niveau 5 (Professional)
- **État** : BACKLOG
- **Dépendances** : T-405
- **Critères** : Everyday expressions, phrasal verbs, professional communication
- **Jalon** : M4

### T-407 : Créer le contenu du Niveau 6 (IT English)
- **État** : BACKLOG
- **Dépendances** : T-406
- **Critères** : Hardware, Software, OS, Files, Networking, Databases, Cloud, Development, DevOps, Support
- **Jalon** : M4

### T-408 : Créer le contenu du Niveau 7 (Cybersecurity)
- **État** : BACKLOG
- **Dépendances** : T-407
- **Critères** : Security fundamentals, operations, identity/access, malware/attacks, action verbs
- **Jalon** : M4

### T-409 : Créer le contenu du Niveau 8 (Academic/Professional)
- **État** : BACKLOG
- **Dépendances** : T-408
- **Critères** : Academic English, professional communication, integration
- **Jalon** : M4

---

## PHASE 6 — ÉVALUATIONS

### T-501 : Créer le moteur de questions
- **État** : BACKLOG
- **Dépendances** : T-104
- **Critères** : CRUD questions, association compétences, recherche par tags
- **Jalon** : M2

### T-502 : Créer le moteur d'évaluation
- **État** : BACKLOG
- **Dépendances** : T-501
- **Critères** : Sélection questions selon critères, génération évaluation, calcul score
- **Jalon** : M3

### T-503 : Créer la page d'évaluation
- **État** : BACKLOG
- **Dépendances** : T-502, T-307
- **Critères** : Affichage question, navigation, progression, sauvegarde automatique
- **Jalon** : M3

### T-504 : Implémenter le seuil de 75%
- **État** : BACKLOG
- **Dépendances** : T-503
- **Critères** : 74% = échec, 75% = réussite, 76% = réussite, zéro ambiguïté
- **Jalon** : M3

### T-505 : Créer la page de résultats
- **État** : BACKLOG
- **Dépendances** : T-504
- **Critères** : Score, statut, erreurs, recommandations, accès aux révisions
- **Jalon** : M3

### T-506 : Créer les évaluations de niveau
- **État** : BACKLOG
- **Dépendances** : T-505
- **Critères** : Couverture multi-modules, mélange types de questions, anciennes notions, distribution configurable
- **Jalon** : M3

---

## PHASE 7 — PROGRESSION ET MOTEUR PÉDAGOGIQUE

### T-601 : Implémenter le moteur de progression
- **État** : BACKLOG
- **Dépendances** : T-104
- **Critères** : Calcul progression par leçon, module, niveau, formation ; persistance ; pas de double comptabilisation
- **Jalon** : M3

### T-602 : Implémenter le verrouillage/déblocage
- **État** : BACKLOG
- **Dépendances** : T-601, T-504
- **Critères** : Verrouillage si score < 75%, déblocage si score >= 75%, affichage condition
- **Jalon** : M3

### T-603 : Implémenter le calcul de maîtrise
- **État** : BACKLOG
- **Dépendances** : T-601, T-502
- **Critères** : Mastery distinct de progression, confirmation sur plusieurs tentatives, récence prise en compte
- **Jalon** : M3

### T-604 : Implémenter la répétition espacée
- **État** : BACKLOG
- **Dépendances** : T-603
- **Critères** : Intervalles configurables, révision après erreur, adaptation selon performance
- **Jalon** : M3

### T-605 : Créer la page Review
- **État** : BACKLOG
- **Dépendances** : T-604
- **Critères** : Due now, weak areas, recent mistakes, scheduled reviews
- **Jalon** : M3

### T-606 : Créer la page Progress
- **État** : BACKLOG
- **Dépendances** : T-603
- **Critères** : Overall, by level, by domain, by skill, historique
- **Jalon** : M3

---

## PHASE 8 — DIAGNOSTIC

### T-701 : Créer le moteur de diagnostic
- **État** : BACKLOG
- **Dépendances** : T-502
- **Critères** : Test initial multi-domaines, scoring par compétence, génération profil
- **Jalon** : M2

### T-702 : Créer la page de diagnostic
- **État** : BACKLOG
- **Dépendances** : T-701, T-303
- **Critères** : Interface claire, non intimidante, progression pendant le test
- **Jalon** : M2

### T-703 : Créer la page de résultats du diagnostic
- **État** : BACKLOG
- **Dépendances** : T-702
- **Critères** : Graphiques domaines, forces/faiblesses, recommandations, starting point
- **Jalon** : M2

---

## PHASE 9 — CERTIFICATION

### T-801 : Créer l'évaluation finale
- **État** : BACKLOG
- **Dépendances** : T-506
- **Critères** : Cumulative sur tous les domaines, couverture complète, seuil 75%
- **Jalon** : M4

### T-802 : Créer la page de proclamation
- **État** : BACKLOG
- **Dépendances** : T-801
- **Critères** : Félicitations, score final, progression 100%, domaines maîtrisés, distinction completion/mastery
- **Jalon** : M4

### T-803 : Créer l'attestation
- **État** : BACKLOG
- **Dépendances** : T-802
- **Critères** : Nom, formation, score, date, identifiant, statut interne, imprimable
- **Jalon** : M4

---

## PHASE 10 — ADMINISTRATION

### T-901 : Créer le dashboard admin
- **État** : BACKLOG
- **Dépendances** : T-104
- **Critères** : Vue d'ensemble, statistiques, état du système
- **Jalon** : M4

### T-902 : Créer la gestion du contenu (CRUD)
- **État** : BACKLOG
- **Dépendances** : T-401, T-501
- **Critères** : Créer/modifier/supprimer leçons, questions, compétences, vocabulaire
- **Jalon** : M4

### T-903 : Créer la gestion des utilisateurs
- **État** : BACKLOG
- **Dépendances** : T-901, T-201
- **Critères** : Liste, création, modification, suspension d'utilisateurs
- **Jalon** : M4

---

## PHASE 11 — BANQUE DE QUESTIONS MASSIVE

### T-1001 : Produire les questions Niveau 1
- **État** : BACKLOG
- **Dépendances** : T-402, T-501
- **Critères** : Minimum 50 questions par compétence clé, diversité de types
- **Jalon** : M4

### T-1002 : Produire les questions Niveau 2-4
- **État** : BACKLOG
- **Dépendances** : T-403, T-404, T-405, T-1001
- **Critères** : Minimum 50 questions par compétence, conjugaison, grammaire, conversation
- **Jalon** : M4

### T-1003 : Produire les questions Niveau 5-6 (IT)
- **État** : BACKLOG
- **Dépendances** : T-406, T-407, T-1002
- **Critères** : Minimum 50 questions par sous-domaine IT
- **Jalon** : M4

### T-1004 : Produire les questions Niveau 7 (Cybersecurity)
- **État** : BACKLOG
- **Dépendances** : T-408, T-1003
- **Critères** : Minimum 50 questions par sous-domaine cybersecurity
- **Jalon** : M4

### T-1005 : Produire les questions Niveau 8 (Academic/Professional)
- **État** : BACKLOG
- **Dépendances** : T-409, T-1004
- **Critères** : Minimum 50 questions pour situations académiques et professionnelles
- **Jalon** : M4

---

## PHASE 12 — TESTS

### T-1101 : Tests unitaires (moteur de score)
- **État** : BACKLOG
- **Dépendances** : T-502, T-504
- **Critères** : 74% = fail, 75% = pass, 76% = pass, edge cases testés
- **Jalon** : M5

### T-1102 : Tests unitaires (progression)
- **État** : BACKLOG
- **Dépendances** : T-601
- **Critères** : Calcul progression correct, pas de double comptabilisation, persistance
- **Jalon** : M5

### T-1103 : Tests unitaires (verrouillage)
- **État** : BACKLOG
- **Dépendances** : T-602
- **Critères** : Verrouillage/déblocage selon score, affichage condition correct
- **Jalon** : M5

### T-1104 : Tests unitaires (révision)
- **État** : BACKLOG
- **Dépendances** : T-604
- **Critères** : Erreurs détectées, priorité correcte, réapparition programmée
- **Jalon** : M5

### T-1105 : Tests d'intégration (parcours complet)
- **État** : BACKLOG
- **Dépendances** : T-701 à T-803
- **Critères** : Inscription → diagnostic → leçon → exercice → évaluation → validation → progression → examen final → certificat
- **Jalon** : M5

### T-1106 : Tests responsive
- **État** : BACKLOG
- **Dépendances** : T-301 à T-803
- **Critères** : Petit smartphone, grand smartphone, tablette, desktop
- **Jalon** : M5

### T-1107 : Tests de sécurité
- **État** : BACKLOG
- **Dépendances** : T-204
- **Critères** : Accès non autorisé bloqué, permissions vérifiées, secrets protégés
- **Jalon** : M5

### T-1108 : Tests pédagogiques
- **État** : BACKLOG
- **Dépendances** : T-1001 à T-1005
- **Critères** : Contenu correct, utile, exercices testent la compétence, réutilisable
- **Jalon** : M5

---

## PHASE 13 — DÉPLOIEMENT

### T-1201 : Configurer Vercel
- **État** : BACKLOG
- **Dépendances** : T-1108
- **Critères** : Déploiement automatique depuis GitHub, variables d'environnement configurées
- **Jalon** : M6

### T-1202 : Configurer la base de données de production
- **État** : BACKLOG
- **Dépendances** : T-103, T-1201
- **Critères** : Base PostgreSQL managée, migrations appliquées, sauvegarde configurée
- **Jalon** : M6

### T-1203 : Déployer en production
- **État** : BACKLOG
- **Dépendances** : T-1201, T-1202
- **Critères** : Application accessible, HTTPS fonctionnel, données persistantes
- **Jalon** : M6

### T-1204 : Vérification finale (ZERO CONFUSION)
- **État** : BACKLOG
- **Dépendances** : T-1203
- **Critères** : Où suis-je ? Que dois-je faire ? Pourquoi ? Score ? Révision ? Suite ?
- **Jalon** : M6

### T-1205 : Documentation de maintenance
- **État** : BACKLOG
- **Dépendances** : T-1203
- **Critères** : Procédures de sauvegarde, rollback, surveillance, mise à jour
- **Jalon** : M6

---

## LÉGENDE DE PRIORITÉ

| Priorité | Signification |
|---|---|
| P0 | Bloquant — le projet ne peut pas continuer sans cela |
| P1 | Important — nécessaire pour le MVP |
| P2 | Amélioration — utile mais pas bloquant |
| P3 | Futur — pour après le MVP |

---

## ORDRE D'EXÉCUTION

```
M0 : Architecture (T-003, T-102, T-006, PROJECT_RULES.md)
  ↓
M1 : Fondations (T-001, T-002, T-004, T-005, T-101, T-103, T-104, T-201 à T-205, T-301 à T-307)
  ↓
M2 : MVP (T-401 à T-403, T-701 à T-703, T-303, T-304, T-1001)
  ↓
M3 : Moteur pédagogique (T-404 à T-409, T-501 à T-506, T-601 à T-606, T-1002)
  ↓
M4 : Programme complet (T-407 à T-409, T-801 à T-803, T-901 à T-903, T-1003 à T-1005)
  ↓
M5 : Tests (T-1101 à T-1108)
  ↓
M6 : Production (T-1201 à T-1205)
```

---

*Document vivant — mis à jour régulièrement pendant le développement*
