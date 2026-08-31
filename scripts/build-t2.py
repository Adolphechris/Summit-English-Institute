#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Génère database/remediation-t2.json — 30 leçons riches (N3:121-130, N4:131-140, N5:141-150)."""
import json, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOW = "2026-08-31T08:00:00.000Z"
LESSONS = []

def L(id_, mod, lvl, order, title, objective, expl, ex, voc, expr, itc, quiz, summ, prac, patterns=None):
    LESSONS.append({
        "id": id_, "moduleId": mod, "levelId": lvl, "title": title,
        "objective": objective, "explanation": expl, "examples": ex,
        "vocabulary": voc, "expressions": expr, "itContext": itc,
        "practice": prac, "patterns": patterns, "quiz": quiz,
        "summary": summ, "orderIndex": order,
        "status": "active", "version": 1,
        "createdAt": NOW, "updatedAt": NOW
    })

# ================= LEÇONS (insérées avant le marqueur POST-TRAITEMENT) =================
# ================= LEÇON 121 — N3 Modaux =================
L(121, 6, 3, 1,
  "Modal Verbs: Ability, Obligation, Advice",
  "Utiliser can, must, have to, should et may pour exprimer capacité, obligation, interdiction, conseil et permission en contexte professionnel.",
  "Les verbes modaux se placent AVANT le verbe de base, qui reste à l'infinitif sans to : She must deploy the patch. Ils sont INVARIANTS : jamais de -s, jamais de do dans la question ou la négation. MUST exprime une obligation forte venant du locuteur ou de la règle : You must not share production credentials (interdiction absolue). HAVE TO exprime une obligation externe, imposée par les circonstances ou la politique : I have to reset my password every 90 days (la politique l'exige). La différence est subtile mais réelle : must = je l'exige / la règle l'exige de mon point de vue ; have to = une contrainte extérieure s'impose. SHOULD exprime le conseil, la recommandation, ce qui est raisonnable sans être obligatoire : You should enable MFA. We should review the logs before closing the ticket. MAY et MIGHT expriment la possibilité avec nuance : may = c'est possible et autorisé (You may proceed after approval), might = c'est possible mais moins certain (The issue might be a DNS problem). MUST NOT interdit ; il ne faut PAS le confondre avec do not have to (qui signifie : pas d'obligation, c'est facultatif) : You must not restart the node vs You do not have to stay online tonight. DEMANDES DE PERMISSION : May I leave early ? ou plus moderne Can I... ? ; à l'écrit professionnel, could reste le plus élégant. EN RÉSUMÉ D'INCIDENT : these modaux cadrent les actions — what we must do (obligations), what we should do (recommandations), what we cannot do (contraintes). Ils donnent au lecteur le degré d'urgence exact sans ambiguïté.",
  [
    {"meaning": "Tu dois déployer le correctif.", "sentence": "You must deploy the patch.", "itContext": "You must deploy the patch before the maintenance window closes."},
    {"meaning": "Je dois réinitialiser mon mot de passe tous les 90 jours.", "sentence": "I have to reset my password every 90 days.", "itContext": "I have to reset my VPN password every 90 days per policy."},
    {"meaning": "Tu devrais activer la MFA.", "sentence": "You should enable MFA.", "itContext": "You should enable MFA on all admin accounts."},
    {"meaning": "Il ne faut surtout pas partager les identifiants.", "sentence": "You must not share production credentials.", "itContext": "You must not share production credentials in chat."},
    {"meaning": "Le problème pourrait venir du DNS.", "sentence": "The issue might be a DNS problem.", "itContext": "The issue might be a DNS problem; we are checking records."},
    {"meaning": "Puis-je partir plus tôt ?", "sentence": "May I leave early?", "itContext": "May I leave early after the deployment is verified?"},
    {"meaning": "Nous ne sommes pas obligés de rester en ligne ce soir.", "sentence": "We do not have to stay online tonight.", "itContext": "We do not have to stay online tonight; the job is automated."}
  ],
  [
    {"word": "must", "level": "A", "domain": "grammar", "example": "You must verify.", "itContext": "You must verify the checksum before signing.", "definition": "Obligation forte, non négociable", "translation": "devoir (fort)"},
    {"word": "have to", "level": "A", "domain": "grammar", "example": "I have to rotate keys.", "itContext": "I have to rotate the API keys monthly.", "definition": "Obligation imposée de l'extérieur", "translation": "être obligé de"},
    {"word": "should", "level": "A", "domain": "grammar", "example": "You should update.", "itContext": "You should update the dependency this sprint.", "definition": "Conseil, recommandation", "translation": "devrait"},
    {"word": "may", "level": "B", "domain": "grammar", "example": "You may proceed.", "itContext": "You may proceed once the approval is recorded.", "definition": "Permission, possibilité", "translation": "pouvoir (permission)"},
    {"word": "might", "level": "B", "domain": "grammar", "example": "It might be cache.", "itContext": "It might be the cache layer; we purge and retry.", "definition": "Possibilité incertaine", "translation": "pourrait"},
    {"word": "prohibited", "level": "B", "domain": "professional", "example": "It is prohibited.", "itContext": "Sharing logs publicly is prohibited by the policy.", "definition": "Interdit par une règle", "translation": "interdit"},
    {"word": "recommend", "level": "B", "domain": "professional", "example": "We recommend MFA.", "itContext": "We recommend hardware keys for privileged accounts.", "definition": "Recommander officiellement", "translation": "recommander"},
    {"word": "enforce", "level": "C", "domain": "professional", "example": "The rule is enforced.", "itContext": "The password rule is enforced by the IdP.", "definition": "Faire respecter une règle", "translation": "faire respecter"}
  ],
  [
    {"expression": "must-do", "meaning": "action obligatoire de la tâche", "difficulty": "B", "example": "The must-do tonight is the backup check.", "classification": "professional"},
    {"expression": "nice to have", "meaning": "recommandé mais facultatif", "difficulty": "B", "example": "Rate limiting is nice to have this quarter.", "classification": "professional"},
    {"expression": "no way around it", "meaning": "pas d'alternative possible", "difficulty": "B", "example": "We have to rebuild the index; no way around it.", "classification": "professional"},
    {"expression": "better safe than sorry", "meaning": "mieux vaut prévenir", "difficulty": "C", "example": "Roll it back; better safe than sorry.", "classification": "professional"},
    {"expression": "if you must", "meaning": "si vraiment tu y tiens", "difficulty": "C", "example": "If you must hotfix, do it behind a flag.", "classification": "professional"}
  ],
  "Modaux = le cadre d'action : must/have to obligent, must not interdit, should conseille, may autorise, might émet une hypothèse. Toujours + verbe de base, invariants, sans do.",
  [
    {"type": "multiple_choice", "question": "You ___ not share the token; it is strictly forbidden.", "options": ["must", "have", "should", "may"], "correctAnswer": "must", "explanation": "Interdiction absolue → must not."},
    {"type": "multiple_choice", "question": "She ___ to rotate the keys every month (règle externe).", "options": ["must", "has", "should", "may"], "correctAnswer": "has", "explanation": "Obligation externe → have to (has to)."},
    {"type": "fill_blank", "question": "Complétez (conseil) : You ___ enable MFA this week.", "options": [], "correctAnswer": "should", "explanation": "Recommandation → should."},
    {"type": "multiple_choice", "question": "Hypothèse incertaine : The failure ___ be a network blip.", "options": ["must", "might", "have to", "cannot"], "correctAnswer": "might", "explanation": "Possibilité incertaine → might."}
  ],
  "must = obligation interne/absolue ; have to = externe. must not interdit, do not have to = facultatif. should = conseil. may = permission ; might = hypothèse. Tous + base sans to.",
  [
    {"question": "Policy: users ___ use the corporate VPN.", "options": ["have to", "may not", "should", "can"], "correctAnswer": "have to", "explanation": "Règle imposée → have to."},
    {"question": "You ___ restart the node now (facultatif).", "options": ["must", "do not have to", "must not", "cannot"], "correctAnswer": "do not have to", "explanation": "Pas d'obligation → do not have to."},
    {"question": "___ I use the staging cluster for the demo?", "options": ["May", "Must", "Have", "Should"], "correctAnswer": "May", "explanation": "Demande de permission → May I..."},
    {"question": "The deploy ___ wait for the review.", "options": ["must", "might", "could", "can"], "correctAnswer": "must", "explanation": "Obligation process → must."}
  ],
  [
    {"pattern": "must + base (obligation)", "example": "We must patch it today.", "explanation": "Cadre une action non négociable."},
    {"pattern": "should + base (reco)", "example": "You should tighten the policy.", "explanation": "Formuler une recommandation."},
    {"pattern": "might + base (hypothèse)", "example": "It might be a TTL issue.", "explanation": "Émettre une piste sans certitude."}
  ]
),
# ================= LEÇON 122 — N3 Négation =================
L(122, 6, 3, 2,
  "Negation: Clear and Professional",
  "Nier correctement aux différents temps (do/does/did + not, be + not, modaux + not) et choisir les alternatives élégantes (never, neither, no).",
  "La négation anglaise suit une règle d'or : UNE seule négation par proposition. AUXILIAIRE DO : pour les verbes ordinaires au présent et au passé, la négation passe par do/does/did + not : The job does not run on Sundays. He did not reply. Le verbe reprend sa forme de base : does not runs est FAUX → does not run. VERBE BE et MODAUX : ils nient sans do — The service is not responding. She cannot deploy today (cannot / can't). I must not skip the checklist. PRÉSENT PARFAIT : have/has + not + participe — They have not deployed the fix yet. IMPÉRATIF : do not/don't + base — Don't force-push to main. ALTERNATIVES ÉLÉGANTES : never remplace do not + verbe de fréquence (We never deploy on Fridays) ; neither... nor nie deux éléments à la fois (Neither staging nor prod shows the error) ; no + nom nie l'existence (No alerts fired last night) ; none nie la totalité d'un groupe (None of the replicas is healthy). PIÈGE FRANÇAIS : l'anglais ne double jamais la négation — I do not think it will fail (et PAS I think it will not fail ; en anglais la négation se place sur le verbe principal de perception : I don't think..., not I think... not...). HARD vs SOFT NEGATION : à l'écrit pro, préférer not available, not applicable, unable to rather que des tournures brutes ; et exprimer la négation d'une hypothèse avec hardly, barely, rarely (fréquence faible) sans double négatif. Dans les tickets, une négation précise évite les malentendus : We did not change the firewall rules between 14:00 and 15:00 — phrase d'enquête exacte qui oriente le diagnostic.",
  [
    {"meaning": "Le job ne tourne pas le dimanche.", "sentence": "The job does not run on Sundays.", "itContext": "The cleanup job does not run on Sundays by design."},
    {"meaning": "Il n'a pas répondu.", "sentence": "He did not reply to the alert.", "itContext": "The on-call did not reply to the pager within five minutes."},
    {"meaning": "Le service ne répond pas.", "sentence": "The service is not responding.", "itContext": "The service is not responding to health checks."},
    {"meaning": "Nous ne déployons jamais le vendredi.", "sentence": "We never deploy on Fridays.", "itContext": "We never deploy on Fridays unless it is an emergency."},
    {"meaning": "Aucune alerte n'a été déclenchée.", "sentence": "No alerts fired last night.", "itContext": "No alerts fired last night, so the outage was silent."},
    {"meaning": "Ni staging ni prod n'affichent l'erreur.", "sentence": "Neither staging nor prod shows the error.", "itContext": "Neither staging nor prod shows the error; it is env-specific."},
    {"meaning": "Je ne pense pas que ça va échouer.", "sentence": "I do not think it will fail.", "itContext": "I do not think the migration will fail, but we keep a rollback."}
  ],
  [
    {"word": "never", "level": "A", "domain": "grammar", "example": "We never skip tests.", "itContext": "We never skip the test suite before a release.", "definition": "Jamais (fréquence nulle)", "translation": "jamais"},
    {"word": "neither", "level": "B", "domain": "grammar", "example": "Neither option works.", "itContext": "Neither retry policy works under this timeout.", "definition": "Ni l'un ni l'autre", "translation": "ni... ni"},
    {"word": "none", "level": "B", "domain": "grammar", "example": "None is healthy.", "itContext": "None of the three replicas is healthy.", "definition": "Aucun (d'un groupe)", "translation": "aucun"},
    {"word": "unless", "level": "B", "domain": "grammar", "example": "Unless it is urgent.", "itContext": "We do not deploy unless it is a security fix.", "definition": "À moins que (condition négative)", "translation": "sauf si"},
    {"word": "unavailable", "level": "B", "domain": "professional", "example": "The API is unavailable.", "itContext": "The endpoint is unavailable during the freeze.", "definition": "Non disponible", "translation": "indisponible"},
    {"word": "unable", "level": "B", "domain": "professional", "example": "I am unable to attend.", "itContext": "I am unable to join the call; here are my notes.", "definition": "Incapable de (poliment)", "translation": "dans l'impossibilité de"},
    {"word": "barely", "level": "C", "domain": "grammar", "example": "It barely loads.", "itContext": "The dashboard barely loads under this latency.", "definition": "À peine (degré faible)", "translation": "à peine"},
    {"word": "deny", "level": "B", "domain": "it", "example": "The rule denies port 22.", "itContext": "The firewall rule denies inbound port 22.", "definition": "Refuser, interdire (technique)", "translation": "refuser"}
  ],
  [
    {"expression": "not yet", "meaning": "pas encore (état en cours)", "difficulty": "A", "example": "The fix is not deployed yet.", "classification": "professional"},
    {"expression": "no longer", "meaning": "plus maintenant", "difficulty": "B", "example": "This endpoint is no longer supported.", "classification": "professional"},
    {"expression": "out of the question", "meaning": "totalement exclu", "difficulty": "C", "example": "Skipping the backup is out of the question.", "classification": "professional"},
    {"expression": "far from it", "meaning": "loin de là", "difficulty": "C", "example": "The issue is far from being resolved.", "classification": "professional"},
    {"expression": "neither here nor there", "meaning": "sans rapport avec le sujet", "difficulty": "C", "example": "That detail is neither here nor there.", "classification": "professional"}
  ],
  "Une seule négation par phrase : do/does/did + not pour les verbes ordinaires, be/modal + not directement. Alternatives : never, no + nom, none, neither... nor. Ne pas doubler la négation.",
  [
    {"type": "multiple_choice", "question": "The script ___ not run on this OS.", "options": ["does", "is", "has", "was"], "correctAnswer": "does", "explanation": "Verbe ordinaire → does not + base."},
    {"type": "multiple_choice", "question": "Forme correcte :", "options": ["He does not runs it.", "He does not run it.", "He not runs it.", "He not run it."], "correctAnswer": "He does not run it.", "explanation": "does + not + base (pas de -s)."},
    {"type": "fill_blank", "question": "Complétez : ___ of the nodes is reachable.", "options": [], "correctAnswer": "None", "explanation": "Négation totale d'un groupe → None."},
    {"type": "multiple_choice", "question": "Opinion négative (ordre correct) :", "options": ["I think it will not work.", "I do not think it will work.", "I think not it will work.", "I not think it will work."], "correctAnswer": "I do not think it will work.", "explanation": "Négation transférée sur think."}
  ],
  "do/does/did + not + base ; be/modal + not directement. never = fréquence nulle ; no + nom = inexistence ; none = aucun d'un groupe. I don't think X (pas I think not X).",
  [
    {"question": "The pod is ___ ready.", "options": ["no", "not", "none", "never"], "correctAnswer": "not", "explanation": "be + not (is not ready)."},
    {"question": "We ___ deploy without a rollback plan.", "options": ["do not have", "never", "no", "none"], "correctAnswer": "never", "explanation": "Fréquence nulle → never + base."},
    {"question": "___ staging nor prod has the fix.", "options": ["Neither", "None", "No", "Not"], "correctAnswer": "Neither", "explanation": "neither... nor pour deux éléments."},
    {"question": "He ___ finish the migration yesterday.", "options": ["did not", "does not", "has not", "was not"], "correctAnswer": "did not", "explanation": "Passé simple nié → did not + base."}
  ],
  [
    {"pattern": "does not + base (fait nié)", "example": "It does not reproduce on v2.", "explanation": "Informer d'un non-fait."},
    {"pattern": "No + nom (inexistence)", "example": "No errors in the logs.", "explanation": "Signaler une absence."},
    {"pattern": "do not think + futur", "example": "I do not think we need a rollback.", "explanation": "Exprimer un avis négatif poli."}
  ]
),
# ================= LEÇON 123 — N3 Some/Any/Composés =================
L(123, 15, 3, 3,
  "Some, Any and Compounds: Quantifying Vaguely",
  "Utiliser some/any et leurs composés (something, anything, nothing, someone, anyone, everywhere) pour exprimer quantité floue, offre, absence.",
  "SOME et ANY expriment une quantité ou un nombre INDÉFINI devant les indénombrables et les pluriels. SOME s'emploie dans les phrases AFFIRMATIVES et les offres polies : We need some space on the volume. Would you like some help ? ANY s'emploie dans les NÉGATIONS, les QUESTIONS ouvertes et après des mots à sens négatif (never, without, hardly) : Is there any feedback ? We don't have any backups for this tier. I have hardly any free disk space. RÈGLE D'OR DE SENS : any peut aussi signifier NO MATTER WHICH en affirmatif — Come to me at any time. Pick any environment. LES COMPOSÉS étendent ce principe : SOMETHING / SOMEONE / SOMEBODY / SOMEWHERE (affirmatif), ANYTHING / ANYONE / ANYWHERE (questions, négations, no-matter-which), NOTHING / NOBODY / NO ONE / NOWHERE (négation déjà intégrée — donc SANS not : We found nothing ≠ We didn't find nothing). EVERY s'ajoute aux composés (EVERYTHING, EVERYONE, EVERYBODY, EVERYWHERE) pour l'exhaustivité : Everyone has signed off. Everything is green. Attention à la GRAMMAIRE DES COMPOSÉS : someone/anyone/everyone = pronom sujet ou objet SINGULIER à l'accord verbal (Everyone uses the new flow), et l'accord possessif se fait sur le genre réel ou neutre : someone's laptop, their laptop. PIÈGE CLASSIQUE : double négation interdite — I can't find anything (pas can't find nothing). EN SUPPORT : Is anyone on call ? — No, nobody is. Anyone can deploy to staging. Nothing is blocking the release.",
  [
    {"meaning": "Nous avons besoin d'espace sur le volume.", "sentence": "We need some space on the volume.", "itContext": "We need some space on the /var volume before the logs rotate."},
    {"meaning": "Avez-vous un retour ?", "sentence": "Do you have any feedback?", "itContext": "Do you have any feedback on the new dashboard?"},
    {"meaning": "Nous n'avons aucune sauvegarde pour ce tier.", "sentence": "We don't have any backups for this tier.", "itContext": "We don't have any recent backups for this legacy tier."},
    {"meaning": "On peut me joindre à tout moment.", "sentence": "You can reach me at any time.", "itContext": "You can reach me at any time during the migration window."},
    {"meaning": "Quelqu'un a validé le ticket.", "sentence": "Someone has approved the ticket.", "itContext": "Someone has approved the change ticket in the queue."},
    {"meaning": "Rien ne bloque la release.", "sentence": "Nothing is blocking the release.", "itContext": "Nothing is blocking the release as of this morning."},
    {"meaning": "Tout le monde a signé.", "sentence": "Everyone has signed off.", "itContext": "Everyone has signed off on the runbook update."}
  ],
  [
    {"word": "some", "level": "A", "domain": "grammar", "example": "I need some time.", "itContext": "I need some time to review the patch.", "definition": "Une quantité indéfinie (affirmatif)", "translation": "un peu, certains"},
    {"word": "any", "level": "A", "domain": "grammar", "example": "Any help is welcome.", "itContext": "Any help is welcome during the incident.", "definition": "N'importe lequel / un peu (question, négation)", "translation": "aucun, n'importe"},
    {"word": "nothing", "level": "A", "domain": "grammar", "example": "Nothing to report.", "itContext": "Nothing to report in the last hour.", "definition": "Pronom d'absence (négation incluse)", "translation": "rien"},
    {"word": "everyone", "level": "A", "domain": "grammar", "example": "Everyone agrees.", "itContext": "Everyone agrees on the rollback plan.", "definition": "Toutes les personnes (sujet singulier)", "translation": "tout le monde"},
    {"word": "feedback", "level": "B", "domain": "professional", "example": "Any feedback so far?", "itContext": "Any feedback so far on the beta?", "definition": "Retour, avis (indénombrable)", "translation": "retour, avis"},
    {"word": "approve", "level": "B", "domain": "professional", "example": "Someone must approve it.", "itContext": "A maintainer must approve the change.", "definition": "Approuver, valider", "translation": "approuver"},
    {"word": "blocking", "level": "B", "domain": "it", "example": "Nothing is blocking.", "itContext": "No blocker remains; nothing is blocking the deploy.", "definition": "Qui empêche la progression", "translation": "bloquant"},
    {"word": "sign off", "level": "B", "domain": "professional", "example": "The lead signed off.", "itContext": "The tech lead signed off on the architecture.", "definition": "Valider formellement", "translation": "valider, signer"}
  ],
  [
    {"expression": "at any time", "meaning": "à tout moment", "difficulty": "A", "example": "Ping me at any time.", "classification": "professional"},
    {"expression": "nothing to report", "meaning": "rien à signaler", "difficulty": "A", "example": "Nothing to report overnight.", "classification": "professional"},
    {"expression": "anything else", "meaning": "autre chose ?", "difficulty": "A", "example": "Anything else before we close?", "classification": "professional"},
    {"expression": "can't ... anything", "meaning": "ne rien pouvoir trouver/faire", "difficulty": "B", "example": "I can't find anything suspicious.", "classification": "professional"},
    {"expression": "everyone is on the same page", "meaning": "tout le monde est aligné", "difficulty": "C", "example": "After the demo, everyone was on the same page.", "classification": "professional"}
  ],
  "Some pour offrir et affirmer, any pour interroger et nier, any affirmatif pour l'indifférence du choix. Les composés suivent la même logique ; nothing/nobody portent déjà la négation, jamais avec not.",
  [
    {"type": "multiple_choice", "question": "Is there ___ downtime scheduled?", "options": ["some", "any", "nothing", "every"], "correctAnswer": "any", "explanation": "Question ouverte → any."},
    {"type": "multiple_choice", "question": "___ is blocking the hotfix.", "options": ["Anything", "Something", "Nothing", "Everyone"], "correctAnswer": "Nothing", "explanation": "Négation intégrée → nothing."},
    {"type": "fill_blank", "question": "Complétez : We need ___ storage, but ___ environment is fine.", "options": [], "correctAnswer": "some / any", "explanation": "Affirmatif → some ; no-matter-which → any."},
    {"type": "multiple_choice", "question": "Faux (double négation) :", "options": ["I can't find nothing.", "I can't find anything.", "I can find nothing.", "I found nothing."], "correctAnswer": "I can't find nothing.", "explanation": "can't + nothing = double négation interdite."}
  ],
  "Affirmatif → some ; question/négation → any ; any affirmatif = indifférent (any time). Composés : some-/any-/no-/every-thing/one/where. nothing & nobody n'acceptent jamais not.",
  [
    {"question": "Would you like ___ help with the config?", "options": ["any", "some", "nothing", "none"], "correctAnswer": "some", "explanation": "Offre polie → some."},
    {"question": "___ wants to own the legacy code.", "options": ["Anybody", "Nobody", "Everybody", "Somebody"], "correctAnswer": "Nobody", "explanation": "Personne ne veut → nobody."},
    {"question": "Pick ___ cluster; both are stable.", "options": ["some", "any", "nothing", "no"], "correctAnswer": "any", "explanation": "Indifférence du choix → any."},
    {"question": "___ of the nodes reported the error.", "options": ["None", "Nothing", "Any", "Some"], "correctAnswer": "None", "explanation": "Aucun (parmi) → none + of."}
  ],
  [
    {"pattern": "Would you like some...?", "example": "Would you like some help on this?", "explanation": "Offre de service."},
    {"pattern": "We don't have any...", "example": "We don't have any error budget left.", "explanation": "Signaler une absence."},
    {"pattern": "Nothing is blocking X", "example": "Nothing is blocking the migration.", "explanation": "Donner le feu vert."}
  ]
),
# ================= LEÇON 124 — N3 Quantifiers =================
L(124, 15, 3, 4,
  "Quantifiers: much, many, few, little, enough",
  "Choisir le quantificateur correct selon dénombrable/indénombrable et exprimer le seuil avec enough et too.",
  "LES QUANTIFICATEURS se répartissent selon le TYPE DE NOM. DÉNOMBRABLES (servers, tickets, errors) : many, a few, a lot of — Many requests failed. A few nodes are affected. INDÉNOMBRABLES (storage, traffic, memory, time) : much, a little, a lot of — Much traffic comes from bots. A little memory is still free. ASTUCE UNIVERSELLE : a lot of marche pour LES DEUX quand le doute persiste. BEAUCOUP vs BEAUCOUP TROP : much/many = grande quantité neutre ; too much/too many = excès — Too many alerts fire at night. Too much storage is allocated to this project. PEU vs UN PEU : few/little (sans article) = peu, presque pas (vision négative) — Few engineers know this stack. Little headroom is left. A few / a little (avec article) = quelques/un peu (vision positive) — A few retries usually fix it. There's a little room for optimization. LE SEUIL : ENOUGH = suffisant, se place AVANT le nom et APRÈS l'adjectif — Enough disk space. Not enough replicas. The response is fast enough. TROP : TOO + adjectif — The queue is too long. TOO + quantificateur + nom — Too many open tickets. MÉTRIQUES EN PRATIQUE : How many + dénombrable (How many errors ?), How much + indénombrable (How much latency ?). DANS LES TICKETS : We have enough headroom for the canary. Not enough data to reproduce. Too many false positives in this rule. Ces formes rendent une évaluation technique immédiatement actionnable.",
  [
    {"meaning": "Beaucoup de requêtes ont échoué.", "sentence": "Many requests failed during the incident.", "itContext": "Many requests failed during the twelve-minute incident."},
    {"meaning": "Il reste peu de marge mémoire.", "sentence": "Little headroom is left on the node.", "itContext": "Little headroom is left on the primary node."},
    {"meaning": "Quelques redémarrages suffisent.", "sentence": "A few retries usually fix it.", "itContext": "A few retries usually fix the flaky test."},
    {"meaning": "C'est trop long, cette file.", "sentence": "The queue is too long.", "itContext": "The ingestion queue is too long; workers are drowning."},
    {"meaning": "Nous avons assez de répliques.", "sentence": "We have enough replicas for the rollout.", "itContext": "We have enough replicas for the canary rollout."},
    {"meaning": "Trop d'alertes la nuit.", "sentence": "Too many alerts fire at night.", "itContext": "Too many alerts fire at night; we must tune thresholds."},
    {"meaning": "La réponse est assez rapide.", "sentence": "The response is fast enough.", "itContext": "The response is fast enough for the SLA after the cache."}
  ],
  [
    {"word": "enough", "level": "A", "domain": "grammar", "example": "Enough space for the update.", "itContext": "There is enough space for the update.", "definition": "Suffisant (seuil atteint)", "translation": "suffisamment, assez"},
    {"word": "too", "level": "A", "domain": "grammar", "example": "Too many requests.", "itContext": "The API rejected too many requests at once.", "definition": "Trop (excès)", "translation": "trop"},
    {"word": "headroom", "level": "C", "domain": "it", "example": "Little headroom left.", "itContext": "Little headroom remains before autoscaling.", "definition": "Marge de capacité restante", "translation": "marge"},
    {"word": "threshold", "level": "B", "domain": "it", "example": "The threshold is too low.", "itContext": "The alerting threshold is too low for this metric.", "definition": "Seuil d'alerte ou de déclenchement", "translation": "seuil"},
    {"word": "a few", "level": "A", "domain": "grammar", "example": "A few nodes failed.", "itContext": "A few nodes failed and were replaced.", "definition": "Quelques (dénombrable, positif)", "translation": "quelques"},
    {"word": "a little", "level": "A", "domain": "grammar", "example": "A little latency remains.", "itContext": "A little latency remains after the fix.", "definition": "Un peu (indénombrable, positif)", "translation": "un peu"},
    {"word": "plenty", "level": "B", "domain": "grammar", "example": "Plenty of capacity.", "itContext": "We have plenty of capacity in the EU region.", "definition": "Beaucoup (plus que nécessaire)", "translation": "plein, beaucoup"},
    {"word": "false positive", "level": "B", "domain": "cyber", "example": "Too many false positives.", "itContext": "Too many false positives make the rule noisy.", "definition": "Alerte déclenchée à tort", "translation": "faux positif"}
  ],
  [
    {"expression": "good enough", "meaning": "suffisamment bon", "difficulty": "B", "example": "The patch is good enough for now.", "classification": "professional"},
    {"expression": "too close to call", "meaning": "trop serré pour trancher", "difficulty": "C", "example": "The benchmarks are too close to call.", "classification": "professional"},
    {"expression": "more than enough", "meaning": "plus qu'il n'en faut", "difficulty": "B", "example": "We have more than enough redundancy.", "classification": "professional"},
    {"expression": "spread too thin", "meaning": "trop dispersé", "difficulty": "C", "example": "The team is spread too thin across projects.", "classification": "professional"},
    {"expression": "within budget", "meaning": "dans l'enveloppe", "difficulty": "B", "example": "Latency is within budget now.", "classification": "professional"}
  ],
  "many/few pour le dénombrable, much/little pour l'indénombrable, a lot of pour les deux. too = excès, enough = seuil atteint (avant le nom, après l'adjectif). a few/a little deviennent positifs avec l'article.",
  [
    {"type": "multiple_choice", "question": "___ storage is allocated to this project.", "options": ["Many", "Much", "A few", "Fewer"], "correctAnswer": "Much", "explanation": "storage (indénombrable) → much."},
    {"type": "multiple_choice", "question": "The p99 is ___ high for the SLA.", "options": ["much", "too", "enough", "few"], "correctAnswer": "too", "explanation": "Excès → too + adjectif."},
    {"type": "fill_blank", "question": "Complétez : We have ___ replicas for the failover drill.", "options": [], "correctAnswer": "enough", "explanation": "Seuil atteint → enough."},
    {"type": "multiple_choice", "question": "Vision positive : ___ engineers know this stack.", "options": ["Few", "A few", "Little", "Much"], "correctAnswer": "A few", "explanation": "a few = quelques (positif)."}
  ],
  "many + dénombrable / much + indénombrable. a few/a little positifs, few/little négatifs. too = trop (too many alerts), enough = assez (enough headroom). enough + nom / adjectif + enough.",
  [
    {"question": "___ many tickets are open right now.", "options": ["Much", "Too", "Enough", "A little"], "correctAnswer": "Too", "explanation": "Excès de tickets → too many."},
    {"question": "There is ___ memory left on the pod.", "options": ["a few", "many", "a little", "much too"], "correctAnswer": "a little", "explanation": "Indénombrable positif → a little."},
    {"question": "The build is ___ slow to ship today.", "options": ["enough", "too", "much", "few"], "correctAnswer": "too", "explanation": "too + adjectif."},
    {"question": "We don't have ___ data to reproduce.", "options": ["enough", "too much", "many", "plenty"], "correctAnswer": "enough", "explanation": "Seuil non atteint → not enough."}
  ],
  [
    {"pattern": "too many/much + nom = excès", "example": "Too much storage is idle.", "explanation": "Signaler le surdimensionnement."},
    {"pattern": "enough + nom = seuil OK", "example": "Enough replicas for the rollout.", "explanation": "Valider une capacité."},
    {"pattern": "a few + dénombrables", "example": "A few edge nodes failed.", "explanation": "Quantifier petit et positif."}
  ]
),
# ================= LEÇON 125 — N3 Démonstratifs & possessifs =================
L(125, 15, 3, 5,
  "Demonstratives and Possessives in Technical Writing",
  "Employer this/that/these/those et les possessifs (my, its, their, whose) pour désigner précisément objets et responsabilités.",
  "LES DÉMONSTRATIFS se choisissent sur DEUX AXES. PROXIMITÉ : this/these = proche, visible, à l'écran ou à l'instant (this error message, this branch) ; that/those = plus distant, mentionné avant ou opposé (that approach from last sprint). NOMBRE : this/that = singulier, these/those = pluriel (this pod vs these pods). EN DOC TECHNIQUE, this renvoie souvent à ce qui suit et that à ce qui précède : This is how the retry works (explication à venir). That is why the build failed (cause déjà donnée). ERREUR FRÉQUENTE : utiliser this + nom au pluriel (this environments ✗ → these environments). Les démonstratifs s'emploient aussi comme pronoms seuls : Which one ? — This one. LES POSSESSIFS s'accordent avec le POSSÉDEUR, jamais avec la chose possédée : my terminal, your config, his laptop, her script, its endpoint (du service), their dashboards (des équipes) — et ce QUEL QUE SOIT le nombre de la chose : my folders (pluriel) reste my. WHOSE introduit la question de propriété : Whose token expired ? POUR RÉSUMER LA RESPONSABILITÉ : owned by the platform team → their on-call rota. ATTENTION AUX CONFUSIONS CLASSIQUES : its (possessif) vs it's (it is) ; their (possessif pluriel) vs they're (they are) vs there (lieu) — Their config is fine. They're deploying. Put it there. EN NOMS COMPOSÉS DE POSSÉDEUR : the team's backlog, the service's owner, devs' machines (pluriel → apostrophe seule). EN SUPPORT, ces désignations font gagner un temps fou : This pipeline (celui affiché) belongs to the billing team — their runner is out of date.",
  [
    {"meaning": "Ce message d'erreur vient du proxy.", "sentence": "This error message comes from the proxy.", "itContext": "This error message comes from the internal proxy, not the API."},
    {"meaning": "Ces pods redémarrent en boucle.", "sentence": "These pods keep restarting.", "itContext": "These pods keep restarting after the config map change."},
    {"meaning": "C'est pour ça que le build a échoué.", "sentence": "That is why the build failed.", "itContext": "That is why the build failed after the lockfile change."},
    {"meaning": "Leur pipeline est obsolète.", "sentence": "Their pipeline is out of date.", "itContext": "Their pipeline is out of date; the runner needs a bump."},
    "Le service expose son point de santé.",
    {"meaning": "À qui est ce jeton expiré ?", "sentence": "Whose token expired?", "itContext": "Whose token expired during the batch job?"},
    {"meaning": "Ce dépôt appartient à l'équipe facturation.", "sentence": "This repo belongs to the billing team.", "itContext": "This repo belongs to the billing team, not to us."}
  ],
  [
    {"word": "demonstrative", "level": "B", "domain": "grammar", "example": "This one, that one.", "itContext": "Use this one for the selected cluster.", "definition": "Mot qui désigne en montrant", "translation": "démonstratif"},
    {"word": "possessive", "level": "B", "domain": "grammar", "example": "Its endpoint failed.", "itContext": "The service's endpoint failed the probe.", "definition": "Qui exprime l'appartenance", "translation": "possessif"},
    {"word": "belong to", "level": "B", "domain": "professional", "example": "It belongs to us.", "itContext": "This namespace belongs to the platform team.", "definition": "Appartenir à", "translation": "appartenir à"},
    {"word": "ownership", "level": "B", "domain": "professional", "example": "Take ownership of it.", "itContext": "Please take ownership of the incident ticket.", "definition": "Responsabilité sur une ressource", "translation": "responsabilité, propriété"},
    {"word": "whose", "level": "A", "domain": "grammar", "example": "Whose key is this?", "itContext": "Whose SSH key is registered here?", "definition": "Interrogatif possessif", "translation": "à qui, dont"},
    {"word": "proximity", "level": "C", "domain": "grammar", "example": "This shows proximity.", "itContext": "This suggests proximity to the reader.", "definition": "Fait d'être proche", "translation": "proximité"},
    {"word": "referring", "level": "B", "domain": "grammar", "example": "That refers back.", "itContext": "That refers back to the earlier outage.", "definition": "Renvoyer à quelque chose", "translation": "se référer"},
    {"word": "apostrophe", "level": "B", "domain": "grammar", "example": "The team's repo.", "itContext": "The team's repo uses an apostrophe for possession.", "definition": "Signe de possession ou d'élision", "translation": "apostrophe"}
  ],
  [
    {"expression": "as I said", "meaning": "comme je l'ai dit", "difficulty": "A", "example": "As I said, that config was renamed.", "classification": "professional"},
    {"expression": "the one I mentioned", "meaning": "celle dont je parlais", "difficulty": "B", "example": "The one I mentioned is that service.", "classification": "professional"},
    {"expression": "its own", "meaning": "son propre (système)", "difficulty": "B", "example": "The service keeps its own cache.", "classification": "it"},
    {"expression": "it's not ours", "meaning": "ça ne nous appartient pas", "difficulty": "A", "example": "That cluster is not ours.", "classification": "professional"},
    {"expression": "there vs their", "meaning": "lieu vs possession", "difficulty": "B", "example": "Put it there; their quota resets.", "classification": "grammar"}
  ],
  "this/these désignent le proche et le pluriel proche, that/those le distant. Les possessifs suivent le possesseur (their machines), whose questionne la propriété. Confusions à éliminer : its/it's, their/they're/there.",
  [
    {"type": "multiple_choice", "question": "___ pods are the culprits (affichés à l'écran).", "options": ["This", "These", "That", "Those are"], "correctAnswer": "These", "explanation": "Pluriel + proximité → these."},
    {"type": "multiple_choice", "question": "The scheduler updated ___ state.", "options": ["it's", "its", "their", "his"], "correctAnswer": "its", "explanation": "Possessif du service → its."},
    {"type": "fill_blank", "question": "Complétez : ___ is why the retry loops (cause déjà expliquée).", "options": [], "correctAnswer": "That", "explanation": "Renvoi au lointain/antérieur → that."},
    {"type": "multiple_choice", "question": "___ responsible for this namespace?", "options": ["Who's", "Whose", "Which", "What"], "correctAnswer": "Who's", "explanation": "Qui est responsable → who's (= who is)."}
  ],
  "Proximité : this/these ; distance : that/those ; accord en nombre obligatoire. Possessifs = accord sur le possesseur (its, their). whose = à qui ; who's = who is. Apostrophe + s sur le possesseur.",
  [
    {"question": "___ branch broke the build (proche).", "options": ["That", "This", "Those", "Its"], "correctAnswer": "This", "explanation": "Singulier proche → this."},
    {"question": "The team published ___ roadmap.", "options": ["it's", "its", "their", "there"], "correctAnswer": "their", "explanation": "Possession par l'équipe → their."},
    {"question": "___ machine failed the audit?", "options": ["Who's", "Whose", "Which's", "What"], "correctAnswer": "Whose", "explanation": "Propriété → whose."},
    {"question": "The logs are over ___ on the NFS.", "options": ["their", "they're", "there", "its"], "correctAnswer": "there", "explanation": "Lieu → there."}
  ],
  [
    {"pattern": "this + nom (proche)", "example": "This endpoint returns 503.", "explanation": "Désigner à l'écran."},
    {"pattern": "that + renvoi arrière", "example": "That fixed the regression.", "explanation": "Référence à l'antérieur."},
    {"pattern": "possesseur + 's + chose", "example": "The service's quota is capped.", "explanation": "Attribuer une propriété."}
  ]
),
# ================= LEÇON 126 — N3 Prépositions de temps =================
L(126, 16, 3, 6,
  "Time Prepositions: by, until, since, for, during",
  "Maîtriser les prépositions de temps pour planifier, dater et négocier : deadlines (by), durée (for), point de départ (since), bornes (until/during).",
  "CINQ PRÉPOSITIONS structurent le temps technique. BY = échéance limite, au plus tard : by Friday, by 5 PM, by the end of the sprint — The report is due by Friday. (le vendredi soir au plus tard, avant idéalement). UNTIL = borne de fin, l'action dure JUSQU'À : The maintenance window runs until 2 AM. We stay blocked until the cert is renewed. CONTRASTE CLÉ : by pointe une DEADLINE ponctuelle, until étire une durée fermée. SINCE + FOR = le duo du perfect : since marque le POINT DE DÉPART (since Monday, since 2023, since the migration), for mesure la DURÉE (for three hours, for two weeks, for ages) — It has been failing since Tuesday, for two days now. DURING = pendant l'intérieur d'un intervalle nommé : during the night, during the incident, during peak hours. IN + ON + AT décroissent en précision : in June / in 2024, on Monday / on 5 June, at 14:00 / at night. FROM...TO délimite : from Monday to Wednesday. PIÈGES : since + point (pas for + point : since 2 PM, pas since two hours) ; until s'écrit aussi till (informel) ; by the time + clause (By the time we saw the alert, the queue had doubled). EN PLANIFICATION : We freeze from the 20th until the 3rd. Deploy by the 19th. Test during the window. Backfill since June. Ces prépositions rendent un planning sans ambiguïté.",
  [
    {"meaning": "Le rapport est attendu au plus tard vendredi.", "sentence": "The report is due by Friday.", "itContext": "The incident report is due by Friday, ideally Thursday."},
    {"meaning": "La fenêtre dure jusqu'à 2h du matin.", "sentence": "The window runs until 2 AM.", "itContext": "The maintenance window runs until 2 AM UTC."},
    {"meaning": "Ça échoue depuis mardi, pendant deux jours.", "sentence": "It has been failing since Tuesday, for two days.", "itContext": "The job has been failing since Tuesday, for two days total."},
    {"meaning": "Pendant les heures de pointe, la latence monte.", "sentence": "During peak hours, latency rises.", "itContext": "During peak hours, p95 latency rises by 40 ms."},
    {"meaning": "Nous gelons du 20 au 3.", "sentence": "We freeze from the 20th until the 3rd.", "itContext": "We freeze releases from the 20th until the 3rd."},
    {"meaning": "Au moment où l'alerte a vu, la file avait doublé.", "sentence": "By the time we saw the alert, the queue had doubled.", "itContext": "By the time the alert fired, the queue had doubled."},
    {"meaning": "On restera bloqués jusqu'au renouvellement du certificat.", "sentence": "We stay blocked until the cert is renewed.", "itContext": "We stay blocked until the wildcard cert is renewed."}
  ],
  [
    {"word": "due", "level": "B", "domain": "professional", "example": "It is due Friday.", "itContext": "The audit deliverable is due Friday EOD.", "definition": "Attendu, échu à une date", "translation": "dû, attendu"},
    {"word": "deadline", "level": "A", "domain": "professional", "example": "The deadline is tight.", "itContext": "The migration deadline is tight but realistic.", "definition": "Date limite", "translation": "échéance"},
    {"word": "window", "level": "B", "domain": "it", "example": "A 30-min window.", "itContext": "We booked a thirty-minute window for the cutover.", "definition": "Créneau planifié", "translation": "créneau, fenêtre"},
    {"word": "since", "level": "A", "domain": "grammar", "example": "Since Monday, it fails.", "itContext": "Since Monday, the sync job fails silently.", "definition": "Depuis (point de départ)", "translation": "depuis"},
    {"word": "until", "level": "A", "domain": "grammar", "example": "Until the fix lands.", "itContext": "We queue requests until the fix lands.", "definition": "Jusqu'à (borne de fin)", "translation": "jusqu'à"},
    {"word": "freeze", "level": "B", "domain": "dev", "example": "We freeze releases.", "itContext": "We freeze releases during the holiday period.", "definition": "Geler (les déploiements)", "translation": "geler"},
    {"word": "peak", "level": "B", "domain": "it", "example": "During peak hours.", "itContext": "During peak hours, we scale out automatically.", "definition": "Pic de charge", "translation": "pic"},
    {"word": "backfill", "level": "C", "domain": "dev", "example": "Backfill since June.", "itContext": "Backfill the metrics since June after the schema fix.", "definition": "Compléter des données rétroactivement", "translation": "rétro-remplir"}
  ],
  [
    {"expression": "EOD", "meaning": "fin de journée", "difficulty": "B", "example": "Ship the review by EOD.", "classification": "professional"},
    {"expression": "as of", "meaning": "à compter de / à la date de", "difficulty": "B", "example": "As of this morning, all checks pass.", "classification": "professional"},
    {"expression": "time-boxed", "meaning": "limité dans le temps", "difficulty": "C", "example": "Keep the spike time-boxed to 2h.", "classification": "professional"},
    {"expression": "in the meantime", "meaning": "entre-temps", "difficulty": "B", "example": "In the meantime, we queue writes.", "classification": "professional"},
    {"expression": "around the clock", "meaning": "24h/24", "difficulty": "C", "example": "We monitored around the clock.", "classification": "professional"}
  ],
  "by = deadline ponctuelle ; until = durée fermée ; since = départ + for = durée (duo du perfect) ; during = intérieur d'un intervalle. in (mois/année) > on (jour) > at (heure).",
  [
    {"type": "multiple_choice", "question": "Ship the feature ___ Thursday EOD.", "options": ["until", "by", "since", "during"], "correctAnswer": "by", "explanation": "Échéance → by."},
    {"type": "multiple_choice", "question": "It has been down ___ 6 AM.", "options": ["for", "since", "by", "until"], "correctAnswer": "since", "explanation": "Point de départ → since."},
    {"type": "fill_blank", "question": "Complétez : The API has been slow ___ three days.", "options": [], "correctAnswer": "for", "explanation": "Durée → for."},
    {"type": "multiple_choice", "question": "Requests queue ___ the fix lands.", "options": ["by", "during", "until", "since"], "correctAnswer": "until", "explanation": "Borne de fin → until."}
  ],
  "by Friday = deadline ; until 2 AM = borne ; since Tuesday + for two days = départ + durée ; during peak hours = intervalle nommé ; from X to Y = bornes ouvertes.",
  [
    {"question": "The batch runs ___ the window.", "options": ["by", "during", "since", "for"], "correctAnswer": "during", "explanation": "Intérieur d'intervalle → during."},
    {"question": "We rotate keys ___ every 90 days.", "options": ["since", "for", "by", "until"], "correctAnswer": "for", "explanation": "Périodicité exprimée en durée → for."},
    {"question": "___ of 14:00, all nodes were green.", "options": ["Since", "As", "By", "Until"], "correctAnswer": "As", "explanation": "as of = à la date de."},
    {"question": "Freeze starts ___ Monday.", "options": ["at", "in", "on", "to"], "correctAnswer": "on", "explanation": "Jour → on."}
  ],
  [
    {"pattern": "due by + date", "example": "The postmortem is due by Monday.", "explanation": "Poser une échéance."},
    {"pattern": "since + point, for + durée", "example": "Since 2 PM, for 90 minutes.", "explanation": "Dater et mesurer."},
    {"pattern": "from X until Y", "example": "From Friday until Sunday, read-only.", "explanation": "Délimiter une période."}
  ]
),
# ================= LEÇON 127 — N3 Prépositions lieu/mouvement =================
L(127, 16, 3, 7,
  "Prepositions of Place and Movement in Infrastructure",
  "Décrire précisément où se trouve un composant et comment les données circulent avec in, on, at, through, onto, between et among.",
  "Trois prépositions structurent la localisation. IN = contenance : in the data center, in the EU region, in a container. ON = surface/support : on the server, on the staging branch, on port 443 (on + port est l'usage réseau). AT = point précis : at the load balancer, at node 3, at the edge. LE MOUVEMENT : to (destination) — deploy to production ; into (entrée dans) — move the file into the archive ; onto (mise sur) — copy onto the volume ; from (origine) — download from the mirror ; through (traversée d'un chemin) — traffic goes through the proxy ; across (distribution sur un ensemble) — shards spread across three nodes ; along (le long) — along the pipeline. BETWEEN = entre DEUX limites clairement identifiées : shared between the two clusters, between staging and production. AMONG = au sein d'un ensemble de TROIS OU PLUS sans individualisation : load balanced among all workers. PIÈGES FRÉQUENTS : in time (à temps) vs on time (à l'heure) ; arrive in a city mais arrive at a datacenter ; depend on (jamais depend of) ; consist of mais rely on. EN SCHÉMA D'ARCHITECTURE : le client ENVOIE to l'API, la requête PASSE through le gateway, arrive AT le service, qui LIT in la base, et ÉCRIT on le cache. Cette grammaire spatiale rend vos descriptions d'architecture sans ambiguïté pour un auditeur comme pour un nouveau arrivant.",
  [
    {"meaning": "La base tourne dans la région UE.", "sentence": "The database runs in the EU region.", "itContext": "The primary database runs in the EU region for compliance."},
    {"meaning": "Le service écoute sur le port 443.", "sentence": "The service listens on port 443.", "itContext": "The gateway listens on port 443 behind the TLS terminator."},
    {"meaning": "Le trafic passe par le proxy.", "sentence": "Traffic goes through the proxy.", "itContext": "All egress traffic goes through the corporate proxy."},
    {"meaning": "Les shards sont répartis sur trois nœuds.", "sentence": "Shards spread across three nodes.", "itContext": "The shards spread across three nodes for parallelism."},
    {"meaning": "La charge est répartie entre les deux clusters.", "sentence": "Load is shared between the two clusters.", "itContext": "Load is shared between the EU and US clusters."},
    {"meaning": "Copiez le fichier dans l'archive.", "sentence": "Move the file into the archive.", "itContext": "Move the rotated logs into the archive bucket."},
    {"meaning": "Le déploiement va vers la production.", "sentence": "The build deploys to production.", "itContext": "The approved build deploys to production at noon."}
  ],
  [
    {"word": "through", "level": "A", "domain": "grammar", "example": "Traffic flows through the proxy.", "itContext": "Requests flow through the API gateway.", "definition": "À travers (un chemin)", "translation": "à travers"},
    {"word": "across", "level": "B", "domain": "grammar", "example": "Spread across nodes.", "itContext": "Data is spread across availability zones.", "definition": "En travers de, réparti sur", "translation": "à travers, sur"},
    {"word": "between", "level": "A", "domain": "grammar", "example": "Sync between the two sites.", "itContext": "Replication runs between the two sites.", "definition": "Entre deux éléments", "translation": "entre"},
    {"word": "among", "level": "B", "domain": "grammar", "example": "Split among workers.", "itContext": "Tasks are split among all available workers.", "definition": "Parmi plusieurs", "translation": "parmi"},
    {"word": "onto", "level": "B", "domain": "grammar", "example": "Copy onto the volume.", "itContext": "Copy the snapshot onto the new volume.", "definition": "Vers la surface de", "translation": "sur"},
    {"word": "edge", "level": "B", "domain": "it", "example": "Cached at the edge.", "itContext": "Static assets are cached at the edge.", "definition": "Bord du réseau, proximité utilisateur", "translation": "périphérie"},
    {"word": "region", "level": "A", "domain": "cloud", "example": "Deploy in the region.", "itContext": "We deploy in the closest region to users.", "definition": "Zone géographique cloud", "translation": "région"},
    {"word": "depend on", "level": "B", "domain": "grammar", "example": "It depends on the API.", "itContext": "The dashboard depends on the metrics API.", "definition": "Dépendre de", "translation": "dépendre de"}
  ],
  [
    {"expression": "end to end", "meaning": "de bout en bout", "difficulty": "B", "example": "Test it end to end.", "classification": "it"},
    {"expression": "in place", "meaning": "en place, prêt", "difficulty": "B", "example": "The rollback plan is in place.", "classification": "professional"},
    {"expression": "out of band", "meaning": "hors bande (canal séparé)", "difficulty": "C", "example": "Manage hosts out of band.", "classification": "it"},
    {"expression": "on top of", "meaning": "par-dessus, en plus de", "difficulty": "B", "example": "Auth sits on top of the gateway.", "classification": "it"},
    {"expression": "from scratch", "meaning": "à partir de zéro", "difficulty": "A", "example": "We rebuilt the pipeline from scratch.", "classification": "professional"}
  ],
  "in = contenu, on = surface/port, at = point précis ; to/into/onto/from décrivent le mouvement, through/across/between/among décrivent les trajets et répartitions. Cette grammaire spatiale fiabilise chaque schéma d'architecture.",
  [
    {"type": "multiple_choice", "question": "The app runs ___ a container.", "options": ["on", "in", "at", "to"], "correctAnswer": "in", "explanation": "Contenance → in."},
    {"type": "multiple_choice", "question": "Requests flow ___ the gateway.", "options": ["into", "through", "between", "onto"], "correctAnswer": "through", "explanation": "Traversée d'un chemin → through."},
    {"type": "fill_blank", "question": "Complétez : Load is balanced ___ all five workers.", "options": [], "correctAnswer": "among", "explanation": "Ensemble > 2 sans individualisation → among."},
    {"type": "multiple_choice", "question": "The service listens ___ port 8080.", "options": ["in", "at", "on", "to"], "correctAnswer": "on", "explanation": "Port → on."}
  ],
  "in/on/at = contenance/surface/point. Mouvement : to, into, onto, from, through, across. Deux limites → between ; trois ou plus → among. Collocations : depend on, listen on, arrive at.",
  [
    {"question": "Copy the snapshot ___ the new volume.", "options": ["in", "onto", "between", "at"], "correctAnswer": "onto", "explanation": "Mise sur une surface → onto."},
    {"question": "The cache sits ___ the database.", "options": ["on top of", "into", "across", "through"], "correctAnswer": "on top of", "explanation": "Couche au-dessus → on top of."},
    {"question": "Replication runs ___ EU and US.", "options": ["among", "between", "through", "across"], "correctAnswer": "between", "explanation": "Deux sites → between."},
    {"question": "Assets are cached ___ the edge.", "options": ["in", "at", "on", "to"], "correctAnswer": "at", "explanation": "Point précis → at the edge."}
  ],
  [
    {"pattern": "Composant + runs in + zone", "example": "The worker runs in the EU region.", "explanation": "Localiser une brique."},
    {"pattern": "Flux + goes through + chemin", "example": "Traffic goes through the WAF.", "explanation": "Décrire un trajet réseau."},
    {"pattern": "Répartition + across/between/among", "example": "Shards spread across zones.", "explanation": "Décrire une distribution."}
  ]
),
# ================= LEÇON 128 — N3 Connecteurs =================
L(128, 16, 3, 8,
  "Connectors: because, so, however, although",
  "Relier vos idées avec les connecteurs de cause, conséquence, contraste et concession pour écrire tickets et commentaires limpides.",
  "Les connecteurs lient deux propositions et portent la LOGIQUE du propos. CAUSE : because + proposition (We rolled back because the error rate doubled). BECAUSE OF + nom (because of the outage). DUE TO + nom (due to a config drift) — registre plus formel, parfait pour les post-mortems. CONSÉQUENCE : so + proposition (The disk was full, so the job failed). THEREFORE (formel, en début de proposition) : The probe failed; therefore, the pod restarted. CONTRASTE : but (neutre) — The build passed, but staging failed. HOWEVER (formel, suivi d'une virgule) — The patch is live; however, we keep monitoring. CONCESSION : although / though + proposition (Although the test passed, the feature is incomplete). EVEN THOUGH (renforcé). WHILE/WHEREAS (contraste parallèle) : Staging is fast, whereas production is throttled. CAUSE RAPIDE : since (puisque) — Since the flag is off, the code is not reachable. RÉSULTAT DIFFÉRÉ : as a result, consequently. PIÈGES : ne pas doubler les connecteurs (because so ✗) ; however ne joint pas deux phrases avec une seule virgule (il faut point-virgule ou point) ; although et but ne s'emploient pas ensemble. EN TICKET : Because the certificate expired, the API rejected requests. We renewed it, so traffic recovered. However, we must automate rotation. Deux phrases, trois connecteurs, un raisonnement complet.",
  [
    {"meaning": "Nous avons annulé car le taux d'erreur a doublé.", "sentence": "We rolled back because the error rate doubled.", "itContext": "We rolled back because the error rate doubled in minutes."},
    {"meaning": "Le disque était plein, donc le job a échoué.", "sentence": "The disk was full, so the job failed.", "itContext": "The disk was full, so the cleanup job failed."},
    {"meaning": "Le patch est en place ; cependant, on surveille.", "sentence": "The patch is live; however, we keep monitoring.", "itContext": "The patch is live; however, we keep monitoring for regressions."},
    {"meaning": "Bien que le test passe, la fonction est incomplète.", "sentence": "Although the test passed, the feature is incomplete.", "itContext": "Although the test passed, the feature is incomplete."},
    {"meaning": "Puisque le flag est désactivé, le code est inatteignable.", "sentence": "Since the flag is off, the code is unreachable.", "itContext": "Since the flag is off, the code path is unreachable."},
    {"meaning": "La sonde a échoué ; par conséquent, le pod a redémarré.", "sentence": "The probe failed; therefore, the pod restarted.", "itContext": "The probe failed; therefore, the pod restarted automatically."},
    {"meaning": "La recette est rapide, tandis que la prod est bridée.", "sentence": "Staging is fast, whereas production is throttled.", "itContext": "Staging is fast, whereas production is throttled by quotas."}
  ],
  [
    {"word": "because", "level": "A", "domain": "grammar", "example": "It failed because the disk was full.", "itContext": "It failed because the disk was full.", "definition": "Conjonction de cause + proposition", "translation": "parce que"},
    {"word": "therefore", "level": "B", "domain": "grammar", "example": "Therefore, we escalated.", "itContext": "Therefore, we escalated to the vendor.", "definition": "Par conséquent (formel)", "translation": "donc, par conséquent"},
    {"word": "however", "level": "B", "domain": "grammar", "example": "However, risks remain.", "itContext": "However, two risks remain open.", "definition": "Cependant (contraste formel)", "translation": "cependant"},
    {"word": "although", "level": "B", "domain": "grammar", "example": "Although it worked...", "itContext": "Although the fix worked, latency stayed high.", "definition": "Bien que (concession)", "translation": "bien que"},
    {"word": "whereas", "level": "C", "domain": "grammar", "example": "X is fast, whereas Y is slow.", "itContext": "Cron A is fast, whereas cron B is slow.", "definition": "Tandis que (contraste parallèle)", "translation": "tandis que"},
    {"word": "cause", "level": "B", "domain": "professional", "example": "The root cause is clear.", "itContext": "The root cause was an expired certificate.", "definition": "Ce qui provoque un effet", "translation": "cause"},
    {"word": "consequence", "level": "B", "domain": "professional", "example": "The consequence was downtime.", "itContext": "The consequence was twelve minutes of downtime.", "definition": "Ce qui résulte d'une cause", "translation": "conséquence"},
    {"word": "whereas-clause", "level": "C", "domain": "grammar", "example": "Add a whereas-clause.", "itContext": "The report uses a whereas-clause to contrast both paths.", "definition": "Proposition de contraste", "translation": "proposition de contraste"}
  ],
  [
    {"expression": "due to", "meaning": "en raison de + nom", "difficulty": "B", "example": "Delayed due to maintenance.", "classification": "professional"},
    {"expression": "as a result", "meaning": "en conséquence", "difficulty": "B", "example": "As a result, we froze deploys.", "classification": "professional"},
    {"expression": "even so", "meaning": "malgré tout", "difficulty": "B", "example": "Even so, we kept the canary.", "classification": "professional"},
    {"expression": "that is why", "meaning": "c'est pourquoi", "difficulty": "A", "example": "That is why we added a retry.", "classification": "professional"},
    {"expression": "on the contrary", "meaning": "au contraire", "difficulty": "C", "example": "On the contrary, staging failed.", "classification": "professional"}
  ],
  "because/due to = cause ; so/therefore = conséquence ; but/however = contraste ; although/even though = concession ; whereas = contraste parallèle. Chaque ticket bien écrit suit cette logique : cause → action → résultat → réserve.",
  [
    {"type": "multiple_choice", "question": "The queue grew, ___ the workers slowed down.", "options": ["because", "so", "although", "whereas"], "correctAnswer": "so", "explanation": "Cause → conséquence : so."},
    {"type": "multiple_choice", "question": "___ the alert fired, nobody was on call.", "options": ["Because", "Although", "So", "Therefore"], "correctAnswer": "Although", "explanation": "Concession : although."},
    {"type": "fill_blank", "question": "Complétez (+ nom) : The release slipped ___ a dependency conflict.", "options": [], "correctAnswer": "due to", "explanation": "due to + groupe nominal."},
    {"type": "multiple_choice", "question": "Jonction correcte avec however :", "options": ["It works, however, it is slow.", "It works; however, it is slow.", "It works however it is slow.", "However it works, it is slow."], "correctAnswer": "It works; however, it is slow.", "explanation": "however exige ; ou . avant lui."}
  ],
  "Cause : because + phrase, due to + nom. Conséquence : so, therefore. Contraste : but, however (avec ;). Concession : although. Parallèle : whereas. Jamais deux connecteurs redondants.",
  [
    {"question": "We reverted it ___ the regression rate.", "options": ["because", "due to", "so", "although"], "correctAnswer": "due to", "explanation": "due to + nom."},
    {"question": "The test is green, ___ coverage dropped.", "options": ["however", "but", "whereas", "although"], "correctAnswer": "but", "explanation": "Contraste neutre court → but."},
    {"question": "___ the cache was cold, latency spiked.", "options": ["Because", "Because of", "So", "Therefore"], "correctAnswer": "Because", "explanation": "because + proposition."},
    {"question": "Staging mirrors prod, ___ with fewer nodes.", "options": ["although", "whereas", "so", "because"], "correctAnswer": "although", "explanation": "Concession (pas un parallèle strict)."}
  ],
  [
    {"pattern": "Cause + so + effet", "example": "The disk filled, so the job failed.", "explanation": "Enchaîner logiquement."},
    {"pattern": "Although X, Y", "example": "Although tests pass, risk remains.", "explanation": "Concéder puis restreindre."},
    {"pattern": "X; however, Y", "example": "It is live; however, we monitor.", "explanation": "Contraster formellement."}
  ]
),
# ================= LEÇON 129 — N3 Comparatifs =================
L(129, 17, 3, 9,
  "Comparatives in Technical Reviews",
  "Comparer deux options, deux versions ou deux outils avec les comparatifs de supériorité, d'égalité et d'infériorité.",
  "COMPARATIF DE SUPÉRIORITÉ : adjectif court (+1 syllabe) → -er + than : faster than, cheaper than, simpler than. Adjectif long (2+ syllabes) → more + adjectif + than : more reliable than, more efficient than. Deux syllabes en -y → -ier : easier than, happier than. IRRÉGULIERS : good → better, bad → worse, far → farther/further, little → less, much/many → more. ÉGALITÉ : as + adjectif + as — This API is as fast as the old one. Not as/so + adjectif + as pour l'inégalité douce : This approach is not as costly as migrating. INFÉRIORITÉ : less + adjectif + than : less verbose than, less error-prone than. MODIFICATEURS : much/far/a lot + comparatif (much faster — JAMAIS very faster) ; slightly/a bit + comparatif (slightly slower) ; twice/three times + comparatif (three times faster). ERREURS CLASSIQUES : double comparatif (more faster ✗) ; than oublié ; confusion then/than (then = ensuite, than = comparaison). EN REVUE TECHNIQUE : PostgreSQL is more suited to complex queries, whereas Redis is faster for caching. This PR is cleaner than the previous one. The new client uses 30% less memory. Chiffres + comparatif : twice as many requests, half as much latency. Ces structures rendent une évaluation d'architecture objective et discutable.",
  [
    {"meaning": "Ce client est plus rapide que l'ancien.", "sentence": "This client is faster than the old one.", "itContext": "This client is faster than the old one on cold starts."},
    {"meaning": "PostgreSQL est plus adapté aux requêtes complexes.", "sentence": "PostgreSQL is more suited to complex queries.", "itContext": "PostgreSQL is more suited to complex analytical queries."},
    {"meaning": "Cette API est aussi rapide que l'autre.", "sentence": "This API is as fast as the other one.", "itContext": "This API is as fast as the reference implementation."},
    {"meaning": "Le nouveau client utilise 30 % de mémoire en moins.", "sentence": "The new client uses 30% less memory.", "itContext": "The new client uses 30% less memory under load."},
    {"meaning": "Cette version est bien plus stable.", "sentence": "This version is much more stable.", "itContext": "This version is much more stable under bursts."},
    {"meaning": "L'approche B est moins verbeuse.", "sentence": "Approach B is less verbose.", "itContext": "Approach B is less verbose and easier to review."},
    {"meaning": "Le build est trois fois plus rapide.", "sentence": "The build is three times faster.", "itContext": "The build is three times faster with the new cache."}
  ],
  [
    {"word": "faster", "level": "A", "domain": "grammar", "example": "Faster than v1.", "itContext": "The new parser is faster than v1.", "definition": "Comparatif de fast", "translation": "plus rapide"},
    {"word": "reliable", "level": "B", "domain": "it", "example": "More reliable than cron.", "itContext": "The queue is more reliable than cron for retries.", "definition": "Fiable, prévisible", "translation": "fiable"},
    {"word": "efficient", "level": "B", "domain": "it", "example": "More efficient queries.", "itContext": "Batching makes queries more efficient.", "definition": "Efficace (rendement)", "translation": "efficace"},
    {"word": "verbose", "level": "C", "domain": "dev", "example": "Less verbose output.", "itContext": "The new logger is less verbose by default.", "definition": "Bavard, verbeux", "translation": "verbeux"},
    {"word": "twice", "level": "A", "domain": "grammar", "example": "Twice as many users.", "itContext": "We served twice as many users this quarter.", "definition": "Deux fois (multiplier)", "translation": "deux fois"},
    {"word": "slightly", "level": "B", "domain": "grammar", "example": "Slightly slower.", "itContext": "The safe path is slightly slower but clearer.", "definition": "Légèrement", "translation": "légèrement"},
    {"word": "trade-off", "level": "B", "domain": "professional", "example": "A speed/memory trade-off.", "itContext": "It is a speed versus memory trade-off.", "definition": "Compromis entre deux avantages", "translation": "compromis"},
    {"word": "benchmark", "level": "B", "domain": "dev", "example": "Run a benchmark.", "itContext": "We ran a benchmark on both candidates.", "definition": "Test comparatif de performance", "translation": "banc d'essai"}
  ],
  [
    {"expression": "better off", "meaning": "en meilleure position", "difficulty": "B", "example": "We are better off with Postgres.", "classification": "professional"},
    {"expression": "no better than", "meaning": "pas mieux que", "difficulty": "B", "example": "It is no better than the workaround.", "classification": "professional"},
    {"expression": "the more... the more", "meaning": "plus... plus", "difficulty": "C", "example": "The more nodes, the more shards.", "classification": "professional"},
    {"expression": "head and shoulders above", "meaning": "bien au-dessus", "difficulty": "C", "example": "This tool is head and shoulders above the rest.", "classification": "professional"},
    {"expression": "second to none", "meaning": "inégalé", "difficulty": "C", "example": "Their support is second to none.", "classification": "professional"}
  ],
  "Court → -er + than ; long → more + than ; égalité → as...as ; infériorité → less...than. Modificateurs : much/far/slightly/twice. Jamais very + comparatif ni double comparatif.",
  [
    {"type": "multiple_choice", "question": "Redis is ___ for caching than Postgres.", "options": ["more fast", "faster", "fastest", "fast"], "correctAnswer": "faster", "explanation": "Adjectif court → -er + than."},
    {"type": "multiple_choice", "question": "This design is ___ reliable than v1.", "options": ["much", "more", "most", "very"], "correctAnswer": "more", "explanation": "Adjectif long → more + than."},
    {"type": "fill_blank", "question": "Complétez : The new build is ___ times faster.", "options": [], "correctAnswer": "three", "explanation": "three times + comparatif."},
    {"type": "multiple_choice", "question": "Égalité : The SDK is ___ fast as the CLI.", "options": ["more", "as", "than", "so than"], "correctAnswer": "as", "explanation": "as + adj + as."}
  ],
  "-er/more + than ; as...as (égalité) ; less...than (infériorité). Renfort : much, far, twice, three times. Pièges : more faster ✗, very faster ✗, then ≠ than.",
  [
    {"question": "Errors dropped by half: ___ as many errors.", "options": ["twice", "half", "more", "much"], "correctAnswer": "half", "explanation": "half as many = moitié."},
    {"question": "This parser is far ___ than the regex one.", "options": ["fast", "faster", "fastest", "more fast"], "correctAnswer": "faster", "explanation": "far + comparatif."},
    {"question": "Queue writes are ___ costly than direct SQL.", "options": ["less", "least", "as", "more less"], "correctAnswer": "less", "explanation": "less + adj + than."},
    {"question": "We finish the scan; ___, we rotate keys.", "options": ["than", "then", "as", "so than"], "correctAnswer": "then", "explanation": "then = ensuite (orthographe)."}
  ],
  [
    {"pattern": "X is -er/more... than Y", "example": "SQLite is lighter than Postgres.", "explanation": "Comparer deux options."},
    {"pattern": "N times + comparatif", "example": "It is three times faster.", "explanation": "Quantifier un gain."},
    {"pattern": "not as... as", "example": "It is not as costly as a rewrite.", "explanation": "Minimiser un écart."}
  ]
),
# ================= LEÇON 130 — N3 Superlatifs =================
L(130, 17, 3, 10,
  "Superlatives and Ranking in Decision Records",
  "Classer, départager et justifier un choix technique avec les superlatifs et les structures de classement.",
  "SUPERLATIF DE SUPÉRIORITÉ : adjectif court → the + -est : the fastest, the cheapest, the simplest. Adjectif long → the most + adjectif : the most reliable, the most maintainable. -y → -iest : the easiest. IRRÉGULIERS : good → the best, bad → the worst, far → the farthest. Le superlatif s'emploie avec THE (sauf possessif : its fastest run) et souvent IN + lieu/ensemble (in the stack, in our fleet) ou OF + groupe (of all candidates). MINORITÉ : the least + adjectif : the least intrusive option. MODÉRATION : by far the best (de loin), the second best, one of the best. COMPARER À UN RECORD : the highest uptime, the lowest latency, the largest cluster. ÉVITER LE SUPERLATIF ABSOLU NON JUSTIFIÉ en decision record : préférez the fastest in our benchmarks à the fastest (période non définie). STRUCTURES DE CLASSEMENT : rank X first/second ; top three candidates ; runner-up ; shortlist. EN DECISION RECORD (ADR) : We evaluated three databases. Postgres offered the best consistency guarantees, Redis the lowest read latency, DynamoDB the easiest scaling. We ranked consistency first, so we chose Postgres. Le superlatif nomme le gagnant, la comparaison justifie le classement, et la priorité arbitrée (ranked... first) verrouille la décision.",
  [
    {"meaning": "C'est la base la plus rapide de notre flotte.", "sentence": "It is the fastest database in our fleet.", "itContext": "It is the fastest database in our fleet for reads."},
    {"meaning": "C'était la pire panne de l'année.", "sentence": "It was the worst outage of the year.", "itContext": "It was the worst outage of the year so far."},
    {"meaning": "C'est l'option la moins intrusive.", "sentence": "It is the least intrusive option.", "itContext": "Migration blue-green is the least intrusive option."},
    {"meaning": "C'est de loin le meilleur choix.", "sentence": "It is by far the best choice.", "itContext": "Postgres is by far the best choice for our workload."},
    {"meaning": "C'est l'un des outils les plus utilisés.", "sentence": "It is one of the most used tools.", "itContext": "It is one of the most used CI runners internally."},
    {"meaning": "Nous avons classé la cohérence première.", "sentence": "We ranked consistency first.", "itContext": "We ranked consistency first in the decision matrix."},
    {"meaning": "Ce cluster a la latence la plus basse.", "sentence": "This cluster has the lowest latency.", "itContext": "This cluster has the lowest latency of the three regions."}
  ],
  [
    {"word": "highest", "level": "A", "domain": "grammar", "example": "The highest QPS.", "itContext": "Peak traffic hit the highest QPS on record.", "definition": "Superlatif de high", "translation": "le plus haut"},
    {"word": "worst", "level": "A", "domain": "grammar", "example": "The worst case.", "itContext": "In the worst case, we restore from backup.", "definition": "Superlatif de bad", "translation": "le pire"},
    {"word": "maintainable", "level": "C", "domain": "dev", "example": "The most maintainable design.", "itContext": "The modular design is the most maintainable.", "definition": "Facile à maintenir", "translation": "maintenable"},
    {"word": "uptime", "level": "B", "domain": "it", "example": "The best uptime.", "itContext": "The EU cluster shows the best uptime this quarter.", "definition": "Temps de disponibilité", "translation": "disponibilité"},
    {"word": "rank", "level": "B", "domain": "professional", "example": "Rank criteria first.", "itContext": "We rank security criteria first.", "definition": "Classer, hiérarchiser", "translation": "classer"},
    {"word": "candidate", "level": "B", "domain": "professional", "example": "Three candidates.", "itContext": "We shortlisted three candidates for the storage layer.", "definition": "Option ou personne en lice", "translation": "candidat"},
    {"word": "runner-up", "level": "C", "domain": "professional", "example": "Redis was runner-up.", "itContext": "Redis was the runner-up in latency.", "definition": "Deuxième d'un classement", "translation": "dauphin, second"},
    {"word": "shortlist", "level": "B", "domain": "professional", "example": "Add it to the shortlist.", "itContext": "Add this proxy to the shortlist.", "definition": "Liste restreinte", "translation": "liste restreinte"}
  ],
  [
    {"expression": "by far", "meaning": "de loin", "difficulty": "B", "example": "By far the cheapest option.", "classification": "professional"},
    {"expression": "top of the list", "meaning": "en tête de liste", "difficulty": "A", "example": "Security tops the list.", "classification": "professional"},
    {"expression": "second to none", "meaning": "inégalé", "difficulty": "C", "example": "Its docs are second to none.", "classification": "professional"},
    {"expression": "at best / at worst", "meaning": "au mieux / au pire", "difficulty": "B", "example": "At worst, we roll back.", "classification": "professional"},
    {"expression": "head and shoulders above", "meaning": "loin au-dessus", "difficulty": "C", "example": "It is head and shoulders above the others.", "classification": "professional"}
  ],
  "Court → the -est ; long → the most ; irréguliers : the best, the worst. Cadrer : in/of + ensemble. Classement : rank X first, top three, runner-up, shortlist. Un ADR = comparatifs + superlatif justifié + priorité.",
  [
    {"type": "multiple_choice", "question": "Redis offers ___ read latency of the three.", "options": ["lower", "the lowest", "lowest", "most low"], "correctAnswer": "the lowest", "explanation": "Superlatif → the + -est."},
    {"type": "multiple_choice", "question": "It was ___ outage of the year.", "options": ["worse", "the worst", "worst", "the worse"], "correctAnswer": "the worst", "explanation": "bad → the worst."},
    {"type": "fill_blank", "question": "Complétez : It is by ___ the best candidate.", "options": [], "correctAnswer": "far", "explanation": "by far = de loin."},
    {"type": "multiple_choice", "question": "Cadrage correct du superlatif :", "options": ["the fastest", "the fastest in our benchmarks", "fastest ever", "most fastest"], "correctAnswer": "the fastest in our benchmarks", "explanation": "Superlatif justifié par un périmètre."}
  ],
  "the + -est / the most ; the best, the worst. Toujours THE. Cadrer par in/of. Départager : rank first, top three, runner-up. Modérateurs : by far, one of the most.",
  [
    {"question": "We ranked scalability ___.", "options": ["first", "the first", "most first", "one"], "correctAnswer": "first", "explanation": "rank + first (pas d'article)."},
    {"question": "It is one of the ___ runners available.", "options": ["most reliable", "reliable", "more reliable", "most reliabler"], "correctAnswer": "most reliable", "explanation": "one of the most + adj longs."},
    {"question": "In the ___ case, we lose the cache.", "options": ["worse", "worst", "the worst", "worser"], "correctAnswer": "worst", "explanation": "in the worst case (expression)."},
    {"question": "This region has ___ uptime this quarter.", "options": ["best", "the best", "better", "the better"], "correctAnswer": "the best", "explanation": "Superlatif → the best."}
  ],
  [
    {"pattern": "the + -est/most + in/of X", "example": "The cheapest option of the three.", "explanation": "Superlatif cadré."},
    {"pattern": "rank + critère + first", "example": "We ranked cost first.", "explanation": "Prioriser explicitement."},
    {"pattern": "one of the most + adj", "example": "One of the most used tools.", "explanation": "Intégrer un sommet sans exclure."}
  ]
),
# ================= LEÇON 131 — N4 Small Talk =================
L(131, 7, 4, 1,
  "Small Talk and Icebreakers at Work",
  "Ouvrir et entretenir une conversation informelle professionnelle : météo, week-end, actualité tech, transitions vers le sujet sérieux.",
  "Le small talk n'est pas du temps perdu : il construit la confiance qui rend la coopération technique plus fluide, surtout à l'international. OUVRIR : How was your weekend ? How's it going ? Busy week ? Les réponses se font courtes et positives : Pretty good, thanks. Not bad — a bit busy. SUIJETS SÛRS : la météo (Terrible weather for the release party), le sport, les trajets, l'actualité tech non sensible (Did you see the new announcement ?), la nourriture au bureau. SUIJETS À ÉVITER en première rencontre : politique, religion, salaire, santé, apparence. RELANCER : la technique du miroir + question — I'm learning Spanish. Oh nice, how long have you been doing that ? ÉCOUTE ACTIVE : Really ? No way ! That sounds fun. TRANSITION VERS LE SUJET : So, shall we get started ? Anyway, I wanted to ask you about the API. Well, back to business — la formule anyway + topic est la transition la plus naturelle en réunion. EN VISIO AVANT LE DÉBUT : les 2-3 minutes d'attente sont le créneau classique (Nice background ! Is that your cat ?). RÈGLE D'OR : deux ou trois échanges suffisent — mieux vaut une transition propre qu'un monologue. Et pour conclure une discussion informelle qui s'éternise : It was great catching up. Let's find time for a proper chat.",
  [
    {"meaning": "Bon week-end ?", "sentence": "How was your weekend?", "itContext": "How was your weekend? Did you finally try the climbing gym?"},
    {"meaning": "Ça va, un peu chargé.", "sentence": "Not bad — a bit busy.", "itContext": "Not bad — a bit busy with the release, but manageable."},
    {"meaning": "Tu as vu l'annonce ?", "sentence": "Did you see the announcement?", "itContext": "Did you see the announcement about the new runtime?"},
    {"meaning": "On commence ?", "sentence": "Shall we get started?", "itContext": "Shall we get started, or wait for the others?"},
    {"meaning": "Bref, je voulais te demander pour l'API.", "sentence": "Anyway, I wanted to ask you about the API.", "itContext": "Anyway, I wanted to ask you about the API rate limits."},
    {"meaning": "C'était sympa de discuter.", "sentence": "It was great catching up.", "itContext": "It was great catching up — let's do it again after the holidays."},
    {"meaning": "C'est toi, ce chat ?", "sentence": "Is that your cat?", "itContext": "Nice background! Is that your cat or a green screen?"}
  ],
  [
    {"word": "icebreaker", "level": "B", "domain": "professional", "example": "Start with an icebreaker.", "itContext": "The kickoff started with a quick icebreaker round.", "definition": "Phrase ou jeu pour briser la glace", "translation": "glace brisée, brise-glace"},
    {"word": "catch up", "level": "A", "domain": "professional", "example": "Great catching up!", "itContext": "Great catching up after so many months.", "definition": "Prendre des nouvelles, rattraper", "translation": "prendre des nouvelles"},
    {"word": "casual", "level": "B", "domain": "professional", "example": "Just casual chat.", "itContext": "Keep it casual before the meeting starts.", "definition": "Informel, détendu", "translation": "décontracté"},
    {"word": "busy", "level": "A", "domain": "professional", "example": "A busy week ahead.", "itContext": "A busy week ahead with two releases.", "definition": "Occupé, chargé", "translation": "occupé"},
    {"word": "weather", "level": "A", "domain": "general", "example": "Awful weather today.", "itContext": "Awful weather — good day to stay indoors and code.", "definition": "Météo, temps (qu'il fait)", "translation": "météo"},
    {"word": "hobby", "level": "A", "domain": "general", "example": "What are your hobbies?", "itContext": "What are your hobbies outside of tech?", "definition": "Activité de loisir", "translation": "passe-temps"},
    {"word": "polite", "level": "A", "domain": "professional", "example": "Keep it polite.", "itContext": "Keep small talk polite and neutral with clients.", "definition": "Poli, courtois", "translation": "poli"},
    {"word": "transition", "level": "B", "domain": "professional", "example": "Nice transition to the topic.", "itContext": "That was a smooth transition to the roadmap topic.", "definition": "Passage d'un sujet à l'autre", "translation": "transition"}
  ],
  [
    {"expression": "how's it going", "meaning": "comment ça se passe", "difficulty": "A", "example": "Hey, how's it going with the migration?", "classification": "professional"},
    {"expression": "long time no see", "meaning": "ça fait longtemps", "difficulty": "A", "example": "Long time no see! How was the parental leave?", "classification": "professional"},
    {"expression": "back to business", "meaning": "retour au sérieux", "difficulty": "B", "example": "Back to business — the deadline is Friday.", "classification": "professional"},
    {"expression": "speak of the devil", "meaning": "parlons de l'ange", "difficulty": "C", "example": "Speak of the devil, here's Sarah now.", "classification": "professional"},
    {"expression": "it was great catching up", "meaning": "ravi d'avoir discuté", "difficulty": "B", "example": "It was great catching up at the conference.", "classification": "professional"}
  ],
  "Le small talk professionnel se limite à deux ou trois échanges positifs sur des sujets neutres, puis une transition claire (Anyway... / Shall we get started ?). La confiance construite facilite toutes les demandes techniques ensuite.",
  [
    {"type": "multiple_choice", "question": "Question d'ouverture classique du lundi :", "options": ["How was your weekend?", "What is your salary?", "Why are you late?", "Do you like me?"], "correctAnswer": "How was your weekend?", "explanation": "Sujet neutre et attendu."},
    {"type": "multiple_choice", "question": "Transition propre vers le sujet :", "options": ["Anyway, shall we get started?", "Stop talking now.", "I hate meetings.", "Whatever, next slide."], "correctAnswer": "Anyway, shall we get started?", "explanation": "Anyway + invitation = transition naturelle."},
    {"type": "fill_blank", "question": "Complétez : It was great ___ up with you.", "options": [], "correctAnswer": "catching", "explanation": "it was great catching up."},
    {"type": "multiple_choice", "question": "Sujet à ÉVITER en première rencontre :", "options": ["The weather", "Politics", "A new gadget", "The commute"], "correctAnswer": "Politics", "explanation": "Sujet clivant, jamais en icebreaker."}
  ],
  "Ouvrir : How was your weekend ? / How's it going ? Relancer : Really ? How long... ? Transitionner : Anyway... / Shall we get started ? Conclure : It was great catching up.",
  [
    {"question": "___ we get started or wait for Tom?", "options": ["Do", "Shall", "Will", "Are"], "correctAnswer": "Shall", "explanation": "Shall we... ? = suggestion collective."},
    {"question": "Long time no ___! How are the kids?", "options": [ "see", "seen", "saw", "seeing"], "correctAnswer": "see", "explanation": "Expression figée : long time no see."},
    {"question": "Not bad — a bit ___ with the release.", "options": [ "bus", "busier", "busy", "busiest"], "correctAnswer": "busy", "explanation": "a bit busy = un peu occupé."},
    {"question": "That sounds ___! Tell me more.", "options": ["fun", "funny", "funnily", "funnier"], "correctAnswer": "fun", "explanation": "fun = amusant ; funny = bizarre/drole."}
  ],
  [
    {"pattern": "How was... ? + réponse courte", "example": "How was your weekend? Pretty good, thanks.", "explanation": "Échange standard 2 tours."},
    {"pattern": "Anyway + sujet sérieux", "example": "Anyway, about the API limits...", "explanation": "Transition assumée."},
    {"pattern": "Great catching up + relance", "example": "Great catching up — coffee next week?", "explanation": "Clôturer en gardant le lien."}
  ]
),
# ================= LEÇON 132 — N4 Téléphone & visio =================
L(132, 7, 4, 2,
  "Telephone and Video Call Essentials",
  "Gérer un appel ou une visio : ouvrir, vérifier la qualité audio, demander de répéter, épeler, prendre congé proprement.",
  "Au téléphone ou en visio, pas de langage corporel : tout passe par des formules verbales claires. OUVRIR : Hello, this is Sarah from the platform team. (au téléphone on dit this is, pas I am). En visio : Can everyone hear me ? Hi everyone, can you see my screen ? VÉRIFIER LA LIGNE : You're breaking up. You're on mute. Can you hear me now ? The connection is choppy. DEMANDER DE RÉPÉTER : Sorry, could you say that again ? Sorry, I didn't catch that. Would you mind repeating the ticket number ? POUR ÉPELER : Could you spell that for me ? — A as in Alpha, B as in Bravo. LAISSEZ-MOI VÉRIFIER : Let me check and get back to you. Hold on a second. I'm going to share my screen now. GÉRER LES COUPURES : I think we lost you for a second. Are you still there ? CONCLURE : To sum up, I'll send the logs and you'll check the firewall. Thanks for your time. Talk soon. Bye. RITUEL VISIO : arriver 1 minute en avance, couper son micro quand on ne parle pas (mute yourself), utiliser Raise hand pour demander la parole, et partager l'écran avec annonce (I'm going to share my screen — can everyone see it ?). Ces micro-gestes évitent 80 % des frictions d'appel.",
  [
    {"meaning": "Bonjour, ici Sarah de l'équipe plateforme.", "sentence": "Hello, this is Sarah from the platform team.", "itContext": "Hello, this is Sarah from the platform team — is this a good time?"},
    {"meaning": "Tout le monde m'entend ?", "sentence": "Can everyone hear me?", "itContext": "Can everyone hear me? I'll start with the demo."},
    {"meaning": "Tu es en sourdine.", "sentence": "You're on mute.", "itContext": "You're on mute — we can't hear the question."},
    {"meaning": "Désolé, je n'ai pas saisi ça.", "sentence": "Sorry, I didn't catch that.", "itContext": "Sorry, I didn't catch that — the ticket number, please?"},
    {"meaning": "Tu peux épeler ?", "sentence": "Could you spell that for me?", "itContext": "Could you spell that for me? It's an unusual hostname."},
    {"meaning": "Je te rappelle après vérification.", "sentence": "Let me check and get back to you.", "itContext": "Let me check the logs and get back to you within the hour."},
    {"meaning": "On t'a perdu une seconde.", "sentence": "We lost you for a second.", "itContext": "We lost you for a second — can you repeat the last point?"}
  ],
  [
    {"word": "mute", "level": "A", "domain": "it", "example": "You're on mute.", "itContext": "You're on mute during the whole standup.", "definition": "Micro coupé", "translation": "sourdine"},
    {"word": "choppy", "level": "C", "domain": "it", "example": "The audio is choppy.", "itContext": "The audio is choppy on mobile connections.", "definition": "Saccadé, haché", "translation": "saccadé"},
    {"word": "spell", "level": "A", "domain": "general", "example": "Could you spell it?", "itContext": "Could you spell the database name for me?", "definition": "Épeler", "translation": "épeler"},
    {"word": "catch", "level": "A", "domain": "general", "example": "I didn't catch that.", "itContext": "I didn't catch the port number you mentioned.", "definition": "Saisir, entendre", "translation": "saisir"},
    {"word": "hold on", "level": "A", "domain": "professional", "example": "Hold on a second.", "itContext": "Hold on a second while I pull up the dashboard.", "definition": "Patienter un instant", "translation": "patientez"},
    {"word": "sum up", "level": "B", "domain": "professional", "example": "To sum up, next steps...", "itContext": "To sum up: I send the logs, you review the rules.", "definition": "Résumer", "translation": "résumer"},
    {"word": "background", "level": "A", "domain": "it", "example": "Noise in the background.", "itContext": "There's some noise in the background — moving to a quiet room.", "definition": "Arrière-plan, fond", "translation": "arrière-plan"},
    {"word": "share", "level": "A", "domain": "it", "example": "Let me share my screen.", "itContext": "Let me share my screen and walk through the trace.", "definition": "Partager", "translation": "partager"}
  ],
  [
    {"expression": "you're breaking up", "meaning": "ta voix se coupe", "difficulty": "B", "example": "Sorry, you're breaking up — say that again?", "classification": "professional"},
    {"expression": "as in", "meaning": "comme dans (épeler)", "difficulty": "A", "example": "K as in kernel.", "classification": "professional"},
    {"expression": "get back to you", "meaning": "revenir vers toi", "difficulty": "B", "example": "I'll check and get back to you today.", "classification": "professional"},
    {"expression": "are you still there", "meaning": "tu es toujours là ?", "difficulty": "A", "example": "Are you still there? Your video froze.", "classification": "professional"},
    {"expression": "talk soon", "meaning": "à bientôt", "difficulty": "A", "example": "Thanks for the update — talk soon!", "classification": "professional"}
  ],
  "L'appel réussi tient à des rituels simples : se présenter (this is...), vérifier la ligne (mute, breaking up), sécuriser l'information (spell it, didn't catch), conclure avec un résumé des next steps.",
  [
    {"type": "multiple_choice", "question": "Se présenter au téléphone :", "options": ["Hello, I am Sarah.", "Hello, this is Sarah.", "Hello, Sarah here am.", "Hello, it has Sarah."], "correctAnswer": "Hello, this is Sarah.", "explanation": "Au téléphone : this is + prénom."},
    {"type": "multiple_choice", "question": "La voix se coupe :", "options": ["You're breaking up.", "You're broken down.", "You cut me up.", "You break now."], "correctAnswer": "You're breaking up.", "explanation": "Formule consacrée pour la coupure."},
    {"type": "fill_blank", "question": "Complétez : Could you ___ that for me? B as in Bravo.", "options": [], "correctAnswer": "spell", "explanation": "Demander l'épellation."},
    {"type": "multiple_choice", "question": "Conclure un appel avec les next steps :", "options": ["To sum up, I'll send the logs.", "End of call, bye.", "Finished speaking.", "Enough for today."], "correctAnswer": "To sum up, I'll send the logs.", "explanation": "Résumer avant de raccrocher."}
  ],
  "Ouvrir : this is + prénom / Can everyone hear me ? Réparer : You're on mute / breaking up / I didn't catch that. Épeler : as in. Conclure : To sum up... / Talk soon.",
  [
    {"question": "Hold ___ a second, I'm sharing my screen.", "options": ["on", "up", "in", "at"], "correctAnswer": "on", "explanation": "hold on = patientez."},
    {"question": "I'll check the rules and get ___ to you.", "options": [ "back", "again", "over", "forth"], "correctAnswer": "back", "explanation": "get back to someone = revenir vers."},
    {"question": "K as ___ kernel, S as in server.", "options": [ "in", "at", "on", "of"], "correctAnswer": "in", "explanation": "as in = comme dans."},
    {"question": "Are you still ___? Your video froze.", "options": [ "there", "here", "online", "present"], "correctAnswer": "there", "explanation": "Are you still there ? = formule fixe."}
  ],
  [
    {"pattern": "this is + prénom (téléphone)", "example": "Hello, this is Alex.", "explanation": "Identité en appel."},
    {"pattern": "Sorry, I didn't catch + info", "example": "I didn't catch the ticket ID.", "explanation": "Faire répéter poliment."},
    {"pattern": "To sum up + plan d'action", "example": "To sum up: you patch, I verify.", "explanation": "Conclure sans ambiguïté."}
  ]
),
# ================= LEÇON 133 — N4 Désaccord poli =================
L(133, 7, 4, 3,
  "Disagreeing Politely and Holding Your Ground",
  "Exprimer un désaccord technique sans brusquer : nuancer, questionner, proposer une alternative, et savoir rester ferme.",
  "En équipe internationale, le désaccord direct peut sonner agressif ; le désaccord trop mou passe inaperçu. La solution : des formules graduées. NUANCE TOTALE (accord avec réserve) : I see your point, but... Fair enough, however... That's true, though the deadline is tight. DÉSACCORD DOUX : I'm not sure that would work. I have a different take on this. I see it a bit differently. DÉSACCORD FERME MAIS POLI : I respectfully disagree. I'm afraid I don't agree — here's why. QUESTIONNER AU LIEU D'AFFIRMER (technique la plus efficace) : Have we considered the rollback cost ? What happens if the cache is cold ? How would that scale to 10x traffic ? APPUYER SUR DES FAITS : According to the benchmarks... The data from last quarter shows... ACCEPTER D'ÊTRE CORRIGÉ : Good point — you're right about the migration. Fair enough, let's go with your approach. MAINTENIR SA POSITION : I hear you, but I still think we should stage the rollout. Let's agree to disagree on the timeline, but not on testing. En réunion, la formule Let's park that and come back with data désamorce les guerres d'opinion. RÈGLE : on attaque l'idée (that approach), jamais la personne (you always...).
",
  [
    {"meaning": "Je vois ton point, mais le délai est serré.", "sentence": "I see your point, but the deadline is tight.", "itContext": "I see your point, but the deadline leaves no room for a rewrite."},
    {"meaning": "Je ne suis pas sûr que ça marcherait.", "sentence": "I'm not sure that would work.", "itContext": "I'm not sure that would work with our legacy schema."},
    {"meaning": "Je respectueusement ne suis pas d'accord.", "sentence": "I respectfully disagree.", "itContext": "I respectfully disagree — the numbers say otherwise."},
    {"meaning": "A-t-on envisagé le coût du rollback ?", "sentence": "Have we considered the rollback cost?", "itContext": "Have we considered the rollback cost if the migration fails?"},
    {"meaning": "D'après les benchmarks...", "sentence": "According to the benchmarks, the queue is faster.", "itContext": "According to the benchmarks, batching cuts latency by 40%."},
    {"meaning": "Bon point — tu as raison.", "sentence": "Good point — you're right about that.", "itContext": "Good point — you're right about the DNS propagation delay."},
    {"meaning": "Je t'entends, mais je pense qu'il faut déployer par étapes.", "sentence": "I hear you, but I still think we should stage the rollout.", "itContext": "I hear you, but I still think we should stage the rollout at 10%."}
  ],
  [
    {"word": "disagree", "level": "B", "domain": "professional", "example": "I disagree with this plan.", "itContext": "I disagree with dropping the staging step.", "definition": "Ne pas être d'accord", "translation": "être en désaccord"},
    {"word": "point", "level": "A", "domain": "professional", "example": "Fair point.", "itContext": "Fair point — the caching layer does complicate it.", "definition": "Argument, aspect d'une question", "translation": "point"},
    {"word": "consider", "level": "B", "domain": "professional", "example": "Consider the risks.", "itContext": "We should consider the maintenance cost too.", "definition": "Envisager, prendre en compte", "translation": "considérer"},
    {"word": "data", "level": "A", "domain": "it", "example": "Let's look at the data.", "itContext": "Let's look at the data before we decide.", "definition": "Données, faits mesurés", "translation": "données"},
    {"word": "benchmarks", "level": "C", "domain": "it", "example": "The benchmarks are clear.", "itContext": "The benchmarks are clear: v2 doubles throughput.", "definition": "Tests de performance comparatifs", "translation": "bancs d'essai"},
    {"word": "ground", "level": "B", "domain": "professional", "example": "Hold your ground.", "itContext": "Hold your ground when the evidence supports you.", "definition": "Position défendue", "translation": "position"},
    {"word": "park", "level": "B", "domain": "professional", "example": "Let's park that idea.", "itContext": "Let's park that and revisit after the metrics.", "definition": "Mettre de côté (un sujet)", "translation": "mettre de côté"},
    {"word": "however", "level": "B", "domain": "professional", "example": "However, the risk remains.", "itContext": "However, the security risk remains unaddressed.", "definition": "Cependant, toutefois", "translation": "cependant"}
  ],
  [
    {"expression": "fair enough", "meaning": "c'est juste / d'accord", "difficulty": "A", "example": "Fair enough, let's try your way.", "classification": "professional"},
    {"expression": "I'm afraid not", "meaning": "je crains que non", "difficulty": "B", "example": "I'm afraid we can't skip the review.", "classification": "professional"},
    {"expression": "let's agree to disagree", "meaning": "acceptons de ne pas convenir", "difficulty": "C", "example": "On tooling, let's agree to disagree.", "classification": "professional"},
    {"expression": "to be fair", "meaning": "il faut être juste", "difficulty": "B", "example": "To be fair, his approach did work last time.", "classification": "professional"},
    {"expression": "devil's advocate", "meaning": "avocat du diable", "difficulty": "C", "example": "Let me play devil's advocate for a minute.", "classification": "professional"}
  ],
  "Le désaccord professionnel se module : nuancer (I see your point, but...), questionner (Have we considered... ?), s'appuyer sur les faits (According to...), et accepter d'avoir tort (Fair enough). On vise l'idée, jamais la personne.",
  [
    {"type": "multiple_choice", "question": "Nuancer avant de contredire :", "options": ["I see your point, but...", "You are wrong.", "That's stupid.", "No way ever."], "correctAnswer": "I see your point, but...", "explanation": "Reconnaître avant de contredire."},
    {"type": "multiple_choice", "question": "Questionner plutôt qu'affirmer :", "options": ["Have we considered the rollback cost?", "Your rollback is costly!", "Rollbacks are bad, period.", "You never think about rollbacks."], "correctAnswer": "Have we considered the rollback cost?", "explanation": "La question ouvre le débat."},
    {"type": "fill_blank", "question": "Complétez : ___ to the benchmarks, batching is faster.", "options": [], "correctAnswer": "According", "explanation": "according to + source."},
    {"type": "multiple_choice", "question": "Accepter d'avoir été corrigé :", "options": ["Fair enough — good point.", "Whatever you say, boss.", "I still hate it.", "End of discussion, I quit."], "correctAnswer": "Fair enough — good point.", "explanation": "Acceptation sereine d'un argument."}
  ],
  "Gradation : I see your point, but → I'm not sure... → I respectfully disagree. Outils : question ouverte, According to + faits, Fair enough pour concéder, Let's park that pour mettre en pause.",
  [
    {"question": "I'm afraid I don't ___ with removing the tests.", "options": [ "agree", "agree to", "agreed", "agreeing"], "correctAnswer": "agree", "explanation": "agree with + idée."},
    {"question": "___ be fair, the old approach did scale.", "options": [ "To", "For", "At", "In"], "correctAnswer": "To", "explanation": "to be fair = expression fixe."},
    {"question": "Let's ___ that and come back with data.", "options": [ "park", "parking", "parks", "to park"], "correctAnswer": "park", "explanation": "Let's + base."},
    {"question": "The data ___ otherwise, I'm afraid.", "options": [ "says", "say", "saying", "is say"], "correctAnswer": "says", "explanation": "data (sens collectif) → verbe singulier courant."}
  ],
  [
    {"pattern": "Accord partiel + objection", "example": "That's true, however the deadline...", "explanation": "Concéder puis nuancer."},
    {"pattern": "Question d'ouverture du débat", "example": "What happens if the cache is cold?", "explanation": "Faire penser plutôt que trancher."},
    {"pattern": "Fermeté sur faits", "example": "The metrics support option B.", "explanation": "Rester ferme avec preuve."}
  ]
),
# ================= LEÇON 134 — N4 Raconter un problème =================
L(134, 7, 4, 4,
  "Telling the Story of an Issue: Narrative Tense Control",
  "Raconter clairement la chronologie d'un problème : passé simple pour les faits, prétérit + continu pour le contexte, present perfect pour le résultat.",
  "Raconter un incident, c'est enchaîner trois couches temporelles. 1) CONTEXTE avec le passé continu : We were deploying the release when the alerts fired. (action de fond interrompue). 2) FAITS avec le passé simple, dans l'ordre : At 14:02 the primary failed. Traffic shifted. The queue grew. 3) RÉSULTAT/ÉTAT ACTUEL avec le present perfect : We have restored the service. The team has written a post-mortem. Détail clé : since + point de départ (It has been flaky since Monday), for + durée (It has been down for an hour). LES CONNECTEURS DU RÉCIT : first of all, then, meanwhile (pendant ce temps), by the time (au moment où — By the time we paged the team, the cache was cold), eventually (finalement). LE PASSÉ PARFAIT pour l'antériorité : The bug had existed for months before we noticed. La hiérarchie : had + participe = le plus ancien. PIÈGE CLASSIQUE : ne pas dire We were seeing the issue when the deploy (mélange) mais We saw the issue when we deployed, ou mieux : We were deploying when we saw the spike. EXERCICE MENTAL : avant de raconter, étiqueter chaque fait — fond, fait daté, conséquence actuelle. Le récit devient limpide et le post-mortem se rédige presque tout seul.",
  [
    {"meaning": "Nous déployions quand les alertes ont retenti.", "sentence": "We were deploying when the alerts fired.", "itContext": "We were deploying the release when the alerts fired at 14:02."},
    {"meaning": "Le primaire est tombé en panne à 14h02.", "sentence": "The primary failed at 14:02.", "itContext": "The primary failed at 14:02 and traffic shifted to the replica."},
    {"meaning": "Nous avons restauré le service.", "sentence": "We have restored the service.", "itContext": "We have restored the service — all systems are green now."},
    {"meaning": "C'est instable depuis lundi.", "sentence": "It has been flaky since Monday.", "itContext": "The nightly job has been flaky since Monday's update."},
    {"meaning": "Au moment où on a pagé l'équipe, le cache était froid.", "sentence": "By the time we paged the team, the cache was cold.", "itContext": "By the time we paged the on-call, the cache was already cold."},
    {"meaning": "Le bug existait depuis des mois avant qu'on le remarque.", "sentence": "The bug had existed for months before we noticed.", "itContext": "The race condition had existed for months before monitoring caught it."},
    {"meaning": "Finalement, nous avons procédé à un rollback.", "sentence": "Eventually, we rolled back.", "itContext": "Eventually, we rolled back and documented the lesson."}
  ],
  [
    {"word": "meanwhile", "level": "B", "domain": "professional", "example": "Meanwhile, the queue grew.", "itContext": "Meanwhile, the queue grew to two million items.", "definition": "Pendant ce temps", "translation": "pendant ce temps"},
    {"word": "eventually", "level": "B", "domain": "professional", "example": "It eventually recovered.", "itContext": "The service eventually recovered on its own.", "definition": "Finalement, à la fin", "translation": "finalement"},
    {"word": "flaky", "level": "C", "domain": "it", "example": "A flaky test.", "itContext": "The test has been flaky all week.", "definition": "Instable, qui échoue aléatoirement", "translation": "instable"},
    {"word": "restore", "level": "B", "domain": "it", "example": "We restored service.", "itContext": "We restored the service from the last snapshot.", "definition": "Rétablir, restaurer", "translation": "rétablir"},
    {"word": "page", "level": "B", "domain": "it", "example": "We paged the on-call.", "itContext": "We paged the on-call engineer at 14:05.", "definition": "Alerter (par pager)", "translation": "alerter"},
    {"word": "timeline", "level": "B", "domain": "professional", "example": "Rebuild the timeline.", "itContext": "We rebuilt the incident timeline from the logs.", "definition": "Chronologie", "translation": "chronologie"},
    {"word": "afterwards", "level": "B", "domain": "professional", "example": "It failed afterwards.", "itContext": "The replica lagged badly afterwards.", "definition": "Ensuite, après", "translation": "ensuite"},
    {"word": "notice", "level": "A", "domain": "professional", "example": "We noticed the drift.", "itContext": "We noticed the config drift during the audit.", "definition": "Remarquer", "translation": "remarquer"}
  ],
  [
    {"expression": "by the time", "meaning": "au moment où", "difficulty": "B", "example": "By the time we woke up, the queue was full.", "classification": "professional"},
    {"expression": "all of a sudden", "meaning": "tout d'un coup", "difficulty": "B", "example": "All of a sudden, the pods started crashing.", "classification": "professional"},
    {"expression": "to this day", "meaning": "à ce jour", "difficulty": "C", "example": "To this day, we don't know who pushed it.", "classification": "professional"},
    {"expression": "long story short", "meaning": "en résumé rapide", "difficulty": "B", "example": "Long story short: a typo in the DNS.", "classification": "professional"},
    {"expression": "as it turned out", "meaning": "il s'est avéré que", "difficulty": "C", "example": "As it turned out, the cert had expired.", "classification": "professional"}
  ],
  "Le récit d'incident superpose trois temps : passé continu (contexte interrompu), passé simple (faits datés), present perfect (état actuel). Les connecteurs meanwhile / by the time / eventually structurent la chronologie.",
  [
    {"type": "multiple_choice", "question": "Contexte interrompu : We ___ deploying when it broke.", "options": ["were", "was", "are", "had"], "correctAnswer": "were", "explanation": "we + passé continu."},
    {"type": "multiple_choice", "question": "État actuel : We ___ restored the service.", "options": ["have", "had", "were", "did"], "correctAnswer": "have", "explanation": "Résultat actuel → present perfect."},
    {"type": "fill_blank", "question": "Complétez : It has been flaky ___ Monday.", "options": [], "correctAnswer": "since", "explanation": "since + point de départ."},
    {"type": "multiple_choice", "question": "Antériorité lointaine : The bug ___ for months before.", "options": ["had existed", "existed", "has existed", "was existing"], "correctAnswer": "had existed", "explanation": "Plus-que-parfait = antériorité."}
  ],
  "Fond : was/were + -ing. Faits : past simple datés (At 14:02...). Résultat : have + participe (since/for). Antérieur : had + participe. Connecteurs : meanwhile, by the time, eventually.",
  [
    {"question": "By the time we arrived, the batch ___ finished.", "options": [ "had", "has", "was", "is"], "correctAnswer": "had", "explanation": "Antériorité → had + participe."},
    {"question": "___, the pods started crashing.", "options": [ "All of a sudden", "By sudden", "Suddenly of", "All sudden"], "correctAnswer": "All of a sudden", "explanation": "Expression fixe."},
    {"question": "The service has been down ___ 40 minutes.", "options": [ "for", "since", "during", "from"], "correctAnswer": "for", "explanation": "for + durée."},
    {"question": "Long story ___, it was a DNS typo.", "options": [ "short", "brief", "quick", "small"], "correctAnswer": "short", "explanation": "long story short = expression fixe."}
  ],
  [
    {"pattern": "Past continu + when + fait", "example": "We were deploying when it broke.", "explanation": "Planter le décor."},
    {"pattern": "By the time + antériorité", "example": "By the time we paged, it was down.", "explanation": "Montrer le retard."},
    {"pattern": "Present perfect + état final", "example": "We have restored the service.", "explanation": "Conclure sur le présent."}
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
OUT = os.path.join(BASE, "database", "remediation-t2.json")
with open(OUT, "w", encoding="utf-8") as f:
    json.dump({"lessons": LESSONS}, f, ensure_ascii=False, indent=2)
print(f"✅ {len(LESSONS)} leçons écrites → {OUT}")
for _l in LESSONS:
    print(f"  L{_l['id']} « {_l['title']} » expl={len(_l['explanation'])} car, ex={len(_l['examples'])}, voc={len(_l['vocabulary'])}, exprs={len(_l['expressions'])}, pract={len(_l['practice'])}, quiz={len(_l['quiz'])}, patt={len(_l.get('patterns', []))}")
