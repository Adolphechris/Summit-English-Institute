-- ============================================================================
-- BANQUE DE QUESTIONS MASSIVE — 200+ questions
-- À exécuter APRES enriched_content.sql
-- ============================================================================

-- ============================================================================
-- NIVEAU 1 — Sentence Foundations (30 questions)
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
-- Structure de phrase
('multiple_choice', 'Choose the correct sentence structure: "I ___ to access the server."', 'IT context', 'A', 1, NULL, 'Need to est suivi de la forme de base.', ARRAY['sentence', 'structure'], 'active'),
('multiple_choice', 'Which sentence is correct?', 'IT context', 'A', 1, NULL, 'Sujet + verbe + complément.', ARRAY['sentence'], 'active'),
('fill_blank', 'Complete: "The system ___ running smoothly."', 'IT context', 'A', 1, NULL, 'Is pour la troisième personne.', ARRAY['conjugation', 'present'], 'active'),
('transformation', 'Transform to negative: "The server is connected."', 'IT context', 'A', 3, NULL, 'Is not ou isn''t.', ARRAY['negation'], 'active'),
('transformation', 'Transform to question: "You can access the database."', 'IT context', 'A', 9, NULL, 'Can you...?', ARRAY['questions', 'modals'], 'active'),
('error_correction', 'Correct: "She don''t have the credentials."', 'IT context', 'A', 3, NULL, 'Doesn''t pour la troisième personne.', ARRAY['conjugation', 'negation'], 'active'),
('scenario', 'You need to ask for help. Write a message to your colleague.', 'Professional context', 'B', 21, NULL, 'Soyez poli et clair.', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'Choose the correct preposition: "The file is located ___ the server."', 'IT context', 'A', 13, NULL, 'On the server.', ARRAY['prepositions'], 'active'),
('fill_blank', 'Complete: "___ need to check the configuration."', 'IT context', 'A', 2, NULL, 'I est le pronom sujet.', ARRAY['pronouns'], 'active'),
('multiple_choice', 'Which is a correct question?', 'IT context', 'A', 9, NULL, 'Can you help me?', ARRAY['questions'], 'active'),

-- Pronoms et auxiliaires
('multiple_choice', 'Choose the correct pronoun: "___ am the administrator."', 'IT context', 'A', 2, NULL, 'I am est la forme correcte.', ARRAY['pronouns', 'auxiliaries'], 'active'),
('error_correction', 'Correct: "They is updating the system."', 'IT context', 'A', 2, NULL, 'They are.', ARRAY['conjugation', 'present'], 'active'),
('fill_blank', 'Complete: "We ___ completed the update."', 'IT context', 'A', 2, NULL, 'Have pour present perfect.', ARRAY['conjugation', 'perfect'], 'active'),
('multiple_choice', 'Which auxiliary is used for questions in Present Simple?', 'Grammar', 'A', 3, NULL, 'Do/Does pour les affirmations/négations/questions.', ARRAY['auxiliaries', 'questions'], 'active'),
('transformation', 'Transform to question: "She works on the project."', 'IT context', 'A', 9, NULL, 'Does she work...?', ARRAY['questions', 'conjugation'], 'active'),
('scenario', 'You cannot access a file. Explain to a colleague.', 'Professional context', 'B', 21, NULL, 'I can''t access...', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'Choose the correct negative: "I ___ understand the error."', 'IT context', 'A', 3, NULL, 'Don''t understand.', ARRAY['negation'], 'active'),
('fill_blank', 'Complete: "He ___ working on the server."', 'IT context', 'A', 2, NULL, 'Is pour present continuous.', ARRAY['conjugation', 'continuous'], 'active'),
('error_correction', 'Correct: "The application crashes frequent."', 'IT context', 'A', 13, NULL, 'Frequently est l''adverbe.', ARRAY['grammar', 'adverbs'], 'active'),
('multiple_choice', 'Which word is an auxiliary?', 'Grammar', 'A', 2, NULL, 'Do est un auxiliaire.', ARRAY['auxiliaries'], 'active'),

-- Questions et négation
('multiple_choice', 'Choose the correct question: "___ you like coffee?"', 'General', 'A', 9, NULL, 'Do pour la première personne.', ARRAY['questions'], 'active'),
('fill_blank', 'Complete: "She ___ not have access."', 'IT context', 'A', 3, NULL, 'Does pour la négation troisième personne.', ARRAY['negation', 'conjugation'], 'active'),
('transformation', 'Transform to negative: "The system can process requests."', 'IT context', 'A', 11, NULL, 'Cannot ou can''t.', ARRAY['negation', 'modals'], 'active'),
('error_correction', 'Correct: "He don''t knows the password."', 'IT context', 'A', 3, NULL, 'Doesn''t know.', ARRAY['conjugation', 'negation'], 'active'),
('multiple_choice', 'Which is correct? "___ you finished the task?"', 'IT context', 'A', 9, NULL, 'Have pour present perfect.', ARRAY['questions', 'perfect'], 'active'),
('scenario', 'You need information about a server. Ask your colleague.', 'Professional context', 'B', 21, NULL, 'Could you tell me...?', ARRAY['conversation', 'professional'], 'active'),
('fill_blank', 'Complete: "I have ___ the report."', 'Professional context', 'A', 7, NULL, 'Written est le past participle de write.', ARRAY['conjugation', 'irregular'], 'active'),
('multiple_choice', 'Choose the correct form: "They ___ working on the project."', 'IT context', 'A', 2, NULL, 'Are pour they.', ARRAY['conjugation', 'continuous'], 'active'),
('error_correction', 'Correct: "The data is been analyzed."', 'IT context', 'A', 2, NULL, 'Is being analyzed (voix passive).', ARRAY['grammar', 'passive'], 'active'),
('multiple_choice', 'Which is a correct imperative?', 'General', 'A', 3, NULL, 'Check the logs.', ARRAY['imperative'], 'active');

-- ============================================================================
-- NIVEAU 2 — Functional Verb System (30 questions)
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
-- Present Simple
('multiple_choice', 'Present Simple: "The server ___ every morning."', 'IT context', 'A', 4, NULL, 'Restarts pour la troisième personne.', ARRAY['conjugation', 'present'], 'active'),
('fill_blank', 'Complete: "I usually ___ the logs."', 'IT context', 'A', 4, NULL, 'Check au present simple.', ARRAY['conjugation', 'present'], 'active'),
('error_correction', 'Correct: "He work on the network."', 'IT context', 'A', 4, NULL, 'Works pour la troisième personne.', ARRAY['conjugation', 'present'], 'active'),
('transformation', 'Transform to negative: "The system runs correctly."', 'IT context', 'A', 3, NULL, 'Does not run.', ARRAY['negation', 'present'], 'active'),
('multiple_choice', 'Choose the correct form: "___ the application work?"', 'IT context', 'A', 9, NULL, 'Does pour la troisième personne.', ARRAY['questions', 'present'], 'active'),
('scenario', 'Write a sentence: describe your daily routine as a sysadmin.', 'Professional context', 'B', 4, NULL, 'I monitor... I check...', ARRAY['conjugation', 'present'], 'active'),

-- Past Simple
('multiple_choice', 'Past tense of "write":', 'General', 'A', 7, NULL, 'Wrote.', ARRAY['conjugation', 'past', 'irregular'], 'active'),
('fill_blank', 'Complete: "Yesterday, I ___ a new server."', 'IT context', 'A', 7, NULL, 'Installed.', ARRAY['conjugation', 'past'], 'active'),
('error_correction', 'Correct: "She goed to the data center."', 'IT context', 'A', 7, NULL, 'Went est le past de go.', ARRAY['conjugation', 'past', 'irregular'], 'active'),
('transformation', 'Transform to question: "They deployed the application."', 'IT context', 'A', 9, NULL, 'Did they deploy...?', ARRAY['questions', 'past'], 'active'),
('multiple_choice', 'Which is the past tense? "The system ___ down yesterday."', 'IT context', 'A', 7, NULL, 'Went down.', ARRAY['conjugation', 'past'], 'active'),
('scenario', 'Describe what happened during the outage last week.', 'Professional context', 'B', 7, NULL, 'The server crashed...', ARRAY['conjugation', 'past'], 'active'),

-- Future
('multiple_choice', 'Future with will: "I ___ deploy the update tomorrow."', 'IT context', 'A', 8, NULL, 'Will deploy.', ARRAY['conjugation', 'future'], 'active'),
('fill_blank', 'Complete: "We ___ migrate to the cloud next month."', 'IT context', 'A', 8, NULL, 'Are going to ou will.', ARRAY['conjugation', 'future'], 'active'),
('transformation', 'Transform to negative: "The team will test the system."', 'IT context', 'A', 3, NULL, 'Will not test.', ARRAY['negation', 'future'], 'active'),
('multiple_choice', 'Which expresses intention?', 'General', 'A', 8, NULL, 'I am going to...', ARRAY['conjugation', 'future'], 'active'),
('scenario', 'You plan to update the system. Explain your plan.', 'Professional context', 'B', 8, NULL, 'I will... I am going to...', ARRAY['conjugation', 'future'], 'active'),

-- Modals
('multiple_choice', 'Modal verb: "You ___ access this file."', 'IT context', 'A', 11, NULL, 'Can pour permission.', ARRAY['modals'], 'active'),
('fill_blank', 'Complete: "You ___ submit the request."', 'Professional context', 'A', 11, NULL, 'Must pour obligation.', ARRAY['modals'], 'active'),
('error_correction', 'Correct: "You should to check the logs."', 'IT context', 'A', 11, NULL, 'Should check (pas de to).', ARRAY['modals'], 'active'),
('transformation', 'Transform to negative: "The system can process the request."', 'IT context', 'A', 11, NULL, 'Cannot ou can''t.', ARRAY['negation', 'modals'], 'active'),
('multiple_choice', 'Which modal expresses possibility?', 'General', 'A', 11, NULL, 'May ou might.', ARRAY['modals'], 'active'),
('scenario', 'You need to ask permission to restart the server. Write your request.', 'Professional context', 'B', 11, NULL, 'Could I restart...?', ARRAY['modals', 'professional'], 'active'),

-- Irregular verbs
('multiple_choice', 'Past tense of "go":', 'General', 'A', 7, NULL, 'Went.', ARRAY['conjugation', 'past', 'irregular'], 'active'),
('fill_blank', 'Complete: "I have ___ the report."', 'Professional context', 'A', 7, NULL, 'Written.', ARRAY['conjugation', 'perfect', 'irregular'], 'active'),
('multiple_choice', 'Past participle of "see":', 'General', 'A', 7, NULL, 'Seen.', ARRAY['conjugation', 'irregular'], 'active'),
('error_correction', 'Correct: "She have went to the server room."', 'IT context', 'A', 7, NULL, 'Has gone.', ARRAY['conjugation', 'perfect', 'irregular'], 'active'),
('transformation', 'Transform: "I began the project." → Present Perfect', 'Professional context', 'B', 7, NULL, 'I have begun...', ARRAY['conjugation', 'perfect'], 'active');

-- ============================================================================
-- NIVEAU 3 — Functional Grammar (30 questions)
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
-- Articles
('multiple_choice', 'Choose the correct article: "___ application is running."', 'IT context', 'A', 18, NULL, 'The pour un article défini.', ARRAY['grammar', 'articles'], 'active'),
('fill_blank', 'Complete: "I installed ___ new version."', 'IT context', 'A', 18, NULL, 'A pour un indéfini.', ARRAY['grammar', 'articles'], 'active'),
('multiple_choice', 'Which is correct? "___ information is important."', 'General', 'A', 18, NULL, 'Information est généralement sans article.', ARRAY['grammar', 'articles'], 'active'),
('error_correction', 'Correct: "The server is a down."', 'IT context', 'A', 18, NULL, 'Pas d''article avant down.', ARRAY['grammar', 'articles'], 'active'),

-- Prépositions
('multiple_choice', 'Correct preposition: "The server is located ___ the data center."', 'IT context', 'A', 13, NULL, 'In the data center.', ARRAY['prepositions'], 'active'),
('fill_blank', 'Complete: "The file is stored ___ the cloud."', 'IT context', 'A', 13, NULL, 'In the cloud.', ARRAY['prepositions'], 'active'),
('multiple_choice', 'Choose: "The user connects ___ the network."', 'IT context', 'A', 13, NULL, 'To the network.', ARRAY['prepositions'], 'active'),
('error_correction', 'Correct: "The data is stored on the cloud."', 'IT context', 'A', 13, NULL, 'In the cloud (ou on the cloud selon contexte).', ARRAY['prepositions'], 'active'),

-- Comparatifs
('multiple_choice', 'Comparative: "This server is ___ than the previous one."', 'IT context', 'B', 15, NULL, 'Faster.', ARRAY['grammar', 'comparatives'], 'active'),
('fill_blank', 'Complete: "This version is ___ stable."', 'IT context', 'B', 15, NULL, 'More stable (adjectif long).', ARRAY['grammar', 'comparatives'], 'active'),
('multiple_choice', 'Superlative: "This is ___ server in the cluster."', 'IT context', 'B', 15, NULL, 'The fastest.', ARRAY['grammar', 'superlatives'], 'active'),
('error_correction', 'Correct: "This system is more faster."', 'IT context', 'B', 15, NULL, 'Faster (pas more).', ARRAY['grammar', 'comparatives'], 'active'),

-- Quantificateurs
('multiple_choice', 'Choose: "There are ___ files in the directory."', 'IT context', 'A', 14, NULL, 'Many pour dénombrables.', ARRAY['grammar', 'quantifiers'], 'active'),
('fill_blank', 'Complete: "I have ___ information about the error."', 'IT context', 'A', 14, NULL, 'Much pour indénombrables.', ARRAY['grammar', 'quantifiers'], 'active'),
('multiple_choice', 'Which is correct? "___ users have reported the issue."', 'IT context', 'A', 14, NULL, 'Several users.', ARRAY['grammar', 'quantifiers'], 'active'),

-- Connecteurs
('multiple_choice', 'Choose the connector: "The system is slow, ___ it is overloaded."', 'IT context', 'B', 13, NULL, 'Because.', ARRAY['grammar', 'connectors'], 'active'),
('fill_blank', 'Complete: "I checked the logs; ___, I found nothing unusual."', 'IT context', 'B', 13, NULL, 'However.', ARRAY['grammar', 'connectors'], 'active'),
('multiple_choice', 'Which connector shows contrast?', 'General', 'B', 13, NULL, 'Although.', ARRAY['grammar', 'connectors'], 'active'),

-- Conditionnels
('multiple_choice', 'Conditional: "If the server fails, we ___ use the backup."', 'IT context', 'B', 16, NULL, 'Will use (first conditional).', ARRAY['grammar', 'conditionals'], 'active'),
('fill_blank', 'Complete: "If I had known, I ___ updated sooner."', 'Professional context', 'B', 16, NULL, 'Would have updated (third conditional).', ARRAY['grammar', 'conditionals'], 'active'),
('multiple_choice', 'Which is a second conditional?', 'General', 'B', 16, NULL, 'If I were...', ARRAY['grammar', 'conditionals'], 'active'),

-- Voix passive
('multiple_choice', 'Passive voice: "The application ___ by the team."', 'IT context', 'B', 17, NULL, 'Is developed.', ARRAY['grammar', 'passive'], 'active'),
('fill_blank', 'Complete: "The report ___ yesterday."', 'Professional context', 'B', 17, NULL, 'Was written.', ARRAY['grammar', 'passive'], 'active'),
('transformation', 'Transform to passive: "The team will deploy the update."', 'IT context', 'B', 17, NULL, 'The update will be deployed.', ARRAY['grammar', 'passive'], 'active');

-- ============================================================================
-- NIVEAU 4 — Active Conversation (25 questions)
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
('multiple_choice', 'Choose the best response: "Can you help me?" →', 'Professional context', 'B', 21, NULL, 'Yes, of course. What do you need?', ARRAY['conversation'], 'active'),
('scenario', 'You found a security issue. Inform your team immediately.', 'Cybersecurity context', 'B', 22, NULL, 'Be direct and clear.', ARRAY['conversation', 'cybersecurity'], 'active'),
('multiple_choice', 'How do you ask for clarification?', 'Professional context', 'B', 21, NULL, 'Could you clarify...?', ARRAY['conversation'], 'active'),
('scenario', 'Your colleague asks about the project status. Give a brief update.', 'Professional context', 'B', 22, NULL, 'We are currently...', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'Choose the best way to disagree politely:', 'Professional context', 'B', 21, NULL, 'I see your point, however...', ARRAY['conversation', 'professional'], 'active'),
('scenario', 'You need to report a delay. Explain the situation to your manager.', 'Professional context', 'B', 22, NULL, 'We are experiencing...', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'How do you confirm understanding?', 'Professional context', 'B', 21, NULL, 'If I understand correctly...', ARRAY['conversation'], 'active'),
('scenario', 'A client reports a problem. Acknowledge and promise action.', 'Professional context', 'B', 22, NULL, 'I understand the issue...', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'Choose the best opening for a meeting:', 'Professional context', 'B', 21, NULL, 'Good morning everyone. Let''s start...', ARRAY['conversation', 'meetings'], 'active'),
('scenario', 'You need to ask for more time. Explain professionally.', 'Professional context', 'B', 22, NULL, 'I would need more time...', ARRAY['conversation', 'professional'], 'active'),

-- Plus de questions conversation
('multiple_choice', 'How do you suggest an idea?', 'Professional context', 'B', 21, NULL, 'Have you considered...?', ARRAY['conversation'], 'active'),
('scenario', 'You made a mistake. Inform your team and propose a solution.', 'Professional context', 'B', 22, NULL, 'I made an error...', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'Choose the best way to end a conversation:', 'Professional context', 'B', 21, NULL, 'Thank you for your time.', ARRAY['conversation'], 'active'),
('scenario', 'You need to escalate an issue. Explain why to your supervisor.', 'Professional context', 'B', 22, NULL, 'I need to escalate...', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'How do you ask for someone''s opinion?', 'Professional context', 'B', 21, NULL, 'What do you think about...?', ARRAY['conversation'], 'active'),

-- Production active
('transformation', 'Transform to a polite request: "Give me the report."', 'Professional context', 'B', 22, NULL, 'Could you give me...?', ARRAY['conversation', 'professional'], 'active'),
('scenario', 'Write an email: notify the team about a maintenance window.', 'Professional context', 'B', 22, NULL, 'Dear team...', ARRAY['conversation', 'email'], 'active'),
('transformation', 'Rewrite professionally: "I don''t know."', 'Professional context', 'B', 22, NULL, 'I''m not sure, let me check.', ARRAY['conversation', 'professional'], 'active'),
('scenario', 'You are in a meeting. Ask a question about the presentation.', 'Professional context', 'B', 22, NULL, 'Could you clarify...?', ARRAY['conversation', 'meetings'], 'active'),
('multiple_choice', 'Choose the best response to "Thank you":', 'Professional context', 'B', 21, NULL, 'You''re welcome.', ARRAY['conversation'], 'active'),

-- Plus
('scenario', 'You need to introduce yourself in a team meeting.', 'Professional context', 'B', 22, NULL, 'Hi, I''m... I work on...', ARRAY['conversation', 'professional'], 'active'),
('transformation', 'Make this more professional: "Fix the bug now."', 'IT context', 'B', 22, NULL, 'Please fix the bug as soon as possible.', ARRAY['conversation', 'professional'], 'active'),
('scenario', 'A stakeholder asks for a project update. Respond clearly.', 'Professional context', 'B', 22, NULL, 'The project is...', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'How do you express agreement?', 'Professional context', 'B', 21, NULL, 'I agree with that.', ARRAY['conversation'], 'active'),
('scenario', 'You disagree with a proposal. Express your view professionally.', 'Professional context', 'B', 22, NULL, 'I see it differently...', ARRAY['conversation', 'professional'], 'active');

-- ============================================================================
-- NIVEAU 6 — IT English (40 questions)
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
-- Hardware
('multiple_choice', 'What does CPU stand for?', 'IT context', 'A', 26, NULL, 'Central Processing Unit.', ARRAY['it', 'hardware'], 'active'),
('fill_blank', 'Complete: "The ___ stores data permanently."', 'IT context', 'A', 26, NULL, 'Hard drive ou SSD.', ARRAY['it', 'hardware'], 'active'),
('multiple_choice', 'Which is a peripheral device?', 'IT context', 'A', 26, NULL, 'Keyboard, mouse, monitor.', ARRAY['it', 'hardware'], 'active'),
('error_correction', 'Correct: "The RAM is a permanent storage."', 'IT context', 'A', 26, NULL, 'RAM is volatile (temporary).', ARRAY['it', 'hardware'], 'active'),

-- Software
('multiple_choice', 'What is an application?', 'IT context', 'A', 10, NULL, 'A software program.', ARRAY['it', 'software'], 'active'),
('fill_blank', 'Complete: "The ___ needs to be updated."', 'IT context', 'A', 10, NULL, 'Software ou application.', ARRAY['it', 'software'], 'active'),
('multiple_choice', 'Which is an operating system?', 'IT context', 'A', 27, NULL, 'Windows, Linux, macOS.', ARRAY['it', 'os'], 'active'),
('error_correction', 'Correct: "The application crasheds frequently."', 'IT context', 'A', 10, NULL, 'Crashes (pas crasheds).', ARRAY['it', 'software'], 'active'),

-- OS
('multiple_choice', 'What is a process?', 'IT context', 'A', 27, NULL, 'A running program.', ARRAY['it', 'os'], 'active'),
('fill_blank', 'Complete: "The ___ shows running processes."', 'IT context', 'A', 27, NULL, 'Task Manager.', ARRAY['it', 'os'], 'active'),
('multiple_choice', 'Which command lists files?', 'IT context', 'A', 27, NULL, 'ls ou dir.', ARRAY['it', 'os', 'commands'], 'active'),

-- Files
('multiple_choice', 'What is a directory?', 'IT context', 'A', 10, NULL, 'A folder.', ARRAY['it', 'files'], 'active'),
('fill_blank', 'Complete: "The file path is ___ the root directory."', 'IT context', 'A', 13, NULL, 'Under ou in.', ARRAY['it', 'files', 'prepositions'], 'active'),
('multiple_choice', 'Which is a file extension?', 'IT context', 'A', 10, NULL, '.exe, .txt, .pdf.', ARRAY['it', 'files'], 'active'),

-- Networking
('multiple_choice', 'What does IP stand for?', 'IT context', 'A', 26, NULL, 'Internet Protocol.', ARRAY['it', 'networking'], 'active'),
('fill_blank', 'Complete: "The ___ connects different networks."', 'IT context', 'A', 26, NULL, 'Router.', ARRAY['it', 'networking'], 'active'),
('multiple_choice', 'Which is a network device?', 'IT context', 'A', 26, NULL, 'Switch, router, firewall.', ARRAY['it', 'networking'], 'active'),
('error_correction', 'Correct: "The firewall blocks all unauthorized access."', 'IT context', 'A', 26, NULL, 'Cette phrase est correcte.', ARRAY['it', 'networking'], 'active'),
('scenario', 'You need to check network connectivity. Write a command.', 'IT context', 'B', 26, NULL, 'Ping, traceroute...', ARRAY['it', 'networking'], 'active'),

-- Databases
('multiple_choice', 'What is a database?', 'IT context', 'A', 28, NULL, 'Organized data storage.', ARRAY['it', 'databases'], 'active'),
('fill_blank', 'Complete: "Run a ___ to retrieve the data."', 'IT context', 'A', 28, NULL, 'Query.', ARRAY['it', 'databases'], 'active'),
('multiple_choice', 'Which is a database term?', 'IT context', 'A', 28, NULL, 'Table, row, column.', ARRAY['it', 'databases'], 'active'),
('error_correction', 'Correct: "The database has been backed up yesterday."', 'IT context', 'B', 28, NULL, 'Was backed up (passif, passé).', ARRAY['it', 'databases', 'passive'], 'active'),

-- Cloud
('multiple_choice', 'What is cloud computing?', 'IT context', 'A', 29, NULL, 'Remote computing resources.', ARRAY['it', 'cloud'], 'active'),
('fill_blank', 'Complete: "The application is deployed in the ___."', 'IT context', 'A', 29, NULL, 'Cloud.', ARRAY['it', 'cloud'], 'active'),
('multiple_choice', 'Which is a cloud benefit?', 'IT context', 'B', 29, NULL, 'Scalability.', ARRAY['it', 'cloud'], 'active'),

-- Development
('multiple_choice', 'What is source code?', 'IT context', 'A', 30, NULL, 'Human-readable instructions.', ARRAY['it', 'development'], 'active'),
('fill_blank', 'Complete: "The developer will ___ the code."', 'IT context', 'A', 30, NULL, 'Commit.', ARRAY['it', 'development'], 'active'),
('multiple_choice', 'What is a repository?', 'IT context', 'A', 30, NULL, 'A storage location for code.', ARRAY['it', 'development'], 'active'),
('error_correction', 'Correct: "The code need to be refactored."', 'IT context', 'A', 30, NULL, 'Needs (code est singulier).', ARRAY['it', 'development', 'conjugation'], 'active'),
('scenario', 'You need to deploy a fix. Explain the process.', 'IT context', 'B', 30, NULL, 'First, I commit...', ARRAY['it', 'development'], 'active');

-- ============================================================================
-- NIVEAU 7 — Cybersecurity (30 questions)
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
-- Fundamentals
('multiple_choice', 'What is a vulnerability?', 'Cybersecurity context', 'A', 34, NULL, 'A weakness that can be exploited.', ARRAY['cybersecurity', 'fundamentals'], 'active'),
('fill_blank', 'Complete: "A ___ is a potential danger to the system."', 'Cybersecurity context', 'A', 34, NULL, 'Threat.', ARRAY['cybersecurity', 'fundamentals'], 'active'),
('multiple_choice', 'What is a threat?', 'Cybersecurity context', 'A', 34, NULL, 'A potential danger.', ARRAY['cybersecurity', 'fundamentals'], 'active'),
('error_correction', 'Correct: "The risk is the same as the threat."', 'Cybersecurity context', 'B', 34, NULL, 'Risk = probabilité x impact.', ARRAY['cybersecurity', 'fundamentals'], 'active'),

-- Malware
('multiple_choice', 'What is phishing?', 'Cybersecurity context', 'A', 35, NULL, 'Email fraud to steal credentials.', ARRAY['cybersecurity', 'malware'], 'active'),
('fill_blank', 'Complete: "___ is malware that encrypts files."', 'Cybersecurity context', 'A', 35, NULL, 'Ransomware.', ARRAY['cybersecurity', 'malware'], 'active'),
('multiple_choice', 'Which is NOT malware?', 'Cybersecurity context', 'A', 35, NULL, 'Firewall.', ARRAY['cybersecurity', 'malware'], 'active'),
('scenario', 'A user received a suspicious email. Advise them.', 'Cybersecurity context', 'B', 35, NULL, 'Do not click...', ARRAY['cybersecurity', 'malware'], 'active'),

-- Operations
('multiple_choice', 'What is an incident?', 'Cybersecurity context', 'A', 32, NULL, 'A security event that needs response.', ARRAY['cybersecurity', 'operations'], 'active'),
('fill_blank', 'Complete: "The team must ___ the incident immediately."', 'Cybersecurity context', 'A', 32, NULL, 'Investigate.', ARRAY['cybersecurity', 'operations'], 'active'),
('multiple_choice', 'What is logging?', 'Cybersecurity context', 'A', 32, NULL, 'Recording system events.', ARRAY['cybersecurity', 'operations'], 'active'),
('error_correction', 'Correct: "The alert was triggered by a false positive."', 'Cybersecurity context', 'B', 32, NULL, 'Cette phrase est correcte.', ARRAY['cybersecurity', 'operations'], 'active'),

-- Actions
('multiple_choice', 'Which verb means "to detect"?', 'Cybersecurity context', 'A', 36, NULL, 'Detect.', ARRAY['cybersecurity', 'actions'], 'active'),
('fill_blank', 'Complete: "The system can ___ suspicious activity."', 'Cybersecurity context', 'A', 36, NULL, 'Detect.', ARRAY['cybersecurity', 'actions'], 'active'),
('multiple_choice', 'What does "mitigate" mean?', 'Cybersecurity context', 'B', 36, NULL, 'Reduce the impact.', ARRAY['cybersecurity', 'actions'], 'active'),
('transformation', 'Transform to passive: "The admin monitors the network."', 'Cybersecurity context', 'B', 36, NULL, 'The network is monitored...', ARRAY['cybersecurity', 'actions', 'passive'], 'active'),
('scenario', 'You detected malware. Write an incident report.', 'Cybersecurity context', 'B', 36, NULL, 'Include: detection time, affected systems.', ARRAY['cybersecurity', 'operations'], 'active'),

-- Identity and Access
('multiple_choice', 'What is authentication?', 'Cybersecurity context', 'A', 33, NULL, 'Verifying identity.', ARRAY['cybersecurity', 'identity'], 'active'),
('fill_blank', 'Complete: "___ ensures that users have the right permissions."', 'Cybersecurity context', 'A', 33, NULL, 'Authorization.', ARRAY['cybersecurity', 'identity'], 'active'),
('multiple_choice', 'What is a credential?', 'Cybersecurity context', 'A', 33, NULL, 'Username/password.', ARRAY['cybersecurity', 'identity'], 'active'),
('error_correction', 'Correct: "Access control is the same as authentication."', 'Cybersecurity context', 'B', 33, NULL, 'Access control = permissions, authentication = vérification.', ARRAY['cybersecurity', 'identity'], 'active'),

-- Plus cybersecurity
('multiple_choice', 'What is encryption?', 'Cybersecurity context', 'A', 33, NULL, 'Encoding data to protect it.', ARRAY['cybersecurity', 'identity'], 'active'),
('fill_blank', 'Complete: "Use ___ to protect sensitive data."', 'Cybersecurity context', 'A', 33, NULL, 'Encryption.', ARRAY['cybersecurity', 'identity'], 'active'),
('multiple_choice', 'What is a firewall?', 'Cybersecurity context', 'A', 26, NULL, 'Network security system.', ARRAY['cybersecurity', 'networking'], 'active'),
('scenario', 'You need to isolate a compromised system. Explain the steps.', 'Cybersecurity context', 'B', 36, NULL, 'First, disconnect...', ARRAY['cybersecurity', 'actions'], 'active'),
('multiple_choice', 'Which action prevents unauthorized access?', 'Cybersecurity context', 'A', 36, NULL, 'Block.', ARRAY['cybersecurity', 'actions'], 'active'),
('transformation', 'Transform: "We will scan for vulnerabilities." → Formal', 'Cybersecurity context', 'B', 36, NULL, 'A vulnerability scan will be performed.', ARRAY['cybersecurity', 'actions', 'passive'], 'active');

-- ============================================================================
-- NIVEAU 5, 8 ET DIVERS (35 questions)
-- ============================================================================

INSERT INTO questions (type, question_text, context, difficulty, skill_id, lesson_id, explanation, tags, status) VALUES
-- Professional English
('multiple_choice', 'Choose the best email opening:', 'Professional context', 'B', 23, NULL, 'Dear team,', ARRAY['professional', 'email'], 'active'),
('fill_blank', 'Complete: "Could you ___ me the report?"', 'Professional context', 'A', 23, NULL, 'Send.', ARRAY['professional'], 'active'),
('multiple_choice', 'How do you end a formal email?', 'Professional context', 'B', 23, NULL, 'Best regards.', ARRAY['professional', 'email'], 'active'),
('scenario', 'Write a meeting agenda for a security review.', 'Professional context', 'B', 23, NULL, '1. Review incidents...', ARRAY['professional', 'meetings'], 'active'),

-- Academic English
('multiple_choice', 'What does "analyze" mean in academic context?', 'Academic context', 'B', 39, NULL, 'Examine in detail.', ARRAY['academic'], 'active'),
('fill_blank', 'Complete: "The study ___ that security training is essential."', 'Academic context', 'B', 39, NULL, 'Shows ou demonstrates.', ARRAY['academic'], 'active'),
('multiple_choice', 'Which is an academic verb?', 'Academic context', 'B', 39, NULL, 'Evaluate.', ARRAY['academic'], 'active'),
('scenario', 'Summarize the main findings of a security audit.', 'Academic context', 'B', 39, NULL, 'The audit revealed...', ARRAY['academic'], 'active'),

-- Phrasal verbs
('multiple_choice', 'What does "set up" mean?', 'General', 'B', 40, NULL, 'Configure/establish.', ARRAY['idioms', 'phrasal_verbs'], 'active'),
('fill_blank', 'Complete: "We need to ___ the new server."', 'IT context', 'B', 40, NULL, 'Set up.', ARRAY['idioms', 'phrasal_verbs'], 'active'),
('multiple_choice', 'What does "log in" mean?', 'IT context', 'A', 40, NULL, 'Connect to a system.', ARRAY['idioms', 'phrasal_verbs'], 'active'),
('error_correction', 'Correct: "Please log into the system."', 'IT context', 'A', 40, NULL, 'Log in (verbe séparable).', ARRAY['idioms', 'phrasal_verbs'], 'active'),

-- Expressions
('multiple_choice', 'What does "as far as I know" mean?', 'General', 'B', 41, NULL, 'To the best of my knowledge.', ARRAY['idioms', 'expressions'], 'active'),
('fill_blank', 'Complete: "___ , the system is stable."', 'Professional context', 'B', 41, NULL, 'As far as I know.', ARRAY['idioms', 'expressions'], 'active'),
('multiple_choice', 'Which expression means "in addition"?', 'General', 'B', 41, NULL, 'On top of that.', ARRAY['idioms', 'expressions'], 'active'),

-- Mixed
('multiple_choice', 'Choose the correct sentence: "The ___ is responsible for security."', 'IT context', 'A', 23, NULL, 'Administrator.', ARRAY['professional'], 'active'),
('transformation', 'Transform to formal: "We need to fix this problem."', 'Professional context', 'B', 23, NULL, 'We need to address this issue.', ARRAY['professional'], 'active'),
('scenario', 'You need to decline a request. Write a polite response.', 'Professional context', 'B', 22, NULL, 'Unfortunately, I cannot...', ARRAY['conversation', 'professional'], 'active'),
('multiple_choice', 'Which is correct IT terminology?', 'IT context', 'A', 10, NULL, 'Bandwidth.', ARRAY['it', 'networking'], 'active'),
('fill_blank', 'Complete: "The ___ is the brain of the computer."', 'IT context', 'A', 26, NULL, 'CPU.', ARRAY['it', 'hardware'], 'active'),
('error_correction', 'Correct: "He don''t never checks the logs."', 'IT context', 'A', 3, NULL, 'He never checks...', ARRAY['grammar', 'negation'], 'active'),
('multiple_choice', 'What does "deploy" mean in IT?', 'IT context', 'A', 10, NULL, 'Mettre en production.', ARRAY['it', 'vocabulary'], 'active'),
('scenario', 'You are troubleshooting a network issue. Describe the first steps.', 'IT context', 'B', 26, NULL, 'First, check the cables...', ARRAY['it', 'networking'], 'active'),
('multiple_choice', 'Which is a cybersecurity term?', 'Cybersecurity context', 'A', 34, NULL, 'Malware.', ARRAY['cybersecurity', 'malware'], 'active'),
('fill_blank', 'Complete: "Enable ___ to protect data."', 'Cybersecurity context', 'A', 33, NULL, 'Encryption.', ARRAY['cybersecurity', 'identity'], 'active');

-- ============================================================================
-- FIN DE LA BANQUE MASSIVE
-- ============================================================================
