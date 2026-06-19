/* Contrat de contenu du bloc « a propos » (about) de la page-builder Ancree.
 * Miroir de ce que la transformation Sanity produira; AUCUNE valeur design ici,
 * que des champs. Bloc media-texte en zigzag: grande photo d'equipe d'un cote,
 * recit de l'autre (asymetrie posee), avec une carte de chiffres de confiance qui
 * chevauche legerement la photo. Aucun champ de numerotation: jamais de numero
 * affiche, site-wide (les chiffres de confiance sont des valeurs de contenu, pas
 * une enumeration). */

// Une statistique de confiance affichee en gros (element graphique).
export interface AboutStat {
  value: string // la valeur mise en avant, ex "18 ans"
  label: string // le qualificatif, ex "a proteger la Rive-Nord"
}

// La photo d'equipe (URL CDN deja resolue, jamais un objet asset Sanity).
export interface AboutPhoto {
  src: string
  alt: string
}

export interface AboutContent {
  eyebrow: string
  heading: string
  body: string[] // paragraphes du recit
  photo: AboutPhoto
  stats: AboutStat[] // grands chiffres de confiance (elements graphiques)
}

/* Contenu fictif de la demo Rempart Extermination. Bilingue. Ton chaud, local,
 * humain; on parle au client. Les chiffres de confiance evitent le « 4,9 Google »
 * deja present dans le heros: annees d'experience, clients servis, villes
 * desservies, techniciens certifies. */
export function aboutFixture(isEn: boolean): AboutContent {
  if (isEn) {
    return {
      eyebrow: 'Who we are',
      heading: 'A local team that treats your home like its own',
      body: [
        'Rempart Extermination was born on the Rive-Nord, between Terrebonne and Repentigny, from a simple idea: a family deserves to feel safe in its own home. When you call us, you reach people from here, who know the houses, the seasons and the pests of the region.',
        'We do not show up, spray and disappear. We take the time to understand where the problem comes from, we explain what we are doing in plain words, and we stay reachable long after the visit. That is the kind of company we would want knocking on our own door.'
      ],
      photo: {
        src: '/images/equipe-rempart.jpg',
        alt: 'The Rempart Extermination technicians standing together beside their service van'
      },
      stats: [
        { value: '18 years', label: 'protecting Rive-Nord homes' },
        { value: '6 200+', label: 'households served' },
        { value: '14 cities', label: 'covered every week' },
        { value: '9', label: 'certified technicians' }
      ]
    }
  }
  return {
    eyebrow: 'Qui on est',
    heading: 'Une équipe d’ici qui traite votre maison comme la sienne',
    body: [
      'Rempart Extermination est née sur la Rive-Nord, entre Terrebonne et Repentigny, d’une idée toute simple: une famille a le droit de se sentir en sécurité chez elle. Quand vous nous appelez, vous parlez à du monde d’ici, qui connaît les maisons, les saisons et les nuisibles de la région.',
      'On ne fait pas qu’arriver, pulvériser et disparaître. On prend le temps de comprendre d’où vient le problème, on vous explique chaque geste dans des mots clairs, et on reste joignable bien après la visite. C’est le genre d’entreprise qu’on voudrait voir cogner à notre propre porte.'
    ],
    photo: {
      src: '/images/equipe-rempart.jpg',
      alt: 'Les techniciens de Rempart Extermination réunis devant leur camionnette de service'
    },
    stats: [
      { value: '18 ans', label: 'à protéger la Rive-Nord' },
      { value: '6 200+', label: 'foyers servis' },
      { value: '14 villes', label: 'desservies chaque semaine' },
      { value: '9', label: 'techniciens certifiés' }
    ]
  }
}
