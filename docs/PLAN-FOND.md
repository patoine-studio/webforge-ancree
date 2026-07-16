# PLAN-FOND, enrichissement du contenu et de l'architecture E-E-A-T

Démo Rempart Extermination (famille Ancrée, WebForge). Mandat FOND seulement: contenu et
structure. La forme (tokens, typo, espacements, couleurs, animations) reste à Charles, en
parallèle. Ce document est le plan d'audit du Temps 1. Rien n'est codé tant que Charles n'a pas
approuvé. Le brief d'images détaillé vit dans [IMAGES-BRIEF.md](./IMAGES-BRIEF.md).

Audit produit le 26 juin 2026 à partir du dataset Sanity en ligne, des schémas Studio et du
pipeline de requêtes. Les schémas et le code courant font foi pour l'architecture réalisée.

## Cadre et postures

- FOND seulement. Aucun changement de fichier de style. Une seule création de composant Vue est
  prévue (le bloc `team`), calquée sur un bloc existant; c'est un fichier neuf, signalé plus bas.
- Honnêteté E-E-A-T sur une démo fictive. On démontre l'architecture complète des signaux (où les
  vrais signaux du futur client se brancheront), avec du contenu fictif crédible et spécifique
  (vrais nuisibles du Québec, vraies méthodes, vraies villes de la Rive-Nord, vraies objections).
  On ne fabrique aucune autorité vérifiable. Les signaux de licence, d'assurance et d'avis sont
  posés comme champs optionnels branchables, pas comme faits.
- Bilingue obligatoire (fr racine, en sous `/en`), avec `translation.metadata` par paire.
- Fail-fast: le build doit rester vert. Tout contenu requis est publié avant la vérification.
- Aucune numérotation visible d'éléments, site-wide.

## Voie d'écriture retenue

Conforme à la convention du repo: **le live fait foi**. On modifie le dataset live
(`5if00rwn`/`production`) en fr et en depuis le Studio ou par script ad hoc, puis on tient les
`translation.metadata` par paire. Aucune copie du dataset n'est conservée dans le dépôt. Les
schémas (nouveaux champs, nouveau bloc) se déploient via `sanity:deploy-schema` puis
`sanity deploy` une fois la migration faite. Le token `NUXT_SANITY_TOKEN` (server-only) est requis au `nuxt generate` local
(lecture des `translation.metadata`).

## État global du site (vérité terrain)

| Page | Héros | pageBuilder actuel |
|---|---|---|
| Accueil `/` | heroHome | trustBar, services, serviceCities, about, testimonials, faq, ctaBand, contact |
| Services `/services` | pageHero | services, serviceCities, ctaBand, contact |
| Villes `/villes` | pageHero | serviceCities, ctaBand, contact |
| À propos `/a-propos` | pageHero | about, testimonials, ctaBand, contact |
| Blog `/blog` | pageHero | liste d'articles (config de page), contact |
| FAQ `/faq` | pageHero | sections (3 faqTheme), ctaBand, contact |
| Contact `/contact` | pageHero | contact, ctaBand |
| One-pager `/one-pager` | heroHome | trustBar, services, serviceCities, about, testimonials, faq, ctaBand, contact |
| Service détail x5 | detailHero | editorial, highlights, [editorial], process, testimonials, ctaBand |
| Ville détail x7 | detailHero | editorial, services |
| Légales x2 | pageHero | sections legalSection (hors pageBuilder) |

Signaux globaux réels (`siteSettings`): marque Rempart Extermination, fondée en 2008, téléphone
450 555 0199, courriel bonjour@rempart-extermination.ca, adresse 1450 boulevard Industriel
Terrebonne QC J6Y 1W8, zones Rive-Nord de Montréal et Laval, heures lun-ven 7h-21h et sam-dim
8h-17h. Villes publiées: Laval, Terrebonne, Repentigny, Blainville, Mascouche, Boisbriand,
Saint-Eustache. Absents et à brancher: numéro de permis ou licence, assurance responsabilité,
certification ASTTQ, note d'avis.

## Bibliothèque de blocs (catalogue et leviers d'enrichissement)

Onze blocs page-builder existent. La règle DRY tient: presque tout le mandat E-E-A-T se couvre en
réutilisant ou en enrichissant l'existant. Une seule création de bloc est justifiée (`team`).

| Bloc | Rôle | Porte image | Levier d'enrichissement |
|---|---|---|---|
| trustBar | bande navy de 2 à 4 preuves brèves (objet `proof`) | non (icônes) | porter les certifications/licences; ajouter `proof.href` optionnel pour rendre un signal vérifiable |
| services | catalogue (mosaïque), mode auto ou manual, carte vedette | non (icônes) | mode manual + items pour un aperçu; en-tête distinct du héros |
| serviceCities | bloc signature SEO local (anneaux de zone + mosaïque villes) | non | areaNote cohérent; sélection des 7 villes; intro de zone via editorial |
| about | média-texte zigzag (récit) + carte de 4 stats | une photo | ajouter `stat.source` optionnel; aligner les chiffres; amorcer l'équipe |
| editorial | segments répétables, dispositions auto/aside/overhang/band/duo/nested, h3, liens inline, jusqu'à 2 figures | oui | LE bloc pour varier le rythme et le maillage inline; avant/après via duo/nested |
| highlights | liste deux colonnes, languettes (objet item {title, body}) | non | porter les garanties; ajouter `item.link` optionnel (garantie vérifiable) |
| process | ligne d'horizon, 3 à 4 étapes (objet step {icon, title, body}) | non | différencier les étapes par nuisible |
| testimonials | mosaïque asymétrique, modes featured/service/city | non | preuve sociale localisée (mode city) et par service |
| faq | accordéon split, sélection de faqItem par thème | non | thèmes et items manquants; maillage inline si answer en Portable Text |
| contact | aside NAP navy (valeurs depuis siteSettings) + formulaire | non | champ réassurance optionnel (urgence, garantie) près du formulaire |
| ctaBand | bandeau navy d'appel (tel dérivé) | non | subtitle de disponibilité 7 jours; varier par page |

Héros: `heroHome` (visuel + meta de 2 à 3 preuves), `pageHero` (titre, lead, image optionnelle),
`detailHero` (masthead surtitre/titre/accroche/cta/tone clair-foncé). Convention d'asset confirmée:
alt et légende vivent sur l'asset Sanity (locales bilingues), le ratio est décidé à l'usage par
token (`--ratio-portrait` 4/5, `--ratio-landscape` 4/3, `--ratio-wide` 3/2, `--ratio-video` 16/9),
le cadrage par hotspot.

## Décisions transversales (DRY d'abord)

1. **Chiffres canoniques, à figer site-wide.** Ancrer l'expérience sur la fondation réelle:
   "Depuis 2008" (environ 18 ans). Corriger le faux "15 ans" du trustBar et le "10 villes" du about
   (7 villes publiées). Stats about proposées: "Depuis 2008", "6 200+ foyers servis", "7 villes
   desservies", "9 techniciens certifiés". Aligner l'accueil et le one-pager à l'identique.
2. **Signaux E-E-A-T branchables.** Ajouter à `siteSettings` un groupe `credentials` (tous champs
   optionnels, fictifs crédibles): `licenseLabel` + `licenseNumber` (ex. permis de gestion
   parasitaire), `insurance` (ex. assurance responsabilité), `certifications` (array, ex. membre
   ASTTQ, technicien certifié), `reviewRating` + `reviewCount` optionnels. Ajouter à l'objet `proof`
   un champ `href` optionnel. Aucun nouveau bloc. Source unique consommée par trustBar, le pied de
   page et l'aside contact.
3. **Bande d'urgence: aucun bloc neuf.** La disponibilité passe par un item `proof` du trustBar
   ("7 jours sur 7", "intervention sous 24 à 48 h") et par le subtitle du ctaBand.
4. **Garanties écrites: enrichir highlights.** Ajouter `item.link` optionnel pour rendre la garantie
   vérifiable (vers la page conditions ou une page garantie). Pas de bloc garanties dédié (éviterait
   un troisième jumeau de tuiles à côté de highlights et process).
5. **Équipe et bios: créer le bloc `team`.** Seule création justifiée. Grille de cartes portrait
   (image par carte), nom, rôle, certifications, bio courte. Pour /a-propos. Composant Vue neuf,
   calqué sur le patron de cartes existant (testimonials/about), pour ne pas inventer de forme.
6. **Avant/après: editorial, plus tard.** Se modélise en segment editorial duo ou nested. Optionnel,
   dépendant d'images, peut attendre.
7. **Service coquerelles: tranché (ajouté).** 6e service (coquerelle germanique), document fr+en +
   faqItems + témoignages + image, même séquence cible que les autres services.

## Plan par page

Légende des statuts de bloc: **réutiliser** (tel quel ou contenu réécrit), **enrichir** (contenu ou
champ ajouté), **créer** (bloc neuf), **instancier** (bloc existant ajouté à une page où il manque).

### Accueil `/`

Blocs actuels: heroHome, trustBar, services (mode auto = grille complète), serviceCities, about,
testimonials, faq, ctaBand, contact.

Diagnostic:
- Le bloc services est en mode auto: l'accueil affiche le catalogue complet au lieu d'un aperçu de 3
  ou 4 vedettes avec renvoi vers /services (défaut signalé au mandat).
- Le bloc process est absent: le pilier Expertise (3 temps) manque sur la page d'entrée.
- Aucun bloc de garanties (highlights absent): les signaux Trust (garantie de retour, produits
  homologués Santé Canada, rapport écrit) ne sont portés nulle part.
- Chevauchement de signaux entre meta du héros, trustBar et stats about (incohérence "15 ans" vs
  "18 ans", "10 villes" vs 7 publiées).
- En-tête du bloc services identique mot pour mot à celui de la page /services.
- Maillage sortant pauvre: rien vers les villes ni le blog.

Séquence cible (héros heroHome conservé):

| Ordre | Bloc | Statut | Rôle E-E-A-T / conversion |
|---|---|---|---|
| 1 | trustBar | réutiliser (contenu) | 4 preuves distinctes du héros et de about, chiffres corrigés |
| 2 | services | enrichir (mode manual) | aperçu de 3 ou 4 vedettes + CTA vers /services |
| 3 | process | instancier | méthode en 3 temps (inspection, traitement, suivi et prévention) |
| 4 | serviceCities | réutiliser | zone desservie (SEO local) |
| 5 | about | enrichir (stats) | récit + 4 chiffres + amorce d'équipe |
| 6 | highlights | instancier | garanties et conformité (pilier Trust) |
| 7 | testimonials | réutiliser | preuve sociale localisée (nom + ville) |
| 8 | faq | réutiliser | objections principales (prix, délai, garantie, sécurité) |
| 9 | ctaBand | enrichir (subtitle) | appel téléphonique + disponibilité 7 jours |
| 10 | contact | réutiliser | NAP réel + formulaire |

Contenu à rédiger (résumé): services en mode manual avec fourmis charpentières (vedette), souris et
mulots, guêpes et frelons, punaises de lit, en-tête réécrit pour ne pas redire le héros. Process en
3 temps honnêtes (identification de l'espèce, traitement ciblé avec produits homologués et devis
clair, suivi et prévention par scellement des points d'entrée). Highlights: garantie de retour sans
frais, produits homologués Santé Canada sûrs pour enfants et animaux, rapport d'inspection écrit,
intervention sous 24 à 48 h. ctaBand subtitle: "Une vraie personne au bout du fil, 7 jours sur 7."

Blocs à créer ou enrichir: process et highlights existent au catalogue, à instancier (pas de
création). services passe en manual (champs existants). about et trustBar: corrections de chiffres.

Maillage: aperçu services vers /services; serviceCities vers les pages villes; amorce vers le blog
(saisonnalité) quand le contenu existe; envisager des testimonials qui pointent vers ville et
service.

Brief images: visuel heroHome (technicien d'ici devant une maison de la Rive-Nord), photo about
(équipe devant le local de Terrebonne). Voir IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui, urgence oui, preuves oui, ancrage local oui.

### Services `/services`

Blocs actuels: pageHero, services (mode auto), serviceCities (mode featured), ctaBand, contact.

Diagnostic:
- Aucune bande différenciateur (le pourquoi Rempart): la page dit le quoi (services) et le où
  (villes) mais jamais le pourquoi (méthode, garantie, certifications).
- Le lead du bloc services paraphrase le lead du héros.
- serviceCities en 2e position juste après la grille: deux blocs de tuiles qui s'enchaînent, et la
  zone desservie n'est pas le rôle de cette page (à repousser en clôture).
- Aucune désamorce d'objection avant l'appel, aucune preuve sociale.
- secondaryCta du ctaBand vers contact alors que le bloc contact suit immédiatement (redondant).

Séquence cible (héros pageHero conservé):

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | services | enrichir (en-tête) | l'unique grille de services (le quoi), mode auto (5 services) |
| 2 | process | instancier | différenciateur no 1: la méthode IPM (le pourquoi), forme distincte |
| 3 | highlights | instancier | différenciateur no 2: garantie, conformité, délai, rapport (le Trust) |
| 4 | testimonials | instancier | preuve sociale localisée |
| 5 | serviceCities | réutiliser | clôture SEO local (zone desservie) |
| 6 | ctaBand | réutiliser | appel téléphonique, secondaryCta vers la zone plutôt que contact |
| 7 | contact | réutiliser | formulaire + NAP |

Contenu à rédiger: en-tête services distinct du héros (ex. surtitre "Nos interventions"). Process
en 3 à 4 temps. Highlights de 4 bénéfices Trust. 3 témoignages attribués prénom + ville publiée
(souris à l'automne à Terrebonne, guêpes en juillet à Repentigny, punaises à Blainville).

Blocs à créer ou enrichir: process, highlights, testimonials instanciés (existants). Une seule
grille de services sur la page (exigence du mandat) respectée.

Maillage: cartes services vers les pages détail; testimonials et process vers les pages villes;
secondaryCta vers l'ancre zones desservies.

Brief images: pageHero existant (technicien en intervention). Process sans image (icônes). Voir
IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui, urgence oui, preuves oui (ajoutées), ancrage local oui.

### Service détail `/services/[slug]` (un contenu riche par nuisible)

Blocs actuels (par service): detailHero, editorial (intro nue, sans en-tête ni image), highlights
(Les signes, Le traitement, La garantie), [editorial riche uniquement sur fourmis charpentières],
process (identique mot pour mot sur les 5 services), testimonials (mode service), ctaBand (titre
identique sur les 5).

Diagnostic:
- 4 services sur 5 n'ont qu'un editorial d'intro nu (pas d'en-tête, 0 image, 2 paragraphes). Seul
  fourmis charpentières a un 2e editorial riche.
- Le bloc process est dupliqué verbatim sur les 5 services ("On inspecte, On traite, On garantit"):
  le mandat veut un process spécifique par nuisible.
- Aucun bloc FAQ par nuisible alors que le bloc faq et les documents existent déjà.
- Produits homologués Santé Canada évoqués une seule fois (fourmis); certification du technicien et
  délai jamais ancrés.
- Sur les 4 services squelettiques, quatre blocs sans image se suivent (mur de texte).
- ctaBand au titre identique, sans contextualisation saisonnière.
- Service coquerelles absent.

Séquence cible (par nuisible, héros detailHero conservé):

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | trustBar | instancier | crédibilité immédiate sous le héros, casse le tout-texte |
| 2 | editorial | enrichir | signes d'infestation, risques maison et santé, méthode, ce qui est inclus, produits homologués (2 segments, images alternées) |
| 3 | highlights | enrichir (contenu) | avantages propres à CE nuisible (garantie, conformité, délai, rapport) |
| 4 | faq | instancier | objections spécifiques au nuisible (FAQPage) |
| 5 | process | enrichir (contenu) | déroulement réel du mandat pour CE nuisible |
| 6 | testimonials | réutiliser (mode service) | preuve sociale liée au service |
| 7 | ctaBand | enrichir (contenu) | appel contextualisé par nuisible et saison |

Note rythme: intercaler faq entre highlights et process pour casser deux listes sans image dos à
dos (correction de la revue de rythme).

Contenu à rédiger (par nuisible, fr+en):
- editorial structuré avec en-tête, lead et h3: reconnaître l'infestation (signes précis par
  espèce), risques pour la maison et la santé, méthode de traitement, ce qui est inclus, produits
  homologués Santé Canada.
- process différencié: fourmis (repérage du nid principal et des satellites, traitement appât et
  barrière, suivi et garantie); souris et rats (inspection cave au grenier, scellement des points
  d'entrée, stations de contrôle); punaises (préparation, traitement thermique et résiduel, contrôle
  de suivi); guêpes et frelons (localisation du nid, retrait sécuritaire, prévention); commercial
  (inspection conforme, programme préventif, rapports de suivi).
- faq par nuisible (environ 5 items chacun) via un faqTheme dédié par nuisible: danger pour enfants
  et animaux, délai avant résultat, garantie, préparation, récidive.
- highlights recentré sur des bénéfices non redondants avec l'editorial et le process.

Blocs à créer ou enrichir: aucun nouveau bloc (faq et trustBar instanciés, editorial et process
enrichis en contenu). Documents à créer: faqTheme et faqItem par nuisible; éventuellement le service
coquerelles (à trancher).

Maillage: chaque service vers au moins une ville pertinente (fourmis vers Laval et Terrebonne;
souris vers Mascouche et Blainville; punaises vers Repentigny; guêpes vers Blainville); vers un ou
deux services connexes; vers l'article de blog lié quand il existe; la FAQ par service vers la FAQ
complète.

Brief images: editorial segment 1 (technicien au travail sur le nuisible, remplace les visuels
faibles), segment 2 en band (équipement homologué ou chantier), detailHero (nuisible net sur fond
blanc, déjà publié). Voir IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui, urgence oui (contextualisée), preuves oui, ancrage local oui
(maillage villes).

### Villes `/villes` (hub)

Blocs actuels: pageHero, serviceCities, ctaBand, contact.

Diagnostic:
- Page la plus maigre: un seul bloc de fond (serviceCities) entre le héros et la conversion.
- Zéro signal E-E-A-T entre le héros et le CTA (pas de trust, pas de preuve sociale, pas d'intro de
  zone).
- Trou de maillage majeur: la mosaïque mène vers les villes mais rien ne mène vers les services.
- Trois blocs sur quatre dominés par le bleu nuit et l'aside gauche (rythme monotone).

Séquence cible (héros pageHero conservé):

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | editorial | instancier | intro de zone: ancrage local et connaissance terrain de la Rive-Nord |
| 2 | serviceCities | réutiliser | mosaïque des villes + anneaux de couverture |
| 3 | trustBar | instancier | autorité et Trust en une bande brève |
| 4 | testimonials | instancier | preuve sociale géolocalisée multi-villes |
| 5 | faq | instancier | objections de zone (desservez-vous ma ville, délai) |
| 6 | ctaBand | réutiliser | appel + urgence |
| 7 | contact | réutiliser | NAP + zone + formulaire |

Contenu à rédiger: editorial d'intro de zone (présence depuis 2008 au départ de Terrebonne,
nuisibles saisonniers de la couronne nord, liens inline vers /services et quelques villes). trustBar
de 3 à 4 signaux distincts. testimonials multi-villes. faq orientée zone et urgence.

Blocs à créer ou enrichir: aucun nouveau bloc (editorial, trustBar, testimonials, faq instanciés).

Maillage: editorial du hub noue services, villes et blog; la mosaïque distribue vers chaque ville.

Brief images: editorial segment aside (camion ou technicien devant une résidence de banlieue),
segment overhang (technicien en intervention). Voir IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui, urgence oui, preuves oui (ajoutées), ancrage local oui.

### Ville détail `/villes/[slug]` (contenu local par ville)

Blocs actuels (par ville): detailHero, editorial (1 segment, 3 paragraphes, sans image ni lien),
services (mode auto = catalogue identique partout).

Diagnostic:
- Deux blocs de corps seulement sur les 7 villes.
- Zéro preuve sociale localisée (mode city non utilisé, alors que c'est le levier prévu).
- Aucun ctaBand de clôture: la page finit sur la grille, sans appel téléphonique.
- services en mode auto identique sur les 7 villes (seul le heading change).
- 3e paragraphe d'editorial quasi identique d'une ville à l'autre (promesse générique).
- Aucun lien interne (services nommés en texte plat, jamais liés).

Séquence cible (par ville, héros detailHero conservé):

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | editorial | enrichir | savoir local structuré (bâti, saisonnalité, nuisibles du secteur) + maillage inline |
| 2 | highlights | instancier | promesses de service (garantie, délai, produits homologués) |
| 3 | services | enrichir (mode manual) | services offerts là, vedette pertinente par ville |
| 4 | testimonials | instancier (mode city) | preuve sociale ancrée à CETTE ville |
| 5 | ctaBand | instancier | fermeture téléphonique contextualisée par ville |

Contenu à rédiger: editorial à 2 segments (garder le contenu local fort, ajouter h3 et liens inline
vers les pages services nommées), highlights de 4 promesses communes, services en manual avec une
vedette par ville (Mascouche et Saint-Eustache vedette rongeurs; Terrebonne, Boisbriand, Repentigny,
Blainville vedette fourmis charpentières; Laval vedette coquerelles ou immeubles), testimonials mode
city, ctaBand au titre contextualisé.

Blocs à créer ou enrichir: aucun nouveau bloc (highlights, testimonials, ctaBand instanciés;
editorial et services enrichis). Prérequis: que les documents testimonial portent un `city`
renseigné pour activer le mode city (à vérifier au lot).

Maillage: editorial de chaque ville vers les services pertinents; vers une ville voisine; les cartes
services vers les détails; retour des hubs vers chaque ville.

Brief images: editorial segment aside (inspection extérieure), segment overhang (application ciblée
à un point d'entrée). Question ouverte: images partagées entre villes ou différenciées. Voir
IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui (ajouté), urgence oui, preuves oui (localisées), ancrage local
fort.

### À propos `/a-propos`

Blocs actuels: pageHero, about, testimonials, ctaBand, contact.

Diagnostic (le plus gros trou E-E-A-T du site):
- Aucun bloc équipe ou bios. Le héros dit "Une équipe d'ici" et une stat annonce "9 techniciens
  certifiés", mais aucun technicien n'est nommé, photographié, ni ses certifications montrées.
- Aucun bloc certifications, licences, assurances de l'entreprise.
- Aucun bloc garanties explicites.
- Les 4 stats sont des chiffres nus sans ancrage ni source.
- ctaBand placé avant le contact, qui finit lui-même par un formulaire: on demande l'appel avant
  d'avoir prouvé l'autorité.
- Zéro lien interne sortant.

Séquence cible (héros pageHero conservé):

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | about | enrichir | récit fondateur daté et local + 4 chiffres ancrables |
| 2 | team | créer | techniciens nommés (rôle, certifications, photo): autorité individuelle |
| 3 | trustBar | instancier | certifications, licences, assurance de l'entreprise |
| 4 | highlights | instancier | garanties explicites (ce que vous obtenez) |
| 5 | testimonials | réutiliser | preuve sociale |
| 6 | ctaBand | réutiliser | appel, après le mur de preuve d'autorité |
| 7 | contact | réutiliser | NAP + formulaire |

Note rythme: le about porte le récit + stats; confier les visages au bloc team (retirer ou réduire
la grande photo d'équipe du about pour ne pas doubler les "visages" dos à dos).

Contenu à rédiger: about avec récit ancré (fondée à Terrebonne en 2008, méthodes IPM) et stats
canoniques. team: 3 à 4 techniciens fictifs crédibles (fondateur technicien en chef membre ASTTQ,
technicienne punaises et détection canine, technicien rongeurs et exclusion, technicien commercial
HACCP), chacun avec rôle, certification et bio courte. trustBar: membre ASTTQ, produits homologués
Santé Canada, assurance responsabilité, garantie de résultat écrite. highlights: garantie de retour
sans frais, rapport d'inspection écrit, produits homologués sûrs, estimation gratuite.

Blocs à créer ou enrichir: **créer le bloc team** (composant Vue neuf calqué sur le patron de
cartes existant). Instancier trustBar et highlights. Enrichir about (chiffres) et l'objet stat
(champ source optionnel). Enrichir proof (champ href optionnel).

Maillage: lier les villes citées dans le récit vers leurs pages; les spécialités de l'équipe vers
les services correspondants; les signaux trustBar vers leur source (page certification future ou
organisme).

Brief images: about (équipe en uniforme devant le camion), team (un portrait par membre, ratio
portrait, cadrage visage par hotspot). Voir IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui, urgence oui, preuves fortes (équipe, certifications,
garanties), ancrage local oui.

### FAQ `/faq`

Blocs actuels: pageHero, sections (3 faqTheme: tarification et garantie, intervention et sécurité,
traitement et préparation), ctaBand, contact. 6 faqItem au total.

Diagnostic:
- 3 thèmes / 6 items contre les 6 thèmes visés (sécurité enfants et animaux, produits, délais et
  urgence, prix et estimation, garantie, prévention). Thème prévention entièrement absent.
- Aucune question sur la conformité ou l'expertise vérifiable (certifié, assuré, depuis quand).
- Schema FAQPage (JSON-LD) à confirmer côté faqItem (cible explicite de la page).
- Zéro lien interne dans les réponses.
- Trois faqSection de forme identique s'enchaînent: la redondance de structure la plus forte du
  site.

Séquence cible (héros pageHero conservé): regrouper en 6 thèmes et intercaler la preuve sociale.

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | faqSection (sécurité enfants et animaux) | enrichir | objection no 1 en résidentiel |
| 2 | faqSection (produits utilisés) | enrichir | expertise et conformité |
| 3 | faqSection (délais et urgence) | enrichir | rapidité, disponibilité 7 jours |
| 4 | testimonials | instancier | casse le mur d'accordéons, preuve sociale |
| 5 | faqSection (prix et estimation) | enrichir | Trust transactionnel |
| 6 | faqSection (garantie) | enrichir | engagement de résultat |
| 7 | faqSection (prévention) | enrichir | thème neuf, valeur ajoutée |
| 8 | ctaBand | réutiliser | appel, distinct du bloc contact |
| 9 | contact | réutiliser | NAP + formulaire |

Contenu à rédiger: porter à 6 thèmes et environ 18 à 24 items, fr+en, réponses spécifiques (à
trancher: answer en string plate pour le JSON-LD direct, ou Portable Text restreint pour permettre
le maillage inline). Ajouter le thème prévention (souris à l'automne, fourmis charpentières,
punaises au retour de voyage).

Blocs à créer ou enrichir: aucun nouveau bloc (testimonials instancié). Documents: 3 nouveaux
faqTheme et environ 12 à 18 nouveaux faqItem. Vérifier ou activer le JSON-LD FAQPage.

Maillage: réponses sécurité et produits vers les pages services; question géographique vers les
pages villes; prévention vers le blog.

Brief images: pageHero existant (technicien rassurant). Voir IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui, urgence oui, preuves oui (témoignages intercalés), ancrage
local oui (questions de zone).

### Contact `/contact`

Blocs actuels: pageHero, contact, ctaBand.

Diagnostic:
- Deux blocs de corps seulement. Le bloc contact porte les libellés NAP (valeurs depuis
  siteSettings) et le formulaire, mais la page ne montre aucun signal de confiance ni les zones
  desservies (exigence du mandat).
- Le lead du bloc contact est identique mot pour mot au lead du pageHero.
- L'urgence ne vit que dans le ctaBand en bas, loin du formulaire.
- Cul-de-sac de maillage (seul lien: la politique de confidentialité).

Séquence cible (héros pageHero conservé):

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | contact | enrichir | conversion + NAP, lead réécrit (angle disponibilité) |
| 2 | trustBar | instancier | bande de confiance qui sépare les deux panneaux navy |
| 3 | serviceCities | instancier | zones desservies (exigence du mandat) |
| 4 | faq | instancier | désamorce des objections avant l'engagement final |
| 5 | ctaBand | réutiliser | urgence en clôture |

Note rythme (correction dure): trustBar entre contact et serviceCities pour casser deux panneaux
navy aside 1-6 jumeaux.

Contenu à rédiger: lead du bloc contact distinct du héros (vraie personne 7 jours sur 7), option
champ réassurance près du formulaire (garantie, estimation gratuite, délai). serviceCities en zones
desservies (7 villes nommées). faq de 4 à 6 items réutilisés.

Blocs à créer ou enrichir: enrichir le bloc contact (champ réassurance optionnel) et siteSettings
(credentials). Instancier trustBar, serviceCities, faq.

Maillage: contact vers les villes et la FAQ; faq inline vers les villes.

Brief images: pageHero existant (camion de service devant une résidence). Voir IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui, urgence oui (rapprochée), preuves oui, ancrage local oui
(zones).

### Blog `/blog`

Blocs actuels: pageHero, liste d'articles (config de page: listCta, categoryCta, articleCta,
related), contact. 3 articles, 2 catégories.

Diagnostic:
- Aucune intro editorial: le pageHero porte tout le poids, puis on tombe sur la liste.
- 3 articles de profondeur inégale; l'article punaises est squelettique et ne couvre pas l'angle du
  mandat (quoi faire avant la visite du technicien).
- Maillage interne quasi inexistant (l'article fourmis lie vers le hub /services générique, pas la
  page du service).
- Auteur générique "L'équipe Rempart" (aucun signal d'Experience d'auteur).
- Pas de ctaBand (appel) sur la liste.
- Après la liste (mosaïque de cartes), on enchaîne sur le bloc contact sans transition.

Séquence cible (héros pageHero conservé):

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | editorial | instancier | intro de liste: situe l'autorité de l'équipe et la promesse du blog |
| 2 | liste d'articles | réutiliser | coeur de la page, preuve d'Expertise par la profondeur |
| 3 | testimonials | instancier | preuve sociale avant le formulaire |
| 4 | ctaBand | instancier | appel téléphonique, comble l'absence de conversion no 1 |
| 5 | contact | réutiliser | NAP + formulaire |

Contenu à rédiger: editorial d'intro court (depuis 2008, conseils de terrain). Porter de 3 à 5 ou 6
articles: étoffer l'article punaises (quoi faire avant la visite), ajouter un article saisonnier
(souris à l'automne) et un guide guêpes ou coquerelles. Repointer les liens des articles vers les
pages services précises et les villes.

Blocs à créer ou enrichir: instancier editorial, testimonials, ctaBand. Documents: 2 à 3 nouveaux
articles fr+en. À trancher: objet author réutilisable (nom + rôle) pour ancrer l'Experience.

Maillage: chaque article vers sa page service et 1 à 2 villes; intro vers le hub services et 2
villes vedettes; retour des pages services et villes vers les articles pertinents.

Brief images: covers d'articles (déjà en place, à compléter pour les nouveaux). Voir
IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui (ajouté), urgence oui, preuves oui (témoignages), ancrage
local oui (maillage).

### One-pager `/one-pager`

Blocs actuels: heroHome, trustBar, services, serviceCities, about, testimonials, faq, ctaBand,
contact (miroir partiel de l'accueil).

Diagnostic:
- N'est pas un miroir de la cible d'accueil: il manque process et l'amorce équipe, et highlights.
- Répétition mot à mot de signaux entre blocs voisins (garantie écrite, sûr pour la famille).
- Sept blocs s'enchaînent sans variation de densité média-texte.
- Un seul rappel d'appel avant le bas de page (long scroll).
- Incohérences chiffrées avec l'accueil (10 villes vs 7, 15 ans vs 18).

Séquence cible (héros heroHome conservé), alignée sur l'accueil et adaptée au scroll continu:

| Ordre | Bloc | Statut | Rôle |
|---|---|---|---|
| 1 | trustBar | enrichir (contenu) | Trust immédiat, chiffres corrigés |
| 2 | services | réutiliser | aperçu du catalogue |
| 3 | process | instancier | pilier Expertise (3 à 4 temps) |
| 4 | serviceCities | réutiliser | zone de service |
| 5 | editorial | instancier | respiration média-texte, cas concret + maillage |
| 6 | about | enrichir (stats) | autorité de marque, chiffres en parité avec l'accueil |
| 7 | highlights | instancier | pilier Trust (garanties) |
| 8 | testimonials | réutiliser | preuve sociale |
| 9 | faq | réutiliser | objections |
| 10 | ctaBand | réutiliser | appel |
| 11 | contact | réutiliser | NAP + formulaire |

Note rythme: maintenir editorial image à gauche puis about photo à droite, contenus distincts.

Contenu à rédiger: parité chiffrée stricte avec l'accueil (mêmes stats, même expérience). editorial
d'un cas saisonnier (fourmis au printemps à Laval, ou souris à l'automne). Le reste hérite des
contenus de l'accueil.

Blocs à créer ou enrichir: instancier process, highlights, editorial; enrichir trustBar et about
(chiffres). Décision: vrai miroir 1:1 de l'accueil, ou version condensée (moins de cartes, 3
témoignages).

Maillage: garder les liens sortants légers (le one-pager est une vitrine condensée; le maillage
profond vit en mode multipage).

Brief images: heroHome, editorial (cas concret), about. Voir IMAGES-BRIEF.md.

Checklist E-E-A-T: CTA téléphone oui, urgence oui, preuves oui, ancrage local oui.

### Pages légales `/conditions-utilisation`, `/politique-confidentialite`

Blocs actuels: pageHero, sections legalSection (rendu propre au document, hors pageBuilder).

Diagnostic (audit léger, hors périmètre marketing):
- Contenu complet et cohérent (7 sections conditions, 8 sections confidentialité). Placeholders
  honnêtes assumés (legalTodo: raison sociale, NEQ, responsable Loi 25) à conserver tels quels.
- NAP figé en texte dans la section "Pour nous joindre" (à dédupliquer vers une source unique).
- Parité bilingue à vérifier (la tranche ne contenait que le fr).

Séquence cible: inchangée. Ne pas introduire de bloc page-builder (la sobriété est ici une qualité).
Trois ajustements de fond légers: dédupliquer le NAP (lien vers Contact ou jonction depuis
siteSettings), vérifier la parité en, envisager un encadré "Dernière mise à jour" géré au rendu.

Blocs à créer ou enrichir: aucun bloc. Ajustements de contenu et de transform du document legalPage.

Maillage: footer.pageLinks vers les deux pages; form.privacy.link vers la confidentialité; renvoi
croisé discret conditions et confidentialité. Ne pas mailler vers services, villes ou blog.

Checklist E-E-A-T: hors périmètre conversion (volontairement).

## Revue de rythme (anti-répétition)

Architecture globalement solide: la plupart des pages alternent les familles structurelles
(mosaïque, ligne d'horizon, panneau aside, bandeau pleine largeur, média-texte, accordéon).
Corrections dures intégrées aux séquences cibles:

- Contact: insérer trustBar entre contact et serviceCities (deux panneaux navy aside 1-6 sinon
  jumeaux).
- FAQ: 6 accordéons de forme identique. Intercaler testimonials au milieu (fait) et, si besoin,
  regrouper certains thèmes pour réduire le nombre d'accordéons consécutifs.
- À propos: about (photo d'équipe) puis team (grille de portraits) sont deux blocs de "visages".
  Retirer ou réduire la grande photo du about, confier les visages au team.
- Service détail: highlights puis process sont deux listes sans image dos à dos. Intercaler faq
  entre les deux.
- Accueil: réserver les chiffres au about (stats) et les engagements verbaux au highlights.
- Blog: liste de cartes puis contact. Intercaler testimonials puis ctaBand.

Règle conservée: editorial peut revenir sur une même page si la disposition varie (image gauche,
puis droite, puis band) et le contenu diffère. highlights (avantages d'un service) reste distinct de
services (catalogue). Les preuves du héros ne répètent pas les stats de about.

## Décisions structurantes (tranchées le 26 juin 2026)

Charles a tranché les quatre forks de périmètre (1, 3, 6, 10). Le reste est confirmé sur les
recommandations.

1. **Signaux E-E-A-T branchables dans siteSettings: tranché (oui).** Créer le groupe `credentials`
   (champs optionnels fictifs crédibles) + `proof.href`. Source unique pour trustBar, pied de page
   et aside contact.
2. **Chiffres canoniques: confirmé.** Ancrer sur "Depuis 2008", corriger "15 ans" et "10 villes",
   aligner accueil et one-pager.
3. **Service coquerelles: tranché (oui).** 6e service, document fr+en + faqItems + témoignages +
   image.
4. **Bloc team: confirmé (créer).** Seule création de bloc, composant calqué sur un patron de cartes
   existant.
5. **Garanties: confirmé.** Via highlights enrichi (item.link), pas de bloc dédié.
6. **FAQ: tranché.** 6 thèmes, et `faqItem.answer` en **Portable Text restreint** (maillage interne
   inline vers services et villes, tout en alimentant le JSON-LD FAQPage).
7. **services par ville en mode manual: confirmé.** Tue la duplication, une vedette par ville.
8. **Images editorial des villes: confirmé.** Petit jeu partagé technicien et camion, comme le héros
   partagé.
9. **Auteur d'article: confirmé.** Objet author léger réutilisable (nom + rôle) pour ancrer
   l'Experience.
10. **One-pager: tranché (condensé).** Mêmes piliers E-E-A-T que l'accueil, allégé pour le scroll
    continu (moins de cartes, 3 témoignages).

## Ordre d'exécution proposé (Temps 2, une page à la fois)

Un check-in après chaque page. Ordre proposé, du socle vers les feuilles:

1. Socle transversal: siteSettings (credentials, chiffres canoniques), proof.href, highlights.link,
   création du bloc team (schéma + Vue + pipeline). Déploiement du schéma.
2. À propos (la plus grosse valeur E-E-A-T, exerce le bloc team et trustBar enrichi).
3. Accueil (process, highlights, services en aperçu, chiffres).
4. Services index (différenciateur process, highlights, testimonials).
5. Service détail (editorial enrichi, process par nuisible, faq par nuisible, trustBar), plus le
   service coquerelles si retenu.
6. Villes hub (intro de zone, trust, témoignages, faq).
7. Ville détail (editorial structuré, highlights, services manual, testimonials mode city, ctaBand).
8. FAQ (6 thèmes, items, témoignages intercalés, JSON-LD).
9. Contact (zones, trust, faq, lead distinct).
10. Blog (intro, articles étoffés, testimonials, ctaBand, maillage).
11. One-pager (alignement sur l'accueil).
12. Légales (déduplication NAP, parité en).

À chaque page: contenu écrit en fr et en sur le live, translation.metadata tenu, build vert,
brief d'images consigné, revue de rythme de la page, petit commit
conventionnel (feat(content):, feat(block):, feat(seo):, fix(content):).

## Hors périmètre

Le formulaire de contact réel (Turnstile + Resend), le déploiement Cloudflare, le retravail
esthétique des blocs (forme), la pagination du blog. La galerie avant/après est repoussée (dépend
d'images, se modélise en editorial le moment venu).
