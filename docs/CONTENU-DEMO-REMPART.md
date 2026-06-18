# Bible de contenu — démo Rempart Extermination (famille Ancrée)

> Source de vérité du contenu de la démo fictive d'extermination. Sert au seed
> Sanity (studio/seed/data/*.mjs) ET de documentation pour la revue. Compagnie
> FICTIVE, distincte de Combat (le vrai client) et de toute vraie entreprise.
>
> Règle d'or du seed: on REPREND la structure exacte des fichiers seed de la
> famille Minimaliste (webforge-minimaliste/studio/seed/data/*.mjs) — mêmes
> `_type`, mêmes `_key`, même composition des `pageBuilder`, même mécanique de
> références — et on n'en change QUE le contenu (textes, ids de marque, slugs).

## 1. La compagnie (siteSettings)

- **Nom**: Rempart Extermination
- **Baseline**: Gestion parasitaire pour la maison et le commerce. On reprend le contrôle, pour de bon.
- **Fondée**: 2011 (15 ans d'expérience en 2026)
- **Ville / base**: Lévis, QC (Rive-Sud de Québec, Chaudière-Appalaches)
- **Adresse**: 2750 avenue des Lilas, Lévis QC G6W 0M5 (fictive)
- **Téléphone**: 418 555 0147 (indicatif 418, région de Québec)
- **Courriel**: bonjour@rempartextermination.ca
- **Note Google**: 4,9 sur 5 (312 avis)
- **Heures**: Lun au Ven, 7h à 19h; Sam-Dim, urgences 24/7
- **Preuves de confiance**: Licencié et assuré; certification provinciale en
  application de pesticides (MELCCFP); garantie de résultat; service d'urgence 24/7.
- **Zone desservie** (areaServed): Lévis, Québec, Saint-Romuald, Saint-Nicolas,
  Charny, Chaudière-Appalaches, Bellechasse, Lotbinière, Beauce, Portneuf, Rive-Sud de Québec.
- **Fondateur (bloc about)**: Mathieu Bouchard, fondateur et technicien certifié.
  Équipe de 6 technicien·nes, présenté·es par leur nom (Mathieu, Karine, David,
  Jean-Philippe, Stéphanie, Olivier).
- **Réseaux**: Instagram + Facebook (href factices, comme Minimaliste).
- **Logo**: TEXTE seulement (omettre `brand.logo` dans le seed → repli wordmark).
- **seo.titleSuffix**: « Rempart Extermination » (REQUIS, sinon le build échoue).
- **seo.defaultDescription** (fr): « Gestion parasitaire et extermination à
  Lévis et dans la région de Québec. Fourmis, souris, guêpes, punaises de lit,
  coquerelles. Licencié, assuré, garantie de résultat. Service d'urgence 24/7. »

## 2. Ton éditorial (DESIGN.md)

Direct, humain, rassurant, local. Franc et affirmé (« on règle ton problème »),
SANS agressivité ni alarme. On parle au client, on le tutoie pas (vouvoiement
québécois soutenu et chaleureux). Pas de macabre, pas de gros plans d'insectes en
mots non plus: on rassure, on ne fait pas peur. Le téléphone est le héros: les CTA
poussent à appeler. Typo des textes: aucun tiret cadratin, aucun middle dot.

## 3. Politique d'images (IMPORTANT pour le build)

Pour ce seed, les figures (`_type: 'figure'`) portent `alt`, `label`, `caption`,
`ratio` mais **PAS de champ `image`** (donc pas de marqueur `{ _imagePath }`).
Résultat: `<Image>` rend ses placeholders élégants, le build est vert sans aucun
fichier image. Les vraies images (set curé) seront ajoutées dans une passe
ultérieure. Garder des `alt` descriptifs et honnêtes malgré tout.

## 4. Entités (ids déterministes; le runner ajoute -fr / -en)

> `_id` de base ci-dessous; chaque doc existe en `<base>-fr` et `<base>-en`.
> Les `internalRef` et `_ref` pointent vers `<base>-<lang>`. Les slugs DIFFÈRENT
> par langue (champ `slug.current` localisé).

### Services (5) — `service`
| base id | slug FR | slug EN | nom FR | nom EN |
|---|---|---|---|---|
| service-fourmis | extermination-fourmis | ant-control | Fourmis et fourmis charpentières | Ants & carpenter ants |
| service-rongeurs | souris-et-rats | rodent-control | Souris et rats | Mice & rats |
| service-guepes | guepes-et-frelons | wasps-hornets | Guêpes, frelons et nids | Wasps, hornets & nests |
| service-punaises | punaises-de-lit | bed-bugs | Punaises de lit | Bed bugs |
| service-coquerelles | coquerelles-et-blattes | cockroaches | Coquerelles et blattes | Cockroaches |

Chaque service: `summary` (résumé carte), `hero`/`detail` (intro de la fiche),
`benefits` (serviceBenefit: 3 bénéfices), `related` (refs vers 1-2 projets du même
nuisible), `seo`. Process en icônes line-art (DESIGN): inspection, traitement,
prévention, garantie.

### Projets / interventions (5) — `project` (études de cas avant/après)
| base id | slug FR | slug EN | titre FR | service lié |
|---|---|---|---|---|
| project-restaurant-coquerelles | restaurant-coquerelles-vieux-levis | old-levis-restaurant-cockroaches | Restaurant du Vieux-Lévis: coquerelles éradiquées | service-coquerelles |
| project-duplex-punaises | duplex-punaises-charny | charny-duplex-bed-bugs | Duplex à Charny: punaises de lit, traitement thermique | service-punaises |
| project-entrepot-rongeurs | entrepot-rongeurs-saint-romuald | saint-romuald-warehouse-rodents | Entrepôt à Saint-Romuald: programme antirongeurs | service-rongeurs |
| project-maison-fourmis | fourmis-charpentieres-saint-nicolas | saint-nicolas-carpenter-ants | Maison à Saint-Nicolas: fourmis charpentières arrêtées | service-fourmis |
| project-garderie-guepes | nid-guepes-garderie-levis | levis-daycare-wasp-nest | Garderie à Lévis: gros nid de guêpes retiré | service-guepes |

Chaque projet: `summary`, `stats` (projectStat: ex. « Délai 24 h », « Suivi 60 jours »,
« Résultat 0 nuisible »), body (étude de cas: situation, intervention, résultat),
témoignage rattaché (optionnel), cover (figure sans image). 3 projets en `featured`.

### Témoignages (6) — `testimonial`
| base id | client | ville | lié à |
|---|---|---|---|
| testimonial-julie | Julie L. | Saint-Romuald | service-rongeurs |
| testimonial-marc-andre | Marc-André G. (restaurateur) | Lévis | service-coquerelles |
| testimonial-genevieve | Geneviève T. | Saint-Nicolas | service-fourmis |
| testimonial-patrick | Patrick D. | Charny | service-punaises |
| testimonial-sophie | Sophie R. (garderie) | Lévis | service-guepes |
| testimonial-yvon | Yvon B. | Beauce | service-rongeurs |
Les 3 premiers en `featured`. Citations courtes, concrètes, locales, rassurantes.

### Catégories de blogue (3) — `category`
| base id | slug FR | slug EN | nom FR | nom EN |
|---|---|---|---|---|
| category-prevention | prevention | prevention | Prévention | Prevention |
| category-nuisibles | reconnaitre-les-nuisibles | pest-identification | Reconnaître les nuisibles | Pest identification |
| category-maison-saine | maison-saine | healthy-home | Maison saine | Healthy home |
Chaque catégorie: `title`, `slug`, `description` SUBSTANTIELLE (héros d'archive, requise).

### Thèmes FAQ (8) — `faqTheme`
| base id | titre FR |
|---|---|
| faqTheme-urgence | Délais et urgence |
| faqTheme-zone | Zone desservie |
| faqTheme-soumission | Estimation et soumission |
| faqTheme-securite | Produits, famille et animaux |
| faqTheme-garantie | Garantie |
| faqTheme-prix | Prix et paiement |
| faqTheme-suivi | Suivi et prévention |
| faqTheme-processus | Déroulement d'une intervention |

### Questions FAQ (9) — `faqItem`
| base id | thème | question FR |
|---|---|---|
| faqItem-delai | urgence | En combien de temps pouvez-vous intervenir? |
| faqItem-zone | zone | Quel territoire desservez-vous? |
| faqItem-soumission | soumission | L'estimation est-elle vraiment gratuite? |
| faqItem-produits | securite | Vos produits sont-ils sûrs pour mes enfants et mes animaux? |
| faqItem-garantie | garantie | Qu'est-ce que la garantie de résultat couvre? |
| faqItem-prix | prix | Combien coûte une intervention? |
| faqItem-acompte | prix | Faut-il payer d'avance? |
| faqItem-suivi | suivi | Faut-il un suivi après le traitement? |
| faqItem-processus | processus | Comment se déroule une visite à la maison? |

### Articles (6, 2 par catégorie) — `article` (split fr-1: 3, fr-2: 3)
| base id | slug FR | slug EN | catégorie | titre FR |
|---|---|---|---|---|
| article-souris-automne | empecher-souris-cet-automne | keep-mice-out-this-fall | prevention | Empêcher les souris d'entrer cet automne |
| article-fourmis-charpentieres | prevenir-fourmis-charpentieres | prevent-carpenter-ants | prevention | Prévenir les fourmis charpentières autour de la maison |
| article-punaises-reconnaitre | reconnaitre-punaises-de-lit | spot-bed-bugs-early | nuisibles | Reconnaître les punaises de lit avant qu'il soit trop tard |
| article-guepes-abeilles | guepes-frelons-ou-abeilles | wasps-hornets-or-bees | nuisibles | Guêpes, frelons ou abeilles: savoir les distinguer |
| article-coquerelles-cuisine | coquerelles-dans-la-cuisine | cockroaches-in-the-kitchen | maison-saine | Des coquerelles dans la cuisine: quoi faire ce soir |
| article-grenier-rongeurs | bruits-dans-le-grenier | noises-in-the-attic | maison-saine | Des bruits dans le grenier: ce que ça veut dire |
fr-1 = 3 premiers; fr-2 = 3 derniers. Corps = blocs article (lead, richText,
image, quote, callout, inlineCta), comme Minimaliste. Indexation: articles +
archives de catégorie indexés, pagination noindex (hérité).

## 5. Composition des pages (singletons) — blocs EXISTANTS

Reproduire la composition des `pageBuilder` de Minimaliste, contenu Rempart:

- **homePage** hero(home) → highlights → projectsPreview(featured, 3) →
  services(auto) → stats → mediaText(story, droite) → testimonials(featured) →
  blogPreview(3) → ctaBand.
  - Hero home: title = bénéfice (« On reprend le contrôle de chez vous. Pour de
    bon. »), lead (services + ville + 24/7), primaryCta = APPELER (href
    `tel:+14185550147`, label « 418 555 0147 »), secondaryCta = « Soumission
    gratuite » (interne contactPage). meta (3 chips de confiance): {Google, 4,9},
    {Permis, Licencié et assuré}, {Depuis, 2011}.
- **servicesPage** hero(page) → services(auto) → process → testimonials(featured)
  → faq (refs manuelles 4) → ctaBand.
- **projectsPage** hero(page) → ctaBand. (la grille de projets est rendue par la page)
- **aboutPage** hero(page) → about → highlights → stats → logos → testimonials → ctaBand.
- **blogPage** hero(page) + listCta/categoryCta/articleCta + related.heading. pageBuilder vide.
- **faqPage** hero(page) → 8 sections (une par thème, refs manuelles) → ctaBand.
- **contactPage** hero(page) → contact.
- **onePager** hero(home, ancres) → about → services(auto,4) → testimonials → faq(5 refs) → contact.

Blocs partagés (helpers locaux): highlights (4 engagements: licencié/assuré,
garantie de résultat, produits sûrs famille/animaux, service 24/7), stats (2011 /
15 ans / 4,9 Google / 24/7), process (inspection → traitement → prévention →
garantie), about (Mathieu Bouchard + équipe), contact (form 4 champs + coordonnées),
logos (certifications/affiliations: Membre ACGP, Licencié MELCCFP, Assuré, Garantie
de résultat, Produits homologués Santé Canada).

## 6. Pages légales (banques-legal) — gabarit générique rebrandé

Reprendre la structure légale de Minimaliste (legalPage conditions + politique de
confidentialité, legalSection / legalParagraph / legalList / legalTodo) en
remplaçant la marque par Rempart Extermination, le secteur « ébénisterie » par
« services de gestion parasitaire / extermination », l'adresse et les coordonnées
par celles de la section 1. Garder les `legalTodo` (placeholders à valider par le
client) et la posture Loi 25. Aucune valeur juridique réelle (gabarit).

## 7. Conventions de référence (rappel)
- `internal(label, '<base>-<lang>')`, `anchor(label, target)` comme Minimaliste.
- Les blocs « intelligents » (services, testimonials, faq, projectsPreview,
  blogPreview) portent copie + mode/limit; la résolution des items est en GROQ.
- Le héros reste un champ dédié hors pageBuilder. faq en sélection manuelle pure.
- Paires FR/EN par suffixe d'id; le runner génère translation.metadata.
