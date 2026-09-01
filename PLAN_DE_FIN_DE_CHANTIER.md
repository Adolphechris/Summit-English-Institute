# 🔎 AUDIT FINAL & PLAN DE FIN DE CHANTIER — Summit English Institute

> **Document de référence unique** — issu d'un contrôle global local (code, config, tests).
> La vérification « en ligne » (Vercel/Firebase/prod) est listée en Annexe 3 car elle
> requiert tes accès.
> Légende : 🔴 P0 (bloquant vente) · 🟠 P1 (important) · 🟡 P2 (qualité) · 🔵 P3 (optionnel).

---

## PARTIE A — RÉSULTATS DE L'AUDIT COMPLET

### A.1 ✅ Ce qui est sain (vérifié dans le code)
| Domaine | Constat |
|---|---|
| Tests | **136/136 passent** (tsc + lint + build inclus) |
| Contenu | 80 leçons denses (2400-3472 car), 920 QCM uniques, validator full exit 0 |
| Sécurité auth | cookies httpOnly, rate-limit register, routes admin protégées par `getRequestAdminUser` |
| Webhooks | Stripe + CMI : signatures HMAC + idempotence vérifiées et testées |
| PWA/SEP | manifest + service worker (aucun cache sur /api/*) |
| Paiement | pricing régional (MAD/EUR/XOF/CAD/USD), adapter MOR prêt, checkout 401/409/503 propre |
| Prod | Vercel + Firestore + comptes test `student@summit.edu` / `admin@summit.edu` documentés |

### A.2 🔴 GAPS DÉCOUVERTS (à corriger impérativement)

| # | Sévérité | Gap | Détail de l'audit |
|---|---|---|---|
| G1 | 🔴 P0 | **Aucun webhook MOR** | `app/api/webhooks/` ne contient que `stripe/` et `cmi/`. Le checkout MOR redirige vers Gumroad/LS mais **rien ne met `user.plan='premium'`** → un client qui paie n'obtient pas l'accès. Funnel CASSÉ. |
| G2 | 🔴 P0 | **Coupon `LANCEMENT10` jamais codé** | Annoncé dans `marketing/`, aucun mécanisme dans le code. Impossible d'activer l'offre de lancement. |
| G3 | 🟠 P1 | **`cefrLevel` jamais renseigné** | Le champ existe dans le schéma, mais **None sur les 8 niveaux**. Le certificat ne peut pas afficher de niveau CEFR → crédibilité + réclamation « A2 → C1 » infondée. |
| G4 | 🟠 P1 | **Admin ne montre ni leads ni ventes** | `getAdminStats` ne compte ni `waitlist`, ni `premium`, ni sources. Aucun export CSV. |
| G5 | 🟠 P1 | **Formulaire support factice** | La page `/support` affiche « Message envoyé » mais **aucun backend, aucun email réel** (emails/+33 probablement fictifs). |
| G6 | 🟠 P1 | **Rate-limit manquant sur `/api/waitlist`** | `lib/rateLimit` existe et est utilisé sur register, pas sur waitlist → risque de spam bot. |
| G7 | 🟡 P2 | **CI obsolète** | Le workflow déclare « T1 bloquant » et « T2-T5 observation » alors que TOUTES les tranches sont DONE (tracker) → devrait passer `--full` bloquant. |
| G8 | 🟡 P2 | **Sitemap incohérent** | `/diagnostic` est référencé public dans le sitemap mais **protégé par le middleware** (→ `/login`). Incohérence SEO. |
| G9 | 🟡 P2 | **`checkout/success` statique** | Ne vérifie pas la session réelle, ne rafraîchit pas le badge plan (acceptable en MOR mais améliorable). |
| G10 | 🟡 P2 | **Mentions légales / CGV / RGPD absentes** | Aucune page `mentions`, `cgv`, `confidentialite`. Obligatoire dès qu'on vend (même via MOR). |
| G11 | 🟡 P2 | **Communication « 20 jours » ambiguë** | 80 leçons ≠ 20 jours. Le marketing promet « 20 jours » = risque de reproche. |
| G12 | 🟡 P2 | **Aucun exercice de production orale dirigée** | Le contenu est lecteur/QCM. Manque l'oral pour justifier « conversation professionnelle ». |

### A.3 🔵 Décisions à acter (audit de cohérence)
- Si MOR ET Stripe configurés : **MOR gagne** (choix déjà documenté) → à consigner.
- `checkout/success` accessible sans auth : OK (page publique).
- `robots.txt` disallow `/api/`, `/admin/` : ✅ correct.
---

## PARTIE B — PLAN D'IMPLÉMENTATION ORDONNÉ ET RÉALISTE

## B1. 🔴 VRAC — Réparer les blocs de vente (P0, 1 jour)
| Tâche | Travail | Livrable |
|---|---|---|
| B1.1 Webhook MOR | `app/api/webhooks/mor/route.ts` : vérifier signature webhook (Gumroad/LS), lire `order_id`, marquer `plan='premium'` + `premiumOrderId` + `premiumSource='mor'` (idempotent). | Accès auto après paiement |
| B1.2 Coupon LANCEMENT10 | Ajouter `lib/coupons.ts` (code → % off, validité max 100) + validation dans checkout/callback MOR + affichage `/tarifs`. | Offre lancement activable |
| B1.3 Tests | Tests intégration webhook MOR + coupon (suites dédiées). | 145+ tests |

## B2. 🟠 Fonder la crédibilité (P1, 1-2 jours)
| Tâche | Travail | Livrable |
|---|---|---|
| B2.1 CEFR réel | Renseigner `cefrLevel` sur les 8 niveaux (A1→C1) dans le seed + migration Firestore. | Niveaux alignés CEFR |
| B2.2 Certificat enrichi | Afficher `niveau CEFR` + « Programme 20 séquences ≈ 8-12 semaines » sur `/certificate/[id]`. | Certificat crédible |
| B2.3 USP « orale » | Ajouter 2 leçons d'expression orale dirigée (guides de conversation + phonétique) en N4/N6 + 40 QCM associées. | Couverture « conversation » |

## B3. 🟠 Piloter (P1, 2 jours)
| Tâche | Travail | Livrable |
|---|---|---|
| B3.1 Admin leads | Étendre `getAdminStats` (waitlist total, premium total, sources) + API `GET /api/admin/leads` + page section leads (email, région, date). | Vue acquisition |
| B3.2 Export CSV | Bouton « Exporter » (waitlist + ventes) côté admin. | Relance email manuelle |
| B3.3 Rate-limit waitlist | Ajouter `isRateLimitedAsync` sur `/api/waitlist` (par IP). | Anti-spam |
| B3.4 Support réel | Brancher le formulaire sur un backend email (Brevo/Resend) + vraies coordonnées (à te faire livrer). | Contact fonctionnel |

## B4. 🟡 Garantir la qualité livrable (P2, 1-2 jours)
| Tâche | Travail |
|---|---|
| B4.1 CI à jour | Workflow → `content:validate:full` bloquant (T1-T5 confirmés DONE). |
| B4.2 SEO | Retirer `/diagnostic` du sitemap (ou l'exposer), checker `/tarifs` bien indexé. |
| B4.3 checkout/success | Rafraîchir le badge plan via `/api/auth/me` + message selon `premiumSource`. |
| B4.4 Pages légales | `mentions-legales`, `cgv`, `confidentialite` (RGPD) + footer. |
| B4.5 Communication durée | Reformuler « 20 jours » → « programme de 20 étapes / 8-12 semaines » dans tarifs, landing, emails. |
| B4.6 Responsive & parcours | Tests manuels smartphone + parcours complet e2e (launcher, achat premium, certificat). |
## B5. 🔵 Lancer (P2/P3, 15-21 jours)
| Tâche | Déclencheur | Détail |
|---|---|---|
| B5.1 Ouvrir Payoneer | 🖐️ Toi | 3-7 j de validation → compte de réception + carte |
| B5.2 Créer produits MOR | 🖐️ Toi | 5 produits (EUR/MAD/XOF/CAD/USD) + URL dans env |
| B5.3 Webhook MOR actif | 🔨+🖐️ | Enregistrer l'URL webhook chez le MOR |
| B5.4 Test achat réel | 🖐️ Toi | Achat avec ta Mastercard → vérifier Premium activé |
| B5.5 Activer paiement | 🔧 | `NEXT_PUBLIC_PAYMENTS_ENABLED=true` en prod |
| B5.6 Campagne leads | 📣 | TikTok/Meta 15 jours (template prêt) → 300 leads |
| B5.7 Email séquence | 🔨 | Brancher Brevo/Resend sur Firestore waitlist (ou export CSV manuel) |

## B6. 🟢 Vérifications en ligne & serveur (Annexe 3, à faire par le fondateur)
- [ ] Firestore : règles fermées, PITR/sauvegardes actives, `firestore:seed` à jour (CEFR).
- [ ] Vercel : variables prod à jour (`AUTH_SECRET`, `NEXT_PUBLIC_*`, MOR URLs), domaine OK.
- [ ] Stripe/MOR Dashboard : produits créés, webhook enregistré, test de webhook envoyé.
- [ ] Google Search Console : soumettre `sitemap.xml`, vérifier indexation `/tarifs`.
- [ ] Analytics : GA4/PostHog branché sur `/api/checkout` + webhooks.
- [ ] Sauvegarde manuelle avant chaque déploiement sensible (`scripts/backup.sh`).

---

## PARTIE C — CALENDRIER RÉALISTE (à partir d'aujourd'hui)

| Jours | Travail (moi) | Action (toi) |
|---|---|---|
| J1 | B1 (webhook MOR + coupon + tests) | Ouvrir Payoneer + créer produits MOR |
| J2-J3 | B2 (CEFR + certificat + oral) + B3 (admin/lead/CSV/rate-limit/support) | Attendre validation Payoneer |
| J4-J5 | B4 (CI, SEO, legal, durée, responsive) | Créer le webhook MOR dans le dashboard |
| J6 | Test complet e2e + build + push | Test achat réel avec ta carte |
| J7+ | B5 suite (email Brevo) | Lancer campagne TikTok 15 j |

**Total : ~5-6 jours de travail (moi) + actions fondateur en parallèle. En calendaire :
1-2 semaines pour réparer/cristalliser, puis 2-3 semaines de campagne = objectif première vente
réelle sous 3-4 semaines.**

---

## PARTIE D — REJET DE QUALITÉ (DONE / NEXT / BLOCKED)

| Phase | Bloc | Statut |
|---|---|---|
| ✅ DONE | B0 : fondations, contenu 80/920, UX, paywall, pricing régional, waitlist, MOR adapter, GTM | Livré |
| 🔄 NEXT | B1 (webhook MOR + coupon) | Demain |
| ⛔ BLOCKED | B5 (paiements réels + campagne) | Payoneer + MOR du fondateur |