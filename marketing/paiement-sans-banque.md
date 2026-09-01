# 💳 Recevoir l'argent SANS compte bancaire — Solution Payoneer + Merchant of Record

> **Problème résolu** : encaisser des clients dans plusieurs pays et devises SANS
> ouvrir un compte bancaire dans chaque pays — et sans IBAN.
>
> **Pourquoi ta carte personnelle (ex. Fondeka) ne suffit pas** : une carte de
> paiement est un outil de DÉPENSE. Aucun processeur (Stripe, Gumroad, PayPal…)
> ne verse directement des fonds commerciaux sur une carte personnelle. Il faut
> un intermédiaire qui encaisse et te reverse.

---

## 🏦 L'architecture recommandée (2 comptes gratuits, zéro banque)

```
CLIENT (Monde entier : MA · FR · CD · CA · US…)
   → paie avec sa carte (29 € / 199 MAD / 12 000 FCFA / 39 $ / $19.99)
   ↓
① MERCHANT OF RECORD  (Gumroad · Lemon Squeezy · Paddle)
   → encaisse TOUTES les devises
   → gère la TVA correspondante, la fraude, les remboursements
   → AUCUN numéro de carte client n'arrive sur ton serveur (PCI délégué)
   ↓  reversement hebdomadaire (ou au choix)
② PAYONEER  (« ta banque virtuelle » mondiale, agréée FCA/UE)
   → te fournit des comptes de réception EUR + USD (IBAN virtuels, sans banque locale)
   → l'argent est consolidé dans ton portefeuille Payoneer
   ↓
③ CARTE MASTERCARD PAYONEER (physique et/ou virtuelle)
   → tu dépenses en ligne / en magasin
   → retrait espèces aux distributeurs (ATM) où que tu sois
```

**En une phrase** : le MOR encaisse, Payoneer reçoit, la Mastercard Payoneer dépense.
Tu ne touches jamais un formulaire bancaire local.

---

## ✅ Étapes exactes de mise en place (environ 1 heure)

### Étape 1 — Ouvrir un compte Payoneer (gratuit)
1. Aller sur <https://www.payoneer.com> → « Inscription ».
2. Renseigner : pays, adresse, **pièce d'identité**, justificatif de domicile (facture ou attestation). Aucun dépôt, aucun IBAN requis.
3. Sous 3 à 7 jours ouvrés, le compte est validé. Tu reçois alors :
   - des **coordonnées de réception** (comptes virtuels EUR + USD) présentes dans le tableau de bord ;
   - la possibilité de commander une **carte Mastercard Payoneer** (livrée en ~2 semaines) ou une carte virtuelle immédiate.

### Étape 2 — Créer tes produits de paiement sur un MOR
Choisis **un seul** de ces MOR (tous encaissent par carte Mastercard/Visa partout) :

| MOR | Commission | Reversement | Particularité |
|---|---|---|---|
| **Gumroad** | 10 % + 0,30 $ | hebdo vers Payoneer/PayPal | le plus simple, product links, pas d'approbation |
| **Lemon Squeezy** | 5 % | hebdo | gère la TVA partout, très pro |
| **Paddle** | 5 % + 0,50 $ | hebdo | excellent pour SaaS, approbation requise |

Pour chacun : crée **5 produits** correspondant à nos régions de prix, avec les montants EXACTEMENT alignés sur `lib/pricing.ts` :

| Produit MOR | Clé prix | Prix affiché |
|---|---|---|
| Premium — Europe | `EUR` | 29 € |
| Premium — Maroc | `MAD` | 199 MAD |
| Premium — Afrique | `XOF` | 12 000 FCFA ***(voir note)*** |
| Premium — Canada | `CAD` | 39 $ |
| Premium — International | `USD` | $19.99 |

> **Note XOF** : certains MOR n'acceptent pas le franc CFA. Dans ce cas, pour l'Afrique
> francophone, crée le produit en **EUR (29 €)** ou en **USD ($19.99)** et indique
> l'équivalent en FCFA dans la description (« ≈ 18 000 FCFA »).

### Étape 3 — Configurer le code (prêt dans le repo)
Dans `.env.local` (NE PAS committer) :

```bash
NEXT_PUBLIC_PAYMENTS_ENABLED=true

MOR_CHECKOUT_URL_EU=https://gumroad.com/l/summit-premium-eur
MOR_CHECKOUT_URL_MA=https://gumroad.com/l/summit-premium-mad
MOR_CHECKOUT_URL_AF=https://gumroad.com/l/summit-premium-fcfa
MOR_CHECKOUT_URL_CA=https://gumroad.com/l/summit-premium-cad
MOR_CHECKOUT_URL_US=https://gumroad.com/l/summit-premium-usd
MOR_CHECKOUT_URL_FALLBACK=https://gumroad.com/l/summit-premium
```

- L'endpoint `POST /api/checkout` redirige déjà vers l'URL MOR de la région choisie (code livré + testé).
- La page `/tarifs` bascule **automatiquement** de la waitlist vers le checkout réel quand `NEXT_PUBLIC_PAYMENTS_ENABLED=true`.

### Étape 4 — Recevoir l'argent
1. Ventes → reversées par le MOR vers **ton portefeuille Payoneer** (hebdo, ou manuel).
2. Payoneer → dépense ou retrait via **ta Mastercard Payoneer**, ou transfert vers un compte local plus tard si tu le souhaites.

---

## 💶 Frais réels à prévoir (estimation)
| Poste | Ordre de grandeur |
|---|---|
| Gumroad | **10 %** + 0,30 $ |
| Lemon Squeezy | **5 %** |
| Payoneer (réception) | **1-2 %** (selon devise), plafonné |
| Carte Payoneer | retrait ATM ~3 $ ; paiement en ligne/magasin gratuit |
| Retrait local Payoneer→banque | fixe ~1-2 %, selon pays |

Exemple avec **Gumroad + Payoneer** sur une vente à 29 € : ~29 - 3,20 (Gumroad) - 0,50 (Payoneer) ≈ **25,30 € nets**. Sur 199 MAD (~18 €) : ≈ **16 € nets**.

---

## 🛡️ Pourquoi c'est sécurisé
- **PCI** : ton serveur ne voit aucune donnée de carte client (délégué au MOR).
- **Payoneer** : établissement financier agréé (licences FCA Royaume-Uni / autorité bancaire UE, Lituanie), opérationnel depuis 2005, régulé.
- **Remboursements/disputes** : gérés par le MOR, tu n'as pas à renvoyer d'argent manuellement.
- **TVA** : le MOR s'en charge (Lemon Squeezy/Paddle incluent la TVA internationale d'office). Tu restes responsable de ta déclaration locale le moment venu.

---

## ❓ FAQ
- **Puis-je vendre en MAD/FCFA avec un MOR ?** Oui pour les devises majeures ; FCFA souvent indisponible → remplacer par EUR/USD + équivalent affiché (voir note).
- **Combien de temps pour recevoir après une vente ?** Vente → reversement MOR → Payoneer : 1 à 2 semaines au début, puis ~1 semaine.
- **Faut-il une société/entreprise ?** Non pour démarrer (vendeur individuel). Une société simplifie TVA et crédibilité plus tard.
- **Et si je veux plus tard un compte bancaire ?** Payoneer permet le transfert vers n'importe quelle banque locale le jour où tu en as une.

---

## 🚀 Prochaine action concrète
1. Ouvre Payoneer aujourd'hui (délai de validation 3-7 jours → lance en parallèle de la campagne waitlist).
2. Choisis un MOR (recommandé : **Lemon Squeezy** si le dossier passe, sinon **Gumroad** instantané).
3. Crée les 5 produits + renseigne les URL dans `.env.local`.
4. Passe `NEXT_PUBLIC_PAYMENTS_ENABLED=true` → le funnel est en production.
5. Pour 100 % de conformité : garde une trace de chaque vente (export CSV) en attendant une société.
Chaque produit te donne une **URL de paiement** du type `https://gumroad.com/l/summit-premium-eur`.