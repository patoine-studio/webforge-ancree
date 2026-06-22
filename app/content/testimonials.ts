/* Contrat de contenu du bloc temoignages (mur asymetrique). Fichier TYPE-ONLY: la
 * transformation Sanity (app/sanity/transform.ts) produit cette forme, aucune
 * fonction de repli ici. Le bloc semi-resolu sort en Omit<TestimonialsContent,
 * 'items'> + selection; resolveBlocks rajoute les items depuis la collection. La
 * ville de chaque client renforce l'ancrage local (DESIGN.md); aucun champ projet.
 * Aucune numerotation, site-wide. AUCUNE valeur design ni de contenu ici. */

export interface TestimonialItem {
  quote: string
  name: string
  city: string
}

export interface TestimonialsContent {
  eyebrow: string
  heading: string
  items: TestimonialItem[]
}
