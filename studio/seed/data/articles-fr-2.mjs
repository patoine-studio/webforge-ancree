// Seed Sanity: articles FR, lot 2 de 2 (les 3 derniers du tableau ARTICLES de la
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
    _id: 'article-guepes-abeilles-fr',
    _type: 'article',
    language: 'fr',
    title: 'Guêpes, frelons ou abeilles: savoir les distinguer',
    slug: { _type: 'slug', current: 'guepes-frelons-ou-abeilles' },
    excerpt: "Toutes les bestioles jaune et noir ne se valent pas. Reconnaître ce qui bourdonne autour de chez vous, c'est déjà savoir quoi faire, et qui appeler.",
    cover: {
      _type: 'figure',
      alt: "Avant-toit d'une maison de banlieue par une belle journée d'été, quelques insectes volant près d'une corniche en bois.",
      label: 'Sous la corniche',
      caption: 'Été, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-nuisibles-fr' },
    date: '2025-06-10',
    author: 'Mathieu Bouchard',
    readingTime: 5,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: "On nous appelle souvent pour des abeilles, et neuf fois sur dix ce sont des guêpes. La nuance compte: elle change ce qu'on fait, et le rôle de l'insecte dans votre cour.",
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
              { _type: 'span', _key: 'span-1', text: 'Comment les reconnaître', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "La guêpe est fine, lisse et brillante, la taille bien marquée. Elle rôde autour des poubelles, des boissons sucrées et du barbecue.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Le frelon est plus gros et plus trapu, souvent brun et jaune. Son nid prend de l'ampleur vite et se cache volontiers dans un arbre ou sous un avant-toit.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "L'abeille est velue, plus ronde, d'un jaune plus terne. Elle vous ignore et s'affaire de fleur en fleur, sans s'intéresser à votre assiette.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: "Trois silhouettes côte à côte en illustration simple: une guêpe fine, un frelon trapu et une abeille velue, sur fond clair.",
          label: 'Trois profils, trois réponses',
          caption: 'Repères, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'note',
        title: "L'abeille, on la garde",
        text: "Une colonie d'abeilles n'est pas un nuisible: c'est une alliée du jardin. Si elle s'est installée chez vous, on ne la traite pas, on vous oriente vers un apiculteur pour un déplacement. On réserve l'intervention aux guêpes et aux frelons.",
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
              { _type: 'span', _key: 'span-1', text: 'Pourquoi on évite la bombe de quincaillerie', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "Un nid de guêpes abrite des centaines d'individus, et la bombe vendue en magasin n'en atteint qu'une partie. Le reste sort, et c'est rarement de bonne humeur. Un nid en hauteur, près d'une entrée ou d'une zone de jeu, ça ne se règle pas du haut d'un escabeau.", marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "On intervient avec l'équipement de protection et le produit homologué qu'il faut, on retire le nid quand c'est possible, et on revient si une nouvelle activité reparaît. C'est couvert par la garantie de résultat.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: "Un nid près de chez vous? On le retire en sécurité.",
        cta: {
          _type: 'link',
          label: 'Voir le service Guêpes et frelons',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-guepes-fr' },
        },
      },
    ],
  },
  {
    _id: 'article-coquerelles-cuisine-fr',
    _type: 'article',
    language: 'fr',
    title: 'Des coquerelles dans la cuisine: quoi faire ce soir',
    slug: { _type: 'slug', current: 'coquerelles-dans-la-cuisine' },
    excerpt: "En voir une le soir, c'est rarement un hasard. Voici les bons gestes pour ce soir, ceux à éviter, et le moment où ça vaut un appel.",
    cover: {
      _type: 'figure',
      alt: "Cuisine résidentielle propre éclairée le soir, comptoir dégagé, lampe allumée au-dessus de l'évier.",
      label: 'Cuisine, le soir',
      caption: 'À la maison, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-maison-saine-fr' },
    date: '2025-05-15',
    author: 'Mathieu Bouchard',
    readingTime: 4,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: "Voir une coquerelle filer sous le four, ça serre le cœur. Respirez: une, ce n'est pas une invasion. Mais c'est un signal qu'il vaut mieux ne pas ignorer.",
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
              { _type: 'span', _key: 'span-1', text: 'Ce soir, faites ceci', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Rangez la nourriture dans des contenants fermés et essuyez le comptoir. Une coquerelle cherche d'abord à manger et à boire.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Sortez les déchets et le compost, et videz l'eau qui traîne au fond de l'évier ou dans la soucoupe d'une plante.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Notez où vous l'avez vue et à quelle heure. Ça nous aide à cibler l'intervention le lendemain.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'warning',
        title: "Le piège de la bombe insecticide",
        text: "La bombe vendue en magasin disperse les coquerelles dans les murs au lieu de les régler, et complique le traitement ciblé qui suit. Si vous en avez une sous la main, gardez-la pour un cas isolé, pas pour une cuisine entière.",
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
              { _type: 'span', _key: 'span-1', text: 'Quand ça vaut un appel', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "En voir plusieurs, en voir en plein jour, ou en trouver de petites: ce sont des signes qu'une population s'installe. Là, le ménage seul ne suffit plus. Un traitement ciblé en cuisine règle le problème à la source, sans vider vos armoires de produits.", marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "On pose des gels appâts en points précis, là où la famille et les animaux ne vont pas. Pas de nuage de produit dans la pièce, pas besoin de tout vider la veille. On revient vérifier, et c'est couvert par la garantie.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleQuote',
        _key: 'q1',
        quote: "Une coquerelle vue le soir, c'est un appel le lendemain matin, pas une nuit blanche.",
        attribution: 'Mathieu Bouchard',
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: "On en a vu plus d'une? On s'occupe de la cuisine.",
        cta: {
          _type: 'link',
          label: 'Voir le service Coquerelles',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-coquerelles-fr' },
        },
      },
    ],
  },
  {
    _id: 'article-grenier-rongeurs-fr',
    _type: 'article',
    language: 'fr',
    title: 'Des bruits dans le grenier: ce que ça veut dire',
    slug: { _type: 'slug', current: 'bruits-dans-le-grenier' },
    excerpt: "Des grattements la nuit au-dessus du plafond, c'est rarement le vent. Voici comment lire ces bruits et savoir s'il faut s'en occuper.",
    cover: {
      _type: 'figure',
      alt: "Plafond de chambre vu d'en bas la nuit, faisceau d'une lampe de poche dirigé vers la trappe d'accès au grenier.",
      label: 'Au-dessus du plafond',
      caption: 'La nuit, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-maison-saine-fr' },
    date: '2025-04-08',
    author: 'Mathieu Bouchard',
    readingTime: 5,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: "Vous êtes couché, et ça gratte au-dessus de votre tête. Pas le vent, pas la tuyauterie: quelque chose se déplace dans le grenier. Voici comment décoder ce que vous entendez.",
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
              { _type: 'span', _key: 'span-1', text: 'Lire les bruits', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "De petits grattements rapides, surtout au coucher du soleil et à l'aube: souvent des souris, qui sont les plus actives à ces heures-là.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Des pas plus lourds ou des roulements: un visiteur plus gros, comme un écureuil, qui passe par une ouverture de toiture.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Un grignotage régulier dans le mur: des dents qui usent un câble ou une poutre. Celui-là, on ne le laisse pas traîner.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: "Coin de grenier vu en plongée, isolant tassé et petite ouverture de lumière le long d'une solive.",
          label: "Le point d'entrée",
          caption: 'Inspection, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'warning',
        title: 'Pourquoi on agit sans tarder',
        text: "Les rongeurs rongent, et dans un grenier ils trouvent des câbles électriques. Une isolation souillée perd son efficacité, et l'humidité de leurs allées et venues n'aide pas. Ce n'est pas une urgence de minuit, mais ce n'est pas un projet à remettre au printemps non plus.",
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
              { _type: 'span', _key: 'span-1', text: 'Notre façon de faire', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "On commence par une inspection du grenier et du tour de la maison pour trouver par où ça entre. Une souris passe dans un trou de la taille d'un dix sous: c'est là que se gagne ou se perd la bataille.", marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "Ensuite on traite, puis on scelle les accès pour que ça ne revienne pas. Un suivi confirme que le grenier est redevenu silencieux. Le but, ce n'est pas juste ce soir: c'est que vous n'y repensiez plus.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: "Ça gratte au-dessus de votre tête? On vient écouter.",
        cta: {
          _type: 'link',
          label: 'Voir le service Souris et rats',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-rongeurs-fr' },
        },
      },
    ],
  },
]
