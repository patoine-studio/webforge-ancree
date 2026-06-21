/* Contenu des pages de service par nuisible (le « quoi » du SEO local). Keye par
 * la meme cle stable que SERVICE_DETAILS (route-map). Repli DEMO par fixtures (un
 * type Sanity 'serviceDetail' viendra en suivi). AUCUNE valeur design ici, que du
 * contenu. Voix Ancree: directe, rassurante, quebecoise, on s'adresse au client.
 * Aucun tiret cadratin, aucun middle dot, aucune numerotation. */

export interface ServiceDetailHighlight {
  icon: string // nom Iconify line-art (lucide)
  title: string
  body: string
}

export interface ServiceDetailContent {
  key: string
  icon: string // icone du nuisible (carte d'index + masthead)
  eyebrow: string // marqueur de service
  cardTitle: string // titre court (carte de l'index /services)
  cardTeaser: string // accroche courte (carte de l'index)
  title: string // H1 de la page, riche en mots-cles
  lead: string // accroche de la page
  intro: string[] // paragraphes d'introduction
  highlights: ServiceDetailHighlight[] // signes, traitement, garantie
}

/* Ordre d'affichage (carte vedette en premier), aligne sur SERVICE_DETAILS. */
const ORDER = ['fourmis-charpentieres', 'souris-rats', 'punaises-de-lit', 'guepes-frelons', 'commercial'] as const

function frDetails(): Record<string, ServiceDetailContent> {
  return {
    'fourmis-charpentieres': {
      key: 'fourmis-charpentieres',
      icon: 'lucide:bug',
      eyebrow: 'Service d’extermination',
      cardTitle: 'Fourmis charpentières',
      cardTeaser: 'Elles creusent le bois de la structure. On trouve le nid principal et les satellites, puis on traite à la source.',
      title: 'Extermination de fourmis charpentières',
      lead: 'Les fourmis charpentières s’attaquent au bois de votre maison. Plus on attend, plus les dégâts s’accumulent. On les règle à la source, pas juste en surface.',
      intro: [
        'Contrairement aux fourmis de jardin, les charpentières creusent des galeries dans le bois humide ou abîmé pour y loger leur colonie. On les remarque souvent près des fenêtres, des cadres de porte ou de la solive de rive, surtout au printemps.',
        'Pulvériser ce qu’on voit ne règle rien: la reine et le nid principal restent intacts. On localise le nid, on traite la colonie au complet et on s’occupe des conditions qui les ont attirées.'
      ],
      highlights: [
        { icon: 'lucide:search', title: 'Les signes', body: 'Fine sciure de bois près des boiseries, grattement dans les murs, grosses fourmis noires parfois ailées à l’intérieur.' },
        { icon: 'lucide:target', title: 'Le traitement', body: 'Repérage du nid principal et des satellites, traitement ciblé en appât et en barrière, sûr pour la famille et les animaux.' },
        { icon: 'lucide:badge-check', title: 'La garantie', body: 'On revient si elles reviennent. Le résultat est garanti par écrit.' }
      ]
    },
    'souris-rats': {
      key: 'souris-rats',
      icon: 'lucide:rat',
      eyebrow: 'Service d’extermination',
      cardTitle: 'Souris et rats',
      cardTeaser: 'Inspection, scellement des points d’entrée et contrôle complet. On ferme la porte, pas seulement on piège.',
      title: 'Extermination de souris et de rats',
      lead: 'Un rongeur dans la maison, c’est un risque pour la santé et pour vos installations. On les sort et on bloque ce qui les laisse entrer.',
      intro: [
        'Une souris passe par une ouverture grande comme un dix sous. Une fois à l’intérieur, elle se reproduit vite, contamine la nourriture et ronge le filage. Les pièges seuls ne font que gérer les symptômes.',
        'On inspecte la maison de la cave au grenier, on scelle les points d’entrée, puis on installe un contrôle adapté. Le but n’est pas d’en attraper quelques-unes, c’est de fermer la maison pour de bon.'
      ],
      highlights: [
        { icon: 'lucide:search', title: 'Les signes', body: 'Crottes le long des murs, bruits de course la nuit, emballages grignotés, odeur persistante dans un coin.' },
        { icon: 'lucide:target', title: 'Le traitement', body: 'Scellement des accès, stations de contrôle sécurisées hors de portée des enfants et des animaux, suivi du résultat.' },
        { icon: 'lucide:badge-check', title: 'La garantie', body: 'On reste sur le dossier jusqu’à ce que ce soit réglé, et c’est garanti par écrit.' }
      ]
    },
    'punaises-de-lit': {
      key: 'punaises-de-lit',
      icon: 'lucide:bed',
      eyebrow: 'Service d’extermination',
      cardTitle: 'Punaises de lit',
      cardTeaser: 'Traitement thermique et résiduel, discret et garanti, pour redormir tranquille au plus vite.',
      title: 'Extermination de punaises de lit',
      lead: 'Les punaises de lit ne sont pas une question de propreté, et elles ne partent pas toutes seules. On les traite à fond, discrètement, pour que vous redormiez vite.',
      intro: [
        'Les punaises se cachent dans les coutures de matelas, les fissures et derrière les plinthes. Elles voyagent dans les bagages et les meubles, et une infestation s’installe en silence avant les premières piqûres.',
        'On combine la chaleur et un traitement résiduel pour atteindre les œufs comme les adultes, là où ils se cachent. Discrétion totale: personne n’a à savoir qu’on est passés.'
      ],
      highlights: [
        { icon: 'lucide:search', title: 'Les signes', body: 'Piqûres en ligne au réveil, petites taches sombres sur les draps, points noirs dans les coutures du matelas.' },
        { icon: 'lucide:target', title: 'Le traitement', body: 'Traitement thermique et résiduel ciblé, plan de préparation simple, sûr pour la maisonnée.' },
        { icon: 'lucide:badge-check', title: 'La garantie', body: 'Suivi inclus et résultat garanti par écrit, jusqu’à élimination complète.' }
      ]
    },
    'guepes-frelons': {
      key: 'guepes-frelons',
      icon: 'lucide:hexagon',
      eyebrow: 'Service d’extermination',
      cardTitle: 'Guêpes et frelons',
      cardTeaser: 'Retrait sécuritaire des nids, en hauteur ou au sol, sans risque pour la famille.',
      title: 'Extermination de guêpes et de frelons',
      lead: 'Un nid près de la porte ou sous la galerie, c’est dangereux pour la famille. On le retire de façon sécuritaire, souvent le jour même.',
      intro: [
        'Guêpes, frelons et nids de papier deviennent agressifs quand on s’en approche. Tenter de les déloger soi-même finit souvent en piqûres multiples, parfois en réaction sévère.',
        'On intervient avec l’équipement de protection qu’il faut, on traite et on retire le nid à la source. Pas de produit laissé à traîner, pas de risque pour vos proches.'
      ],
      highlights: [
        { icon: 'lucide:search', title: 'La situation', body: 'Nid sous un avant-toit, dans un arbuste ou dans le sol, va-et-vient soutenu d’insectes près de la maison.' },
        { icon: 'lucide:target', title: 'Le traitement', body: 'Retrait sécuritaire en hauteur ou au sol, traitement ciblé, zone laissée propre et sûre.' },
        { icon: 'lucide:badge-check', title: 'La garantie', body: 'Si un nid se reforme au même endroit dans la saison, on revient sans frais.' }
      ]
    },
    commercial: {
      key: 'commercial',
      icon: 'lucide:building-2',
      eyebrow: 'Service d’extermination',
      cardTitle: 'Extermination commerciale',
      cardTeaser: 'Programmes préventifs pour restaurants, commerces et immeubles, conformes aux normes.',
      title: 'Extermination commerciale',
      lead: 'Un nuisible dans un commerce, c’est votre réputation qui est en jeu. On met en place un programme discret, documenté et conforme.',
      intro: [
        'Restaurants, commerces de détail, immeubles: chaque milieu a ses risques et ses inspections. Une infestation visible, c’est une note d’inspection ratée et des clients qui parlent.',
        'On bâtit un programme préventif adapté à votre réalité, avec un calendrier de visites, des rapports clairs et une intervention rapide au besoin. Discret pour vos clients, solide pour vos inspections.'
      ],
      highlights: [
        { icon: 'lucide:clipboard-check', title: 'Le programme', body: 'Visites planifiées, stations documentées et rapports prêts pour vos inspections.' },
        { icon: 'lucide:target', title: 'L’intervention', body: 'Réponse rapide entre les visites, traitements adaptés au milieu, dérangement minimal pour la clientèle.' },
        { icon: 'lucide:badge-check', title: 'La tranquillité', body: 'Un interlocuteur dédié, des dossiers à jour, une conformité que vous pouvez montrer.' }
      ]
    }
  }
}

function enDetails(): Record<string, ServiceDetailContent> {
  return {
    'fourmis-charpentieres': {
      key: 'fourmis-charpentieres',
      icon: 'lucide:bug',
      eyebrow: 'Pest control service',
      cardTitle: 'Carpenter ants',
      cardTeaser: 'They tunnel through your structural wood. We find the main and satellite nests, then treat at the source.',
      title: 'Carpenter ant extermination',
      lead: 'Carpenter ants go after the wood in your home. The longer you wait, the more the damage adds up. We deal with them at the source, not just on the surface.',
      intro: [
        'Unlike garden ants, carpenter ants tunnel through damp or damaged wood to house their colony. You often spot them near windows, door frames or the rim joist, especially in spring.',
        'Spraying what you see solves nothing: the queen and the main nest stay intact. We locate the nest, treat the whole colony, and address the conditions that drew them in.'
      ],
      highlights: [
        { icon: 'lucide:search', title: 'The signs', body: 'Fine sawdust near woodwork, scratching inside walls, large black ants, sometimes winged, showing up indoors.' },
        { icon: 'lucide:target', title: 'The treatment', body: 'We find the main and satellite nests, treat with targeted bait and a barrier, safe for your family and pets.' },
        { icon: 'lucide:badge-check', title: 'The guarantee', body: 'If they come back, so do we. The result is guaranteed in writing.' }
      ]
    },
    'souris-rats': {
      key: 'souris-rats',
      icon: 'lucide:rat',
      eyebrow: 'Pest control service',
      cardTitle: 'Mice and rats',
      cardTeaser: 'Inspection, entry-point sealing and full control. We close the door, not just set traps.',
      title: 'Mouse and rat extermination',
      lead: 'A rodent in the house is a risk to your health and your home. We get them out and block what lets them in.',
      intro: [
        'A mouse fits through a gap the size of a dime. Once inside, it breeds fast, contaminates food and chews on wiring. Traps alone only manage the symptoms.',
        'We inspect the home from basement to attic, seal the entry points, then set up the right control. The goal is not to catch a few, it is to close the house for good.'
      ],
      highlights: [
        { icon: 'lucide:search', title: 'The signs', body: 'Droppings along walls, scurrying at night, gnawed packaging, a lingering smell in one spot.' },
        { icon: 'lucide:target', title: 'The treatment', body: 'Entry-point sealing, secure control stations out of reach of kids and pets, and a follow-up on the result.' },
        { icon: 'lucide:badge-check', title: 'The guarantee', body: 'We stay on the file until it is solved, and it is guaranteed in writing.' }
      ]
    },
    'punaises-de-lit': {
      key: 'punaises-de-lit',
      icon: 'lucide:bed',
      eyebrow: 'Pest control service',
      cardTitle: 'Bed bugs',
      cardTeaser: 'Heat and residual treatment, discreet and guaranteed, so you sleep easy again fast.',
      title: 'Bed bug extermination',
      lead: 'Bed bugs are not about cleanliness, and they do not leave on their own. We treat them thoroughly and discreetly, so you sleep easy again fast.',
      intro: [
        'Bed bugs hide in mattress seams, cracks and behind baseboards. They travel in luggage and furniture, and an infestation settles in quietly before the first bites.',
        'We combine heat and a residual treatment to reach eggs and adults alike, right where they hide. Fully discreet: no one needs to know we came by.'
      ],
      highlights: [
        { icon: 'lucide:search', title: 'The signs', body: 'Bites in a line on waking, small dark spots on the sheets, black dots in the mattress seams.' },
        { icon: 'lucide:target', title: 'The treatment', body: 'Targeted heat and residual treatment, a simple prep plan, safe for the household.' },
        { icon: 'lucide:badge-check', title: 'The guarantee', body: 'Follow-up included and the result guaranteed in writing, until full elimination.' }
      ]
    },
    'guepes-frelons': {
      key: 'guepes-frelons',
      icon: 'lucide:hexagon',
      eyebrow: 'Pest control service',
      cardTitle: 'Wasps and hornets',
      cardTeaser: 'Safe nest removal, up high or at ground level, with no risk to the family.',
      title: 'Wasp and hornet extermination',
      lead: 'A nest near the door or under the deck is dangerous for the family. We remove it safely, often the same day.',
      intro: [
        'Wasps, hornets and paper nests turn aggressive when you get close. Trying to knock one down yourself often ends in multiple stings, sometimes a serious reaction.',
        'We come in with the right protective gear, treat the nest and remove it at the source. No product left lying around, no risk to your loved ones.'
      ],
      highlights: [
        { icon: 'lucide:search', title: 'The situation', body: 'A nest under an eave, in a shrub or in the ground, steady insect traffic near the house.' },
        { icon: 'lucide:target', title: 'The treatment', body: 'Safe removal up high or at ground level, targeted treatment, the area left clean and safe.' },
        { icon: 'lucide:badge-check', title: 'The guarantee', body: 'If a nest rebuilds in the same spot during the season, we come back at no charge.' }
      ]
    },
    commercial: {
      key: 'commercial',
      icon: 'lucide:building-2',
      eyebrow: 'Pest control service',
      cardTitle: 'Commercial pest control',
      cardTeaser: 'Preventive programs for restaurants, shops and buildings, compliant with standards.',
      title: 'Commercial pest control',
      lead: 'A pest in a business puts your reputation on the line. We set up a discreet, documented and compliant program.',
      intro: [
        'Restaurants, retail, buildings: each setting has its own risks and inspections. A visible infestation means a failed inspection and customers who talk.',
        'We build a preventive program suited to your reality, with a visit schedule, clear reports and a fast response when needed. Discreet for your customers, solid for your inspections.'
      ],
      highlights: [
        { icon: 'lucide:clipboard-check', title: 'The program', body: 'Scheduled visits, documented stations and reports ready for your inspections.' },
        { icon: 'lucide:target', title: 'The response', body: 'Fast action between visits, treatments suited to the setting, minimal disruption to customers.' },
        { icon: 'lucide:badge-check', title: 'The peace of mind', body: 'A dedicated contact, records kept current, compliance you can show.' }
      ]
    }
  }
}

/** Contenu d'une page nuisible par cle, ou null si inconnue. */
export function serviceDetailFixture(key: string | null, isEn: boolean): ServiceDetailContent | null {
  if (!key) return null
  return (isEn ? enDetails() : frDetails())[key] ?? null
}

/** Liste ordonnee des nuisibles (cartes de l'index /services). */
export function serviceDetailList(isEn: boolean): ServiceDetailContent[] {
  const all = isEn ? enDetails() : frDetails()
  return ORDER.map((k) => all[k]).filter((d): d is ServiceDetailContent => Boolean(d))
}
