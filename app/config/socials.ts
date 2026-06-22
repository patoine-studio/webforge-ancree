// Réseaux sociaux: source unique partagée app + Studio + nuxt.config.
//
// Map plateforme vers icône de marque + libellé accessible. L'éditeur Sanity
// ne choisit qu'une plateforme dans une liste fermée et ne saisit QUE l'URL du
// profil: l'icône et le libellé sont DÉRIVÉS EN CODE depuis la plateforme.
// Aucune saisie d'icône, jamais (les noms Iconify saisis à la main ne sont pas
// bundlés en statique, donc 404).
//
// Consommateurs (mêmes raisons que route-map.ts, d'où plain TS, ZÉRO import):
//   1. Le schéma Studio (liste du select, lookup de libellé au preview).
//   2. Le transform (lookup icône + libellé à partir de la plateforme).
//   3. La fermeture de nuxt.config.ts (sous-ensemble d'icônes à bundler).
//   4. Le contenu front (types) et le Footer (rendu).
//
// Les NOMS de plateformes (Instagram, LinkedIn...) sont des noms propres de
// marque, identiques fr/en: ils vivent ici (code), pas dans i18n. Le suffixe
// « ouvre dans une nouvelle fenêtre » de l'aria-label reste i18n côté Footer.

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'x' | 'youtube' | 'tiktok'

export interface SocialPlatformMeta {
  /** Nom propre de marque, libellé accessible (aria-label du lien). */
  label: string
  /** Nom Iconify canonique, collection simple-icons (sous-ensemble bundlé). */
  icon: string
}

/** Ordre d'affichage stable des plateformes (Footer + liste du select). */
export const SOCIAL_PLATFORM_ORDER: SocialPlatform[] = [
  'instagram',
  'facebook',
  'linkedin',
  'x',
  'youtube',
  'tiktok'
]

/** Slugs simple-icons canoniques (X = « x »). Icône = simple-icons:<slug>. */
export const SOCIAL_PLATFORMS: Record<SocialPlatform, SocialPlatformMeta> = {
  facebook: { label: 'Facebook', icon: 'simple-icons:facebook' },
  instagram: { label: 'Instagram', icon: 'simple-icons:instagram' },
  linkedin: { label: 'LinkedIn', icon: 'simple-icons:linkedin' },
  x: { label: 'X', icon: 'simple-icons:x' },
  youtube: { label: 'YouTube', icon: 'simple-icons:youtube' },
  tiktok: { label: 'TikTok', icon: 'simple-icons:tiktok' }
}

/** Options du select Sanity (liste fermée, libellé visible + valeur stockée). */
export const SOCIAL_PLATFORM_OPTIONS = SOCIAL_PLATFORM_ORDER.map((value) => ({
  title: SOCIAL_PLATFORMS[value].label,
  value
}))

/** Noms Iconify du sous-ensemble à bundler (@nuxt/icon, fermeture nuxt.config). */
export const SOCIAL_ICON_NAMES = SOCIAL_PLATFORM_ORDER.map((p) => SOCIAL_PLATFORMS[p].icon)
