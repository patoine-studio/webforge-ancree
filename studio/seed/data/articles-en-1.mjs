// Seed Sanity: articles EN, lot 1 de 2 (les 3 premiers du tableau ARTICLES de la
// bible §4, ordre antichronologique). Documents `article` complets: title, slug,
// excerpt, cover (figure, ratio explicite), category (référence même langue),
// date, author, readingTime et body (blocs article). Pas de champ order: le tri
// se fait par date.
//
// Conversion du body vers Sanity:
// - 'lead'       -> articleLead { text }
// - 'rich-text'  -> articleRichText { body: Portable Text }; paragraph -> block
//                   'normal', heading -> block 'h2', list -> un block par item
//                   (listItem 'bullet', level 1, style 'normal')
// - 'image'      -> articleImage { image: figure } (placeholders sans src: champ
//                   image du figure OMIS, alt/label/caption/ratio gardés)
// - 'quote'      -> articleQuote { quote, attribution }
// - 'callout'    -> articleCallout { tone, title, text }
// - 'inline-cta' -> articleInlineCta { text, cta: link } (href -> référence interne)
//
// Politique d'images (bible §3): les figures portent alt/label/caption/ratio mais
// PAS de champ image (donc aucun marqueur { _imagePath }). Les vraies images
// seront ajoutées dans une passe ultérieure.

export const docs = [
  {
    _id: 'article-souris-automne-en',
    _type: 'article',
    language: 'en',
    title: 'Keeping mice out this fall',
    slug: { _type: 'slug', current: 'keep-mice-out-this-fall' },
    excerpt: 'As soon as the nights turn cool, mice start looking for a roof over their heads. Here is how to shut the door before they settle in.',
    cover: {
      _type: 'figure',
      alt: 'Corner of a suburban home foundation in the fall, dead leaves on the ground and the base of the wall where entry points are being inspected.',
      label: 'Foundation inspection',
      caption: 'Prevention, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-prevention-en' },
    date: '2025-09-22',
    author: 'Mathieu Bouchard',
    readingTime: 5,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: 'Every fall it is the same story around the Quebec City region: the moment the temperature drops, mice set out to find a warm place to spend the winter. The good news is that most entry points can be sealed off in a single morning, and a little prevention saves you a lot of trouble.',
      },
      {
        _type: 'articleRichText',
        _key: 'r1',
        body: [
          {
            _type: 'block',
            _key: 'r1-b1',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'An adult mouse can slip through an opening the size of a dime. Around a house, those openings are everywhere: around the pipes and wires that run into the basement, the bottom of garage doors, basement windows, poorly fitted dryer vents. You do not have to seal everything at once, but starting with the most obvious ones already makes a real difference.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'The right habit is to walk around your foundation at the end of summer, flashlight in hand. You are looking for daylight coming through, cracks, corners where the screen has come loose. Wherever your pinky fits, a mouse fits too.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleQuote',
        _key: 'q1',
        quote: 'A mouse gets in wherever your pinky gets in. Block the entry before fall, and you solve the problem before it even starts.',
        attribution: 'Mathieu Bouchard',
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
              { _type: 'span', _key: 'span-1', text: 'The spots to check first', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Around the pipes and wires that pass through the foundation wall: seal them with steel wool and a proper sealant, never with foam alone, which a mouse chews through with ease.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'The bottom of garage and service doors: a weatherstrip in good shape closes off a passage mice almost always use.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b4',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Dryer and ventilation vents: a fine mesh screen lets the air through but not the rodents.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b5',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'The pantry and the pet food: store seeds and kibble in airtight containers, and you take away the main reason for their visit.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: 'Base of a foundation wall where a pipe passage has been sealed with steel wool, ready for the sealant to go on.',
          label: 'Sealed pipe passage',
          caption: 'Prevention, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'note',
        title: 'The signs that never lie',
        text: 'Small dark droppings along the baseboards, scratching sounds in the walls in the evening, food bags nibbled at the back of the cupboard. If you notice even one of these signs, you already have company. Better to act early: one mouse quickly becomes a family.',
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'Sounds in the walls or droppings in the basement? We will come take a look.',
        cta: {
          _type: 'link',
          label: 'Call 418 555 0147',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'contactPage-en' },
        },
      },
    ],
  },
  {
    _id: 'article-fourmis-charpentieres-en',
    _type: 'article',
    language: 'en',
    title: 'Preventing carpenter ants around the house',
    slug: { _type: 'slug', current: 'prevent-carpenter-ants' },
    excerpt: 'Carpenter ants do not eat wood, but they hollow it out. Here is how to take away any urge they have to move into your walls.',
    cover: {
      _type: 'figure',
      alt: 'Outdoor corner of a wood-sided house where the siding meets the ground, a damp and shaded spot that carpenter ants favour.',
      label: 'Siding and ground',
      caption: 'Prevention, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-prevention-en' },
    date: '2025-06-05',
    author: 'Mathieu Bouchard',
    readingTime: 5,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: 'Contrary to what people think, carpenter ants do not feed on wood: they hollow it out to house their colony. The result, though, is very real, and it is best to discourage them before they have chosen your home.',
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
              { _type: 'span', _key: 'span-1', text: 'What attracts them', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Carpenter ants are after one thing above all: wood softened by moisture. A beam that has taken on water, a window frame exposed to the weather, a stretch of siding in contact with the ground. Sound, dry wood holds no interest for them; it is the moisture that opens the door.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b3',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'The steps that keep them away', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: 'Keep firewood away from the house and store it up on a rack, never right on the ground against a wall.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b5',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Trim back branches that touch the roof or the siding: they serve as a bridge for the colonies.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b6',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Repair overflowing gutters and leaks that soak the structural wood without delay.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b7',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Keep a gap between the soil, the mulch and the bottom of the siding, so the wood can breathe and stay dry.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleQuote',
        _key: 'q1',
        quote: 'Fix the moisture, and you fix half the carpenter ant problem before it even shows.',
        attribution: 'Mathieu Bouchard',
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: 'A stack of firewood stored on a rack, a good distance from the wall of the house.',
          label: 'Firewood kept clear',
          caption: 'Prevention, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'note',
        title: 'How to know if they are already there',
        text: 'Look for small piles of very fine sawdust, almost like shavings, at the foot of the walls or under the windows: those are the chips the ants push out as they carve their galleries. If you find some, or if you see large black ants moving around in the evening, the colony is probably established and a treatment is in order.',
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'Sawdust at the foot of the walls or large ants in the evening? Give us a shout.',
        cta: {
          _type: 'link',
          label: 'See the Ant control service',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-fourmis-en' },
        },
      },
    ],
  },
  {
    _id: 'article-punaises-reconnaitre-en',
    _type: 'article',
    language: 'en',
    title: 'Spotting bed bugs before it is too late',
    slug: { _type: 'slug', current: 'spot-bed-bugs-early' },
    excerpt: 'The sooner you catch them, the simpler the treatment. Here are the first signs to watch for, without panicking.',
    cover: {
      _type: 'figure',
      alt: 'Corner of a mattress lifted near the seam, the first place you inspect when looking for bed bugs.',
      label: 'Mattress inspection',
      caption: 'Identification, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-nuisibles-en' },
    date: '2025-04-14',
    author: 'Mathieu Bouchard',
    readingTime: 6,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: 'One thing to keep in mind first: having bed bugs has nothing to do with cleanliness. They travel in luggage, in clothing, in second-hand furniture, and anyone can bring some home. What matters is catching them early, because a small new outbreak is far easier to treat than an infestation that has settled in.',
      },
      {
        _type: 'articleRichText',
        _key: 'r1',
        body: [
          {
            _type: 'block',
            _key: 'r1-b1',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'An adult bed bug is about the size and colour of an apple seed: reddish brown, flat, oval. It hides during the day and comes out at night. That is why you rarely see one directly; mostly you notice the traces it leaves behind.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'The first signs to watch for', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: 'Small black specks, like pen dots, along the seams of the mattress and the box spring.', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: 'Small reddish stains on the sheets, especially first thing in the morning.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b5',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Bites in a line or a cluster on the skin, often on the arms and legs, that appear overnight.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b6',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Tiny translucent skins left behind in the folds of the mattress, near the headboard.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: 'A mattress seam examined up close, looking for the telltale small dark specks.',
          label: 'Mattress seam',
          caption: 'Identification, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleQuote',
        _key: 'q1',
        quote: 'Caught early, bed bugs are quick to deal with. It is the waiting that complicates everything, never moving fast.',
        attribution: 'Mathieu Bouchard',
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
              { _type: 'span', _key: 'span-1', text: 'Where to look first', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Start with the bed, it is their headquarters. Lift the corners of the mattress and inspect the seams, then the box spring and the frame. From there, widen out to the nightstand, the baseboards behind the headboard and the nearest armchair. A flashlight and a bit of patience are enough for a first look.', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'If you are back from a trip, this is the right time to check your luggage before putting it away. And above all, avoid moving your things from one room to another at the slightest doubt: you risk spreading the problem rather than containing it.', marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'note',
        title: 'At the slightest doubt, move nothing',
        text: 'The natural reflex is to toss the mattress or move everything into another room. That is exactly what helps the bed bugs spread. Keep things where they are, sleep in your bed as usual, and call us: an inspection quickly confirms whether there is anything to deal with and how far it has gone.',
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'A doubt after a trip or bites in the morning? We confirm it with an inspection.',
        cta: {
          _type: 'link',
          label: 'See the Bed bug service',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-punaises-en' },
        },
      },
    ],
  },
]
