const fs = require('fs');
const path = require('path');

const MODULE_NAMES = {
  8: 'Demonstratives, Possessives and Time Prepositions (N3)',
  9: 'Prepositions of Place, Movement and Connectors (N3)',
  10: 'Comparatives and Superlatives in Technical Contexts (N3)',
  11: 'Small Talk and Remote Meetings (N4)',
  20: 'Third Conditional for Root Cause Analysis (N5)',
  21: 'Gerund vs Infinitive (N5)',
  25: 'Comparing Architecture Styles (N5)',
  26: 'Expressing Cause, Effect and Dependencies (N5)',
  27: 'Adverbs of Degree (N5)',
  28: 'Formulating Hypotheses (N5)',
  29: 'Negotiating SLA, RTO and RPO (N5)',
  30: 'Writing Incident Timelines and RCA (N5)',
  33: 'High Availability and Cloud Storage (N6)',
  34: 'VPC Peering and Chaos Engineering (N6)',
  35: 'FinOps and Infrastructure Capacity Reports (N6)',
  36: 'Attack Vectors, OWASP and SIEM Log Analysis (N7)',
  37: 'Incident Response and Zero Trust IAM (N7)',
  38: 'CVE Advisory and Threat Hunting IoC (N7)',
  39: 'Cryptographic Protocols and Ransomware Crisis (N7)',
  41: 'Penetration Testing and Compliance Frameworks (N7)',
  42: 'Strategic IT Roadmaps and C-Level Boards (N8)',
  43: 'Vendor Negotiations and Academic Research (N8)',
  44: 'Defending Technical Proposals and Change Management (N8)',
  45: 'AI Ethics and Global Engineering Teams (N8)',
  46: 'Crisis Communication and Thesis Defense (N8)'
};

const dbPath = path.join(__dirname, '../database/firestore-seed-data.json');
let data;
try {
  data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
} catch (e) {
  console.error("Could not read or parse database file", e);
  process.exit(1);
}

if (data && data.modules) {
  let updatedCount = 0;
  for (let mod of data.modules) {
    if (MODULE_NAMES[mod.id]) {
      mod.title = MODULE_NAMES[mod.id];
      console.log(`✅ Module ${mod.id} → "${mod.title}"`);
      updatedCount++;
    }
  }
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 ${updatedCount} modules renommés avec succès.`);
} else {
  console.error('❌ Erreur: data.modules introuvable dans firestore-seed-data.json');
  process.exit(1);
}
