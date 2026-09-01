# ✉️ Séquence email — Waitlist → Premium (3 emails)

> **Objectif** : transformer les leads `waitlist` capturés en **premium payants** dès l'ouverture
> du paiement. Envoyer le premier email immédiatement (confirmation), puis relances J+3 et J+7.
> Le sujet évoque le bénéfice, jamais le spam. Données source : collection Firestore `waitlist`.

---

## 📧 Email 1 — Confirmation (immédiatement)
**Objet** : `✅ Vous êtes bien inscrit(e) — Summit English Institute`
**Préheader** : Votre accès à vie à -10% est réservé.

```
Bonjour <firstName>,

Vous êtes bien inscrit(e) à la liste d'attente Summit English Institute — région <REGION>.

Ce qui vous attend dès que nous ouvrons les inscriptions :
👉 Les 8 niveaux (CEFR A2 → C1), 80 leçons, anglais IT & cybersécurité
👉 Les évaluations par niveau + certification finale
👉 Votre bonus -10% (réservé aux 100 premiers inscrits)

En attendant, profitez du programme gratuit dès maintenant :
🔗 Diagnostic gratuit + niveaux 1-2 sur le site (aucune carte requise).

À très vite,
L'équipe Summit English Institute — IUMORAVE
```
**CTA** : `[Commencer gratuitement] https://<domaine>/register`

---

## 📧 Email 2 — Relance J+3 (preuve)
**Objet** : `Le test qui change tout — gratuit`
**Préheader** : 90% des profils se trompent sur leur niveau réel.

```
Bonjour <firstName>,

En attendant l'ouverture des paiements, faites le diagnostic gratuit.

Pourquoi c'est stratégique :
- Il mesure vos points forts / faibles, compétence par compétence (pas un score global).
- Il oriente votre programme 20 jours selon VOS besoins.
- Il reste accessible gratuitement pendant la waitlist.

RAPPEL : les 100 premiers inscrits gardent -10% permanent.
Vous êtes inscrit(e) → votre place est réservée.

[Faire le diagnostic →]
```
**CTA** : `[Diagnostic gratuit] https://<domaine>/diagnostic`

---

## 📧 Email 3 — Urgence J+7 (offre)
**Objet** : `🎁 Votre -10% expire bientôt — <REGION>`
**Préheader** : Prix final 190 MAD au lieu de 199 MAD (ou équivalent région).

```
Bonjour <firstName>,

Nous ouvrons les inscriptions pour <REGION> très bientôt.

À la clé :
✅ Accès à vie aux 8 niveaux + certification
✅ 80 leçons, révisions SRS, évaluations par niveau
✅ Garantie 7 jours satisfait ou remboursé

Votre tarif réservé : <PRIX_REGION> (au lieu de <PRIX_PLEIN>)
→ réservé aux inscrits sur la liste d'attente.

Dès l'ouverture, vous recevrez votre lien personnel de pré-vente.
Place gardée jusqu'au lancement.

À très vite 👍
```
**CTA** : `[Voir les offres] https://<domaine>/tarifs`

---

## ⚙️ Implémentation technique (à brancher plus tard)
- **Outil** : Resend / Brevo (gratuits) ou Firebase Extensions `email` (Postmark).
- **Déclencheur** : firestore `waitlist.create` → envoie l'Email 1.
- **Cron / Cloud Functions** : J+3 et J+7 → Emails 2 & 3 (via `getWaitlistEntryByEmail` + `createdAt`).
- **Champs à ajouter si besoin** : `rank`, `coupon`, `convertedAt`.
- **Test** : créer un lead factice (email de test) et vérifier réception + clic.

> ℹ️ Tant que l'API email n'est pas branchée, exportez la collection `waitlist` en CSV
> (Firebase Console → waitlist → exporter) et envoyez les emails via Brevo/Resend manuellement.