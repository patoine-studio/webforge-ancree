// Seed Sanity: articles EN, lot 2 de 2 (les 3 derniers du tableau ARTICLES de la
// bible Rempart, section 4, ordre antichronologique). Documents `article` complets:
// title, slug, excerpt, cover (figure, ratio explicite), category (référence même
// langue), date, author, readingTime et body (types de blocs article). Pas de champ
// order: le tri se fait par date.
//
// Conversion du body vers Sanity:
// - 'lead'       -> articleLead { text }
// - 'rich-text'  -> articleRichText { body: Portable Text }; paragraph -> block
//                   'normal', heading -> block 'h2', list -> un block par item
//                   (listItem 'bullet', level 1, style 'normal')
// - 'image'      -> articleImage { image: figure } (placeholders sans src:
//                   champ image du figure OMIS, alt/label/caption/ratio gardés)
// - 'quote'      -> articleQuote { quote, attribution }
// - 'callout'    -> articleCallout { tone, title, text }
// - 'inline-cta' -> articleInlineCta { text, cta: link } (référence interne)
//
// Politique d'images de ce seed: aucune figure ne porte de champ image. Les
// placeholders elegants du composant <Image> rendent la maquette sans assets.

export const docs = [
  {
    _id: 'article-guepes-abeilles-en',
    _type: 'article',
    language: 'en',
    title: 'Wasps, hornets or bees: telling them apart',
    slug: { _type: 'slug', current: 'wasps-hornets-or-bees' },
    excerpt: 'Not every yellow-and-black critter is the same. Knowing what is buzzing around your place is already a big part of knowing what to do, and who to call.',
    cover: {
      _type: 'figure',
      alt: 'Eaves of a suburban home on a fine summer day, a few insects flying near a wooden cornice.',
      label: 'Under the cornice',
      caption: 'Summer, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-nuisibles-en' },
    date: '2025-06-10',
    author: 'Mathieu Bouchard',
    readingTime: 5,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: 'People call us about bees all the time, and nine times out of ten it turns out to be wasps. The difference matters: it changes what we do, and the role the insect plays in your yard.',
      },
      {
        _type: 'articleRichText',
        _key: 'r1',
        body: [
          {
            _type: 'block',
            _key: 'r1-b1',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'How to tell them apart', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'The wasp is slim, smooth and shiny, with a clearly pinched waist. It hangs around the garbage, the sweet drinks and the barbecue.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b3',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'The hornet is bigger and stockier, often brown and yellow. Its nest grows fast and likes to hide in a tree or up under the eaves.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b4',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'The bee is fuzzy, rounder, and a duller yellow. It ignores you and works from flower to flower, with no interest in your plate.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: 'Three silhouettes side by side in a simple illustration: a slim wasp, a stocky hornet and a fuzzy bee, on a light background.',
          label: 'Three profiles, three answers',
          caption: 'At a glance, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'note',
        title: 'The bee, we leave alone',
        text: 'A bee colony is not a pest: it is an ally for your garden. If one has settled in at your place, we do not treat it. We point you to a beekeeper who can relocate it. We save the treatment for wasps and hornets.',
      },
      {
        _type: 'articleRichText',
        _key: 'r2',
        body: [
          {
            _type: 'block',
            _key: 'r2-b1',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Why we skip the hardware-store spray', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'A wasp nest holds hundreds of individuals, and the can you buy at the store only reaches a fraction of them. The rest come out, and rarely in a good mood. A nest up high, near an entrance or a play area, is not something you settle from the top of a stepladder.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'We come in with the right protective gear and the right registered product, we remove the nest when it can be done, and we come back if new activity shows up. It is covered by our results guarantee.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'A nest near your place? We will remove it safely.',
        cta: {
          _type: 'link',
          label: 'See the Wasps and hornets service',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-guepes-en' },
        },
      },
    ],
  },
  {
    _id: 'article-coquerelles-cuisine-en',
    _type: 'article',
    language: 'en',
    title: 'Cockroaches in the kitchen: what to do tonight',
    slug: { _type: 'slug', current: 'cockroaches-in-the-kitchen' },
    excerpt: 'Spotting one in the evening is rarely a fluke. Here are the right moves for tonight, the ones to avoid, and the point where it is worth a call.',
    cover: {
      _type: 'figure',
      alt: 'Clean residential kitchen lit in the evening, a clear countertop, a lamp on above the sink.',
      label: 'The kitchen, at night',
      caption: 'At home, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-maison-saine-en' },
    date: '2025-05-15',
    author: 'Mathieu Bouchard',
    readingTime: 4,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: 'Watching a cockroach dart under the stove makes your heart sink. Take a breath: one is not an invasion. But it is a signal you are better off not ignoring.',
      },
      {
        _type: 'articleRichText',
        _key: 'r1',
        body: [
          {
            _type: 'block',
            _key: 'r1-b1',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Tonight, do this', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Put food away in sealed containers and wipe down the counter. A cockroach is looking for food and water first.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b3',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Take out the garbage and the compost, and empty any water sitting in the bottom of the sink or in a plant saucer.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b4',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Note where you saw it and what time it was. That helps us target the treatment the next day.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'warning',
        title: 'The insecticide-spray trap',
        text: 'The can you buy at the store scatters the cockroaches into the walls instead of dealing with them, and it complicates the targeted treatment that follows. If you have one on hand, keep it for an isolated case, not for a whole kitchen.',
      },
      {
        _type: 'articleRichText',
        _key: 'r2',
        body: [
          {
            _type: 'block',
            _key: 'r2-b1',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'When it is worth a call', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Seeing several, seeing one in broad daylight, or finding small ones: those are signs a population is settling in. At that point, cleaning alone is no longer enough. A targeted treatment in the kitchen deals with the problem at the source, without filling your cupboards with products.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'We place bait gels at precise spots, where the family and the pets do not go. No cloud of product in the room, no need to empty everything out the night before. We come back to check, and it is covered by the guarantee.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleQuote',
        _key: 'q1',
        quote: 'A cockroach seen in the evening means a call the next morning, not a sleepless night.',
        attribution: 'Mathieu Bouchard',
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'Saw more than one? We will take care of the kitchen.',
        cta: {
          _type: 'link',
          label: 'See the Cockroaches service',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-coquerelles-en' },
        },
      },
    ],
  },
  {
    _id: 'article-grenier-rongeurs-en',
    _type: 'article',
    language: 'en',
    title: 'Noises in the attic: what they mean',
    slug: { _type: 'slug', current: 'noises-in-the-attic' },
    excerpt: 'Scratching above the ceiling at night is rarely the wind. Here is how to read those sounds and tell whether you need to deal with them.',
    cover: {
      _type: 'figure',
      alt: 'Bedroom ceiling seen from below at night, a flashlight beam aimed at the attic access hatch.',
      label: 'Above the ceiling',
      caption: 'At night, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-maison-saine-en' },
    date: '2025-04-08',
    author: 'Mathieu Bouchard',
    readingTime: 5,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: 'You are lying in bed, and something is scratching above your head. Not the wind, not the plumbing: something is moving around in the attic. Here is how to decode what you are hearing.',
      },
      {
        _type: 'articleRichText',
        _key: 'r1',
        body: [
          {
            _type: 'block',
            _key: 'r1-b1',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Reading the sounds', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Small, quick scratching, mostly around dusk and dawn: often mice, which are most active at those hours.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b3',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Heavier footsteps or a rolling sound: a bigger visitor, like a squirrel, getting in through an opening in the roof.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b4',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'A steady gnawing inside the wall: teeth wearing down a cable or a beam. That one, we do not let drag on.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: 'Corner of an attic seen from above, compressed insulation and a small opening letting light in along a joist.',
          label: 'The point of entry',
          caption: 'Inspection, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'warning',
        title: 'Why we act without waiting',
        text: 'Rodents gnaw, and in an attic they find electrical cables. Soiled insulation loses its effectiveness, and the moisture from their comings and goings does not help. It is not a midnight emergency, but it is not a project to put off until spring either.',
      },
      {
        _type: 'articleRichText',
        _key: 'r2',
        body: [
          {
            _type: 'block',
            _key: 'r2-b1',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'How we go about it', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'We start with an inspection of the attic and around the house to find where they are getting in. A mouse fits through a hole the size of a dime: that is where the battle is won or lost.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Then we treat, and we seal the entry points so it does not come back. A follow-up confirms the attic has gone quiet again. The goal is not just tonight: it is that you never think about it again.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'Something scratching above your head? We will come listen.',
        cta: {
          _type: 'link',
          label: 'See the Mice and rats service',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-rongeurs-en' },
        },
      },
    ],
  },
]
