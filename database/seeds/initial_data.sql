-- ============================================================================
-- Summit English Institute — Données initiales (seeds)
-- Version: 1.0
-- ============================================================================

-- ============================================================================
-- 1. NIVEAUX
-- ============================================================================

INSERT INTO levels (course_id, number, title, objective, passing_score, order_index, status) VALUES
(1, 1, 'English Sentence Foundations', 'Reconstruire les mécanismes fondamentaux permettant de produire rapidement une phrase anglaise correcte.', 75, 1, 'active'),
(1, 2, 'Functional Verb System', 'Reconstruire les automatismes de conjugaison indispensables pour communiquer.', 75, 2, 'active'),
(1, 3, 'Functional Grammar', 'Maîtriser les structures grammaticales nécessaires à la production de phrases correctes.', 75, 3, 'active'),
(1, 4, 'Active Conversation', 'Transformer les connaissances grammaticales en production conversationnelle active.', 75, 4, 'active'),
(1, 5, 'Everyday & Professional English', 'Maîtriser les expressions courantes et professionnelles utilisées au quotidien.', 75, 5, 'active'),
(1, 6, 'IT English', 'Acquérir le vocabulaire et les expressions nécessaires pour comprendre et utiliser l''anglais informatique.', 75, 6, 'active'),
(1, 7, 'Cybersecurity English', 'Comprendre le vocabulaire et les formulations rencontrés dans la cybersécurité.', 75, 7, 'active'),
(1, 8, 'University & Professional Integration', 'Se préparer à fonctionner dans un environnement universitaire et professionnel anglophone.', 75, 8, 'active');

-- ============================================================================
-- 2. MODULES
-- ============================================================================

-- Niveau 1
INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(1, 'Sentence Structure', 'Comprendre et construire la structure de base d''une phrase anglaise.', 1, 'active'),
(1, 'Basic Questions & Negation', 'Construire des questions et des phrases négatives simples.', 2, 'active');

-- Niveau 2
INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(2, 'Present System', 'Maîtriser le Present Simple et le Present Continuous.', 1, 'active'),
(2, 'Past System', 'Maîtriser le Past Simple et le Past Continuous.', 2, 'active'),
(2, 'Future & Modals', 'Maîtriser le futur et les verbes modaux.', 3, 'active');

-- Niveau 3
INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(3, 'Grammar Core', 'Articles, prépositions, comparatifs, quantificateurs.', 1, 'active');

-- Niveau 4
INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(4, 'Conversation Patterns', 'Apprendre les patrons de conversation fonctionnels.', 1, 'active');

-- Niveau 6
INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(6, 'IT Foundations', 'Vocabulaire informatique fondamental.', 1, 'active'),
(6, 'Systems & Networking', 'Vocabulaire des systèmes et réseaux.', 2, 'active');

-- Niveau 7
INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(7, 'Security Foundations', 'Concepts fondamentaux de la cybersécurité.', 1, 'active'),
(7, 'Security Operations', 'Vocabulaire des opérations de sécurité.', 2, 'active');

-- ============================================================================
-- 3. LEÇONS (exemples pour le MVP)
-- ============================================================================

-- Module 1.1 - Sentence Structure
INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
(1, 'Basic Sentence Structure', 'Comprendre la structure de base d''une phrase anglaise.', 'Une phrase anglaise simple suit généralement la structure : Sujet + Verbe + Complément.',
'[
  {"sentence": "I need to check the server.", "meaning": "Je dois vérifier le serveur.", "itContext": "The admin checks the server status every morning."},
  {"sentence": "The application is running.", "meaning": "L''application fonctionne.", "itContext": "Check if the application is running on the server."}
]',
'[
  {"word": "server", "definition": "Serveur informatique", "translation": "serveur", "example": "The server is down.", "itExample": "Restart the server.", "domain": "it", "level": "A"},
  {"word": "application", "definition": "Application logicielle", "translation": "application", "example": "The application needs an update.", "itExample": "Deploy the application.", "domain": "it", "level": "A"}
]',
'[
  {"expression": "I need to check...", "meaning": "Je dois vérifier...", "example": "I need to check the logs.", "classification": "professional", "difficulty": "A"}
]',
'Always verify the server status before making changes.',
'[
  {"type": "multiple_choice", "question": "Choose the correct sentence: ''The application ___ running.''", "options": ["not is", "is not", "no is", "is no"], "correctAnswer": "is not", "explanation": "La négation avec be utilise is not ou isn''t."}
]',
'Comprendre la structure Sujet + Verbe + Complément est essentiel pour construire des phrases correctes en anglais.',
1, 'active');

-- ============================================================================
-- 4. QUESTIONS
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
('multiple_choice', 'Choose the correct form: "I ___ to check the server."', null, 'A', 1, 1, '"I" prend la forme de base du verbe. "Need" est correct à la première personne.', ARRAY['sentence', 'structure'], 'active'),
('multiple_choice', 'What is the past tense of "go"?', null, 'A', 7, NULL, 'Le past simple de "go" est "went".', ARRAY['conjugation', 'irregular'], 'active'),
('fill_blank', 'Complete: "We need to ___ the new version tonight."', null, 'A', 10, NULL, '"Deploy" signifie mettre en production.', ARRAY['it', 'vocabulary'], 'active'),
('multiple_choice', 'Which word means "vulnérabilité" in IT security?', null, 'A', 34, NULL, '"Vulnerability" signifie vulnérabilité.', ARRAY['cybersecurity', 'vocabulary'], 'active'),
('multiple_choice', 'Choose the correct preposition: "The server is ___ the network."', null, 'A', 13, NULL, '"On the network" est l''expression correcte.', ARRAY['prepositions'], 'active'),
('error_correction', 'Correct the error: "She don''t have access to the database."', null, 'A', 1, NULL, 'À la troisième personne du singulier, "do" devient "does".', ARRAY['conjugation', 'present'], 'active'),
('transformation', 'Transform into a question: "You can access the server."', null, 'A', 9, NULL, 'Avec "can", on déplace l''auxiliaire avant le sujet.', ARRAY['questions', 'modals'], 'active'),
('scenario', 'You need to report an incident. Write a short message to your team.', null, 'B', 22, NULL, 'Un message professionnel est direct, clair et inclut l''action requise.', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'Choose the correct sentence: "The application ___ working."', null, 'A', 10, NULL, 'La négation avec "be" utilise "is not" ou "isn''t".', ARRAY['it', 'vocabulary'], 'active'),
('fill_blank', 'Complete: "The firewall ___ all unauthorized traffic."', null, 'A', 36, NULL, '"Block" signifie bloquer. Au Present Simple, troisième personne: "blocks".', ARRAY['cybersecurity', 'actions'], 'active');

-- ============================================================================
-- 5. RÉPONSES POUR LES QCM
-- ============================================================================

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(1, 'need', true, 1),
(1, 'needs', false, 2),
(1, 'needing', false, 3),
(1, 'needed', false, 4),
(2, 'goed', false, 1),
(2, 'went', true, 2),
(2, 'gone', false, 3),
(2, 'going', false, 4),
(4, 'vulnerability', true, 1),
(4, 'threat', false, 2),
(4, 'attack', false, 3),
(4, 'risk', false, 4),
(5, 'in', false, 1),
(5, 'on', true, 2),
(5, 'at', false, 3),
(5, 'to', false, 4),
(9, 'not is', false, 1),
(9, 'is not', true, 2),
(9, 'no is', false, 3),
(9, 'is no', false, 4);

-- ============================================================================
-- FIN DES SEEDS
-- ============================================================================
