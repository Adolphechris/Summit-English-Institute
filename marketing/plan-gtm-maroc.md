# 🎯 Plan de Go-to-Market Express — Maroc (premier marché)

> **Objectif** : collecter **300 leads waitlist en 15 jours** avec un budget 0-50 MAD (sans Ads).
> Quand le paiement sera ouvert (`NEXT_PUBLIC_PAYMENTS_ENABLED=true`), convertir ces leads en
> Premium à **199 MAD** (paiement unique, Mastercard / CMI).

---

## 1. Personas cibles (3 profils rentables)

| # | Persona | Douleur | Angle d'entrée |
|---|---|---|---|
| 1 | **Étudiant** (Casablanca/Rabat/Fès, 17-24 ans) | « Mon anglais bloque mon diplôme / mon stage » | Certificat + niveau C1 |
| 2 | **Jeune diplômé IT** (cyber/prépa) 22-29 ans | « Les offres IT exigent l'anglais, le marché est bouché » | Anglais IT = salaire ×2 |
| 3 | **Parents actifs** (Casablanca) | « Aider mes enfants sans payer 300 MAD/h » | Meilleur qu'un cours particulier |

---

## 2. Offre de lancement (waitlist → pré-vente)

- **190 MAD au lieu de 199 MAD** pour les 100 premiers inscrits (coupon `LANCEMENT10` à activer dès l'ouverture).
- **Garantie 7 jours satisfait ou remboursé** (réduit le risque à l'achat).
- **Bonus** : accès à vie + mises à jour du programme incluses.

> ⚠️ Ne **jamais** afficher « 199 MAD » sans le bonus. L'urgence vient du coupon, pas du prix seul.

---

## 3. Campagne TikTok (15 jours) — scripts de 15-30 s

### Format qui fonctionne au Maroc
« Avant/après » + voix off en Darija/français + texte à l'écran (sous-titres).

**Production** : smartphone, éclairage naturel, vous en caméra + capture du tableau de bord Summit (un écran réel vaut 100 mockups).

### Vidéo 1 — « Le truc que personne ne te dit sur l'anglais » (hook)
```
⌛ 0-3s  : « 90% des offres IT au Maroc demandent l'anglais. Personne ne te dit ça à la fac. »
3-8s    : « Résultat : ceux qui parlent anglais doublent leur salaire. »
8-20s   : « Je me suis formé en 20 jours avec un programme structuré — pas des cours YouTube en vrac.
           Diagnostic gratuit, niveaux 1-2 gratuits. »
20-28s  : « Le lien est dans la bio. Les 100 premiers ont -10%. »
```
**Cover text** : `ANGLAIS = SALAIRE ×2 🇲🇦`

### Vidéo 2 — « Le diagnostic gratuit qui m'a réveillé » (preuve)
```
⌛ 0-4s  : « J'ai cru que j'étais B1. Le test m'a mis B1... et m'a montré mes faiblesses exactes. »
4-14s   : « Vocabulaire IT ? Échec. Temps des verbes ? OK. Le diagnostic par compétence est brutal. »
14-25s  : « Ensuite tu révisss avec la répétition espacée (SRS) — la science des révisions. »
25-30s  : « Gratuit. Lien bio. »
```
**Cover** : `CE QUE TON NIVEAU CACHE 🇲🇦`

### Vidéo 3 — « 199 MAD = 1 heure de cours » (offre)
```
⌛ 0-5s  : « Un cours d'anglais au Maroc : 150 à 300 MAD de l'heure. C'est chaud. »
5-12s   : « Mon programme complet : 20 jours, 80 leçons, évaluations, certificat. Pour la vie. »
12-20s  : « C'est le prix d'UNE seule heure de cours. Comparé à 300 MAD/h... franchement. »
20-28s  : « Lis la bio. 100 premiers inscrits -10%. »
```
**Cover** : `1H DE COURS OU 80 LEÇONS ?`

### Diffusion
- 1 vidéo / 2 jours pendant 15 jours (pause le week-end).
- **Hashtags** : `#anglais #learnenglish #casablanca #rabat #maroc #student #englishfortech`
- **Meilleur horaire** : 12h-14h (pause déjeuner) + 20h-22h (soirée).
- **Profil** : épingle la vidéo 1, bio = lien vers `/tarifs`.

---

## 4. Campagne Meta (Facebook / Instagram) — mêmes visuels

### Groupes Facebook à cibler
- « Cours d'anglais à Casablanca / Rabat / Fès » (10k-100k membres)
- « Étudiants au Maroc », « Recrute IT Maroc », « Expatriés Maroc »

### Post pilier (copy + image)
```
📌 L'anglais n'est PLUS un luxe au Maroc — c'est un passeport.

Le programme Summit English Institute :
✅ Diagnostic gratuit + niveaux 1-2 gratuits
✅ 20 jours structurés, 80 leçons, anglais IT & cybersécurité
✅ Évaluations + certificat inclus
✅ 100 premières inscriptions -10% (190 MAD)

🔗 Lien : [URL /tarifs]
```
**Visuel** : mockup smartphone du dashboard Summit + badge rouge « 190 MAD ».

### Ads (optionnel si budget)
- **Campagne 50 MAD/jour (7 jours)** : ciblage Maroc 18-35 ans, géo Casablanca/Rabat/Fès/Marrakech.
- **Objectif** : Leads (collecte d'email waitlist) — formulaire intégré, pas de lien externe.

---

## 5. Partenariats express
- **Influenceurs 15-30k abonnés** (étudiants/informatique) : collaboration 150-300 MAD par vidéo + code -10%.
- **Écoles de langue** : 10% de commission sur chaque Premium, réduction pour leurs élèves.
- **Groupes WhatsApp étudiants** : rejoindre 5 groupes, poster le pilier + offrir l'accès waitlist.

---

## 6. Suivi (conversion réelle)
| Métrique | Cible à J15 |
|---|---|
| Leads waitlist Maroc | **300** |
| Taux de conversion waitlist → premium (à l'ouverture) | 15-20% (45-60 ventes) |
| Coût / lead | ≤ 1 MAD |

**Suivi Firebase** : document `waitlist` → champ `source: 'tarifs'` + `region: 'ma'`.
**Reporting** : utiliser `countWaitlist()`.

---

## 7. Checklist 48h avant lancement
- [ ] Vérifier que `/tarifs` affiche la waitlist (et pas le checkout).
- [ ] Activer le coupon `LANCEMENT10` dans le back-office dès l'ouverture des paiements.
- [ ] Tester le formulaire (utiliser un email de test type test@summit.edu) dans Firebase.
- [ ] Créer 3 couvertures (Canva) + 3 voix off.
- [ ] Bio TikTok/IG = lien `/tarifs` + « -10% 100 premiers ».
- [ ] Pré-programmer les 3 vidéos.