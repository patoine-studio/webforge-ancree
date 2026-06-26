/* Contrat de contenu du bloc Éditorial. Miroir de ce que la transformation Sanity
 * produit; AUCUNE valeur design ici. Un bloc = des SEGMENTS répétables, chacun avec
 * du texte riche (Portable Text, liens internes/externes déjà résolus en href) et 0,
 * 1 ou 2 images (deux = elles s'emboîtent au rendu). Le côté de l'image alterne par
 * défaut. Aucune numerotation. */

import type { PortableTextBlock } from './article-blocks'

// Image d'un segment: URL CDN déjà résolue (jamais un objet asset), légende option.
// `src` vide -> le fragment <Image> rend son placeholder soigné (jamais une 404).
export interface EditorialImage {
  src: string
  alt: string
  caption?: string
}

// Côté de l'image au desktop: `auto` alterne en zigzag d'un segment à l'autre.
export type EditorialMediaSide = 'auto' | 'left' | 'right'

// Disposition du visuel d'un segment. `auto` dérive du nombre d'images (0 -> texte
// pleine mesure, 1 -> image à côté, 2 -> paire emboîtée); les autres forcent une
// composition (le rendu retombe sur une compo plus simple si les images manquent).
//   text     : texte pleine mesure, aucun visuel
//   aside    : une image modeste à côté du texte (zigzag)
//   overhang : une image qui déborde dans la gouttière vers le texte
//   band     : une image en bandeau pleine mesure, texte en amorce au-dessus
//   nested   : deux images emboîtées (l'une en débord dans le coin de l'autre)
//   duo      : deux images en diptyque décalé sous une amorce de texte
export type EditorialDisposition =
  | 'auto'
  | 'text'
  | 'aside'
  | 'overhang'
  | 'band'
  | 'nested'
  | 'duo'

export interface EditorialSegment {
  body: PortableTextBlock[]
  media: EditorialImage[]
  mediaSide: EditorialMediaSide
  disposition: EditorialDisposition
}

export interface EditorialContent {
  eyebrow?: string
  heading?: string
  lead?: string
  segments: EditorialSegment[]
}
