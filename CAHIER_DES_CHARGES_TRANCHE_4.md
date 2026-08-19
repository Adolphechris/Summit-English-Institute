CAHIER DES CHARGES — CENTRE DE FORMATION EN ANGLAIS INFORMATIQUE ET PROFESSIONNEL

TRANCHE 4 — ARCHITECTURE TECHNIQUE, INFRASTRUCTURE ET ORGANISATION DU CODE

Version consolidée : 1.3

---

125. OBJET DE LA TRANCHE 4

Cette tranche transforme les exigences fonctionnelles précédentes en une architecture technique exploitable.

Elle définit :

- la stratégie technologique ;
- l'architecture de l'application ;
- le frontend ;
- le backend ;
- la base de données ;
- l'authentification ;
- le stockage ;
- le déploiement ;
- l'organisation du projet ;
- la sécurité ;
- les environnements ;
- la gestion des versions ;
- les sauvegardes ;
- les tests techniques.

La présente tranche ne doit jamais être interprétée comme une autorisation de développer toutes les fonctionnalités immédiatement.

Elle constitue le plan directeur technique.

---

126. PRINCIPES TECHNIQUES FONDAMENTAUX

L'architecture devra respecter les principes suivants :

1. simplicité ;
2. gratuité ou coût minimal pendant la phase initiale ;
3. facilité de maintenance ;
4. sécurité ;
5. évolutivité ;
6. compatibilité mobile ;
7. séparation du contenu et du code ;
8. possibilité de déployer rapidement ;
9. possibilité de migrer vers une infrastructure plus importante ultérieurement ;
10. absence de dépendance inutile à des services payants.

---

127. ARCHITECTURE GÉNÉRALE

L'application sera organisée conceptuellement ainsi :

UTILISATEUR

↓

INTERFACE WEB

↓

LOGIQUE DE L'APPLICATION

↓

SERVICES

↓

BASE DE DONNÉES

↓

STOCKAGE

Le navigateur ne devra jamais accéder directement à des données qui doivent rester protégées.

---

128. STACK TECHNIQUE CIBLE

La stack initiale recommandée sera basée sur des technologies modernes et largement utilisées.

Éditeur

VS Code

Assistant de développement

Antigravity 2.0

Frontend

Next.js + React + TypeScript

Style

CSS / système de composants cohérent

Une bibliothèque de composants pourra être ajoutée uniquement si elle apporte une réelle valeur.

Backend

Le backend pourra être intégré à l'application Next.js lorsque cela reste approprié.

Des API seront utilisées pour séparer les opérations sensibles.

Base de données

Une base PostgreSQL managée sera privilégiée.

Authentification

Un système d'authentification sécurisé compatible avec la base de données choisie.

Déploiement

Vercel lorsque compatible avec les besoins de la version initiale.

---

129. PRINCIPLE DE MINIMALISME TECHNOLOGIQUE

Aucun framework, service ou bibliothèque ne devra être ajouté simplement parce qu'il est populaire.

Chaque dépendance doit répondre à une fonction précise.

La question suivante devra être posée avant chaque ajout :

«« Cette dépendance apporte-t-elle une valeur suffisamment importante pour justifier sa complexité ? »»

---

130. FRONTEND

Le frontend sera responsable de :

- affichage ;
- navigation ;
- interaction ;
- formulaires ;
- exercices ;
- évaluations ;
- progression ;
- résultats ;
- tableau de bord.

Le frontend ne devra pas contenir de secrets.

---

131. TYPESCRIPT

Le code devra utiliser TypeScript afin de réduire les erreurs liées aux données.

Les structures importantes devront être typées :

- User ;
- Course ;
- Level ;
- Module ;
- Lesson ;
- Skill ;
- Question ;
- Assessment ;
- Attempt ;
- Progress ;
- ReviewItem.

---

132. DESIGN SYSTEM

Le projet devra disposer d'un système de design centralisé.

Il devra définir :

- couleurs ;
- typographie ;
- espacements ;
- boutons ;
- cartes ;
- champs ;
- badges ;
- alertes ;
- barres de progression ;
- menus ;
- titres ;
- textes.

Les composants devront être réutilisables.

---

133. RESPONSIVE DESIGN

Trois catégories principales devront être prises en compte :

Mobile

Priorité élevée.

Tablet

Adaptation intermédiaire.

Desktop

Expérience complète.

Les interfaces d'exercices devront particulièrement être optimisées pour les écrans tactiles.

---

134. ARCHITECTURE DES PAGES

Structure conceptuelle :

/
├── accueil
├── login
├── register
├── dashboard
├── course
├── levels
├── modules
├── lessons
├── practice
├── assessments
├── review
├── progress
├── results
├── profile
└── admin

La structure réelle pourra être adaptée aux conventions du framework retenu.

---

135. ORGANISATION DU CODE

Le projet devra séparer au minimum :

components/
features/
lib/
services/
types/
data/
hooks/
styles/
app/

L'objectif est d'éviter un projet dans lequel tout le code serait concentré dans quelques fichiers gigantesques.

---

136. COMPOSANTS

Les composants réutilisables devront être isolés.

Exemples :

- Button ;
- Card ;
- ProgressBar ;
- Badge ;
- Modal ;
- QuestionCard ;
- AnswerOption ;
- LessonSection ;
- ScoreDisplay ;
- SkillProgress ;
- LevelCard ;
- ReviewCard.

---

137. FEATURES

Les fonctionnalités complexes pourront être regroupées par domaine.

Exemple :

features/
  auth/
  dashboard/
  lessons/
  practice/
  assessments/
  review/
  progress/
  profile/
  admin/

Cela facilitera la maintenance.

---

138. SERVICES

Les communications avec les services externes devront être centralisées.

Exemples :

services/
  auth/
  database/
  storage/
  assessment/
  progress/

L'interface ne devra pas disperser les appels directs aux services externes.

---

139. BASE DE DONNÉES

La base devra être relationnelle.

PostgreSQL est privilégié en raison de :

- robustesse ;
- maturité ;
- relations entre données ;
- requêtes ;
- évolutivité ;
- compatibilité avec de nombreux services.

---

140. STRUCTURE LOGIQUE DE LA BASE

Tables principales envisagées :

users
courses
levels
modules
lessons
skills
concepts
vocabulary
expressions
questions
question_options
assessments
assessment_questions
attempts
attempt_answers
progress
skill_progress
review_items
achievements
certificates

La structure exacte devra être validée avant création de la base.

---

141. UTILISATEUR

La table utilisateur devra permettre d'identifier :

- utilisateur ;
- rôle ;
- statut ;
- date de création ;
- dernière activité.

Les données personnelles devront être limitées au strict nécessaire.

---

142. COURS

Un cours devra pouvoir posséder :

- ID ;
- titre ;
- description ;
- statut ;
- version ;
- date de création ;
- date de modification.

---

143. NIVEAUX

Chaque niveau devra posséder :

- ID ;
- cours ;
- numéro ;
- titre ;
- objectif ;
- ordre ;
- seuil ;
- statut.

Le seuil par défaut sera :

75 %.

---

144. MODULES

Chaque module devra être rattaché à :

- un niveau ;
- un ordre ;
- un objectif ;
- un statut.

---

145. LEÇONS

Chaque leçon devra contenir :

- titre ;
- objectif ;
- contenu ;
- module ;
- ordre ;
- statut ;
- version.

Le contenu devra être stocké de manière permettant sa modification sans modification majeure du code.

---

146. COMPÉTENCES

Une compétence devra pouvoir être associée à :

- une ou plusieurs leçons ;
- une ou plusieurs questions ;
- une ou plusieurs évaluations.

Exemple :

Present Simple — Formation

peut être associée à plusieurs modules et plusieurs questions.

---

147. VOCABULAIRE

Un terme devra pouvoir contenir :

- mot ;
- définition ;
- traduction ;
- prononciation si disponible ;
- catégorie ;
- exemple ;
- domaine ;
- niveau ;
- compétence.

---

148. EXPRESSIONS

Une expression devra pouvoir contenir :

- expression ;
- signification ;
- contexte ;
- exemple ;
- catégorie ;
- difficulté ;
- domaine.

---

149. QUESTIONS

Une question devra être indépendante de l'évaluation.

Une même question pourra être utilisée dans :

- une leçon ;
- un quiz ;
- une évaluation ;
- une révision ;
- un examen cumulatif.

---

150. ÉVALUATIONS

Une évaluation devra être définie par :

- nom ;
- type ;
- niveau ;
- règles ;
- seuil ;
- durée éventuelle ;
- nombre de questions ;
- distribution ;
- statut.

---

151. ATTEMPT

Chaque tentative devra enregistrer :

- utilisateur ;
- évaluation ;
- début ;
- fin ;
- score ;
- statut.

---

152. RÉPONSES

Chaque réponse donnée pourra enregistrer :

- question ;
- tentative ;
- réponse ;
- correct/incorrect ;
- compétence ;
- date.

Cela permettra l'analyse des erreurs.

---

153. PROGRESSION

La progression devra pouvoir être calculée à plusieurs niveaux :

- formation ;
- niveau ;
- module ;
- leçon ;
- compétence.

---

154. PROGRESSION PAR COMPÉTENCE

Un objet spécifique devra permettre de conserver la maîtrise d'une compétence.

Exemple :

Skill:
Present Simple

Mastery:
82%

Status:
STABLE

Cette valeur devra être indépendante du simple score d'une évaluation particulière.

---

155. REVIEW ITEMS

Un élément de révision devra conserver :

- compétence ;
- notion ;
- niveau de priorité ;
- date prévue ;
- nombre d'échecs ;
- dernier résultat ;
- statut.

---

156. CERTIFICAT

Le système devra pouvoir conserver :

- utilisateur ;
- formation ;
- score final ;
- date ;
- identifiant ;
- version de la formation.

Cela permettra de savoir exactement quelle version du programme a été suivie.

---

157. AUTHENTIFICATION

L'authentification devra respecter les bonnes pratiques de sécurité.

Les mots de passe ne devront jamais être stockés en clair.

Le système d'authentification devra gérer :

- session ;
- expiration ;
- déconnexion ;
- récupération de compte si nécessaire.

---

158. AUTORISATION

L'authentification détermine :

qui es-tu ?

L'autorisation détermine :

qu'as-tu le droit de faire ?

Exemple :

Un étudiant ne doit jamais pouvoir accéder aux fonctions administratives simplement en modifiant une URL.

Les permissions devront donc être vérifiées côté serveur.

---

159. SÉCURITÉ DES DONNÉES

Le projet devra appliquer notamment :

- validation des entrées ;
- contrôle des permissions ;
- protection des secrets ;
- séparation client/serveur ;
- limitation des données exposées ;
- gestion correcte des erreurs ;
- HTTPS en production.

---

160. VARIABLES D'ENVIRONNEMENT

Les clés et secrets ne devront jamais être écrits directement dans le code.

Exemple conceptuel :

DATABASE_URL
AUTH_SECRET
API_KEY
STORAGE_KEY

Les valeurs réelles devront être stockées dans les variables d'environnement appropriées.

---

161. FICHIER ENV LOCAL

Les secrets de développement pourront être conservés localement dans un fichier d'environnement non versionné.

Ce fichier ne devra jamais être envoyé dans le dépôt public.

---

162. GIT

Le projet devra utiliser Git.

Le dépôt devra permettre :

- historique ;
- branches ;
- restauration ;
- comparaison ;
- collaboration future.

---

163. COMMITS

Les commits devront être compréhensibles.

Exemples :

feat: add lesson progress tracking
fix: correct assessment scoring
feat: add review queue
fix: prevent unauthorized admin access

---

164. BRANCHES

Le projet pourra utiliser :

main
development
feature/*
fix/*

La stratégie pourra rester simple pour un projet individuel.

---

165. ENVIRONNEMENTS

Le système devra distinguer au minimum :

Development

Travail local.

Production

Version réellement utilisée.

Un environnement de test/staging pourra être ajouté lorsque nécessaire.

---

166. DÉPLOIEMENT VERCEL

Lorsque Vercel sera retenu, le déploiement devra suivre :

Git repository → build → deployment → production

Les variables d'environnement devront être configurées séparément pour les environnements concernés.

---

167. BASE DE DONNÉES EN PRODUCTION

La base de production ne devra pas être confondue avec une base locale de développement.

Les migrations devront être contrôlées.

Aucune modification destructive ne devra être effectuée sans sauvegarde ou procédure de récupération adaptée.

---

168. MIGRATIONS

Les changements de structure devront être versionnés.

Exemple :

001_initial_schema
002_add_skill_progress
003_add_review_items
004_add_certificates

---

169. SAUVEGARDES

Les données importantes devront disposer d'une stratégie de sauvegarde.

Au minimum :

- sauvegarde de la base ;
- conservation du code dans Git ;
- conservation des contenus pédagogiques dans une source versionnée.

---

170. CONTENU PÉDAGOGIQUE ET CODE

Le contenu pédagogique devra être séparé autant que possible du code applicatif.

Cela permettra :

modifier une leçon ≠ modifier le moteur de l'application.

---

171. FORMAT DES CONTENUS

Le format exact sera choisi selon l'architecture finale.

Les options possibles comprennent :

- JSON ;
- Markdown ;
- base de données ;
- CMS léger.

Le choix devra privilégier :

- lisibilité ;
- facilité de modification ;
- validation ;
- versionnage.

---

172. CONTENU STRUCTURÉ

Une leçon pourrait logiquement contenir :

lesson
 ├── metadata
 ├── objective
 ├── explanation
 ├── examples
 ├── vocabulary
 ├── expressions
 ├── it_context
 ├── practice
 └── assessment

Cette structure servira de référence conceptuelle.

---

173. API

Les fonctions sensibles ou nécessitant un accès aux données devront passer par des interfaces contrôlées.

Exemples conceptuels :

GET /api/progress
GET /api/lessons/:id
POST /api/attempts
POST /api/answers
GET /api/reviews
POST /api/reviews/:id/complete

Les routes réelles seront définies pendant l'implémentation.

---

174. VALIDATION DES DONNÉES

Toute donnée reçue du navigateur devra être considérée comme non fiable.

Le serveur devra valider :

- type ;
- format ;
- longueur ;
- valeur ;
- permission.

---

175. GESTION DES ERREURS

Les erreurs devront être traitées proprement.

L'utilisateur ne devra jamais recevoir inutilement :

- stack trace ;
- secrets ;
- détails internes ;
- informations de base de données.

---

176. JOURNALISATION

Le système devra pouvoir enregistrer les erreurs techniques importantes.

Les logs ne devront pas contenir inutilement de données personnelles ou de secrets.

---

177. PERFORMANCE

La première version devra être suffisamment légère pour fonctionner correctement sur des connexions et appareils variés.

Priorités :

- chargement rapide ;
- images optimisées ;
- JavaScript limité ;
- pagination lorsque nécessaire ;
- requêtes de base de données efficaces.

---

178. OFFLINE

La première version n'a pas pour obligation de fonctionner entièrement hors ligne.

Cependant, l'architecture ne devra pas empêcher une évolution ultérieure vers :

- cache ;
- lecture hors connexion ;
- synchronisation.

Cette fonctionnalité reste secondaire par rapport au cœur pédagogique.

---

179. AUDIO

Les fichiers audio, s'ils sont intégrés, devront être stockés séparément du code.

Le système devra pouvoir associer un fichier audio à :

- une phrase ;
- un mot ;
- une expression ;
- une question.

---

180. IA

L'IA n'est pas le cœur de la première version.

Elle pourra être ajoutée progressivement pour :

- génération d'exercices ;
- explications ;
- tutorat ;
- conversation ;
- correction ;
- adaptation du parcours.

Toute utilisation de l'IA devra respecter les règles pédagogiques du centre.

---

181. RÈGLE IMPORTANTE CONCERNANT L'IA

L'IA ne devra pas être autorisée à inventer librement des corrections linguistiques critiques sans mécanisme de contrôle.

Les contenus fondamentaux devront être validés.

L'IA peut assister le système.

Elle ne doit pas devenir automatiquement l'autorité pédagogique.

---

182. GOOGLE ET SERVICES GRATUITS

Les services Google pourront être utilisés lorsqu'ils apportent une réelle valeur au projet.

Exemples potentiels :

- authentification ou services associés ;
- stockage ;
- outils de développement ;
- analyse ;
- services IA selon les conditions disponibles.

Toute dépendance devra être évaluée selon :

- gratuité ;
- limites ;
- confidentialité ;
- disponibilité ;
- risque de verrouillage ;
- possibilité de migration.

---

183. VERCEL

Vercel pourra être utilisé pour le déploiement de l'application web si le niveau gratuit couvre les besoins de la première phase.

Le projet devra cependant éviter de dépendre d'une fonctionnalité payante avant d'en avoir réellement besoin.

---

184. PRINCIPE DE PORTABILITÉ

Les données pédagogiques essentielles devront rester exportables.

L'objectif est de pouvoir migrer ultérieurement :

- base de données ;
- contenus ;
- utilisateurs ;
- résultats.

Le projet ne doit pas devenir prisonnier d'un fournisseur.

---

185. TESTS UNITAIRES

Les fonctions critiques devront être testées.

Priorité :

- calcul de score ;
- seuil de 75 % ;
- calcul de progression ;
- validation de niveau ;
- détection des erreurs ;
- logique de révision.

---

186. TESTS D'INTÉGRATION

Tester notamment :

réponse → tentative → score → progression

et :

échec → compétence faible → révision → nouvelle tentative

---

187. TESTS END-TO-END

Le parcours complet devra pouvoir être testé :

création compte → diagnostic → cours → exercice → évaluation → validation → progression → examen final → certificat.

---

188. TESTS RESPONSIVE

Les écrans principaux devront être testés sur :

- petit smartphone ;
- grand smartphone ;
- tablette ;
- desktop.

---

189. TESTS DE SÉCURITÉ

Tester notamment :

- accès non autorisé ;
- manipulation d'ID ;
- accès étudiant à l'administration ;
- données sensibles ;
- variables d'environnement ;
- validation des entrées.

---

190. TESTS DE RÉGRESSION

Avant chaque version importante :

- exécuter les tests critiques ;
- vérifier le parcours principal ;
- vérifier les scores ;
- vérifier la progression ;
- vérifier les données.

---

191. CRITÈRE DE FIN TECHNIQUE

La plateforme ne sera pas considérée comme techniquement prête simplement parce que :

« elle s'affiche ».

Elle devra :

- fonctionner ;
- sauvegarder ;
- calculer ;
- sécuriser ;
- récupérer les données ;
- gérer les erreurs ;
- fonctionner sur mobile ;
- respecter les règles pédagogiques.

---

192. ORDRE DE CONSTRUCTION TECHNIQUE

Le développement devra suivre cet ordre :

Bloc 1

Initialisation du projet.

Bloc 2

Base de données.

Bloc 3

Authentification.

Bloc 4

Modèle pédagogique.

Bloc 5

Leçons.

Bloc 6

Exercices.

Bloc 7

Évaluations.

Bloc 8

Score.

Bloc 9

Progression.

Bloc 10

Révision.

Bloc 11

Dashboard.

Bloc 12

Administration.

Bloc 13

Résultats.

Bloc 14

Proclamation.

Bloc 15

Tests.

Bloc 16

Déploiement.

---

193. RÈGLE DE CONSTRUCTION INCRÉMENTALE

Chaque bloc devra être développé et testé avant de passer au suivant.

Le projet devra éviter le scénario :

« Générer toute l'application maintenant et corriger les problèmes ensuite. »

La méthode privilégiée sera :

petite fonctionnalité → test → validation → intégration → fonctionnalité suivante.

---

194. LIVRABLE TECHNIQUE

À la fin de cette phase, le projet devra disposer :

- d'un dépôt ;
- d'une application fonctionnelle ;
- d'une base de données ;
- d'une authentification ;
- du contenu pédagogique ;
- d'un moteur d'exercices ;
- d'un moteur d'évaluation ;
- d'un moteur de progression ;
- d'un système de révision ;
- d'un tableau de bord ;
- d'un système de résultats ;
- d'une proclamation finale ;
- d'une procédure de déploiement.

---

195. PROCHAINE TRANCHE

La prochaine tranche devra revenir au contenu pédagogique lui-même, avec un niveau de précision encore supérieur.

Elle devra définir :

- le programme détaillé des 20 jours ;
- les modules de chaque journée ;
- les leçons de chaque module ;
- les compétences de chaque leçon ;
- les verbes prioritaires ;
- les temps verbaux prioritaires ;
- les structures grammaticales ;
- les expressions ;
- les phrasal verbs ;
- le vocabulaire informatique ;
- le vocabulaire cybersécurité ;
- les patrons de phrases ;
- les catégories d'exercices ;
- les volumes d'évaluation ;
- les règles de répétition.

Cette partie constituera progressivement la véritable matière première de l'école.

FIN DE LA TRANCHE 4
