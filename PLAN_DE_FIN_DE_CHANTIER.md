# 🗺️ Plan de Fin de Chantier — Summit English Institute

> **Document vivant** : liste complète de ce qui reste à faire jusqu'à la fin du chantier,
> dans l'ordre d'exécution, avec estimations de temps.
> Légende : 🔨 coder / 🖐️ action fondateur / 🔧 config / 🧪 tester / 📣 marketing.

---

## ✅ Déjà livré et en production (rappel rapide)

| Bloc | Statut |
|---|---|
| Contenu : 80 leçons denses + 920 QCM + validator 100% + CI verte | ✅ DONE |
| Déploiement prod : Vercel `english.iumorave-ac.org` + Firestore + comptes test | ✅ DONE |
| UX Phase A : cache SWR, skeletons, dashboard réel, PWA | ✅ DONE |
| Paywall Phase B : gating API, pricing régional (MAD/EUR/XOF/CAD/USD), Stripe webhook testé | ✅ DONE |
| Waitlist : route API + formulaire `/tarifs` + tests | ✅ DONE |
| Checkout MOR : adapter (Gumroad/Lemon Squeezy) sans banque + tests | ✅ DONE |
| Marketing : plan GTM Maroc + séquence emails + doc paiement sans banque | ✅ DONE |
| Qualité : **136/136 tests**, lint 0, tsc, build OK | ✅ DONE |

---

## 📋 PHASE 1 — ACTIVER L'ENCAISSEMENT RÉEL (∼3-7 jours calendaires, surtout de l'attente)

### 1.1 🖐️ Ouvrir un compte **Payoneer** (délai de validation 3-7 jours → À FAIRE MAINTENANT)
- Inscription gratuite → pièce d'identité + justificatif domicile.
- Obtenir les **coordonnées de réception** (EUR + USD) et commander la carte Mastercard Payoneer.
- *Pendant cette attente, on fait les étapes 1.2 à 1.4 en parallèle.*

### 1.2 🖐️ Créer les produits de paiement sur un **MOR** (1-2 h)
- Choisir **Lemon Squeezy** (5 %, TVA gérée) ou **Gumroad** (10 %, instantané).
- Créer 5 produits alignés sur `lib/pricing.ts` : 29 € · 199 MAD · 12 000 FCFA (ou 29 € si FCFA refusé) · 39 $ · $19.99.

### 1.3 🔨 **Webhook de confirmation MOR** (0,5 jour de code) — 🔥 LE GAP CRITIQUE
- Aujourd'hui le checkout MOR **redirige** vers Lemon Squeezy/Gumroad mais **rien ne confirme
  le paiement côté serveur** → `user.plan` ne passe pas à `premium` automatiquement.
- Créer `app/api/webhooks/mor/route.ts` : vérifier la signature du webhook MOR, lire l'événement
  `order_created`, marquer `plan=premium` + `premiumOrderId` + `premiumSource='mor'` (idempotent).
- Brancher ce webhook dans le dashboard MOR → URL `https://<domaine>/api/webhooks/mor`.

### 1.4 🖐️ Test réel « d'achat » (30 min)
- `NEXT_PUBLIC_PAYMENTS_ENABLED=true` en environnement de préview Vercel.
- Acheter le produit test avec une **vraie Mastercard** (la tienne) → vérifier que le webhook
  active Premium + le badge migre à ⭐ dans le dashboard.

### 1.5 🔧 Mise en production (15 min)
- Renseigner les URL MOR dans les variables d'environnement Vercel (Production + Preview).
- `NEXT_PUBLIC_PAYMENTS_ENABLED=true` en prod.
- Vérifier que `/tarifs` affiche les cartes de paiement (plus la waitlist).

---

## 📋 PHASE 2 — TABLEAU DE BORD ADMIN + RELANCE LEADS (∼2 jours de code)

### 2.1 🔨 **Tableau de bord admin ventes/leads** (1 jour)
- Page `/admin` (réservée rôle admin) : liste `waitlist` (email, région, date, source),
  compteurs (inscrits, convertis), liste des `premium` récents (email, source, région, date).
- API `GET /api/admin/leads` + `GET /api/admin/sales` sécurisées (rôle admin requis).

### 2.2 🔨 **Export CSV** (0,5 jour)
- Bouton « Exporter CSV » → télécharge `waitlist.csv` (ou `sales.csv`).
- Permet la relance email manuelle (voir phase 3) même sans SASS.

### 2.3 🔨 **Séquence email automatique (Resend/Brevo)** (0,5-1 jour)
- Brancher l'API email (Brevo gratuit) → déclencheur : Firestore `waitlist.create` → Email 1.
- Cron/Function J+3 et J+7 → Emails 2 & 3 (avec `createdAt`).
- Si pas de SASS : documenter l'export CSV → envoi manuel (déjà écrit dans `marketing/sequence-emails-waitlist.md`).

**→ Livrable fin Phase 2 : les 300 leads sont relançables et les ventes visibles.**

---

## 📋 PHASE 3 — FINITIONS QUALITÉ & TESTS FINAUX (∼2-3 jours)

### 3.1 🧪 Tests responsive (0,5 jour)
- Vérifier smartphone / tablette / desktop sur : `/tarifs`, `/checkout/*`, `/course`, `/dashboard`.

### 3.2 🧪 Tests de sécurité (0,5 jour)
- Vérifier : routes admin protégées, `/api/checkout` refuse non-authentifié, webhooks signés,
  les clés ne fuient pas dans le client bundle.

### 3.3 🧪 Parcours complet e2e (1 jour)
- Inscription → diagnostic → leçon → exercice → évaluation → progression → final → certificat
  + le nouveau parcours premium (achat → activation → accès N3).

### 3.4 🔨 Corrections issues des tests (0,5-1 jour)
- Bouchonner tous les bugs trouvés (budget).

**→ Livrable fin Phase 3 : le produit est « fini » au sens qualité.**
---

## 📋 PHASE 4 — LANCEMENT COMMERCIAL (∼15 jours, côté fondateur)

### 4.1 📣 Campagne waitlist → leads (J1-J15, déjà documentée)
- TikTok (3 vidéos) + groupes Facebook + partenariats.
- Objectif : 300 leads sur `/tarifs`.

### 4.2 📣 Ouverture des paiements (J-X, dès Phase 1 validée)
- `NEXT_PUBLIC_PAYMENTS_ENABLED=true` en prod.
- Activer le coupon `LANCEMENT10` (-10% premiers 100).
- Déclencher l'email 3 d'urgence vers la liste.

### 4.3 📣 Suivi hebdo (1 h / semaine)
- Dashboard admin : taux de conversion leads→premium par région.
- Ajuster prix/canaux si nécessaire (les prix sont déjà paramétrables dans `lib/pricing.ts`).

---

## 📋 PHASE 5 — OPTIONNEL / LISSÉ (à décider ensemble)

- 🇲🇦 **Activation CMI Maroc** quand tu ouvres un compte marchand marocain (scaffold `lib/cmi.ts` existant).
- 🌍 **Multi-lingue** (arabe/anglais) : nécessite i18n, non bloquant.
- 📱 **Abonnements** (mensuel/annuel) : non recommandé au lancement (le paiement unique convertit mieux).
- 🤖 **IA Gemini visible** (explications personnalisées) : clé API à ajouter, optionnel.

---

## ⏱️ Estimation globale

| Phase | Durée (moi) | Durée calendaire | Déclencheur |
|---|---|---|---|
| 1. Encaisse réel (Payoneer+MOR+webhook) | 0,5-1 j | 3-7 j | **Toi** : ouvrir Payoneer dès maintenant |
| 2. Admin leads + exports + email | 2 j | 2-3 j | Après ou en parallèle |
| 3. Tests finaux & corrections | 2-3 j | 2-3 j | Disponible dès maintenant |
| 4. Lancement commercial | — | 15 j | Dès que Phase 1 est OK |
| 5. Optionnel (CMI, i18n, IA) | 2-5 j | à la demande | Toujours après le lancement |

**TOTAL « fin du chantier » : ∼2 semaines de travail (moi) + 3-4 semaines calendaires
(à cause de l'attente Payoneer et de la campagne de 15 jours), en parallèle.**

---

## ⚡ 3 actions du fondateur À FAIRE CETTE SEMAINE

1. **Ouvrir Payoneer** (aujourd'hui) — c'est le goulot d'étranglement.
2. Choisir **Lemon Squeezy** ou **Gumroad** et créer les 5 produits.
3. Me dire « go » pour lancer la **Phase 2+3** (admin leads + tests) pendant l'attente Payoneer.
> Si tu veux compresser : lancer la **Phase 3 (tests) et 2 (admin)** pendant que Payoneer
> valide ton compte → la seule dépendance critique, c'est Payoneer + MOR.
**→ Livrable fin Phase 1 : première vente encaissée sur Payoneer.**