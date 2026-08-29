-- ============================================================================
-- SUPPLEMENT — Contenu pédagogique enrichi pour les 20 jours
-- À exécuter APRES initial_data.sql
-- ============================================================================

-- ============================================================================
-- NIVEAU 1 — English Sentence Foundations
-- ============================================================================

INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(1, 'Subject + Verb + Object', 'Construire des phrases simples avec sujet, verbe et complément.', 3, 'active'),
(1, 'Pronouns and Auxiliaries', 'Utiliser les pronoms et auxiliaires be/do/have.', 4, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
(1, 'Building Simple Sentences', 'Construire des phrases simples Sujet + Verbe + Complément.',
'Une phrase anglaise simple suit la structure : Sujet + Verbe + Complément. Le sujet peut être un nom ou un pronom.',
'[
  {"sentence": "I configure the server.", "meaning": "Je configure le serveur.", "itContext": "The admin configures the server every morning."},
  {"sentence": "She monitors the network.", "meaning": "Elle surveille le réseau.", "itContext": "She monitors network traffic 24/7."},
  {"sentence": "They deploy applications.", "meaning": "Ils déploient des applications.", "itContext": "The team deploys applications every Friday."}
]',
'[
  {"word": "server", "definition": "Serveur informatique", "translation": "serveur", "example": "The server is down.", "itExample": "Restart the server.", "domain": "it", "level": "A"},
  {"word": "configure", "definition": "Configurer", "translation": "configurer", "example": "Configure the settings.", "itExample": "Configure the firewall rules.", "domain": "it", "level": "A"},
  {"word": "monitor", "definition": "Surveiller", "translation": "surveiller", "example": "Monitor the system.", "itExample": "Monitor network traffic.", "domain": "it", "level": "A"},
  {"word": "deploy", "definition": "Déployer", "translation": "déployer", "example": "Deploy the application.", "itExample": "Deploy to production.", "domain": "it", "level": "A"},
  {"word": "network", "definition": "Réseau", "translation": "réseau", "example": "The network is secure.", "itExample": "Connect to the network.", "domain": "it", "level": "A"}
]',
'[
  {"expression": "I need to check...", "meaning": "Je dois vérifier...", "example": "I need to check the server logs.", "classification": "professional", "difficulty": "A"},
  {"expression": "Could you help me with...?", "meaning": "Pourriez-vous m''aider avec...?", "example": "Could you help me with this error?", "classification": "professional", "difficulty": "A"}
]',
'In IT environments, sentence structure is crucial for clear communication. "I need to deploy the application" is more effective than "Need deployment application."',
'[
  {"type": "multiple_choice", "question": "Choose the correct sentence: ''The application ___ running.''", "options": ["not is", "is not", "no is", "is no"], "correctAnswer": "is not", "explanation": "La négation avec be utilise is not ou isn''t."},
  {"type": "fill_blank", "question": "Complete: ''We need to ___ the new version tonight.''", "options": [], "correctAnswer": "deploy", "explanation": "Deploy signifie mettre en production."},
  {"type": "multiple_choice", "question": "Which word is a verb? ''The ___ checks the server.''", "options": ["server", "checks", "the", "network"], "correctAnswer": "checks", "explanation": "Checks est le verbe (troisième personne)."}
]',
'La structure Sujet + Verbe + Complément est la base de la phrase anglaise. En informatique, elle permet de décrire des actions techniques clairement.',
2, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
(2, 'Pronouns and Basic Auxiliaries', 'Utiliser les pronoms personnels et les auxiliaires be/do/have.',
'Les pronoms : I, you, he, she, it, we, they. Les auxiliaires be, do, have sont essentiels pour former les questions et la négation.',
'[
  {"sentence": "I am the system administrator.", "meaning": "Je suis l''administrateur système.", "itContext": "I am responsible for the servers."},
  {"sentence": "She does not have access.", "meaning": "Elle n''a pas accès.", "itContext": "Check if she has access to the database."},
  {"sentence": "They have completed the update.", "meaning": "Ils ont terminé la mise à jour.", "itContext": "The team has completed the security update."}
]',
'[
  {"word": "administrator", "definition": "Administrateur", "translation": "administrateur", "example": "The administrator manages the system.", "itExample": "Contact the system administrator.", "domain": "it", "level": "A"},
  {"word": "access", "definition": "Accès", "translation": "accès", "example": "Access the server.", "itExample": "Request access to the database.", "domain": "it", "level": "A"},
  {"word": "update", "definition": "Mise à jour", "translation": "mise à jour", "example": "Install the update.", "itExample": "Apply the security update.", "domain": "it", "level": "A"}
]',
'[
  {"expression": "I don''t have access.", "meaning": "Je n''ai pas accès.", "example": "I don''t have access to the server.", "classification": "it", "difficulty": "A"},
  {"expression": "Could you check...?", "meaning": "Pourriez-vous vérifier...?", "example": "Could you check the configuration?", "classification": "professional", "difficulty": "A"}
]',
'Les pronoms et auxiliaires sont utilisés constamment dans les communications techniques : "I need to check if she has access to the server."',
'[
  {"type": "multiple_choice", "question": "Choose the correct pronoun: ''___ need to update the system.''", "options": ["I", "Me", "Mine", "My"], "correctAnswer": "I", "explanation": "I est le pronom sujet utilisé comme sujet du verbe."},
  {"type": "error_correction", "question": "Correct: ''She don''t have access to the database.''", "options": [], "correctAnswer": "She doesn''t have access to the database.", "explanation": "À la troisième personne, do devient doesn''t."},
  {"type": "fill_blank", "question": "Complete: ''I ___ the system administrator.''", "options": [], "correctAnswer": "am", "explanation": "Be prend la forme am à la première personne."}
]',
'Maîtriser les pronoms et auxiliaires permet de construire des phrases correctes dans les situations professionnelles.',
3, 'active');

-- ============================================================================
-- NIVEAU 2 — Functional Verb System (suite)
-- ============================================================================

INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(2, 'Common Verbs in Context', 'Utiliser les verbes courants dans des phrases IT.', 4, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
(7, 'High-Frequency Verbs', 'Maîtriser les verbes les plus fréquents en anglais professionnel.',
'Les verbes comme get, make, take, give, know, think, want, need sont essentiels. En informatique, ils forment des expressions récurrentes.',
'[
  {"sentence": "I need to get the logs.", "meaning": "Je dois récupérer les logs.", "itContext": "Get the logs from the server."},
  {"sentence": "Can you make a backup?", "meaning": "Peux-tu faire une sauvegarde?", "itContext": "Make a backup before the update."},
  {"sentence": "We should take action immediately.", "meaning": "Nous devrions agir immédiatement.", "itContext": "Take action when a vulnerability is detected."}
]',
'[
  {"word": "backup", "definition": "Sauvegarde", "translation": "sauvegarde", "example": "Create a backup.", "itExample": "Run a full backup.", "domain": "it", "level": "A"},
  {"word": "logs", "definition": "Journaux système", "translation": "logs", "example": "Check the logs.", "itExample": "Analyze the access logs.", "domain": "it", "level": "A"},
  {"word": "vulnerability", "definition": "Vulnérabilité", "translation": "vulnérabilité", "example": "Fix the vulnerability.", "itExample": "Patch the vulnerability.", "domain": "cybersecurity", "level": "A"}
]',
'[
  {"expression": "take action", "meaning": "agir", "example": "Take action immediately.", "classification": "professional", "difficulty": "A"},
  {"expression": "get back to me", "meaning": "me tenir informé", "example": "Get back to me when you have the results.", "classification": "professional", "difficulty": "A"}
]',
'Les verbes courants sont la base des phrases professionnelles. "I need to get the logs before we can investigate the incident."',
'[
  {"type": "multiple_choice", "question": "Choose the correct verb: ''I need to ___ the logs.''", "options": ["get", "gets", "getting", "got"], "correctAnswer": "get", "explanation": "Need to est suivi de la forme de base du verbe."},
  {"type": "scenario", "question": "You need a backup. Write a request to your colleague.", "options": [], "correctAnswer": "Can you make a backup of the database?", "explanation": "Make a backup est l''expression standard."},
  {"type": "transformation", "question": "Transform: ''You should update the system.'' → Question", "options": [], "correctAnswer": "Should you update the system?", "explanation": "Avec should, on déplace l''auxiliaire avant le sujet."}
]',
'Les verbes courants permettent de construire des phrases utiles dans 80% des situations professionnelles.',
4, 'active');

-- ============================================================================
-- QUESTIONS SUPPLÉMENTAIRES — NIVEAUX 1 ET 2
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
-- Niveau 1 — Sentence Structure
('multiple_choice', 'Choose the correct sentence: ''The server ___ down.''', 'IT context', 'A', 1, NULL, 'Is down indique que le serveur est hors service.', ARRAY['it', 'sentence'], 'active'),
('fill_blank', 'Complete: "___ need to access the database."', NULL, 'A', 2, NULL, 'I est le pronom sujet à la première personne.', ARRAY['pronouns'], 'active'),
('multiple_choice', 'Which is a correct negative? ''She ___ working.''', NULL, 'A', 3, NULL, 'Is not ou isn''t est la négation correcte de is.', ARRAY['negation', 'auxiliaries'], 'active'),
('error_correction', 'Correct: ''They is updating the system.''', NULL, 'A', 2, NULL, 'They sont → they are.', ARRAY['conjugation', 'present'], 'active'),
('multiple_choice', 'Choose the correct preposition: ''The server is ___ the network.''', NULL, 'A', 13, NULL, 'On the network est l''expression correcte.', ARRAY['prepositions'], 'active'),

-- Niveau 2 — Conjugaison
('multiple_choice', 'Past tense of "run":', NULL, 'A', 7, NULL, 'Le past simple de run est ran.', ARRAY['conjugation', 'irregular'], 'active'),
('fill_blank', 'Complete: ''She ___ to the server yesterday.''', NULL, 'A', 7, NULL, 'Gone est le past participle de go, utilisé avec have/has pour le present perfect.', ARRAY['conjugation', 'perfect'], 'active'),
('multiple_choice', 'Future with will: ''I ___ deploy the update tomorrow.''', NULL, 'A', 8, NULL, 'Will est suivi de la forme de base.', ARRAY['conjugation', 'future'], 'active'),
('multiple_choice', 'Modal verb: ''You ___ access this file.''', NULL, 'A', 11, NULL, 'Can exprime la possibilité ou la permission.', ARRAY['modals'], 'active'),
('transformation', 'Transform into negative: ''The system can process the request.''', NULL, 'A', 11, NULL, 'Can not ou cannot est la négation de can.', ARRAY['modals', 'negation'], 'active'),
('fill_blank', 'Complete: ''They have ___ the security patch.''', NULL, 'A', 7, NULL, 'Applied est le past participle de apply.', ARRAY['conjugation', 'irregular'], 'active'),
('multiple_choice', 'Present Continuous: ''The team ___ testing the application.''', NULL, 'A', 2, NULL, 'Is testing pour la troisième personne du singulier.', ARRAY['conjugation', 'continuous'], 'active'),

-- Niveau 2 — Questions et négation
('multiple_choice', 'Choose the correct question: ''___ you like coffee?''', 'General', 'A', 9, NULL, 'Do pour la première personne.', ARRAY['questions'], 'active'),
('fill_blank', 'Complete: ''She ___ not have access.''', 'IT context', 'A', 3, NULL, 'Does pour la négation troisième personne.', ARRAY['negation', 'conjugation'], 'active'),
('transformation', 'Transform to negative: ''The system can process requests.''', 'IT context', 'A', 11, NULL, 'Cannot ou can''t.', ARRAY['negation', 'modals'], 'active'),
('error_correction', 'Correct: ''He don''t knows the password.''', 'IT context', 'A', 3, NULL, 'Doesn''t know.', ARRAY['conjugation', 'negation'], 'active'),
('multiple_choice', 'Which is correct? ''___ you finished the task?''', 'IT context', 'A', 9, NULL, 'Have pour present perfect.', ARRAY['questions', 'perfect'], 'active'),
('scenario', 'You need information about a server. Ask your colleague.', 'Professional context', 'B', 21, NULL, 'Could you tell me...?', ARRAY['conversation', 'professional'], 'active'),
('fill_blank', 'Complete: ''I have ___ the report.''', 'Professional context', 'A', 7, NULL, 'Written est le past participle de write.', ARRAY['conjugation', 'irregular'], 'active'),
('multiple_choice', 'Choose the correct form: ''They ___ working on the project.''', 'IT context', 'A', 2, NULL, 'Are pour they.', ARRAY['conjugation', 'continuous'], 'active'),
('error_correction', 'Correct: ''The data is been analyzed.''', 'IT context', 'A', 2, NULL, 'Is being analyzed (voix passive).', ARRAY['grammar', 'passive'], 'active'),
('multiple_choice', 'Which is a correct imperative?', 'General', 'A', 3, NULL, 'Check the logs.', ARRAY['imperative'], 'active');

-- ============================================================================
-- FIN DU CONTENU ENRICHI
-- ============================================================================
