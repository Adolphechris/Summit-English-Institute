# PLAN DE REMÉDIATION — Summit English Institute

> **Version** : 1.0 — Validé le 2026-08-31
> **Contrat de référence** : ce plan fait foi. Aucun contenu n'est publié en ligne sans passer les **gates** définis ci-dessous.
> **Documents liés** : `REMEDIATION_TRACKER.md`, `scripts/content-validator.js`, `AUDIT_CONTENT.md`, `content/inventory.json`, `TODO.md`.
> **Base légale** : Constitution v2.0 (Titre « Standards de contenu & remédiation »), Cahier des charges Tranche 2 (§44-66, §55 banque de questions).

---

## 0. Diagnostic initial (baseline officielle — relevée le 2026-08-31)

| Indicateur | Cible constitutionnelle | Relevé initial | Écart |
|---|---|---|---|
| Niveaux (1-8) | 8 complets | 8 déclarés — **niveaux 2 et 5 : 0 leçon** | ❌ |
| Modules | 55 pourvus de leçons | **14 référencés** par des leçons (41 orphelins) | ❌ |
| Leçons | dense et unique | 50 = **contenus dupliqués** (ex. « Building Simple Sentences » ×3 identiques, « Comparatives » ×4 identiques) | ❌ |
| Épaisseur d'une leçon | explication ≥1800 car., 6-8 exemples, 8-12 voc, 4-6 expressions, 4-6 pratique, 3 patterns, 1 mini-quiz | **~119 car.**, **2,9** ex., **2,4** voc., **2,0** expr., **2,2** pratique | ❌ |
| Questions | banque « actif central » indexée, massive | 434 dont **209 textes dupliqués** ; **433/434 sans leçon** ; **108 QCM <4 options** | ❌ |
| Compétences | 41/41 couvertes (≥5 questions chacune) | non vérifiée | ⚠️ |
| Modules dupliqués | — | « Subject + Verb + Object » ×4, « Pronouns and Auxiliaries » ×4, « Common Verbs in Context » ×4, etc. | ❌ |

---

## 1. Doctrine

1. **Pertinence** (Const. Art.4) : fréquent, utile, réutilisable, nécessaire aux études / IT / communication.
2. **Production active** (Const. Art.5 + CdC §62) : choisir → compléter → transformer → construire → répondre → produire.
3. **Anti-duplication / indexation** (CdC §55) : un asset = un contenu ; chaque question indexée (id, matière, niveau, module, compétence, difficulté, type, notion) ; **zero doublon**.
4. **Gate automatique** : rien ne part en ligne sans `content-validator.js` au vert.
5. **Revue humaine par tranche** : la validation finale de chaque tranche reste humaine.

## 2. Cibles chiffrées (courbe de guérison)

| Asset | Initial | Cible finale |
|---|---|---|
| Leçons uniques | ~14 | **80** (8 niveaux × 10) |
| Modules pourvus | 14/55 | **55/55** |
| Exemples / leçon | 2,9 | **8** (min 6) |
| Vocabulaire / leçon | 2,4 | **12** (min 8) |
| Expressions / leçon | 2,0 | **6** (min 4) |
| Pratique / leçon | 2,2 | **6** (min 4) |
| Explication / leçon | 119 car. | **≥1800 car.** |
| Patterns / leçon | 0 | **3** |
| Mini-quiz / leçon | 0 | **1** |
| Questions uniques indexées | ~225 | **≥900** (100 % liées à une leçon) |
| QCM ≥4 options | 91/199 | **100 %** |
| Compétences couvertes | ? | **41/41** |

## 3. Norme minimale d'une leçon (template)

```
- explication : ≥1800 caractères, structurée (règle → formes → pièges → conseil IT)
- patterns    : 3 structures réutilisables avec 4 exemples d'application
- exemples    : 6-8 (sentence + meaning + itContext)
- vocabulaire : 8-12 (word, definition, translation, example, itExample, level, domain)
- expressions : 4-6 (expression, usage, example, translation)
- pratique    : 4-6 activités (types 0.12: QCM, compléter, transformer, construire, scénario, correction)
- mini-quiz   : 4 questions auto-corrigées
- résumé      : 3-5 phrases + « à retenir »
```

## 4. Tranches et gates

| Tranche | Contenu | Gate de sortie |
|---|---|---|
| **T0 Fondations** | outils de suivi, `content-validator.js`, CI, amendement Constitution v2.0, baseline inventory | validator exécutable + CI verte + Constitution v2.0 |
| **T1 Niveaux 1-2** | niveau 1 (10 leçons) + niveau 2 (10 leçons), modules rattachés, ~350 questions uniques indexées, mini-quiz | validator 100 %, tests verts, build OK, seed, push en ligne |
| **T2 Niveaux 3-5** | déduplication 3-4-5, création niveau 5, modules, questions | idem |
| **T3 Niveaux IT/Cyber 6-8** | déduplication, vocabulaire IT/Cyber par domaines, couverture 41 skills | idem |
| **T4 Banque massive** | ≥900 questions uniques, 100 % QCM valides, mini-quiz 80, inventory régénéré | idem |
| **T5 Consolidation** | Constitution v2.0 finale, README/CHANGELOG, push final | tout vert + en ligne |

## 5. Méthode d'implémentation

1. **Asset-first** : le contenu vit dans `database/firestore-seed-data.json` (idempotent, `merge:true`).
2. **Scripts de remédiation déterministes** : `scripts/remediate-content.js` identifie doublons/canoniques et applique les tranches — rejouable sans doublon.
3. **Validator bloquant** : `scripts/content-validator.js` (30+ contrôles) intégré à la CI.
4. **Petit lot → gate → commit → push** : chaque tranche est validée (validator + tests + build), le tracker est mis à jour, puis push en ligne.
5. **Métriques vivantes** : `content/inventory.json` + `AUDIT_CONTENT.md` régénérés à chaque gate.

## 6. Outils de suivi

| Outil | Rôle |
|---|---|
| `REMEDIATION_PLAN.md` | (ce fichier) contrat de référence |
| `REMEDIATION_TRACKER.md` | tableau vivant par niveau/tranche |
| `TODO.md` | tâches opérationnelles détaillées |
| `scripts/content-validator.js` | arbitre automatique (gates) |
| `content/inventory.json` | métriques réelles générées |
| `AUDIT_CONTENT.md` | rapport à chaque gate |
| GitHub Actions | validator bloquant en CI |

---

*Document vivant — la ligne « cible » n'est jamais abaissée sans amendement explicite de la Constitution.*