/* Contrat de contenu du bloc « processus » (comment on intervient). Fichier
 * TYPE-ONLY: la transformation Sanity (app/sanity/transform.ts) produit cette
 * forme (porte par service.detail.process), aucune fonction de repli ici. Les
 * etapes sont reliees visuellement par une ligne d'horizon (signature « s'ancre au
 * sol »), JAMAIS numerotees (regle dure site-wide): l'ordre se lit, il ne se
 * chiffre pas. AUCUNE valeur design ni de contenu ici, que des champs. */

export interface ProcessStep {
  title: string
  body: string
}

export interface ProcessContent {
  eyebrow: string
  heading: string
  lead?: string
  steps: ProcessStep[]
}
