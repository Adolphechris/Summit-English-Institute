CAHIER DES CHARGES — CENTRE DE FORMATION EN ANGLAIS INFORMATIQUE ET PROFESSIONNEL

TRANCHE 3 — ARCHITECTURE FONCTIONNELLE, LOGICIELLE ET DES DONNÉES

Version consolidée : 1.2

---

67. PRINCIPES D'ARCHITECTURE

L'application devra être conçue comme un système pédagogique, et non comme un simple site web.

Elle sera organisée autour de cinq couches fonctionnelles principales :

CONTENU

→ ce qui doit être appris

MOTEUR PÉDAGOGIQUE

→ ce qui détermine quand et comment l'apprenant doit apprendre ou revoir

MOTEUR D'ÉVALUATION

→ ce qui mesure la maîtrise

PROFIL ET PROGRESSION

→ ce qui conserve l'historique de l'apprenant

INTERFACE

→ ce qui permet à l'apprenant d'interagir avec le système.

La séparation logique de ces composants devra permettre de modifier le contenu sans devoir réécrire toute l'application.

---

68. TYPES D'UTILISATEURS

La première version pourra fonctionner avec un seul apprenant, mais l'architecture devra prévoir plusieurs rôles.

68.1 — Student

Accès :

- tableau de bord ;
- cours ;
- exercices ;
- évaluations ;
- résultats ;
- progression ;
- révisions ;
- profil.

68.2 — Administrator

Accès :

- gestion des utilisateurs ;
- gestion des formations ;
- gestion des niveaux ;
- gestion des modules ;
- gestion des leçons ;
- gestion des questions ;
- gestion des compétences ;
- gestion des évaluations ;
- statistiques ;
- configuration.

68.3 — Future Teacher

Ce rôle pourra être introduit ultérieurement.

Il pourra gérer le contenu pédagogique sans nécessairement disposer des privilèges techniques de l'administrateur.

---

69. PARCOURS PRINCIPAL DE L'APPRENANT

Le parcours général devra être :

Accueil

↓

Connexion

↓

Tableau de bord

↓

Diagnostic

↓

Résultats du diagnostic

↓

Niveau 1

↓

Leçons

↓

Exercices

↓

Évaluation

↓

Validation

↓

Niveau suivant

↓

...

↓

Évaluation finale

↓

Résultat

↓

Proclamation

---

70. STRUCTURE GÉNÉRALE DE L'APPLICATION

L'application devra comporter au minimum les espaces suivants :

1. Dashboard
2. Course
3. Lessons
4. Practice
5. Assessments
6. Review
7. Progress
8. Results
9. Profile
10. Administration

---

71. ÉCRAN D'ACCUEIL

L'écran d'accueil devra présenter de manière concise :

- identité du centre ;
- objectif de la formation ;
- durée ;
- méthode ;
- accès à la formation ;
- connexion.

L'écran ne devra pas devenir une page marketing excessive.

La priorité est l'accès rapide à l'apprentissage.

---

72. AUTHENTIFICATION

L'utilisateur devra pouvoir :

- créer un compte ;
- se connecter ;
- se déconnecter ;
- récupérer son accès si nécessaire.

La première version pourra être simplifiée puisqu'elle est initialement destinée à un seul apprenant.

Cependant, aucune décision technique ne devra rendre impossible le passage ultérieur au multi-utilisateur.

---

73. TABLEAU DE BORD

Le dashboard constitue l'écran principal.

Il devra présenter en priorité :

Bloc A — Progression générale

Exemple :

67 %

avec une barre visuelle.

Bloc B — Progression temporelle

Jour 12 / 20

Bloc C — Niveau

Niveau 5 — IT English

Bloc D — Prochaine activité

Exemple :

Continuer : Network Vocabulary

Bloc E — Révisions

Exemple :

12 compétences à revoir

Bloc F — Performance

Score moyen récent.

Bloc G — Compétences

Vue synthétique des domaines.

---

74. PRINCIPE DE CONTINUITÉ

Lorsque l'apprenant revient sur la plateforme, le système doit pouvoir lui proposer directement :

« Continuer votre parcours »

Le système doit retrouver automatiquement :

- dernière leçon ;
- dernière question ;
- dernier niveau ;
- progression ;
- révisions prioritaires.

L'utilisateur ne doit pas avoir à rechercher manuellement où il s'était arrêté.

---

75. PAGE « MON PARCOURS »

Cette page présentera les 20 jours.

Exemple conceptuel :

JOUR 1 — Diagnostic ✓

JOUR 2 — Foundations ✓

JOUR 3 — Present System ✓

JOUR 4 — Past System ✓

JOUR 5 — Future & Modals 🔓

JOUR 6 — Perfect 🔒

La présentation devra montrer clairement :

- terminé ;
- en cours ;
- disponible ;
- verrouillé.

---

76. PAGE DE NIVEAU

Chaque niveau devra présenter :

- titre ;
- objectif ;
- description ;
- compétences ;
- modules ;
- progression ;
- score ;
- conditions de validation.

Exemple :

NIVEAU 3 — FUNCTIONAL GRAMMAR

Progression : 82 %

Score : 79 %

Statut : EN COURS

Condition :

≥ 75 %

---

77. PAGE DE MODULE

Chaque module devra afficher :

- objectif ;
- notions ;
- leçons ;
- progression ;
- exercices ;
- score ;
- erreurs ;
- statut.

---

78. PAGE DE LEÇON

Structure recommandée :

En-tête

Titre + progression.

Objectif

Ce que l'apprenant doit savoir faire.

Lesson

Contenu pédagogique.

Examples

Exemples.

IT Context

Application informatique lorsque pertinente.

Practice

Exercices.

Quick Test

Évaluation courte.

Review Later

Programmation de la révision.

---

79. NAVIGATION DE LEÇON

La navigation devra être volontairement simple.

Actions principales :

Previous

Next

Practice

Review

Une leçon terminée devra être enregistrée automatiquement.

---

80. PAGE D'EXERCICE

Chaque exercice devra afficher :

- contexte éventuel ;
- question ;
- réponse ;
- validation ;
- feedback ;
- progression.

Après validation, le système devra immédiatement pouvoir indiquer :

- correct ;
- incorrect ;
- explication ;
- compétence concernée.

---

81. FEEDBACK

Le feedback devra être pédagogique.

Une erreur ne devra pas simplement produire :

Wrong.

Elle devra, lorsque pertinent, fournir :

- réponse attendue ;
- explication ;
- rappel de la règle ;
- exemple correct ;
- possibilité de réessayer ;
- programmation d'une révision.

---

82. PAGE D'ÉVALUATION

Avant de commencer une évaluation importante, le système devra afficher :

- nom ;
- objectif ;
- nombre de questions ;
- domaines évalués ;
- seuil de réussite ;
- règles de tentative.

Exemple :

Passing score: 75 %

---

83. ÉVALUATION EN COURS

L'écran devra afficher :

- numéro actuel ;
- nombre total ;
- progression ;
- question ;
- réponse ;
- bouton suivant.

Pour certaines évaluations, la correction immédiate pourra être désactivée afin de conserver la valeur diagnostique de l'examen.

---

84. FIN D'ÉVALUATION

Le système devra calculer automatiquement :

score = réponses correctes / réponses évaluées × 100

Puis présenter :

- score ;
- statut ;
- compétences ;
- erreurs ;
- recommandations.

---

85. ÉVALUATION DE NIVEAU

Une évaluation de niveau devra être différente d'un simple quiz.

Elle devra :

- couvrir plusieurs modules ;
- mélanger plusieurs types de questions ;
- inclure des connaissances anciennes ;
- tester plusieurs compétences ;
- respecter une distribution définie ;
- utiliser le seuil de 75 %.

---

86. VERROUILLAGE

Si un niveau est non validé :

niveau suivant = verrouillé

Le système doit cependant permettre :

révision → entraînement → nouvelle tentative.

---

87. SYSTÈME DE RÉVISION

Une page spécifique devra être consacrée aux révisions.

Elle devra présenter :

À revoir maintenant

Notions présentant une faiblesse importante.

Révisions programmées

Notions devant revenir selon le calendrier de répétition.

Erreurs fréquentes

Notions régulièrement échouées.

Maîtrisées

Notions dont la maîtrise est suffisamment stable.

---

88. PRIORITÉ DES RÉVISIONS

Chaque compétence devra pouvoir recevoir un niveau de priorité.

Exemple conceptuel :

Critical

Échecs répétés.

High

Faiblesse importante.

Normal

Révision régulière.

Low

Simple entretien.

---

89. SCORE DE MAÎTRISE

Le système devra distinguer :

score d'un test

et

niveau de maîtrise d'une compétence.

Un score de 90 % à un examen ne signifie pas automatiquement que toutes les compétences sont maîtrisées à 90 %.

Le système doit conserver les résultats par compétence.

---

90. PROGRESSION GLOBALE

La progression globale ne devra pas être calculée uniquement sur le nombre de pages consultées.

Elle devra intégrer principalement :

- contenu complété ;
- compétences validées ;
- évaluations ;
- maîtrise ;
- progression des niveaux.

La formule exacte devra être définie avant l'implémentation.

---

91. PROGRESSION PAR MATIÈRE

Le système devra permettre d'afficher :

Conjugation — 81 %

Grammar — 76 %

Conversation — 61 %

IT English — 48 %

Cybersecurity English — 23 %

Ces valeurs sont des exemples de présentation.

---

92. PROFIL APPRENANT

Le profil devra contenir :

- nom ;
- photo facultative ;
- langue principale ;
- date de début ;
- progression ;
- niveau ;
- résultats ;
- historique ;
- attestations.

Aucune donnée inutile ne devra être collectée.

---

93. MODÈLE DE DONNÉES — PRINCIPES

Les données devront être structurées autour d'objets distincts.

User

Identité et compte.

Course

Formation.

Level

Niveau.

Module

Module pédagogique.

Lesson

Leçon.

Skill

Compétence.

Concept

Notion pédagogique.

Vocabulary

Terme lexical.

Expression

Expression ou idiome.

Question

Question d'évaluation.

Answer

Réponse.

Assessment

Évaluation.

Attempt

Tentative.

Progress

Progression.

ReviewItem

Élément à revoir.

Achievement

Accomplissement.

---

94. RELATIONS PÉDAGOGIQUES

Une formation possède plusieurs niveaux.

Un niveau possède plusieurs modules.

Un module possède plusieurs leçons.

Une leçon développe plusieurs compétences.

Une compétence peut être associée à plusieurs leçons.

Une question peut tester plusieurs compétences lorsque nécessaire.

Cette architecture est importante pour permettre au système de déterminer précisément ce qui est faible lorsque l'apprenant commet une erreur.

---

95. OBJET QUESTION

Chaque question devra pouvoir contenir au minimum :

- ID ;
- type ;
- énoncé ;
- contexte ;
- difficulté ;
- compétence ;
- notion ;
- réponse correcte ;
- réponses alternatives acceptées ;
- explication ;
- niveau ;
- module ;
- leçon ;
- tags.

---

96. QUESTION ET COMPÉTENCE

Exemple :

Question :

«Choose the correct form.»

Compétence :

Present Simple — Third Person

Notion :

Subject-verb agreement

Difficulté :

A

Ainsi, une mauvaise réponse pourra augmenter le besoin de révision de cette compétence.

---

97. HISTORIQUE DES TENTATIVES

Chaque tentative importante devra être enregistrée.

Données possibles :

- utilisateur ;
- évaluation ;
- date ;
- score ;
- nombre de réponses ;
- bonnes réponses ;
- mauvaises réponses ;
- compétences affectées ;
- statut.

---

98. HISTORIQUE DES RÉPONSES

Pour les évaluations pertinentes, le système pourra conserver :

- question ;
- réponse donnée ;
- réponse correcte ;
- résultat ;
- durée ;
- compétence ;
- tentative.

Cela permettra d'analyser les erreurs.

---

99. MOTEUR DE PROGRESSION

Le moteur devra être capable de déterminer :

Où l'apprenant est-il ?

Que peut-il faire ?

Que doit-il encore apprendre ?

Que doit-il revoir ?

Peut-il avancer ?

Ces cinq questions constituent le cœur fonctionnel du système.

---

100. CONDITIONS DE DÉBLOCAGE

Une unité pourra être débloquée selon plusieurs critères :

- unité précédente terminée ;
- prérequis validé ;
- score minimal ;
- niveau validé.

Les conditions devront être configurables.

---

101. RÈGLE DE NON-RÉGRESSION

Le système ne devra pas supprimer la progression lorsqu'une compétence devient faible.

Il devra distinguer :

progression historique

et

maîtrise actuelle.

Exemple :

L'apprenant a validé une compétence à 82 %.

Une nouvelle évaluation le fait descendre à 68 %.

Le système doit conserver l'historique mais signaler :

Compétence à revoir.

---

102. MOTEUR DE REMÉDIATION

Lorsqu'une compétence est insuffisante :

1. identifier la compétence ;
2. identifier les notions faibles ;
3. sélectionner des exercices ;
4. présenter une explication ;
5. proposer une nouvelle pratique ;
6. réévaluer ;
7. mettre à jour la maîtrise.

---

103. MOTEUR DE RÉPÉTITION

Chaque notion pourra posséder un état de répétition :

NEW

→ découverte

LEARNING

→ apprentissage actif

REVIEW

→ révision

STABLE

→ maîtrise relativement stable

MASTERED

→ maîtrise confirmée.

---

104. RÉPÉTITION CUMULATIVE

Même lorsqu'une notion atteint l'état MASTERED, elle pourra réapparaître dans les examens cumulés.

Le système ne doit jamais considérer qu'une notion apprise est définitivement oubliée du programme.

---

105. MOTEUR DE RECOMMANDATION

Le dashboard devra pouvoir déterminer la prochaine activité en tenant compte de :

1. progression normale ;
2. erreurs récentes ;
3. révisions dues ;
4. prérequis ;
5. objectif du jour.

Exemple :

Recommended next activity

«Review: Irregular verbs»

plutôt que simplement :

«Lesson 12.»

---

106. SYSTÈME DE BADGES

Les badges ne devront pas devenir un élément de gamification envahissant.

Ils pourront être utilisés pour signaler :

- niveau validé ;
- série de réussite ;
- objectif atteint ;
- formation terminée ;
- maîtrise exceptionnelle d'un domaine.

Ils restent secondaires par rapport à la maîtrise réelle.

---

107. SYSTÈME DE SÉRIES

Une série de jours consécutifs pourra être enregistrée.

Cependant, aucune récompense ne devra encourager l'apprenant à privilégier la présence quotidienne au détriment de la qualité de l'apprentissage.

---

108. PROCLAMATION FINALE

Après validation de la formation, une page dédiée devra présenter :

CONGRATULATIONS

Formation completed

Final Score: XX %

Overall Progress: 100 %

Puis les résultats par domaine.

---

109. ATTESTATION

Une attestation interne pourra être générée.

Elle devra contenir :

- nom ;
- nom du centre ;
- intitulé de la formation ;
- date ;
- score ;
- statut ;
- identifiant ;
- signature institutionnelle si configurée.

Le système devra éviter toute formulation laissant croire à une reconnaissance officielle externe qui n'existe pas.

---

110. ADMINISTRATION — TABLEAU DE BORD

L'administrateur devra pouvoir visualiser :

- nombre d'utilisateurs ;
- progression ;
- résultats ;
- niveaux ;
- contenus ;
- questions ;
- erreurs ;
- état du système.

Dans la première version, cette interface peut rester simple.

---

111. ADMINISTRATION — CONTENU

L'administrateur devra pouvoir créer, modifier ou désactiver :

- niveaux ;
- modules ;
- leçons ;
- compétences ;
- concepts ;
- vocabulaire ;
- expressions ;
- questions.

---

112. ADMINISTRATION — QUESTIONS

L'administrateur devra pouvoir :

- créer une question ;
- modifier une question ;
- supprimer/désactiver une question ;
- associer une compétence ;
- définir la difficulté ;
- définir la bonne réponse ;
- définir l'explication ;
- rechercher par catégorie.

---

113. VERSIONNAGE DES CONTENUS

Une modification importante d'une leçon ou d'une question devra pouvoir être tracée.

Exemple :

Question Q-001582

Version 1 → créée

Version 2 → correction de la réponse

Version 3 → amélioration de l'explication.

Cela évitera de perdre l'historique pédagogique.

---

114. RECHERCHE ADMINISTRATIVE

L'administration devra permettre de rechercher rapidement :

- une leçon ;
- un terme ;
- une question ;
- une compétence ;
- une expression ;
- un module.

---

115. STATISTIQUES

Le système pourra progressivement produire :

- taux de réussite ;
- questions les plus échouées ;
- compétences les plus faibles ;
- temps moyen ;
- progression ;
- taux de validation ;
- nombre de tentatives.

Ces données permettront d'améliorer le programme.

---

116. CRITÈRE IMPORTANT DE QUALITÉ

Si une question est massivement échouée, le système devra permettre de déterminer si :

le problème vient de l'apprenant

ou

le problème vient du contenu ou de la question.

Une question mal formulée ne doit pas être considérée automatiquement comme une preuve d'échec pédagogique.

---

117. ARCHITECTURE DE DÉVELOPPEMENT

Le projet devra être développé progressivement.

Il ne faudra pas demander à Antigravity de générer toute l'application en une seule opération.

Le développement devra suivre une séquence contrôlée :

architecture → composant → test → validation → composant suivant.

Chaque étape devra produire un état fonctionnel vérifiable.

---

118. ENVIRONNEMENT DE DÉVELOPPEMENT

Environnement principal :

VS Code

Assistant de développement :

Antigravity 2.0

Le projet devra être organisé dans un dépôt versionné.

Chaque fonctionnalité devra être identifiable.

---

119. RÈGLE DE TRAVAIL AVEC ANTIGRAVITY

Avant toute demande importante à Antigravity, le développeur devra fournir :

1. contexte ;
2. objectif ;
3. fichiers concernés ;
4. contraintes ;
5. comportement attendu ;
6. critères d'acceptation.

L'IA devra être utilisée comme assistant d'implémentation, et non comme autorité de conception.

---

120. CRITÈRES D'ACCEPTATION D'UNE FONCTIONNALITÉ

Une fonctionnalité ne sera considérée comme terminée que si :

- elle fonctionne ;
- elle respecte le cahier des charges ;
- elle ne casse pas les fonctions existantes ;
- elle fonctionne sur mobile ;
- les données sont correctement enregistrées ;
- les erreurs sont gérées ;
- elle a été testée.

---

121. RÈGLE DE NON-RÉGRESSION TECHNIQUE

Une nouvelle fonctionnalité ne doit pas casser :

- la progression ;
- les scores ;
- les comptes ;
- les cours ;
- les évaluations ;
- les données existantes.

Toute modification importante devra être testée sur les fonctions déjà existantes.

---

122. PRIORITÉ DE DÉVELOPPEMENT

Priorité absolue :

P0 — Bloquant

- authentification ;
- contenu ;
- progression ;
- exercices ;
- évaluations ;
- score ;
- validation ;
- sauvegarde.

P1 — Important

- révisions ;
- statistiques ;
- administration ;
- historique.

P2 — Amélioration

- badges ;
- animations ;
- fonctionnalités avancées.

P3 — Futur

- IA conversationnelle ;
- reconnaissance vocale ;
- application mobile native ;
- fonctionnalités commerciales.

---

123. PRINCIPE DE SIMPLICITÉ

La première version ne devra pas chercher à reproduire immédiatement une plateforme universitaire complète.

Elle doit être :

simple à utiliser, solide pédagogiquement et suffisamment extensible.

---

124. PROCHAINE TRANCHE

La prochaine tranche descendra encore au niveau de l'implémentation.

Elle devra spécifier notamment :

- architecture technique proposée ;
- frontend ;
- backend ;
- base de données ;
- authentification ;
- stockage ;
- hébergement ;
- services Google pertinents ;
- Vercel ;
- structure du projet dans VS Code ;
- organisation des dossiers ;
- sécurité ;
- variables d'environnement ;
- gestion des données ;
- sauvegardes ;
- déploiement ;
- environnement de développement et production ;
- stratégie de tests techniques.

La technologie ne sera choisie qu'en fonction des besoins définis dans les tranches précédentes.

FIN DE LA TRANCHE 3
