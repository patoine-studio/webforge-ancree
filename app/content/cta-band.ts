/* Contrat de contenu du bandeau d'appel (cta-band): un moment fort, pleine
 * largeur en bleu nuit, qui pousse au geste de conversion (appel telephonique).
 * Fichier TYPE-ONLY: la transformation Sanity (app/sanity/transform.ts) produit
 * cette forme, aucune fonction de repli ici. La disposition, les couleurs et le
 * mouvement vivent dans le composant et les tokens. AUCUNE valeur design ici. */

export interface CtaLink {
  label: string
  href: string
}

export interface CtaBandContent {
  title: string
  subtitle?: string
  primaryCta: CtaLink // le geste d'appel (href tel:)
  secondaryCta?: CtaLink // alternative douce (route interne, ex estimation)
}
