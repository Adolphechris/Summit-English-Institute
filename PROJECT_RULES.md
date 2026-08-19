# PROJECT_RULES.md — Summit English Institute

> Document maître de référence. Toute modification fondamentale du projet doit être comparée à ce document avant d'être appliquée.

---

## 1. IDENTITÉ

**Nom** : Summit English Institute  
**Nature** : Centre de formation numérique spécialisé en anglais professionnel, informatique et cybersécurité  
**Objectif** : Transformer l'anglais passif en anglais actif fonctionnel en 20 jours maximum  
**Public initial** : Fondateur-apprenant, puis ouverture multi-apprenants  
**Statut** : Projet initialement personnel, architecture prévue pour évolution future

---

## 2. RÈGLES NON NÉGOCIABLES (Constitution, Titre XIV)

1. La formation répond à un besoin réel et clairement identifié.
2. L'utilisation réelle de l'anglais prime sur l'accumulation théorique.
3. La production active est constamment sollicitée.
4. La conjugaison enseignée est prioritairement fonctionnelle.
5. La grammaire est sélectionnée selon son utilité.
6. L'anglais informatique est une matière centrale.
7. La cybersécurité constitue une spécialisation linguistique progressive.
8. Les connaissances sont régulièrement réactivées.
9. L'évaluation est massive, variée et cumulative.
10. **Seuil normal de validation : 75 %.** Aucune exception sans décision explicite et documentée.
11. Une faiblesse importante entraîne de la remédiation.
12. La progression est visible et mesurable.
13. La formation principale ne dépasse pas 20 jours.
14. Le système est utilisable par son premier apprenant avant d'être ouvert au public.
15. L'architecture anticipe l'arrivée future d'autres apprenants.
16. Le cahier des charges respecte la Constitution.
17. Toute modification fondamentale de la Constitution est explicitement décidée et documentée avant d'être appliquée.

---

## 3. TECHNOLOGIES RETENUES

| Couche | Technologie | Raison |
|---|---|---|
| Frontend | Next.js + React + TypeScript | Moderne, typage fort, écosystème riche, déploiement Vercel |
| Style | CSS / système de composants | Minimalisme, pas de dépendance inutile |
| Backend | API Routes Next.js + services | Intégration, séparation des opérations sensibles |
| Base de données | PostgreSQL | Relationnel, robuste, mature, évolutif |
| Authentification | À définir selon compatibilité PostgreSQL | Sécurisée, côté serveur |
| Déploiement | Vercel (plan Hobby) | Gratuit pour usage personnel/non commercial |
| IA (futur) | Google AI / Gemini | Niveau gratuit disponible, quotas à respecter |
| Versioning | Git + GitHub | Historique, sauvegarde, collaboration |
| Éditeur | VS Code + Antigravity 2.0 | Environnement de développement |

**Principe** : Aucune dépendance n'est ajoutée simplement parce qu'elle est populaire. Chaque dépendance doit répondre à une fonction précise.

---

## 4. ARCHITECTURE LOGICIELLE

### 4.1 Couches fonctionnelles

```
CONTENU → Ce qui doit être appris
MOTEUR PÉDAGOGIQUE → Ce qui détermine quand et comment apprendre
MOTEUR D'ÉVALUATION → Ce qui mesure la maîtrise
PROFIL ET PROGRESSION → Ce qui conserve l'historique
INTERFACE → Ce qui permet d'interagir avec le système
```

### 4.2 Séparation contenu / code

> **Règle** : Les leçons ne doivent pas être enfermées dans le code de l'application.

Le contenu pédagogique doit pouvoir être modifié sans réécrire l'application :
- Ajouter une leçon
- Corriger une erreur
- Ajouter 100 questions
- Modifier une explication
- Ajouter du vocabulaire

### 4.3 Organisation du projet

```
app/
components/
features/
lib/
services/
types/
data/
hooks/
styles/
content/         ← Contenu pédagogique séparé
database/        ← Migrations et schéma
docs/            ← Documentation
tests/
assets/
```

### 4.4 Identifiants pédagogiques

Chaque élément pédagogique possède un identifiant stable :

```
grammar.present_simple.001
verb.go.001
it.networking.015
cyber.authentication.004
```

---

## 5. RÈGLES PÉDAGOGIQUES

### 5.1 Les 4 états de connaissance

1. **Exposition** : découverte, reconnaissance possible
2. **Compréhension** : comprend la règle, reconnaît l'utilisation correcte
3. **Utilisation guidée** : utilise avec contexte/indications
4. **Utilisation active** : produit/utilise correctement sans aide importante

→ Le système vise principalement l'état 4.

### 5.2 Production active

Comprendre ≠ réussir. Le système constamment pousse à produire :
- Reconnaissance → Rappel → Construction → Transformation → Correction → Traduction contrôlée → Réponse → Question → Phrase → Dialogue → Situation professionnelle

### 5.3 Répétition espacée

Une notion réapparaît :
- Immédiatement → Plus tard dans la journée → Le lendemain → Plusieurs jours après → Dans les évaluations cumulatives → Dans l'évaluation finale

### 5.4 Verbe + contexte

Un verbe informatique n'est jamais enseigné seul.

```
deploy → deploy an application → deploy a server → deploy a security update
```

### 5.5 Priorité aux verbes

4 groupes :
1. Conversationnels fondamentaux (be, have, do, get, go, come, make, take...)
2. Action courante (start, stop, open, close, change, move, check...)
3. Professionnels (manage, develop, create, support, analyze, review...)
4. Informatiques (install, configure, connect, deploy, debug, monitor, encrypt...)

### 5.6 Anti-mémorisation mécanique

- Banque massive (ex: 150 questions disponibles, 20-30 par session)
- Variation : ordre, formulation, exemples, contexte, réponses
- Questions cumulatives + production active

---

## 6. RÈGLES D'ÉVALUATION

### 6.1 Seuil de validation

**75 % par défaut.** Aucune exception sans décision explicite.

Zones :
- 75–84 % : PASSED
- 85–94 % : STRONG
- 95–100 % : EXCELLENT
- 60–74 % : remédiation ciblée
- 40–59 % : remédiation renforcée
- 0–39 % : retour aux prérequis recommandé

### 6.2 Critical skills

Certaines compétences peuvent bloquer la validation même si le score global ≥ 75%.

Exemples :
- Construction des questions
- Auxiliaires
- Temps verbaux fondamentaux
- Vocabulaire IT essentiel
- Compréhension des consignes professionnelles

### 6.3 Types d'évaluation

| Type | Nombre de questions | Rôle |
|---|---|---|
| Micro-check | 3–10 | Vérification immédiate |
| Lesson Quiz | 10–20 | Validation d'une leçon |
| Module Assessment | 30–60 | Validation d'un module |
| Level Assessment | Variable | Épreuve officielle de passage |
| Cumulative Review | Variable | Anciennes + nouvelles notions |
| Final Assessment | Variable | Cumulatif sur tous les domaines |

### 6.4 Score ≠ Maîtrise

Le système distingue :
- **Progression** : combien du programme a été parcouru
- **Performance** : quel score aux évaluations
- **Maîtrise** : à quel point la compétence est solidement acquise

→ Ces trois valeurs ne sont jamais confondues.

### 6.5 Statuts de maîtrise

```
NEW → LEARNING → PRACTICING → STABLE → MASTERED
                              ↓
                         REVIEW REQUIRED (si performances ultérieures insuffisantes)
```

### 6.6 Répétition espacée (intervalles par défaut)

```
Jour 0 : Apprentissage
Jour 1 : Révision
Jour 3 : Révision
Jour 6 : Révision
Jour 10 : Révision
Jour 20 : Révision finale
```

Les intervalles exacts sont ajustables par le moteur.

---

## 7. RÈGLES UX/UI

### 7.1 Principe directeur

> L'apprenant doit toujours savoir où il est, ce qu'il fait, pourquoi il le fait et ce qu'il lui reste à accomplir.

### 7.2 Règle "One primary action"

Chaque écran pédagogique important a une action principale.

### 7.3 Mobile-first

Le téléphone est appareil de première importance. Chaque fonctionnalité est pensée d'abord pour mobile.

### 7.4 Accessibilité

- Ne pas dépendre uniquement de la couleur pour transmettre une information
- Contraste suffisant, boutons assez grands, navigation clavier
- Typographie lisible, nombre de polices limité

### 7.5 Ton

Encourageant, professionnel, direct, respectueux, non infantilisant.

### 7.6 Philosophie visuelle

Sobriété institutionnelle inspirée de TELUQ : sérieux, hiérarchie claire, espaces blancs, navigation structurée, lisibilité.

---

## 8. RÈGLES TECHNIQUES

### 8.1 Sécurité

- Les mots de passe ne sont jamais stockés en clair
- Les permissions sont vérifiées côté serveur
- Toute donnée du navigateur est considérée comme non fiable
- Les secrets ne sont jamais écrits dans le code
- HTTPS en production

### 8.2 Variables d'environnement

```
DATABASE_URL
AUTH_SECRET
API_KEY
STORAGE_KEY
```

Jamais dans le code, jamais dans le dépôt public.

### 8.3 Git

Commits compréhensibles :
```
feat: add lesson progress tracking
fix: correct assessment scoring
feat: add review queue
fix: prevent unauthorized admin access
```

Branches : `main`, `development`, `feature/*`, `fix/*`

### 8.4 Non-régression

Une nouvelle fonctionnalité ne casse pas les fonctionnalités validées. Test systématique après modification importante.

### 8.5 Performance

Rapide et simple avant spectaculaire. Chargements rapides, JavaScript limité, images optimisées.

### 8.6 Mode sans IA

Le centre reste fonctionnel sans IA. L'IA est une couche supplémentaire, pas le cœur du système.

---

## 9. INFRASTRUCTURE

### 9.1 Services

| Service | Usage | Plan |
|---|---|---|
| GitHub | Dépôt, versioning | Gratuit |
| Vercel | Déploiement web | Hobby (gratuit, usage personnel/non commercial) |
| PostgreSQL | Base de données | À définir (recherche de solution gratuite/managée) |
| Google AI / Gemini | IA (futur) | Niveau gratuit avec limites |

### 9.2 Conformité

- Vercel Hobby : respecter les conditions d'usage personnel/non commercial
- Services gratuits : vérifier les quotas et conditions avant déploiement
- Si le centre devient commercial, revoir l'infrastructure

### 9.3 Sauvegarde

- Git : historique du code
- GitHub : dépôt distant
- Export des données pédagogiques : sauvegarde du contenu
- Backup de la base : sauvegarde des données utilisateurs

---

## 10. RÈGLES DE TRAVAIL AVEC ANTIGRAVITY

### 10.1 Découpage obligatoire

Interdit : « Construis toute l'école. »  
Obligatoire : découpage en tâches précises.

### 10.2 Structure d'une demande

```
CONTEXTE
OBJECTIF
FICHIERS CONCERNÉS
CONTRAINTES
CE QUI NE DOIT PAS ÊTRE MODIFIÉ
CRITÈRES DE RÉUSSITE
TEST À EFFECTUER
```

### 10.3 Exemple

```
TASK: Implement Level Assessment
OBJECTIVE: Create the assessment engine for one level.
RULE: A score >= 75% passes.
DO NOT: Modify the existing lesson engine.
MUST: Store attempts and scores.
TEST: 74% = failed, 75% = passed, 76% = passed
```

### 10.4 Rôle de l'IA

L'IA aide à construire ; elle ne décide pas seule de l'architecture.

---

## 11. DÉVELOPPEMENT INCÉMENTAL

### 11.1 Ordre obligatoire

```
Fondations → contenu → moteur pédagogique → évaluations → interface → intégration → tests → déploiement
```

### 11.2 Règle

Chaque étape est validée avant que la suivante ne soit considérée comme terminée.

### 11.3 Méthode

```
petite fonctionnalité → test → validation → intégration → fonctionnalité suivante
```

Interdit : « Générer toute l'application maintenant et corriger les problèmes ensuite. »

---

## 12. TESTS OBLIGATOIRES

| Type | Priorité |
|---|---|
| Calcul de score / seuil 75% | P0 |
| Validation de niveau / verrouillage | P0 |
| Calcul de progression | P0 |
- Détection des erreurs / révision | P0 |
| Tests fonctionnels (parcours complet) | P0 |
| Tests mobiles | P1 |
| Tests de sécurité | P1 |
| Tests de régression | P1 |
| Tests pédagogiques | P1 |

---

## 13. MAINTENANCE

### 13.1 Types de mises à jour

| Type | Description |
|---|---|
| Content update | Correction/ajout pédagogique |
| Question update | Ajout ou correction d'exercices |
| Bug fix | Correction technique |
| UX improvement | Amélioration de l'interface |
| Feature | Nouvelle fonctionnalité |
| Security | Correction de sécurité |

### 13.2 Principe

Une correction pédagogique ne détruit pas les résultats historiques.

---

## 14. CRITÈRES DE FIN DE PROJET

Le projet est déclaré **READY FOR REAL USE** uniquement lorsque :

- [ ] Architecture validée
- [ ] Interface validée
- [ ] Contenu validé (20 jours complets)
- [ ] Diagnostic fonctionnel
- [ ] Cours fonctionnels
- [ ] Exercices fonctionnels
- [ ] Évaluations fonctionnelles
- [ ] Seuil 75% fonctionnel
- [ ] Progression fonctionnelle
- [ ] Maîtrise fonctionnelle
- [ ] Révisions fonctionnelles
- [ ] Niveaux fonctionnels
- [ ] Certification fonctionnelle
- [ ] Responsive validé
- [ ] Sécurité de base validée
- [ ] Sauvegardes configurées
- [ ] Tests réussis
- [ ] Déploiement validé

### Critère ZERO CONFUSION

Une personne qui ne connaît pas l'application doit pouvoir répondre :
- Où suis-je ?
- Que dois-je faire ?
- Pourquoi ?
- Combien ai-je obtenu ?
- Qu'est-ce que je dois revoir ?
- Que dois-je faire ensuite ?

### Critère pédagogique final

> Le système pédagogique complet fonctionne.

### Critère technique final

Le système doit démarrer, fonctionner sur mobile et desktop, conserver les données, calculer les scores, gérer les niveaux, gérer les révisions, afficher la progression, gérer les erreurs, produire le résultat final.

### Règle fondamentale

> « Est-ce que l'étudiant est réellement devenu plus capable d'utiliser l'anglais qu'avant son passage dans cette activité ? »

Si la réponse est non, la fonctionnalité doit être repensée.

---

## 15. ÉVOLUTION FUTURE

L'architecture permet ultérieurement d'ajouter :
- Nouveaux programmes, niveaux, langues, parcours
- Davantage de cybersécurité, anglais professionnel avancé, anglais académique
- Conversation IA, application mobile dédiée
- Comptes enseignants, administration, classes virtuelles
- Fonctionnalités commerciales

**Mais aucune de ces fonctions ne complique inutilement le MVP.**

---

*Document maître du projet Summit English Institute. Version 1.0 — Août 2026*
