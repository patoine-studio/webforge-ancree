/* Contrat de contenu du bloc « a propos » (about) de la page-builder Ancree.
 * Fichier TYPE-ONLY: la transformation Sanity (app/sanity/transform.ts) produit
 * cette forme, aucune fonction de repli ici. Bloc media-texte en zigzag: grande
 * photo d'equipe d'un cote, recit de l'autre (asymetrie posee), avec une carte de
 * chiffres de confiance qui chevauche legerement la photo. Aucun champ de
 * numerotation: jamais de numero affiche, site-wide (les chiffres de confiance
 * sont des valeurs de contenu, pas une enumeration). AUCUNE valeur design ici. */

// Une statistique de confiance affichee en gros (element graphique).
export interface AboutStat {
  value: string // la valeur mise en avant, ex "18 ans"
  label: string // le qualificatif, ex "a proteger la Rive-Nord"
}

// La photo d'equipe (URL CDN deja resolue, jamais un objet asset Sanity).
export interface AboutPhoto {
  src: string
  alt: string
  width?: number // dimension native de l'asset (width/height sur <NuxtImg>, anti-CLS)
  height?: number
}

export interface AboutContent {
  eyebrow?: string // marqueur de section; absent sur une page dediee (le masthead le porte)
  heading: string
  body: string[] // paragraphes du recit
  photo: AboutPhoto
  stats: AboutStat[] // grands chiffres de confiance (elements graphiques)
}
