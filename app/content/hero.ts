/* Contrat de contenu du heros, miroir exact de ce que la transformation Sanity
 * produira et que les composants consomment. AUCUNE valeur design ici, que des
 * champs. Repris tel quel du systeme (technique partagee); la disposition Ancree
 * change, pas le contrat. */

export interface HeroVisual {
  ratio: string // chaine aspect-ratio CSS, ex "4/5"
  src?: string // URL CDN deja resolue (jamais un objet asset Sanity); absente -> placeholder
  alt?: string
  label: string // libelle du placeholder quand src est absente
  caption: string // legende du placeholder
}

export interface HeroProof {
  value: string // la preuve elle-meme, ex "Licencie RBQ"
  label: string // le qualificatif, ex "et entierement assure"
  icon?: string // icone line-art (Iconify), ex "lucide:shield-check"
}

export interface HeroContent {
  kicker?: string // marqueur d'ancrage local (zone de service)
  title: string
  lead: string
  primaryCta: { label: string; href: string } // le bouton d'appel
  secondaryCta: { label: string; href: string }
  meta: HeroProof[] // les preuves de confiance integrees (3)
  visual: HeroVisual // cadrage desktop (portrait, defaut 4/5)
  visualMobile: HeroVisual // cadrage mobile (paysage, defaut 4/3)
}
