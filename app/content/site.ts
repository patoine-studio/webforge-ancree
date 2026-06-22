/* Contrats de contenu des globales du site (siteSettings Sanity, lot B). Fichier
 * TYPE-ONLY: aucune fonction de repli, aucune valeur. La transformation Sanity
 * (app/sanity/transform.ts) produit ces formes; les composables les lisent. La
 * posture est fail-fast: si le dataset manque, le transform lance, il ne replie
 * jamais sur une fixture. AUCUNE valeur design ni de contenu ici, que des champs.
 *
 * Deux contrats cohabitent:
 *   - SiteContent: la forme FULL (brand, contact NAP d'Ancree, nav, footer,
 *     socials, seo), telle que la consomment l'En-tete, le Pied de page et le
 *     switcher. Miroir 1:1 du document siteSettings du lot B.
 *   - SiteIdentity: le sous-ensemble SEO (Organization + LocalBusiness de
 *     l'accueil: NAP + zone desservie), ce que transformSiteSettings emet pour le
 *     graphe Schema.org. */

// ── Marque ──────────────────────────────────────────────────────────────────

export interface SiteBrandLogo {
  src: string // URL CDN deja resolue (jamais un objet asset Sanity)
  alt: string
}

export interface SiteBrand {
  name: string
  logo?: SiteBrandLogo
  tagline?: string
  foundedYear?: number // annee de fondation (motif de confiance, derive SEO)
  homeAriaLabel: string // libelle accessible du lien vers l'accueil (logo)
}

// ── Coordonnees (NAP structuree d'Ancree) ─────────────────────────────────────

// Adresse postale du siege, forme Schema.org (noeud LocalBusiness de l'accueil).
// Identique entre langues (adresse du Quebec, non traduite). Optionnelle: absente
// -> le LocalBusiness omet l'adresse.
export interface SiteAddress {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

// La forme NAP propre a Ancree: l'affichage et le lien sont des champs separes
// (phoneDisplay vs phoneHref, emailDisplay vs emailHref), pas une seule valeur a
// reformater. Le panneau contact joint ces champs structures aux etiquettes i18n.
export interface SiteContact {
  phoneDisplay?: string
  phoneHref?: string // tel:+1...
  emailDisplay?: string
  emailHref?: string // mailto:...
  areaName?: string // zone desservie (nom de lieu), motif SEO local
  hours?: string[] // heures d'ouverture, plusieurs lignes (panneau contact)
  address?: SiteAddress
}

// ── Navigation (liens deja resolus en href) ──────────────────────────────────

// Un lien de navigation: libelle + href deja resolu par le route-map (jamais un
// objet link Sanity brut). Sert l'En-tete, le Pied de page et les CTA de nav.
export interface SiteNavLink {
  label: string
  href: string
}

// Deux jeux de navigation: landing (one-pager, ancres internes) et multipage
// (routes reelles). Chacun porte ses liens primaires et son appel a l'action.
export interface SiteNavSet {
  primary: SiteNavLink[]
  cta?: SiteNavLink
}

export interface SiteNav {
  landing: SiteNavSet
  multipage: SiteNavSet
}

// ── Pied de page ──────────────────────────────────────────────────────────────

// Credit du pied de page (signature du studio): libelle + lien optionnel.
export interface SiteFooterCredit {
  label: string
  href?: string
}

export interface SiteFooter {
  primary: SiteNavLink[] // liens principaux du pied
  utility: SiteNavLink[] // liens utilitaires (legaux, secondaires)
  pageLinks: SiteNavLink[] // raccourcis vers les pages (plan du site condense)
  copyright: string
  credit?: SiteFooterCredit
}

// ── Reseaux sociaux ───────────────────────────────────────────────────────────

// Lien social brut du document: la plateforme (code) et l'URL. L'icone et le
// libelle sont derives par transformSocials (map des plateformes), pas saisis ici.
export interface SiteSocial {
  platform: string
  url: string
}

// ── SEO (valeurs par defaut des globales) ─────────────────────────────────────

export interface SiteSeo {
  titleSuffix?: string // suffixe de titre applique aux pages
  defaultDescription?: string // description de repli
  defaultOgImage?: string // URL CDN de l'image og par defaut
}

// ── Contrat FULL ──────────────────────────────────────────────────────────────

/** Globales du site, forme FULL (miroir du document siteSettings, lot B). */
export interface SiteContent {
  brand: SiteBrand
  contact: SiteContact
  nav: SiteNav
  footer: SiteFooter
  socials: SiteSocial[]
  seo: SiteSeo
}

// ── Contrat SEO (sous-ensemble emis pour le graphe Schema.org) ────────────────

/** Identite SEO du site: ce que transformSiteSettings emet pour l'accueil
 *  (Organization + noeud LocalBusiness: NAP + zone desservie). Le nom de
 *  l'entreprise vient de brandName; l'adresse, optionnelle, est incluse seulement
 *  si elle est complete (sinon le LocalBusiness l'omet). */
export interface SiteIdentity {
  brandName: string
  tagline?: string
  phoneDisplay?: string
  phoneHref?: string // tel:+1...
  emailDisplay?: string
  emailHref?: string // mailto:...
  areaName?: string // zone desservie (nom de lieu), motif SEO local
  address?: SiteAddress
}
