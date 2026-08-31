# REMEDIATION TRACKER — Summit English Institute

> Tableau vivant. Métriques régénérées par `scripts/content-validator.js` → `content/inventory.json`.
> Légende : ✅ complété / 🔄 en cours / ⬜ à faire — les chiffres sont **mesurés**, pas estimés.

## Synthèse par tranche

| Tranche | Leçons uniques | Modules pourvus | Questions uniques | QCM valides | Mini-quiz | Gate validator | Push en ligne |
|---|---|---|---|---|---|---|---|
| T0 Fondations | — | — | — | — | — | ✅ validator+CI+Constitution v2.0+AUTH_SECRET (31/08) | ✅ |
| T1 Niveaux 1-2 | ✅ 20/20 | ✅ 8/8 | ✅ 100/100 (0 doublon) | ✅ 100 % ≥4 options | ✅ 20/20 | ✅ **EXIT=0** (31/08) | ✅ |
| T2 Niveaux 3-5 | ⬜ 0/30 | ⬜ 0/15 | ⬜ 0/300 | ⬜ | ⬜ 0/30 | ⬜ | ⬜ |
| T3 Niveaux 6-8 | ⬜ 0/30 | ⬜ 0/17 | ⬜ 0/300 | ⬜ | ⬜ 0/30 | ⬜ | ⬜ |
| T4 Banque massive | ⬜ 0/80 | ⬜ 0/55 | ⬜ 0/900 | ⬜ | ⬜ | ⬜ | ⬜ |
| T5 Consolidation | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## Tranche 1 — livrée le 31/08 (détail mesuré)

**20 leçons riches** (IDs 101-120, aucune collision avec les leçons legacy) :

| # | Niveau | Titre | Expl. (car.) | Ex. | Voc. | Expr. | Pratique | Quiz |
|---|---|---|---|---|---|---|---|---|
| 101 | 1 | Introduction to English Sentence Structure | 3242 | 7 | 8 | 5 | 4 | 4 |
| 102 | 1 | The Verb to be in IT Context | 2605 | 7 | 8 | 5 | 4 | 4 |
| 103 | 1 | Present Simple for Technical Operations | 2113 | 7 | 8 | 5 | 4 | 4 |
| 104 | 1 | Asking Questions and Making Negatives in IT | 2619 | 7 | 8 | 5 | 4 | 4 |
| 105 | 1 | There is / There are — Describing What Exists | 2554 | 7 | 8 | 5 | 4 | 4 |
| 106 | 1 | Articles: a, an, the in Technical Context | 2491 | 7 | 8 | 5 | 4 | 4 |
| 107 | 1 | Pronouns and Auxiliaries in IT Communication | 2538 | 7 | 8 | 5 | 4 | 4 |
| 108 | 1 | Can and Can't — Ability, Permission, Possibility | 2483 | 7 | 8 | 5 | 4 | 4 |
| 109 | 1 | Imperative for Instructions and Procedures | 2432 | 7 | 8 | 5 | 4 | 4 |
| 110 | 1 | Wh- Questions for Troubleshooting | 2445 | 7 | 8 | 5 | 4 | 4 |
| 111 | 2 | Present Continuous: Describing Ongoing Incidents | 2494 | 7 | 8 | 5 | 4 | 4 |
| 112 | 2 | Present Simple vs Continuous: Choosing Right | 2535 | 7 | 8 | 5 | 4 | 4 |
| 113 | 2 | Past Simple: Reporting What Happened | 2404 | 7 | 8 | 5 | 4 | 4 |
| 114 | 2 | Present Perfect: Experience and Ongoing Results | 2506 | 7 | 8 | 5 | 4 | 4 |
| 115 | 2 | Future: Will vs Going To for Tech Planning | 2484 | 7 | 8 | 5 | 4 | 4 |
| 116 | 2 | Comparatives and Superlatives: Comparing Solutions | 2655 | 7 | 8 | 5 | 4 | 4 |
| 117 | 2 | Should, Must, Have To: Advice and Obligation | 2590 | 7 | 8 | 5 | 4 | 4 |
| 118 | 2 | Past Continuous: Setting the Scene | 2546 | 7 | 8 | 5 | 4 | 4 |
| 119 | 2 | In, On, At: Prepositions of Time and Place in IT | 2287 | 7 | 8 | 5 | 4 | 4 |
| 120 | 2 | IT Phrasal Verbs You Actually Use | 2667 | 7 | 8 | 5 | 4 | 4 |

Chaque leçon = explication fouillée (IT-contextualisée, FR) + 7 exemples (sens/traduction + contexte IT réel) + 8 termes de vocab (définition + traduction + exemple) + 5 expressions classées + 4 exercices + mini-quiz 4 questions corrigées + 3 patterns. **100 questions** neuves rattachées (5/leçon), 0 doublon, 16/16 skills N1-N2 couvertes, QCM tous ≥ 4 options. Assessment 999 réparé (question morte → 1001).

Outils livrés : `scripts/build-t1.py` (générateur déterministe, reproductible), `database/remediation-t1.json` (artefact leçons), `scripts/apply-t1.py` (application au seed).

## État hérité (mesuré au 31/08, restant à remédier)

```text
Seed actuel : 63 leçons (43 legacy insuffisantes) | 533 questions (433 legacy dont 209 doublons)
Leçons insuffisantes :      43   → T2/T3
Doublons leçons (titres) :  11   → T2/T3
Doublons modules :          8    → T2/T3
Modules orphelins :         26/55→ T2/T3
Questions orphelines :      433  → T2/T3/T4
Doublons questions :        209  → T4
Skills couvertes (full) :   36/36 (scope)
Assessments :               9 (999 réparé)
```

## Compteurs globaux (régénérés par le validator)

```text
Leçons T1 livrées :        20/20  ✅ (seuil Constitution Titre XV atteint)
Modules N1-N2 pourvus :    8/8    ✅ (0 orphelin sur le scope)
Questions T1 uniques :     100/100✅ (0 doublon, 100 % liées)
QCM T1 ≥ 4 options :       100 %  ✅
Mini-quiz T1 :             20/20  ✅ (4 questions corrigées chacun)
Skills N1-N2 couvertes :   16/16  ✅
Gate validator T1 :        EXIT=0 ✅ (bloquant en CI)
Reste T2-T5 :              voir « État hérité » ci-dessus
```

---

*Mis à jour à chaque gate. Dernière MAJ : 2026-08-31 — **T1 CLOSE** (20 leçons + 100 questions, gate EXIT=0, CI bloquante sur scope 1-2, seed 63 leçons / 533 questions, push GitHub). Prochaine : T2 (niveaux 3-5 — 30 leçons, 15 modules, 300 questions).*
