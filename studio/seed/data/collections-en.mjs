// Seed EN des collections: catégories (3), thèmes FAQ (8), témoignages (6),
// FAQ (9), services (5), interventions (5).
//
// Miroir structurel exact de collections-fr.mjs: mêmes _type, mêmes _key, même
// mécanique de références. Ids déterministes (spec §11): <type>-<cleFR>-en (la
// clé reste celle du slug FR canonique, seul slug.current est anglais); les
// internalRef et _ref pointent vers <base>-en.
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

/** Lien interne vers un document (id déterministe -en). */
const internal = (label, ref) => ({
  _type: 'link',
  label,
  type: 'internal',
  internalRef: { _type: 'reference', _ref: ref }
})

/** Page de détail d'un service (gabarit V1, ex-servicesPage.serviceDetail). */
const serviceDetail = () => ({
  benefits: {
    heading: 'What you get',
    cta: internal('Request a quote', 'contactPage-en')
  },
  included: { heading: 'Included in every visit' },
  process: {
    _type: 'process',
    eyebrow: 'How it works',
    heading: 'How a visit unfolds',
    lead: 'From the first call to the guarantee, we follow the same proven method.',
    cta: internal('Call us', 'contactPage-en'),
    steps: [
      {
        _type: 'processStep',
        _key: 'step-1',
        title: 'The inspection',
        body: 'We come to your home, identify the pest, its entry points and the real scope of the problem. You know exactly what you are dealing with before we lift a finger.'
      },
      {
        _type: 'processStep',
        _key: 'step-2',
        title: 'The treatment',
        body: 'We apply the right treatment for the pest and your space, using approved products and a certified technician. A targeted intervention, not a cloud of product everywhere.'
      },
      {
        _type: 'processStep',
        _key: 'step-3',
        title: 'The prevention',
        body: 'We seal the entry points, remove what attracts them and leave you with practical tips so the problem does not come back. The best treatment is the one we never have to redo.'
      },
      {
        _type: 'processStep',
        _key: 'step-4',
        title: 'The guarantee',
        body: 'We come back if needed during the covered period, at no charge. If the pest comes back, so do we. That is what our results guarantee means.'
      }
    ]
  },
  projects: {
    heading: 'Jobs like this one',
    lead: 'Real cases solved close to home, before and after.',
    cta: internal('All our jobs', 'projectsPage-en')
  },
  testimonials: {
    eyebrow: 'Testimonials',
    heading: 'What our clients have to say'
  },
  cta: {
    _type: 'ctaBand',
    title: 'A problem to solve?',
    subtitle: 'Give us a call and we will give you a hand today.',
    primaryCta: internal('Free quote', 'contactPage-en')
  }
})

/** Page de détail d'une intervention (gabarit V1, ex-projectsPage.projectDetail). */
const projectDetail = () => ({
  gallery: { heading: 'In pictures' },
  caseStudy: {
    eyebrow: 'The case study',
    heading: 'The situation, the intervention, the result',
    challengeLabel: 'The situation',
    solutionLabel: 'The intervention',
    resultLabel: 'The result'
  },
  testimonial: {
    eyebrow: 'Testimonials',
    heading: 'A word from the client'
  },
  similar: {
    heading: 'Similar jobs',
    cta: internal('All our jobs', 'projectsPage-en')
  },
  cta: {
    _type: 'ctaBand',
    title: 'The same problem at your place?',
    subtitle: 'Every case is different. Let us talk about yours today.',
    primaryCta: internal('Free quote', 'contactPage-en')
  }
})

export const docs = [
  // ── Catégories de blogue ──────────────────────────────────────────────────
  {
    _id: 'category-prevention-en',
    _type: 'category',
    language: 'en',
    title: 'Prevention',
    slug: { _type: 'slug', current: 'prevention' },
    description: 'Keeping pests outside before they get in. Simple habits, good reflexes and small jobs that make a difference season after season.',
    order: 1
  },
  {
    _id: 'category-nuisibles-en',
    _type: 'category',
    language: 'en',
    title: 'Pest identification',
    slug: { _type: 'slug', current: 'pest-identification' },
    description: 'Knowing what you are dealing with, fast. The clues, traces and signs that tell a mouse from a rat, a wasp from a bee, a bed bug bite from a simple itch.',
    order: 2
  },
  {
    _id: 'category-maison-saine-en',
    _type: 'category',
    language: 'en',
    title: 'Healthy home',
    slug: { _type: 'slug', current: 'healthy-home' },
    description: 'A home where you breathe easier and where pests find nothing to feed on. Kitchen, attic, basement: what draws them in and how to take away the temptation.',
    order: 3
  },

  // ── Thèmes FAQ (banque, 8 documents) ───────────────────────────────────────
  {
    _id: 'faqTheme-urgence-en',
    _type: 'faqTheme',
    language: 'en',
    title: 'Timing and emergencies',
    slug: { _type: 'slug', current: 'timing-and-emergencies' }
  },
  {
    _id: 'faqTheme-zone-en',
    _type: 'faqTheme',
    language: 'en',
    title: 'Service area',
    slug: { _type: 'slug', current: 'service-area' }
  },
  {
    _id: 'faqTheme-soumission-en',
    _type: 'faqTheme',
    language: 'en',
    title: 'Estimates and quotes',
    slug: { _type: 'slug', current: 'estimates-and-quotes' }
  },
  {
    _id: 'faqTheme-securite-en',
    _type: 'faqTheme',
    language: 'en',
    title: 'Products, family and pets',
    slug: { _type: 'slug', current: 'products-family-and-pets' }
  },
  {
    _id: 'faqTheme-garantie-en',
    _type: 'faqTheme',
    language: 'en',
    title: 'Guarantee',
    slug: { _type: 'slug', current: 'guarantee' }
  },
  {
    _id: 'faqTheme-prix-en',
    _type: 'faqTheme',
    language: 'en',
    title: 'Pricing and payment',
    slug: { _type: 'slug', current: 'pricing-and-payment' }
  },
  {
    _id: 'faqTheme-suivi-en',
    _type: 'faqTheme',
    language: 'en',
    title: 'Follow-up and prevention',
    slug: { _type: 'slug', current: 'follow-up-and-prevention' }
  },
  {
    _id: 'faqTheme-processus-en',
    _type: 'faqTheme',
    language: 'en',
    title: 'How an intervention works',
    slug: { _type: 'slug', current: 'how-an-intervention-works' }
  },

  // ── Témoignages (banque, 6 documents) ─────────────────────────────────────
  {
    _id: 'testimonial-julie-en',
    _type: 'testimonial',
    language: 'en',
    quote: 'We had been hearing scratching in the walls for weeks. Rempart came the day after I called, found the entry point and sealed it all up. Not a sound since.',
    name: 'Julie L.',
    context: 'Mice, Saint-Romuald',
    service: { _type: 'reference', _ref: 'service-rongeurs-en' },
    project: { _type: 'reference', _ref: 'project-entrepot-rongeurs-en' },
    featured: true,
    order: 1
  },
  {
    _id: 'testimonial-marc-andre-en',
    _type: 'testimonial',
    language: 'en',
    quote: 'In a restaurant, cockroaches can sink you. They came in discreetly, after hours, and the problem was solved in two visits. Flawless service.',
    name: 'Marc-André G.',
    context: 'Restaurant, Lévis',
    service: { _type: 'reference', _ref: 'service-coquerelles-en' },
    project: { _type: 'reference', _ref: 'project-restaurant-coquerelles-en' },
    featured: true,
    order: 2
  },
  {
    _id: 'testimonial-genevieve-en',
    _type: 'testimonial',
    language: 'en',
    quote: 'I had carpenter ants in a beam in the basement. The technician saw the scope of it right away and explained clearly what to do. Solved, and reassured.',
    name: 'Geneviève T.',
    context: 'Carpenter ants, Saint-Nicolas',
    service: { _type: 'reference', _ref: 'service-fourmis-en' },
    project: { _type: 'reference', _ref: 'project-maison-fourmis-en' },
    featured: true,
    order: 3
  },
  {
    _id: 'testimonial-patrick-en',
    _type: 'testimonial',
    language: 'en',
    quote: 'With bed bugs, I thought we would never get rid of them. The heat treatment took care of everything in a single day, without having to throw out our furniture. What a relief.',
    name: 'Patrick D.',
    context: 'Bed bugs, Charny',
    service: { _type: 'reference', _ref: 'service-punaises-en' },
    project: { _type: 'reference', _ref: 'project-duplex-punaises-en' },
    featured: false,
    order: 4
  },
  {
    _id: 'testimonial-sophie-en',
    _type: 'testimonial',
    language: 'en',
    quote: 'A big wasp nest right above the daycare door, with the kids coming in. They came the same day and removed it safely. Thank you so much.',
    name: 'Sophie R.',
    context: 'Wasp nest, daycare, Lévis',
    service: { _type: 'reference', _ref: 'service-guepes-en' },
    project: { _type: 'reference', _ref: 'project-garderie-guepes-en' },
    featured: false,
    order: 5
  },
  {
    _id: 'testimonial-yvon-en',
    _type: 'testimonial',
    language: 'en',
    quote: 'Rats had moved into my garage out in the country. The trapping program and the follow-up got rid of them in a few weeks. Serious, honest people.',
    name: 'Yvon B.',
    context: 'Rats, Beauce',
    service: { _type: 'reference', _ref: 'service-rongeurs-en' },
    featured: false,
    order: 6
  },

  // ── FAQ (banque, 9 documents) ──────────────────────────────────────────────
  {
    _id: 'faqItem-delai-en',
    _type: 'faqItem',
    language: 'en',
    question: 'How quickly can you come out?',
    answer: 'Usually within 24 hours, and the same day for an emergency like a wasp nest or a sudden invasion. Call us: we give you a precise time slot over the phone, not a vague window.',
    theme: { _type: 'reference', _ref: 'faqTheme-urgence-en' }
  },
  {
    _id: 'faqItem-zone-en',
    _type: 'faqItem',
    language: 'en',
    question: 'What area do you serve?',
    answer: 'Lévis and the entire South Shore of Quebec City: Saint-Romuald, Saint-Nicolas, Charny, plus Chaudière-Appalaches, Bellechasse, Lotbinière, the Beauce and Portneuf. Not sure about your area? One call and we will confirm it for you.',
    theme: { _type: 'reference', _ref: 'faqTheme-zone-en' }
  },
  {
    _id: 'faqItem-soumission-en',
    _type: 'faqItem',
    language: 'en',
    question: 'Is the estimate really free?',
    answer: 'Yes, no strings attached. We assess the situation, explain what we recommend and give you a clear price, before you decide anything at all. You owe nothing just to find out.',
    theme: { _type: 'reference', _ref: 'faqTheme-soumission-en' }
  },
  {
    _id: 'faqItem-produits-en',
    _type: 'faqItem',
    language: 'en',
    question: 'Are your products safe for my children and pets?',
    answer: 'Yes. We use products approved by Health Canada, applied by a certified technician, in the right spots and at the right doses. We always tell you how long to wait before going back into a treated room, when that applies.',
    theme: { _type: 'reference', _ref: 'faqTheme-securite-en' }
  },
  {
    _id: 'faqItem-garantie-en',
    _type: 'faqItem',
    language: 'en',
    question: 'What does the results guarantee cover?',
    answer: 'If the treated pest comes back during the covered period, we come back at no charge, as often as it takes. The period depends on the pest and the type of treatment, and it is written in plain terms on your quote.',
    theme: { _type: 'reference', _ref: 'faqTheme-garantie-en' }
  },
  {
    _id: 'faqItem-prix-en',
    _type: 'faqItem',
    language: 'en',
    question: 'How much does a treatment cost?',
    answer: 'It depends on the pest, the surface area and the scope of the problem. A routine ant treatment does not cost the same as a heat treatment for bed bugs. That is why we give you a firm price after the inspection, before we start.',
    theme: { _type: 'reference', _ref: 'faqTheme-prix-en' }
  },
  {
    _id: 'faqItem-acompte-en',
    _type: 'faqItem',
    language: 'en',
    question: 'Do I have to pay up front?',
    answer: 'No, no deposit for a standard residential job: you pay once the work is done, on site or by transfer. For larger commercial contracts or follow-up programs, we agree on the terms ahead of time, and everything is in writing.',
    theme: { _type: 'reference', _ref: 'faqTheme-prix-en' }
  },
  {
    _id: 'faqItem-suivi-en',
    _type: 'faqItem',
    language: 'en',
    question: 'Is a follow-up needed after the treatment?',
    answer: 'Sometimes yes, sometimes no. Some pests, like bed bugs or rodents, call for a check-up visit to confirm everything is taken care of. We tell you right from the start, and any needed follow-up is included in the agreed price.',
    theme: { _type: 'reference', _ref: 'faqTheme-suivi-en' }
  },
  {
    _id: 'faqItem-processus-en',
    _type: 'faqItem',
    language: 'en',
    question: 'How does a home visit work?',
    answer: 'The technician arrives at the agreed time, inspects the affected areas, explains what they see, then applies the right treatment. They finish with the prevention steps and leave you with clear advice. A standard visit takes thirty to sixty minutes.',
    theme: { _type: 'reference', _ref: 'faqTheme-processus-en' }
  },

  // ── Services ──────────────────────────────────────────────────────────────
  {
    _id: 'service-fourmis-en',
    _type: 'service',
    language: 'en',
    title: 'Ants & carpenter ants',
    slug: { _type: 'slug', current: 'ant-control' },
    summary: 'Ants in the kitchen or carpenter ants in the wood of the house? We find the nest, cut off the source and protect the structure.',
    meta: 'Service within 24 hrs',
    image: {
      _type: 'figure',
      alt: 'A Rempart technician inspecting the perimeter of a house for carpenter ants.',
      label: 'Ants & carpenter ants',
      caption: 'Ants & carpenter ants',
      ratio: '4/3'
    },
    intro: [
      'A trail of ants on the counter is annoying. Carpenter ants in a beam are more serious: they tunnel through the wood of the house. In both cases, squashing the ones you see solves nothing, because the nest stays hidden.',
      'We trace the trail back to the nest, treat at the source and block the entry points. For carpenter ants, we check how far the wood damage has gone and tell you straight where things stand.'
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'The nest, not just the ants',
        body: 'We eliminate the colony at the source instead of chasing workers one by one. It is the only way to make sure they are not back the following week.'
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Protecting the wood',
        body: 'For carpenter ants, we assess the damage to the structure and treat before it gets worse. Acting early always pays off.'
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'Entry points sealed',
        body: 'We locate and seal the access points around the foundation and windows to cut off their way back in.'
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'maison-fourmis-saint-nicolas', _type: 'reference', _ref: 'project-maison-fourmis-en' }
    ],
    order: 1
  },
  {
    _id: 'service-rongeurs-en',
    _type: 'service',
    language: 'en',
    title: 'Mice & rats',
    slug: { _type: 'slug', current: 'rodent-control' },
    summary: 'Scratching in the walls, droppings in the basement? We locate the entry points, set up the right device and close the house up for good.',
    meta: 'Service within 24 hrs',
    image: {
      _type: 'figure',
      alt: 'A technician sealing a mouse entry point along a foundation.',
      label: 'Mice & rats',
      caption: 'Mice & rats',
      ratio: '4/3'
    },
    intro: [
      'A mouse slips through a hole the size of a dime, and one of them usually means there are more. Noises in the attic, droppings along the baseboards and chewed bags are signals you should not ignore.',
      'We inspect the house from top to bottom, set up safe devices in the right spots and, above all, seal the entry points. Without that, you are just emptying a revolving door.'
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'House sealed up',
        body: 'We find and seal the entry points, from the foundation to the roof. No way in means no new visitors.'
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Safe devices',
        body: 'Traps and stations placed out of reach of children and pets, right where the rodents actually travel.'
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'Follow-up to zero',
        body: 'We come back to confirm everything is taken care of before closing the file. You know when the problem is truly behind you.'
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'entrepot-rongeurs-saint-romuald', _type: 'reference', _ref: 'project-entrepot-rongeurs-en' }
    ],
    order: 2
  },
  {
    _id: 'service-guepes-en',
    _type: 'service',
    language: 'en',
    title: 'Wasps, hornets & nests',
    slug: { _type: 'slug', current: 'wasps-hornets' },
    summary: 'A nest near the door, under the deck or in the roofline? We remove it safely, often the same day, with no risk to your family.',
    meta: 'Same-day service',
    image: {
      _type: 'figure',
      alt: 'A geared-up technician safely removing a wasp nest under an eave.',
      label: 'Wasps, hornets & nests',
      caption: 'Wasps, hornets & nests',
      ratio: '4/3'
    },
    intro: [
      'A wasp nest near an entrance or a play area quickly becomes a problem when someone is allergic or there are children around. Dealing with it yourself is the surest way to get stung.',
      'We step in with the protective gear it takes, remove the whole nest and treat the attachment point so a new colony does not move back in. Often solved the same day you call.'
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'Same day',
        body: 'An active nest is an emergency. We get there quickly to remove it before it grows or someone gets stung.'
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Safe removal',
        body: 'Protective gear and the right method: we take the whole nest down without putting your family or your neighbours at risk.'
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'No return to the same spot',
        body: 'We treat the attachment point to discourage a new colony from rebuilding right where you just solved the problem.'
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'garderie-guepes-levis', _type: 'reference', _ref: 'project-garderie-guepes-en' }
    ],
    order: 3
  },
  {
    _id: 'service-punaises-en',
    _type: 'service',
    language: 'en',
    title: 'Bed bugs',
    slug: { _type: 'slug', current: 'bed-bugs' },
    summary: 'Bites when you wake up, small spots on the mattress? We confirm it, treat deep, often without having to throw out your furniture.',
    meta: 'Heat treatment available',
    image: {
      _type: 'figure',
      alt: 'Inspecting a mattress seam for bed bugs.',
      label: 'Bed bugs',
      caption: 'Bed bugs',
      ratio: '4/3'
    },
    intro: [
      'Finding bed bugs is stressful, and that is normal. The good news: with the right method, we get rid of them, and most of the time without having to throw out your mattress or your furniture.',
      'We first confirm that they really are bed bugs, then choose the right treatment, including the heat treatment that wipes out eggs and adults in a single day. We walk you through every step, plainly.'
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'Confirmation first',
        body: 'We make sure they really are bed bugs before acting. No costly treatment for nothing, no false alarm.'
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Heat treatment',
        body: 'Heat wipes out eggs and adults right into the corners, often in a single day, without flooding your bedroom with product.'
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'Your furniture, kept',
        body: 'In the vast majority of cases, there is no need to throw anything out. We treat, you keep your things.'
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'duplex-punaises-charny', _type: 'reference', _ref: 'project-duplex-punaises-en' }
    ],
    order: 4
  },
  {
    _id: 'service-coquerelles-en',
    _type: 'service',
    language: 'en',
    title: 'Cockroaches',
    slug: { _type: 'slug', current: 'cockroaches' },
    summary: 'At home or in a restaurant, we eliminate cockroaches at the source and keep your kitchen in good standing, discreetly.',
    meta: 'Residential and commercial',
    image: {
      _type: 'figure',
      alt: 'Applying a gel treatment in a kitchen against cockroaches.',
      label: 'Cockroaches',
      caption: 'Cockroaches',
      ratio: '4/3'
    },
    intro: [
      'Spotting a cockroach in the kitchen, especially at night, often means there are more well hidden. They breed fast and find water and food in the places you never look.',
      "We treat at the source, in the cracks and behind the appliances, with a targeted method that follows the insect's cycle. For restaurants and businesses, we work discreetly, outside busy hours."
    ],
    benefits: [
      {
        _key: 'benefit-1',
        _type: 'serviceBenefit',
        title: 'Targeted treatment',
        body: "We go after the cockroaches' hiding spots and travel routes rather than spraying at random. More effective, and cleaner."
      },
      {
        _key: 'benefit-2',
        _type: 'serviceBenefit',
        title: 'Commercial discretion',
        body: 'For restaurants and businesses, we work outside opening hours, in confidence, to protect your reputation.'
      },
      {
        _key: 'benefit-3',
        _type: 'serviceBenefit',
        title: 'Advice that holds',
        body: 'We show you the attractants to get rid of so the kitchen stays a place where cockroaches have no reason to be.'
      }
    ],
    detail: serviceDetail(),
    related: [
      { _key: 'restaurant-coquerelles-vieux-levis', _type: 'reference', _ref: 'project-restaurant-coquerelles-en' }
    ],
    order: 5
  },

  // ── Interventions ─────────────────────────────────────────────────────────
  {
    _id: 'project-restaurant-coquerelles-en',
    _type: 'project',
    language: 'en',
    title: 'Old Lévis restaurant: cockroaches eradicated',
    slug: { _type: 'slug', current: 'old-levis-restaurant-cockroaches' },
    excerpt: 'An established restaurant in Old Lévis dealing with cockroaches, brought back into good standing in two discreet visits, outside service hours.',
    cover: {
      _type: 'figure',
      alt: 'A clean, clear restaurant kitchen after the cockroach treatment.',
      label: 'Old Lévis restaurant',
      caption: 'Commercial job, 4:3',
      ratio: '4/3'
    },
    gallery: [
      {
        _key: 'cuisine',
        _type: 'figure',
        alt: 'Commercial kitchen inspected behind the appliances and along the baseboards.',
        label: 'Kitchen inspection',
        caption: 'Inspection, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'traitement',
        _type: 'figure',
        alt: 'Gel applied in the cracks and travel routes of the cockroaches.',
        label: 'Targeted treatment',
        caption: 'Treatment, 4:5',
        ratio: '4/5'
      }
    ],
    location: 'Lévis (Old Lévis)',
    year: '2024',
    challenge: 'A neighbourhood restaurant was seeing cockroaches in the evening, mostly behind the kitchen equipment. The owner wanted the situation handled fast and discreetly, before his inspection.',
    solution: 'A full inspection after closing, a targeted gel treatment in the cracks, behind the appliances and along the lines, then a second check-up visit. All of it outside service hours.',
    result: 'No cockroaches in sight after the second visit. The restaurant passed its inspection without a single note, and stays under preventive follow-up.',
    stats: [
      { _key: 'delai', _type: 'projectStat', label: 'Response', value: '24 hrs' },
      { _key: 'visites', _type: 'projectStat', label: 'Visits', value: '2' },
      { _key: 'resultat', _type: 'projectStat', label: 'Result', value: '0 pests' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-coquerelles-en' },
    testimonial: { _type: 'reference', _ref: 'testimonial-marc-andre-en' },
    featured: true,
    order: 1
  },
  {
    _id: 'project-duplex-punaises-en',
    _type: 'project',
    language: 'en',
    title: 'Charny duplex: bed bugs, heat treatment',
    slug: { _type: 'slug', current: 'charny-duplex-bed-bugs' },
    excerpt: 'A duplex in Charny cleared of its bed bugs in a single day thanks to the heat treatment, without the occupants having to throw out their furniture.',
    cover: {
      _type: 'figure',
      alt: 'A bedroom prepared for a heat treatment against bed bugs.',
      label: 'Charny duplex',
      caption: 'Heat treatment, 4:3',
      ratio: '4/3'
    },
    gallery: [
      {
        _key: 'inspection',
        _type: 'figure',
        alt: 'Inspecting mattress seams and baseboards for bed bugs.',
        label: 'Inspection',
        caption: 'Detection, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'chaleur',
        _type: 'figure',
        alt: 'Heat treatment equipment in place in a room of the duplex.',
        label: 'Bringing up the heat',
        caption: 'Treatment, 4:5',
        ratio: '4/5'
      }
    ],
    location: 'Charny',
    year: '2024',
    challenge: 'A family in the duplex had been waking up with bites for weeks. The fear of losing everything, furniture and mattress, only added to the stress.',
    solution: 'An inspection to confirm the infestation and its extent, then a heat treatment of the affected unit, raising the temperature past the lethal threshold for eggs and adults alike, all in one day.',
    result: 'No more bites starting the very next night. A check-up visit confirmed full elimination, and not a single piece of furniture had to be thrown out.',
    stats: [
      { _key: 'delai', _type: 'projectStat', label: 'Treatment', value: '1 day' },
      { _key: 'meubles', _type: 'projectStat', label: 'Furniture tossed', value: 'None' },
      { _key: 'resultat', _type: 'projectStat', label: 'Result', value: '0 pests' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-punaises-en' },
    testimonial: { _type: 'reference', _ref: 'testimonial-patrick-en' },
    featured: true,
    order: 2
  },
  {
    _id: 'project-entrepot-rongeurs-en',
    _type: 'project',
    language: 'en',
    title: 'Saint-Romuald warehouse: rodent program',
    slug: { _type: 'slug', current: 'saint-romuald-warehouse-rodents' },
    excerpt: 'A warehouse in Saint-Romuald protected from mice through a program of stations and sealed entry points, with regular follow-up.',
    cover: {
      _type: 'figure',
      alt: 'A rodent control station installed along a warehouse wall.',
      label: 'Saint-Romuald warehouse',
      caption: 'Rodent program, 16:9',
      ratio: '16/9'
    },
    gallery: [
      {
        _key: 'station',
        _type: 'figure',
        alt: 'A safe monitoring station placed along a travel route.',
        label: 'Monitoring station',
        caption: 'Device, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'scellement',
        _type: 'figure',
        alt: 'Sealing an entry point along the warehouse foundation.',
        label: 'Sealing the entry points',
        caption: 'Prevention, 4:5',
        ratio: '4/5'
      }
    ],
    location: 'Saint-Romuald',
    year: '2023',
    challenge: 'Mice were getting into a warehouse stockroom, damaging inventory and worrying the team. The large loading-dock doors made control tricky.',
    solution: 'Mapping the entry points, sealing the passages along the foundations and the docks, then setting up a network of safe stations with regular monitoring visits.',
    result: 'No sign of activity after the first month. The follow-up program keeps the warehouse under control and protects the inventory on an ongoing basis.',
    stats: [
      { _key: 'suivi', _type: 'projectStat', label: 'Follow-up', value: '60 days' },
      { _key: 'stations', _type: 'projectStat', label: 'Stations', value: '18' },
      { _key: 'resultat', _type: 'projectStat', label: 'Result', value: '0 pests' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-rongeurs-en' },
    testimonial: { _type: 'reference', _ref: 'testimonial-julie-en' },
    featured: true,
    order: 3
  },
  {
    _id: 'project-maison-fourmis-en',
    _type: 'project',
    language: 'en',
    title: 'Saint-Nicolas home: carpenter ants stopped',
    slug: { _type: 'slug', current: 'saint-nicolas-carpenter-ants' },
    excerpt: 'Carpenter ants settled in a basement beam, treated at the source before the wood damage could get worse.',
    cover: {
      _type: 'figure',
      alt: 'A wooden beam inspected for carpenter ant galleries.',
      label: 'Saint-Nicolas home',
      caption: 'Carpenter ants, 4:3',
      ratio: '4/3'
    },
    gallery: [
      {
        _key: 'poutre',
        _type: 'figure',
        alt: 'Galleries tunnelled by carpenter ants in a beam.',
        label: 'Damage to the wood',
        caption: 'Diagnosis, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'pourtour',
        _type: 'figure',
        alt: 'Inspecting the outside perimeter of the house in search of the nest.',
        label: 'Locating the nest',
        caption: 'Inspection, 4:3',
        ratio: '4/3'
      }
    ],
    location: 'Saint-Nicolas',
    year: '2023',
    challenge: 'A homeowner could hear scratching in a basement beam and worried about the structure of her house without knowing the scope of the problem.',
    solution: 'Locating the main nest and the satellite nests, a targeted treatment at the source, an assessment of the wood damage and sealing of the exterior entry points.',
    result: 'Activity stopped within days. The structure was still sound, and a check-up confirmed that no new colony had moved back in.',
    stats: [
      { _key: 'delai', _type: 'projectStat', label: 'Response', value: '24 hrs' },
      { _key: 'structure', _type: 'projectStat', label: 'Structure', value: 'Preserved' },
      { _key: 'resultat', _type: 'projectStat', label: 'Result', value: '0 pests' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-fourmis-en' },
    testimonial: { _type: 'reference', _ref: 'testimonial-genevieve-en' },
    featured: false,
    order: 4
  },
  {
    _id: 'project-garderie-guepes-en',
    _type: 'project',
    language: 'en',
    title: 'Lévis daycare: big wasp nest removed',
    slug: { _type: 'slug', current: 'levis-daycare-wasp-nest' },
    excerpt: 'A big wasp nest above the entrance of a Lévis daycare, safely removed the same day as the call.',
    cover: {
      _type: 'figure',
      alt: 'A daycare entrance cleared after the safe removal of a wasp nest.',
      label: 'Lévis daycare',
      caption: 'Nest removal, 4:3',
      ratio: '4/3'
    },
    gallery: [
      {
        _key: 'nid',
        _type: 'figure',
        alt: 'A big wasp nest lodged under an eave, above a door.',
        label: 'The nest before removal',
        caption: 'Situation, 4:5',
        ratio: '4/5'
      },
      {
        _key: 'retrait',
        _type: 'figure',
        alt: 'A geared-up technician carrying out the safe removal of the nest.',
        label: 'Safe removal',
        caption: 'Intervention, 4:5',
        ratio: '4/5'
      }
    ],
    location: 'Lévis',
    year: '2024',
    challenge: 'A sizeable wasp nest had formed right above a daycare door, on the daily path of the children and staff.',
    solution: 'A same-day visit, full removal of the nest with protective gear while the area was cleared, then treatment of the attachment point to prevent any rebuilding.',
    result: 'The entrance was safe by the end of the visit. No stings, and no colony returning to the same spot at the end-of-season follow-up.',
    stats: [
      { _key: 'delai', _type: 'projectStat', label: 'Response', value: 'Same day' },
      { _key: 'securite', _type: 'projectStat', label: 'Children', value: 'Kept safe' },
      { _key: 'resultat', _type: 'projectStat', label: 'Result', value: '0 pests' }
    ],
    detail: projectDetail(),
    service: { _type: 'reference', _ref: 'service-guepes-en' },
    testimonial: { _type: 'reference', _ref: 'testimonial-sophie-en' },
    featured: false,
    order: 5
  }
]
