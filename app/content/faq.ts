/* Contrat de contenu du bloc FAQ. Fichier TYPE-ONLY: la transformation Sanity
 * (app/sanity/transform.ts) produit cette forme, aucune fonction de repli ici. Le
 * bloc semi-resolu sort en Omit<FaqContent,'items'> + selection; resolveBlocks
 * rajoute les items depuis la collection. Pas de champ de numerotation: jamais de
 * numero affiche, site-wide. AUCUNE valeur design ni de contenu ici. */

export interface FaqQuestion {
  q: string
  a: string
}

export interface FaqContent {
  eyebrow?: string // marqueur de section; absent sur une page dediee (le masthead le porte)
  heading: string
  items: FaqQuestion[]
}
