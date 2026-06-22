/* Contrat de contenu du chrome de la section blog (bandeaux d'appel et bloc
 * « articles lies »). Fichier TYPE-ONLY: la transformation Sanity
 * (app/sanity/transform.ts) produit cette forme (portee par BlogPagePayload),
 * aucune fonction de repli ici. Les trois bandeaux servent respectivement la
 * liste, une archive de categorie et le pied d'un article; le bloc related coiffe
 * la suggestion de lecture en fin d'article. AUCUNE valeur design ici. */
import type { CtaBandContent } from '~/content/cta-band'

export interface BlogPageContent {
  listCta: CtaBandContent // bandeau d'appel sous la liste du blog
  categoryCta: CtaBandContent // bandeau d'appel sous une archive de categorie
  articleCta: CtaBandContent // bandeau d'appel au pied d'un article
  related: { heading: string } // coiffe du bloc « articles lies »
}
