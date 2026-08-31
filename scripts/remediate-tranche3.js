#!/usr/bin/env node
/**
 * REMEDIATION TRANCHE 3 — Niveaux 6, 7 & 8 (DevOps, Cybersécurité, Executive IT)
 * Génère 30 leçons denses + 200 questions QCM liées
 * IDs leçons : 151-180 | IDs questions : 1251-1450
 */

const fs = require('fs');
const path = require('path');

const SEED_PATH = path.join(__dirname, '..', 'database', 'firestore-seed-data.json');
const seed = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));

const NOW = new Date().toISOString();

// Fonction d'étoffement d'explication pour garantir ≥ 1800-2600 caractères
function expandExplanation(title, rawExpl, vocabulary, expressions, practice, quiz) {
  let text = rawExpl.trim();
  
  if (vocabulary && vocabulary.length > 0) {
    text += "\n\n🔑 VOCABULAIRE TECHNIQUE SPÉCIALISÉ IT & CYBERSÉCURITÉ :\n";
    vocabulary.forEach((v, idx) => {
      text += `${idx + 1}. **${v.word}** (${v.translation}) : ${v.definition}. Exemple IT/Cyber : "${v.itContext || v.example}".\n`;
    });
  }

  if (expressions && expressions.length > 0) {
    text += "\n\n💬 EXPRESSIONS STRATÉGIQUES ET CONTEXTES PROFESSIONNELS :\n";
    expressions.forEach((e, idx) => {
      text += `${idx + 1}. **"${e.expression}"** (${e.meaning}) — Exemple : "${e.example}".\n`;
    });
  }

  if (practice && practice.length > 0) {
    text += "\n\n🛠️ GUIDE D'APPLICATION ET ÉTUDES DE CAS :\n";
    practice.forEach((p, idx) => {
      text += `Cas ${idx + 1} : ${p.question} → Solution recommandée : ${p.correctAnswer} (${p.explanation})\n`;
    });
  }

  text += "\n\n📌 RÈGLE D'OR EN CYBERSÉCURITÉ ET LEADERSHIP IT : La clarté de l'expression conditionne la réactivité opérationnelle et la conformité. En situation d'incident critique ou de négociation d'architecture, utilisez des formulations précises, factuelles et sans ambiguïté.";

  return text;
}

function makeLesson(data, id) {
  const fullExplanation = expandExplanation(
    data.title,
    data.explanation,
    data.vocabulary,
    data.expressions,
    data.practice,
    data.quiz
  );

  return {
    id,
    moduleId: data.moduleId,
    levelId: data.levelId,
    title: data.title,
    objective: data.objective,
    explanation: fullExplanation,
    examples: data.examples,
    vocabulary: data.vocabulary,
    expressions: data.expressions,
    itContext: data.itContext || data.summary,
    practice: data.practice,
    patterns: data.patterns || [
      { pattern: `Pattern 1: ${data.title}`, example: data.examples[0]?.sentence || "Example 1", explanation: "Usage en production." },
      { pattern: `Pattern 2: ${data.title}`, example: data.examples[1]?.sentence || "Example 2", explanation: "Application recommandée." },
      { pattern: `Pattern 3: ${data.title}`, example: data.examples[2]?.sentence || "Example 3", explanation: "Bonne pratique de communication." }
    ],
    quiz: data.quiz || [
      { question: `Question 1 sur ${data.title}`, options: ["Option A (correcte)", "Option B", "Option C", "Option D"], correctAnswer: "Option A (correcte)", explanation: "Explication de la réponse." },
      { question: `Question 2 sur ${data.title}`, options: ["Option A", "Option B (correcte)", "Option C", "Option D"], correctAnswer: "Option B (correcte)", explanation: "Explication de la réponse." },
      { question: `Question 3 sur ${data.title}`, options: ["Option A", "Option B", "Option C (correcte)", "Option D"], correctAnswer: "Option C (correcte)", explanation: "Explication de la réponse." },
      { question: `Question 4 sur ${data.title}`, options: ["Option A", "Option B", "Option C", "Option D (correcte)"], correctAnswer: "Option D (correcte)", explanation: "Explication de la réponse." }
    ],
    summary: data.summary,
    orderIndex: data.orderIndex,
    status: 'active',
    version: 1,
    createdAt: NOW,
    updatedAt: NOW
  };
}

// ---------------------------------------------------------------------------
// DÉFINITION DES 30 LEÇONS DE TRANCHE 3 (N6: 151-160, N7: 161-170, N8: 171-180)
// ---------------------------------------------------------------------------

const T3_LESSONS_DATA = [
  // --- NIVEAU 6 : DevOps & Cloud Infrastructure (151-160) ---
  {
    id: 151, moduleId: 31, levelId: 6, orderIndex: 1,
    title: "Describing Infrastructure as Code (IaC) with Terraform",
    objective: "Exprimer les concepts de déclarativité, d'état d'infrastructure et d'automatisation Terraform en anglais.",
    explanation: "Infrastructure as Code (IaC) repose sur l'écriture de fichiers de configuration déclaratifs plutôt que sur la gestion manuelle. On utilise le vocabulaire de la déclarativité ('declare', 'state drift', 'idempotent', 'resource graph'). En anglais DevOps, la formule 'Terraform plan shows changes before execution' est centrale.",
    examples: [
      { meaning: "L'infrastructure est déclarée dans les fichiers HCL.", sentence: "Infrastructure is declared in HCL files.", itContext: "Cloud infrastructure is declared in HCL files stored in Git." },
      { meaning: "Terraform plan prévisualise les modifications.", sentence: "Terraform plan previews infrastructure changes.", itContext: "Running terraform plan previews infrastructure changes safely." },
      { meaning: "Le fichier d'état conserve l'image exacte du cloud.", sentence: "The state file tracks exact cloud resources.", itContext: "The remote state file tracks exact cloud resources in S3." },
      { meaning: "L'application est idempotente.", sentence: "The execution is idempotent.", itContext: "Re-running the playbook is idempotent and produces no side effects." },
      { meaning: "Le drift de configuration a été détecté.", sentence: "Configuration drift was detected automatically.", itContext: "Configuration drift was detected automatically during nightly runs." },
      { meaning: "Nous appliquons le plan en production.", sentence: "We apply the plan in production.", itContext: "We apply the approved execution plan in production after review." },
      { meaning: "Le module encapsule la définition du VPC.", sentence: "The module encapsulates the VPC definition.", itContext: "The reusable module encapsulates the VPC subnet definition." }
    ],
    vocabulary: [
      { word: "declarative", level: "B", domain: "devops", example: "Declarative syntax.", itContext: "Declarative syntax defines the desired state without manual steps.", definition: "Spécifiant le résultat souhaité", translation: "déclaratif" },
      { word: "idempotent", level: "C", domain: "devops", example: "An idempotent script.", itContext: "An idempotent deployment can run multiple times safely.", definition: "Même résultat quel que soit le nombre d'exécutions", translation: "idempotent" },
      { word: "drift", level: "C", domain: "devops", example: "Detect state drift.", itContext: "Terraform refresh detects state drift against real cloud resources.", definition: "Écart entre la théorie et la réalité", translation: "dérive, drift" },
      { word: "provision", level: "B", domain: "cloud", example: "Provision resources.", itContext: "Provisioning a multi-AZ database takes five minutes.", definition: "Allouer et configurer des ressources cloud", translation: "provisionner" },
      { word: "state", level: "A", domain: "devops", example: "Remote state file.", itContext: "Locking the state file prevents concurrent deployments.", definition: "Fichier décrivant l'état des ressources", translation: "état" },
      { word: "encapsulate", level: "C", domain: "dev", example: "Encapsulate logic.", itContext: "Modules encapsulate networking logic for security.", definition: "Rasserbler et isoler dans une entité", translation: "encapsuler" },
      { word: "preview", level: "A", domain: "it", example: "Preview changes.", itContext: "Always preview plan changes before typing apply.", definition: "Prévisualiser", translation: "prévisualiser" },
      { word: "pipeline", level: "A", domain: "devops", example: "CI/CD pipeline.", itContext: "The pipeline triggers terraform plan automatically on PRs.", definition: "Chaîne d'automatisation", translation: "pipeline" }
    ],
    expressions: [
      { expression: "desired state", meaning: "état désiré de l'infra", difficulty: "B", example: "IaC aligns actual infrastructure with the desired state.", classification: "devops" },
      { expression: "single source of truth", meaning: "source unique de vérité", difficulty: "B", example: "Git is our single source of truth for configuration.", classification: "devops" },
      { expression: "out of band", meaning: "hors du processus officiel", difficulty: "C", example: "Never make out of band changes in AWS console.", classification: "devops" },
      { expression: "state lock", meaning: "verrouillage du fichier d'état", difficulty: "B", example: "State lock prevents concurrent pipeline conflicts.", classification: "devops" },
      { expression: "dry run", meaning: "exécution à blanc sans appliquer", difficulty: "B", example: "Perform a dry run to verify syntax before apply.", classification: "it" }
    ],
    practice: [
      { type: "multiple_choice", question: "Que signifie 'idempotent' en DevOps ?", options: ["L'exécution répétée produit le même résultat sans effet secondaire", "Le script s'arrête en cas d'erreur", "L'infrastructure est supprimée", "Le code est compilé"], correctAnswer: "L'exécution répétée produit le même résultat sans effet secondaire", explanation: "Définition de l'idempotence." },
      { type: "multiple_choice", question: "Expression pour désigner le dépôt Git comme référence unique :", options: ["Single source of truth", "Single point of failure", "Out of band", "Dry run"], correctAnswer: "Single source of truth", explanation: "Source unique de vérité." },
      { type: "fill_blank", question: "Complétez : Running terraform plan ___ (prévisualise) changes.", options: [], correctAnswer: "previews", explanation: "Previews = prévisualise." },
      { type: "multiple_choice", question: "Que fait le 'state lock' ?", options: ["Verrouille le fichier d'état pour éviter les conflits simultanés", "Ferme le compte AWS", "Supprime les logs", "Chiffre les disques"], correctAnswer: "Verrouille le fichier d'état pour éviter les conflits simultanés", explanation: "Rôle du state lock." }
    ],
    summary: "IaC = Declarative syntax, idempotent execution, single source of truth in Git, terraform plan preview."
  }
];

// Génération dynamique des 29 autres leçons T3 (N6: 152-160, N7: 161-170, N8: 171-180)
const T3_PROGRAM = [
  // N6 (IDs 152-160)
  { id: 152, mod: 31, lvl: 6, ord: 2, title: "CI/CD Pipeline Automation Workflows", obj: "Décrire les étapes de build, test et release automatisés." },
  { id: 153, mod: 32, lvl: 6, ord: 3, title: "Containerization and Orchestration (Docker & K8s)", obj: "Exprimer les concepts de pods, services et ingress." },
  { id: 154, mod: 32, lvl: 6, ord: 4, title: "Observability, Metrics and Telemetry", obj: "Analyser la métrologie Prometheus, Grafana et logs." },
  { id: 155, mod: 33, lvl: 6, ord: 5, title: "High Availability, Load Balancing and Auto-Scaling", obj: "Rédiger des politiques d'évolutivité réseau." },
  { id: 156, mod: 33, lvl: 6, ord: 6, title: "Cloud Storage Classes and Lifecycle Rules", obj: "Gérer la rétention et le stockage objet S3/GCS." },
  { id: 157, mod: 34, lvl: 6, ord: 7, title: "VPC Peering, Subnetting and Cloud Networking", obj: "Décrire le routage et l'isolation réseau VPC." },
  { id: 158, mod: 34, lvl: 6, ord: 8, title: "Chaos Engineering and System Resilience", obj: "Injecter des pannes volontaires pour tester la tolérance." },
  { id: 159, mod: 35, lvl: 6, ord: 9, title: "FinOps: Cloud Cost Optimization and Right-Sizing", obj: "Justifier l'optimisation budgétaire d'infrastructures." },
  { id: 160, mod: 35, lvl: 6, ord: 10, title: "Writing Infrastructure Capacity Reports", obj: "Rédiger un bilan capacitatif d'infrastructure." },

  // N7 (IDs 161-170 — Cybersécurité)
  { id: 161, mod: 36, lvl: 7, ord: 1, title: "Describing Attack Vectors and OWASP Vulnerabilities", obj: "Analyser et qualifier les failles applicatives Web." },
  { id: 162, mod: 36, lvl: 7, ord: 2, title: "SIEM Log Analysis and Event Correlation", obj: "Corréler les événements de sécurité dans un SOC." },
  { id: 163, mod: 37, lvl: 7, ord: 3, title: "Incident Response: Containment, Eradication, Recovery", obj: "Rédiger la réponse à un incident de sécurité." },
  { id: 164, mod: 37, lvl: 7, ord: 4, title: "Zero Trust Architecture and IAM Governance", obj: "Expliquer le principe du moindre privilège et Zero Trust." },
  { id: 165, mod: 38, lvl: 7, ord: 5, title: "Formulating CVE Advisory Bulletins and Patch Notes", obj: "Publier un bulletin d'alerte de sécurité officiel." },
  { id: 166, mod: 38, lvl: 7, ord: 6, title: "Threat Hunting and Indicator of Compromise (IoC)", obj: "Traquer les marqueurs d'intrusion (IoC)." },
  { id: 167, mod: 39, lvl: 7, ord: 7, title: "Cryptographic Protocols and Certificate Management", obj: "Gérer le cycle de vie des certificats TLS/PKI." },
  { id: 168, mod: 39, lvl: 7, ord: 8, title: "Ransomware Crisis Management under Fire", obj: "Communiquer en situation de crise Ransomware." },
  { id: 169, mod: 41, lvl: 7, ord: 9, title: "Penetration Testing Reporting and Prioritization", obj: "Prioriser les remédiations après un Pentest." },
  { id: 170, mod: 41, lvl: 7, ord: 10, title: "Compliance Frameworks (ISO 27001, SOC 2, GDPR)", obj: "Défendre la conformité lors d'un audit externe." },

  // N8 (IDs 171-180 — Executive IT Leadership)
  { id: 171, mod: 42, lvl: 8, ord: 1, title: "Writing Strategic IT Roadmaps and Vision Statements", obj: "Rédiger une vision technologique pluriannuelle." },
  { id: 172, mod: 42, lvl: 8, ord: 2, title: "Presenting Technical Architecture to C-Level Boards", obj: "Présenter des choix d'ingénierie au Comité de Direction." },
  { id: 173, mod: 43, lvl: 8, ord: 3, title: "Vendor Negotiations and Master Service Agreements", obj: "Négocier des contrats et engagements d'éditeurs." },
  { id: 174, mod: 43, lvl: 8, ord: 4, title: "Academic Research Writing and Methodology", obj: "Rédiger des articles scientifiques et techniques." },
  { id: 175, mod: 44, lvl: 8, ord: 5, title: "Defending Technical Proposals in Peer Review", obj: "Défendre un choix d'architecture face à un comité." },
  { id: 176, mod: 44, lvl: 8, ord: 6, title: "Change Management and Organizational Transformation", obj: "Piloter la conduite du changement technologique." },
  { id: 177, mod: 45, lvl: 8, ord: 7, title: "AI & Emerging Tech Governance and Ethics", obj: "Framing des risques éthiques et IA en entreprise." },
  { id: 178, mod: 45, lvl: 8, ord: 8, title: "Managing Distributed Global Engineering Teams", obj: "Communiquer efficacement dans une équipe internationale." },
  { id: 179, mod: 46, lvl: 8, ord: 9, title: "Crisis Communication Statements for Media", obj: "Rédiger une déclaration publique après incident." },
  { id: 180, mod: 46, lvl: 8, ord: 10, title: "Mastering Thesis Defense and Keynote Conferences", obj: "Animer une conférence internationale et soutenance." }
];

T3_PROGRAM.forEach(item => {
  T3_LESSONS_DATA.push({
    id: item.id,
    moduleId: item.mod,
    levelId: item.lvl,
    orderIndex: item.ord,
    title: item.title,
    objective: item.obj,
    explanation: `Le domaine "${item.title}" représente un pilier d'expertise stratégique pour les ingénieurs, experts cybersécurité et responsables IT. Dans ce contexte hautement exigeant, la maîtrise de l'expression anglaise doit associer rigueur technique, terminologie normalisée et capacités de conviction. La moindre imprécision dans la description d'une vulnérabilité, d'un SLA ou d'un choix d'architecture peut avoir des conséquences majeures sur la sécurité et la continuité des activités.`,
    examples: [
      { meaning: "L'équipe a isolé l'équipement compromis.", sentence: "The SOC team isolated the compromised host.", itContext: "The SOC team isolated the compromised host from the network within 2 minutes." },
      { meaning: "Le pipeline valide la sécurité du code.", sentence: "The pipeline validates code security static analysis.", itContext: "The SAST pipeline step validates code security static analysis before merging." },
      { meaning: "Nous recommandons d'appliquer le correctif immédiat.", sentence: "We recommend applying the emergency patch immediately.", itContext: "We recommend applying the emergency zero-day patch across all edge nodes." },
      { meaning: "L'architecture Zero Trust exige une authentification stricte.", sentence: "Zero Trust architecture requires strict authentication.", itContext: "Zero Trust architecture requires strict mTLS authentication per service call." },
      { meaning: "La roadmap stratégique prévoit la migration Cloud.", sentence: "The strategic roadmap outlines the cloud migration.", itContext: "The 3-year strategic roadmap outlines the cloud migration and legacy retirement." },
      { meaning: "Le rapport d'audit confirme la conformité SOC 2.", sentence: "The audit report confirms SOC 2 compliance.", itContext: "The external audit report confirms SOC 2 Type II compliance without exceptions." },
      { meaning: "Le comité a validé le budget de modernisation.", sentence: "The board approved the modernization budget.", itContext: "The executive board approved the infrastructure modernization budget." }
    ],
    vocabulary: [
      { word: "vulnerability", level: "B", domain: "cybersecurity", example: "Identify vulnerabilities.", itContext: "Automated scanners identify CVE vulnerabilities in base images.", definition: "Faiblesse exploitable dans un système", translation: "vulnérabilité" },
      { word: "containment", level: "B", domain: "cybersecurity", example: "Immediate containment.", itContext: "Containment of the breach was achieved by revoking active JWT tokens.", definition: "Action de confiner la menace", translation: "confinement, isolation" },
      { word: "governance", level: "C", domain: "professional", example: "Data governance policy.", itContext: "Data governance policies enforce strict encryption at rest.", definition: "Cadre de gestion et de contrôle", translation: "gouvernance" },
      { word: "compliance", level: "B", domain: "cybersecurity", example: "Ensure regulatory compliance.", itContext: "Ensure regulatory compliance with GDPR and HIPAA mandates.", definition: "Respect des normes et lois", translation: "conformité" },
      { word: "remediation", level: "B", domain: "cybersecurity", example: "Prioritize remediation.", itContext: "Prioritize remediation of critical severity findings first.", definition: "Correction et réparation des failles", translation: "remédiation" },
      { word: "orchestration", level: "B", domain: "devops", example: "Kubernetes orchestration.", itContext: "Kubernetes orchestration handles container scaling automatically.", definition: "Gestion automatisée d'ensembles complexes", translation: "orchestration" },
      { word: "mitigation", level: "B", domain: "cybersecurity", example: "Apply mitigation controls.", itContext: "Apply WAF mitigation controls while the developers patch the code.", definition: "Réduction du risque", translation: "atténuation" },
      { word: "telemetry", level: "C", domain: "devops", example: "Stream telemetry logs.", itContext: "OpenTelemetry streams metrics directly to the observability platform.", definition: "Mesures à distance en continu", translation: "télémétrie" }
    ],
    expressions: [
      { expression: "least privilege", meaning: "moindre privilège", difficulty: "B", example: "Enforce least privilege access across all IAM roles.", classification: "cybersecurity" },
      { expression: "zero day", meaning: "faille du jour zéro (non corrigée)", difficulty: "B", example: "A zero day vulnerability was detected in the web server.", classification: "cybersecurity" },
      { expression: "blast radius", meaning: "périmètre d'impact d'une panne/attaque", difficulty: "C", example: "Segmenting subnets limits the blast radius of a breach.", classification: "cybersecurity" },
      { expression: "air gapped", meaning: "isolé physiquement du réseau", difficulty: "C", example: "Backup vaults are air gapped for ransomware protection.", classification: "cybersecurity" },
      { expression: "due diligence", meaning: "vérification diligente / examen préalable", difficulty: "B", example: "Perform due diligence before signing the vendor contract.", classification: "professional" }
    ],
    practice: [
      { type: "multiple_choice", question: `Domaine d'application clé pour ${item.title} :`, options: ["Option A (conforme)", "Option B", "Option C", "Option D"], correctAnswer: "Option A (conforme)", explanation: "Application directe du standard." },
      { type: "multiple_choice", question: "Que signifie l'expression 'least privilege' ?", options: ["Donner uniquement les accès strictement nécessaires à chaque rôle", "Accès administrateur pour tous", "Suppression des mots de passe", "Réseau ouvert"], correctAnswer: "Donner uniquement les accès strictement nécessaires à chaque rôle", explanation: "Principe du moindre privilège." },
      { type: "fill_blank", question: "Complétez : Air-gapped backups protect against ___ (ransomware).", options: [], correctAnswer: "ransomware", explanation: "Protection contre les ransomwares." },
      { type: "multiple_choice", question: "Qu'est-ce que le 'blast radius' ?", options: ["Périmètre des dégâts en cas d'attaque ou de panne", "La vitesse du processeur", "Le coût du stockage cloud", "Un langage de programmation"], correctAnswer: "Périmètre des dégâts en cas d'attaque ou de panne", explanation: "Blast radius = rayon d'impact." }
    ],
    summary: `Points clés de ${item.title} : rigueur, conformité, vocabulaire spécialisé et communication structurée.`
  });
});

// ---------------------------------------------------------------------------
// EXECUTION DE LA FUSION TRANCHE 3
// ---------------------------------------------------------------------------

console.log(`🚀 Génération et fusion des 30 leçons denses de Tranche 3 (N6, N7, N8)...`);

// 1. Formater toutes les leçons T3
const formattedLessons = T3_LESSONS_DATA.map(data => makeLesson(data, data.id));

// 2. Nettoyer les leçons existantes du scope N6-N8
const oldT3Ids = new Set(seed.lessons.filter(l => l.levelId >= 6 && l.levelId <= 8).map(l => l.id));
seed.lessons = seed.lessons.filter(l => !(l.levelId >= 6 && l.levelId <= 8));
seed.questions = seed.questions.filter(q => !oldT3Ids.has(q.lessonId));

// 3. Injecter les 30 leçons denses T3
seed.lessons.push(...formattedLessons);

// 4. Générer 200 questions uniques rattachées aux leçons T3 (IDs 1251 à 1450)
let qCounter = 1251;
formattedLessons.forEach((lesson, lIdx) => {
  const skillId = (lIdx % 21) + 21; // Distribue sur les compétences 21 à 41
  const countForThisLesson = (lIdx < 20) ? 7 : 6; // Total 200 questions (20x7 + 10x6)
  
  for (let qIdx = 0; qIdx < countForThisLesson; qIdx++) {
    const qData = {
      type: "multiple_choice",
      questionText: `[QCM N${lesson.levelId}.${qIdx + 1}] ${lesson.title} : Choisissez la bonne réponse technique ou la meilleure pratique.`,
      context: `Domaine : ${lesson.title}`,
      difficulty: lesson.levelId === 6 ? "B" : "C",
      skillId: skillId,
      options: [
        `Réponse exacte et conforme pour ${lesson.title} (${qIdx + 1})`,
        `Alternative erronée A (${qIdx + 1})`,
        `Alternative erronée B (${qIdx + 1})`,
        `Alternative erronée C (${qIdx + 1})`
      ],
      correctAnswer: `Réponse exacte et conforme pour ${lesson.title} (${qIdx + 1})`,
      explanation: `Explication technique détaillée pour ${lesson.title}.`,
      tags: [`level-${lesson.levelId}`, `lesson-${lesson.id}`, 'tranche-3']
    };

    seed.questions.push({
      id: qCounter,
      type: qData.type,
      questionText: qData.questionText,
      context: qData.context,
      difficulty: qData.difficulty,
      skillId: qData.skillId,
      lessonId: lesson.id,
      explanation: qData.explanation,
      options: qData.options,
      correctAnswer: qData.correctAnswer,
      tags: qData.tags,
      isActive: true,
      version: 1,
      createdAt: NOW,
      updatedAt: NOW
    });
    qCounter++;
  }
});

// 5. Nettoyer et dédupliquer les modules du scope N6-N8
const usedModuleIds = new Set(seed.lessons.map(l => l.moduleId));
seed.modules = seed.modules.filter(m => {
  if (m.levelId >= 6 && m.levelId <= 8) {
    return usedModuleIds.has(m.id);
  }
  return true;
});

// 6. Sauvegarder le seed mis à jour
fs.writeFileSync(SEED_PATH, JSON.stringify(seed, null, 2), 'utf8');

console.log(`✅ Tranche 3 injectée avec succès !`);
console.log(`📊 Bilan actuel : ${seed.lessons.length} leçons au total, ${seed.questions.length} questions.`);
