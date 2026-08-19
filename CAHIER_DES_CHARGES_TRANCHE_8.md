CAHIER DES CHARGES

TRANCHE 8/8 — PLAN DE CONSTRUCTION, PILOTAGE, TESTS, DÉPLOIEMENT ET MAINTENANCE

Version consolidée : 1.7 — Tranche finale

Cette tranche clôt le cahier des charges. Elle transforme les sept tranches précédentes en plan de chantier exécutable.


---

381. OBJET

Le projet devra être construit progressivement.

Il est interdit de commencer par développer « un peu de tout ».

L'ordre obligatoire sera :

Fondations → contenu → moteur pédagogique → évaluations → interface → intégration → tests → déploiement.

Chaque étape devra être validée avant de considérer la suivante comme terminée.


---

382. PRINCIPE DE CONSTRUCTION

Le projet doit rester compréhensible même par une personne qui n'est pas informaticienne.

Chaque fonctionnalité devra donc posséder :

un objectif ;

une description ;

des dépendances ;

un état ;

un test ;

un critère de validation.



---

383. ENVIRONNEMENT DE DÉVELOPPEMENT

L'environnement principal sera :

VS Code pour le travail sur le projet ;

Antigravity 2.0 comme assistant/agent de développement ;

Git pour l'historique du code ;

GitHub pour le dépôt et la sauvegarde du projet ;

Vercel pour le déploiement lorsque compatible avec les contraintes du projet.


Le principe sera :

> L'IA aide à construire ; elle ne décide pas seule de l'architecture.




---

384. RÈGLE DE TRAVAIL AVEC ANTIGRAVITY

Antigravity ne devra jamais recevoir une instruction vague du type :

> « Construis toute l'école. »



Le travail devra être découpé.

Exemple :

> Construis uniquement le système de progression.



Puis :

> Teste-le.



Puis :

> Corrige les erreurs.



Puis :

> Ne modifie pas les fonctionnalités déjà validées.



Cette méthode réduira considérablement les risques de dérive du projet.


---

385. DOCUMENT DE RÉFÉRENCE

Le projet devra conserver un document maître :

PROJECT_RULES.md

Il contiendra notamment :

vision ;

objectifs ;

architecture ;

règles non négociables ;

technologies retenues ;

conventions ;

règles UX ;

règles pédagogiques ;

règles d'évaluation.


Antigravity devra pouvoir s'y référer avant toute modification importante.


---

386. DOCUMENTATION DU PROJET

Le dépôt devra prévoir notamment :

/docs

avec des documents séparés pour :

architecture ;

pédagogie ;

base de données ;

UX/UI ;

évaluations ;

déploiement ;

sécurité ;

maintenance.



---

387. STRUCTURE LOGIQUE DU PROJET

La structure exacte dépendra du framework finalement retenu, mais elle devra séparer clairement :

application
components
pages
data
content
services
database
tests
docs
assets

L'objectif est d'éviter qu'un énorme fichier contienne toute l'application.


---

388. SÉPARATION DU CONTENU ET DU CODE

Principe fondamental :

> Les leçons ne doivent pas être enfermées dans le code de l'application.



Le contenu pédagogique devra pouvoir être modifié sans devoir réécrire l'ensemble de l'application.

Cela permettra notamment :

d'ajouter une leçon ;

de corriger une erreur ;

d'ajouter 100 questions ;

de modifier une explication ;

d'ajouter du vocabulaire.



---

389. IDENTIFIANTS PÉDAGOGIQUES

Chaque élément pédagogique devra posséder un identifiant stable.

Exemple :

grammar.present_simple.001
verb.go.001
it.networking.015
cyber.authentication.004

Cela permettra de suivre les performances d'une compétence dans le temps.


---

390. STRUCTURE D'UNE QUESTION

Chaque question devra comporter au minimum :

ID ;

domaine ;

compétence ;

difficulté ;

type ;

question ;

réponses ;

réponse correcte ;

explication ;

niveau ;

tags.


Exemple conceptuel :

ID
skill
difficulty
question
answers
correctAnswer
explanation


---

391. BANQUE DE QUESTIONS

La banque devra être conçue pour pouvoir grandir.

Le premier objectif ne sera pas nécessairement de produire immédiatement des milliers de questions.

Il faudra construire une architecture permettant ensuite d'en ajouter massivement.


---

392. CONTENU INITIAL

Le développement commencera avec un jeu de données pilote.

Par exemple :

quelques leçons ;

quelques compétences ;

quelques dizaines de questions ;

un niveau complet.


Cela permettra de tester le moteur avant de produire tout le contenu.


---

393. MVP

Le MVP devra permettre de faire réellement le cycle :

Inscription

↓

Diagnostic

↓

Leçon

↓

Exercices

↓

Évaluation

↓

Score

↓

Progression

↓

Révision

↓

Passage au niveau suivant

Le MVP n'a pas besoin de contenir immédiatement les 20 jours complets.


---

394. JALON MVP-1

Fondations

À valider :

projet créé ;

dépôt Git ;

environnement fonctionnel ;

structure ;

documentation ;

première page.


Critère :

L'application démarre correctement.


---

395. JALON MVP-2

Interface

Créer :

header ;

navigation ;

dashboard ;

page cours ;

page leçon.


Critère :

L'utilisateur peut naviguer dans une version statique cohérente.


---

396. JALON MVP-3

Contenu

Créer :

premier niveau ;

modules ;

leçons ;

vocabulaire ;

exercices.


Critère :

Une véritable unité pédagogique peut être suivie.


---

397. JALON MVP-4

Évaluation

Implémenter :

questions ;

réponses ;

correction ;

score ;

seuil 75 %.


Critère :

Une évaluation complète fonctionne.


---

398. JALON MVP-5

Progression

Implémenter :

progression ;

niveaux ;

compétences ;

verrouillage ;

déverrouillage.


Critère :

Le système sait déterminer ce que l'étudiant peut faire ensuite.


---

399. JALON MVP-6

Révision

Implémenter :

erreurs ;

éléments à revoir ;

répétition ;

weak areas.


Critère :

Le système sait identifier les lacunes.


---

400. JALON MVP-7

Diagnostic

Implémenter :

test initial ;

profil de départ ;

recommandations.


Critère :

Le système peut adapter la priorité pédagogique.


---

401. JALON MVP-8

Certification

Implémenter :

résultat final ;

proclamation ;

score ;

statut ;

attestation.


Critère :

Un étudiant ayant terminé le parcours reçoit un résultat cohérent.


---

402. PHASE DE PRODUCTION

Une fois le MVP validé, le reste du contenu pourra être produit.

Ordre :

Niveau 1

→ validation

Niveau 2

→ validation

Niveau 3

→ validation

etc.

Il ne faudra pas produire les 20 jours en masse avant d'avoir testé le fonctionnement des premiers.


---

403. TEST PÉDAGOGIQUE

Chaque module devra être testé selon quatre questions :

1.

Le contenu est-il correct ?

2.

Est-il réellement utile ?

3.

Les exercices testent-ils réellement la compétence ?

4.

L'étudiant peut-il réutiliser ce qu'il vient d'apprendre ?


---

404. TEST FONCTIONNEL

Chaque fonctionnalité devra être testée :

fonctionnement normal ;

mauvaise réponse ;

absence de données ;

erreur réseau ;

rafraîchissement ;

retour arrière ;

déconnexion ;

reconnexion ;

mobile ;

desktop.



---

405. TEST DU MOTEUR DE SCORE

Des scénarios artificiels devront être créés.

Exemple :

74 %

→ échec.

75 %

→ réussite.

76 %

→ réussite.

Le système ne devra présenter aucune ambiguïté.


---

406. TEST DU VERROUILLAGE

Tester :

score < 75 %

→ niveau suivant verrouillé.

Puis :

score ≥ 75 %

→ niveau suivant déverrouillé.


---

407. TEST DE PROGRESSION

Vérifier que :

terminer une leçon augmente correctement la progression ;

refaire une leçon ne double pas artificiellement la progression ;

une activité abandonnée n'est pas comptée comme terminée ;

les données persistent après reconnexion.



---

408. TEST DE RÉVISION

Créer volontairement des erreurs.

Vérifier :

apparition dans les erreurs ;

apparition dans les révisions ;

priorité correcte ;

disparition lorsque la compétence est correctement maîtrisée.



---

409. TEST MOBILE

Le téléphone sera considéré comme plateforme prioritaire.

Tester au minimum :

petit écran ;

écran moyen ;

orientation portrait ;

clavier virtuel ;

navigation ;

exercices ;

évaluations.



---

410. TEST DES PERFORMANCES

L'application devra éviter :

chargements inutiles ;

images trop lourdes ;

scripts inutiles ;

pages excessivement volumineuses.


La priorité est :

> rapide et simple avant spectaculaire.




---

411. TEST DE SÉCURITÉ

Les données sensibles devront être protégées.

Il faudra notamment vérifier :

authentification ;

autorisations ;

accès aux données ;

secrets ;

clés API ;

variables d'environnement ;

règles de base de données.


Une clé secrète ne devra jamais être placée directement dans le code public.


---

412. RÈGLE POUR LES CLÉS API

Les clés privées ne devront jamais être stockées :

dans le frontend

ou :

dans GitHub

Elles devront être gérées par les mécanismes appropriés d'environnement/configuration.


---

413. ARCHITECTURE DE DÉPLOIEMENT

L'architecture initiale devra privilégier les services gratuits ou à quota gratuit.

Une combinaison possible est :

GitHub

→ dépôt/versioning

Vercel

→ application web

Firebase / services Google

→ services backend selon les besoins

Google AI / Gemini

→ fonctions IA éventuelles

Mais chaque service devra être utilisé uniquement lorsqu'il apporte une réelle valeur.

Firebase propose actuellement un forfait Spark sans frais, avec notamment des fonctionnalités Firebase gratuites et des quotas gratuits pour certains produits ; les limites exactes devront être vérifiées au moment du déploiement. 


---

414. VERCEL

Vercel pourra être utilisé pour le déploiement du frontend et des composants compatibles avec son architecture.

Attention : le plan Hobby est actuellement gratuit, mais ses conditions indiquent qu'il est destiné à un usage personnel ou non commercial. Le projet devra donc vérifier les conditions applicables avant toute utilisation commerciale ou ouverture publique à grande échelle. 

Cela devient une règle de conformité du projet, pas quelque chose à contourner.


---

415. GOOGLE AI

L'IA pourra éventuellement être utilisée pour :

génération contrôlée d'exercices ;

explication d'une erreur ;

conversation pédagogique ;

adaptation d'exercices ;

assistance à la production écrite.


Le Gemini Developer API propose actuellement un niveau gratuit avec des limites de débit et de modèles ; ces limites devront être considérées comme des quotas et non comme une capacité illimitée. 


---

416. IA ET CONTENU PÉDAGOGIQUE

L'IA ne devra pas être autorisée à modifier silencieusement le programme officiel.

Principe :

Curriculum officiel

→ source de vérité.

IA

→ outil d'assistance.

Elle pourra proposer :

> « Voici trois exercices supplémentaires. »



Mais elle ne devra pas décider :

> « Je supprime cette compétence du programme. »




---

417. IA ET CORRECTION

L'IA pourra assister la correction des productions ouvertes.

Cependant, le système devra conserver :

réponse originale ;

critères ;

résultat ;

justification éventuelle.


Cela permettra de contrôler les erreurs de l'IA.


---

418. MODE SANS IA

Le centre devra rester fonctionnel sans IA.

C'est important.

Si une API IA devient indisponible ou atteint son quota :

les leçons

les exercices

les évaluations

les scores

la progression

doivent continuer à fonctionner.

L'IA est une couche supplémentaire, pas le cœur du système.


---

419. SAUVEGARDE

Le projet devra disposer de plusieurs niveaux de sauvegarde :

Git

→ historique du code.

GitHub

→ dépôt distant.

Export des données pédagogiques

→ sauvegarde du contenu.

Backup de la base

→ sauvegarde des données utilisateurs lorsque nécessaire.


---

420. VERSIONNAGE

Le projet devra utiliser une logique de version.

Exemple :

v0.1

Prototype.

v0.5

MVP avancé.

v1.0

Première version opérationnelle.

v1.1

Corrections.

v1.2

Améliorations.


---

421. TODO MAÎTRE

Un fichier ou système de suivi devra contenir toutes les tâches.

Structure :

TODO
├── Foundation
├── Architecture
├── UI
├── Content
├── Assessment
├── Progress
├── Review
├── Authentication
├── Database
├── AI
├── Testing
├── Deployment
└── Maintenance


---

422. ÉTATS DES TÂCHES

Chaque tâche devra avoir un état :

BACKLOG

→ pas commencée.

READY

→ prête.

IN PROGRESS

→ en cours.

BLOCKED

→ bloquée.

REVIEW

→ terminée mais à vérifier.

DONE

→ validée.


---

423. RÈGLE IMPORTANTE DU TRACKER

Une tâche ne doit pas devenir :

DONE

simplement parce que le code a été écrit.

Elle devient DONE uniquement lorsque :

> fonctionnalité réalisée + testée + validée.




---

424. JALONS

Le tracker devra comporter des jalons :

M0

Architecture approuvée.

M1

Prototype.

M2

MVP.

M3

Moteur pédagogique.

M4

Programme complet.

M5

Tests.

M6

Production.


---

425. JOURNAL DES MODIFICATIONS

Le projet devra conserver un :

CHANGELOG.md

Chaque version importante devra expliquer :

ajout ;

correction ;

modification ;

suppression.



---

426. RÈGLE DE NON-RÉGRESSION

Une nouvelle fonctionnalité ne doit pas casser une fonctionnalité validée.

Après chaque modification importante :

test de la nouvelle fonction


test des fonctions critiques existantes.


---

427. PROCÉDURE DE MODIFICATION

Avant une modification importante :

1. identifier le problème ;


2. identifier les fichiers concernés ;


3. expliquer la modification ;


4. réaliser la modification ;


5. tester ;


6. vérifier les régressions ;


7. enregistrer la modification.




---

428. RÈGLE POUR ANTIGRAVITY

Lorsqu'une tâche est confiée à Antigravity, la demande devra préciser :

CONTEXTE

OBJECTIF

FICHIERS CONCERNÉS

CONTRAINTES

CE QUI NE DOIT PAS ÊTRE MODIFIÉ

CRITÈRES DE RÉUSSITE

TEST À EFFECTUER

C'est cette structure qui permettra de garder le contrôle du projet.


---

429. EXEMPLE DE TÂCHE

TASK: Implement Level Assessment

OBJECTIVE:
Create the assessment engine for one level.

RULE:
A score >= 75% passes.

DO NOT:
Modify the existing lesson engine.

MUST:
Store attempts and scores.

TEST:
74% = failed
75% = passed
76% = passed

Cette méthode devra devenir la norme de travail.


---

430. CRITÈRES D'ACCEPTATION

Chaque fonctionnalité devra posséder des critères d'acceptation.

Exemple :

Fonctionnalité

Progression.

Acceptation

progression visible ;

progression persistante ;

calcul correct ;

mobile ;

desktop ;

aucune double comptabilisation.



---

431. ENVIRONNEMENT DE TEST

Le projet devra distinguer autant que possible :

Development

↓

Testing

↓

Production

Une modification expérimentale ne doit pas être directement considérée comme version officielle.


---

432. DONNÉES DE TEST

Créer des comptes/utilisateurs de test fictifs permettant de vérifier :

nouvel étudiant ;

étudiant faible ;

étudiant moyen ;

étudiant excellent ;

étudiant ayant échoué ;

étudiant ayant terminé.



---

433. TEST DU PARCOURS COMPLET

Avant le lancement :

nouvel utilisateur

↓

diagnostic

↓

niveau recommandé

↓

leçon

↓

exercices

↓

erreur

↓

révision

↓

nouvelle tentative

↓

75 %+

↓

niveau suivant

↓

20 jours

↓

examen final

↓

proclamation

↓

certificat.

Ce parcours devra fonctionner de bout en bout.


---

434. CRITÈRE « ZERO CONFUSION »

Avant lancement, une personne qui ne connaît pas l'application devra pouvoir répondre facilement à :

> Où suis-je ?



> Que dois-je faire ?



> Pourquoi ?



> Combien ai-je obtenu ?



> Qu'est-ce que je dois revoir ?



> Que dois-je faire ensuite ?



Si ce n'est pas évident, l'UX doit être améliorée.


---

435. CRITÈRE PÉDAGOGIQUE FINAL

Le centre ne sera pas considéré comme terminé parce que :

> « toutes les pages existent ».



Il sera terminé lorsque :

> le système pédagogique complet fonctionne.




---

436. CRITÈRE TECHNIQUE FINAL

Le système doit :

démarrer ;

fonctionner sur mobile ;

fonctionner sur desktop ;

conserver les données ;

calculer les scores ;

gérer les niveaux ;

gérer les révisions ;

afficher la progression ;

gérer les erreurs ;

produire le résultat final.



---

437. CRITÈRE DE CONTENU

Les 20 jours devront être entièrement renseignés.

Chaque unité devra disposer :

d'un objectif ;

d'un contenu ;

d'exemples ;

d'exercices ;

d'évaluation ;

de compétences associées.



---

438. CRITÈRE D'ÉVALUATION

La plateforme devra disposer d'une banque suffisamment importante pour éviter que l'apprenant ne rencontre systématiquement les mêmes questions.

Elle devra également être capable de :

sélectionner ;

varier ;

enregistrer ;

noter ;

analyser ;

réutiliser les erreurs.



---

439. CRITÈRE DE PROGRESSION

Le système devra afficher séparément :

Course completion

Performance

Mastery

C'est une règle fondamentale du produit.


---

440. CRITÈRE DE PASSAGE

Le seuil institutionnel restera :

75 %

Aucune interface ou fonctionnalité ne devra permettre de contourner silencieusement cette règle.


---

441. CRITÈRE FINAL DE CERTIFICATION

L'étudiant devra recevoir une proclamation uniquement lorsqu'il satisfait les conditions définies dans la tranche 6.

Le système devra être capable d'expliquer pourquoi :

PASSED

ou

NOT PASSED YET


---

442. MAINTENANCE

Après lancement, les mises à jour devront être classées :

Content update

Correction/ajout pédagogique.

Question update

Ajout ou correction d'exercices.

Bug fix

Correction technique.

UX improvement

Amélioration de l'interface.

Feature

Nouvelle fonctionnalité.

Security

Correction de sécurité.


---

443. RÈGLE DE MISE À JOUR DU CONTENU

Une correction pédagogique ne doit pas détruire les résultats historiques.

Si une question est modifiée, le système devra pouvoir conserver son historique selon la stratégie retenue.


---

444. SURVEILLANCE

Après mise en ligne, surveiller :

erreurs ;

temps de chargement ;

échecs d'API ;

erreurs de connexion ;

problèmes d'authentification ;

erreurs d'évaluation ;

anomalies de progression.



---

445. PLAN DE RÉCUPÉRATION

Le projet devra prévoir quoi faire en cas de :

bug majeur ;

suppression accidentelle ;

mauvaise mise à jour ;

panne d'un service externe.


Principe :

> Une mise à jour doit pouvoir être annulée.




---

446. ÉVOLUTION FUTURE

L'architecture devra permettre ultérieurement d'ajouter :

nouveaux programmes ;

nouveaux niveaux ;

nouvelles langues ;

nouveaux parcours ;

davantage de cybersécurité ;

anglais professionnel avancé ;

anglais académique ;

conversation IA ;

application mobile dédiée.


Mais aucune de ces fonctions ne doit compliquer inutilement le MVP.


---

447. ORDRE FINAL DU CHANTIER

Le chantier complet devra suivre cet ordre :

PHASE 1

Architecture.

PHASE 2

Prototype UX.

PHASE 3

Base technique.

PHASE 4

Moteur pédagogique.

PHASE 5

Évaluations.

PHASE 6

Progression.

PHASE 7

Révision.

PHASE 8

Diagnostic.

PHASE 9

Contenu.

PHASE 10

Certification.

PHASE 11

Tests.

PHASE 12

Déploiement.

PHASE 13

Validation finale.


---

448. DÉFINITION DU « DONE »

Le projet pourra être déclaré :

READY FOR REAL USE

uniquement lorsque toutes les conditions suivantes seront remplies :

[ ] architecture validée ;

[ ] interface validée ;

[ ] contenu validé ;

[ ] diagnostic fonctionnel ;

[ ] cours fonctionnels ;

[ ] exercices fonctionnels ;

[ ] évaluations fonctionnelles ;

[ ] seuil 75 % fonctionnel ;

[ ] progression fonctionnelle ;

[ ] maîtrise fonctionnelle ;

[ ] révisions fonctionnelles ;

[ ] niveaux fonctionnels ;

[ ] certification fonctionnelle ;

[ ] responsive validé ;

[ ] sécurité de base validée ;

[ ] sauvegardes configurées ;

[ ] tests réussis ;

[ ] déploiement validé.



---

449. VISION FINALE DU PRODUIT

Le produit final devra être beaucoup plus qu'un site contenant des cours.

Il devra fonctionner comme un petit système d'apprentissage adaptatif :

Diagnostic

→

Apprentissage

→

Pratique

→

Évaluation

→

Analyse des erreurs

→

Révision

→

Nouvelle évaluation

→

Validation

→

Progression

→

Maîtrise

→

Certification


---

450. RÈGLE FONDAMENTALE FINALE

La plateforme devra toujours répondre à cette question :

> « Est-ce que l'étudiant est réellement devenu plus capable d'utiliser l'anglais qu'avant son passage dans cette activité ? »



Si la réponse est non, la fonctionnalité doit être repensée.


---

451. FIN DU CAHIER DES CHARGES

Nous avons maintenant terminé les 8 tranches.

Le cahier des charges complet possède donc cette architecture :

1 — Compréhension du besoin et vision

2 — Feuille de route / Constitution

3 — Architecture fonctionnelle

4 — Architecture technique

5 — Programme pédagogique

6 — Évaluation, maîtrise et certification

7 — UX/UI et Design System

8 — Construction, tests, déploiement et maintenance


---

452. POINT IMPORTANT SUR L'INFRASTRUCTURE GRATUITE

La contrainte « privilégier le gratuit » est compatible avec une première version, mais elle ne doit pas devenir une promesse de gratuité illimitée.

Les offres gratuites ont des quotas et des conditions qui peuvent évoluer. Firebase dispose actuellement d'un plan Spark sans frais, tandis que certains services ont des quotas gratuits et d'autres nécessitent une formule payante au-delà de certains seuils. 

Pour Gemini, Google propose actuellement un niveau gratuit avec des limites propres aux modèles et aux requêtes. 

Et surtout, Vercel indique actuellement que son plan Hobby gratuit est destiné à un usage personnel ou non commercial. Cela devra être respecté : si le centre devient réellement commercial, nous devrons revoir l'infrastructure au lieu de chercher à contourner cette restriction. 


---

453. STATUT DU PROJET

À ce stade, nous ne devons pas encore commencer à coder au hasard.

Le cahier des charges est terminé.
