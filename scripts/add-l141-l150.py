# Continuation of build-t2.py for Level 5 lessons (141 to 150)
import os, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOW = "2026-08-31T08:00:00.000Z"

# Load existing python file and insert L141-L150
with open(os.path.join(BASE, "scripts", "build-t2.py"), "r", encoding="utf-8") as f:
    code = f.read()

# Check if L141 is already in code
if "LEÇON 141" not in code:
    l141_l150_code = '''# ================= LEÇON 141 — N5 Indirect Questions =================
L(141, 19, 5, 1,
  "Indirect Questions and Polite Inquiries in Technical Support",
  "Formuler des questions indirectes et des demandes polies dans le support technique et les échanges avec les clients ou équipes.",
  "Dans un cadre professionnel et technique, poser une question directe peut parfois paraître abrupt. Les questions indirectes permettent d'adoucir la demande et d'adopter un ton très professionnel. STRUCTURE : On commence par une amorce polie (Could you tell me... / Do you know... / I was wondering... / Would you mind explaining...) suivie de l'ordre normal des mots S + V (SANS inversion du sujet et du verbe auxiliaire do/does/did). Exemple direct : 'Where is the log file?' -> Indirect : 'Could you tell me where the log file is?'. Exemple direct : 'Why did the service fail?' -> Indirect : 'Do you know why the service failed?'. Pour les questions fermées (oui/non), on utilise IF ou WHETHER : 'Is the server reachable?' -> 'Could you check if the server is reachable?'. En contexte IT et support client, utiliser des questions indirectes démontre un haut niveau de professionnalisme et évite que l'interlocuteur ne se sente mis en cause lors d'une investigation d'incident.",
  [
    {"meaning": "Pourriez-vous me dire où se trouve le fichier de log ?", "sentence": "Could you tell me where the log file is?", "itContext": "Could you tell me where the log file is located on the server?"},
    {"meaning": "Savez-vous pourquoi la sauvegarde a échoué ?", "sentence": "Do you know why the backup failed?", "itContext": "Do you know why the nightly backup failed at 2 AM?"},
    {"meaning": "Je me demandais si le cluster était disponible.", "sentence": "I was wondering if the cluster is available.", "itContext": "I was wondering if the staging cluster is available for testing."},
    {"meaning": "Cela vous dérangerait-il d'expliquer ce changement ?", "sentence": "Would you mind explaining this change?", "itContext": "Would you mind explaining this configuration change?"},
    {"meaning": "Pouvez-vous vérifier si l'API répond ?", "sentence": "Could you check if the API is responding?", "itContext": "Could you check if the external API endpoint is responding?"},
    {"meaning": "J'aimerais savoir quand la maintenance se termine.", "sentence": "I would like to know when the maintenance ends.", "itContext": "I would like to know when the scheduled maintenance ends."},
    {"meaning": "Savez-vous qui gère ce sous-domaine ?", "sentence": "Do you know who manages this subdomain?", "itContext": "Do you know who manages this subdomain DNS record?"}
  ],
  [
    {"word": "wondering", "level": "B", "domain": "grammar", "example": "I was wondering if...", "itContext": "I was wondering if we can schedule the restart.", "definition": "Se demander poliment", "translation": "se demander"},
    {"word": "inquiry", "level": "B", "domain": "professional", "example": "Send a formal inquiry.", "itContext": "We received an inquiry regarding SLA compliance.", "definition": "Demande de renseignement", "translation": "demande"},
    {"word": "polite", "level": "A", "domain": "professional", "example": "Be polite in tickets.", "itContext": "Use polite phrasing in customer-facing notes.", "definition": "Courtois, poli", "translation": "poli"},
    {"word": "whether", "level": "B", "domain": "grammar", "example": "Check whether it is online.", "itContext": "Verify whether the port is open.", "definition": "Si (alternative ou choix)", "translation": "si"},
    {"word": "reachable", "level": "B", "domain": "it", "example": "Is the host reachable?", "itContext": "Check if the database host is reachable over VPN.", "definition": "Accessible par le réseau", "translation": "joignable"},
    {"word": "abrupt", "level": "C", "domain": "professional", "example": "Avoid abrupt questions.", "itContext": "Direct questions can sound abrupt in client emails.", "definition": "Soudain, sec", "translation": "brutal, sec"},
    {"word": "phrasing", "level": "B", "domain": "professional", "example": "Improve the phrasing.", "itContext": "The security policy phrasing must be unambiguous.", "definition": "Formulation des mots", "translation": "formulation"},
    {"word": "clarify", "level": "B", "domain": "professional", "example": "Please clarify step 2.", "itContext": "Could you clarify the rollback trigger in the runbook?", "definition": "Rendre clair, expliquer", "translation": "clarifier"}
  ],
  [
    {"expression": "I was wondering if", "meaning": "je me demandais si", "difficulty": "B", "example": "I was wondering if you had time to review this PR.", "classification": "professional"},
    {"expression": "could you please confirm", "meaning": "pourriez-vous s'il vous plaît confirmer", "difficulty": "B", "example": "Could you please confirm the deployment window?", "classification": "professional"},
    {"expression": "would you mind", "meaning": "cela vous dérangerait-il de", "difficulty": "B", "example": "Would you mind checking the logs?", "classification": "professional"},
    {"expression": "do you happen to know", "meaning": "auriez-vous par hasard connaissance de", "difficulty": "C", "example": "Do you happen to know where the backup is stored?", "classification": "professional"},
    {"expression": "let me know if", "meaning": "faites-moi savoir si", "difficulty": "A", "example": "Let me know if you need administrative access.", "classification": "professional"}
  ],
  "Questions indirectes = amorce polie + ordre déclaratif (S + V). Pas de do/does/did d'inversion. Utiliser if/whether pour les questions oui/non.",
  [
    {"type": "multiple_choice", "question": "Question indirecte correcte :", "options": ["Could you tell me where is the file?", "Could you tell me where the file is?", "Could you tell me where does the file stay?", "Where the file is could you tell me?"], "correctAnswer": "Could you tell me where the file is?", "explanation": "Ordre S + V dans la question indirecte."},
    {"type": "multiple_choice", "question": "Question ferme indirecte : 'Do you know ___ the server is online?'", "options": ["if", "what", "where", "why"], "correctAnswer": "if", "explanation": "If/whether pour question oui/non."},
    {"type": "fill_blank", "question": "Complétez : I was ___ if the script completed.", "options": [], "correctAnswer": "wondering", "explanation": "I was wondering if..."},
    {"type": "multiple_choice", "question": "Pourquoi utiliser des questions indirectes ?", "options": ["Pour faire plus long", "Pour adoucir la demande et être pro", "Pour masquer le sens", "Ce n'est pas utilisé"], "correctAnswer": "Pour adoucir la demande et être pro", "explanation": "Politesse et professionnalisme."}
  ],
  "Questions indirectes = Amorce polie (Could you tell me...) + Ordre déclaratif (Sujet + Verbe). Utiliser IF/WHETHER pour les questions oui/non.",
  [
    {"question": "Could you check ___ the endpoint is active?", "options": ["whether", "where", "what", "which"], "correctAnswer": "whether", "explanation": "Whether = si (option)."},
    {"question": "Do you know why the build ___?", "options": ["failed", "did fail", "was failed", "failing"], "correctAnswer": "failed", "explanation": "Ordre S + V au passé."},
    {"question": "I would like to know when the maintenance ___.", "options": ["ends", "does end", "ending", "will to end"], "correctAnswer": "ends", "explanation": "Ordre déclaratif S + V."},
    {"question": "Would you mind ___ the repository permissions?", "options": ["checking", "to check", "check", "checked"], "correctAnswer": "checking", "explanation": "Would you mind + gérondif (-ing)."}
  ],
  [
    {"pattern": "Could you tell me where + S + V?", "example": "Could you tell me where the server is?", "explanation": "Question indirecte de lieu."},
    {"pattern": "I was wondering if + S + V", "example": "I was wondering if the deploy finished.", "explanation": "Demande très polie."},
    {"pattern": "Would you mind + V-ing?", "example": "Would you mind purging the cache?", "explanation": "Demande d'action courtoise."}
  ]
),
# ================= LEÇON 142 — N5 Third Conditional =================
L(142, 20, 5, 2,
  "Third Conditional: Root Cause Analysis and Unfulfilled Past Conditions",
  "Exprimer des regrets, des analyses post-incident et des conditions passées non réalisées avec le Third Conditional (If + Past Perfect, Would have + Past Participle).",
  "Le Troisième Conditionnel (Third Conditional) est utilisé pour parler de situations passées qui ne se sont PAS produites et imaginer leurs résultats dans le passé. C'est le temps roi de l'Analyse de Cause Racine (Root Cause Analysis - RCA) et des retours d'expérience (Post-Mortems).\n\nSTRUCTURE : If + Sujet + Past Perfect (had + participe passé) , Sujet + would have (ou could have / might have) + participe passé.\nExemple : 'If we had tested the patch, the outage would not have occurred.' (En réalité : nous ne l'avons pas testé, et la panne s'est produite).\n\nNUANCES DE MODAUX : \n- WOULD HAVE : certitude sur le résultat imaginaire ('would have saved time').\n- COULD HAVE : capacité ou possibilité passée imaginaire ('we could have prevented it').\n- MIGHT HAVE : incertitude sur le résultat passé imaginaire ('it might have failed anyway').\n\nEn contexte IT et Cybersécurité, le Troisième Conditionnel permet d'analyser froidement les défaillances passées pour en tirer des leçons sans chercher de coupable personnel : 'If the backup had been verified, recovery would have taken ten minutes instead of five hours'.",
  [
    {"meaning": "Si nous avions testé le patch, la panne ne se serait pas produite.", "sentence": "If we had tested the patch, the outage would not have occurred.", "itContext": "If we had tested the patch in staging, the outage would not have occurred."},
    {"meaning": "Si la sauvegarde avait été vérifiée, la restauration aurait pris 10 minutes.", "sentence": "If the backup had been verified, recovery would have taken 10 minutes.", "itContext": "If the automated backup had been verified, recovery would have taken 10 minutes."},
    {"meaning": "Nous aurions pu éviter la fuite si le port avait été fermé.", "sentence": "We could have prevented the leak if the port had been closed.", "itContext": "We could have prevented the data leak if port 22 had been closed."},
    {"meaning": "Si l'alerte avait déclenché, l'équipe aurait réagi plus tôt.", "sentence": "If the alert had fired, the team would have reacted sooner.", "itContext": "If the PagerDuty alert had fired, the team would have reacted within minutes."},
    {"meaning": "L'application aurait pu planter si la charge avait augmenté.", "sentence": "The application might have crashed if load had increased.", "itContext": "The application might have crashed if peak load had increased by 20%."},
    {"meaning": "Si la clé avait été révoquée, l'attaquant n'aurait rien pu faire.", "sentence": "If the key had been revoked, the attacker could not have accessed the bucket.", "itContext": "If the API key had been revoked, the attacker could not have accessed the S3 bucket."},
    {"meaning": "Si nous avions configuré la réplication, aucun fichier n'aurait été perdu.", "sentence": "If we had configured replication, no files would have been lost.", "itContext": "If we had configured multi-region replication, no customer files would have been lost."}
  ],
  [
    {"word": "post-mortem", "level": "B", "domain": "it", "example": "Write a post-mortem.", "itContext": "The team published a post-mortem after the outage.", "definition": "Analyse d'incident a posteriori", "translation": "retour d'expérience, post-mortem"},
    {"word": "root cause", "level": "B", "domain": "it", "example": "Find the root cause.", "itContext": "The root cause was identified as a misconfigured IAM policy.", "definition": "Cause fondamentale sous-jacente", "translation": "cause racine"},
    {"word": "unfulfilled", "level": "C", "domain": "grammar", "example": "An unfulfilled condition.", "itContext": "Third conditional expresses unfulfilled past scenarios.", "definition": "Non réalisé dans le passé", "translation": "non réalisé"},
    {"word": "prevention", "level": "B", "domain": "cybersecurity", "example": "Prevention is key.", "itContext": "Incident prevention relies on automated testing.", "definition": "Action d'empêcher un problème", "translation": "prévention"},
    {"word": "revocation", "level": "B", "domain": "cybersecurity", "example": "Key revocation was slow.", "itContext": "Token revocation must be immediate upon compromise.", "definition": "Annulation d'un droit/clé", "translation": "révocation"},
    {"word": "hindsight", "level": "C", "domain": "professional", "example": "In hindsight, we should...", "itContext": "In hindsight, we should have deployed behind a feature flag.", "definition": "Rétrospective, recul", "translation": "avec le recul"},
    {"word": "lesson learned", "level": "B", "domain": "professional", "example": "Document lessons learned.", "itContext": "The main lesson learned is to automate regression tests.", "definition": "Enseignement tiré d'une expérience", "translation": "leçon apprise"},
    {"word": "hypothetical", "level": "B", "domain": "grammar", "example": "A hypothetical past.", "itContext": "RCA uses hypothetical past analysis to improve systems.", "definition": "Basé sur une hypothèse", "translation": "hypothétique"}
  ],
  [
    {"expression": "in hindsight", "meaning": "avec le recul", "difficulty": "B", "example": "In hindsight, we could have avoided the downtime.", "classification": "professional"},
    {"expression": "root cause analysis", "meaning": "analyse des causes profondes", "difficulty": "B", "example": "The root cause analysis revealed a memory leak.", "classification": "it"},
    {"expression": "lessons learned", "meaning": "enseignements tirés", "difficulty": "B", "example": "Here are the key lessons learned from this incident.", "classification": "professional"},
    {"expression": "what if", "meaning": "et si (scénario alternatif)", "difficulty": "A", "example": "What if we had enabled rate limiting earlier?", "classification": "professional"},
    {"expression": "could have been avoided", "meaning": "aurait pu être évité", "difficulty": "B", "example": "The breach could have been avoided with MFA.", "classification": "cybersecurity"}
  ],
  "Third Conditional = If + Past Perfect (had + PP) , would/could/might have + PP. Exprime le passé non réalisé et sert à l'analyse d'incident (RCA).",
  [
    {"type": "multiple_choice", "question": "Structure du 3ème conditionnel : 'If we ___ the script, the database ___.'", "options": ["had run / would not have crashed", "ran / will not crash", "have run / would not crash", "had ran / would crash not"], "correctAnswer": "had run / would not have crashed", "explanation": "If + past perfect, would have + participe passé."},
    {"type": "multiple_choice", "question": "Nuance de capacité : 'We ___ prevented the leak if port 22 had been closed.'", "options": ["could have", "would must", "should will", "might had"], "correctAnswer": "could have", "explanation": "Could have = capacité passée imaginaire."},
    {"type": "fill_blank", "question": "Complétez : If the alert had fired, we would ___ reacted.", "options": [], "correctAnswer": "have", "explanation": "would have + participe passé."},
    {"type": "multiple_choice", "question": "À quoi sert le 3ème conditionnel en IT ?", "options": ["À prévoir le futur", "À analyser des incidents passés (RCA)", "À donner des ordres", "À décrire le présent"], "correctAnswer": "À analyser des incidents passés (RCA)", "explanation": "Scénarios passés non réalisés."}
  ],
  "Third Conditional = If + Had + Participe Passé , Would/Could/Might HAVE + Participe Passé. Indispensable pour les post-mortems.",
  [
    {"question": "If the key ___ revoked, the bucket would be safe.", "options": ["had been", "was been", "has been", "is"], "correctAnswer": "had been", "explanation": "Past perfect passif : had been + PP."},
    {"question": "In hindsight, we ___ configured replication earlier.", "options": ["should have", "should had", "would has", "must to"], "correctAnswer": "should have", "explanation": "Should have + PP = regret/recommandation passée."},
    {"question": "The breach could have been avoided ___ MFA had been enforced.", "options": ["if", "unless", "whether", "whereas"], "correctAnswer": "if", "explanation": "If + condition passée."},
    {"question": "If we had tested, the bug ___ caught in QA.", "options": ["would have been", "will be", "was to be", "has been"], "correctAnswer": "would have been", "explanation": "Would have been + PP (passif)."}
  ],
  [
    {"pattern": "If + had + PP, would have + PP", "example": "If we had tested, it would have worked.", "explanation": "Condition passée et résultat imaginaire."},
    {"pattern": "We could have + PP if + had + PP", "example": "We could have avoided it if we had patched.", "explanation": "Capacité passée non réalisée."},
    {"pattern": "In hindsight, we should have + PP", "example": "In hindsight, we should have enabled logs.", "explanation": "Regret et recommandation post-mortem."}
  ]
),
# ================= LEÇON 143 — N5 Gerund vs Infinitive =================
L(143, 21, 5, 3,
  "Gerund vs Infinitive in Technical Writing and Specifications",
  "Distinguer l'utilisation du Gérondif (-ing) et de l'Infinitif (to + verbe) dans les spécifications techniques, interfaces et documentations.",
  "En anglais technique, choisir entre le gérondif (verbe en -ing) et l'infinitif (to + base verbale) est fréquent et répond à des règles précises.\n\nUTILISATION DU GÉRONDIF (-ING) :\n1. Après des prépositions : 'by upgrading the server', 'before deploying', 'after testing', 'for storing logs'.\n2. Comme sujet de phrase (nom d'action) : 'Monitoring network traffic is essential'.\n3. Après certains verbes spécifiques : avoid, consider, delay, recommend, suggest, stop, finish. Exemple : 'Avoid hardcoding secrets in source code'.\n\nUTILISATION DE L'INFINITIF (TO + VERBE) :\n1. Pour exprimer le but ou l'objectif (in order to) : 'Run this script to configure the firewall'.\n2. Après des adjectifs : 'It is easy to configure', 'It is important to backup'.\n3. Après certains verbes spécifiques : agree, allow, decide, expect, plan, refuse, want. Exemple : 'The system decided to trigger a failover'.\n\nVERBES À DOUBLE SENS :\n- STOP DOING = arrêter une habitude/action ('Stop using SSL v3').\n- STOP TO DO = s'arrêter pour faire autre chose ('Stop to check the logs').\n- REMEMBER TO DO = penser à faire quelque chose ('Remember to rotate keys').\n- REMEMBER DOING = se souvenir d'avoir fait ('I remember changing the setting').",
  [
    {"meaning": "Évitez de coder en dur des secrets dans le code source.", "sentence": "Avoid hardcoding secrets in source code.", "itContext": "Avoid hardcoding secrets in source code; use environment variables."},
    {"meaning": "Exécutez ce script pour configurer le pare-feu.", "sentence": "Run this script to configure the firewall.", "itContext": "Run this Ansible playbook to configure the firewall rules."},
    {"meaning": "La surveillance du réseau est essentielle.", "sentence": "Monitoring network traffic is essential.", "itContext": "Monitoring network traffic 24/7 is essential for security."},
    {"meaning": "N'oubliez pas de réinitialiser le jeton.", "sentence": "Remember to reset the token.", "itContext": "Remember to reset the session token upon logout."},
    {"meaning": "Arrêtez d'utiliser des protocoles obsolètes.", "sentence": "Stop using legacy protocols.", "itContext": "Stop using legacy TLS 1.0 protocols across all endpoints."},
    {"meaning": "Nous recommandons d'activer la réplication.", "sentence": "We recommend enabling replication.", "itContext": "We recommend enabling multi-AZ replication for resilience."},
    {"meaning": "Il est facile de déployer cette application.", "sentence": "It is easy to deploy this application.", "itContext": "It is easy to deploy this application using Docker containers."}
  ],
  [
    {"word": "gerund", "level": "B", "domain": "grammar", "example": "Verbs in -ing acting as nouns.", "itContext": "Gerunds are used after prepositions in technical docs.", "definition": "Forme verbale en -ing utilisée comme nom", "translation": "gérondif"},
    {"word": "infinitive", "level": "A", "domain": "grammar", "example": "To + base verb.", "itContext": "Infinitive expresses the purpose of an action.", "definition": "Forme de base précédée de to", "translation": "infinitif"},
    {"word": "specification", "level": "B", "domain": "it", "example": "Read the API specification.", "itContext": "The OpenAPI specification defines all endpoints.", "definition": "Document décrivant les exigences", "translation": "spécification"},
    {"word": "hardcoding", "level": "B", "domain": "dev", "example": "Avoid hardcoding credentials.", "itContext": "Hardcoding API keys creates severe security risks.", "definition": "Inscrire des valeurs brutes dans le code", "translation": "codage en dur"},
    {"word": "purpose", "level": "B", "domain": "professional", "example": "What is the purpose of this script?", "itContext": "The purpose of this script is to clean temp tables.", "definition": "But ou objectif recherché", "translation": "objectif, but"},
    {"word": "preposition", "level": "A", "domain": "grammar", "example": "After a preposition, use -ing.", "itContext": "Before restarting, verify active connections.", "definition": "Mot de liaison (by, before, after, for)", "translation": "préposition"},
    {"word": "requirement", "level": "B", "domain": "it", "example": "Meets all requirements.", "itContext": "The system meets all security requirements.", "definition": "Exigence technique", "translation": "exigence"},
    {"word": "recommendation", "level": "B", "domain": "professional", "example": "Follow the security recommendation.", "itContext": "Following this recommendation prevents unauthorized access.", "definition": "Conseil d'expert", "translation": "recommandation"}
  ],
  [
    {"expression": "in order to", "meaning": "afin de", "difficulty": "B", "example": "Run the job in order to sync the tables.", "classification": "professional"},
    {"expression": "avoid doing", "meaning": "éviter de faire", "difficulty": "B", "example": "Avoid modifying production tables directly.", "classification": "it"},
    {"expression": "used for doing", "meaning": "utilisé pour faire", "difficulty": "A", "example": "This port is used for listening to HTTPS requests.", "classification": "it"},
    {"expression": "remember to check", "meaning": "penser à vérifier", "difficulty": "A", "example": "Remember to check the return code.", "classification": "professional"},
    {"expression": "worth doing", "meaning": "qui vaut la peine d'être fait", "difficulty": "B", "example": "Refactoring this module is worth doing.", "classification": "dev"}
  ],
  "Gérondif (-ing) après préposition (by, before, for) et verbes de conseil/évitement (avoid, recommend). Infinitif (to + V) pour le BUT et après adjectifs.",
  [
    {"type": "multiple_choice", "question": "Après une préposition (by, before, for) :", "options": ["Verbe en -ing (gérondif)", "To + verbe (infinitif)", "Verbe au passé", "Base verbale sans to"], "correctAnswer": "Verbe en -ing (gérondif)", "explanation": "Toujours gérondif après une préposition."},
    {"type": "multiple_choice", "question": "Pour exprimer le BUT d'une commande :", "options": ["To + verbe (infinitif)", "Verbe en -ing", "Verbe au passé", "Par participe"], "correctAnswer": "To + verbe (infinitif)", "explanation": "To + verbe exprime le but (in order to)."},
    {"type": "fill_blank", "question": "Complétez : Avoid ___ (hardcode) secrets in the app.", "options": [], "correctAnswer": "hardcoding", "explanation": "Avoid + gérondif (-ing)."},
    {"type": "multiple_choice", "question": "Différence entre 'stop using' et 'stop to use' :", "options": ["Stop using = cesser l'action ; Stop to use = s'arrêter afin d'utiliser", "C'est identique", "Stop using est incorrect", "Stop to use est impossible"], correctAnswer: "Stop using = cesser l'action ; Stop to use = s'arrêter afin d'utiliser", explanation: "Gérondif = cesser l'action en cours."}
  ],
  "Gérondif (-ing) : après préposition, comme sujet, après avoid/recommend/stop. Infinitif (to + V) : pour le BUT (in order to) et après adjectifs.",
  [
    {"question": "By ___ the script, you update the schema.", "options": ["running", "to run", "run", "ran"], "correctAnswer": "running", "explanation": "By + préposition → running."},
    {"question": "We plan ___ the new release tomorrow.", "options": ["to deploy", "deploying", "deploy", "deployed"], "correctAnswer": "to deploy", "explanation": "Plan + infinitif (to deploy)."},
    {"question": "It is important ___ the database before upgrades.", "options": ["to backup", "backing up", "backup", "backed"], "correctAnswer": "to backup", "explanation": "Adjectif (important) + infinitif."},
    {"question": "Recommend ___ multi-factor authentication.", "options": ["enabling", "to enable", "enable", "enabled"], "correctAnswer": "enabling", "explanation": "Recommend + gérondif (enabling)."}
  ],
  [
    {"pattern": "by + V-ing (moyen technique)", "example": "By running this, you update the DB.", "explanation": "Expliquer la méthode d'exécution."},
    {"pattern": "to + base verb (but/objectif)", "example": "Run this script to configure IP.", "explanation": "Expliquer la finalité de l'action."},
    {"pattern": "avoid + V-ing (bonne pratique)", "example": "Avoid using plain text passwords.", "explanation": "Formuler une interdiction/mise en garde."}
  ]
),
# ================= LEÇON 144 — N5 Relative Clauses =================
L(144, 22, 5, 4,
  "Defining and Non-defining Relative Clauses in System Documentation",
  "Utiliser les propositions relatives (who, which, that, where, whose) pour enrichir la documentation technique sans ambiguïté.",
  "Les propositions relatives permettent d'apporter des précisions sur un nom (système, utilisateur, fichier, serveur) sans multiplier les petites phrases séparées.\n\nPRONOMS RELATIFS :\n- WHO / THAT : pour les personnes ('The engineer who deployed the hotfix').\n- WHICH / THAT : pour les choses et systèmes ('The server which hosts the API').\n- WHERE : pour les lieux et environnements ('The cluster where containers run').\n- WHOSE : pour la possession ('The user whose account was locked').\n\nPROPOSITIONS RELATIVES DÉFINISSANTES (Defining) :\nElles apportent une information ESSENTIELLE pour identifier l'élément. PAS de virgules. 'That' est très fréquent.\nExemple : 'The database that stores user profiles is encrypted.' (Seule cette base précise est chiffrée).\n\nPROPOSITIONS RELATIVES NON-DÉFINISSANTES (Non-defining) :\nElles apportent une information COMPLÉMENTAIRE (bonus). Encadrées par des VIRGULES. On N'UTILISE PAS 'that' (uniquement which ou who).\nExemple : 'The main database, which was upgraded last week, is running smoothly.' (L'information entre virgules est un détail supplémentaire).\n\nEn documentation technique, la présence ou l'absence de virgules modifie le périmètre : 'Servers which run Linux need a patch' (tous les serveurs, au fait ils sont sous Linux) vs 'Servers that run Linux need a patch' (seuls les serveurs sous Linux ont besoin du patch).",
  [
    {"meaning": "L'ingénieur qui a déployé le correctif est d'astreinte.", "sentence": "The engineer who deployed the hotfix is on call.", "itContext": "The DevOps engineer who deployed the hotfix is currently on call."},
    {"meaning": "La base de données qui stocke les profils est chiffrée.", "sentence": "The database that stores user profiles is encrypted.", "itContext": "The relational database that stores user profiles is AES-256 encrypted."},
    {"meaning": "Le cluster où s'exécutent les conteneurs est stable.", "sentence": "The cluster where containers run is stable.", "itContext": "The Kubernetes cluster where microservice containers run is stable."},
    {"meaning": "Le serveur principal, qui a été mis à jour, fonctionne bien.", "sentence": "The main server, which was updated last week, is running well.", "itContext": "The main DB server, which was updated last week, is running smoothly."},
    {"meaning": "L'utilisateur dont le compte est bloqué a contacté le support.", "sentence": "The user whose account was locked contacted support.", "itContext": "The admin user whose account was locked contacted tier-2 support."},
    {"meaning": "Le script que vous avez exécuté a nettoyé les tables temporaires.", "sentence": "The script that you executed cleaned the temp tables.", "itContext": "The cleanup script that you executed cleaned the temp tables correctly."},
    {"meaning": "Le datacenter où nous hébergeons les données est certifié ISO.", "sentence": "The datacenter where we host data is ISO certified.", "itContext": "The primary datacenter where we host core data is ISO 27001 certified."}
  ],
  [
    {"word": "relative clause", "level": "B", "domain": "grammar", "example": "Use a relative clause for detail.", "itContext": "Relative clauses clarify component roles in system specs.", "definition": "Proposition apportant des précisions sur un nom", "translation": "proposition relative"},
    {"word": "defining", "level": "B", "domain": "grammar", "example": "A defining clause has no commas.", "itContext": "Defining clauses specify which exact server is concerned.", "definition": "Indispensable à la désignation", "translation": "définissante, restrictive"},
    {"word": "non-defining", "level": "B", "domain": "grammar", "example": "Non-defining uses commas.", "itContext": "Non-defining clauses add extra context surrounded by commas.", "definition": "Apportant une information supplémentaire", "translation": "non-définissante"},
    {"word": "whose", "level": "B", "domain": "grammar", "example": "The user whose account...", "itContext": "The process whose PID is 1024 hung.", "definition": "Indiquant la possession ou l'appartenance", "translation": "dont le / dont la"},
    {"word": "datacenter", "level": "A", "domain": "it", "example": "Hosted in a secure datacenter.", "itContext": "The primary server is located in the Frankfurt datacenter.", "definition": "Centre de données", "translation": "centre de données"},
    {"word": "certified", "level": "B", "domain": "professional", "example": "The facility is certified.", "itContext": "The infrastructure is SOC 2 Type II certified.", "definition": "Ayant une certification officielle", "translation": "certifié"},
    {"word": "comma", "level": "A", "domain": "grammar", "example": "Set off with commas.", "itContext": "Do not use 'that' after a comma in relative clauses.", "definition": "Signe de ponctuation virgule", "translation": "virgule"},
    {"word": "hotfix", "level": "B", "domain": "dev", "example": "Apply the hotfix immediately.", "itContext": "The emergency hotfix resolves the buffer overflow.", "definition": "Correctif urgent en production", "translation": "correctif d'urgence"}
  ],
  [
    {"expression": "in question", "meaning": "dont il s'agit", "difficulty": "B", "example": "The server in question is offline.", "classification": "professional"},
    {"expression": "as mentioned above", "meaning": "comme mentionné ci-dessus", "difficulty": "B", "example": "The rule, as mentioned above, applies to all subnets.", "classification": "professional"},
    {"expression": "which in turn", "meaning": "ce qui à son tour", "difficulty": "C", "example": "The disk filled up, which in turn crashed the DB.", "classification": "it"},
    {"expression": "whose primary role is", "meaning": "dont le rôle principal est", "difficulty": "B", "example": "The proxy, whose primary role is caching, failed.", "classification": "it"},
    {"expression": "that is to say", "meaning": "c'est-à-dire", "difficulty": "B", "example": "The primary node, that is to say Node A, is active.", "classification": "professional"}
  ],
  "WHO (personnes), WHICH/THAT (choses), WHERE (lieux), WHOSE (possession). Defining = pas de virgule (information essentielle). Non-defining = avec virgules (info bonus, pas de 'that').",
  [
    {"type": "multiple_choice", "question": "Choisissez le pronom pour les choses sans virgule : 'The script ___ updates the DB.'", "options": ["that", "who", "where", "whose"], "correctAnswer": "that", "explanation": "That/which pour les choses sans virgule."},
    {"type": "multiple_choice", "question": "Peut-on utiliser 'that' après une virgule ?", "options": ["Non, uniquement which ou who", "Oui, toujours", "Seulement en début de phrase", "Seulement pour les personnes"], correctAnswer: "Non, uniquement which ou who", explanation: "Jamais de 'that' dans une non-defining (avec virgules)."},
    {"type": "fill_blank", "question": "Complétez (possession) : The user ___ password expired cannot log in.", "options": [], "correctAnswer": "whose", "explanation": "Whose = possession (dont le mot de passe)."},
    {"type": "multiple_choice", "question": "Pronom pour un environnement/lieu : 'The cluster ___ pods run is healthy.'", "options": ["where", "which", "whose", "that"], correctAnswer: "where", explanation: "Where = lieu/environnement."}
  ],
  "Propositions relatives : WHO (personnes), WHICH/THAT (choses), WHERE (lieux), WHOSE (possession). Sans virgule = indispensable ; avec virgules = bonus (sans THAT).",
  [
    {"question": "The firewall ___ filters incoming traffic is active.", "options": ["that", "who", "where", "whose"], "correctAnswer": "that", "explanation": "That/which pour un pare-feu (chose)."},
    {"question": "Node A, ___ was rebooted yesterday, is online.", "options": ["which", "that", "where", "who"], "correctAnswer": "which", "explanation": "Après virgule → which (pas that)."},
    {"question": "The datacenter ___ we host nodes is secure.", "options": ["where", "which", "that", "who"], "correctAnswer": "where", "explanation": "Where pour un lieu (datacenter)."},
    {"question": "The admin ___ credentials leaked was suspended.", "options": ["whose", "who", "which", "where"], "correctAnswer": "whose", "explanation": "Whose credentials = dont les identifiants."}
  ],
  [
    {"pattern": "The + Nom + that + Verbe", "example": "The script that runs nightly cleans logs.", "explanation": "Définir précisément quel composant fait l'action."},
    {"pattern": "Nom, which + Verbe, + reste", "example": "Node A, which was patched, is online.", "explanation": "Ajouter un contexte secondaire entre virgules."},
    {"pattern": "The + Nom + where + Sujet + Verbe", "example": "The subnet where pods reside is isolated.", "explanation": "Localiser un composant réseau."}
  ]
),
# ================= LEÇON 145 — N5 Architecture Styles =================
L(145, 25, 5, 5,
  "Comparing System Architecture Styles: Monolith vs Microservices",
  "Comparer des choix d'architecture (Monolithe vs Microservices, Serverless vs IaaS) en utilisant les structures de comparaison avancées et d'argumentation.",
  "Comparer des choix d'architecture technique est une compétence clé pour les ingénieurs et architectes IT. Cela exige un vocabulaire précis d'évaluation et des structures de comparaison contrastives.\n\nEXPRIMER LE CONTRASTE :\n- WHEREAS / WHILE (tandis que) : 'Monoliths are easier to deploy, whereas microservices offer independent scaling.'\n- ON THE OTHER HAND / IN CONTRAST (en revanche) : 'IaaS provides full control; on the other hand, Serverless reduces operational overhead.'\n- UNLIKE (contrairement à) : 'Unlike monolithic databases, distributed databases handle horizontal partitioning natively.'\n\nEXPRIMER LES AVANTAGES ET INCONVÉNIENTS (Pros & Cons) :\n- Trade-off (compromis) : 'The trade-off between consistency and latency.'\n- Drawback / Disadvantage (inconvénient) : 'The main drawback of microservices is network complexity.'\n- Benefit / Advantage (avantage) : 'The primary benefit of Serverless is pay-per-use billing.'\n\nCOMPARAISON AVANCÉE :\n- 'The more decoupled the services are, the easier it is to deploy independently.' (Plus... plus...)\n- 'Microservices are far more resilient than monoliths when designed properly.' (far more + adjectif = bien plus).",
  [
    {"meaning": "Les monolithes sont plus simples à déployer, tandis que les microservices s'étendent indépendamment.", "sentence": "Monoliths are simpler to deploy, whereas microservices scale independently.", itContext: "Monolithic apps are simpler to deploy, whereas microservices scale independently per service."},
    {"meaning": "Contrairement aux bases relationnelles, NoSQL gère le schéma dynamique.", "sentence": "Unlike relational databases, NoSQL handles dynamic schemas natively.", itContext: "Unlike relational DBs, NoSQL databases handle unscripted dynamic schemas natively."},
    {"meaning": "Le principal inconvénient des microservices est la complexité du réseau.", "sentence": "The main drawback of microservices is network complexity.", itContext: "The main drawback of microservices architecture is distributed network latency and tracing."},
    {"meaning": "Plus les services sont découplés, plus le déploiement est rapide.", "sentence": "The more decoupled services are, the faster deployments become.", itContext: "The more decoupled services are, the faster individual CI/CD deployments become."},
    {"meaning": "Le Serverless réduit considérablement la charge d'exploitation.", "sentence": "Serverless significantly reduces operational overhead.", itContext: "Adopting Serverless significantly reduces infrastructure maintenance overhead."},
    {"meaning": "L'IaaS offre un contrôle total ; en revanche, le PaaS accélère le développement.", "sentence": "IaaS provides full control; on the other hand, PaaS speeds up development.", itContext: "IaaS offers full OS control; on the other hand, PaaS accelerates product delivery."},
    {"meaning": "Le compromis réside entre la cohérence des données et la latence réseau.", "sentence": "The trade-off lies between data consistency and network latency.", itContext: "In distributed systems, the trade-off lies between CAP theorem consistency and low latency."}
  ],
  [
    {"word": "monolith", "level": "B", "domain": "dev", "example": "The monolith is legacy.", "itContext": "Migrating the legacy monolith to microservices requires a domain audit.", "definition": "Application en un seul bloc de code", "translation": "monolithe"},
    {"word": "microservices", "level": "B", "domain": "dev", "example": "Microservices communicate via gRPC.", "itContext": "Microservices communicate via REST APIs and event buses.", "definition": "Architecture en services autonomes", "translation": "microservices"},
    {"word": "drawback", "level": "B", "domain": "professional", "example": "The main drawback is cost.", "itContext": "High operational cost is the main drawback of multi-region replication.", "definition": "Inconvénient ou désavantage", "translation": "inconvénient"},
    {"word": "whereas", "level": "C", "domain": "grammar", "example": "Option A is cheap, whereas B is fast.", "itContext": "SQL ensures ACID compliance, whereas NoSQL favors horizontal scale.", "definition": "Tandis que, alors que (opposition)", "translation": "tandis que"},
    {"word": "overhead", "level": "B", "domain": "it", "example": "Reduce management overhead.", "itContext": "Kubernetes introduces initial setup overhead but simplifies management.", "definition": "Charge supplémentaire/surcoût", "translation": "surcoût, charge extra"},
    {"word": "decoupled", "level": "C", "domain": "dev", "example": "Services are loosely decoupled.", "itContext": "Loosely decoupled architectures prevent cascading failures.", "definition": "Indépendant, non fortement lié", "translation": "découplé"},
    {"word": "trade-off", "level": "B", "domain": "it", "example": "Evaluate the trade-off.", "itContext": "Every architectural decision involves a performance vs complexity trade-off.", "definition": "Arbitrage entre deux options", "translation": "compromis, arbitrage"},
    {"word": "resilient", "level": "B", "domain": "it", "example": "The architecture is resilient.", "itContext": "A multi-AZ setup makes the application highly resilient.", "definition": "Résistant aux pannes", "translation": "résilient"}
  ],
  [
    {"expression": "on the other hand", "meaning": "d'un autre côté, en revanche", "difficulty": "B", "example": "PaaS is faster; on the other hand, it is more expensive.", "classification": "professional"},
    {"expression": "pros and cons", "meaning": "pour et contre, avantages et inconvénients", "difficulty": "A", "example": "We weighed the pros and cons before choosing Postgres.", "classification": "professional"},
    {"expression": "unlike traditional systems", "meaning": "contrairement aux systèmes traditionnels", "difficulty": "B", "example": "Unlike traditional VMs, containers launch in seconds.", "classification": "it"},
    {"expression": "the more... the more...", "meaning": "plus... plus...", "difficulty": "C", "example": "The more you automate, the fewer errors occur.", "classification": "professional"},
    {"expression": "far more efficient", "meaning": "bien plus efficace", "difficulty": "B", "example": "Async messaging is far more efficient for heavy tasks.", "classification": "it"}
  ],
  "Mots de contraste : whereas, while, on the other hand, unlike. Vocabulaire d'architecture : trade-off, drawback, benefit, decoupled, overhead, resilient.",
  [
    {"type": "multiple_choice", "question": "Expression de contraste : 'Monoliths are simple, ___ microservices scale better.'", "options": ["whereas", "because", "therefore", "since"], "correctAnswer": "whereas", "explanation": "Whereas = opposition/contraste."},
    {"type": "multiple_choice", "question": "Quel mot désigne un inconvénient d'architecture ?", "options": ["drawback", "asset", "benchmark", "throughput"], "correctAnswer": "drawback", "explanation": "Drawback = inconvénient."},
    {"type": "fill_blank", "question": "Complétez : The ___ (plus) you automate, the less you fail.", "options": [], "correctAnswer": "more", "explanation": "The more... the less..."},
    {"type": "multiple_choice", "question": "Que signifie 'trade-off' ?", "options": ["Compromis/Arbitrage entre options", "Vente d'équipement", "Arrêt système", "Redémarrage"], correctAnswer: "Compromis/Arbitrage entre options", explanation: "Trade-off = arbitrage d'ingénierie."}
  ],
  "Comparer des architectures : whereas/while pour l'opposition, unlike pour la différence. Termes clés : trade-off (arbitrage), drawback (désavantage), overhead (surcoût).",
  [
    {"question": "___ monolithic apps, containers start in seconds.", "options": ["Unlike", "Whereas", "Although", "Despite"], "correctAnswer": "Unlike", "explanation": "Unlike + nom = contrairement à."},
    {"question": "The primary ___ of serverless is auto-scaling.", "options": ["benefit", "drawback", "overhead", "trade-off"], "correctAnswer": "benefit", "explanation": "Benefit = avantage principal."},
    {"question": "The more nodes we add, the ___ resilient we become.", "options": ["more", "most", "much", "many"], "correctAnswer": "more", "explanation": "The more... the more..."},
    {"question": "Multi-region DBs add network ___.", "options": ["latency", "benefit", "asset", "scale"], "correctAnswer": "latency", "explanation": "Surcoût de temps réseau = latency/overhead."}
  ],
  [
    {"pattern": "A is X, whereas B is Y", "example": "PaaS is fast, whereas IaaS gives control.", "explanation": "Opposer deux choix techniques dans une phrase."},
    {"pattern": "Unlike A, B handles Y natively", "example": "Unlike SQL, NoSQL handles dynamic schemas.", "explanation": "Mettre en valeur une différence clé."},
    {"pattern": "The main trade-off is X vs Y", "example": "The main trade-off is security vs performance.", "explanation": "Poser le problème d'ingénierie."}
  ]
),
# ================= LEÇON 146 — N5 Expressing Cause and Effect =================
L(146, 26, 5, 6,
  "Expressing Cause, Effect, and Dependencies in Incident Reports",
  "Exprimer les liens de causalité, conséquences et dépendances avec due to, owing to, result in, lead to, et trigger.",
  "Dans les rapports d'incidents et la documentation technique, expliquer la cause exacte d'une panne et ses conséquences réelles exige de maîtriser les connecteurs de causalité.\n\nEXPRIMER LA CAUSE (Pourquoi c'est arrivé) :\n- DUE TO / OWING TO (+ nom) : 'The outage was due to a hardware failure.' (Due to est suivi d'un groupe nominal).\n- BECAUSE OF (+ nom) : 'The build failed because of a missing dependency.'\n- SINCE / AS (+ proposition S+V) : 'Since the primary server went down, traffic shifted to node B.'\n\nEXPRIMER L'EFFET / LA CONSÉQUENCE (Ce que ça a provoqué) :\n- RESULT IN (+ résultat) : 'The network congestion resulted in dropped packets.' (A provoqué/abouti à).\n- LEAD TO (+ résultat) : 'The memory leak led to a kernel panic.'\n- TRIGGER (+ événement) : 'The high CPU usage triggered an automated alert.' (A déclenché).\n- THEREFORE / AS A RESULT (par conséquent) : 'The disk space reached 100%; as a result, the database stopped accepting writes.'\n\nDISTINCTION CLÉ :\n- CAUSE : 'The incident was caused by X' / 'due to X'.\n- CONSEQUENCE : 'X resulted in Y' / 'X led to Y' / 'X triggered Y'.",
  [
    {"meaning": "La panne était due à une défaillance matérielle.", "sentence": "The outage was due to a hardware failure.", "itContext": "The datacenter outage was due to an unexpected hardware failure in rack 2."},
    {"meaning": "La fuite de mémoire a conduit à un crash du système.", "sentence": "The memory leak led to a system crash.", "itContext": "An unhandled memory leak in the worker process led to a system crash."},
    {"meaning": "L'utilisation élevée du CPU a déclenché une alerte automatique.", "sentence": "High CPU usage triggered an automated alert.", "itContext": "Spiking CPU usage above 95% triggered an automated PagerDuty alert."},
    {"meaning": "La congestion du réseau a entraîné la perte de paquets.", "sentence": "Network congestion resulted in dropped packets.", "itContext": "Heavy internal traffic congestion resulted in dropped network packets."},
    {"meaning": "Puisque le serveur principal est tombé, le trafic a basculé.", "sentence": "Since the primary server failed, traffic shifted to node B.", "itContext": "Since the primary node failed health checks, traffic shifted automatically to node B."},
    {"meaning": "Le disque était plein ; par conséquent, la base s'est arrêtée.", "sentence": "Disk filled up; as a result, the DB stopped accepting writes.", "itContext": "Log disk filled up to 100%; as a result, the DB stopped accepting write transactions."},
    {"meaning": "Une mauvaise configuration a provoqué l'interruption du service.", "sentence": "A misconfiguration resulted in a service disruption.", "itContext": "An invalid BGP route misconfiguration resulted in a 15-minute service disruption."}
  ],
  [
    {"word": "due to", "level": "B", "domain": "grammar", "example": "Due to a bug.", "itContext": "The delay was due to an unhandled null pointer exception.", "definition": "En raison de, causé par (+ nom)", "translation": "dû à, en raison de"},
    {"word": "lead to", "level": "B", "domain": "grammar", "example": "This leads to errors.", "itContext": "Unchecked user inputs lead to SQL injection vulnerabilities.", "definition": "Conduire à, mener à", "translation": "conduire à"},
    {"word": "trigger", "level": "B", "domain": "it", "example": "Trigger an alert.", "itContext": "The threshold breach triggers a cloud lambda function.", "definition": "Déclencher un événement", "translation": "déclencher"},
    {"word": "result in", "level": "B", "domain": "grammar", "example": "Result in data loss.", "itContext": "Hard stopping the instance may result in corrupted tables.", "definition": "Avoir pour résultat de", "translation": "entraîner, résulter en"},
    {"word": "consequence", "level": "B", "domain": "professional", "example": "Understand the consequence.", "itContext": "The consequence of missing the backup window is a risk of data loss.", "definition": "Résultat d'une action", "translation": "conséquence"},
    {"word": "causality", "level": "C", "domain": "professional", "example": "Establish the causality.", "itContext": "Establishing causality is essential in incident RCA reports.", "definition": "Lien de cause à effet", "translation": "causalité"},
    {"word": "as a result", "level": "B", "domain": "grammar", "example": "As a result, we rolled back.", "itContext": "Tests failed; as a result, the deployment pipeline aborted.", "definition": "En conséquence, par conséquent", "translation": "en conséquence"},
    {"word": "disruption", "level": "B", "domain": "it", "example": "A brief service disruption.", "itContext": "The DNS failover caused a 30-second service disruption.", "definition": "Interruption ou perturbation", "translation": "perturbation, interruption"}
  ],
  [
    {"expression": "due to the fact that", "meaning": "en raison du fait que (+ proposition)", "difficulty": "B", "example": "The build failed due to the fact that npm was down.", "classification": "professional"},
    {"expression": "lead to a breakdown", "meaning": "mener à une panne", "difficulty": "B", "example": "Ignoring warnings led to a total system breakdown.", "classification": "it"},
    {"expression": "stem from", "meaning": "provenir de, découler de", "difficulty": "C", "example": "The vulnerability stems from an outdated library.", "classification": "it"},
    {"expression": "as a consequence", "meaning": "par conséquent", "difficulty": "B", "example": "The key leaked; as a consequence, we rotated all tokens.", "classification": "cybersecurity"},
    {"expression": "give rise to", "meaning": "donner naissance à", "difficulty": "C", "example": "The new architecture gave rise to unexpected latency.", "classification": "professional"}
  ],
  "Causalité : DUE TO / BECAUSE OF + Nom (cause). RESULT IN / LEAD TO / TRIGGER + Nom (effet/conséquence). SINCE / AS + Proposition.",
  [
    {"type": "multiple_choice", "question": "Exprimer la cause suivie d'un nom : 'The failure was ___ a network timeout.'", "options": ["due to", "because", "lead to", "result in"], "correctAnswer": "due to", "explanation": "Due to + groupe nominal."},
    {"type": "multiple_choice", "question": "Exprimer la conséquence : 'The memory leak ___ a kernel panic.'", "options": ["led to", "due to", "because of", "since"], "correctAnswer": "led to", "explanation": "Led to (lead to au passé) = a conduit à."},
    {"type": "fill_blank", "question": "Complétez : High load ___ (déclencher) the autoscaler.", "options": [], "correctAnswer": "triggered", "explanation": "Triggered = a déclenché."},
    {"type": "multiple_choice", "question": "Différence entre 'due to' et 'result in' :", "options": ["Due to introduit la cause ; Result in introduit la conséquence", "C'est la même chose", "Due to est pour le futur", "Result in est une préposition de lieu"], correctAnswer: "Due to introduit la cause ; Result in introduit la conséquence", explanation: "Cause (due to) vs Conséquence (result in)."}
  ],
  "DUE TO / BECAUSE OF = Cause (+ Nom). LEAD TO / RESULT IN / TRIGGER = Effet/Conséquence. AS A RESULT / THEREFORE = Connecteur de conclusion.",
  [
    {"question": "The outage stemmed ___ an expired TLS certificate.", "options": ["from", "to", "in", "by"], "correctAnswer": "from", "explanation": "Stem from = provenir de."},
    {"question": "The high error rate resulted ___ automatic rollback.", "options": ["in", "to", "from", "on"], "correctAnswer": "in", "explanation": "Result in = entraîner."},
    {"question": "___ the primary node failed, traffic shifted to node B.", "options": ["Since", "Due to", "Resulting", "Owing"], "correctAnswer": "Since", "explanation": "Since + proposition (S+V)."},
    {"question": "The security breach gave rise ___ new compliance rules.", "options": ["to", "for", "in", "with"], "correctAnswer": "to", "explanation": "Give rise to = donner lieu à."}
  ],
  [
    {"pattern": "The X was due to + Nom", "example": "The outage was due to a bad config.", "explanation": "Expliquer la cause racine."},
    {"pattern": "X led to / resulted in + Nom", "example": "The memory leak led to a crash.", "explanation": "Expliquer la conséquence technique."},
    {"pattern": "Since S+V, S+V", "example": "Since the server failed, traffic shifted.", "explanation": "Lier cause et effet dans une phrase."}
  ]
),
# ================= LEÇON 147 — N5 Adverbs of Degree =================
L(147, 27, 5, 7,
  "Adverbs of Degree and Precision in Performance Reviews",
  "Nuancer et mesurer des résultats techniques avec des adverbes d'intensité (significantly, substantially, marginally, barely, slightly).",
  "Dans les rapports de performance, les revues d'architecture et les évaluations d'ingénierie, l'imprécision est bannie. Utiliser des adverbes de degré permet de quantifier avec exactitude l'impact d'une amélioration ou d'une dégradation.\n\nADVERBES DE FORT IMPACT (Amélioration/Changement majeur) :\n- SIGNIFICANTLY / SUBSTANTIALLY : 'Response times improved significantly after indexing.' (Fort impact positif).\n- DRAMATICALLY / DRASTICALLY : 'Memory usage dropped dramatically.' (Changement spectaculaire).\n- VASTLY : 'The new pipeline is vastly superior to the legacy build.'\n\nADVERBES DE FAIBLE IMPACT (Changement mineur) :\n- SLIGHTLY / MARGINALLY : 'Throughput increased slightly by 2%.' (Faible variation).\n- BARELY / HARDLY : 'The CPU load barely changed.' (Presque aucune modification).\n\nADVERBES DE PRÉCISION ET CERTITUDE :\n- STRICTLY / RIGOROUSLY : 'Access is strictly limited to authorized personnel.'\n- PRECISELY / EXACTLY : 'The outage started precisely at 14:02:15 UTC.'\n- CONSISTENTLY : 'The service consistently delivers under 50ms latency.'\n\nPOSITION DANS LA PHRASE :\n- Devant l'adjectif ou l'adverbe : 'It is significantly faster'.\n- Après le verbe intransitif ou l'objet : 'Latency decreased substantially'.\n- Entre l'auxiliaire et le verbe : 'The query has dramatically improved'.",
  [
    {"meaning": "Les temps de réponse se sont améliorés de manière significative.", "sentence": "Response times improved significantly after indexing.", "itContext": "P99 response times improved significantly from 400ms to 45ms after indexing."},
    {"meaning": "L'utilisation de la mémoire a chuté de façon spectaculaire.", "sentence": "Memory usage dropped dramatically.", "itContext": "Memory usage dropped dramatically after fixing the resource leak."},
    {"meaning": "Le débit a légèrement augmenté de 2%.", "sentence": "Throughput increased slightly by 2%.", "itContext": "Throughput increased slightly by 2%, which is within normal variance."},
    {"meaning": "L'accès est strictement limité au personnel autorisé.", "sentence": "Access is strictly limited to authorized personnel.", "itContext": "Production SSH access is strictly limited to authorized SRE personnel."},
    {"meaning": "La panne a commencé exactement à 14h02 UTC.", "sentence": "The outage started precisely at 14:02:15 UTC.", "itContext": "The cluster outage started precisely at 14:02:15 UTC according to NTP logs."},
    {"meaning": "Le service fournit régulièrement une latence sous les 50ms.", "sentence": "The service consistently delivers under 50ms latency.", "itContext": "The Redis cache consistently delivers under 5ms latency under peak load."},
    {"meaning": "La charge du CPU a à peine changé.", "sentence": "The CPU load barely changed.", "itContext": "The CPU load barely changed during the stress test execution."}
  ],
  [
    {"word": "significantly", "level": "B", "domain": "professional", "example": "Improved significantly.", "itContext": "Performance improved significantly following the query optimization.", "definition": "De manière importante et mesurable", "translation": "significativement"},
    {"word": "dramatically", "level": "B", "domain": "professional", "example": "Dropped dramatically.", "itContext": "Error rates dropped dramatically after the hotfix release.", "definition": "De façon spectaculaire", "translation": "spectaculairement"},
    {"word": "slightly", "level": "A", "domain": "professional", "example": "Increased slightly.", "itContext": "Latency increased slightly during peak business hours.", "definition": "De manière légère, un peu", "translation": "légèrement"},
    {"word": "marginally", "level": "B", "domain": "professional", "example": "Better marginally.", "itContext": "The new algorithm is only marginally faster than the old one.", "definition": "De façon minime, à la marge", "translation": "marginalement"},
    {"word": "precisely", "level": "B", "domain": "professional", "example": "At 14:00 precisely.", "itContext": "The Cron job triggers precisely on the hour.", "definition": "Avec une précision exacte", "translation": "précisément"},
    {"word": "consistently", "level": "B", "domain": "professional", "example": "Consistently fast.", "itContext": "The API consistently meets its 99.9% uptime SLA.", "definition": "De façon constante et régulière", "translation": "régulièrement, de façon constante"},
    {"word": "barely", "level": "B", "domain": "grammar", "example": "Barely noticeable.", "itContext": "The failover delay was barely noticeable to active web users.", "definition": "À peine, tout juste", "translation": "à peine"},
    {"word": "substantially", "level": "C", "domain": "professional", "example": "Reduced substantially.", "itContext": "Cloud infrastructure costs were reduced substantially.", "definition": "Considérablement, fortement", "translation": "substantiellement, considérablement"}
  ],
  [
    {"expression": "substantially lower", "meaning": "considérablement plus bas", "difficulty": "B", "example": "Costs are substantially lower in the cloud.", "classification": "professional"},
    {"expression": "consistently high", "meaning": "constamment élevé", "difficulty": "B", "example": "Throughput remained consistently high during the test.", "classification": "it"},
    {"expression": "strictly prohibited", "meaning": "strictement interdit", "difficulty": "A", "example": "Root login over SSH is strictly prohibited.", "classification": "cybersecurity"},
    {"expression": "marginally better", "meaning": "à peine meilleur", "difficulty": "B", "example": "The new version is only marginally better.", "classification": "professional"},
    {"expression": "drastically reduced", "meaning": "drastiquement réduit", "difficulty": "B", "example": "Vulnerabilities were drastically reduced after audit.", "classification": "cybersecurity"}
  ],
  "Adverbes de degré : Fort impact (significantly, substantially, dramatically). Faible impact (slightly, marginally, barely). Précision (precisely, consistently, strictly).",
  [
    {"type": "multiple_choice", "question": "Quel adverbe exprime un fort impact positif ?", "options": ["significantly", "marginally", "slightly", "barely"], "correctAnswer": "significantly", "explanation": "Significantly = de manière importante."},
    {"type": "multiple_choice", "question": "Quel adverbe signifie 'à peine' ?", "options": ["barely", "dramatically", "substantially", "precisely"], "correctAnswer": "barely", "explanation": "Barely = à peine."},
    {"type": "fill_blank", "question": "Complétez : SSH access is ___ (strictement) prohibited.", "options": [], "correctAnswer": "strictly", "explanation": "Strictly = strictement."},
    {"type": "multiple_choice", "question": "Où se place l'adverbe dans 'It is ___ faster' ?", "options": ["Avant l'adjectif", "Après la phrase", "Avant le sujet", "Nulle part"], correctAnswer: "Avant l'adjectif", explanation: "Exemple : significantly faster."}
  ],
  "Adverbes d'intensité : significantly / substantially (fort), slightly / marginally (faible), consistently (régulier), strictly (rigueur).",
  [
    {"question": "Memory usage dropped ___ after the patch.", "options": ["dramatically", "slight", "marginal", "bare"], "correctAnswer": "dramatically", "explanation": "Dramatically = de façon spectaculaire."},
    {"question": "The API ___ meets the SLA requirement.", "options": ["consistently", "consistent", "consisted", "consist"], "correctAnswer": "consistently", "explanation": "Consistently = de manière régulière."},
    {"question": "The speed gain was only ___ higher (+0.5%).", "options": ["marginally", "substantially", "dramatically", "vastly"], "correctAnswer": "marginally", "explanation": "Marginally = gain minime à la marge."},
    {"question": "Root access is ___ restricted to admins.", "options": ["strictly", "slight", "barely", "marginal"], "correctAnswer": "strictly", "explanation": "Strictly = strictement."}
  ],
  [
    {"pattern": "improved / dropped + adverbe fort", "example": "Latency dropped significantly.", "explanation": "Quantifier un progrès majeur."},
    {"pattern": "adverbe + adjectif comparatif", "example": "It is vastly superior to v1.", "explanation": "Appuyer une comparaison technique."},
    {"pattern": "strictly + participe passé", "example": "Access is strictly prohibited.", "explanation": "Formuler une règle rigide de sécurité."}
  ]
),
# ================= LEÇON 148 — N5 Risk Mitigation =================
L(148, 28, 5, 8,
  "Formulating Technical Hypotheses and Risk Mitigation Strategies",
  "Formuler des hypothèses d'incidents et élaborer des stratégies de réduction des risques (mitigation, failover, fallback, isolation).",
  "Face à une panne ou un projet d'architecture critique, la gestion des risques impose de savoir formuler des hypothèses testables et des plans d'atténuation structurés.\n\nFORMULER UNE HYPOTHÈSE (Hypothesizing) :\n- 'Assuming that the database is down, how will the frontend react?' (En supposant que...)\n- 'Our working hypothesis is that a race condition causes the deadlock.' (Notre hypothèse de travail est que...)\n- 'It is plausible that the token expired during transit.' (Il est plausible que...)\n\nSTRATÉGIES DE MITIGATION (Risk Mitigation) :\n- FAILOVER (basculement automatique) : 'In case of node failure, the DNS failover directs traffic to Region B.'\n- FALLBACK (solution de secours) : 'If the primary API times out, the system uses local cache as a fallback.'\n- CIRCUIT BREAKER (disjoncteur applicatif) : 'The circuit breaker trips to prevent cascading failures.'\n- ISOLATION / BULKHEAD (cloisonnement) : 'Isolating tenant data prevents cross-customer impact.'\n\nEXPRIMER LA PRÉVENTION ET LE RECUL :\n- 'To mitigate the risk of data loss, we enforce WAL archiving.'\n- 'As a contingency plan, we maintain a warm standby instance.'\n- 'In the event of a breach, automated isolation takes effect instantly.'",
  [
    {"meaning": "En supposant que la base soit hors ligne, comment réagit le frontend ?", "sentence": "Assuming that the database is down, how will the frontend react?", "itContext": "Assuming that the master database is down, how does the frontend handle write requests?"},
    {"meaning": "Notre hypothèse de travail est qu'une race condition cause le blocage.", "sentence": "Our working hypothesis is that a race condition causes the deadlock.", "itContext": "Our working hypothesis is that a race condition in thread pooling causes the deadlock."},
    {"meaning": "En cas de défaillance du nœud, le basculement redirige le trafic.", "sentence": "In case of node failure, failover redirects traffic.", "itContext": "In case of primary node failure, multi-region failover redirects traffic in 5 seconds."},
    {"meaning": "Si l'API principale expire, le système utilise le cache de secours.", "sentence": "If the primary API times out, the system uses cache as a fallback.", "itContext": "If the payment API times out, the system uses local Redis cache as a fallback."},
    {"meaning": "Le disjoncteur saute pour éviter les pannes en cascade.", "sentence": "The circuit breaker trips to prevent cascading failures.", "itContext": "The circuit breaker trips automatically to prevent cascading failures across microservices."},
    {"meaning": "Pour atténuer le risque de perte de données, nous appliquons l'archivage.", "sentence": "To mitigate the risk of data loss, we enforce WAL archiving.", "itContext": "To mitigate the risk of data loss, we enforce continuous WAL archiving to cloud storage."},
    {"meaning": "Comme plan de secours, nous maintenons une instance passive.", "sentence": "As a contingency plan, we maintain a warm standby instance.", "itContext": "As a contingency plan, we maintain a warm standby instance in the secondary region."}
  ],
  [
    {"word": "mitigation", "level": "B", "domain": "cybersecurity", "example": "Apply risk mitigation.", "itContext": "Risk mitigation strategies reduce potential attack surface.", "definition": "Atténuation ou réduction d'un risque", "translation": "atténuation"},
    {"word": "hypothesis", "level": "B", "domain": "professional", "example": "Formulate a hypothesis.", "itContext": "The engineering team formulated three hypotheses for the memory spike.", "definition": "Proposition d'explication à tester", "translation": "hypothèse"},
    {"word": "failover", "level": "B", "domain": "it", "example": "Automatic failover engaged.", "itContext": "Automatic failover switched traffic to standby database in 3 seconds.", "definition": "Basculement automatique sur système de secours", "translation": "basculement, failover"},
    {"word": "fallback", "level": "B", "domain": "it", "example": "Use cache as fallback.", "itContext": "The static error page serves as a fallback when backend is unreachable.", "definition": "Solution ou mode dégradé de secours", "translation": "solution de secours, fallback"},
    {"word": "contingency", "level": "C", "domain": "professional", "example": "Prepare a contingency plan.", "itContext": "The IT director approved the disaster recovery contingency plan.", "definition": "Événement imprévu / plan de secours", "translation": "éventualité, secours"},
    {"word": "cascading", "level": "C", "domain": "it", "example": "Prevent cascading failures.", "itContext": "Cascading failures occur when one downed node overloads others.", "definition": "Qui se propage en chaîne", "translation": "en cascade"},
    {"word": "standby", "level": "B", "domain": "it", "example": "A warm standby server.", "itContext": "The warm standby database is synchronized in near real-time.", "definition": "En attente, prêt à prendre le relais", "translation": "en attente, standby"},
    {"word": "isolation", "level": "B", "domain": "cybersecurity", "example": "Network isolation active.", "itContext": "Container isolation prevents malicious code from accessing host kernel.", "definition": "Séparation stricte des environnements", "translation": "isolation, cloisonnement"}
  ],
  [
    {"expression": "working hypothesis", "meaning": "hypothèse de travail", "difficulty": "B", "example": "Our working hypothesis is a memory leak.", "classification": "professional"},
    {"expression": "contingency plan", "meaning": "plan d'urgence / secours", "difficulty": "B", "example": "Always prepare a contingency plan before major migrations.", "classification": "professional"},
    {"expression": "cascading failure", "meaning": "panne en cascade", "difficulty": "C", "example": "Rate limiting prevents a cascading failure across microservices.", "classification": "it"},
    {"expression": "single point of failure", "meaning": "point de défaillance unique (SPOF)", "difficulty": "B", "example": "Eliminate any single point of failure in the cluster.", "classification": "it"},
    {"expression": "in the event of", "meaning": "en cas de", "difficulty": "B", "example": "In the event of a breach, isolate the network segment.", "classification": "cybersecurity"}
  ],
  "Gestion du risque : Formuler une hypothèse (Assuming that, Working hypothesis). Solutions techniques : failover (basculement), fallback (mode dégradé), standby (secours), mitigation.",
  [
    {"type": "multiple_choice", "question": "Qu'est-ce qu'un 'failover' ?", "options": ["Basculement automatique sur un serveur de secours", "Arrêt total du système", "Une attaque par déni de service", "Un effacement de logs"], "correctAnswer": "Basculement automatique sur un serveur de secours", "explanation": "Failover = basculement automatique."},
    {"type": "multiple_choice", "question": "Formuler une hypothèse : '___ that the DB is down, what happens?'", "options": ["Assuming", "Confirming", "Proving", "Deciding"], "correctAnswer": "Assuming", "explanation": "Assuming that... = En supposant que..."},
    {"type": "fill_blank", "question": "Complétez : Prepare a ___ plan (plan de secours) for the release.", "options": [], "correctAnswer": "contingency", "explanation": "Contingency plan = plan de secours/urgence."},
    {"type": "multiple_choice", "question": "Que signifie 'single point of failure' (SPOF) ?", "options": ["Équipement unique dont la panne arrête tout le système", "Une alerte mineure", "Un mot de passe faible", "Une erreur de syntaxe"], correctAnswer: "Équipement unique dont la panne arrête tout le système", explanation: "SPOF = point de défaillance unique."}
  ],
  "Hypothèses : Assuming that, Working hypothesis. Réponses techniques : Failover (basculement), Fallback (mode dégradé), Contingency plan (plan d'urgence), Single point of failure (SPOF).",
  [
    {"question": "Our working ___ is a memory leak in worker 2.", "options": ["hypothesis", "hypotenuse", "hyperbole", "hysteria"], "correctAnswer": "hypothesis", "explanation": "Hypothèse de travail = working hypothesis."},
    {"question": "To avoid a single point of failure, we added a ___ node.", "options": ["standby", "standard", "static", "sticky"], "correctAnswer": "standby", "explanation": "Standby node = nœud en attente/secours."},
    {"question": "In the ___ of a cyber incident, notify the CISO.", "options": ["event", "action", "fact", "cause"], "correctAnswer": "event", "explanation": "In the event of = en cas de."},
    {"question": "The circuit breaker prevents ___ failures.", "options": ["cascading", "casting", "catching", "canceling"], "correctAnswer": "cascading", "explanation": "Cascading failures = pannes en cascade."}
  ],
  [
    {"pattern": "Assuming that + S + V, how will...?", "example": "Assuming that API A fails, how will B react?", "explanation": "Poser un scénario de défaillance à tester."},
    {"pattern": "In case of + Nom, automatic failover + V", "example": "In case of failure, failover routes to region B.", "explanation": "Décrire la réponse automatique du système."},
    {"pattern": "To mitigate the risk of X, we enforce Y", "example": "To mitigate risk of breach, we enforce MFA.", "explanation": "Justifier une mesure de sécurité."}
  ]
),
# ================= LEÇON 149 — N5 SLA & Contract Negotiations =================
L(149, 29, 5, 9,
  "Negotiating Deadlines, Trade-offs and SLA Commitments",
  "Négocier des objectifs de niveau de service (SLA, SLO, RTO, RPO), des compromis techniques et des engagements de livraison.",
  "Dans les rôles d'ingénieur senior, lead dev ou architecte, négocier des engagements de niveau de service (SLA - Service Level Agreement) et des objectifs de rétablissement (RTO/RPO) avec le management ou les clients nécessite un langage de précision absolue.\n\nCONCEPTS CLÉS DE NÉGOCIATION IT :\n- SLA (Service Level Agreement) : Engagement contractuel officiel (ex. 99.9% d'uptime).\n- SLO (Service Level Objective) : Cible interne mesurée par l'équipe d'ingénierie.\n- RTO (Recovery Time Objective) : Durée maximale d'interruption tolérée (temps de rétablissement).\n- RPO (Recovery Point Objective) : Quantité maximale de perte de données tolérée (mesurée en temps).\n- MARGIN OF ERROR / ERROR BUDGET : Marge d'erreur ou budget d'erreur toléré avant gel des déploiements.\n\nFORMULES DE NÉGOCIATION ET DE COMPROMIS :\n- 'We can commit to 99.9% uptime, but 99.99% requires multi-region infrastructure.' (Poser la limite coût/faisabilité).\n- 'Lowering the RTO from 1 hour to 5 minutes will triple the infrastructure budget.' (Expliciter le surcoût de l'exigence).\n- 'If we prioritize latency, we must accept eventually consistent database reads.' (Lier le choix technique au compromis).\n- 'Let us agree on a phased rollout to mitigate risk during launch.' (Proposer un compromis par étapes).",
  [
    {"meaning": "Nous pouvons nous engager sur un temps d'accès de 99,9%.", "sentence": "We can commit to 99.9% uptime.", "itContext": "We can commit to 99.9% uptime under the standard support contract tier."},
    {"meaning": "Abaisser le RTO à 5 minutes triplera le budget infrastructure.", "sentence": "Lowering RTO to 5 minutes will triple the budget.", "itContext": "Lowering the RTO from 1 hour to 5 minutes will triple the cloud infrastructure budget."},
    {"meaning": "Si nous priorisons la latence, nous devons accepter la cohérence à terme.", "sentence": "If we prioritize latency, we must accept eventual consistency.", "itContext": "If we prioritize global read latency, we must accept eventual consistency across regions."},
    {"meaning": "Mettons-nous d'accord sur un déploiement progressif.", "sentence": "Let us agree on a phased rollout.", "itContext": "Let us agree on a phased rollout using canary deployments to manage risk."},
    {"meaning": "Le budget d'erreur pour ce trimestre est épuisé.", "sentence": "The error budget for this quarter is exhausted.", "itContext": "Our SLO error budget for this quarter is exhausted, so feature deployments are frozen."},
    {"meaning": "Quel est le RPO cible pour la base de données de production ?", "sentence": "What is the target RPO for the production database?", "itContext": "What is the target RPO for the production database: zero data loss or 15 minutes?"},
    {"meaning": "Ce compromis garantit la stabilité au détriment de la vitesse.", "sentence": "This trade-off ensures stability at the expense of speed.", "itContext": "This architecture trade-off ensures system stability at the expense of feature velocity."}
  ],
  [
    {"word": "SLA", "level": "B", "domain": "it", "example": "The SLA guarantees 99.9%.", "itContext": "Breaching the SLA results in financial penalty credits to the customer.", "definition": "Accord de niveau de service contractuel", "translation": "SLA, contrat de service"},
    {"word": "commit", "level": "B", "domain": "professional", "example": "We cannot commit to Friday.", "itContext": "We can commit to delivering the core API by the end of Sprint 4.", "definition": "S'engager formellement", "translation": "s me s'engager"},
    {"word": "RTO", "level": "C", "domain": "it", "example": "RTO is 2 hours.", "itContext": "The disaster recovery plan defines an RTO of less than 15 minutes.", "definition": "Temps maximal de coupure accepté (Recovery Time Objective)", "translation": "durée maximale d'interruption (RTO)"},
    {"word": "RPO", "level": "C", "domain": "it", "example": "RPO is zero.", "itContext": "Achieving an RPO of zero requires synchronous multi-AZ writes.", "definition": "Perte maximale de données acceptée (Recovery Point Objective)", "translation": "perte de données maximale admise (RPO)"},
    {"word": "penalty", "level": "B", "domain": "professional", "example": "Avoid SLA penalties.", "itContext": "Unplanned outages trigger financial penalties under section 4 of the contract.", "definition": "Pénalité financière ou contractuelle", "translation": "pénalité"},
    {"word": "phased", "level": "B", "domain": "professional", "example": "A phased rollout.", "itContext": "A phased rollout over three weeks minimizes customer impact.", "definition": "Réalisé par étapes successives", "translation": "échelonné, par phases"},
    {"word": "exhausted", "level": "B", "domain": "professional", "example": "The budget is exhausted.", "itContext": "When the error budget is exhausted, all teams focus on reliability.", "definition": "Épuisé, totalement consommé", "translation": "épuisé"},
    {"word": "velocity", "level": "C", "domain": "dev", "example": "Sprint velocity is high.", "itContext": "Technical debt reduces team feature velocity over time.", "definition": "Vitesse de livraison de fonctionnalités", "translation": "vélocité, vitesse de production"}
  ],
  [
    {"expression": "error budget", "meaning": "budget d'erreur (SRE)", "difficulty": "C", "example": "We have 0.1% error budget left this month.", "classification": "it"},
    {"expression": "at the expense of", "meaning": "au détriment de", "difficulty": "B", "example": "We achieved high speed at the expense of security.", "classification": "professional"},
    {"expression": "financial penalty", "meaning": "pénalité financière", "difficulty": "B", "example": "SLA breaches result in financial penalties.", "classification": "professional"},
    {"expression": "commit to a date", "meaning": "s'engager sur une date", "difficulty": "A", "example": "Do not commit to a date before scope refinement.", "classification": "professional"},
    {"expression": "eventual consistency", "meaning": "cohérence à terme (SGBD)", "difficulty": "C", "example": "NoSQL databases use eventual consistency for high throughput.", "classification": "it"}
  ],
  "Négociation de SLA : SLA (contrat), SLO (objectif interne), RTO (temps de coupure), RPO (perte de données). Formules : We can commit to X, but Y requires Z.",
  [
    {"type": "multiple_choice", "question": "Que mesure le RTO (Recovery Time Objective) ?", "options": ["Le temps maximal d'interruption toléré", "La quantité de données perdues", "Le coût du serveur", "Le nombre d'utilisateurs"], correctAnswer: "Le temps maximal d'interruption toléré", explanation: "RTO = durée de coupure maximale."},
    {"type": "multiple_choice", "question": "Que mesure le RPO (Recovery Point Objective) ?", "options": ["La perte maximale de données tolérée (ex. 5 min de données)", "La vitesse du processeur", "Le temps de réponse du site", "Le salaire de l'ingénieur"], correctAnswer: "La perte maximale de données tolérée (ex. 5 min de données)", explanation: "RPO = perte de données en temps."},
    {"type": "fill_blank", "question": "Complétez : We can ___ (s'engager) to 99.9% uptime.", "options": [], "correctAnswer": "commit", "explanation": "Commit to = s'engager sur."},
    {"type": "multiple_choice", "question": "Que se passe-t-il quand l'Error Budget est épuisé en SRE ?", "options": ["Les déploiements de features sont gelés au profit de la fiabilité", "On supprime le projet", "On augmente les prix", "Rien ne se passe"], correctAnswer: "Les déploiements de features sont gelés au profit de la fiabilité", explanation: "Priorité absolue à la stabilité."}
  ],
  "SLA & Négociation : SLA/SLO (engagements de service), RTO (durée de panne max), RPO (perte de données max). Expression : We can commit to X, but Y requires Z.",
  [
    {"question": "Lowering RTO from 1 hour to 1 minute will ___ the cost.", "options": ["multiply", "commit", "exhaust", "breach"], "correctAnswer": "multiply", "explanation": "Réduire le RTO augmente fortement les coûts."},
    {"question": "The team reached high speed at the ___ of testing quality.", "options": ["expense", "costing", "penalty", "budget"], "correctAnswer": "expense", "explanation": "At the expense of = au détriment de."},
    {"question": "SLA breaches trigger financial ___.", "options": ["penalties", "promises", "performances", "promotions"], "correctAnswer": "penalties", "explanation": "Penalties = pénalités contractuelles."},
    {"question": "The database uses eventual ___ across regions.", "options": ["consistency", "constancy", "consequence", "constitution"], "correctAnswer": "consistency", "explanation": "Eventual consistency = cohérence à terme."}
  ],
  [
    {"pattern": "We can commit to X, but Y requires Z", "example": "We commit to 99.9%, but 99.99% requires multi-AZ.", "explanation": "Poser les limites de l'engagement technique."},
    {"pattern": "Lowering RTO/RPO will increase X by Y", "example": "Lowering RPO will increase cloud storage by 50%.", "explanation": "Expliquer le coût d'une exigence client."},
    {"pattern": "At the expense of + Nom", "example": "We optimized speed at the expense of memory.", "explanation": "Mettre en évidence les arbitrages d'ingénierie."}
  ]
),
# ================= LEÇON 150 — N5 Incident Timelines and RCA =================
L(150, 30, 5, 10,
  "Writing Comprehensive Incident Timelines and Root Cause Analyses (RCA)",
  "Rédiger des chronologies d'incidents détaillées et des rapports de cause racine (RCA) structurés avec précision temporelle et technique.",
  "La rédaction de rapports d'Analyse de Cause Racine (Root Cause Analysis - RCA) et de chronologies d'incidents (Incident Timelines) est une compétence indispensable pour tout ingénieur informatique et spécialiste en cybersécurité.\n\nSTRUCTURE D'UN RAPPORT RCA PROFESSIONNEL :\n1. Executive Summary (Résumé managérial) : synthétise l'impact, la durée et la résolution en 3 phrases.\n2. Incident Timeline (Chronologie horodatée) : liste exacte des événements au format UTC (Detection, Triage, Mitigation, Resolution).\n3. Root Cause (Cause racine) : explication technique exacte de la défaillance initiale (dérive de config, fuite mémoire, attaque par déni de service).\n4. Impact (Impact mesuré) : nombre d'utilisateurs touchés, requêtes échouées, pertes financières ou de données.\n5. Action Items / Preventative Measures (Plan d'action correctif) : liste de tickets assignés pour éviter toute récidive.\n\nMARQUEURS DE TEMPS PRÉCIS (Horodatage UTC) :\n- '08:14 UTC - Automated alert triggered for high error rate.'\n- '08:22 UTC - On-call engineer acknowledged the incident and initiated triage.'\n- '08:45 UTC - Mitigation applied by disabling feature flag X.'\n- '09:10 UTC - Full service restoration confirmed via synthetic monitoring.'",
  [
    {"meaning": "À 08h14 UTC, une alerte automatique s'est déclenchée pour taux d'erreur élevé.", "sentence": "08:14 UTC - Automated alert triggered for high error rate.", "itContext": "08:14 UTC - Automated Datadog alert triggered for high HTTP 500 error rate."},
    {"meaning": "À 08h22 UTC, l'ingénieur d'astreinte a pris en compte l'incident.", "sentence": "08:22 UTC - On-call engineer acknowledged the incident.", "itContext": "08:22 UTC - On-call SRE engineer acknowledged the incident in PagerDuty."},
    {"meaning": "À 08h45 UTC, la mesure d'atténuation a été appliquée en désactivant le flag.", "sentence": "08:45 UTC - Mitigation applied by disabling feature flag X.", "itContext": "08:45 UTC - Mitigation applied by disabling feature flag 'new-checkout' in LaunchDarkly."},
    {"meaning": "À 09h10 UTC, la restauration complète du service a été confirmée.", "sentence": "09:10 UTC - Full service restoration confirmed via monitoring.", "itContext": "09:10 UTC - Full service restoration confirmed via synthetic API end-to-end monitoring."},
    {"meaning": "La cause racine résidait dans une dérive de configuration IAM.", "sentence": "The root cause was identified as an IAM configuration drift.", "itContext": "The root cause was identified as an unapproved IAM permission configuration drift."},
    {"meaning": "L'incident a affecté 12% des requêtes entrantes pendant 56 minutes.", "sentence": "The incident affected 12% of incoming requests for 56 minutes.", "itContext": "The incident affected 12% of incoming API requests for a duration of 56 minutes."},
    {"meaning": "Les mesures préventives incluent l'ajout de tests de régression automatisés.", "sentence": "Preventative measures include adding automated regression tests.", "itContext": "Preventative action items include adding automated CI regression tests before release."}
  ],
  [
    {"word": "RCA", "level": "B", "domain": "it", "example": "Publish the RCA report.", "itContext": "The CISO reviewed the post-incident RCA report before the board meeting.", "definition": "Rapport d'analyse de cause racine (Root Cause Analysis)", "translation": "analyse de cause racine (RCA)"},
    {"word": "timeline", "level": "A", "domain": "it", "example": "Build the incident timeline.", "itContext": "The incident timeline records all timestamped events in UTC.", "definition": "Chronologie horodatée des événements", "translation": "chronologie"},
    {"word": "acknowledge", "level": "B", "domain": "it", "example": "Acknowledge the alert.", "itContext": "The engineer on call must acknowledge PagerDuty alerts within 5 minutes.", "definition": "Prendre en compte, accuser réception", "translation": "accuser réception, prendre en compte"},
    {"word": "triage", "level": "B", "domain": "it", "example": "Start incident triage.", "itContext": "Triage determines the severity level and assigns initial responders.", "definition": "Analyse et qualification initiale de gravité", "translation": "qualification, triage"},
    {"word": "restoration", "level": "B", "domain": "it", "example": "Confirm service restoration.", "itContext": "Full service restoration was verified across all three cloud availability zones.", "definition": "Rétablissement complet du service", "translation": "rétablissement, restauration"},
    {"word": "synthetic", "level": "C", "domain": "it", "example": "Synthetic monitoring passed.", "itContext": "Synthetic HTTP monitoring probes verify uptime every 60 seconds.", "definition": "Simulation automatique d'utilisation", "translation": "synthétique, simulé"},
    {"word": "preventative", "level": "B", "domain": "professional", "example": "Preventative action items.", "itContext": "Preventative action items eliminate recurring architectural vulnerabilities.", "definition": "Destiné à éviter la récidive", "translation": "préventif"},
    {"word": "drift", "level": "C", "domain": "it", "example": "Infrastructure configuration drift.", "itContext": "Configuration drift between staging and production led to the deployment failure.", "definition": "Écart progressif non documenté", "translation": "dérive, écart de configuration"}
  ],
  [
    {"expression": "root cause analysis", "meaning": "analyse des causes racines (RCA)", "difficulty": "B", "example": "Complete the root cause analysis within 48 hours.", "classification": "it"},
    {"expression": "incident timeline", "meaning": "chronologie d'incident", "difficulty": "A", "example": "The incident timeline must include exact UTC timestamps.", "classification": "it"},
    {"expression": "action item", "meaning": "action corrective / tâche à réaliser", "difficulty": "A", "example": "Assign each action item to an owner with a deadline.", "classification": "professional"},
    {"expression": "full restoration", "meaning": "rétablissement complet", "difficulty": "A", "example": "Full restoration was achieved at 10:30 UTC.", "classification": "it"},
    {"expression": "configuration drift", "meaning": "dérive de configuration", "difficulty": "C", "example": "Terraform detects configuration drift automatically.", "classification": "it"}
  ],
  "Rapport RCA : 1) Executive Summary, 2) UTC Timeline, 3) Root Cause, 4) Impact, 5) Preventative Action Items. Termes : acknowledge, triage, mitigation, restoration, drift.",
  [
    {"type": "multiple_choice", "question": "Format d'horodatage recommandé dans un RCA :", "options": ["Heure locale avec fuseau variable", "Horodatage UTC unifié (ex. 08:14 UTC)", "Pas d'horodatage nécessaire", "Heure du client uniquement"], correctAnswer: "Horodatage UTC unifié (ex. 08:14 UTC)", explanation: "L'UTC est la référence internationale unifiée."},
    {"type": "multiple_choice", "question": "Que signifie 'acknowledge an alert' ?", "options": ["Prendre en compte l'alerte pour démarrer l'intervention", "Ignorer l'alerte", "Supprimer les logs", "Fermer le serveur"], correctAnswer: "Prendre en compte l'alerte pour démarrer l'intervention", explanation: "Acknowledge = accuser réception/prendre en charge."},
    {"type": "fill_blank", "question": "Complétez : Preventative ___ items (actions correctives) prevent recurrence.", "options": [], "correctAnswer": "action", "explanation": "Action items = tâches à réaliser."},
    {"type": "multiple_choice", "question": "Qu'est-ce que la 'configuration drift' ?", "options": ["Dérive entre la config théorique et la config réelle", "Un changement de mot de passe", "Une vitesse de réseau", "Un type de câble"], correctAnswer: "Dérive entre la config théorique et la config réelle", explanation: "Drift = écart de configuration."}
  ],
  "Rédaction de RCA : Chronologie UTC (Detection -> Triage -> Mitigation -> Restoration) -> Cause racine (drift, bug, leak) -> Action items préventifs.",
  [
    {"question": "08:22 UTC - On-call engineer ___ the incident in PagerDuty.", "options": ["acknowledged", "ignored", "refused", "delayed"], "correctAnswer": "acknowledged", "explanation": "Acknowledged = a pris en compte."},
    {"question": "The incident ___ 12% of incoming traffic.", "options": ["affected", "effected", "affected to", "was affect"], "correctAnswer": "affected", "explanation": "Affected = a touché/affecté."},
    {"question": "Full service ___ was confirmed via synthetic monitoring.", "options": ["restoration", "restoring", "restored", "restore"], "correctAnswer": "restoration", "explanation": "Restoration = rétablissement du service."},
    {"question": "Each action item is assigned to an owner with a ___.", "options": ["deadline", "deadlock", "datatype", "daemon"], "correctAnswer": "deadline", "explanation": "Deadline = date limite."}
  ],
  [
    {"pattern": "HH:MM UTC - Event description", "example": "08:14 UTC - Alert triggered for high error rate.", "explanation": "Horodater un événement d'incident en UTC."},
    {"pattern": "The root cause was identified as + Nom", "example": "The root cause was identified as a memory leak.", "explanation": "Formuler la cause racine technique."},
    {"pattern": "Preventative action items include + V-ing", "example": "Preventative action items include adding CI tests.", "explanation": "Lister les mesures préventives pour éviter la récidive."}
  ]
)
'''
    # Insert before the post-processing section
    marker = "# ================= POST-TRAITEMENT : garantir étoffe ≥ 1800 car. ================="
    new_code = code.replace(marker, l141_l150_code + "\n" + marker)
    with open(os.path.join(BASE, "scripts", "build-t2.py"), "w", encoding="utf-8") as f:
        f.write(new_code)
    print("✅ Leçons 141 à 150 ajoutées dans build-t2.py")
else:
    print("ℹ️ Leçons 141 à 150 déjà présentes dans build-t2.py")
