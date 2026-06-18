// Seed FR des collections: catégories (3), thèmes FAQ (8), témoignages (6),
// FAQ (9), services (5), interventions (5).
//
// Transposition fidèle de la structure du seed de la famille Minimaliste
// (studio/seed/data/collections-fr.mjs et banques-legal-fr.mjs): mêmes _type,
// mêmes _key, même mécanique de références. Ids déterministes (spec §11):
// <type>-<cleFR>-fr; les internalRef et _ref pointent vers <base>-fr.
//
// Politique d'images de la démo Rempart: les figures (_type: 'figure') portent
// alt, label, caption et ratio mais AUCUN champ image ni marqueur de chemin.
// Image rend ses placeholders, le build est vert sans aucun fichier. Les alt
// restent descriptifs et honnêtes.
//
// Chaque service et chaque intervention porte son objet detail (la copie de sa
// page /services/<slug> ou /interventions/<slug>): gabarit V1 identique d'un
// document à l'autre, la personnalisation viendra du Studio.

// ── Fabriques locales (gabarits de page de détail partagés) ──────────────────

/** Lien interne vers un document (id déterministe -fr). */
const internal = (label, ref) => ({
  _type: 'link',
  label,
  type: 'internal',
  internalRef: { _type: 'reference', _ref: ref }
})

/** Page de détail d'un service (gabarit V1, ex-servicesPage.serviceDetail). */
const serviceDetail = () => ({
  benefits: {
    heading: 'Ce que vous obtenez',
    cta: internal('Demander une soumission', 'contactPage-fr')
  },
  included: { heading: 'Inclus dans chaque intervention' },
  process: {
    _type: 'process',
    eyebrow: 'Le déroulement',
    heading: 'Comment se déroule une intervention',
    lead: 'Du premier appel à la garantie, on suit la même méthode éprouvée.',
    cta: internal('Nous appeler', 'contactPage-fr'),
    steps: [
      {
        _type: 'processStep',
        _key: 'step-1',
        title: "L'inspection",
        body: "On vient chez vous, on repère le nuisible, ses points d'entrée et l'ampleur réelle du problème. Vous savez exactement à quoi vous avez affaire avant qu'on intervienne."
      },
      {
        _type: 'processStep',
        _key: 'step-2',
        title: 'Le traitement',
        body: 'On applique le traitement adapté au nuisible et à votre milieu, avec des produits homologués et un technicien certifié. Une intervention ciblée, pas un nuage de produit partout.'
      },
      {
        _type: 'processStep',
        _key: 'step-3',
        title: 'La prévention',
        body: "On scelle les entrées, on retire les attraits et on vous laisse des conseils concrets pour que le problème ne revienne pas. La meilleure intervention, c'est celle qu'on n'a pas à refaire."
      },
      {
        _type: 'processStep',
        _key: 'step-4',
        title: 'La garantie',
        body: "On revient au besoin pendant la période couverte, sans frais. Si le nuisible revient, on revient. C'est ça, la garantie de résultat."
      }
    ]
  },
  projects: {
    heading: 'Interventions de ce type',
    lead: 'Des cas réels réglés près de chez vous, avant et après.',
    cta: internal('Toutes les interventions', 'projectsPage-fr')
  },
  testimonials: {
    eyebrow: 'Témoignages',
    heading: "Ce qu'en disent nos clients"
  },
  cta: {
    _type: 'ctaBand',
    title: 'Un problème à régler?',
    subtitle: "Appelez-nous, on vous donne un coup de main aujourd'hui.",
    primaryCta: internal('Soumission gratuite', 'contactPage-fr')
  }
})

/** Page de détail d'une intervention (gabarit V1, ex-projectsPage.projectDetail). */
const projectDetail = () => ({
  gallery: { heading: 'En images' },
  caseStudy: {
    eyebrow: "L'étude de cas",
    heading: "La situation, l'intervention, le résultat",
    challengeLabel: 'La situation',
    solutionLabel: "L'intervention",
    resultLabel: 'Le résultat'
  },
  testimonial: {
    eyebrow: 'Témoignages',
    heading: 'Le mot du client'
  },
  similar: {
    heading: 'Interventions similaires',
    cta: internal('Toutes les interventions', 'projectsPage-fr')
  },
  cta: {
    _type: 'ctaBand',
    title: 'Le même problème chez vous?',
    subtitle: "Chaque cas est différent. Parlons du vôtre dès aujourd'hui.",
    primaryCta: internal('Soumission gratuite', 'contactPage-fr')
  }
})

export const docs = [
  // ── Catégories de blogue ──────────────────────────────────────────────────
  {
    _id: 'category-prevention-fr',
    _type: 'category',
    language: 'fr',
    title: 'Prévention',
    slug: { _type: 'slug', current: 'prevention' },
    description: "Garder les nuisibles dehors avant qu'ils entrent. Gestes simples, bons réflexes et petits travaux qui font la différence saison après saison.",
    order: 1
  },
  {
    _id: 'category-nuisibles-fr',
    _type: 'category',
    language: 'fr',
    title: 'Reconnaître les nuisibles',
    slug: { _type: 'slug', current: 'reconnaitre-les-nuisibles' },
    description: "Savoir à quoi vous avez affaire, vite. Indices, traces et signes qui distinguent une souris d'un rat, une guêpe d'une abeille, une punaise d'une simple piqûre.",
    order: 2
  },
  {
    _id: 'category-maison-saine-fr',
    _type: 'category',
    language: 'fr',
    title: 'Maison saine',
    slug: { _type: 'slug', current: 'maison-saine' },
    description: "Une maison où on respire mieux et où les nuisibles ne trouvent rien à se mettre sous la dent. Cuisine, grenier, sous-sol: ce qui les attire et comment leur couper l'envie.",
    order: 3
  },

  // ── Thèmes FAQ (banque, 8 documents) ───────────────────────────────────────
  {
    _id: 'faqTheme-urgence-fr',
    _type: 'faqTheme',
    language: 'fr',
    title: 'Délais et urgence',
    slug: { _type: 'slug', current: 'delais-et-urgence' }
  },
  {
    _id: 'faqTheme-zone-fr',
    _type: 'faqTheme',
    language: 'fr',
    title: 'Zone desservie',
    slug: { _type: 'slug', current: 'zone-desservie' }
  },
  {
    _id: 'faqTheme-soumission-fr',
    _type: 'faqTheme',
    language: 'fr',
    title: 'Estimation et soumission',
    slug: { _type: 'slug', current: 'estimation-et-soumission' }
  },
  {
    _id: 'faqTheme-securite-fr',
    _type: 'faqTheme',
    language: 'fr',
    title: 'Produits, famille et animaux',
    slug: { _type: 'slug', current: 'produits-famille-et-animaux' }
  },
  {
    _id: 'faqTheme-garantie-fr',
    _type: 'faqTheme',
    language: 'fr',
    title: 'Garantie',
    slug: { _type: 'slug', current: 'garantie' }
  },
  {
    _id: 'faqTheme-prix-fr',
    _type: 'faqTheme',
    language: 'fr',
    title: 'Prix et paiement',
    slug: { _type: 'slug', current: 'prix-et-paiement' }
  },
  {
    _id: 'faqTheme-suivi-fr',
    _type: 'faqTheme',
    language: 'fr',
    title: 'Suivi et prévention',
    slug: { _type: 'slug', current: 'suivi-et-prevention' }
  },
  {
    _id: 'faqTheme-processus-fr',
    _type: 'faqTheme',
    language: 'fr',
    title: "Déroulement d'une intervention",
    slug: { _type: 'slug', current: 'deroulement-d-une-intervention' }
  },

  // ── Témoignages (banque, 6 documents) ─────────────────────────────────────
  {
    _id: 'testimonial-julie-fr',
    _type: 'testimonial',
    language: 'fr',
    quote: "On entendait des grattements dans les murs depuis des semaines. Rempart est venu le lendemain de mon appel, a trouvé l'entrée et bouché le tout. Plus un bruit depuis.",
    name: 'Julie L.',
    context: 'Souris, Saint-Romuald',
    service: { _type: 'reference', _ref: 'service-rongeurs-fr' },
    project: { _type: 'reference', _ref: 'project-entrepot-rongeurs-fr' },
    featured: true,
    order: 1
  },
  {
    _id: 'testimonial-marc-andre-fr',
    _type: 'testimonial',
    language: 'fr',
    quote: "Dans la restauration, des coquerelles, ça peut tout faire basculer. Ils sont intervenus discrètement, après les heures, et le problème était réglé en deux visites. Service impeccable.",
    name: 'Marc-André G.',
    context: 'Restaurant, Lévis',
    service: { _type: 'reference', _ref: 'service-coquerelles-fr' },
    project: { _type: 'reference', _ref: 'project-restaurant-coquerelles-fr' },
    featured: true,
    order: 2
  },
  {
    _id: 'testimonial-genevieve-fr',
    _type: 'testimonial',
    language: 'fr',
    quote: "J'avais des fourmis charpentières dans une poutre du sous-sol. Le technicien a tout de suite vu l'ampleur et m'a expliqué clairement quoi faire. Réglé, et rassurée.",
    name: 'Geneviève T.',
    context: 'Fourmis charpentières, Saint-Nicolas',
    service: { _type: 'reference', _ref: 'service-fourmis-fr' },
    project: { _type: 'reference', _ref: 'project-maison-fourmis-fr' },
    featured: true,
    order: 3
  },
  {
    _id: 'testimonial-patrick-fr',
    _type: 'testimonial',
    language: 'fr',
    quote: "Des punaises de lit, je pensais qu'on ne s'en sortirait jamais. Le traitement thermique a tout réglé en une journée, sans avoir à jeter nos meubles. Un vrai soulagement.",
    name: 'Patrick D.',
    context: 'Punaises de lit, Charny',
    service: { _type: 'reference', _ref: 'service-punaises-fr' },
    project: { _type: 'reference', _ref: 'project-duplex-punaises-fr' },
    featured: false,
    order: 4
  },
  {
    _id: 'testimonial-sophie-fr',
    _type: 'testimonial',
    language: 'fr',
    quote: "Un gros nid de guêpes juste au-dessus de la porte de la garderie, avec les enfants qui rentraient. Ils sont venus le jour même et l'ont retiré en toute sécurité. Merci mille fois.",
    name: 'Sophie R.',
    context: 'Nid de guêpes, garderie, Lévis',
    service: { _type: 'reference', _ref: 'service-guepes-fr' },
    project: { _type: 'reference', _ref: 'project-garderie-guepes-fr' },
    featured: false,
    order: 5
  },
  {
    _id: 'testimonial-yvon-fr',
    _type: 'testimonial',
    language: 'fr',
    quote: "Des rats avaient élu domicile dans mon garage à la campagne. Le programme de pièges et le suivi en sont venus à bout en quelques semaines. Du monde sérieux et honnête.",
    name: 'Yvon B.',
    context: 'Rats, Beauce',
    service: { _type: 'reference', _ref: 'service-rongeurs-fr' },
    featured: false,
    order: 6
  },

  // ── FAQ (banque, 9 documents) ──────────────────────────────────────────────
  {
    _id: 'faqItem-delai-fr',
    _type: 'faqItem',
    language: 'fr',
    question: 'En combien de temps pouvez-vous intervenir?',
    answer: "Le plus souvent dans les 24 heures, et le jour même pour une urgence comme un nid de guêpes ou une invasion soudaine. Appelez-nous: on vous donne un créneau précis au téléphone, pas une fourchette vague.",
    theme: { _type: 'reference', _ref: 'faqTheme-urgence-fr' }
  },
  {
    _id: 'faqItem-zone-fr',
    _type: 'faqItem',
    language: 'fr',
    question: 'Quel territoire desservez-vous?',
    answer: "Lévis et toute la Rive-Sud de Québec: Saint-Romuald, Saint-Nicolas, Charny, ainsi que la Chaudière-Appalaches, Bellechasse, Lotbinière, la Beauce et Portneuf. Un doute sur votre secteur? Un appel et on vous le confirme.",
    theme: { _type: 'reference', _ref: 'faqTheme-zone-fr' }
  },
  {
    _id: 'faqItem-soumission-fr',
    _type: 'faqItem',
    language: 'fr',
    question: "L'estimation est-elle vraiment gratuite?",
    answer: "Oui, sans condition. On évalue la situation, on vous explique ce qu'on recommande et on vous donne un prix clair, avant que vous décidiez quoi que ce soit. Vous n'avez rien à payer pour le savoir.",
    theme: { _type: 'reference', _ref: 'faqTheme-soumission-fr' }
  },
  {
    _id: 'faqItem-produits-fr',
    _type: 'faqItem',
    language: 'fr',
    question: 'Vos produits sont-ils sûrs pour mes enfants et mes animaux?',
    answer: "Oui. On utilise des produits homologués par Santé Canada, appliqués par un technicien certifié, aux bons endroits et aux bonnes doses. On vous indique toujours le délai à respecter avant de réintégrer la pièce traitée, s'il y a lieu.",
    theme: { _type: 'reference', _ref: 'faqTheme-securite-fr' }
  },
  {
    _id: 'faqItem-garantie-fr',
    _type: 'faqItem',
    language: 'fr',
    question: "Qu'est-ce que la garantie de résultat couvre?",
    answer: "Si le nuisible traité revient pendant la période couverte, on revient sans frais, aussi souvent qu'il le faut. La période dépend du nuisible et du type d'intervention, et elle est écrite noir sur blanc sur votre soumission.",
    theme: { _type: 'reference', _ref: 'faqTheme-garantie-fr' }
  },
  {
    _id: 'faqItem-prix-fr',
    _type: 'faqItem',
    language: 'fr',
    question: 'Combien coûte une intervention?',
    answer: "Ça dépend du nuisible, de la superficie et de l'ampleur du problème. Une intervention de routine pour des fourmis ne coûte pas la même chose qu'un traitement thermique de punaises de lit. C'est pour ça qu'on donne un prix ferme après l'inspection, avant de commencer.",
    theme: { _type: 'reference', _ref: 'faqTheme-prix-fr' }
  },
  {
    _id: 'faqItem-acompte-fr',
    _type: 'faqItem',
    language: 'fr',
    question: "Faut-il payer d'avance?",
    answer: "Non, pas d'acompte pour une intervention résidentielle courante: vous payez une fois le travail fait, sur place ou par virement. Pour les gros mandats commerciaux ou les programmes de suivi, on convient des modalités à l'avance, et tout est écrit.",
    theme: { _type: 'reference', _ref: 'faqTheme-prix-fr' }
  },
  {
    _id: 'faqItem-suivi-fr',
    _type: 'faqItem',
    language: 'fr',
    question: 'Faut-il un suivi après le traitement?',
    answer: "Parfois oui, parfois non. Certains nuisibles, comme les punaises ou les rongeurs, demandent une visite de contrôle pour confirmer que tout est réglé. On vous le dit dès le départ, et le suivi nécessaire est compris dans le prix convenu.",
    theme: { _type: 'reference', _ref: 'faqTheme-suivi-fr' }
  },
  {
    _id: 'faqItem-processus-fr',
    _type: 'faqItem',
    language: 'fr',
    question: 'Comment se déroule une visite à la maison?',
    answer: "Le technicien arrive à l'heure convenue, inspecte les zones touchées, vous explique ce qu'il voit, puis applique le traitement adapté. Il termine par les gestes de prévention et vous laisse des conseils clairs. Une visite courante dure de trente à soixante minutes.",
    theme: { _type: 'reference', _ref: 'faqTheme-processus-fr' }
  },

  // ── Services ──────────────────────────────────────────────────────────────
  {
    _id: 'service-fourmis-fr',
    _type: 'service',
    language: 'fr',
    title: 'Fourmis et fourmis charpentières',
    slug: { _type: 'slug', current: 'extermination-fourmis' },
    summary: 'Des fourmis dans la cuisine ou des charpentières dans le bois de la maison? On trouve le nid, on coupe la source et on protège la structure.',
    meta: 'Intervention sous 24 h',
    image: {
      _type: 'figure',
      alt: "Technicien de Rempart inspectant le pourtour d'une maison pour des fourmis charpentières.",
      label: 'Fourmis et fourmis charpentières',
      caption: 'Fourmis et fourmis charpentières',
      ratio: '4/3'
    },
    intro: [
      "Une traînée de fourmis sur le comptoir, c'est agaçant. Des fourmis charpentières dans une poutre, c'est plus sérieux: elles creusent le bois de la maison. Dans les deux cas, écraser celles qu'on voit ne règle rien, parce que le nid reste caché.",
      "On remonte la piste jusqu'au nid, on traite à la source et on bloque les entrées. Pour les charpentières, on vérifie l'ampleur des dégâts au bois et on vous dit franchement où vous en êtes."
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'Le nid, pas juste les fourmis',
        body: "On élimine la colonie à la source plutôt que de chasser les ouvrières une à une. C'est la seule façon que ça ne revienne pas la semaine suivante."
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Protection du bois',
        body: "Pour les charpentières, on évalue l'atteinte à la structure et on traite avant que les dégâts ne s'aggravent. Mieux vaut agir tôt."
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'Entrées scellées',
        body: 'On repère et on bouche les points de passage autour des fondations et des fenêtres pour leur couper le chemin du retour.'
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'maison-fourmis-saint-nicolas', _type: 'reference', _ref: 'project-maison-fourmis-fr' }
    ],
    order: 1
  },
  {
    _id: 'service-rongeurs-fr',
    _type: 'service',
    language: 'fr',
    title: 'Souris et rats',
    slug: { _type: 'slug', current: 'souris-et-rats' },
    summary: 'Des grattements dans les murs, des crottes au sous-sol? On localise les entrées, on installe le bon dispositif et on referme la maison pour de bon.',
    meta: 'Intervention sous 24 h',
    image: {
      _type: 'figure',
      alt: "Technicien scellant un point d'entrée de souris le long d'une fondation.",
      label: 'Souris et rats',
      caption: 'Souris et rats',
      ratio: '4/3'
    },
    intro: [
      "Une souris se faufile par un trou de la taille d'un dix sous, et une seule en annonce souvent d'autres. Les bruits dans le grenier, les crottes le long des plinthes et les sacs grignotés sont des signaux à ne pas ignorer.",
      "On inspecte la maison de fond en comble, on installe des dispositifs sûrs aux bons endroits et, surtout, on scelle les entrées. Sans ça, on ne fait que vider une porte tournante."
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'Maison refermée',
        body: "On trouve et on bouche les points d'entrée, des fondations à la toiture. Sans accès, plus de nouveaux visiteurs."
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Dispositifs sécuritaires',
        body: 'Pièges et stations placés hors de portée des enfants et des animaux, là où les rongeurs circulent vraiment.'
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: "Suivi jusqu'à zéro",
        body: 'On revient confirmer que tout est réglé avant de fermer le dossier. Vous savez quand le problème est réellement derrière vous.'
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'entrepot-rongeurs-saint-romuald', _type: 'reference', _ref: 'project-entrepot-rongeurs-fr' }
    ],
    order: 2
  },
  {
    _id: 'service-guepes-fr',
    _type: 'service',
    language: 'fr',
    title: 'Guêpes, frelons et nids',
    slug: { _type: 'slug', current: 'guepes-et-frelons' },
    summary: 'Un nid près de la porte, sous la galerie ou dans la toiture? On le retire en sécurité, souvent le jour même, sans risque pour votre monde.',
    meta: 'Service le jour même',
    image: {
      _type: 'figure',
      alt: "Technicien équipé retirant en sécurité un nid de guêpes sous un avant-toit.",
      label: 'Guêpes, frelons et nids',
      caption: 'Guêpes, frelons et nids',
      ratio: '4/3'
    },
    intro: [
      "Un nid de guêpes près d'une entrée ou d'une aire de jeu, ça devient vite un problème quand quelqu'un est allergique ou qu'il y a des enfants. Y toucher soi-même est la meilleure façon de se faire piquer.",
      "On intervient avec l'équipement de protection nécessaire, on retire le nid au complet et on traite le point d'attache pour éviter qu'une nouvelle colonie s'y réinstalle. Souvent réglé le jour même de votre appel."
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'Le jour même',
        body: "Un nid actif, c'est une urgence. On se déplace rapidement pour le retirer avant qu'il grossisse ou que quelqu'un se fasse piquer."
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Retrait sécuritaire',
        body: 'Équipement de protection et bonne méthode: on enlève le nid au complet sans mettre votre famille ni vos voisins en danger.'
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'Pas de retour au même endroit',
        body: "On traite le point d'attache pour décourager une nouvelle colonie de reconstruire exactement là où vous veniez de régler le problème."
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'garderie-guepes-levis', _type: 'reference', _ref: 'project-garderie-guepes-fr' }
    ],
    order: 3
  },
  {
    _id: 'service-punaises-fr',
    _type: 'service',
    language: 'fr',
    title: 'Punaises de lit',
    slug: { _type: 'slug', current: 'punaises-de-lit' },
    summary: 'Des piqûres au réveil, des petites taches sur le matelas? On confirme, on traite en profondeur, souvent sans avoir à jeter vos meubles.',
    meta: 'Traitement thermique disponible',
    image: {
      _type: 'figure',
      alt: "Inspection d'une couture de matelas à la recherche de punaises de lit.",
      label: 'Punaises de lit',
      caption: 'Punaises de lit',
      ratio: '4/3'
    },
    intro: [
      "Découvrir des punaises de lit, c'est stressant, et c'est normal. Bonne nouvelle: avec la bonne méthode, on en vient à bout, et le plus souvent sans avoir à jeter votre matelas ni vos meubles.",
      "On confirme d'abord qu'il s'agit bien de punaises, puis on choisit le traitement adapté, dont le traitement thermique qui élimine les œufs et les adultes en une journée. On vous explique chaque étape, simplement."
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'Confirmation avant tout',
        body: "On vérifie que ce sont bien des punaises avant d'agir. Pas de traitement coûteux pour rien, pas de fausse alerte."
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Traitement thermique',
        body: 'La chaleur élimine œufs et adultes jusque dans les recoins, souvent en une seule journée, sans inonder votre chambre de produits.'
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'Vos meubles, gardés',
        body: 'Dans la grande majorité des cas, pas besoin de jeter quoi que ce soit. On traite, vous gardez vos affaires.'
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'duplex-punaises-charny', _type: 'reference', _ref: 'project-duplex-punaises-fr' }
    ],
    order: 4
  },
  {
    _id: 'service-coquerelles-fr',
    _type: 'service',
    language: 'fr',
    title: 'Coquerelles et blattes',
    slug: { _type: 'slug', current: 'coquerelles-et-blattes' },
    summary: 'À la maison comme au restaurant, on élimine les coquerelles à la source et on garde votre cuisine en règle, discrètement.',
    meta: 'Résidentiel et commercial',
    image: {
      _type: 'figure',
      alt: "Application d'un traitement en gel dans une cuisine contre les coquerelles.",
      label: 'Coquerelles et blattes',
      caption: 'Coquerelles et blattes',
      ratio: '4/3'
    },
    intro: [
      "Apercevoir une coquerelle dans la cuisine, surtout le soir, ça veut souvent dire qu'il y en a d'autres bien cachées. Elles se reproduisent vite et trouvent l'eau et la nourriture là où on ne regarde pas.",
      "On traite à la source, dans les fissures et derrière les électros, avec une méthode ciblée qui suit le cycle de l'insecte. Pour les restaurants et commerces, on intervient discrètement, hors des heures d'achalandage."
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'Traitement ciblé',
        body: 'On vise les cachettes et les voies de circulation des coquerelles plutôt que de pulvériser au hasard. Plus efficace, et plus propre.'
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Discrétion commerciale',
        body: "Pour les restaurants et commerces, on travaille hors des heures d'ouverture, dans la confidentialité, pour protéger votre réputation."
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'Conseils qui tiennent',
        body: "On vous montre les attraits à éliminer pour que la cuisine reste un endroit où les coquerelles n'ont rien à faire."
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'restaurant-coquerelles-vieux-levis', _type: 'reference', _ref: 'project-restaurant-coquerelles-fr' }
    ],
    order: 5
  },

  // ── Interventions ─────────────────────────────────────────────────────────
  {
    _id: 'project-restaurant-coquerelles-fr',
    _type: 'project',
    language: 'fr',
    title: 'Restaurant du Vieux-Lévis: coquerelles éradiquées',
    slug: { _type: 'slug', current: 'restaurant-coquerelles-vieux-levis' },
    excerpt: "Un restaurant établi du Vieux-Lévis aux prises avec des coquerelles, remis en règle en deux visites discrètes, hors des heures de service.",
    cover: {
      _type: 'figure',
      alt: 'Cuisine de restaurant propre et dégagée après le traitement contre les coquerelles.',
      label: 'Restaurant du Vieux-Lévis',
      caption: 'Intervention commerciale, 4:3',
      ratio: '4/3'
    },
    gallery: [
      {
        _key: 'cuisine',
        _type: 'figure',
        alt: 'Cuisine commerciale inspectée derrière les électros et le long des plinthes.',
        label: 'Inspection de la cuisine',
        caption: 'Inspection, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'traitement',
        _type: 'figure',
        alt: 'Application de gel dans les fissures et points de circulation des coquerelles.',
        label: 'Traitement ciblé',
        caption: 'Traitement, 4:5',
        ratio: '4/5'
      }
    ],
    location: 'Lévis (Vieux-Lévis)',
    year: '2024',
    challenge: "Un restaurant de quartier voyait des coquerelles le soir, surtout derrière les équipements de cuisine. Le propriétaire tenait à régler la situation vite et discrètement, avant son inspection.",
    solution: "Inspection complète après la fermeture, traitement en gel ciblé dans les fissures, derrière les électros et le long des conduites, puis une seconde visite de contrôle. Tout en dehors des heures de service.",
    result: "Plus aucune coquerelle en circulation après la deuxième visite. Le restaurant a passé son inspection sans la moindre note, et reste sous suivi préventif.",
    stats: [
      { _key: 'delai', _type: 'projectStat', label: 'Délai', value: '24 h' },
      { _key: 'visites', _type: 'projectStat', label: 'Visites', value: '2' },
      { _key: 'resultat', _type: 'projectStat', label: 'Résultat', value: '0 nuisible' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-coquerelles-fr' },
    testimonial: { _type: 'reference', _ref: 'testimonial-marc-andre-fr' },
    featured: true,
    order: 1
  },
  {
    _id: 'project-duplex-punaises-fr',
    _type: 'project',
    language: 'fr',
    title: 'Duplex à Charny: punaises de lit, traitement thermique',
    slug: { _type: 'slug', current: 'duplex-punaises-charny' },
    excerpt: "Un duplex de Charny débarrassé de ses punaises de lit en une seule journée grâce au traitement thermique, sans que les occupants aient à jeter leurs meubles.",
    cover: {
      _type: 'figure',
      alt: 'Chambre préparée pour un traitement thermique contre les punaises de lit.',
      label: 'Duplex à Charny',
      caption: 'Traitement thermique, 4:3',
      ratio: '4/3'
    },
    gallery: [
      {
        _key: 'inspection',
        _type: 'figure',
        alt: 'Inspection des coutures de matelas et des plinthes à la recherche de punaises.',
        label: 'Inspection',
        caption: 'Détection, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'chaleur',
        _type: 'figure',
        alt: "Équipement de traitement thermique en place dans une pièce du duplex.",
        label: 'Montée en température',
        caption: 'Traitement, 4:5',
        ratio: '4/5'
      }
    ],
    location: 'Charny',
    year: '2024',
    challenge: "Une famille du duplex se réveillait avec des piqûres depuis des semaines. La crainte de tout perdre, meubles et matelas, ajoutait au stress.",
    solution: "Inspection pour confirmer l'infestation et son étendue, puis traitement thermique de l'appartement touché, montant la température au-delà du seuil mortel pour les œufs comme pour les adultes, en une journée.",
    result: "Plus aucune piqûre dès la nuit suivante. Une visite de contrôle a confirmé l'élimination complète, et aucun meuble n'a eu à être jeté.",
    stats: [
      { _key: 'delai', _type: 'projectStat', label: 'Traitement', value: '1 journée' },
      { _key: 'meubles', _type: 'projectStat', label: 'Meubles jetés', value: 'Aucun' },
      { _key: 'resultat', _type: 'projectStat', label: 'Résultat', value: '0 nuisible' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-punaises-fr' },
    testimonial: { _type: 'reference', _ref: 'testimonial-patrick-fr' },
    featured: true,
    order: 2
  },
  {
    _id: 'project-entrepot-rongeurs-fr',
    _type: 'project',
    language: 'fr',
    title: 'Entrepôt à Saint-Romuald: programme antirongeurs',
    slug: { _type: 'slug', current: 'entrepot-rongeurs-saint-romuald' },
    excerpt: "Un entrepôt de Saint-Romuald protégé des souris par un programme de stations et de scellement des entrées, avec suivi régulier.",
    cover: {
      _type: 'figure',
      alt: "Station de contrôle des rongeurs installée le long du mur d'un entrepôt.",
      label: 'Entrepôt à Saint-Romuald',
      caption: 'Programme antirongeurs, 16:9',
      ratio: '16/9'
    },
    gallery: [
      {
        _key: 'station',
        _type: 'figure',
        alt: "Station de surveillance sécuritaire placée le long d'une voie de circulation.",
        label: 'Station de surveillance',
        caption: 'Dispositif, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'scellement',
        _type: 'figure',
        alt: "Scellement d'un point d'entrée le long de la fondation de l'entrepôt.",
        label: 'Scellement des entrées',
        caption: 'Prévention, 4:5',
        ratio: '4/5'
      }
    ],
    location: 'Saint-Romuald',
    year: '2023',
    challenge: "Des souris s'introduisaient dans la réserve de marchandise d'un entrepôt, abîmant l'inventaire et inquiétant l'équipe. Les grandes portes de quai compliquaient le contrôle.",
    solution: "Cartographie des points d'entrée, scellement des passages le long des fondations et des quais, puis pose d'un réseau de stations sécuritaires avec visites de surveillance régulières.",
    result: "Plus aucun signe d'activité après le premier mois. Le programme de suivi maintient l'entrepôt sous contrôle et protège l'inventaire en continu.",
    stats: [
      { _key: 'suivi', _type: 'projectStat', label: 'Suivi', value: '60 jours' },
      { _key: 'stations', _type: 'projectStat', label: 'Stations', value: '18' },
      { _key: 'resultat', _type: 'projectStat', label: 'Résultat', value: '0 nuisible' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-rongeurs-fr' },
    testimonial: { _type: 'reference', _ref: 'testimonial-julie-fr' },
    featured: true,
    order: 3
  },
  {
    _id: 'project-maison-fourmis-fr',
    _type: 'project',
    language: 'fr',
    title: 'Maison à Saint-Nicolas: fourmis charpentières arrêtées',
    slug: { _type: 'slug', current: 'fourmis-charpentieres-saint-nicolas' },
    excerpt: "Des fourmis charpentières installées dans une poutre de sous-sol, traitées à la source avant que les dégâts au bois ne s'aggravent.",
    cover: {
      _type: 'figure',
      alt: 'Poutre de bois inspectée à la recherche de galeries de fourmis charpentières.',
      label: 'Maison à Saint-Nicolas',
      caption: 'Fourmis charpentières, 4:3',
      ratio: '4/3'
    },
    gallery: [
      {
        _key: 'poutre',
        _type: 'figure',
        alt: 'Galeries creusées par les fourmis charpentières dans une poutre.',
        label: 'Atteinte au bois',
        caption: 'Diagnostic, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'pourtour',
        _type: 'figure',
        alt: 'Inspection du pourtour extérieur de la maison à la recherche du nid.',
        label: 'Recherche du nid',
        caption: 'Inspection, 4:3',
        ratio: '4/3'
      }
    ],
    location: 'Saint-Nicolas',
    year: '2023',
    challenge: "Une propriétaire entendait du grattement dans une poutre du sous-sol et s'inquiétait pour la structure de sa maison sans savoir l'ampleur du problème.",
    solution: "Repérage du nid principal et des nids satellites, traitement ciblé à la source, évaluation de l'atteinte au bois et scellement des points d'entrée extérieurs.",
    result: "Activité stoppée dès les jours suivants. La structure était encore saine, et un contrôle a confirmé qu'aucune nouvelle colonie ne s'était réinstallée.",
    stats: [
      { _key: 'delai', _type: 'projectStat', label: 'Délai', value: '24 h' },
      { _key: 'structure', _type: 'projectStat', label: 'Structure', value: 'Préservée' },
      { _key: 'resultat', _type: 'projectStat', label: 'Résultat', value: '0 nuisible' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-fourmis-fr' },
    testimonial: { _type: 'reference', _ref: 'testimonial-genevieve-fr' },
    featured: false,
    order: 4
  },
  {
    _id: 'project-garderie-guepes-fr',
    _type: 'project',
    language: 'fr',
    title: 'Garderie à Lévis: gros nid de guêpes retiré',
    slug: { _type: 'slug', current: 'nid-guepes-garderie-levis' },
    excerpt: "Un gros nid de guêpes au-dessus de l'entrée d'une garderie de Lévis, retiré en toute sécurité le jour même de l'appel.",
    cover: {
      _type: 'figure',
      alt: "Entrée de garderie dégagée après le retrait sécuritaire d'un nid de guêpes.",
      label: 'Garderie à Lévis',
      caption: 'Retrait de nid, 4:3',
      ratio: '4/3'
    },
    gallery: [
      {
        _key: 'nid',
        _type: 'figure',
        alt: "Gros nid de guêpes logé sous un avant-toit, au-dessus d'une porte.",
        label: 'Le nid avant retrait',
        caption: 'Situation, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'retrait',
        _type: 'figure',
        alt: 'Technicien équipé procédant au retrait sécuritaire du nid.',
        label: 'Retrait en sécurité',
        caption: 'Intervention, 4:5',
        ratio: '4/5'
      }
    ],
    location: 'Lévis',
    year: '2024',
    challenge: "Un nid de guêpes important s'était formé juste au-dessus de la porte d'une garderie, sur le passage quotidien des enfants et du personnel.",
    solution: "Déplacement le jour même de l'appel, retrait complet du nid avec équipement de protection pendant que la zone était dégagée, puis traitement du point d'attache pour empêcher une reconstruction.",
    result: "Entrée sécurisée dès la fin de l'intervention. Aucune piqûre, aucun retour de colonie au même endroit lors du suivi de fin de saison.",
    stats: [
      { _key: 'delai', _type: 'projectStat', label: 'Délai', value: 'Jour même' },
      { _key: 'securite', _type: 'projectStat', label: 'Enfants', value: 'En sécurité' },
      { _key: 'resultat', _type: 'projectStat', label: 'Résultat', value: '0 nuisible' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-guepes-fr' },
    testimonial: { _type: 'reference', _ref: 'testimonial-sophie-fr' },
    featured: false,
    order: 5
  }
]
