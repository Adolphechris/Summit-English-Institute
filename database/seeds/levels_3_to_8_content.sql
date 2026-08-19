-- ============================================================================
-- CONTENU PÉDAGOGIQUE COMPLET — NIVEAUX 3 À 8
-- À exécuter APRÈS enriched_content.sql
-- ============================================================================

-- ============================================================================
-- NIVEAU 3 — FUNCTIONAL GRAMMAR
-- ============================================================================

INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(3, 'Articles and Determiners', 'Maîtriser l''utilisation des articles et déterminants.', 1, 'active'),
(3, 'Prepositions and Connectors', 'Utiliser les prépositions et connecteurs essentiels.', 2, 'active'),
(3, 'Comparatives and Quantifiers', 'Former les comparatifs, superlatifs et quantificateurs.', 3, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 3 AND title = 'Articles and Determiners' LIMIT 1), 'Articles: a, an, the', 'Comprendre quand utiliser a, an, the ou aucun article.',
'Les articles indéfinis a/an sont utilisés pour des éléments non spécifiques. The est l''article défini pour des éléments spécifiques.',
'[
  {"sentence": "A server is running.", "meaning": "Un serveur fonctionne.", "itContext": "A server needs regular updates."},
  {"sentence": "The server is down.", "meaning": "Le serveur est hors service.", "itContext": "The server requires immediate attention."},
  {"sentence": "I need access to the database.", "meaning": "J''ai besoin d''accès à la base de données.", "itContext": "Access to the database is restricted."}
]',
'[
  {"word": "article", "definition": "Article grammatical", "translation": "article", "example": "Use the definite article.", "itExample": "The server is critical.", "domain": "grammar", "level": "A"},
  {"word": "definite", "definition": "Défini", "translation": "défini", "example": "The definite article.", "itExample": "The specific server.", "domain": "grammar", "level": "A"}
]',
'[
  {"expression": "in the cloud", "meaning": "dans le cloud", "example": "The data is stored in the cloud.", "classification": "it", "difficulty": "A"},
  {"expression": "on the server", "meaning": "sur le serveur", "example": "The file is on the server.", "classification": "it", "difficulty": "A"}
]',
'In technical documentation, articles are crucial: "The application runs on the server" vs "A server is available."',
'[
  {"type": "multiple_choice", "question": "Choose: ''___ application is running.''", "options": ["A", "An", "The", "No article"], "correctAnswer": "The", "explanation": "The pour un élément spécifique."},
  {"type": "fill_blank", "question": "Complete: ''I need ___ access to the database.''", "options": [], "correctAnswer": "access", "explanation": "Pas d''article pour access dans ce contexte."}
]',
'Maîtriser les articles permet de construire des phrases professionnelles précises.',
1, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 3 AND title = 'Prepositions and Connectors' LIMIT 1), 'Prepositions in IT Context', 'Utiliser les prépositions essentielles dans des phrases techniques.',
'Les prépositions in, on, at, to, from, for, with, by sont essentielles. Elles changent le sens des phrases.',
'[
  {"sentence": "The server is on the network.", "meaning": "Le serveur est sur le réseau.", "itContext": "Connect the server to the network."},
  {"sentence": "The file is in the directory.", "meaning": "Le fichier est dans le répertoire.", "itContext": "Save the file in the correct directory."},
  {"sentence": "Access the system from your device.", "meaning": "Accédez au système depuis votre appareil.", "itContext": "Connect from any authorized device."}
]',
'[
  {"word": "directory", "definition": "Répertoire", "translation": "répertoire", "example": "Navigate to the directory.", "itExample": "Create a new directory.", "domain": "it", "level": "A"},
  {"word": "permission", "definition": "Permission", "translation": "permission", "example": "Check permissions.", "itExample": "Grant permission to the user.", "domain": "it", "level": "A"}
]',
'[
  {"expression": "in the cloud", "meaning": "dans le cloud", "example": "Deploy in the cloud.", "classification": "it", "difficulty": "A"},
  {"expression": "on the server", "meaning": "sur le serveur", "example": "The file is on the server.", "classification": "it", "difficulty": "A"}
]',
'Les prépositions sont essentielles dans les instructions techniques : "Save the file in the /tmp directory."',
'[
  {"type": "multiple_choice", "question": "Choose: ''The file is located ___ the server.''", "options": ["in", "on", "at", "to"], "correctAnswer": "on", "explanation": "On the server est correct."},
  {"type": "error_correction", "question": "Correct: ''The data is stored in the cloud.''", "options": [], "correctAnswer": "The data is stored in the cloud.", "explanation": "Cette phrase est correcte."}
]',
'Les prépositions permettent de construire des phrases techniques précises.',
2, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 3 AND title = 'Comparatives and Quantifiers' LIMIT 1), 'Comparatives and Superlatives', 'Former les comparatifs et superlatifs en anglais technique.',
'Les comparatifs comparent deux éléments (faster, more efficient). Les superlatifs comparent plus de deux (the fastest, the most efficient).',
'[
  {"sentence": "This server is faster than the previous one.", "meaning": "Ce serveur est plus rapide que le précédent.", "itContext": "The new server is faster than the old one."},
  {"sentence": "This is the most secure system.", "meaning": "C''est le système le plus sécurisé.", "itContext": "This is the most secure configuration."}
]',
'[
  {"word": "efficient", "definition": "Efficace", "translation": "efficace", "example": "An efficient system.", "itExample": "More efficient than...", "domain": "general", "level": "B"},
  {"word": "secure", "definition": "Sécurisé", "translation": "sécurisé", "example": "A secure connection.", "itExample": "The most secure option.", "domain": "cybersecurity", "level": "B"}
]',
'[
  {"expression": "more efficient than", "meaning": "plus efficace que", "example": "This process is more efficient than the previous one.", "classification": "professional", "difficulty": "B"},
  {"expression": "the best solution", "meaning": "la meilleure solution", "example": "This is the best solution for the problem.", "classification": "professional", "difficulty": "B"}
]',
'Dans les rapports techniques : "The new system is 20% faster and more reliable than the previous version."',
'[
  {"type": "multiple_choice", "question": "Comparative: ''This server is ___ than the previous one.''", "options": ["fast", "faster", "most fast", "fastest"], "correctAnswer": "faster", "explanation": "Faster est le comparatif de fast."},
  {"type": "fill_blank", "question": "Superlative: ''This is ___ system in the cluster.''", "options": [], "correctAnswer": "the most efficient", "explanation": "Most efficient pour adjectif long."}
]',
'Les comparatifs sont essentiels pour les évaluations et rapports techniques.',
3, 'active');

-- ============================================================================
-- NIVEAU 4 — CONVERSATION (suite)
-- ============================================================================

INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(4, 'Professional Communication', 'Communiquer efficacement dans un environnement professionnel.', 2, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 4 AND title = 'Professional Communication' LIMIT 1), 'Meetings and Discussions', 'Participer activement à des réunions professionnelles.',
'Les réunions en anglais suivent des structures : opening → discussion → agreement/disagreement → action → closing.',
'[
  {"sentence": "I''d like to add something.", "meaning": "Je voudrais ajouter quelque chose.", "itContext": "In meetings, use this to contribute."},
  {"sentence": "Could you elaborate on that point?", "meaning": "Pourriez-vous développer ce point?", "itContext": "Ask for clarification during a technical discussion."},
  {"sentence": "Let''s action this.", "meaning": "Passons à l''action.", "itContext": "Agree on next steps in the meeting."}
]',
'[
  {"word": "agenda", "definition": "Ordre du jour", "translation": "ordre du jour", "example": "Set the agenda.", "itExample": "The meeting agenda includes security review.", "domain": "professional", "level": "B"},
  {"word": "action", "definition": "Action", "translation": "action", "example": "Take action.", "itExample": "Action item: update the firewall.", "domain": "professional", "level": "B"}
]',
'[
  {"expression": "I''d like to add...", "meaning": "Je voudrais ajouter...", "example": "I''d like to add that we need more testing.", "classification": "professional", "difficulty": "B"},
  {"expression": "Let''s move on", "meaning": "Passons à la suite", "example": "Let''s move on to the next topic.", "classification": "professional", "difficulty": "B"}
]',
'Dans les réunions techniques : "The vulnerability scan showed 3 critical issues. Let''s prioritize the remediation."',
'[
  {"type": "scenario", "question": "You are in a meeting. The team is discussing a security incident. Ask a clarifying question.", "options": [], "correctAnswer": "Could you clarify which systems are affected?", "explanation": "Demander une clarification est essentiel dans les réunions."},
  {"type": "transformation", "question": "Make this more formal: ''We need to fix the bug.''", "options": [], "correctAnswer": "We need to address the issue.", "explanation": "Formal: use ''address the issue'' instead of ''fix the bug''."}
]',
'Maîtriser les réunions permet de participer activement aux discussions professionnelles.',
2, 'active');

-- ============================================================================
-- NIVEAU 6 — IT ENGLISH (suite)
-- ============================================================================

INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(6, 'Development and DevOps', 'Vocabulaire du développement et DevOps.', 3, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 6 AND title = 'Development and DevOps' LIMIT 1), 'Version Control and Deployment', 'Comprendre le vocabulaire du versioning et du déploiement.',
'Git est le système de versioning le plus courant. Les termes clés : repository, branch, commit, merge, pull request, deploy.',
'[
  {"sentence": "We need to commit the changes.", "meaning": "Nous devons valider les modifications.", "itContext": "Commit before pushing."},
  {"sentence": "The pull request was approved.", "meaning": "La pull request a été approuvée.", "itContext": "Merge after approval."},
  {"sentence": "Deploy the application to production.", "meaning": "Déployer l''application en production.", "itContext": "Deploy after testing."}
]',
'[
  {"word": "repository", "definition": "Dépôt", "translation": "dépôt", "example": "Clone the repository.", "itExample": "Push to the repository.", "domain": "it", "level": "B"},
  {"word": "branch", "definition": "Branche", "translation": "branche", "example": "Create a new branch.", "itExample": "Merge the branch.", "domain": "it", "level": "B"},
  {"word": "deploy", "definition": "Déployer", "translation": "déployer", "example": "Deploy the application.", "itExample": "Deploy to production.", "domain": "it", "level": "A"}
]',
'[
  {"expression": "commit changes", "meaning": "valider les modifications", "example": "Please commit your changes.", "classification": "it", "difficulty": "A"},
  {"expression": "push to production", "meaning": "mettre en production", "example": "Push to production after testing.", "classification": "it", "difficulty": "A"}
]',
'Workflow typique : "Clone the repository, create a feature branch, commit your changes, push, create a pull request, merge, deploy."',
'[
  {"type": "multiple_choice", "question": "What is a repository?", "options": ["A database", "A code storage location", "A server", "A file"], "correctAnswer": "A code storage location", "explanation": "Un repository stocke le code source."},
  {"type": "transformation", "question": "Transform: ''We will deploy the fix.'' → Future with going to", "options": [], "correctAnswer": "We are going to deploy the fix.", "explanation": "Be going to pour l''intention."}
]',
'Maîtriser le vocabulaire DevOps permet de comprendre les workflows de développement.',
3, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 6 AND title = 'Systems & Networking' LIMIT 1), 'System Administration', 'Vocabulaire de l''administration système.',
'Les administrateurs système utilisent un vocabulaire spécifique : service, daemon, cron, log, process, kernel, package.',
'[
  {"sentence": "The service needs to be restarted.", "meaning": "Le service doit être redémarré.", "itContext": "Restart the service after configuration."},
  {"sentence": "Check the system logs for errors.", "meaning": "Vérifiez les logs système pour les erreurs.", "itContext": "Always check logs when debugging."},
  {"sentence": "Install the required packages.", "meaning": "Installez les packages requis.", "itContext": "Install packages before configuration."}
]',
'[
  {"word": "service", "definition": "Service", "translation": "service", "example": "Start the service.", "itExample": "Restart the Apache service.", "domain": "it", "level": "A"},
  {"word": "daemon", "definition": "Daemon", "translation": "daemon", "example": "The daemon is running.", "itExample": "Check the daemon status.", "domain": "it", "level": "B"}
]',
'[
  {"expression": "restart the service", "meaning": "redémarrer le service", "example": "Please restart the service.", "classification": "it", "difficulty": "A"},
  {"expression": "check the logs", "meaning": "vérifier les logs", "example": "Check the logs for errors.", "classification": "it", "difficulty": "A"}
]',
'Un admin doit savoir : "The service is down. Check the logs, identify the issue, and restart the service."',
'[
  {"type": "fill_blank", "question": "Complete: ''The ___ needs to be restarted.''", "options": [], "correctAnswer": "service", "explanation": "Service est un terme courant en admin système."},
  {"type": "scenario", "question": "A service is down. Write a diagnostic message.", "options": [], "correctAnswer": "The service is not responding. Check the logs and restart if necessary.", "explanation": "Message clair et actionnable."}
]',
'Le vocabulaire d''administration système est essentiel pour les conversations techniques.',
4, 'active');

-- ============================================================================
-- NIVEAU 7 — CYBERSECURITY (suite)
-- ============================================================================

INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(7, 'Incident Response', 'Comprendre le vocabulaire de la réponse aux incidents.', 3, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 7 AND title = 'Security Foundations' LIMIT 1), 'Incident Response Terminology', 'Maîtriser le vocabulaire de la réponse aux incidents.',
'Un incident de sécurité suit un cycle : detection → analysis → containment → eradication → recovery → lessons learned.',
'[
  {"sentence": "We detected an anomaly.", "meaning": "Nous avons détecté une anomalie.", "itContext": "The IDS detected suspicious traffic."},
  {"sentence": "The incident has been contained.", "meaning": "L''incident a été contenu.", "itContext": "Contain the threat before it spreads."},
  {"sentence": "We need to investigate the breach.", "meaning": "Nous devons enquêter sur la violation.", "itContext": "Investigate to identify the root cause."}
]',
'[
  {"word": "incident", "definition": "Incident", "translation": "incident", "example": "Report the incident.", "itExample": "Security incident response.", "domain": "cybersecurity", "level": "A"},
  {"word": "containment", "definition": "Confinement", "translation": "confinement", "example": "Contain the threat.", "itExample": "Isolation for containment.", "domain": "cybersecurity", "level": "B"}
]',
'[
  {"expression": "detect and respond", "meaning": "détecter et répondre", "example": "We must detect and respond quickly.", "classification": "cybersecurity", "difficulty": "A"},
  {"expression": "contain the breach", "meaning": "contenir la violation", "example": "Contain the breach immediately.", "classification": "cybersecurity", "difficulty": "A"}
]',
'Processus typique : "Detect the anomaly → analyze the logs → contain the threat → eradicate the malware → recover systems."',
'[
  {"type": "multiple_choice", "question": "What is incident containment?", "options": ["Delete all data", "Limit the damage", "Ignore the issue", "Report to media"], "correctAnswer": "Limit the damage", "explanation": "Le confinement limite la propagation."},
  {"type": "scenario", "question": "You detected ransomware. Write the first action.", "options": [], "correctAnswer": "Isolate the affected systems immediately.", "explanation": "L''isolation est la première étape."}
]',
'Le vocabulaire d''incident response est essentiel pour travailler en SOC.',
3, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 7 AND title = 'Security Operations' LIMIT 1), 'Security Policies and Compliance', 'Comprendre les politiques de sécurité et la conformité.',
'Les politiques de sécurité définissent les règles. La conformité (compliance) vérifie le respect des réglementations.',
'[
  {"sentence": "The security policy requires strong passwords.", "meaning": "La politique exige des mots de passe robustes.", "itContext": "Enforce password policy."},
  {"sentence": "We must comply with GDPR.", "meaning": "Nous devons respecter le RGPD.", "itContext": "GDPR compliance is mandatory."},
  {"sentence": "The audit revealed non-compliance.", "meaning": "L''audit a révélé une non-conformité.", "itContext": "Address compliance gaps."}
]',
'[
  {"word": "policy", "definition": "Politique", "translation": "politique", "example": "Security policy.", "itExample": "Enforce the access policy.", "domain": "cybersecurity", "level": "B"},
  {"word": "compliance", "definition": "Conformité", "translation": "conformité", "example": "Ensure compliance.", "itExample": "GDPR compliance check.", "domain": "cybersecurity", "level": "B"}
]',
'[
  {"expression": "enforce the policy", "meaning": "appliquer la politique", "example": "Enforce the password policy.", "classification": "cybersecurity", "difficulty": "B"},
  {"expression": "comply with regulations", "meaning": "se conformer aux réglementations", "example": "We must comply with regulations.", "classification": "cybersecurity", "difficulty": "B"}
]',
'Dans un environnement professionnel : "All employees must comply with the security policy and report incidents immediately."',
'[
  {"type": "multiple_choice", "question": "What is compliance?", "options": ["A type of malware", "Conformity to rules", "A network device", "A password"], "correctAnswer": "Conformity to rules", "explanation": "Compliance = respect des règles."},
  {"type": "transformation", "question": "Transform: ''The policy requires action.'' → Passive", "options": [], "correctAnswer": "Action is required by the policy.", "explanation": "Voix passive avec be + past participle."}
]',
'Les politiques de sécurité sont au cœur de la cybersécurité en entreprise.',
4, 'active');

-- ============================================================================
-- NIVEAU 8 — ACADEMIC & PROFESSIONAL INTEGRATION
-- ============================================================================

INSERT INTO modules (level_id, title, objective, order_index, status) VALUES
(8, 'Technical Documentation', 'Lire et comprendre la documentation technique.', 1, 'active'),
(8, 'Professional Presentations', 'Présenter des sujets techniques en anglais.', 2, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 8 AND title = 'Technical Documentation' LIMIT 1), 'Reading Technical Documentation', 'Comprendre la documentation technique anglaise.',
'La documentation technique utilise un langage précis : install, configure, troubleshoot, maintain, backup, restore.',
'[
  {"sentence": "Install the application following these steps.", "meaning": "Installez l''application en suivant ces étapes.", "itContext": "Follow the installation guide."},
  {"sentence": "Troubleshoot the connection before restarting.", "meaning": "Dépannage de la connexion avant redémarrage.", "itContext": "Troubleshooting steps are in the manual."},
  {"sentence": "Maintain regular backups.", "meaning": "Effectuez des sauvegardes régulières.", "itContext": "Backup policy requires daily saves."}
]',
'[
  {"word": "troubleshoot", "definition": "Dépanner", "translation": "dépanner", "example": "Troubleshoot the issue.", "itExample": "Follow the troubleshooting guide.", "domain": "it", "level": "B"},
  {"word": "maintain", "definition": "Maintenir", "translation": "maintenir", "example": "Maintain the system.", "itExample": "Regular maintenance is required.", "domain": "it", "level": "B"}
]',
'[
  {"expression": "follow the steps", "meaning": "suivre les étapes", "example": "Follow the steps in the manual.", "classification": "it", "difficulty": "A"},
  {"expression": "refer to the documentation", "meaning": "consulter la documentation", "example": "Refer to the documentation for details.", "classification": "professional", "difficulty": "B"}
]',
'La documentation technique est souvent en anglais. Savoir la lire est essentiel pour un professionnel IT.',
'[
  {"type": "fill_blank", "question": "Complete: ''___ the application before configuring.''", "options": [], "correctAnswer": "Install", "explanation": "Install est la première étape."},
  {"type": "scenario", "question": "You need to explain a technical process. Write 3 clear steps.", "options": [], "correctAnswer": "1. Install the software. 2. Configure the settings. 3. Test the connection.", "explanation": "Steps should be clear and sequential."}
]',
'Lire la documentation technique permet de travailler de manière autonome.',
2, 'active');

INSERT INTO lessons (module_id, title, objective, explanation, examples, vocabulary, expressions, it_context, practice, summary, order_index, status) VALUES
((SELECT id FROM modules WHERE level_id = 8 AND title = 'Professional Presentations' LIMIT 1), 'Presenting Technical Information', 'Présenter des informations techniques en anglais.',
'Une présentation technique doit être : claire, structurée, concise, avec contexte et conclusion.',
'[
  {"sentence": "Today I''ll present our security findings.", "meaning": "Aujourd''hui je vais présenter nos résultats de sécurité.", "itContext": "Start with a clear objective."},
  {"sentence": "The main issue is a misconfiguration.", "meaning": "Le problème principal est une mauvaise configuration.", "itContext": "Identify the root cause clearly."},
  {"sentence": "I recommend immediate action.", "meaning": "Je recommande une action immédiate.", "itContext": "End with clear recommendations."}
]',
'[
  {"word": "finding", "definition": "Résultat", "translation": "résultat", "example": "Key findings.", "itExample": "The audit findings show...", "domain": "professional", "level": "B"},
  {"word": "recommendation", "definition": "Recommandation", "translation": "recommandation", "example": "My recommendation is...", "itExample": "Implement the security recommendations.", "domain": "professional", "level": "B"}
]',
'[
  {"expression": "I''d like to highlight...", "meaning": "Je voudrais souligner...", "example": "I''d like to highlight the key finding.", "classification": "professional", "difficulty": "B"},
  {"expression": "in conclusion", "meaning": "en conclusion", "example": "In conclusion, we need to...", "classification": "professional", "difficulty": "B"}
]',
'Structure d''une présentation : "Today I''ll present... First... Then... Finally... In conclusion..."',
'[
  {"type": "scenario", "question": "Present the results of a security audit in 3 sentences.", "options": [], "correctAnswer": "The audit revealed 3 critical vulnerabilities. We recommend patching immediately. I will send the full report.", "explanation": "Structure: findings, recommendations, next steps."},
  {"type": "transformation", "question": "Make this more formal: ''We found a big problem.''", "options": [], "correctAnswer": "We identified a significant issue.", "explanation": "Formal: use ''identified'' instead of ''found'', ''significant'' instead of ''big''."}
]',
'Présenter en anglais permet de participer à des réunions internationales.',
3, 'active');

-- ============================================================================
-- FIN DU CONTENU DES NIVEAUX 3-8
-- ============================================================================
