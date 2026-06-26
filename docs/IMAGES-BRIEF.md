# IMAGES-BRIEF, direction d'images du fond

Démo Rempart Extermination (famille Ancrée). Les images ne sont pas générées ici: c'est une étape de
production séparée. Ce brief sert d'intrant. Convention du repo: le texte alternatif et la légende
vivent sur l'ASSET Sanity (locales bilingues fr+en), le ratio est décidé à l'usage par token
(`--ratio-portrait` 4/5, `--ratio-landscape` 4/3, `--ratio-wide` 3/2, `--ratio-video` 16/9), le
cadrage par hotspot. Style: lumière naturelle de jour, cadre résidentiel québécois crédible
(revêtements, perrons, terrains boisés de la couronne nord), vrais professionnels identifiés, aucune
dramatisation, aucune banque d'images générique.

## Images actuelles faibles à remplacer

- Visuels d'équipe peu parlants: la photo d'équipe (about) et le héros d'équipe doivent montrer des
  visages réels et identifiables devant un camion ou un local de Terrebonne, pas un plan vague.
- Nuisibles trop génériques sur les pages service: les editorial des 4 services squelettiques n'ont
  aucune image; ajouter des photos d'intervention réelle (technicien au travail) plutôt que des
  images de nuisibles décoratives. Les detailHero de nuisibles sur fond blanc (identification)
  restent valables.

## Accueil `/`

- heroHome.visual: technicien de Rempart en uniforme, équipement homologué à la main, devant une
  maison résidentielle typique de la Rive-Nord. Intention: Experience et confiance immédiate, un
  vrai professionnel d'ici, ancre l'urgence (il peut partir vers vous).
  - alt fr: Technicien certifié de Rempart Extermination devant une maison résidentielle de la
    Rive-Nord
  - alt en: Certified Rempart Extermination technician outside a North Shore home
  - ratio: cadrage en code (object-fit cover, 16:9 desktop, portrait mobile), pas de ratio CMS.
- about.photo: l'équipe (techniciens et fondateur) devant le camion ou le local de Terrebonne,
  posture posée. Intention: autorité, visages réels, équipe locale. Légende de l'asset = nom et rôle
  du fondateur (Experience d'auteur).
  - alt fr: L'équipe de Rempart Extermination devant son local de Terrebonne
  - alt en: The Rempart Extermination team in front of their Terrebonne shop
  - ratio: décidé à l'usage (CSS, sizes md:50vw), cadrage par hotspot.

## Services `/services`

- pageHero.image (existant): technicien certifié en intervention sur une résidence de la Rive-Nord.
  Intention: Experience et Trust, un humain au travail.
  - alt fr: Technicien de Rempart Extermination en intervention sur une résidence de la Rive-Nord
  - alt en: Rempart Extermination technician at work on a North Shore home
  - ratio: à l'usage (carte image du split, ombre chaude).
- process: pas d'image (icônes). Brief fourni seulement si on insère un editorial d'appui.

## Service détail `/services/[slug]` (par nuisible)

- editorial segment 1 (remplace un visuel faible): technicien certifié au travail sur le nuisible du
  service (inspection d'une solive pour fourmis, scellement d'un point d'entrée pour souris, retrait
  d'un nid pour guêpes, préparation pour punaises). Intention: Experience et Expertise, vraie
  intervention par un professionnel identifiable.
  - alt fr: Technicien certifié de Rempart Extermination inspecte [zone] pour traiter [nuisible] dans
    une maison de la Rive-Nord
  - alt en: Certified Rempart Extermination technician inspecting [area] to treat [pest] in a North
    Shore home
  - ratio: var(--ratio-wide) en aside, var(--ratio-landscape) en overhang.
- editorial segment 2 (band, remplace un visuel faible): plan rapproché du chantier ou de
  l'équipement homologué (produit ciblé étiqueté, station de contrôle sécurisée, nid retiré).
  Intention: Expertise et Trust, preuve concrète de méthode et de produits homologués Santé Canada.
  - alt fr: Équipement homologué utilisé par Rempart pour le traitement de [nuisible], appliqué par
    un technicien certifié
  - alt en: Health Canada approved equipment used by Rempart to treat [pest], applied by a certified
    technician
  - ratio: var(--ratio-video) en band.
- detailHero image (déjà en place): le nuisible photographié net sur fond blanc (identification).
  - alt fr: [Nuisible] photographié sur fond blanc, identifié par Rempart Extermination
  - alt en: [Pest] photographed on a white background, identified by Rempart Extermination
  - ratio: à l'usage (masthead split).

## Villes `/villes` (hub)

- editorial segment 1 (aside, image gauche): camion ou technicien identifié devant une résidence de
  banlieue de la couronne nord (maison de bois, terrain boisé), ciel d'avant-midi. Intention:
  Experience et ancrage local, présence physique réelle.
  - alt fr: Technicien de Rempart Extermination devant une résidence de la Rive-Nord de Montréal
  - alt en: Rempart Extermination technician outside a North Shore Montreal home
  - ratio: var(--ratio-wide).
- editorial segment 2 (overhang, image droite): technicien en intervention (inspection d'un soffite
  ou d'une fondation, équipement en main), gros plan terrain. Intention: Expertise et intervention
  rapide.
  - alt fr: Technicien de Rempart en intervention d'extermination sur la Rive-Nord
  - alt en: Rempart technician performing a pest control intervention on the North Shore
  - ratio: var(--ratio-landscape).

## Ville détail `/villes/[slug]`

Question ouverte: jeu d'images partagé entre les 7 villes (recommandé, économique et cohérent, comme
le héros partagé) ou différencié par ville.

- editorial segment 1 (aside, gauche): technicien certifié en inspection à l'extérieur d'une maison
  de la Rive-Nord (pourtour de fondation, lampe de poche), geste précis. Intention: Experience,
  savoir-faire local.
  - alt fr: Technicien de Rempart Extermination inspecte le pourtour d'une fondation résidentielle
    sur la Rive-Nord
  - alt en: Rempart Extermination technician inspects the foundation perimeter of a North Shore home
  - ratio: var(--ratio-wide).
- editorial segment 2 (overhang, droite): application ciblée d'un traitement (appât ou produit) à un
  point d'entrée, gros plan mains gantées, sans dramatisation. Intention: Expertise, produits
  homologués appliqués à la source.
  - alt fr: Application ciblée d'un produit homologué à un point d'entrée par un technicien de
    Rempart
  - alt en: Targeted application of an approved product at an entry point by a Rempart technician
  - ratio: var(--ratio-landscape).

## À propos `/a-propos`

- about.photo: équipe en uniforme devant un camion identifié, extérieur résidentiel Rive-Nord.
  Intention: Experience et ancrage local, vraie équipe d'ici.
  - alt fr: L'équipe de Rempart Extermination en uniforme devant son camion sur la Rive-Nord
  - alt en: The Rempart Extermination team in uniform in front of their truck on the North Shore
  - ratio: var(--ratio-landscape) à l'usage, cadrage par hotspot.
- team.members[].photo: portrait individuel de chaque technicien nommé, uniforme Rempart, fond neutre
  clair, expression confiante (un portrait par membre). Intention: Expertise et confiance
  individuelle, un visage et un nom sur chaque certification.
  - alt fr: Portrait de [nom], [rôle] chez Rempart Extermination
  - alt en: Portrait of [name], [role] at Rempart Extermination
  - ratio: var(--ratio-portrait), cadrage visage par hotspot.

## FAQ `/faq`

- pageHero (existant): technicien certifié, sourire confiant, devant un duplex résidentiel de la
  Rive-Nord. Intention: Experience et Trust, la vraie personne promise.
  - alt fr: Technicien de Rempart Extermination devant une résidence de la Rive-Nord de Montréal
  - alt en: Rempart Extermination technician in front of a home on Montreal's North Shore
  - ratio: à l'usage (pageHero, environ 2:1).

## Contact `/contact`

- pageHero (existant): camion de service Rempart identifié, stationné devant une résidence de
  banlieue, technicien sortant de la cabine. Intention: Experience et proximité, une vraie équipe se
  déplace chez vous.
  - alt fr: Camion de service Rempart Extermination devant une maison de la Rive-Nord, technicien au
    départ d'une intervention
  - alt en: Rempart Extermination service van outside a North Shore home, technician heading out on a
    call
  - ratio: var(--ratio-wide) à l'usage, cadrage par hotspot.

## Blog `/blog`

- covers d'articles (existants à conserver, neufs à produire): photo éditoriale liée à l'angle de
  l'article (fourmis charpentières dans une poutre, valise au retour de voyage pour punaises, points
  d'entrée de souris à l'automne). Intention: Expertise, illustration crédible du conseil.
  - alt fr: gabarit "[Sujet de l'article], conseil de Rempart Extermination"
  - alt en: template "[Article subject], advice from Rempart Extermination"
  - ratio: à l'usage (carte de liste et héros d'article).

## One-pager `/one-pager`

- hero (heroHome.visual): technicien en uniforme, équipement à la main, devant une maison de la
  Rive-Nord. Mêmes alt que l'accueil (mutualiser l'asset). ratio: cadrage en code.
- editorial.segments[].media (cas concret): chantier réel (fourmis charpentières près d'un patio, ou
  scellement de points d'entrée de souris à l'automne). Intention: Experience concrète et Expertise,
  méthode IPM en action.
  - alt fr: Technicien de Rempart traitant un nid de fourmis charpentières près d'un patio sur la
    Rive-Nord
  - alt en: Rempart technician treating a carpenter ant nest near a patio on the North Shore
  - ratio: var(--ratio-wide) en aside, var(--ratio-landscape) en overhang.
- about.photo: équipe devant le camion ou le local de Terrebonne (mutualiser avec /a-propos).
