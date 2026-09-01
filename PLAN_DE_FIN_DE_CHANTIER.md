# 🏁 PLAN FINAL D'IMPLEMENTATION v2.0 — Summit English Institute
### Audit local + code + serveur · Proposition d'expert indépendant · Synthèse intégrée

> **Méthode** : ce plan fusionne (1) les 12 gaps découverts par l'audit technique
> complet et (2) les 5 chantiers de l'expert indépendant. Chaque tâche est
> priorisée (P0→P3) et attachée à un livrable mesurable.
> Légende : 🔴 P0 bloquant vente · 🟠 P1 important · 🟡 P2 qualité · 🔵 P3 option.
> « 🔨 » = code (moi) · « 🖐️ » = action fondateur · « 🔧 » = config.

---

## PARTIE A — VERDICT SUR LA PROPOSITION EXPERT

### A.1 Adopté tel quel (forte valeur / coût faible)
| Idée expert | Adoption |
|---|---|
| Page publique `/verify/[code]` + QR code (authenticité diplôme) | ✅ ADOPTÉ (Phase 2) |
| Bouton « Add to LinkedIn » | ✅ ADOPTÉ (Phase 2) |
| TTS audio prononciation (Web Speech API, 0 coût) | ✅ ADOPTÉ (Phase 3) |
| Exercices d'expression écrits dirigés (ticket Jira, stand-up) | ✅ ADOPTÉ (Phase 3) |
| Clarification « 20 jours » → « 20 étapes / 4 leçons/jour » | ✅ ADOPTÉ (Phase 3) |
| Coupons génériques gestion (ex. LAUNCH50) | ✅ ADOPTÉ (Phase 4, étendu du LANCEMENT10) |
| Admin : taux complétion + leçons populaires | ✅ ADOPTÉ (Phase 4) |
| Bannière installation PWA | ✅ ADOPTÉ (Phase 6) |
| Cache hors-ligne vocabulaire (public uniquement) | ✅ ADOPTÉ sous réserve sécurité (Phase 6) |
| Flutterwave / Mobile Money (Afr. de l'Ouest & RDC) | ✅ ADOPTÉ en v2 (Phase 7) |

### A.2 Réserve & modifications
| Point expert | Ma correction |
|---|---|
| Webhook MOR noyé dans chantier 3 | ⚠️ SORTI en **Phase 1 P0** — sans lui, pas de vente |
| Coupon non priorisé | ⚠️ SORTI en **Phase 1 P0** |
| Aucune page légale/RGPD | ➕ AJOUTÉ en Phase 5 (obligatoire avant vente) |
| Support factice ignoré | ➕ AJOUTÉ en Phase 4 |
| Rate-limit waitlist ignoré | ➕ AJOUTÉ en Phase 4 |
| CI obsolète + sitemap incohérent ignorés | ➕ AJOUTÉS en Phase 5 |
| checkout/success statique ignoré | ➕ AJOUTÉ en Phase 5 |
| TTS voix non garantie partout | ⚠️ MVP OK ; prévoir test Android/iOS |
---

## PARTIE B — PLAN ORDONNÉ (8 phases)

### PHASE 1 — RÉPARER LA VENTE (P0 · ~1 jour)
| ID | Tâche | Travail | Livrable |
|---|---|---|---|
| P1.1 | **Webhook MOR** (`/api/webhooks/mor/route.ts`) : vérifier signature (Gumroad/LS), traiter l'événement `order_created`, marquer `plan='premium'` + `premiumOrderId` + `premiumSource='mor'` (idempotent) | 🔨 | Accès auto après paiement |
| P1.2 | **Coupon LANCEMENT10** : `lib/coupons.ts` (code→%remise, plafond 100, expirabilité) + validation dans checkout + affichage `/tarifs` | 🔨 | Offre de lancement activable |
| P1.3 | Tests intégration webhook MOR + coupon | 🔨 | +10 tests |

### PHASE 2 — CRÉDIBILITÉ DU DIPLÔME (P1 · ~2 jours)
| ID | Tâche | Travail | Livrable |
|---|---|---|---|
| P2.1 | **Renseigner `cefrLevel`** sur les 8 niveaux (A1→C1) dans le seed + migration Firestore | 🔨 | Alignement CEFR |
| P2.2 | **Certificat enrichi** : badge « Niveau CEFR — Anglais IT & Cybécurité » + durée programme (8-12 semaines) | 🔨 | Diplôme crédible |
| P2.3 | **Page publique `/verify/[code]`** (nom, score, date, statut, QR) — SANS données privées (ni email, ni id) | 🔨 | Preuve vérifiable |
| P2.4 | **Bouton « Add to LinkedIn »** avec lien officiel + export PDF A4 (print CSS haute qualité) | 🔨 | Partage viral |

### PHASE 3 — PÉDAGOGIE & AUDIO (P1/P2 · ~2 jours)
| ID | Tâche | Travail | Livrable |
|---|---|---|---|
| P3.1 | **TTS 🔊** sur chaque terme technique + phrase clé (Web Speech API, accent US) | 🔨 | Compréhension orale |
| P3.2 | **Exercices d'expression écrite dirigée** : ticket Jira, stand-up, email — intégrés aux leçons | 🔨 | Production active |
| P3.3 | **Clarification « 20 jours »** : landing + tarifs → « Programme 20 étapes (4 leçons/jour) ou flexible » | 🔨 | Transparence |
### PHASE 4 — PILOTAGE & ACQUISITION (P1 · ~2 jours)
| ID | Tâche | Travail | Livrable |
|---|---|---|---|
| P4.1 | **Admin enrichi** : leads waitlist (email/région/date/source), taux complétion, leçons populaires, ventes premium | 🔨 | Vue acquisition |
| P4.2 | **Export CSV** (waitlist + ventes) | 🔨 | Relance manuelle |
| P4.3 | **Coupons génériques** (back-office créer/toggler, ex. LAUNCH50) | 🔨 | Leviers promo |
| P4.4 | **Rate-limit** sur `/api/waitlist` (par IP) | 🔨 | Anti-spam |
| P4.5 | **Support réel** : backend email (Brevo/Resend) + vraies coordonnées fournies par toi | 🔨🖐️ | Contact fonctionnel |

### PHASE 5 — CONFORMITÉ & QUALITÉ (P2 · ~1-2 jours)
| ID | Tâche | Travail | Livrable |
|---|---|---|---|
| P5.1 | Pages **mentions légales / CGV / confidentialité (RGPD)** + footer | 🔨 | Conformité avant vente |
| P5.2 | **CI à jour** : `content:validate:full` bloquant (T1-T5 confirmés DONE) | 🔨 | CI alignée |
| P5.3 | **Sitemap cohérent** (retirer `/diagnostic` protégé du sitemap) + SEO `/tarifs` | 🔨 | SEO propre |
| P5.4 | **checkout/success dynamique** : rafraîchir le badge plan via `/api/auth/me` selon `premiumSource` | 🔨 | Confirmation réelle |
| P5.5 | Tests **responsive** (mobile/tablette/desktop) + **parcours e2e** complet (achat premium→certificat) | 🧪 | Qualité |

### PHASE 6 — MOBILE & PWA (P2 · ~1 jour)
| ID | Tâche | Travail | Livrable |
|---|---|---|---|
| P6.1 | **Bannière d'installation PWA** (détection iOS/Android, bouton « Installer ») | 🔨 | Rétention mobile |
| P6.2 | **Cache hors-ligne vocabulaire publique** uniquement (jamais `/api/`) | 🔨 | Révision offline |

### PHASE 7 — ACTIVATION ENCAISSEMENT & PAYOUTS (P0, dépendant fondateur · 3-7 jours)
| ID | Tâche | Travail | Livrable |
|---|---|---|---|
| P7.1 | **Ouvrir Payoneer** (compte réception + carte Mastercard Payoneer) | 🖐️ | Réceptacle mondial |
| P7.2 | **Créer 5 produits MOR** (Gumroad/LS) alignés `lib/pricing.ts` | 🖐️ | Liens de vente |
| P7.3 | **Brancher le webhook MOR** dans le dashboard MOR (URL prod) | 🔧 | Confirmation auto |
| P7.4 | **Test achat réel** avec ta Mastercard → Premium activé | 🖐️ | Funnel validé |
| P7.5 | **Flutterwave / Mobile Money** (Orange Money, M-Pesa, Wave) pour Afrique | 🔨🔧 | Complément |
| P7.6 | **Bascule** `NEXT_PUBLIC_PAYMENTS_ENABLED=true` en prod | 🔧 | Ventes ouvertes |

### PHASE 8 — LANCEMENT COMMERCIAL (fondateur · 15-21 jours)
| ID | Tâche | Livrable |
|---|---|---|
| P8.1 | Campagne **TikTok/Meta 15 j** (templates prêts `marketing/`) | 300 leads |
| P8.2 | **Séquence email 3 étapes** (Brevo/Resend) sur collection `waitlist` | Conversion |
| P8.3 | **Suivi hebdo** dashboard admin (taux leads→premium par région) | KPIs |
---

## PARTIE C — ORDRE DE PRIORITÉ FINAL (vision "séquence de valeur")

| Rang | Étape | Bloque | Vaut la peine |
|---|---|---|---|
| 1 | Phase 1 (webhook MOR + coupon) | 🚫 vente impossible sans | 🔴 P0 |
| 2 | Phase 7 (Payoneer + MOR + test) | 🚫 encaissement réel | 🔴 P0 |
| 3 | Phase 2 (certificat vérifiable + CEFR) | — | 🟠 forte |
| 4 | Phase 4 (admin + export + support) | 🚫 pilotage | 🟠 forte |
| 5 | Phase 5 (légal + CI + SEO + success) | 🚫 avant toute vente publique | 🟡 nécessaire |
| 6 | Phase 3 (audio + exercices écrits) | — | 🟡 différenciant |
| 7 | Phase 6 (PWA mobile) | — | 🟡 rétention |
| 8 | Phase 8 (campagne commerciale) | 🚫 nécessite Phase 7 | 🟢 objectif |

## PARTIE D — CALENDRIER RÉALISTE

| Semaine | Travail (moi) | Action (toi) | Jalon |
|---|---|---|---|
| S1 | Phase 1 (webhook+coupon) | Ouvrir Payoneer, créer 5 produits MOR | Funnel vente réparé |
| S1-S2 | Phase 2 (certificat+verify+PDF) | Attendre validation Payoneer | Diplôme crédible |
| S2 | Phase 5 (légal+CI+SEO) + Phase 3 | Attendre validation Payoneer | Conforme + pédagogie |
| S2-S3 | Phase 4 (admin+export+support) + Phase 6 | Créer le webhook MOR dashboard | Outils de pilotage |
| S3 | Test achat réel + bascule paiement | **Acheter avec ta carte** | 1re vente |
| S3-S4 | Phase 8 (campagne 15 j) | TikTok/Meta + emails | 300 leads → ventes |

**Boucle de valeur** : Phase 1 → Phase 7 → Phase 8 = 1re vente sous ~3-4 semaines.
**Améliorations** (2-5-3-4-6) = livrées pendant l'attente Payoneer.

---

## PARTIE E — DÉFINITION DE FIN (Definition of Done globale)

1. **Vente fonctionnelle** : achat MOR → webhook → `plan=premium` → accès N3-N8 ✅
2. **Payouts** : argent reçu sur Payoneer/Mastercard sans banque locale ✅
3. **Diplôme** : CEFR affiché + page `/verify` + QR + LinkedIn + PDF ✅
4. **Conformité** : CGV/RGPD/mentions + support réel + anti-spam ✅
5. **Qualité** : 145+ tests, lint 0, tsc 0, build OK, CI full bloquant ✅
6. **Acquisition** : 300+ leads, séquence emails active, dashboard ventes ✅
7. **Mobile** : PWA installable, vocabulaire offline, responsive ✅
8. **Pédagogie** : audio prononciation + exercices d'expression dirigée ✅

---

## ANNEXE — CHECKLIST VÉRIFICATIONS EN LIGNE / SERVEUR (à la fin)
- [ ] **Firestore** : règles fermées, PITR/sauvegardes actifs, seed à jour (CEFR)
- [ ] **Vercel** : variables prod à jour (AUTH_SECRET, MOR URLs, NEXT_PUBLIC_*)
- [ ] **MOR Dashboard** : 5 produits + webhook enregistré + test de webhook envoyé
- [ ] **Google Search Console** : soumettre sitemap.xml, vérifier indexation `/tarifs`
- [ ] **Analytics** : GA4/PostHog branché sur `/api/checkout` + webhooks
- [ ] **Sauvegarde** : `scripts/backup.sh` avant chaque déploiement sensible
| Cache hors-ligne = données perso ? | ⚠️ Cache publique uniquement, jamais `/api/` |