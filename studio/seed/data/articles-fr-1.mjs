// Seed Sanity: articles FR, lot 1 de 2 (les 3 premiers du tableau ARTICLES de la
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
    _id: 'article-souris-automne-fr',
    _type: 'article',
    language: 'fr',
    title: "Empêcher les souris d'entrer cet automne",
    slug: { _type: 'slug', current: 'empecher-souris-cet-automne' },
    excerpt: "Dès que les nuits fraîchissent, les souris cherchent un toit. Voici comment leur fermer la porte avant qu'elles ne s'installent chez vous.",
    cover: {
      _type: 'figure',
      alt: "Coin de fondation d'une maison de banlieue en automne, feuilles mortes au sol et bas de mur où s'inspectent les points d'entrée.",
      label: 'Inspection de fondation',
      caption: 'Prévention, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-prevention-fr' },
    date: '2025-09-22',
    author: 'Mathieu Bouchard',
    readingTime: 5,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: "Chaque automne, c'est la même chose dans la région de Québec: dès que le mercure baisse, les souris se mettent en quête d'un endroit chaud pour passer l'hiver. La bonne nouvelle, c'est que la plupart des entrées se bloquent en une avant-midi, et qu'un peu de prévention vous évite bien des soucis.",
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
              { _type: 'span', _key: 'span-1', text: "Une souris adulte passe par une ouverture de la taille d'une pièce de dix sous. Autour d'une maison, ces ouvertures sont partout: le pourtour des tuyaux et des fils qui entrent au sous-sol, le bas des portes de garage, les soupiraux, les évents de sécheuse mal ajustés. Vous n'avez pas à tout colmater d'un coup, mais commencer par les plus évidents change déjà beaucoup de choses.", marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "Le bon réflexe, c'est de faire le tour de votre fondation à la fin de l'été, lampe de poche en main. Vous cherchez la lumière du jour qui passe, les fissures, les coins de moustiquaire décollée. Là où votre petit doigt entre, une souris entre aussi.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleQuote',
        _key: 'q1',
        quote: "Une souris passe là où votre petit doigt passe. Bloquez l'entrée avant l'automne, et vous réglez le problème avant qu'il commence.",
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
              { _type: 'span', _key: 'span-1', text: 'Les points à vérifier en premier', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Le contour des tuyaux et des fils qui traversent le mur de fondation: scellez avec de la laine d'acier et un scellant adapté, jamais avec de la mousse seule, qu'une souris ronge sans peine.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Le bas des portes de garage et de service: un coupe-froid en bon état ferme un passage que les souris empruntent presque toujours.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Les évents de sécheuse et de ventilation: un grillage fin laisse passer l'air mais pas les rongeurs.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Le garde-manger et la nourriture pour animaux: rangez les graines et les croquettes dans des contenants hermétiques, et vous retirez la raison principale de leur visite.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: "Bas de mur de fondation où un passage de tuyau a été scellé avec de la laine d'acier, prêt à recevoir le scellant.",
          label: 'Passage de tuyau scellé',
          caption: 'Prévention, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'note',
        title: 'Les signes qui ne trompent pas',
        text: "Petites crottes sombres le long des plinthes, bruits de grattage dans les murs le soir, sachets de nourriture grignotés au fond de l'armoire. Si vous remarquez un seul de ces signes, il y a déjà de la visite. Mieux vaut agir tôt: une souris devient vite une famille.",
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'Des bruits dans les murs ou des crottes au sous-sol? On vient voir.',
        cta: {
          _type: 'link',
          label: 'Appeler le 418 555 0147',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'contactPage-fr' },
        },
      },
    ],
  },
  {
    _id: 'article-fourmis-charpentieres-fr',
    _type: 'article',
    language: 'fr',
    title: 'Prévenir les fourmis charpentières autour de la maison',
    slug: { _type: 'slug', current: 'prevenir-fourmis-charpentieres' },
    excerpt: "Les fourmis charpentières ne mangent pas le bois, mais elles le creusent. Voici comment leur enlever l'envie de s'installer dans vos murs.",
    cover: {
      _type: 'figure',
      alt: "Coin extérieur d'une maison en bois où le revêtement rencontre le sol, zone humide et ombragée propice aux fourmis charpentières.",
      label: 'Revêtement et sol',
      caption: 'Prévention, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-prevention-fr' },
    date: '2025-06-05',
    author: 'Mathieu Bouchard',
    readingTime: 5,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: "Contrairement à ce qu'on pense, les fourmis charpentières ne se nourrissent pas du bois: elles le creusent pour y loger leur colonie. Le résultat, lui, est bien réel, et il vaut mieux les décourager avant qu'elles n'aient choisi votre maison.",
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
              { _type: 'span', _key: 'span-1', text: 'Ce qui les attire', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "Les fourmis charpentières cherchent une chose avant tout: du bois ramolli par l'humidité. Une poutre qui a pris l'eau, un cadrage de fenêtre exposé aux intempéries, une section de revêtement en contact avec le sol. Le bois sain et sec ne les intéresse pas; c'est l'humidité qui leur ouvre la porte.", marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b3',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Les gestes qui les découragent', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Éloignez le bois de chauffage de la maison et rangez-le sur un support, jamais à même le sol contre un mur.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Taillez les branches qui touchent la toiture ou le revêtement: elles servent de pont aux colonies.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Réparez sans tarder les gouttières qui débordent et les fuites qui mouillent le bois de structure.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Gardez un dégagement entre la terre, le paillis et le bas du revêtement, pour que le bois respire et reste sec.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleQuote',
        _key: 'q1',
        quote: "Réglez l'humidité, et vous réglez la moitié du problème de fourmis charpentières avant même qu'il paraisse.",
        attribution: 'Mathieu Bouchard',
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: 'Cordée de bois de chauffage rangée sur un support, à bonne distance du mur de la maison.',
          label: 'Bois de chauffage dégagé',
          caption: 'Prévention, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'note',
        title: 'Comment savoir si elles sont déjà là',
        text: "Cherchez de petits tas de sciure très fine, comme du bran de scie, au pied des murs ou sous les fenêtres: ce sont les copeaux que les fourmis rejettent en creusant leurs galeries. Si vous en trouvez, ou si vous voyez de grosses fourmis noires circuler le soir, la colonie est probablement installée et un traitement s'impose.",
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'De la sciure au pied des murs ou de grosses fourmis le soir? Faites-nous signe.',
        cta: {
          _type: 'link',
          label: 'Voir le service Fourmis',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-fourmis-fr' },
        },
      },
    ],
  },
  {
    _id: 'article-punaises-reconnaitre-fr',
    _type: 'article',
    language: 'fr',
    title: "Reconnaître les punaises de lit avant qu'il soit trop tard",
    slug: { _type: 'slug', current: 'reconnaitre-punaises-de-lit' },
    excerpt: "Plus on les repère tôt, plus le traitement est simple. Voici les premiers signes à surveiller, sans paniquer.",
    cover: {
      _type: 'figure',
      alt: "Coin de matelas soulevé près de la couture, zone que l'on inspecte en premier pour repérer les punaises de lit.",
      label: 'Inspection de matelas',
      caption: 'Reconnaître, 16:9',
      ratio: '16/9',
    },
    category: { _type: 'reference', _ref: 'category-nuisibles-fr' },
    date: '2025-04-14',
    author: 'Mathieu Bouchard',
    readingTime: 6,
    body: [
      {
        _type: 'articleLead',
        _key: 'l1',
        text: "Une chose à retenir d'abord: avoir des punaises de lit n'a rien à voir avec la propreté. Elles voyagent dans les bagages, les vêtements, les meubles d'occasion, et n'importe qui peut en ramener. Ce qui compte, c'est de les repérer tôt, car un foyer débutant se traite bien plus facilement qu'une infestation installée.",
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
              { _type: 'span', _key: 'span-1', text: "La punaise de lit adulte est de la taille et de la couleur d'un pépin de pomme: brun rougeâtre, plate, ovale. Elle se cache le jour et sort la nuit. C'est pour ça qu'on la voit rarement directement; on remarque surtout les traces qu'elle laisse derrière elle.", marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r1-b2',
            style: 'h2',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: 'Les premiers signes à surveiller', marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "De petites taches noires, comme des points de stylo, le long des coutures du matelas et du sommier.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "De petites taches rougeâtres sur les draps, surtout au réveil.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "Des piqûres alignées ou groupées sur la peau, souvent aux bras et aux jambes, qui apparaissent la nuit.", marks: [] },
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
              { _type: 'span', _key: 'span-1', text: "De minuscules peaux translucides abandonnées dans les replis du matelas, près de la tête de lit.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleImage',
        _key: 'i1',
        image: {
          _type: 'figure',
          alt: "Couture de matelas examinée de près, à la recherche des petites taches sombres caractéristiques.",
          label: 'Couture de matelas',
          caption: 'Reconnaître, 4:3',
          ratio: '4/3',
        },
      },
      {
        _type: 'articleQuote',
        _key: 'q1',
        quote: "Repérées tôt, les punaises de lit se règlent vite. C'est l'attente qui complique tout, jamais la rapidité.",
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
              { _type: 'span', _key: 'span-1', text: 'Où regarder en premier', marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b2',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "Commencez par le lit, c'est leur quartier général. Soulevez les coins du matelas et inspectez les coutures, puis le sommier et le cadre. Élargissez ensuite à la table de chevet, aux plinthes derrière la tête de lit et au fauteuil le plus proche. Une lampe de poche et un peu de patience suffisent pour un premier coup d'œil.", marks: [] },
            ],
          },
          {
            _type: 'block',
            _key: 'r2-b3',
            style: 'normal',
            markDefs: [],
            children: [
              { _type: 'span', _key: 'span-1', text: "Si vous revenez de voyage, c'est le bon moment pour vérifier vos bagages avant de les ranger. Et surtout, évitez de déplacer vos affaires d'une pièce à l'autre au moindre doute: on risque de répandre le problème plutôt que de le contenir.", marks: [] },
            ],
          },
        ],
      },
      {
        _type: 'articleCallout',
        _key: 'co1',
        tone: 'note',
        title: 'Au moindre doute, ne bougez rien',
        text: "Le réflexe naturel est de jeter le matelas ou de tout déménager dans une autre chambre. C'est justement ce qui aide les punaises à se disperser. Gardez les choses en place, dormez dans votre lit comme d'habitude, et appelez-nous: une inspection confirme rapidement s'il y a lieu d'intervenir et jusqu'où ça va.",
      },
      {
        _type: 'articleInlineCta',
        _key: 'c1',
        text: 'Un doute après un voyage ou des piqûres au réveil? On confirme par une inspection.',
        cta: {
          _type: 'link',
          label: 'Voir le service Punaises de lit',
          type: 'internal',
          internalRef: { _type: 'reference', _ref: 'service-punaises-fr' },
        },
      },
    ],
  },
]
