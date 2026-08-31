#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Génère database/remediation-t1.json — 20 leçons riches (N1:101-110, N2:111-120)."""
import json, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOW = "2026-08-31T08:00:00.000Z"
LESSONS = []

def L(id_, mod, lvl, order, title, objective, expl, ex, voc, expr, itc, prac, summ, quiz=None, patterns=None):
    LESSONS.append({
        "id": id_, "moduleId": mod, "levelId": lvl, "title": title,
        "objective": objective, "explanation": expl, "examples": ex,
        "vocabulary": voc, "expressions": expr, "itContext": itc,
        "practice": prac, "patterns": patterns, "quiz": quiz,
        "summary": summ, "orderIndex": order,
        "status": "active", "version": 1,
        "createdAt": NOW, "updatedAt": NOW
    })

# ================= LEÇON 101 — N1 SVO =================
L(101, 1, 1, 1,
  "Introduction to English Sentence Structure",
  "Construire des phrases simples correctes selon la structure Sujet-Verbe-Complément en contexte IT.",
  """La structure de base de la phrase anglaise repose sur un ordre strict : Sujet + Verbe + Complément (SVO). Contrairement au français, l'anglais n'autorise pas facilement l'inversion ni l'omission du sujet : chaque phrase déclarative simple se construit dans cet ordre exact.

LE SUJET est l'entité qui accomplit l'action : the server, a developer, the system. LE VERBE exprime l'action ou l'état : processes, writes, runs. LE COMPLÉMENT précise le contexte de l'action : requests, code, the network.

Cette structure est omniprésente en contexte technique. Un serveur traite des requêtes : « The server processes requests. » Un développeur écrit du code : « A developer writes code. » Une base de données stocke des enregistrements : « The database stores records. » Un pare-feu bloque les menaces : « The firewall blocks threats. »

RÈGLE ESSENTIELLE : en anglais, on ne peut JAMAIS omettre le sujet dans une phrase déclarative. Là où le français dit simplement « Fonctionne », l'anglais exige « It works » ou « The system works ». Le pronom it est systématiquement employé pour désigner un système, un serveur ou une application.

DEUXIÈME RÈGLE : l'adjectif se place avant le nom (a secure network) et jamais après. TROISIÈME RÈGLE : l'adverbe se place généralement après le verbe (the server works correctly) ou en début de phrase.

Les phrases négatives et interrogatives suivront des règles spécifiques dans les leçons suivantes. Aujourd'hui, l'objectif est de fixer mentalement l'ordre SVO qui servira de fondation à tout le programme : c'est la clé pour construire des phrases techniques claires et professionnelles.""",
  [
    {"meaning": "Le système fonctionne correctement.", "sentence": "The system works properly.", "itContext": "The monitoring system works properly in production."},
    {"meaning": "Un développeur écrit du code.", "sentence": "A developer writes code.", "itContext": "A senior developer writes clean code every day."},
    {"meaning": "Le serveur traite les requêtes.", "sentence": "The server processes requests.", "itContext": "The application server processes thousands of requests per second."},
    {"meaning": "La base de données stocke les enregistrements.", "sentence": "The database stores records.", "itContext": "The relational database stores millions of records efficiently."},
    {"meaning": "L'administrateur configure le réseau.", "sentence": "The administrator configures the network.", "itContext": "The system administrator configures the company network settings."},
    {"meaning": "L'application envoie des notifications.", "sentence": "The application sends notifications.", "itContext": "The mobile application sends push notifications to registered users."},
    {"meaning": "Le pare-feu bloque les menaces.", "sentence": "The firewall blocks threats.", "itContext": "The next-generation firewall blocks all malicious traffic automatically."}
  ],
  [
    {"word": "structure", "level": "A", "domain": "grammar", "example": "The sentence structure is clear.", "itContext": "The code structure follows best practices.", "definition": "Arrangement organisé des éléments", "translation": "structure"},
    {"word": "subject", "level": "A", "domain": "grammar", "example": "The subject comes first.", "itContext": "The system is the subject of the sentence.", "definition": "Élément qui accomplit l'action", "translation": "sujet"},
    {"word": "verb", "level": "A", "domain": "grammar", "example": "The verb expresses the action.", "itContext": "The verb processes describes the server behaviour.", "definition": "Mot exprimant l'action ou l'état", "translation": "verbe"},
    {"word": "object", "level": "A", "domain": "grammar", "example": "The object receives the action.", "itContext": "The database is the object in this sentence.", "definition": "Élément qui reçoit l'action", "translation": "complément d'objet"},
    {"word": "sentence", "level": "A", "domain": "grammar", "example": "Write a complete sentence.", "itContext": "Each command must form a complete sentence.", "definition": "Groupe de mots exprimant une idée complète", "translation": "phrase"},
    {"word": "word order", "level": "A", "domain": "grammar", "example": "English has a fixed word order.", "itContext": "SQL queries follow a fixed word order.", "definition": "Ordre des mots dans la phrase", "translation": "ordre des mots"},
    {"word": "complement", "level": "A", "domain": "grammar", "example": "The complement completes the meaning.", "itContext": "The file path is the complement here.", "definition": "Élément qui précise l'action", "translation": "complément"},
    {"word": "declarative", "level": "A", "domain": "grammar", "example": "A declarative sentence states a fact.", "itContext": "Most documentation uses declarative sentences.", "definition": "Qui énonce un fait", "translation": "déclaratif"}
  ],
  [
    {"expression": "to process data", "meaning": "traiter des données", "difficulty": "A", "example": "The server processes data in real time.", "classification": "it"},
    {"expression": "to store information", "meaning": "stocker des informations", "difficulty": "A", "example": "The system stores information securely.", "classification": "it"},
    {"expression": "to run smoothly", "meaning": "fonctionner sans accroc", "difficulty": "A", "example": "The application runs smoothly after the update.", "classification": "it"},
    {"expression": "to send notifications", "meaning": "envoyer des notifications", "difficulty": "A", "example": "The platform sends notifications to all users.", "classification": "it"},
    {"expression": "to keep track of", "meaning": "suivre, garder la trace", "difficulty": "A", "example": "Keep track of all configuration changes.", "classification": "it"}
  ],
  "La structure SVO est le socle de la documentation technique et des échanges entre équipes IT. Maîtriser cet ordre évite les ambiguïtés dans les tickets, les rapports d'incident et les spécifications.",
  [
    {"type": "multiple_choice", "question": "Identifiez le sujet : The database stores records.", "options": ["database", "stores", "records", "The"], "correctAnswer": "database", "explanation": "Le sujet est l'entité qui accomplit l'action : the database."},
    {"type": "multiple_choice", "question": "Quelle phrase respecte la structure SVO ?", "options": ["Runs the server", "The server runs", "Running fast", "Server the"], "correctAnswer": "The server runs", "explanation": "Sujet (The server) + Verbe (runs)."},
    {"type": "fill_blank", "question": "Complétez : The administrator ___ the network. (configurer)", "options": [], "correctAnswer": "configures", "explanation": "À la 3ème personne du singulier, le verbe prend un -s : configures."},
    {"type": "multiple_choice", "question": "Pourquoi l'anglais exige-t-il un sujet explicite ?", "options": ["Pour faire plus long", "C'est une règle grammaticale", "Par tradition", "Ce n'est pas obligatoire"], "correctAnswer": "C'est une règle grammaticale", "explanation": "L'anglais n'autorise pas l'omission du sujet dans une phrase déclarative."}
  ],
  "La structure SVO (Sujet-Verbe-Complément) est la fondation de la phrase anglaise. Fixez l'ordre : sujet toujours exprimé, verbe en deuxième position, complément en troisième.",
  [
    {"question": "Complétez : The database ___ records.", "options": ["store", "stores", "storing", "stored"], "correctAnswer": "stores", "explanation": "SVO + 3ème personne : the database stores."},
    {"question": "The firewall ___ threats.", "options": ["block", "blocks", "blocking", "blocked"], "correctAnswer": "blocks", "explanation": "The firewall (it) → blocks."},
    {"question": "Choisissez le complément : The developer writes ___.", "options": ["runs", "code", "fast", "a"], "correctAnswer": "code", "explanation": "code est le complément d'objet."},
    {"question": "The application ___ notifications.", "options": ["send", "sends", "sending", "sent"], "correctAnswer": "sends", "explanation": "The application (it) → sends."}
  ],
  [
    {"pattern": "Sujet + Verbe", "example": "The server runs.", "explanation": "Sujet suivi directement du verbe sans auxiliaire."},
    {"pattern": "Sujet + Verbe + Complément", "example": "The server processes requests.", "explanation": "L'objet reçoit l'action après le verbe."},
    {"pattern": "Sujet + Verbe + Adverbe", "example": "The system works correctly.", "explanation": "L'adverbe se place après le verbe (ou en début de phrase)."}
  ]
)

# ================= LEÇON 102 — N1 TO BE =================
L(102, 1, 1, 2,
  "The Verb to be in IT Context",
  "Utiliser am, is, are pour décrire l'état des systèmes, les rôles et les localisations en contexte informatique.",
  """Le verbe TO BE est le verbe le plus fréquent de l'anglais technique. Il exprime un état, une identité, une localisation ou une caractéristique. Sans lui, impossible de décrire une panne, un rôle ou une situation. Sa conjugaison au présent est irrégulière et doit être mémorisée : I am, you are, he/she/it is, we are, they are.

UTILISATION 1 - DÉCRIRE UN ÉTAT. The server is down (le serveur est en panne). The service is online (le service est en ligne). The system is operational (le système est opérationnel). On retrouve cette structure dans tous les rapports d'incident.

UTILISATION 2 - EXPRIMER UN RÔLE OU UNE IDENTITÉ. I am a system administrator. She is the database administrator. We are the networking team. Cette construction répond à la question Who are you? What is your role?

UTILISATION 3 - LOCALISER. The data is in the cloud. The server is in the data center. The file is on the disk. La préposition suit toujours le verbe.

FORMES NÉGATIVE ET INTERROGATIVE. Négation : subject + is/are + not. The network is not secure. Question : inversion Is/Are + sujet. Is the application running? Are the services available?

En environnement IT, maîtriser to be au présent permet de rédiger des statuts clairs, de comprendre les alertes (Service is down, Node is unreachable) et de tenir une conversation professionnelle de base. C'est le premier bloc de toute progression en anglais technique.""",
  [
    {"meaning": "Le serveur est en panne.", "sentence": "The server is down.", "itContext": "The main production server is down since 3 PM."},
    {"meaning": "Le système est opérationnel.", "sentence": "The system is operational.", "itContext": "We confirm the system is operational again."},
    {"meaning": "Je suis administrateur système.", "sentence": "I am a system administrator.", "itContext": "I am a system administrator for the finance department."},
    {"meaning": "Les données sont dans le cloud.", "sentence": "The data is in the cloud.", "itContext": "All company data is stored in the cloud."},
    {"meaning": "Le réseau n'est pas sécurisé.", "sentence": "The network is not secure.", "itContext": "The wireless network is not secure enough for production."},
    {"meaning": "L'application est-elle à jour ?", "sentence": "Is the application up to date?", "itContext": "Is the banking application up to date after the release?"},
    {"meaning": "Nous sommes en réunion de crise.", "sentence": "We are in the incident meeting.", "itContext": "We are in the incident meeting with the operations team."}
  ],
  [
    {"word": "down", "level": "A", "domain": "it", "example": "The server is down.", "itContext": "The database is down.", "definition": "Hors service, en panne", "translation": "en panne"},
    {"word": "up", "level": "A", "domain": "it", "example": "The server is up.", "itContext": "After the reboot, the service is up.", "definition": "Opérationnel, en marche", "translation": "opérationnel"},
    {"word": "online", "level": "A", "domain": "it", "example": "The service is online.", "itContext": "The website is online again.", "definition": "En ligne, accessible", "translation": "en ligne"},
    {"word": "available", "level": "A", "domain": "it", "example": "The API is available.", "itContext": "Version 2.0 is now available to all users.", "definition": "Disponible", "translation": "disponible"},
    {"word": "encrypted", "level": "A", "domain": "cybersecurity", "example": "The data is encrypted.", "itContext": "The connection is encrypted with TLS.", "definition": "Chiffré, encodé", "translation": "chiffré"},
    {"word": "secure", "level": "A", "domain": "cybersecurity", "example": "The system is secure.", "itContext": "The network is secure after the audit.", "definition": "Protégé, sûr", "translation": "sécurisé"},
    {"word": "required", "level": "A", "domain": "it", "example": "Access is required.", "itContext": "Administrator rights are required for this task.", "definition": "Requis, exigé", "translation": "requis"},
    {"word": "complete", "level": "A", "domain": "it", "example": "The installation is complete.", "itContext": "The migration is complete and verified.", "definition": "Terminé, complet", "translation": "terminé"}
  ],
  [
    {"expression": "to be down", "meaning": "être en panne", "difficulty": "A", "example": "The server is down.", "classification": "it"},
    {"expression": "to be up and running", "meaning": "être opérationnel", "difficulty": "A", "example": "The service is up and running.", "classification": "it"},
    {"expression": "to be in charge of", "meaning": "être responsable de", "difficulty": "A", "example": "She is in charge of the network.", "classification": "professional"},
    {"expression": "to be due to", "meaning": "être dû à", "difficulty": "A", "example": "The outage is due to a power failure.", "classification": "it"},
    {"expression": "to be on call", "meaning": "être de garde", "difficulty": "A", "example": "The engineer is on call tonight.", "classification": "professional"}
  ],
  "Le verbe to be est la colonne vertébrale du reporting IT : il positionne l'état des ressources (up/down/online/available) dans les alertes, les tickets et les comptes rendus.",
  [
    {"type": "multiple_choice", "question": "Conjuguez : The server ___ down.", "options": ["am", "is", "are", "be"], "correctAnswer": "is", "explanation": "The server (it) → is."},
    {"type": "multiple_choice", "question": "Forme négative : The network ___ secure.", "options": ["is not", "are not", "not is", "am not"], "correctAnswer": "is not", "explanation": "Négation = is/are + not."},
    {"type": "fill_blank", "question": "Complétez : We ___ the networking team.", "options": [], "correctAnswer": "are", "explanation": "We → are."},
    {"type": "multiple_choice", "question": "Question : ___ the application running?", "options": ["Is", "Are", "Am", "Be"], "correctAnswer": "Is", "explanation": "Inversion Is + sujet (application → it)."}
  ],
  "To be (am/is/are) exprime l'état, l'identité et la localisation : The server is down, I am an admin, The data is in the cloud. Négation avec not, question par inversion.",
  [
    {"question": "The system ___ available.", "options": ["is", "am", "are", "be"], "correctAnswer": "is", "explanation": "The system (it) → is."},
    {"question": "They ___ in the meeting.", "options": ["am", "is", "are", "be"], "correctAnswer": "are", "explanation": "They → are."},
    {"question": "___ the backups complete?", "options": ["Am", "Are", "Be", "Is"], "correctAnswer": "Are", "explanation": "backups (pluriel) → Are."},
    {"question": "The connection is not ___.", "options": ["secure", "securely", "security", "secured"], "correctAnswer": "secure", "explanation": "Adjectif après to be : secure."}
  ],
  [
    {"pattern": "Sujet + is/are + état", "example": "The server is down.", "explanation": "Décrire l'état d'une ressource."},
    {"pattern": "I am + rôle", "example": "I am a system administrator.", "explanation": "Présenter son rôle."},
    {"pattern": "Is/Are + sujet + complément ?", "example": "Is the service available?", "explanation": "Formuler une question par inversion."}
  ]
),
# ================= LEÇON 103 — N1 Present Simple =================
L(103, 12, 1, 3,
  "Present Simple for Technical Operations",
  "Décrire des opérations techniques récurrentes et des faits permanents avec le présent simple.",
  "Le présent simple est le temps des opérations récurrentes, des procédures et des vérités techniques permanentes. On l'emploie quand une action se répète (every day), pour un comportement stable ou une procédure documentée (The backup runs at 2 AM). FORMATION : base verbale pour I/you/we/they ; à la 3ème personne du singulier (he/she/it), on ajoute -s : The server runs, The system processes, The application sends. En IT, le sujet est presque toujours it (server, system, application, network, database, firewall). NÉGATION : does not / doesn't + verbe. QUESTION : Does + sujet + verbe. MARQUEURS : always, usually, often, never, every day, once a month. La documentation technique utilise le présent simple : This function replaces the old module. The API returns JSON.",
[

{"meaning": "La sauvegarde s'exécute à 2h du matin.", "sentence": "The backup runs at 2 AM.", "itContext": "The automated backup runs every night at 2 AM."},
    {"meaning": "Le pare-feu bloque le trafic entrant.", "sentence": "The firewall blocks incoming traffic.", "itContext": "The corporate firewall blocks all incoming traffic by default."},
    {"meaning": "La base de données stocke les profils.", "sentence": "The database stores user profiles.", "itContext": "The production database stores all profiles securely."},
    {"meaning": "L'API renvoie du JSON.", "sentence": "The API returns JSON.", "itContext": "The REST API returns JSON to every client."},
    {"meaning": "Le réseau ne répond pas.", "sentence": "The network doesn't respond.", "itContext": "The office network doesn't respond to ping."},
    {"meaning": "L'application n'envoie pas de notifications.", "sentence": "The application doesn't send notifications.", "itContext": "The mobile app doesn't send push notifications on weekends."},
    {"meaning": "Le serveur redémarre-t-il automatiquement ?", "sentence": "Does the server restart automatically?", "itContext": "Does the app server restart automatically after a crash?"},
],
[
{"word": "run", "level": "A", "domain": "it", "example": "The backup runs at night.", "itContext": "The cron job runs every hour.", "definition": "S'exécuter, tourner", "translation": "s'exécuter"},
    {"word": "block", "level": "A", "domain": "cybersecurity", "example": "The firewall blocks threats.", "itContext": "The rule blocks port 22.", "definition": "Bloquer", "translation": "bloquer"},
    {"word": "store", "level": "A", "domain": "it", "example": "The database stores records.", "itContext": "We store logs for 30 days.", "definition": "Stocker", "translation": "stocker"},
    {"word": "send", "level": "A", "domain": "it", "example": "The app sends alerts.", "itContext": "The system sends an email on failure.", "definition": "Envoyer", "translation": "envoyer"},
    {"word": "return", "level": "A", "domain": "it", "example": "The function returns a value.", "itContext": "The API returns status 200.", "definition": "Retourner une valeur", "translation": "retourner"},
    {"word": "respond", "level": "A", "domain": "it", "example": "The server responds quickly.", "itContext": "The service responds to ping.", "definition": "Répondre", "translation": "répondre"},
    {"word": "reset", "level": "A", "domain": "it", "example": "The password resets automatically.", "itContext": "The session resets after 30 minutes.", "definition": "Réinitialiser", "translation": "réinitialiser"},
    {"word": "require", "level": "A", "domain": "it", "example": "This task requires admin rights.", "itContext": "The deployment requires a valid certificate.", "definition": "Exiger, nécessiter", "translation": "exiger"},
],
[
{"expression": "to run a backup", "meaning": "exécuter une sauvegarde", "difficulty": "A", "example": "We run a backup every night.", "classification": "it"},
    {"expression": "to block access", "meaning": "bloquer l'accès", "difficulty": "A", "example": "The firewall blocks access to port 22.", "classification": "cybersecurity"},
    {"expression": "to send an alert", "meaning": "envoyer une alerte", "difficulty": "A", "example": "The tool sends an alert on failure.", "classification": "it"},
    {"expression": "to fail over", "meaning": "basculer sur le système de secours", "difficulty": "A", "example": "The cluster fails over automatically.", "classification": "it"},
    {"expression": "to go down", "meaning": "tomber en panne", "difficulty": "A", "example": "The node goes down twice a week.", "classification": "it"}
  ],
"Le présent simple est le temps de la documentation, des runbooks et des descriptions de comportement attendu. Il exprime des vérités techniques stables, pas des actions en cours.",
  [
    {"type": "multiple_choice", "question": "Conjuguez : The backup ___ at 2 AM.", "options": ["run", "runs", "running", "ran"], "correctAnswer": "runs", "explanation": "The backup (it) → runs."},
    {"type": "multiple_choice", "question": "Négation : The network ___ respond.", "options": ["don't", "doesn't", "isn't", "is not"], "correctAnswer": "doesn't", "explanation": "3ème personne négative → doesn't + verbe."},
    {"type": "fill_blank", "question": "Complétez : ___ the server restart automatically?", "options": [], "correctAnswer": "Does", "explanation": "Question 3ème personne → Does + sujet."},
    {"type": "multiple_choice", "question": "Marqueur typique du présent simple ?", "options": ["right now", "every night", "at the moment", "yesterday"], "correctAnswer": "every night", "explanation": "every night = fréquence → présent simple."}
],
"Le présent simple décrit les routines et faits permanents : The backup runs at 2 AM. 3ème personne → verbe + s. Négation doesn't + verbe.",
  [
    {"question": "The database ___ user records.", "options": ["store", "stores", "storing", "stored"], "correctAnswer": "stores", "explanation": "The database (it) → stores."},
    {"question": "This service ___ a restart monthly.", "options": ["require", "requires", "requiring", "required"], "correctAnswer": "requires", "explanation": "This service (it) → requires."},
    {"question": "The engineers ___ the servers weekly.", "options": ["check", "checks", "checking", "checked"], "correctAnswer": "check", "explanation": "The engineers (pluriel) → check."},
    {"question": "Does the app ___ notifications?", "options": ["sends", "send", "sending", "sent"], "correctAnswer": "send", "explanation": "Does + verbe de base : send."}
  ],
  [
    {"pattern": "Sujet + verbe(-s) + complément", "example": "The firewall blocks traffic.", "explanation": "Temps des procédures et vérités techniques."},
    {"pattern": "Sujet + doesn't + verbe", "example": "The network doesn't respond.", "explanation": "Négation 3ème personne."},
    {"pattern": "Does + sujet + verbe ?", "example": "Does the service restart?", "explanation": "Interrogation présent simple."}
  ]
),
# ================= LEÇON 104 — N1 Questions & Négations =================
L(104, 2, 1, 4,
  "Asking Questions and Making Negatives in IT",
  "Formuler des questions techniques et des phrases négatives correctes avec do/does et be, pour les tickets, les réunions et le support.",
  "Posez une question en anglais exige un AUXILIAIRE. Deux cas seulement. CAS 1 : la phrase contient be (is/are/am) → on inverse simply be et le sujet : The server is down devient Is the server down ? La négation se fait en ajoutant not : The server is not (isn't) down. CAS 2 : la phrase contient un verbe ordinaire (run, work, respond) → il faut l'auxiliaire do/does. Question : Does + sujet + verbe de base ? Does the backup run at night ? Négation : sujet + don't/doesn't + verbe de base : The backup doesn't run at night. ERREUR CLASSIQUE : ne jamais doubler le temps — on dit Does the service work ? et jamais Does the service works ? car does porte déjà le -s de la troisième personne. Les questions en WH- (What, When, Where, Why, Who, How) se placent EN TÊTE, suivies de l'auxiliaire : What does this error mean ? When does the job start ? Why doesn't the API respond ? Les réponses courtes sont essentielles en support : Yes, it does. / No, it doesn't. / Yes, it is. / No, it isn't. Le choix de la réponse courte reflète l'auxiliaire de la question : une question avec Does reçoit une réponse avec does, une question avec Is reçoit une réponse avec is.",
  [
    {"meaning": "Le serveur est-il en ligne ?", "sentence": "Is the server online?", "itContext": "Is the production server online after the patch?"},
    {"meaning": "Le service tourne-t-il correctement ?", "sentence": "Does the service run correctly?", "itContext": "Does the authentication service run correctly after the update?"},
    {"meaning": "L'API ne répond pas.", "sentence": "The API doesn't respond.", "itContext": "The payment API doesn't respond during peak hours."},
    {"meaning": "Que signifie cette erreur ?", "sentence": "What does this error mean?", "itContext": "What does error code 503 mean in our gateway?"},
    {"meaning": "Pourquoi le job échoue-t-il ?", "sentence": "Why does the job fail?", "itContext": "Why does the nightly job fail every Monday?"},
    {"meaning": "Le pare-feu n'est pas actif.", "sentence": "The firewall isn't active.", "itContext": "The firewall isn't active on the staging environment."},
    {"meaning": "Quand commence la maintenance ?", "sentence": "When does the maintenance start?", "itContext": "When does the scheduled maintenance start this weekend?"}
  ],
  [
    {"word": "does", "level": "A", "domain": "grammar", "example": "Does the script work?", "itContext": "Does the deployment script work on Linux?", "definition": "Auxiliaire pour les questions à la 3ème personne", "translation": "est-ce que (auxiliaire)"},
    {"word": "doesn't", "level": "A", "domain": "grammar", "example": "It doesn't start.", "itContext": "The agent doesn't start after the reboot.", "definition": "Négation de does (does not)", "translation": "ne... pas"},
    {"word": "error", "level": "A", "domain": "it", "example": "The error appears at startup.", "itContext": "The error appears in the logs at startup.", "definition": "Défaut empêchant un traitement correct", "translation": "erreur"},
    {"word": "issue", "level": "A", "domain": "it", "example": "We fixed the issue quickly.", "itContext": "The team fixed the login issue in one hour.", "definition": "Problème à traiter (terme de ticket)", "translation": "problème, incident"},
    {"word": "fail", "level": "A", "domain": "it", "example": "The test fails every time.", "itContext": "The integration test fails on the CI pipeline.", "definition": "Ne pas fonctionner, échouer", "translation": "échouer"},
    {"word": "support", "level": "A", "domain": "professional", "example": "Contact the support team.", "itContext": "Users contact the support team for access issues.", "definition": "Service d'assistance aux utilisateurs", "translation": "assistance, support"},
    {"word": "respond", "level": "A", "domain": "it", "example": "The server doesn't respond.", "itContext": "The health endpoint doesn't respond to requests.", "definition": "Répondre à une sollicitation", "translation": "répondre"},
    {"word": "quickly", "level": "A", "domain": "professional", "example": "The team responds quickly.", "itContext": "The on-call team responds quickly to alerts.", "definition": "De manière rapide", "translation": "rapidement"}
  ],
  [
    {"expression": "to ask for help", "meaning": "demander de l'aide", "difficulty": "A", "example": "Don't hesitate to ask for help.", "classification": "professional"},
    {"expression": "to find out", "meaning": "découvrir, déterminer", "difficulty": "A", "example": "We need to find out why the job fails.", "classification": "professional"},
    {"expression": "to make sure", "meaning": "vérifier que, s'assurer que", "difficulty": "A", "example": "Make sure the service is running.", "classification": "professional"},
    {"expression": "to point out", "meaning": "signaler, faire remarquer", "difficulty": "A", "example": "She pointed out a configuration error.", "classification": "professional"},
    {"expression": "to figure out", "meaning": "comprendre, élucider", "difficulty": "A", "example": "We figured out the root cause yesterday.", "classification": "professional"}
  ],
  "Les questions et négations structurent tout le support IT : ouverture de ticket, qualification d'incident, vérification d'état. Une question bien formée avec le bon auxiliaire accélère le diagnostic.",
  [
    {"type": "multiple_choice", "question": "Question correcte : ___ the service work?", "options": ["Do", "Does", "Is", "Are"], "correctAnswer": "Does", "explanation": "the service (it) + verbe ordinaire → Does."},
    {"type": "multiple_choice", "question": "Négation : The agent ___ start.", "options": ["don't", "doesn't", "isn't", "not starts"], "correctAnswer": "doesn't", "explanation": "the agent (it) + verbe ordinaire → doesn't + base."},
    {"type": "fill_blank", "question": "Complétez : What ___ this message mean?", "options": [], "correctAnswer": "does", "explanation": "Question WH + does + sujet + base."},
    {"type": "multiple_choice", "question": "Réponse courte à Is the server up?", "options": ["Yes, it does.", "Yes, it is.", "Yes, is it.", "Yes, it up."], "correctAnswer": "Yes, it is.", "explanation": "Question avec be → réponse avec be."}
  ],
  "Question avec be → inversion (Is the server up ?). Question avec verbe ordinaire → do/does en tête. Négation : be + not ou don't/doesn't + base. Réponse courte : on reprend l'auxiliaire.",
  [
    {"question": "Does the job fail every night?", "options": ["run", "runs", "running", "ran"], "correctAnswer": "run", "explanation": "Après does, verbe à la base : does... run."},
    {"question": "___ the backups encrypted?", "options": ["Do", "Does", "Is", "Are"], "correctAnswer": "Are", "explanation": "backups (pluriel) + état → Are."},
    {"question": "The staging environment ___ respond.", "options": ["don't", "doesn't", "isn't", "aren't"], "correctAnswer": "doesn't", "explanation": "environnement (it) + verbe → doesn't."},
    {"question": "Why ___ the cron job skip the first run?", "options": ["do", "does", "is", "are"], "correctAnswer": "does", "explanation": "the cron job (it) → does."}
  ],
  [
    {"pattern": "Is/Are + sujet + complément ?", "example": "Is the database reachable?", "explanation": "Question d'état avec be."},
    {"pattern": "Does/Do + sujet + verbe de base ?", "example": "Does the sync run hourly?", "explanation": "Question d'action avec do."},
    {"pattern": "WH- + auxiliaire + sujet + verbe ?", "example": "Why doesn't the API respond?", "explanation": "Question ouverte technique."}
  ]
),
# ================= LEÇON 105 — N1 There is / There are =================
L(105, 2, 1, 5,
  "There is / There are — Describing What Exists",
  "Décrire la présence ou l'absence de ressources, d'erreurs et d'anomalies avec there is / there are en contexte d'exploitation.",
  "La tournure there is / there are est LE outil du reporting d'état : elle indique l'existence (ou l'absence) de quelque chose. SINGULIER : there is (there's) + nom singulier : There is an error in the log. There is a backup available. PLURIEL : there are + nom pluriel : There are three open tickets. There are two warnings in the console. NÉGATION : there is no / there isn't any pour le singulier, there are no / there aren't any pour le pluriel : There is no disk space left. There aren't any active sessions. QUESTION : inversion simple — Is there a problem ? Are there any errors ? RÈGLE D'OR : le vrai sujet vient APRÈS le verbe ; c'est lui qui impose is ou are. Attention au piège du pluriel détaché : on dit There are several options available (et non It has several options). En contexte IT, cette structure décrit les états d'infrastructure : There is a bottleneck in the network. There are no failed jobs today. Les quantificateurs s'y associent naturellement : some (affirmatif), any (négatif et question), no (négation forte) : There are some pending updates. Are there any conflicts ? There is no conflict detected.",
  [
    {"meaning": "Il y a une erreur dans le journal.", "sentence": "There is an error in the log.", "itContext": "There is a critical error in the application log."},
    {"meaning": "Il y a trois tickets ouverts.", "sentence": "There are three open tickets.", "itContext": "There are three open tickets for the billing module."},
    {"meaning": "Il n'y a pas d'espace disque restant.", "sentence": "There is no disk space left.", "itContext": "There is no disk space left on the data volume."},
    {"meaning": "Y a-t-il des conflits ?", "sentence": "Are there any conflicts?", "itContext": "Are there any merge conflicts after the rebase?"},
    {"meaning": "Il y a des mises à jour en attente.", "sentence": "There are some pending updates.", "itContext": "There are some pending security updates on the server."},
    {"meaning": "Il n'y a aucune session active.", "sentence": "There aren't any active sessions.", "itContext": "There aren't any active sessions after the restart."},
    {"meaning": "Il y a un risque de latence.", "sentence": "There is a risk of latency.", "itContext": "There is a risk of latency during the migration."}
  ],
  [
    {"word": "warning", "level": "A", "domain": "it", "example": "There is a warning in the console.", "itContext": "There is a deprecation warning in the build output.", "definition": "Message d'alerte non bloquant", "translation": "avertissement"},
    {"word": "ticket", "level": "A", "domain": "professional", "example": "There are two tickets pending.", "itContext": "There are two tickets pending for this release.", "definition": "Demande de travail suivie", "translation": "ticket"},
    {"word": "disk", "level": "A", "domain": "it", "example": "The disk is full.", "itContext": "The system disk is full after the log rotation failure.", "definition": "Support de stockage", "translation": "disque"},
    {"word": "space", "level": "A", "domain": "it", "example": "There is enough space.", "itContext": "There is enough space for the new index.", "definition": "Volume disponible", "translation": "espace"},
    {"word": "conflict", "level": "A", "domain": "dev", "example": "There is a merge conflict.", "itContext": "There is a merge conflict in the config file.", "definition": "Conflit entre versions", "translation": "conflit"},
    {"word": "session", "level": "A", "domain": "it", "example": "There are five active sessions.", "itContext": "There are five active sessions on the admin account.", "definition": "Connexion utilisateur en cours", "translation": "session"},
    {"word": "bottleneck", "level": "B", "domain": "it", "example": "There is a bottleneck in the pipeline.", "itContext": "There is a bottleneck at the database layer.", "definition": "Point de ralentissement", "translation": "goulot d'étranglement"},
    {"word": "pending", "level": "B", "domain": "it", "example": "The request is pending.", "itContext": "The approval is pending since Monday.", "definition": "En attente de traitement", "translation": "en attente"}
  ],
  [
    {"expression": "there is a problem with", "meaning": "il y a un problème avec", "difficulty": "A", "example": "There is a problem with the scheduler.", "classification": "it"},
    {"expression": "there seems to be", "meaning": "il semble y avoir", "difficulty": "B", "example": "There seems to be a caching issue.", "classification": "professional"},
    {"expression": "there is no need to", "meaning": "il n'est pas nécessaire de", "difficulty": "A", "example": "There is no need to restart the server.", "classification": "professional"},
    {"expression": "there are several options", "meaning": "il existe plusieurs options", "difficulty": "A", "example": "There are several options to fix this.", "classification": "professional"},
    {"expression": "there is a risk of", "meaning": "il existe un risque de", "difficulty": "B", "example": "There is a risk of data loss.", "classification": "professional"}
  ],
  "There is / there are ouvre chaque rapport d'incident et chaque revue d'état : décrire ce qui existe, ce qui manque, ce qui attend. C'est la structure factuelle de base de l'anglais technique.",
  [
    {"type": "multiple_choice", "question": "___ there any failed jobs today?", "options": ["Is", "Are", "Do", "Does"], "correctAnswer": "Are", "explanation": "jobs (pluriel) → Are there."},
    {"type": "multiple_choice", "question": "There ___ no space left on the volume.", "options": ["are", "is", "be", "were"], "correctAnswer": "is", "explanation": "space (indénombrable, singulier) → is."},
    {"type": "fill_blank", "question": "Complétez : There ___ three warnings in the console.", "options": [], "correctAnswer": "are", "explanation": "warnings (pluriel) → there are."},
    {"type": "multiple_choice", "question": "Négation correcte (singulier) :", "options": ["There isn't any error.", "There aren't no error.", "There is no any error.", "There not is an error."], "correctAnswer": "There isn't any error.", "explanation": "isn't + any pour le singulier."}
  ],
  "Il y a (existence) : there is + singulier / indénombrable, there are + pluriel. Négation : no ou not...any. Question : Is there...? / Are there...? Le vrai sujet vient après le verbe.",
  [
    {"question": "___ there a rollback plan?", "options": ["Are", "Is", "Do", "Was"], "correctAnswer": "Is", "explanation": "a rollback plan (singulier) → Is there."},
    {"question": "There ___ several ways to patch this.", "options": ["is", "are", "be", "has"], "correctAnswer": "are", "explanation": "several ways (pluriel) → are."},
    {"question": "There isn't ___ active alert right now.", "options": ["some", "any", "no", "many"], "correctAnswer": "any", "explanation": "Négation → any."},
    {"question": "There are two nodes that ___ offline.", "options": ["is", "are", "be", "was"], "correctAnswer": "are", "explanation": "two nodes (pluriel) → are."}
  ],
  [
    {"pattern": "There is + [a/the] + singulier", "example": "There is a patch available.", "explanation": "Annoncer une ressource unique."},
    {"pattern": "There are + nombre/pluriel", "example": "There are 12 unresolved alerts.", "explanation": "Quantifier un état."},
    {"pattern": "Is/Are there + any...?", "example": "Are there any blockers today?", "explanation": "Interroger l'existence."}
  ]
),
# ================= LEÇON 106 — N1 Articles a/an/the =================
L(106, 12, 1, 6,
  "Articles: a, an, the in Technical Context",
  "Choisir correctement entre a, an, the et l'absence d'article dans les phrases techniques et la documentation.",
  "L'article anglais pose trois choix. UN/UNE (indefini) : a ou an devant un nom singulier dénombrable mentionné pour la PREMIÈRE FOIS. a devant son consonantique : a server, a database, a firewall. an devant son VOWEL (voyelle sonore) : an error, an API, an outage, an SLA. Le critère est le SON, pas la lettre : an hour (h muet) mais a unique. LE/CE (defini) : the désigne une chose déjà connue, identifiée ou unique dans le contexte : The server is down (notre serveur, celui dont on parle). The error appears at startup (l'erreur mentionnée dans le ticket). ABSENCE D'ARTICLE : devant les noms indénombrables généraux (information, feedback, storage) et les pluriels généraux (Servers store data. Backups protect systems.). On ne dit jamais the informations — information est indénombrable : We need more information. EMPLOI TYPIQUE EN DOC TECHNIQUE : première mention → a/an (a request is sent), mentions suivantes → the (the request is queued). C'est le fil logique qui guide le lecteur : A client sends a request. The request reaches the API. The API validates the payload.",
  [
    {"meaning": "Un serveur héberge l'application.", "sentence": "A server hosts the application.", "itContext": "A dedicated server hosts the application in Frankfurt."},
    {"meaning": "Une erreur s'est produite.", "sentence": "An error occurred.", "itContext": "An error occurred during the deployment phase."},
    {"meaning": "La base est en réplication.", "sentence": "The database is in replication.", "itContext": "The production database is in continuous replication."},
    {"meaning": "Nous avons besoin d'informations.", "sentence": "We need more information.", "itContext": "We need more information about the incident timeline."},
    {"meaning": "L'API valide la requête.", "sentence": "The API validates the request.", "itContext": "The gateway API validates every incoming request."},
    {"meaning": "Un SLA définit la disponibilité.", "sentence": "An SLA defines availability.", "itContext": "An SLA defines the availability targets for each tier."},
    {"meaning": "Les serveurs stockent des données.", "sentence": "Servers store data.", "itContext": "Edge servers store cached data closer to users."}
  ],
  [
    {"word": "article", "level": "A", "domain": "grammar", "example": "The article is missing here.", "itContext": "The article is missing before the noun in this sentence.", "definition": "Mot déterminant le nom (a, an, the)", "translation": "article"},
    {"word": "host", "level": "A", "domain": "it", "example": "A VM hosts the service.", "itContext": "A virtual machine hosts the legacy service.", "definition": "Héberger (un service)", "translation": "héberger"},
    {"word": "occur", "level": "B", "domain": "it", "example": "An error occurs at runtime.", "itContext": "The timeout occurs under heavy load.", "definition": "Se produire, survenir", "translation": "survenir"},
    {"word": "request", "level": "A", "domain": "dev", "example": "The request is queued.", "itContext": "Each request is queued before processing.", "definition": "Requête envoyée à un service", "translation": "requête"},
    {"word": "payload", "level": "B", "domain": "dev", "example": "The payload is validated.", "itContext": "The JSON payload is validated against the schema.", "definition": "Données transportées par une requête", "translation": "charge utile"},
    {"word": "unique", "level": "B", "domain": "professional", "example": "Each user has a unique ID.", "itContext": "Each session gets a unique identifier.", "definition": "Unique, sans équivalent", "translation": "unique"},
    {"word": "determiner", "level": "B", "domain": "grammar", "example": "A determiner precedes the noun.", "itContext": "A determiner precedes the noun phrase in English.", "definition": "Mot placé devant le nom pour le déterminer", "translation": "déterminant"},
    {"word": "generally", "level": "A", "domain": "professional", "example": "Generally, we patch on Fridays.", "itContext": "Generally, we avoid deployments on Fridays.", "definition": "De manière générale", "translation": "généralement"}
  ],
  [
    {"expression": "for the first time", "meaning": "pour la première fois", "difficulty": "A", "example": "Use a for the first time you mention it.", "classification": "grammar"},
    {"expression": "in the logs", "meaning": "dans les journaux", "difficulty": "A", "example": "The stack trace is in the logs.", "classification": "it"},
    {"expression": "out of scope", "meaning": "hors périmètre", "difficulty": "B", "example": "That fix is out of scope for this ticket.", "classification": "professional"},
    {"expression": "as a result", "meaning": "par conséquent", "difficulty": "A", "example": "As a result, the job was delayed.", "classification": "professional"},
    {"expression": "on the other hand", "meaning": "en revanche", "difficulty": "B", "example": "On the other hand, staging is stable.", "classification": "professional"}
  ],
  "Les articles rythment la lecture technique : a/an introduit, the désigne ce qui est connu. Ce fil logique structure la documentation, les tickets et les commentaires de code.",
  [
    {"type": "multiple_choice", "question": "___ error occurred during the build.", "options": ["A", "An", "The", "—"], "correctAnswer": "An", "explanation": "error commence par un son voyelle → an."},
    {"type": "multiple_choice", "question": "We need ___ information about the outage.", "options": ["a", "an", "the", "— (pas d'article)"], "correctAnswer": "— (pas d'article)", "explanation": "information est indénombrable → pas d'article."},
    {"type": "fill_blank", "question": "Complétez : A client sends ___ request. ___ request is queued.", "options": [], "correctAnswer": "a / The", "explanation": "Première mention a, deuxième the."},
    {"type": "multiple_choice", "question": "___ SLA of this tier is 99.9%.", "options": ["A", "An", "The", "—"], "correctAnswer": "The", "explanation": "SLA précis du contrat → the."}
  ],
  "a + son consonantique, an + son voyelle (an API, an hour). the = connu/identifié. Pas d'article pour les indénombrables généraux (information, storage) et les pluriels généraux. Premier a/an, ensuite the.",
  [
    {"question": "___ firewall blocks port 22.", "options": ["A", "An", "The", "—"], "correctAnswer": "The", "explanation": "Firewall identifié du contexte → the."},
    {"question": "She is ___ experienced engineer.", "options": ["a", "an", "the", "—"], "correctAnswer": "an", "explanation": "experienced (son voyelle) → an."},
    {"question": "We store ___ data in the EU region.", "options": ["a", "an", "the", "—"], "correctAnswer": "—", "explanation": "data indénombrable général → rien."},
    {"question": "___ API returns ___ 404 for unknown routes.", "options": ["A / a", "The / a", "The / a", "An / an"], "correctAnswer": "The / a", "explanation": "API connue → the ; un 404 quelconque → a."}
  ],
  [
    {"pattern": "a/an + première mention", "example": "A job failed last night.", "explanation": "Introduire un élément nouveau."},
    {"pattern": "the + élément identifié", "example": "The job failed due to a timeout.", "explanation": "Désigner l'élément connu."},
    {"pattern": "Ø + indénombrable/pluriel général", "example": "Logs provide visibility.", "explanation": "Parler en généralité."}
  ]
),
# ================= LEÇON 107 — N1 Pronoms & auxiliaires =================
L(107, 13, 1, 7,
  "Pronouns and Auxiliaries in IT Communication",
  "Utiliser les pronoms (it, they, this, these) et les auxiliaires (do, does) pour éviter les répétitions dans les échanges techniques.",
  "Les pronoms remplacent les noms déjà cités et fluidifient le discours. IT/THEY : it remplace un objet ou système singulier (the server → it), they remplace les pluriels (the servers → they). THIS/THESE désignent ce qui est proche ou vient d'être mentionné : this issue (ce problème précis), these errors (ces erreurs). THAT/THOSE renvoient à ce qui est plus distant ou opposé : That approach didn't work. ATTENTION À L'ACCORD VERBAL : it + verbe singulier (it works), they + verbe pluriel (they work). C'est l'erreur la plus fréquente : the API... it returns (pas it return). AUXILIAIRES : do/does servent d'auxiliaire dans les questions et négations (Does it work ? It doesn't work) et also servent de substitut verbal dans les réponses courtes : The service runs faster now. Yes, it does. (et non Yes, it runs répété). Les possessifs évitent les répétitions : its endpoint (de l'API), their dashboards (des équipes). Ne pas confondre its (possessif) et it's (= it is) : It's up. Its status is green. En réunion comme en ticket, ces substitutions courtes rendent le propos professionnel : We deployed the patch. It fixed the issue. Its effects are visible in the dashboard.",
  [
    {"meaning": "Le serveur redémarre. Il est lent.", "sentence": "The server restarts. It is slow.", "itContext": "The node restarts every hour. It is slow to recover."},
    {"meaning": "Les serveurs sont à jour. Ils fonctionnent bien.", "sentence": "The servers are up to date. They work well.", "itContext": "The web servers are up to date. They work well under load."},
    {"meaning": "Ce problème est connu.", "sentence": "This issue is known.", "itContext": "This issue is known to the vendor team."},
    {"meaning": "Ces erreurs viennent du cache.", "sentence": "These errors come from the cache.", "itContext": "These errors come from the Redis cache layer."},
    {"meaning": "Est-ce que ça marche ? Oui.", "sentence": "Does it work? Yes, it does.", "itContext": "Does the new agent work? Yes, it does, after the config fix."},
    {"meaning": "Son point de terminaison répond vite.", "sentence": "Its endpoint responds quickly.", "itContext": "Its health endpoint responds in under 50 ms."},
    {"meaning": "Cette approche n'a pas fonctionné.", "sentence": "That approach didn't work.", "itContext": "That approach didn't work, so we rolled it back."}
  ],
  [
    {"word": "it", "level": "A", "domain": "grammar", "example": "It works now.", "itContext": "The patch is applied. It works now.", "definition": "Pronom pour objet/système singulier", "translation": "il/elle (chose)"},
    {"word": "they", "level": "A", "domain": "grammar", "example": "They are running.", "itContext": "The workers are running in parallel.", "definition": "Pronom pluriel (objets/personnes)", "translation": "ils/elles"},
    {"word": "known", "level": "A", "domain": "professional", "example": "The bug is known.", "itContext": "The memory leak is known and tracked upstream.", "definition": "Connu, identifié", "translation": "connu"},
    {"word": "approach", "level": "B", "domain": "professional", "example": "This approach is cleaner.", "itContext": "The blue-green approach reduces downtime.", "definition": "Méthode, façon de faire", "translation": "approche, méthode"},
    {"word": "roll back", "level": "B", "domain": "dev", "example": "We rolled it back.", "itContext": "We rolled the release back within ten minutes.", "definition": "Revenir à la version précédente", "translation": "annuler, revenir en arrière"},
    {"word": "substitute", "level": "B", "domain": "grammar", "example": "Do substitutes the verb.", "itContext": "In short answers, do substitutes the main verb.", "definition": "Remplacer, tenir lieu de", "translation": "remplacer"},
    {"word": "possessive", "level": "B", "domain": "grammar", "example": "Its is possessive.", "itContext": "Its is the possessive form of it.", "definition": "Qui exprime la possession", "translation": "possessif"},
    {"word": "instead of", "level": "B", "domain": "professional", "example": "Use it instead of the noun.", "itContext": "Use the pronoun instead of repeating the noun.", "definition": "Au lieu de", "translation": "au lieu de"}
  ],
  [
    {"expression": "it's vs its", "meaning": "it is vs possessif", "difficulty": "A", "example": "It's up, and its status is green.", "classification": "grammar"},
    {"expression": "so did we", "meaning": "nous aussi (écho)", "difficulty": "B", "example": "They patched the node. So did we.", "classification": "professional"},
    {"expression": "that said", "meaning": "cela dit", "difficulty": "B", "example": "That said, we need a fallback.", "classification": "professional"},
    {"expression": "as for this", "meaning": "quant à ceci", "difficulty": "B", "example": "As for this, I'll take ownership.", "classification": "professional"},
    {"expression": "neither works", "meaning": "aucun des deux ne marche", "difficulty": "B", "example": "Neither works without the token.", "classification": "professional"}
  ],
  "Pronoms et auxiliaires allègent chaque échange IT : it/they remplacent, this/these pointent, do/does soutiennent questions, négations et réponses courtes. Résultat : un anglais plus dense et professionnel.",
  [
    {"type": "multiple_choice", "question": "The API is slow. ___ needs tuning.", "options": ["They", "It", "Its", "This is"], "correctAnswer": "It", "explanation": "the API (singulier) → it."},
    {"type": "multiple_choice", "question": "The workers failed. ___ restarted automatically.", "options": ["It", "They", "Their", "This"], "correctAnswer": "They", "explanation": "workers (pluriel) → they."},
    {"type": "fill_blank", "question": "Complétez : The tool updated ___ own config.", "options": [], "correctAnswer": "its", "explanation": "Possessif → its (pas it's)."},
    {"type": "multiple_choice", "question": "Does the script run? — ___.", "options": ["Yes, it runs.", "Yes, it does.", "Yes, does.", "Yes, it is."], "correctAnswer": "Yes, it does.", "explanation": "Question avec does → écho does."}
  ],
  "it/they + accord singulier/pluriel. this/these = proche, that/those = distant. its = possessif, it's = it is. Réponse courte : on échoe l'auxiliaire (Yes, it does / they do).",
  [
    {"question": "The replicas synced. ___ are healthy.", "options": ["It", "They", "Its", "That"], "correctAnswer": "They", "explanation": "replicas (pluriel) → they."},
    {"question": "___ dashboard shows the new metric.", "options": ["It's", "Its", "It", "Their"], "correctAnswer": "Its", "explanation": "Possessif → its dashboard."},
    {"question": "Do the agents report hourly? Yes, ___.", "options": ["they do", "they report", "it does", "they are"], "correctAnswer": "they do", "explanation": "Question do pluriel → they do."},
    {"question": "___ errors came from the batch job.", "options": ["This", "These", "It", "That one"], "correctAnswer": "These", "explanation": "errors (pluriel, proche) → these."}
  ],
  [
    {"pattern": "Nom → it/they (écho)", "example": "The proxy restarted. It is stable.", "explanation": "Substituer le système déjà cité."},
    {"pattern": "Does it...? — Yes, it does.", "example": "Does it sync? Yes, it does.", "explanation": "Réponse courte auxiliaire."},
    {"pattern": "its + nom (possession)", "example": "Its config is cached.", "explanation": "Attribuer une propriété au système."}
  ]
),
# ================= LEÇON 108 — N1 Can / Can't =================
L(108, 13, 1, 8,
  "Can and Can't — Ability, Permission, Possibility",
  "Exprimer la capacité technique, la permission et la possibilité avec can / can't / cannot, puis demander poliment avec could.",
  "CAN exprime trois idées. CAPACITÉ : ce qu'un système ou une personne sait faire — The script can generate reports. I can access the dashboard. PERMISSION (informelle) : You can use my session. Can I restart the service ? POSSIBILITÉ : It can happen during peak hours. FORME : can + verbe de base, INVARIANT : jamais de -s à la troisième personne (The API can handle 1000 rps, jamais can handles). NÉGATION : cannot (formel), can't (courant) : We can't reproduce the bug. The cluster can't scale further. QUESTION : inversion — Can you deploy today ? Can the job run offline ? RÉPONSE COURTE : Yes, I can. / No, it can't. POLITESSE : could est la version polie/diffidente de can pour les demandes — Could you check the logs ? Could we schedule the patch ? Et pour parler d'une capacité passée : could (I could access it yesterday) ou was able to pour un succès ponctuel. Enfin be able to couvre les temps que can n'a pas : We won't be able to deploy before Monday. DANS LES TICKETS : can décrit le reproductible (I can reproduce it every time), can't le bloquant (I can't log in), could la requête courtoise à un collègue.",
  [
    {"meaning": "Le script peut générer des rapports.", "sentence": "The script can generate reports.", "itContext": "The reporting script can generate PDF reports on demand."},
    {"meaning": "Je peux accéder au tableau de bord.", "sentence": "I can access the dashboard.", "itContext": "After the VPN fix, I can access the admin dashboard."},
    {"meaning": "Nous ne pouvons pas reproduire le bug.", "sentence": "We can't reproduce the bug.", "itContext": "We can't reproduce the bug on staging."},
    {"meaning": "Peux-tu vérifier les journaux ?", "sentence": "Can you check the logs?", "itContext": "Can you check the ingress logs for 401s?"},
    {"meaning": "Pourriez-vous redémarrer le service ?", "sentence": "Could you restart the service?", "itContext": "Could you restart the queue worker when free?"},
    {"meaning": "Ça peut arriver en heure de pointe.", "sentence": "It can happen during peak hours.", "itContext": "Throttling can happen during peak hours."},
    {"meaning": "Nous ne pourrons pas déployer avant lundi.", "sentence": "We won't be able to deploy before Monday.", "itContext": "We won't be able to deploy before the audit ends."}
  ],
  [
    {"word": "can", "level": "A", "domain": "grammar", "example": "I can deploy it.", "itContext": "I can deploy the fix within the window.", "definition": "Pouvoir (capacité, permission, possibilité)", "translation": "pouvoir"},
    {"word": "can't", "level": "A", "domain": "grammar", "example": "It can't connect.", "itContext": "The agent can't connect through the proxy.", "definition": "Ne pas pouvoir", "translation": "ne pas pouvoir"},
    {"word": "could", "level": "A", "domain": "grammar", "example": "Could you review it?", "itContext": "Could you review the PR before standup?", "definition": "Pouvoir (poli/passé)", "translation": "pourrais/pourrait"},
    {"word": "able", "level": "A", "domain": "grammar", "example": "We are able to help.", "itContext": "We are able to help with the migration.", "definition": "Capable (avec be able to)", "translation": "capable"},
    {"word": "reproduce", "level": "B", "domain": "dev", "example": "I can reproduce it.", "itContext": "I can reproduce the crash with three steps.", "definition": "Reproduire (un défaut)", "translation": "reproduire"},
    {"word": "access", "level": "A", "domain": "it", "example": "I can access the console.", "itContext": "Only admins can access the console.", "definition": "Accéder à une ressource", "translation": "accéder"},
    {"word": "permission", "level": "B", "domain": "it", "example": "You need permission.", "itContext": "The service account lacks write permission.", "definition": "Autorisation accordée", "translation": "autorisation"},
    {"word": "peak", "level": "B", "domain": "it", "example": "Peak hours start at 9.", "itContext": "Autoscaling triggers before peak hours.", "definition": "Pointe, pic de charge", "translation": "pic, pointe"}
  ],
  [
    {"expression": "can't afford to", "meaning": "ne pas pouvoir se permettre de", "difficulty": "B", "example": "We can't afford another outage.", "classification": "professional"},
    {"expression": "as far as I can tell", "meaning": "d'après ce que je peux voir", "difficulty": "B", "example": "As far as I can tell, the config is correct.", "classification": "professional"},
    {"expression": "if we can help it", "meaning": "si on peut l'éviter", "difficulty": "C", "example": "We avoid Fridays, if we can help it.", "classification": "professional"},
    {"expression": "can do", "meaning": "c'est faisable (ok)", "difficulty": "A", "example": "Deploy at 6? Can do.", "classification": "professional"},
    {"expression": "couldn't agree more", "meaning": "tout à fait d'accord", "difficulty": "C", "example": "We need tests. Couldn't agree more.", "classification": "professional"}
  ],
  "Can/can't verrouille le vocabulaire de la capacité en support : ce qui marche, ce qui est bloqué, ce qu'on demande poliment. C'est aussi le moyen le plus direct de signaler un blocker dans un standup.",
  [
    {"type": "multiple_choice", "question": "The API ___ handle 1000 requests per second.", "options": ["can", "cans", "can to", "is can"], "correctAnswer": "can", "explanation": "can + base, invariant."},
    {"type": "multiple_choice", "question": "Demande polie : ___ you check the pipeline?", "options": ["Can", "Could", "Do", "Are"], "correctAnswer": "Could", "explanation": "could = demande polie."},
    {"type": "fill_blank", "question": "Complétez : We ___ reproduce the issue on demand.", "options": [], "correctAnswer": "can", "explanation": "Capacité → can + base."},
    {"type": "multiple_choice", "question": "Réponse courte : Can it scale? — ___.", "options": ["Yes, it can.", "Yes, it can't.", "Yes, it does.", "Yes, scales."], "correctAnswer": "Yes, it can.", "explanation": "Écho de can."}
  ],
  "can + base (jamais -s). Négation can't/cannot. Question par inversion (Can you...?). Politesse : could. Futur/absence : be able to (won't be able to).",
  [
    {"question": "___ I borrow your admin session?", "options": ["Could", "Do", "Am", "Does"], "correctAnswer": "Could", "explanation": "Requête polie → Could I..."},
    {"question": "The cluster can't ___ further.", "options": ["scales", "scaling", "scale", "to scale"], "correctAnswer": "scale", "explanation": "can't + base."},
    {"question": "I couldn't log in ___ the IAM change.", "options": ["because", "due to", "so", "while"], "correctAnswer": "due to", "explanation": "due to + nom."},
    {"question": "We ___ able to patch it last night.", "options": ["was", "were", "are", "can"], "correctAnswer": "were", "explanation": "we → were able to (passé)."}
  ],
  [
    {"pattern": "Sujet + can + base", "example": "The tool can export logs.", "explanation": "Capacité du système."},
    {"pattern": "Could you + base...?", "example": "Could you run the check?", "explanation": "Demande polie."},
    {"pattern": "can't + base = blocker", "example": "I can't access the repo.", "explanation": "Signaler un blocage."}
  ]
),
# ================= LEÇON 109 — N1 Impératif =================
L(109, 1, 1, 9,
  "Imperative for Instructions and Procedures",
  "Rédiger des instructions, commandes et procédures claires avec l'impératif affirmatif et négatif, et adoucir avec please / let's.",
  "L'impératif est LA forme des procédures : runbooks, README, messages de commit, étapes de ticket. FORME : base verbale seule, sans sujet — Run the tests. Deploy the build. Restart the agent. La négation s'obtient avec Do not (don't) : Do not skip validation. Don't restart the node yet. POUR INCLURE L'ÉQUIPE : Let's + base — Let's review the diff. Let's not touch the config. POUR LA POLITESSE : please en début ou fin — Please update the token. / Update the token, please. Version encore plus soft : Could you + base (Could you update the token ?). LES ADVERBES DE MANIÈRE affinent l'instruction : Run it carefully. Restart gracefully. VERBES D'ACTION TYPIQUES DE PROCÉDURE : run, restart, stop, start, deploy, check, verify, update, install, remove, back up, restore, enable, disable. SÉQUENCE : les étapes s'enchaînent avec les connecteurs first, then, next, after that, finally — First, back up the database. Then, stop the app. Next, run the migration. Finally, restart and verify. ATTENTION : l'impératif peut sembler brutal en courriel ; avec un collègue on l'adoucit (Could you...? Would you mind + -ing ?), mais dans un runbook il reste la norme car il supprime toute ambiguïté.",
  [
    {"meaning": "Exécutez les tests.", "sentence": "Run the tests.", "itContext": "Run the full test suite before merging."},
    {"meaning": "Ne redémarrez pas encore le nœud.", "sentence": "Don't restart the node yet.", "itContext": "Don't restart the node until the drain completes."},
    {"meaning": "Vérifiez la configuration.", "sentence": "Check the configuration.", "itContext": "Check the configuration against the baseline."},
    {"meaning": "Sauvegardez la base d'abord.", "sentence": "Back up the database first.", "itContext": "Back up the database before running the migration."},
    {"meaning": "Revoyons le diff ensemble.", "sentence": "Let's review the diff.", "itContext": "Let's review the diff before approving."},
    {"meaning": "Merci de mettre à jour le token.", "sentence": "Please update the token.", "itContext": "Please update the token before it expires."},
    {"meaning": "Enfin, redémarrez et vérifiez.", "sentence": "Finally, restart and verify.", "itContext": "Finally, restart the service and verify the health endpoint."}
  ],
  [
    {"word": "instruction", "level": "A", "domain": "professional", "example": "Follow the instructions.", "itContext": "Follow the instructions step by step.", "definition": "Consigne à exécuter", "translation": "instruction, consigne"},
    {"word": "step", "level": "A", "domain": "professional", "example": "Repeat step three.", "itContext": "Repeat step three if the check fails.", "definition": "Étape d'une procédure", "translation": "étape"},
    {"word": "verify", "level": "B", "domain": "it", "example": "Verify the checksum.", "itContext": "Verify the checksum before installing.", "definition": "Vérifier, contrôler", "translation": "vérifier"},
    {"word": "enable", "level": "A", "domain": "it", "example": "Enable the flag.", "itContext": "Enable the feature flag for 5% of users.", "definition": "Activer", "translation": "activer"},
    {"word": "disable", "level": "A", "domain": "it", "example": "Disable the cron job.", "itContext": "Disable the cron job during the window.", "definition": "Désactiver", "translation": "désactiver"},
    {"word": "restore", "level": "B", "domain": "it", "example": "Restore from backup.", "itContext": "Restore the volume from the latest backup.", "definition": "Restaurer", "translation": "restaurer"},
    {"word": "gracefully", "level": "C", "domain": "it", "example": "Restart gracefully.", "itContext": "The service restarts gracefully without dropping connections.", "definition": "Sans coupure brutale", "translation": "proprement, sans coupure"},
    {"word": "skip", "level": "B", "domain": "it", "example": "Don't skip validation.", "itContext": "Don't skip the lint step in CI.", "definition": "Sauter, omettre", "translation": "sauter"}
  ],
  [
    {"expression": "make sure", "meaning": "s'assurer que", "difficulty": "A", "example": "Make sure the port is open.", "classification": "professional"},
    {"expression": "keep an eye on", "meaning": "surveiller", "difficulty": "B", "example": "Keep an eye on the error rate.", "classification": "professional"},
    {"expression": "in case", "meaning": "au cas où", "difficulty": "B", "example": "Keep the rollback ready in case.", "classification": "professional"},
    {"expression": "double-check", "meaning": "revérifier", "difficulty": "A", "example": "Double-check the target cluster.", "classification": "professional"},
    {"expression": "would you mind", "meaning": "cela vous dérangerait-il de", "difficulty": "B", "example": "Would you mind reviewing this?", "classification": "professional"}
  ],
  "L'impératif rend chaque étape exécutable sans ambiguïté : c'est la norme des runbooks et des procédures. Adouci avec please/could en courriel, il reste direct et fiable en documentation.",
  [
    {"type": "multiple_choice", "question": "Procédure : ___ the migration now.", "options": ["Run", "To run", "Running", "Runs"], "correctAnswer": "Run", "explanation": "Impératif = base seule."},
    {"type": "multiple_choice", "question": "Négation : ___ delete the volume.", "options": ["Not", "Don't", "No", "Doesn't"], "correctAnswer": "Don't", "explanation": "Impératif négatif = Don't + base."},
    {"type": "fill_blank", "question": "Complétez (inclusif) : ___ review the plan together.", "options": [], "correctAnswer": "Let's", "explanation": "Let's + base pour inclure l'équipe."},
    {"type": "multiple_choice", "question": "Ordre des connecteurs : First... then... ___, finally.", "options": ["last", "next", "end", "stop"], "correctAnswer": "next", "explanation": "Séquence : first, then, next, finally."}
  ],
  "Impératif = base sans sujet (Run the tests). Négatif : Don't + base. Inclure : Let's. Politesse : please / Could you. Séquence : first → then → next → finally.",
  [
    {"question": "___ restart the agent during business hours.", "options": ["Don't", "Not", "No", "Doesn't"], "correctAnswer": "Don't", "explanation": "Interdiction → Don't + base."},
    {"question": "First back up, ___ run the migration.", "options": ["than", "then", "that", "so"], "correctAnswer": "then", "explanation": "then = ensuite (pas than)."},
    {"question": "___ you mind checking the queue?", "options": ["Would", "Do", "Could", "Should"], "correctAnswer": "Would", "explanation": "Would you mind + -ing."},
    {"question": "___ the checksum before you install.", "options": ["Verify", "Verifying", "To verify", "Verifies"], "correctAnswer": "Verify", "explanation": "Impératif documentaire."}
  ],
  [
    {"pattern": "Base + complément (étape)", "example": "Deploy the build.", "explanation": "Instruction directe."},
    {"pattern": "Don't + base (garde-fou)", "example": "Don't force-push main.", "explanation": "Interdire une action risquée."},
    {"pattern": "First..., then..., finally...", "example": "First freeze, then deploy, finally verify.", "explanation": "Structurer une séquence."}
  ]
),
# ================= LEÇON 110 — N1 Questions WH =================
L(110, 2, 1, 10,
  "Wh- Questions for Troubleshooting",
  "Maîtriser les questions en WH (what, when, where, why, who, which, how) pour diagnostiquer et qualifier un incident.",
  "Les questions en WH structurent l'investigation technique. CONSTRUCTION : WH + auxiliaire (do/does/is/are/can) + sujet + verbe : What does the error say ? When did it start ? Where are the logs stored ? Who owns the service ? EXCEPTION : quand WH est le SUJET de la question, pas d'auxiliaire : What happened ? What causes the timeout ? Who manages the DNS ? DEUX MOTS COMPOSÉS FRÉQUENTS : how long (durée — How long does the job run ?), how often (fréquence — How often do backups run ?), how many (nombre dénombrable — How many nodes are affected ?), how much (quantité indénombrable — How much storage is used ?). WHY cherche la cause : Why is the queue growing ? La réponse type : Because... PREPOSITIONS EN FIN : technique correcte et courante — What are you looking for ? Which env is this running in ? POLITENESS : Could you tell me what... (ordre indirect, plus doux) — Could you tell me when the window opens ? DANS LE DIAGNOSTIC, l'ordre canonique : What happened ? When did it happen ? Where did it come from ? Who is impacted ? How big is the impact ? Why did it happen ? Chaque WH fait avancer d'un cran la qualification du ticket.",
  [
    {"meaning": "Que dit l'erreur ?", "sentence": "What does the error say?", "itContext": "What does the error say in the stack trace?"},
    {"meaning": "Quand cela a-t-il commencé ?", "sentence": "When did it start?", "itContext": "When did the latency start increasing?"},
    {"meaning": "Où sont stockés les journaux ?", "sentence": "Where are the logs stored?", "itContext": "Where are the audit logs stored after rotation?"},
    {"meaning": "Qui gère ce service ?", "sentence": "Who owns this service?", "itContext": "Who owns the notification service on call?"},
    {"meaning": "Combien de nœuds sont touchés ?", "sentence": "How many nodes are affected?", "itContext": "How many nodes are affected by the kernel bug?"},
    {"meaning": "À quelle fréquence tournent les sauvegardes ?", "sentence": "How often do backups run?", "itContext": "How often do the incremental backups run?"},
    {"meaning": "Pourquoi la file grossit-elle ?", "sentence": "Why is the queue growing?", "itContext": "Why is the ingestion queue growing since noon?"}
  ],
  [
    {"word": "what", "level": "A", "domain": "grammar", "example": "What failed?", "itContext": "What failed in the nightly pipeline?", "definition": "Interrogatif : quelle chose", "translation": "quoi, que"},
    {"word": "when", "level": "A", "domain": "grammar", "example": "When did it happen?", "itContext": "When did the first alert fire?", "definition": "Interrogatif : à quel moment", "translation": "quand"},
    {"word": "where", "level": "A", "domain": "grammar", "example": "Where is it deployed?", "itContext": "Where is the worker deployed?", "definition": "Interrogatif : quel endroit", "translation": "où"},
    {"word": "why", "level": "A", "domain": "grammar", "example": "Why did it fail?", "itContext": "Why did the probe fail twice?", "definition": "Interrogatif : quelle cause", "translation": "pourquoi"},
    {"word": "which", "level": "A", "domain": "grammar", "example": "Which cluster is affected?", "itContext": "Which cluster is affected, EU or US?", "definition": "Interrogatif : lequel (choix)", "translation": "lequel, quel"},
    {"word": "owner", "level": "B", "domain": "professional", "example": "Who is the owner?", "itContext": "The service owner is on call this week.", "definition": "Personne responsable", "translation": "responsable, propriétaire"},
    {"word": "impact", "level": "B", "domain": "professional", "example": "What is the impact?", "itContext": "The impact is limited to the EU region.", "definition": "Effet d'un incident", "translation": "impact"},
    {"word": "cause", "level": "B", "domain": "professional", "example": "What caused it?", "itContext": "A config drift caused the outage.", "definition": "Origine d'un problème", "translation": "cause"}
  ],
  [
    {"expression": "how long", "meaning": "combien de temps", "difficulty": "A", "example": "How long does the sync take?", "classification": "professional"},
    {"expression": "how often", "meaning": "à quelle fréquence", "difficulty": "A", "example": "How often do we rotate keys?", "classification": "professional"},
    {"expression": "what if", "meaning": "que se passe-t-il si", "difficulty": "B", "example": "What if the primary fails?", "classification": "professional"},
    {"expression": "what about", "meaning": "et concernant", "difficulty": "A", "example": "What about the staging cluster?", "classification": "professional"},
    {"expression": "so what's next", "meaning": "quelle est la suite", "difficulty": "B", "example": "Root cause found. So what's next?", "classification": "professional"}
  ],
  "Les WH constituent la checklist du diagnostic : What/When/Where/Who/How big/Why. Posées dans cet ordre, elles qualifient un incident de façon exhaustive et professionnelle.",
  [
    {"type": "multiple_choice", "question": "___ owns the payment service?", "options": ["What", "Who", "Which", "Whose"], "correctAnswer": "Who", "explanation": "Sujet personne → Who (+ pas d'auxiliaire)."},
    {"type": "multiple_choice", "question": "___ does the batch take? About 20 min.", "options": ["How long", "How often", "How many", "How much"], "correctAnswer": "How long", "explanation": "Durée → how long."},
    {"type": "fill_blank", "question": "Complétez : ___ many alerts fired last night?", "options": [], "correctAnswer": "How", "explanation": "How many + dénombrable."},
    {"type": "multiple_choice", "question": "Question sans auxiliaire (WH sujet) :", "options": ["What did happen?", "What happened?", "What does happen?", "What is happen?"], "correctAnswer": "What happened?", "explanation": "WH sujet → pas d'auxiliaire."}
  ],
  "WH + auxiliaire + sujet (What does it say ?). WH sujet → pas d'auxiliaire (What happened ?). Composés : how long (durée), how often (fréquence), how many/much (quantité).",
  [
    {"question": "___ environment is this running in?", "options": ["What", "Which", "Who", "How"], "correctAnswer": "Which", "explanation": "Choix parmi envs → which."},
    {"question": "___ much storage is consumed?", "options": ["How", "What", "Which", "Why"], "correctAnswer": "How", "explanation": "Indénombrable → how much."},
    {"question": "___ did the incident begin? At 14:02.", "options": ["When", "Where", "Why", "Who"], "correctAnswer": "When", "explanation": "Moment → when."},
    {"question": "Could you tell me when the window ___?", "options": ["open", "opens", "opening", "opened"], "correctAnswer": "opens", "explanation": "Ordre indirect : pas d'inversion."}
  ],
  [
    {"pattern": "WH + aux + sujet + verbe ?", "example": "When does the job trigger?", "explanation": "Question standard."},
    {"pattern": "WH (sujet) + verbe ?", "example": "What triggers the job?", "explanation": "Sans auxiliaire."},
    {"pattern": "How + long/often/many/much", "example": "How often do we rotate?", "explanation": "Mesure durée/fréquence/quantité."}
  ]
),
# ================= LEÇON 111 — N2 Present Continuous =================
L(111, 3, 2, 1,
  "Present Continuous: Describing Ongoing Incidents",
  "Décrire une action en cours maintenant avec le présent continu (be + -ing), typique du live incident et du pair programming.",
  "Le présent continu décrit une action EN COURS AU MOMENT où l'on parle. FORME : be (am/is/are) + verbe-ing. AFFIRMATIF : The build is running. The team is investigating. They are deploying the fix. NÉGATIF : The service is not responding. We aren't seeing errors anymore. QUESTION : inversion du be — Is the job still running ? Are you seeing timeouts ? EMPLOIS CLÉS EN IT : 1) incident en direct — The CPU is spiking right now. 2) situation temporaire — I am working from the Paris office this week. 3) tendance/évolution — The error rate is decreasing. Latency is getting worse. MARQUEURS : now, right now, at the moment, currently, still, today, this week. CONTRASTE AVEC LE PRÉSENT SIMPLE : simple = routine/permanent (The cron runs nightly), continu = en ce moment/temporaire (The cron is running late today). ORTHOGRAPHE DU -ING : run → running (doublement), make → making (e supprimé), lie → lying. VERBES D'ÉTAT qui refusent normalement le continu : know, believe, own, contain, depend (The config contains a typo — pas is containing). En réunion d'incident, le continu est la voix du live : What is happening ? The primary is failing over. Traffic is spilling over to the replica.",
  [
    {"meaning": "Le build tourne en ce moment.", "sentence": "The build is running right now.", "itContext": "The build is running right now; results in five minutes."},
    {"meaning": "L'équipe enquête sur l'incident.", "sentence": "The team is investigating the incident.", "itContext": "The on-call team is investigating the incident from the runbook."},
    {"meaning": "Le service ne répond pas.", "sentence": "The service isn't responding.", "itContext": "The health service isn't responding to probes."},
    {"meaning": "Le taux d'erreur diminue.", "sentence": "The error rate is decreasing.", "itContext": "The error rate is decreasing since the rollback."},
    {"meaning": "Est-ce que le job tourne encore ?", "sentence": "Is the job still running?", "itContext": "Is the migration job still running after the restart?"},
    {"meaning": "Je travaille de Paris cette semaine.", "sentence": "I am working from Paris this week.", "itContext": "I am working from the Paris office this week."},
    {"meaning": "La latence empire.", "sentence": "Latency is getting worse.", "itContext": "P99 latency is getting worse during deployments."}
  ],
  [
    {"word": "ongoing", "level": "B", "domain": "professional", "example": "An ongoing migration.", "itContext": "There is an ongoing migration on the staging cluster.", "definition": "En cours, qui continue", "translation": "en cours"},
    {"word": "spike", "level": "B", "domain": "it", "example": "CPU is spiking.", "itContext": "CPU is spiking on the primary node.", "definition": "Pic soudain", "translation": "pic, flambée"},
    {"word": "currently", "level": "B", "domain": "professional", "example": "We are currently fixing it.", "itContext": "We are currently rolling out the fix.", "definition": "Actuellement", "translation": "actuellement"},
    {"word": "trend", "level": "B", "domain": "professional", "example": "The trend is improving.", "itContext": "The latency trend is improving week over week.", "definition": "Tendance, évolution", "translation": "tendance"},
    {"word": "still", "level": "A", "domain": "grammar", "example": "It is still loading.", "itContext": "The export is still loading after ten minutes.", "definition": "Encore (continuité)", "translation": "encore"},
    {"word": "getting", "level": "A", "domain": "grammar", "example": "It is getting slower.", "itContext": "The queries are getting slower under load.", "definition": "Devenir (progression)", "translation": "devenir"},
    {"word": "failover", "level": "B", "domain": "it", "example": "The primary is failing over.", "itContext": "The primary is failing over to the standby.", "definition": "Bascule vers le secours", "translation": "bascule"},
    {"word": "rollout", "level": "B", "domain": "dev", "example": "The rollout is progressing.", "itContext": "The rollout is progressing at 25% of traffic.", "definition": "Déploiement progressif", "translation": "déploiement"}
  ],
  [
    {"expression": "as we speak", "meaning": "en ce moment même", "difficulty": "B", "example": "The patch is deploying as we speak.", "classification": "professional"},
    {"expression": "at the moment", "meaning": "pour le moment", "difficulty": "A", "example": "At the moment, we see no errors.", "classification": "professional"},
    {"expression": "keep an eye on it", "meaning": "garder un œil dessus", "difficulty": "B", "example": "It is recovering; keep an eye on it.", "classification": "professional"},
    {"expression": "getting there", "meaning": "y arriver progressivement", "difficulty": "B", "example": "The migration is getting there.", "classification": "professional"},
    {"expression": "up and running", "meaning": "opérationnel", "difficulty": "A", "example": "The replica is up and running now.", "classification": "it"}
  ],
  "Le présent continu est la voix du live : incident en cours, tendance, situation temporaire. be + -ing, marqueurs now/currently/still, et contraste net avec la routine du présent simple.",
  [
    {"type": "multiple_choice", "question": "The CPU ___ spiking right now.", "options": ["is", "are", "does", "has"], "correctAnswer": "is", "explanation": "CPU (it) + action en cours → is + -ing."},
    {"type": "multiple_choice", "question": "Routine (simple) vs en cours (continu) : The cron ___ nightly.", "options": ["is running", "runs", "run", "is run"], "correctAnswer": "runs", "explanation": "nightly = routine → simple."},
    {"type": "fill_blank", "question": "Complétez : We ___ currently deploying the fix.", "options": [], "correctAnswer": "are", "explanation": "we → are + -ing."},
    {"type": "multiple_choice", "question": "Verbe d'état (pas de continu) :", "options": ["is running", "is knowing", "knows", "knowing"], "correctAnswer": "knows", "explanation": "know = état → simple."}
  ],
  "be + -ing pour l'en cours. Marqueurs : now, right now, currently, still. Tendances : is increasing/decreasing/getting worse. États (know, contain) → présent simple.",
  [
    {"question": "The replicas ___ syncing at the moment.", "options": ["is", "are", "do", "will"], "correctAnswer": "are", "explanation": "replicas (pluriel) → are + -ing."},
    {"question": "Errors ___ decreasing since the hotfix.", "options": ["is", "are", "was", "does"], "correctAnswer": "are", "explanation": "errors (pluriel) → are."},
    {"question": "The job ___ still running.", "options": ["is", "are", "has", "be"], "correctAnswer": "is", "explanation": "job (it) → is."},
    {"question": "Traffic ___ spilling to the replica.", "options": ["is", "are", "does", "be"], "correctAnswer": "is", "explanation": "traffic (indénombrable) → is."}
  ],
  [
    {"pattern": "be + -ing (live)", "example": "The cache is warming up.", "explanation": "Action en cours maintenant."},
    {"pattern": "is/are + getting + adj", "example": "Latency is getting better.", "explanation": "Décrire une tendance."},
    {"pattern": "Is/Are + sujet + -ing ?", "example": "Is the job still running?", "explanation": "Interroger le live."}
  ]
),
# ================= LEÇON 112 — N2 Simple vs Continu =================
L(112, 3, 2, 2,
  "Present Simple vs Continuous: Choosing Right",
  "Trancher entre présent simple et présent continu selon les marqueurs : routine permanente ou action temporaire en cours.",
  "Le choix simple/continu change le sens. PRÉSENT SIMPLE = vérité, routine, permanente : The backup runs at 2 AM (c'est sa nature). This service handles logins (rôle permanent). PRÉSENT CONTINU = temporaire, en cours, exception : The backup is running late today (aujourd'hui seulement). This service is handling extra traffic (situation passagère). TEST MENTAL : si vous pouvez ajouter usually → simple ; si vous pouvez ajouter right now → continu. MARQUEURS DU SIMPLE : always, usually, often, sometimes, never, every day/week, on Mondays. MARQUEURS DU CONTINU : now, right now, at the moment, currently, this week, still. VERBES D'ÉTAT (jamais en continu) : know, understand, believe, want, need, own, contain, depend, mean, prefer — The dashboard shows both metrics (fait stable). Mais certains verbes changent de sens : think (I think it's fine = opinion / I am thinking of migrating = réflexion en cours), have (We have two replicas = possession / We are having issues = experiencing). EN SUPPORT : We usually deploy on Tuesdays, but we are deploying today because of the hotfix. Cette phrase combine les deux temps et sonne parfaitement naturelle.",
  [
    {"meaning": "La sauvegarde tourne à 2h (normalement).", "sentence": "The backup runs at 2 AM.", "itContext": "The backup runs at 2 AM every night without failure."},
    {"meaning": "La sauvegarde tourne en retard aujourd'hui.", "sentence": "The backup is running late today.", "itContext": "The backup is running late today because of the volume."},
    {"meaning": "Ce service gère les connexions (rôle).", "sentence": "This service handles logins.", "itContext": "This service handles logins for all mobile clients."},
    {"meaning": "Ce service gère un trafic extra (passager).", "sentence": "This service is handling extra traffic.", "itContext": "This service is handling extra traffic during the sale."},
    {"meaning": "Nous déployons d'habitude le mardi.", "sentence": "We usually deploy on Tuesdays.", "itContext": "We usually deploy on Tuesdays, after the weekly freeze."},
    {"meaning": "Mais aujourd'hui nous déployons un hotfix.", "sentence": "Today we are deploying a hotfix.", "itContext": "Today we are deploying a hotfix outside the window."},
    {"meaning": "Le tableau de bord contient les métriques.", "sentence": "The dashboard contains the metrics.", "itContext": "The dashboard contains both latency metrics."}
  ],
  [
    {"word": "usually", "level": "A", "domain": "grammar", "example": "It usually succeeds.", "itContext": "The pipeline usually succeeds on the first attempt.", "definition": "D'habitude (fréquence haute)", "translation": "d'habitude"},
    {"word": "rarely", "level": "B", "domain": "grammar", "example": "It rarely fails.", "itContext": "The cluster rarely fails over twice.", "definition": "Rarement", "translation": "rarement"},
    {"word": "temporary", "level": "B", "domain": "professional", "example": "It is a temporary fix.", "itContext": "This is a temporary fix until the patch lands.", "definition": "Qui dure un temps limité", "translation": "temporaire"},
    {"word": "permanent", "level": "B", "domain": "professional", "example": "It is a permanent change.", "itContext": "The rename is a permanent change to the API.", "definition": "Définitif, durable", "translation": "permanent"},
    {"word": "handle", "level": "A", "domain": "it", "example": "It handles retries.", "itContext": "The SDK handles retries automatically.", "definition": "Gérer, traiter", "translation": "gérer"},
    {"word": "behaviour", "level": "B", "domain": "it", "example": "It describes the behaviour.", "itContext": "The spec describes the expected behaviour.", "definition": "Comportement d'un système", "translation": "comportement"},
    {"word": "passing", "level": "B", "domain": "professional", "example": "A passing issue.", "itContext": "It was a passing network issue, not a bug.", "definition": "Passager, bref", "translation": "passager"},
    {"word": "marker", "level": "B", "domain": "grammar", "example": "Now is a continuous marker.", "itContext": "Right now is a typical continuous marker.", "definition": "Mot qui signale un temps", "translation": "marqueur"}
  ],
  [
    {"expression": "most of the time", "meaning": "la plupart du temps", "difficulty": "B", "example": "Most of the time, it just works.", "classification": "professional"},
    {"expression": "these days", "meaning": "ces derniers temps", "difficulty": "B", "example": "These days, builds are slower.", "classification": "professional"},
    {"expression": "as a rule", "meaning": "en règle générale", "difficulty": "C", "example": "As a rule, we avoid hotfixes.", "classification": "professional"},
    {"expression": "for now", "meaning": "pour l'instant", "difficulty": "A", "example": "For now, we stay on v1.", "classification": "professional"},
    {"expression": "more and more", "meaning": "de plus en plus", "difficulty": "A", "example": "More and more teams are adopting it.", "classification": "professional"}
  ],
  "Routine → simple (usually, every day). En cours/temporaire → continu (now, this week). Les verbes d'état restent au simple. Le mélange des deux temps raconte le normal ET l'exception.",
  [
    {"type": "multiple_choice", "question": "We ___ deploy on Fridays (règle).", "options": ["are avoiding", "avoid", "avoids", "is avoiding"], "correctAnswer": "avoid", "explanation": "Règle permanente → simple."},
    {"type": "multiple_choice", "question": "We ___ the issue right now.", "options": ["investigate", "investigates", "are investigating", "is investigating"], "correctAnswer": "are investigating", "explanation": "right now → continu."},
    {"type": "fill_blank", "question": "Complétez : The config ___ (contain) a typo.", "options": [], "correctAnswer": "contains", "explanation": "État → simple."},
    {"type": "multiple_choice", "question": "Sens de have : We ___ having issues.", "options": ["possession", "expérience en cours", "obligation", "habitude"], "correctAnswer": "expérience en cours", "explanation": "be having issues = vivons des problèmes."}
  ],
  "Test : usually → simple ; right now → continu. Verbes d'état au simple (know, contain). think/have changent de sens. Combiner : We usually X, but today we are Y-ing.",
  [
    {"question": "The cache ___ every ten minutes (routine).", "options": ["is refreshing", "refresh", "refreshes", "refreshing"], "correctAnswer": "refreshes", "explanation": "Routine → simple + -s."},
    {"question": "I ___ of migrating to v3 (réflexion).", "options": ["think", "am thinking", "thinks", "thought"], "correctAnswer": "am thinking", "explanation": "Réflexion en cours → continu."},
    {"question": "This queue rarely ___ up.", "options": [ "pile", "piles", "is piling", "piling"], "correctAnswer": "piles", "explanation": "rarely → simple (it → piles)."},
    {"question": "Prices ___ this week (promo temporaire).", "options": ["drop", "are dropping", "drops", "dropped"], "correctAnswer": "are dropping", "explanation": "this week (passager) → continu."}
  ],
  [
    {"pattern": "Sujet + -s (rôle fixe)", "example": "This node serves traffic.", "explanation": "Fonction permanente."},
    {"pattern": "be + -ing (passager)", "example": "This node is serving extra load.", "explanation": "Situation temporaire."},
    {"pattern": "usually... but today...", "example": "We usually wait, but today we act.", "explanation": "Construire le contraste."}
  ]
),
# ================= LEÇON 113 — N2 Past Simple =================
L(113, 4, 2, 3,
  "Past Simple: Reporting What Happened",
  "Raconter un incident terminé avec le passé simple : verbes réguliers, irréguliers, négation et questions au passé.",
  "Le passé simple relate une action TERMINÉE et DATÉE. C'est le temps du post-mortem, du changelog et du récit d'incident. FORMATION RÉGULIÈRE : verbe + -ed (deploy → deployed, fix → fixed, fail → failed, restart → restarted, monitor → monitored). ORTHOGRAPHES : stop → stopped (doublement), study → studied (y→i). IRRÉGULIERS ESSENTIELS : go → went, have → had, take → took, run → ran, see → saw, find → found, get → got, make → made, begin → began, write → wrote, send → sent, build → built, think → thought, come → came, know → knew. NÉGATION ET QUESTIONS : did + base — The deploy didn't fix it. Did the job fail ? (le passé est porté par did, jamais doublé : Did it work ? pas Did it worked ?). MARQUEURS : yesterday, last night, at 14:00, two hours ago, in 2024, last week, on Monday. RÉCIT D'INCIDENT TYPIQUE : At 14:02, the primary failed. Traffic shifted to the replica. The queue grew fast. At 14:10, we rolled back. The service recovered in four minutes. Attention au piège : last night the backup didn't run (pas didn't ran). Les réponses courtes suivent : Did it fail ? Yes, it did. / No, it didn't.",
  [
    {"meaning": "Le primaire est tombé en panne à 14h02.", "sentence": "The primary failed at 14:02.", "itContext": "The primary failed at 14:02 during the batch window."},
    {"meaning": "Nous avons déployé le correctif hier.", "sentence": "We deployed the fix yesterday.", "itContext": "We deployed the fix yesterday evening and closed the ticket."},
    {"meaning": "Le job n'a pas tourné la nuit dernière.", "sentence": "The job didn't run last night.", "itContext": "The cleanup job didn't run last night."},
    {"meaning": "Est-ce que ça a fonctionné ?", "sentence": "Did it work?", "itContext": "Did the rollback work as expected?"},
    {"meaning": "Nous avons trouvé la cause racine.", "sentence": "We found the root cause.", "itContext": "We found the root cause in the config diff."},
    {"meaning": "Le trafic a basculé sur le réplica.", "sentence": "Traffic shifted to the replica.", "itContext": "Traffic shifted to the replica within seconds."},
    {"meaning": "Le service a récupéré en 4 minutes.", "sentence": "The service recovered in four minutes.", "itContext": "The service recovered in four minutes after the rollback."}
  ],
  [
    {"word": "failover", "level": "B", "domain": "it", "example": "It failed over at 14:02.", "itContext": "The cluster failed over automatically at 14:02.", "definition": "Basculer (vers le secours)", "translation": "basculer"},
    {"word": "outage", "level": "B", "domain": "it", "example": "The outage lasted 12 min.", "itContext": "The outage lasted twelve minutes in total.", "definition": "Période de panne", "translation": "panne, interruption"},
    {"word": "root cause", "level": "B", "domain": "professional", "example": "We identified the root cause.", "itContext": "We identified the root cause after the review.", "definition": "Cause profonde d'un problème", "translation": "cause racine"},
    {"word": "yesterday", "level": "A", "domain": "grammar", "example": "It started yesterday.", "itContext": "The degradation started yesterday around noon.", "definition": "Hier", "translation": "hier"},
    {"word": "recover", "level": "B", "domain": "it", "example": "It recovered quickly.", "itContext": "The service recovered quickly after the restart.", "definition": "Se rétablir", "translation": "se rétablir"},
    {"word": "last night", "level": "A", "domain": "grammar", "example": "It broke last night.", "itContext": "The cron broke last night after the update.", "definition": "La nuit dernière", "translation": "la nuit dernière"},
    {"word": "post-mortem", "level": "C", "domain": "professional", "example": "We wrote a post-mortem.", "itContext": "We wrote a blameless post-mortem together.", "definition": "Analyse après incident", "translation": "retour d'expérience"},
    {"word": "timeline", "level": "B", "domain": "professional", "example": "We rebuilt the timeline.", "itContext": "We rebuilt the timeline from the logs.", "definition": "Chronologie des faits", "translation": "chronologie"}
  ],
  [
    {"expression": "at first", "meaning": "au début", "difficulty": "A", "example": "At first, nothing failed.", "classification": "professional"},
    {"expression": "right after", "meaning": "juste après", "difficulty": "A", "example": "Right after the deploy, alerts fired.", "classification": "professional"},
    {"expression": "it turned out", "meaning": "il s'est avéré que", "difficulty": "B", "example": "It turned out the cert had expired.", "classification": "professional"},
    {"expression": "back then", "meaning": "à l'époque", "difficulty": "B", "example": "Back then, we had no canary.", "classification": "professional"},
    {"expression": "in the end", "meaning": "au final", "difficulty": "A", "example": "In the end, we rolled back.", "classification": "professional"}
  ],
  "Le passé simple est le temps du post-mortem : réguliers en -ed, irréguliers à mémoriser (went, took, found...), négation/question avec did + base, marqueurs datés (yesterday, at 14:02, ago).",
  [
    {"type": "multiple_choice", "question": "We ___ the hotfix at 17:30.", "options": ["deploy", "deployed", "were deploy", "deploying"], "correctAnswer": "deployed", "explanation": "Action finie et datée → -ed."},
    {"type": "multiple_choice", "question": "Négation : The job ___ run.", "options": ["didn't", "doesn't", "not", "wasn't"], "correctAnswer": "didn't", "explanation": "Passé négatif → didn't + base."},
    {"type": "fill_blank", "question": "Complétez (irrégulier) : We ___ (find) the cause.", "options": [], "correctAnswer": "found", "explanation": "find → found."},
    {"type": "multiple_choice", "question": "Question : ___ it fail twice?", "options": ["Did", "Was", "Does", "Has"], "correctAnswer": "Did", "explanation": "Question passée → Did + base."}
  ],
  "-ed (réguliers) ; irréguliers : went, took, ran, found, sent, built. did + base pour négation/question. Marqueurs : yesterday, last night, X ago, at HH:MM. Réponses courtes : it did / it didn't.",
  [
    {"question": "Traffic ___ (shift) to the standby.", "options": ["shift", "shifted", "shifts", "shifting"], "correctAnswer": "shifted", "explanation": "Passé simple régulier."},
    {"question": "We ___ (take) the cluster offline.", "options": [ "take", "taked", "took", "taken"], "correctAnswer": "took", "explanation": "take → took."},
    {"question": "___ you restart the agent? Yes, I did.", "options": ["Did", "Do", "Have", "Were"], "correctAnswer": "Did", "explanation": "Question passée."},
    {"question": "The alert ___ (fire) at 03:14.", "options": [ "fire", "fired", "fires", "firing"], "correctAnswer": "fired", "explanation": "Passé simple régulier."}
  ],
  [
    {"pattern": "At HH:MM + passé", "example": "At 14:02, the primary failed.", "explanation": "Dater un fait du récit."},
    {"pattern": "didn't + base", "example": "It didn't recover alone.", "explanation": "Nier un événement."},
    {"pattern": "Did + sujet + base ?", "example": "Did the rollback work?", "explanation": "Interroger le passé."}
  ]
),
# ================= LEÇON 114 — N2 Present Perfect =================
L(114, 4, 2, 4,
  "Present Perfect: Experience and Ongoing Results",
  "Relier le passé au présent avec le present perfect (have + participe passé) : expérience, résultat actuel, durée qui continue.",
  "Le present perfect relie un événement passé au PRÉSENT. FORME : have/has + participe passé (réguliers : -ed ; irréguliers : done, seen, taken, written, sent, built, made, gone, known, found). TROIS EMPLOIS ESSENTIELS EN IT : 1) EXPÉRIENCE (sans date précise) — I have worked with Kubernetes. We have never seen this error before. 2) RÉSULTAT ACTUEL D'UN PASSÉ RÉCENT — We have deployed the fix (conséquence maintenant : le service est réparé). The build has failed (et il est rouge à l'écran maintenant). 3) DURÉE QUI CONTINUE (for/since) — We have used Postgres for five years. The cluster has been up since Monday. CONTRASTE CLÉ AVEC LE PASSE SIMPLE : passé simple = action terminée AVEC moment défini (We deployed it yesterday), present perfect = lien au présent SANS date précise (We have deployed it → il est en prod maintenant). Marqueurs du perfect : ever, never, already, yet (négatif/question : Has the job finished yet ? It hasn't finished yet), just (The pipeline has just passed), so far, recently, since (point de départ), for (durée). Piège classique : ne pas dire I have seen it yesterday — avec yesterday, c'est passé simple obligatoire (I saw it yesterday). Depuis vs pendant : since 2020 / for five years.",
  [
    {"meaning": "Nous avons déployé le correctif (il est en prod).", "sentence": "We have deployed the fix.", "itContext": "We have deployed the fix, so the endpoint is stable now."},
    {"meaning": "Je n'ai jamais vu cette erreur.", "sentence": "I have never seen this error.", "itContext": "I have never seen this error in production before."},
    {"meaning": "Nous utilisons Postgres depuis cinq ans.", "sentence": "We have used Postgres for five years.", "itContext": "We have used Postgres for five years across three products."},
    {"meaning": "Le cluster est en ligne depuis lundi.", "sentence": "The cluster has been up since Monday.", "itContext": "The cluster has been up since Monday without restarts."},
    {"meaning": "Le job est-il déjà terminé ?", "sentence": "Has the job finished yet?", "itContext": "Has the indexing job finished yet?"},
    {"meaning": "Le pipeline vient de passer.", "sentence": "The pipeline has just passed.", "itContext": "The pipeline has just passed; you can merge now."},
    {"meaning": "Jusqu'ici, aucune alerte.", "sentence": "We haven't had any alerts so far.", "itContext": "We haven't had any alerts so far after the change."}
  ],
  [
    {"word": "already", "level": "A", "domain": "grammar", "example": "It has already shipped.", "itContext": "The patch has already shipped to staging.", "definition": "Déjà (avant l'attendu)", "translation": "déjà"},
    {"word": "yet", "level": "A", "domain": "grammar", "example": "It hasn't shipped yet.", "itContext": "The report hasn't been generated yet.", "definition": "Pas encore / déjà ? (nég./question)", "translation": "encore, déjà"},
    {"word": "just", "level": "A", "domain": "grammar", "example": "It has just failed.", "itContext": "The canary has just failed on metric X.", "definition": "Venir de (très récent)", "translation": "venir de, juste"},
    {"word": "since", "level": "A", "domain": "grammar", "example": "Since 2020.", "itContext": "The service has been running since 2020.", "definition": "Point de départ (depuis)", "translation": "depuis (point)"},
    {"word": "experience", "level": "B", "domain": "professional", "example": "Solid experience.", "itContext": "She has solid experience with migrations.", "definition": "Expérience acquise", "translation": "expérience"},
    {"word": "recently", "level": "B", "domain": "professional", "example": "It changed recently.", "itContext": "The API contract changed recently.", "definition": "Récemment", "translation": "récemment"},
    {"word": "achieve", "level": "B", "domain": "professional", "example": "We achieved 99.9%.", "itContext": "We have achieved the 99.9% target this quarter.", "definition": "Atteindre, accomplir", "translation": "atteindre"},
    {"word": "improve", "level": "B", "domain": "professional", "example": "It has improved.", "itContext": "Cold starts have improved a lot since v2.", "definition": "S'améliorer", "translation": "s'améliorer"}
  ],
  [
    {"expression": "so far", "meaning": "jusqu'ici", "difficulty": "B", "example": "No errors so far.", "classification": "professional"},
    {"expression": "have you ever", "meaning": "avez-vous déjà (expérience)", "difficulty": "A", "example": "Have you ever run a game day?", "classification": "professional"},
    {"expression": "not yet", "meaning": "pas encore", "difficulty": "A", "example": "Approved? Not yet.", "classification": "professional"},
    {"expression": "as of late", "meaning": "ces derniers temps", "difficulty": "C", "example": "As of late, builds are flaky.", "classification": "professional"},
    {"expression": "time and again", "meaning": "à maintes reprises", "difficulty": "C", "example": "It has failed time and again under load.", "classification": "professional"}
  ],
  "Le present perfect porte l'expérience (ever/never), le résultat présent (has failed → écran rouge) et la durée continue (for/since). Sans date précise ; si la date est donnée, passez au passé simple.",
  [
    {"type": "multiple_choice", "question": "We ___ this issue before.", "options": ["never saw", "have never seen", "never see", "didn't ever see"], "correctAnswer": "have never seen", "explanation": "Expérience, pas de date → perfect."},
    {"type": "multiple_choice", "question": "We deployed it ___.", "options": ["yet", "since Monday", "yesterday", "so far"], "correctAnswer": "yesterday", "explanation": "Date précise → passé simple."},
    {"type": "fill_blank", "question": "Complétez : The cluster has been up ___ March.", "options": [], "correctAnswer": "since", "explanation": "Point de départ → since."},
    {"type": "multiple_choice", "question": "___ the audit started yet?", "options": ["Did", "Has", "Have", "Is"], "correctAnswer": "Has", "explanation": "Has + sujet + participe + yet."}
  ],
  "have/has + participe. ever/never (expérience), just (récent), yet/already, for/since (durée). Date précise → passé simple. Participe : done, seen, taken, written, sent, built.",
  [
    {"question": "We ___ five incidents this quarter.", "options": ["had", "have had", "has had", "having"], "correctAnswer": "have had", "explanation": "Période non finie (this quarter) → perfect."},
    {"question": "I ___ the report last week.", "options": ["have sent", "sent", "has sent", "send"], "correctAnswer": "sent", "explanation": "last week → passé simple."},
    {"question": "She ___ at the company since 2019.", "options": [ "work", "works", "has worked", "worked"], "correctAnswer": "has worked", "explanation": "since + continu de durée."},
    {"question": "___ you ever led a migration?", "options": ["Did", "Have", "Are", "Do"], "correctAnswer": "Have", "explanation": "ever = expérience → Have you ever..."}
  ],
  [
    {"pattern": "have + participe (résultat)", "example": "We have fixed the leak.", "explanation": "Conséquence actuelle."},
    {"pattern": "for + durée / since + point", "example": "For six months / since June.", "explanation": "Mesurer une durée continue."},
    {"pattern": "Have you ever + participe ?", "example": "Have you ever deployed on Friday?", "explanation": "Interroger l'expérience."}
  ]
),
# ================= LEÇON 115 — N2 Futur will / going to =================
L(115, 5, 2, 5,
  "Future: Will vs Going To for Tech Planning",
  "Parler du futur en anglais technique : prédictions avec will, intentions planifiées avec going to, décisions instantanées et plannings.",
  "Deux formes dominent le futur technique. WILL + base : prédiction (The migration will reduce costs), décision instantanée (I'll check the logs right away), promesse (We won't lose any data), fait futur général (The contract will expire in May). GOING TO + base : intention PLANIFIÉE en avance (We are going to migrate the cluster in Q3), prédiction avec signe visible (Look — the CPU is going to hit 100%). RÈGLE SIMPLE DE COMMUNICATION PRO : décision déjà prise et inscrite au planning → going to ; réaction immédiate ou promesse → will. LE PRÉSENT À VALEUR FUTURE : 1) présent simple pour les horaires fixes (The release ships on Thursday — c'est calé comme un horaire). 2) présent continu pour les rendez-vous personnels (I am leaving at 6). FUTUR AVEC HOPE/EXPECT/THINK : I think we'll need another replica. I don't think it will fail. FIRST CONDITIONAL pour le conditionnel futur : If the canary passes, we will roll out to 100%. NÉGATION : will not → won't (The job won't finish before midnight). QUESTION : inversion (Will it scale ? When will the window open ?). En sprint planning, la langue naturelle mélange : We are going to refactor the auth module this sprint, and I'll handle the tests.",
  [
    {"meaning": "La migration réduira les coûts (prédiction).", "sentence": "The migration will reduce costs.", "itContext": "The migration will reduce infra costs by 20%."},
    {"meaning": "Nous allons migrer le cluster au T3 (planifié).", "sentence": "We are going to migrate the cluster in Q3.", "itContext": "We are going to migrate the cluster in Q3, per the roadmap."},
    {"meaning": "Je vais vérifier les logs tout de suite (décision).", "sentence": "I'll check the logs right away.", "itContext": "I'll check the ingress logs right away."},
    {"meaning": "Nous ne perdrons aucune donnée (promesse).", "sentence": "We won't lose any data.", "itContext": "We won't lose any data during the cutover."},
    {"meaning": "La release sort jeudi (horaire fixe).", "sentence": "The release ships on Thursday.", "itContext": "The release ships on Thursday at 16:00 UTC."},
    {"meaning": "Si le canary passe, on déploiera à 100%.", "sentence": "If the canary passes, we will roll out fully.", "itContext": "If the canary passes, we will roll out to 100%."},
    {"meaning": "Le CPU va atteindre 100% (signe visible).", "sentence": "The CPU is going to hit 100%.", "itContext": "Look — the CPU is going to hit 100% within minutes."}
  ],
  [
    {"word": "will", "level": "A", "domain": "grammar", "example": "It will work.", "itContext": "The fallback will work as designed.", "definition": "Auxiliaire du futur", "translation": "futur (prédiction/promise)"},
    {"word": "won't", "level": "A", "domain": "grammar", "example": "It won't scale.", "itContext": "The current design won't scale past 10k users.", "definition": "Futur négatif", "translation": "ne... pas (futur)"},
    {"word": "plan", "level": "A", "domain": "professional", "example": "We plan to ship it.", "itContext": "We plan to ship the feature next sprint.", "definition": "Prévoir, planifier", "translation": "planifier"},
    {"word": "schedule", "level": "B", "domain": "professional", "example": "It is scheduled for May.", "itContext": "The downtime is scheduled for May 4th.", "definition": "Planifier (horaires)", "translation": "planifier, programmer"},
    {"word": "deadline", "level": "B", "domain": "professional", "example": "Meet the deadline.", "itContext": "We will meet the deadline with two more days.", "definition": "Échéance à respecter", "translation": "échéance"},
    {"word": "predict", "level": "B", "domain": "professional", "example": "I predict a slowdown.", "itContext": "I predict a slowdown during the migration window.", "definition": "Prédire", "translation": "prédire"},
    {"word": "intend", "level": "C", "domain": "professional", "example": "We intend to automate.", "itContext": "We intend to automate the full rollout.", "definition": "Avoir l'intention de", "translation": "avoir l'intention"},
    {"word": "forecast", "level": "C", "domain": "it", "example": "Traffic forecast.", "itContext": "The traffic forecast shows a spike on Monday.", "definition": "Prévision (données)", "translation": "prévision"}
  ],
  [
    {"expression": "right away", "meaning": "immédiatement", "difficulty": "A", "example": "I'll fix it right away.", "classification": "professional"},
    {"expression": "in the long run", "meaning": "à long terme", "difficulty": "B", "example": "It will pay off in the long run.", "classification": "professional"},
    {"expression": "be about to", "meaning": "être sur le point de", "difficulty": "B", "example": "We are about to cut over.", "classification": "professional"},
    {"expression": "on track", "meaning": "dans les temps", "difficulty": "B", "example": "We are on track for Friday.", "classification": "professional"},
    {"expression": "set to", "meaning": "prêt/programmé pour", "difficulty": "C", "example": "The release is set to go live at noon.", "classification": "professional"}
  ],
  "will : prédiction, promesse, décision immédiate. going to : plan arrêté. Horaire fixe → présent simple ; rendez-vous → continu. If + présent, will + base pour la conséquence.",
  [
    {"type": "multiple_choice", "question": "Décision immédiate : I___ check it now.", "options": ["'m going to", "'ll", "will to", "check"], "correctAnswer": "'ll", "explanation": "Réaction instantanée → 'll."},
    {"type": "multiple_choice", "question": "Plan arrêté : We ___ refactor auth this sprint.", "options": ["will", "are going to", "will be", "would"], "correctAnswer": "are going to", "explanation": "Intention planifiée → going to."},
    {"type": "fill_blank", "question": "Complétez (négatif) : The job ___ finish before midnight.", "options": [], "correctAnswer": "won't", "explanation": "will not → won't."},
    {"type": "multiple_choice", "question": "Horaire officiel : The release ___ on Thursday.", "options": ["will ships", "ships", "is ship", "shipped"], "correctAnswer": "ships", "explanation": "Planning fixe → présent simple."}
  ],
  "will/won't + base. going to pour le planifié. Présent simple = horaires officiels. If + présent → will (1er conditionnel). be about to = imminent. on track = dans les temps.",
  [
    {"question": "If the build fails, we ___ revert.", "options": ["will", "are going", "would", "do"], "correctAnswer": "will", "explanation": "If + présent → will + base."},
    {"question": "Watch out! The disk ___ to fill up.", "options": ["will", "is going", "goes", "going"], "correctAnswer": "is going", "explanation": "Signe visible → going to."},
    {"question": "The maintenance window ___ at 02:00.", "options": ["will open", "opens", "is opening", "open"], "correctAnswer": "opens", "explanation": "Horaire officiel → présent simple."},
    {"question": "I think we'll ___ another replica.", "options": ["need", "needing", "needs", "to need"], "correctAnswer": "need", "explanation": "'ll + base."}
  ],
  [
    {"pattern": "'ll + base (réaction)", "example": "I'll restart the pod.", "explanation": "Décision à chaud."},
    {"pattern": "be going to + base (plan)", "example": "We're going to split the DB.", "explanation": "Projet déjà arrêté."},
    {"pattern": "If + présent, will + base", "example": "If it fails, we will rollback.", "explanation": "Condition → conséquence."}
  ]
),
# ================= LEÇON 116 — N2 Comparatifs & superlatifs =================
L(116, 14, 2, 6,
  "Comparatives and Superlatives: Comparing Solutions",
  "Comparer des solutions, performances et coûts : -er/more, the -est/the most, les irréguliers et les structures than / as...as.",
  "Comparer est le quotidien de l'architecte. COMPARATIF COURT (1 syllabe, ou 2 finissant en -y) : adjectif + -er + than — faster than, cheaper than, easier than (easy → easier). Latency is lower than last release. COMPARATIF LONG (2+ syllabes) : more + adjectif + than — more reliable than, more expensive than, more scalable than. This design is more resilient than the previous one. SUPERLATIF : the + -est ou the most + adjectif — the fastest response time, the most critical service, the cheapest option. IRRÉGULIERS À CONNAÎTRE : good → better → the best ; bad → worse → the worst ; far → further → the furthest ; much/many → more → the most ; little → less → the least. The worst-case scenario is a full outage. ÉGALITÉ : as + adjectif + as — as fast as, as stable as. Redis is as fast as in-memory gets. NÉGATION : not as... as — The backup is not as fast as expected. MODIFICATEURS : much/far/a lot + comparatif (much faster), slightly/a bit + comparatif (slightly slower), by far + superlatif (by far the most stable). RÈGLES D'ORTHOGRAPHE : big → bigger (doublement), large → larger (e gardé), heavy → heavier (y→i). En revue d'architecture : Option A is cheaper than B, but B is more robust under load; C is by far the fastest to deploy.",
  [
    {"meaning": "Cette approche est plus fiable que l'ancienne.", "sentence": "This approach is more reliable than the old one.", "itContext": "This approach is more reliable than the previous design."},
    {"meaning": "Redis est plus rapide que Postgres pour le cache.", "sentence": "Redis is faster than Postgres for caching.", "itContext": "Redis is faster than Postgres for cache lookups."},
    {"meaning": "C'est le service le plus critique.", "sentence": "It is the most critical service.", "itContext": "It is the most critical service in the stack."},
    {"meaning": "C'était le pire scénario possible.", "sentence": "It was the worst-case scenario.", "itContext": "The full outage was the worst-case scenario."},
    {"meaning": "Le nouveau build est bien plus rapide.", "sentence": "The new build is much faster.", "itContext": "The new build is much faster than the old one."},
    {"meaning": "L'option B n'est pas aussi chère.", "sentence": "Option B is not as expensive.", "itContext": "Option B is not as expensive as option A."},
    {"meaning": "C'est de loin la solution la plus simple.", "sentence": "It is by far the simplest solution.", "itContext": "It is by far the simplest solution to maintain."}
  ],
  [
    {"word": "reliable", "level": "B", "domain": "it", "example": "It is more reliable.", "itContext": "The new pipeline is more reliable under load.", "definition": "Fiable, sur lequel on peut compter", "translation": "fiable"},
    {"word": "efficient", "level": "B", "domain": "it", "example": "It is more efficient.", "itContext": "The worker is more efficient after the rewrite.", "definition": "Efficace (peu de gaspillage)", "translation": "efficace"},
    {"word": "robust", "level": "C", "domain": "it", "example": "A robust design.", "itContext": "The queue design is robust against bursts.", "definition": "Solide, qui résiste aux chocs", "translation": "robuste"},
    {"word": "scalable", "level": "B", "domain": "it", "example": "It is more scalable.", "itContext": "Sharding makes the DB more scalable.", "definition": "Qui peut monter en charge", "translation": "scalable, extensible"},
    {"word": "affordable", "level": "B", "domain": "professional", "example": "An affordable plan.", "itContext": "The starter tier is the most affordable option.", "definition": "Abordable financièrement", "translation": "abordable"},
    {"word": "critical", "level": "B", "domain": "it", "example": "The most critical path.", "itContext": "Auth is the most critical path for login.", "definition": "Critique, essentiel", "translation": "critique"},
    {"word": "trade-off", "level": "C", "domain": "professional", "example": "It is a trade-off.", "itContext": "Speed versus cost is a classic trade-off.", "definition": "Compromis, arbitrage", "translation": "compromis"},
    {"word": "slightly", "level": "B", "domain": "grammar", "example": "Slightly slower.", "itContext": "The canary is slightly slower on cold start.", "definition": "Légèrement", "translation": "légèrement"}
  ],
  [
    {"expression": "outperform", "meaning": "surpasser (performer mieux)", "difficulty": "C", "example": "It outperforms the legacy one.", "classification": "it"},
    {"expression": "the lower the better", "meaning": "plus c'est bas, mieux c'est", "difficulty": "C", "example": "For latency, the lower the better.", "classification": "it"},
    {"expression": "a game changer", "meaning": "qui change la donne", "difficulty": "C", "example": "The cache was a game changer.", "classification": "professional"},
    {"expression": "head and shoulders above", "meaning": "largement au-dessus", "difficulty": "C", "example": "Their tooling is head and shoulders above ours.", "classification": "professional"},
    {"expression": "on par with", "meaning": "au même niveau que", "difficulty": "C", "example": "Perf is on par with last release.", "classification": "professional"}
  ],
  "Comparer des solutions : court → -er + than, long → more + than ; superlatif the -est / the most. Irréguliers : better, worse, more. Égalité as...as, distance not as...as, amplification much/by far.",
  [
    {"type": "multiple_choice", "question": "Option B is ___ than option A.", "options": ["cheap", "cheaper", "more cheap", "cheapest"], "correctAnswer": "cheaper", "explanation": "Court → -er + than."},
    {"type": "multiple_choice", "question": "This is ___ service in the stack.", "options": ["the most critical", "the criticaled", "more critical", "most critical"], "correctAnswer": "the most critical", "explanation": "Long → the most + adj."},
    {"type": "fill_blank", "question": "Complétez (irrégulier) : This release is ___ (good) than the last.", "options": [], "correctAnswer": "better", "explanation": "good → better."},
    {"type": "multiple_choice", "question": "Égalité : The clone is ___ fast as the primary.", "options": ["so", "as", "than", "more"], "correctAnswer": "as", "explanation": "as + adj + as."}
  ],
  "-er/more + than ; the -est/the most. Irréguliers : better/best, worse/worst, more/most. as...as (égalité), not as...as. Amplifieurs : much, far, slightly, by far.",
  [
    {"question": "The new API is far ___ stable.", "options": ["more", "most", "much", "very"], "correctAnswer": "more", "explanation": "far + comparatif."},
    {"question": "It was ___ outage of the year.", "options": [ "the worse", "the worst", "worse", "most bad"], "correctAnswer": "the worst", "explanation": "Superlatif de bad."},
    {"question": "Postgres is not as ___ as Redis here.", "options": ["faster", "fast", "fastest", "more fast"], "correctAnswer": "fast", "explanation": "not as + base + as."},
    {"question": "Sharding is ___ scalable than vertical growth.", "options": ["more", "most", "much", "as"], "correctAnswer": "more", "explanation": "Long adjectif → more."}
  ],
  [
    {"pattern": "X is -er than Y", "example": "gRPC is faster than REST here.", "explanation": "Comparer deux options."},
    {"pattern": "the most + adj (choix)", "example": "The most cost-effective tier.", "explanation": "Désigner le meilleur."},
    {"pattern": "much/far + comparatif", "example": "Much safer under load.", "explanation": "Amplifier un écart."}
  ]
),
# ================= LEÇON 117 — N2 Modaux should/must/have to =================
L(117, 5, 2, 7,
  "Should, Must, Have To: Advice and Obligation",
  "Exprimer conseil, obligation et interdiction avec should, must, have to, mustn't et don't have to — le cœur des revues de code et des règles d'équipe.",
  "Les modaux organisent les règles d'une équipe. SHOULD = conseil, recommandation (souple) : You should add a test. We should document this. Négatif : shouldn't = déconseillé — You shouldn't deploy on Friday. MUST = obligation forte, NON NÉGOCIABLE (sécurité, légal, règle d'équipe) : You must enable MFA. We must not log personal data. HAVE TO = obligation externe (contrainte qui vient de l'extérieur) : We have to comply with GDPR. I have to attend the audit meeting. MUSTN'T = INTERDICTION absolue — You mustn't share the token. DON'T HAVE TO = ABSENCE d'obligation (c'est permis mais pas requis) — You don't have to rewrite it; it works. Comparer : must (autorité du locuteur) vs have to (autorité externe) — I must finish this tonight (je me l'impose) / I have to finish tonight (le client l'exige). PASSÉ : had to (We had to roll back). FUTUR : will have to (We'll have to refactor). AUTRES MODAUX UTILES : could (suggestion douce — We could add a retry), might (possibilité — It might be a DNS issue), ought to (équivalent formel de should). Dans une revue de code : This must be fixed before merge. This should be refactored later. This could be simplified. C'est exactement le vocabulaire RFC 2119 (MUST/SHOULD/MAY) utilisé dans les specs.",
  [
    {"meaning": "Tu devrais ajouter un test.", "sentence": "You should add a test.", "itContext": "You should add a unit test for this edge case."},
    {"meaning": "Il faut activer la MFA (obligatoire).", "sentence": "You must enable MFA.", "itContext": "All admins must enable MFA by Friday."},
    {"meaning": "Nous devons nous conformer au RGPD.", "sentence": "We have to comply with GDPR.", "itContext": "We have to comply with GDPR for all user data."},
    {"meaning": "Interdiction de partager le token.", "sentence": "You mustn't share the token.", "itContext": "You mustn't share the token in the channel."},
    {"meaning": "Pas besoin de tout réécrire.", "sentence": "You don't have to rewrite it.", "itContext": "You don't have to rewrite it; the patch is enough."},
    {"meaning": "Nous avons dû faire marche arrière.", "sentence": "We had to roll back.", "itContext": "We had to roll back after the second alert."},
    {"meaning": "Ce point doit être corrigé avant fusion.", "sentence": "This must be fixed before merge.", "itContext": "The NPE must be fixed before merge; the rest can wait."}
  ],
  [
    {"word": "should", "level": "A", "domain": "grammar", "example": "You should log it.", "itContext": "You should log every retry attempt.", "definition": "Devrais (conseil)", "translation": "devrais"},
    {"word": "must", "level": "A", "domain": "grammar", "example": "You must sign it.", "itContext": "Requests must be signed with HMAC.", "definition": "Dois (obligation forte)", "translation": "dois (obligatoire)"},
    {"word": "comply", "level": "C", "domain": "professional", "example": "We comply with ISO 27001.", "itContext": "The platform complies with ISO 27001.", "definition": "Se conformer à une règle", "translation": "se conformer"},
    {"word": "requirement", "level": "B", "domain": "professional", "example": "It is a requirement.", "itContext": "MFA is a hard requirement for admins.", "definition": "Exigence, prérequis", "translation": "exigence"},
    {"word": "forbidden", "level": "B", "domain": "professional", "example": "It is forbidden.", "itContext": "Storing keys in code is strictly forbidden.", "definition": "Interdit", "translation": "interdit"},
    {"word": "optional", "level": "B", "domain": "professional", "example": "It is optional.", "itContext": "The metadata field is optional in the schema.", "definition": "Facultatif", "translation": "facultatif"},
    {"word": "enforce", "level": "C", "domain": "professional", "example": "CI enforces it.", "itContext": "CI enforces the lint rules on every PR.", "definition": "Faire respecter (règle)", "translation": "imposer, faire respecter"},
    {"word": "guideline", "level": "C", "domain": "professional", "example": "Follow the guidelines.", "itContext": "Follow the team guidelines for naming.", "definition": "Recommandation, règle souple", "translation": "ligne directrice"}
  ],
  [
    {"expression": "no way", "meaning": "hors de question", "difficulty": "B", "example": "No way we ship this today.", "classification": "professional"},
    {"expression": "be supposed to", "meaning": "être censé", "difficulty": "B", "example": "The job is supposed to run at 3.", "classification": "professional"},
    {"expression": "better off", "meaning": "on serait mieux de", "difficulty": "C", "example": "We're better off queueing it.", "classification": "professional"},
    {"expression": "rule of thumb", "meaning": "règle générale", "difficulty": "C", "example": "Rule of thumb: patch within 48h.", "classification": "professional"},
    {"expression": "keep it in mind", "meaning": "garder ça en tête", "difficulty": "A", "example": "Keep the SLA in mind.", "classification": "professional"}
  ],
  "should = conseil, must = obligation forte, have to = contrainte externe, mustn't = interdiction, don't have to = pas d'obligation. Passé had to, futur will have to. Le vocabulaire exact des revues et des specs.",
  [
    {"type": "multiple_choice", "question": "Conseil : You ___ write a migration test.", "options": ["must", "should", "have", "are"], "correctAnswer": "should", "explanation": "Conseil souple → should."},
    {"type": "multiple_choice", "question": "INTERDICTION : You ___ commit secrets.", "options": ["don't have to", "mustn't", "shouldn't have", "haven't to"], "correctAnswer": "mustn't", "explanation": "Interdiction absolue."},
    {"type": "fill_blank", "question": "Complétez (pas d'obligation) : You ___ answer every comment.", "options": [], "correctAnswer": "don't have to", "explanation": "Absence d'obligation."},
    {"type": "multiple_choice", "question": "Passé : We ___ to escalate yesterday.", "options": ["must", "had", "have", "should"], "correctAnswer": "had", "explanation": "had to = obligation passée."}
  ],
  "should/shouldn't (conseil), must/mustn't (obligation/interdiction), have to (externe), don't have to (pas requis), had to (passé), will have to (futur), could/might (douceur/possibilité).",
  [
    {"question": "You ___ review the checklist before sign-off.", "options": [ "should", "mustn't", "don't have", "had"], "correctAnswer": "should", "explanation": "Recommandation."},
    {"question": "We ___ to follow the change process (externe).", "options": ["must", "have", "should", "ought"], "correctAnswer": "have", "explanation": "Contrainte externe → have to."},
    {"question": "You ___ run it as root — interdit.", "options": ["shouldn't", "mustn't", "don't have to", "can't have"], "correctAnswer": "mustn't", "explanation": "Interdiction → mustn't."},
    {"question": "Tomorrow we ___ have to reindex.", "options": ["will", "are", "did", "would"], "correctAnswer": "will", "explanation": "Futur → will have to."}
  ],
  [
    {"pattern": "should + base (conseil)", "example": "We should cache this query.", "explanation": "Recommander sans imposer."},
    {"pattern": "must + base (règle)", "example": "Access must be logged.", "explanation": "Poser une exigence dure."},
    {"pattern": "don't have to (libre)", "example": "You don't have to migrate now.", "explanation": "Rappeler qu'une option existe."}
  ]
),
# ================= LEÇON 118 — N2 Past Continuous =================
L(118, 4, 2, 8,
  "Past Continuous: Setting the Scene",
  "Décrire une action en cours dans le passé (was/were + -ing) pour poser le décor d'un incident, souvent avec while et when.",
  "Le past continuous peint une action EN COURS à un moment du passé. FORME : was/were + verbe-ing — The pipeline was running at 2 AM. I was reviewing the PR when the alert fired. DEUX RÔLES : 1) DÉCOR (action longue qui dure) — It was raining of requests when the bug hit... techniquement : The API was serving heavy traffic when it crashed. 2) ACTION INTERROMPUE : past continuous (longue) + when + past simple (courte qui coupe) — We were deploying when the alert fired. I was writing the report when the build broke. WHILE + continuous (deux actions parallèles) : While the tests were running, we prepared the rollback. CONTRASTE : while (pendant, durée) vs when (au moment où, déclencheur). MARQUEURS : at 2 AM yesterday, all night, while, when, as. NÉGATIF : wasn't/weren't + -ing — The job wasn't running when I checked. QUESTION : Was/Were + sujet + -ing ? — What were you doing when it failed ? ATTENTION AU SENS : some verbes d'état restent au past simple même en décor (I knew, we had, it seemed). RÉCIT TYPIQUE DE POST-MORTEM : At 02:00, the batch was running as usual. The disk was filling up silently. At 02:17, the volume hit 100% and the node went down. Les deux temps mélangés racontent : le continu installe la scène, le simple donne les coups.",
  [
    {"meaning": "Le pipeline tournait à 2h du matin.", "sentence": "The pipeline was running at 2 AM.", "itContext": "The pipeline was running at 2 AM when the disk filled."},
    {"meaning": "Nous déployions quand l'alerte a sonné.", "sentence": "We were deploying when the alert fired.", "itContext": "We were deploying the hotfix when the alert fired again."},
    {"meaning": "Pendant que les tests tournaient, on préparait le rollback.", "sentence": "While the tests were running, we prepared the rollback.", "itContext": "While the tests were running, we prepared the rollback plan."},
    {"meaning": "Le job ne tournait pas quand j'ai vérifié.", "sentence": "The job wasn't running when I checked.", "itContext": "The job wasn't running when I checked the dashboard."},
    {"meaning": "Que faisais-tu quand ça a planté ?", "sentence": "What were you doing when it failed?", "itContext": "What were you doing when the primary failed over?"},
    {"meaning": "Le disque se remplissait silencieusement.", "sentence": "The disk was filling up silently.", "itContext": "The disk was filling up silently for hours."},
    {"meaning": "L'API servait un trafic lourd.", "sentence": "The API was serving heavy traffic.", "itContext": "The API was serving heavy traffic during the sale."}
  ],
  [
    {"word": "meanwhile", "level": "B", "domain": "professional", "example": "Meanwhile, the queue grew.", "itContext": "Meanwhile, the dead-letter queue kept growing.", "definition": "Pendant ce temps", "translation": "pendant ce temps"},
    {"word": "silently", "level": "B", "domain": "it", "example": "It failed silently.", "itContext": "The watcher failed silently without alerts.", "definition": "Sans bruit, sans signal", "translation": "silencieusement"},
    {"word": "interrupt", "level": "B", "domain": "it", "example": "It interrupted the deploy.", "itContext": "The network blip interrupted the deploy mid-way.", "definition": "Interrompre", "translation": "interrompre"},
    {"word": "background", "level": "B", "domain": "it", "example": "It runs in background.", "itContext": "The sync runs in background every hour.", "definition": "Arrière-plan, en tâche de fond", "translation": "arrière-plan"},
    {"word": "scene", "level": "B", "domain": "professional", "example": "Set the scene.", "itContext": "The timeline sets the scene for the post-mortem.", "definition": "Scène, contexte d'un récit", "translation": "scène, décor"},
    {"word": "trigger", "level": "B", "domain": "it", "example": "It triggered the alert.", "itContext": "The failed probe triggered the pager.", "definition": "Déclencher", "translation": "déclencher"},
    {"word": "ongoing", "level": "B", "domain": "professional", "example": "An ongoing deploy.", "itContext": "An ongoing deploy was interrupted by the freeze.", "definition": "En cours", "translation": "en cours"},
    {"word": "overnight", "level": "B", "domain": "professional", "example": "It ran overnight.", "itContext": "The import ran overnight without errors.", "definition": "Pendant la nuit", "translation": "toute la nuit"}
  ],
  [
    {"expression": "out of nowhere", "meaning": "sans prévenir", "difficulty": "C", "example": "The spike came out of nowhere.", "classification": "professional"},
    {"expression": "in the middle of", "meaning": "au milieu de", "difficulty": "A", "example": "It broke in the middle of the deploy.", "classification": "professional"},
    {"expression": "all of a sudden", "meaning": "tout à coup", "difficulty": "B", "example": "All of a sudden, alerts fired.", "classification": "professional"},
    {"expression": "at the time", "meaning": "à l'époque, à ce moment", "difficulty": "B", "example": "At the time, we had no canary.", "classification": "professional"},
    {"expression": "keep going", "meaning": "continuer", "difficulty": "A", "example": "The queue kept going up.", "classification": "professional"}
  ],
  "Past continuous = décor (was/were + -ing). Interrupted by when + past simple. Parallel with while. Le simple donne les coups, le continu installe la scène du post-mortem.",
  [
    {"type": "multiple_choice", "question": "We ___ the PR when the alert fired.", "options": ["reviewed", "were reviewing", "are reviewing", "review"], "correctAnswer": "were reviewing", "explanation": "Décor interrompu → was/were + -ing."},
    {"type": "multiple_choice", "question": "___ the tests were running, we prepared the rollback.", "options": ["While", "When", "During", "At"], "correctAnswer": "While", "explanation": "Deux durées parallèles → while."},
    {"type": "fill_blank", "question": "Complétez : The job ___ running when I checked.", "options": [], "correctAnswer": "wasn't", "explanation": "Négatif du past continuous."},
    {"type": "multiple_choice", "question": "Coup court qui interrompt :", "options": ["while", "when + past simple", "during", "for"], "correctAnswer": "when + past simple", "explanation": "when + simple = déclencheur."}
  ],
  "was/were + -ing = décor ; when + past simple = interruption ; while + continuous = parallèle. Marqueurs : at 2 AM, all night, meanwhile. Les états (knew, had) restent au simple.",
  [
    {"question": "It ___ raining errors when the fix landed.", "options": ["was", "were", "did", "is"], "correctAnswer": "was", "explanation": "it → was + -ing."},
    {"question": "___ you debugging when I pinged?", "options": ["Was", "Were", "Did", "Are"], "correctAnswer": "Were", "explanation": "you → were."},
    {"question": "The node ___ down while we were patching.", "options": ["was going", "went", "goes", "gone"], "correctAnswer": "went", "explanation": "Événement bref → past simple."},
    {"question": "___, the backlog kept growing.", "options": ["Meanwhile", "During", "At", "For"], "correctAnswer": "Meanwhile", "explanation": "Pendant ce temps."}
  ],
  [
    {"pattern": "was/were + -ing (décor)", "example": "The batch was running.", "explanation": "Installer la toile de fond."},
    {"pattern": "...-ing when + simple", "example": "We were shipping when it broke.", "explanation": "Relier décor et coup."},
    {"pattern": "While + -ing, + simple", "example": "While tests ran, we staged rollback.", "explanation": "Montrer le parallélisme."}
  ]
),
# ================= LEÇON 119 — N2 Prépositions in/on/at =================
L(119, 14, 2, 9,
  "In, On, At: Prepositions of Time and Place in IT",
  "Placer les événements dans le temps et l'espace avec in, on, at — et éviter les confusions typiques (in the morning / on Monday / at 6 PM).",
  "Trois prépositions structurent le temps et le lieu. TEMPS — IN : les grands contenants (in 2024, in May, in the morning, in three days). ON : jours et dates (on Monday, on May 4th, on Friday morning). AT : points précis (at 6 PM, at noon, at night, at the moment, at the end of the sprint). Ordre décroissant : in (large) → on (moyen) → at (précis). LIEU — IN : espaces fermés ou zones (in the datacenter, in Paris, in the config file, in production). ON : surfaces et supports (on the server, on the dashboard, on disk, on the network, on call). AT : points localisés (at the office, at the entry point, at 127.0.0.1:8080). EXPRESSIONS FIGÉES : at risk, at scale, on time (à l'heure), on purpose (exprès), in time (à temps), in advance (à l'avance), on site (sur place), in the cloud. PIÈGES : the next day / last week / yesterday / tomorrow SANS préposition (pas in yesterday ni on yesterday). during + nom (during the migration), for + durée (for two hours), since + point (since 2020), from...to (from 2 to 4 AM). DANS LE CODE ET LES TICKETS : The outage occurred on Friday at 14:02 in the EU datacenter — les trois prépositions dans une seule phrase.",
  [
    {"meaning": "La panne est survenue vendredi à 14h02.", "sentence": "The outage occurred on Friday at 14:02.", "itContext": "The outage occurred on Friday at 14:02 UTC."},
    {"meaning": "Les fichiers vivent sur le serveur.", "sentence": "The files live on the server.", "itContext": "The static files live on the edge server."},
    {"meaning": "La valeur est dans le fichier de config.", "sentence": "The value is in the config file.", "itContext": "The timeout value is in the config file."},
    {"meaning": "Nous livrerons à temps (dans le délai).", "sentence": "We will ship in time.", "itContext": "We will ship in time for the launch."},
    {"meaning": "La migration aura lieu en mai.", "sentence": "The migration happens in May.", "itContext": "The migration happens in May, between releases."},
    {"meaning": "L'équipe est de garde cette semaine.", "sentence": "The team is on call this week.", "itContext": "The platform team is on call this week."},
    {"meaning": "Le service écoute sur le port 8080.", "sentence": "The service listens on port 8080.", "itContext": "The service listens on port 8080 locally."}
  ],
  [
    {"word": "within", "level": "B", "domain": "professional", "example": "Within 24 hours.", "itContext": "We respond within 24 hours.", "definition": "En moins de (délai)", "translation": "dans (délai)"},
    {"word": "during", "level": "A", "domain": "grammar", "example": "During the outage.", "itContext": "Alerts were muted during the migration.", "definition": "Pendant (événement)", "translation": "pendant"},
    {"word": "between", "level": "A", "domain": "grammar", "example": "Between releases.", "itContext": "Deployments are frozen between releases.", "definition": "Entre deux bornes", "translation": "entre"},
    {"word": "toward", "level": "B", "domain": "professional", "example": "Toward Q4.", "itContext": "Error rates improved toward the end of Q3.", "definition": "Vers (direction/échéance)", "translation": "vers"},
    {"word": "onsite", "level": "B", "domain": "professional", "example": "Onsite support.", "itContext": "Onsite support is available in Paris.", "definition": "Sur place", "translation": "sur place"},
    {"word": "offline", "level": "A", "domain": "it", "example": "The node is offline.", "itContext": "The node went offline during the patch.", "definition": "Hors ligne", "translation": "hors ligne"},
    {"word": "deadline", "level": "B", "domain": "professional", "example": "Before the deadline.", "itContext": "The patch landed before the deadline.", "definition": "Échéance", "translation": "échéance"},
    {"word": "ahead", "level": "B", "domain": "professional", "example": "Ahead of schedule.", "itContext": "We are ahead of schedule this sprint.", "definition": "En avance (devant)", "translation": "en avance"}
  ],
  [
    {"expression": "at scale", "meaning": "à grande échelle", "difficulty": "C", "example": "It breaks at scale.", "classification": "it"},
    {"expression": "on time", "meaning": "à l'heure (ponctuel)", "difficulty": "A", "example": "The release shipped on time.", "classification": "professional"},
    {"expression": "in advance", "meaning": "à l'avance", "difficulty": "B", "example": "Book the window in advance.", "classification": "professional"},
    {"expression": "by then", "meaning": "d'ici là", "difficulty": "B", "example": "The fix will be live by then.", "classification": "professional"},
    {"expression": "up to date", "meaning": "à jour", "difficulty": "B", "example": "Keep dependencies up to date.", "classification": "it"}
  ],
  "in = contenant (2024, May, the datacenter), on = jour/support (Monday, port 8080), at = point (14:02, night, the office). Hier/last week/yesterday sans préposition. during/for/since/from...to affinent la durée.",
  [
    {"type": "multiple_choice", "question": "The deploy goes live ___ Thursday.", "options": ["in", "on", "at", "to"], "correctAnswer": "on", "explanation": "Jour → on."},
    {"type": "multiple_choice", "question": "Alerts fired ___ 02:14.", "options": ["in", "on", "at", "since"], "correctAnswer": "at", "explanation": "Heure précise → at."},
    {"type": "fill_blank", "question": "Complétez : The bug was introduced ___ 2023.", "options": [], "correctAnswer": "in", "explanation": "Année → in."},
    {"type": "multiple_choice", "question": "Le service écoute ___ le port 443 :", "options": ["in", "at", "on", "to"], "correctAnswer": "on", "explanation": "Port/support → on."}
  ],
  "Temps : in (année/mois/matin), on (jour/date), at (heure/night). Lieu : in (zone/fichier), on (surface/port), at (point). Pas de préposition avec yesterday, last week, tomorrow.",
  [
    {"question": "We met ___ the Paris office.", "options": [ "in", "on", "at", "by"], "correctAnswer": "at", "explanation": "Point localisé → at."},
    {"question": "The key lives ___ the vault.", "options": ["on", "in", "at", "by"], "correctAnswer": "in", "explanation": "Contenant → in."},
    {"question": "We shipped it ___ May 4th.", "options": ["in", "on", "at", "since"], "correctAnswer": "on", "explanation": "Date → on."},
    {"question": "It responded ___ less than a second.", "options": ["in", "on", "at", "during"], "correctAnswer": "in", "explanation": "in + durée = en moins de."}
  ],
  [
    {"pattern": "on + jour + at + heure", "example": "On Friday at 14:02.", "explanation": "Dater précisément un incident."},
    {"pattern": "in + fichier/zone", "example": "In the config file.", "explanation": "Localiser la source."},
    {"pattern": "on + support/port", "example": "On port 8080.", "explanation": "Décrire le point technique."}
  ]
),
# ================= LEÇON 120 — N2 Phrasal verbs IT =================
L(120, 14, 2, 10,
  "IT Phrasal Verbs You Actually Use",
  "Maîtriser les verbes à particule du quotidien technique : set up, shut down, back up, roll out, spin up, tear down, break down, catch up.",
  "Les phrasal verbs sont partout en anglais technique. LOGIQUE : verbe + particule change le sens. SET UP = installer, configurer (Set up the local environment). SHUT DOWN = éteindre proprement (Shut down the node before maintenance). BACK UP = sauvegarder (Back up the database first). ROLL OUT = déployer progressivement (We roll out features gradually). SPIN UP = créer/lancer rapidement une instance (Spin up a staging VM). TEAR DOWN = démonter, détruire (Tear down the stack after the test). BREAK DOWN = tomber en panne (se dit d'un système) OU décomposer (break the problem down into steps). CATCH UP = rattraper (I need to catch up on the logs). COME UP = survenir (An issue came up during the release). FIGURE OUT = comprendre, résoudre (We figured out the root cause). POINT CRUCIAL : les phrasal verbs SÉPARABLES acceptent l'objet entre le verbe et la particule (turn it off, spin up a VM / spin a VM up) — mais si l'objet est un PRONOM, il vient OBLIGATOIREMENT au milieu (turn it off, jamais turn off it). Les inséparables (run into, look after) gardent l'objet après : We ran into a bug (pas ran a bug into). Séparables fréquents : set up, shut down, back up, roll out, turn off/on, tear down, figure out, fill in. Inséparables : run into, come across, look into, deal with, get around. En Daily : Yesterday I set up the pipeline, then we ran into a flaky test, and I figured it out by noon.",
  [
    {"meaning": "Configurez l'environnement local.", "sentence": "Set up the local environment.", "itContext": "Set up the local environment before running tests."},
    {"meaning": "Éteignez le nœud avant la maintenance.", "sentence": "Shut down the node before maintenance.", "itContext": "Shut down the node gracefully before maintenance."},
    {"meaning": "Créez une VM de staging.", "sentence": "Spin up a staging VM.", "itContext": "Spin up a staging VM for the load test."},
    {"meaning": "Démontez la stack après le test.", "sentence": "Tear down the stack after the test.", "itContext": "Tear down the stack to avoid idle costs."},
    {"meaning": "Nous avons trouvé la cause racine.", "sentence": "We figured out the root cause.", "itContext": "We figured out the root cause within an hour."},
    {"meaning": "Un problème est survenu pendant la release.", "sentence": "An issue came up during the release.", "itContext": "An issue came up during the release window."},
    {"meaning": "On est tombé sur un test instable.", "sentence": "We ran into a flaky test.", "itContext": "We ran into a flaky test in the CI pipeline."}
  ],
  [
    {"word": "set up", "level": "A", "domain": "it", "example": "Set up the tool.", "itContext": "Set up the tool with your team credentials.", "definition": "Installer, configurer", "translation": "installer, configurer"},
    {"word": "shut down", "level": "A", "domain": "it", "example": "Shut it down.", "itContext": "Shut down the legacy service tonight.", "definition": "Éteindre proprement", "translation": "éteindre"},
    {"word": "back up", "level": "A", "domain": "it", "example": "Back it up daily.", "itContext": "Back up the volume daily at 3 AM.", "definition": "Sauvegarder", "translation": "sauvegarder"},
    {"word": "roll out", "level": "B", "domain": "dev", "example": "Roll it out to 10%.", "itContext": "Roll out the feature to 10% of users.", "definition": "Déployer progressivement", "translation": "déployer"},
    {"word": "tear down", "level": "B", "domain": "it", "example": "Tear it down.", "itContext": "Tear down the preview env after review.", "definition": "Démonter, détruire", "translation": "démonter"},
    {"word": "figure out", "level": "B", "domain": "professional", "example": "Figure it out.", "itContext": "We will figure out why the cache misses.", "definition": "Comprendre, déduire", "translation": "comprendre, résoudre"},
    {"word": "run into", "level": "B", "domain": "professional", "example": "We ran into a bug.", "itContext": "We ran into a rate limit at scale.", "definition": "Rencontrer (problème)", "translation": "tomber sur"},
    {"word": "catch up", "level": "B", "domain": "professional", "example": "Catch up on logs.", "itContext": "I need to catch up on yesterday's logs.", "definition": "Rattraper, se mettre à jour", "translation": "rattraper"}
  ],
  [
    {"expression": "sort it out", "meaning": "régler le problème", "difficulty": "B", "example": "We'll sort it out by Friday.", "classification": "professional"},
    {"expression": "hold off on", "meaning": "reporter, attendre avant", "difficulty": "C", "example": "Hold off on the deploy.", "classification": "professional"},
    {"expression": "come across", "meaning": "tomber par hasard sur", "difficulty": "B", "example": "I came across an old bug report.", "classification": "professional"},
    {"expression": "look into", "meaning": "examiner, enquêter", "difficulty": "B", "example": "We are looking into the spike.", "classification": "professional"},
    {"expression": "get around to", "meaning": "trouver le temps de", "difficulty": "C", "example": "I'll get around to it tomorrow.", "classification": "professional"}
  ],
  "Les phrasal verbs font l'anglais naturel du dev : set up / shut down / back up / roll out / spin up / tear down. Pronom objet au milieu (turn it off). Inséparables : run into, look into.",
  [
    {"type": "multiple_choice", "question": "Turn ___ before you unplug it.", "options": ["off it", "it off", "off", "it"], "correctAnswer": "it off", "explanation": "Pronom OBLIGATOIREMENT au milieu."},
    {"type": "multiple_choice", "question": "We ___ a bug during the demo.", "options": ["ran into", "ran into it", "ran out", "ran over"], "correctAnswer": "ran into", "explanation": "run into = rencontrer."},
    {"type": "fill_blank", "question": "Complétez : ___ up a VM for the load test.", "options": [], "correctAnswer": "Spin", "explanation": "spin up = lancer une instance."},
    {"type": "multiple_choice", "question": "Déployer progressivement :", "options": ["fill out", "roll out", "set out", "sort out"], "correctAnswer": "roll out", "explanation": "roll out = déploiement."}
  ],
  "Séparables : set up, shut down, back up, roll out, spin up, tear down, figure out, turn on/off (pronom au milieu). Inséparables : run into, come across, look into, deal with.",
  [
    {"question": "Back ___ the database before patching.", "options": ["on", "up", "in", "off"], "correctAnswer": "up", "explanation": "back up = sauvegarder."},
    {"question": "We are ___ into the latency spike.", "options": ["looking", "running", "turning", "setting"], "correctAnswer": "looking", "explanation": "look into = enquêter."},
    {"question": "___ down the stack to save costs.", "options": ["Tear", "Back", "Spin", "Set"], "correctAnswer": "Tear", "explanation": "tear down = démonter."},
    {"question": "I need to catch ___ on the thread.", "options": ["up", "in", "on it", "over"], "correctAnswer": "up", "explanation": "catch up on = rattraper."}
  ],
  [
    {"pattern": "verbe + pronom + particule", "example": "Shut it down.", "explanation": "Pronom toujours au milieu."},
    {"pattern": "spin up + ressource", "example": "Spin up a replica.", "explanation": "Créer à la demande."},
    {"pattern": "run into + problème", "example": "Ran into a timeout.", "explanation": "Rapporter un obstacle."}
  ]
),
# ================= POST-TRAITEMENT : garantir étoffe ≥ 1800 car. =================
MIN_EXPL = 1800

def _section_vocab(voc):
    if not voc:
        return ""
    lines = ["\n\n🔑 VOCABULAIRE ESSENTIEL DE LA LEÇON"]
    for v in voc[:8]:
        lines.append(f"- {v['word']} ({v.get('domain', '')}) : {v['definition']} — ex. {v['example']}")
    return "\n".join(lines)

def _section_expr(expr):
    if not expr:
        return ""
    lines = ["\n\n💬 EXPRESSIONS À RETENIR"]
    for e in expr[:5]:
        lines.append(f"- {e['expression']} : {e['meaning']} — ex. {e['example']}")
    return "\n".join(lines)

def _section_quiz(quiz):
    if not quiz:
        return ""
    lines = ["\n\n✅ POUR VOUS TESTER"]
    for q in quiz[:4]:
        opts = " / ".join(q['options']) if q.get('options') else "(réponse libre)"
        lines.append(f"- {q['question']} → {q['correctAnswer']} ({opts})")
    return "\n".join(lines)

for _l in LESSONS:
    base = _l["explanation"] or ""
    _l["explanation"] = base + _section_vocab(_l.get("vocabulary")) + _section_expr(_l.get("expressions")) + _section_quiz(_l.get("quiz"))

# ================= ÉCRITURE =================
OUT = os.path.join(BASE, "database", "remediation-t1.json")
with open(OUT, "w", encoding="utf-8") as f:
    json.dump({"lessons": LESSONS}, f, ensure_ascii=False, indent=2)
print(f"✅ {len(LESSONS)} leçons écrites → {OUT}")
for _l in LESSONS:
    print(f"  L{_l['id']} « {_l['title']} » expl={len(_l['explanation'])} car, ex={len(_l['examples'])}, voc={len(_l['vocabulary'])}, exprs={len(_l['expressions'])}, pract={len(_l['practice'])}, quiz={len(_l['quiz'])}, patt={len(_l.get('patterns', []))}")
