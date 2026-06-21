// Carte des routes du site, source unique du mapping URL <-> contenu, bilingue.
//
// Trois consommateurs, un seul endroit ou changer un segment d'URL:
//   1. Les pages et composables Nuxt (breadcrumbs, chemins localises).
//   2. La fermeture de nuxt.config.ts (customRoutes i18n via buildI18nPages,
//      routes de prerendu via staticPagePaths): imports RELATIFS only.
//   3. Le Studio Sanity (Presentation tool), qui importe ce fichier depuis studio/.
// D'ou la regle dure: plain TS, AUCUN import (ni Nuxt, ni alias ~).
//
// Famille Ancree, 3 modes (decision Charles 19 juin):
//   - Multipage a la RACINE / (URLs FR inchangees, EN sous /en).
//   - One-pager a /one-pager (layout landing, ancres + scrollspy).
//   - Showcase a /showcase (vitrine, noindex).
// Blog INCLUS (articles, categories). Projets ABANDONNES (les services par ville
// sont le moteur SEO local d'Ancree). Route dynamique du metier: serviceCity
// sous le hub /villes (FR) / /service-areas (EN).

// ── Locales ──────────────────────────────────────────────────────────────────

export type Locale = 'fr' | 'en'

export const SUPPORTED_LOCALES: readonly Locale[] = ['fr', 'en']
export const DEFAULT_LOCALE: Locale = 'fr'

/** Prefixe d'URL d'une locale: FR (defaut) -> '', EN -> '/en'. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`
}

// ── Routes statiques du multipage (ossature des breadcrumbs) ─────────────────

export interface RouteNode {
  /** Chemin par locale, SANS prefixe /en (applique par routePath). */
  path: Record<Locale, string>
  /** Libelle court par locale (fil d'Ariane). */
  label: Record<Locale, string>
  /** Cle du parent, pour remonter la chaine du fil d'Ariane. */
  parent?: string
  /** Nom de page Nuxt (fichier sans extension) pour customRoutes i18n.
   *  null = la home, geree par la strategy prefix_except_default. */
  pageName: string | null
}

export const ROUTES = {
  home: {
    path: { fr: '/', en: '/' },
    label: { fr: 'Accueil', en: 'Home' },
    pageName: null
  },
  services: {
    path: { fr: '/services', en: '/services' },
    label: { fr: 'Services', en: 'Services' },
    parent: 'home',
    pageName: 'services/index'
  },
  // Hub des villes desservies (le « ou » du SEO local). EN localise via les
  // customRoutes i18n (segment /service-areas). Les pages ville vivent sous ce hub
  // (serviceCity ci-dessous); l'ancien chemin /extermination a ete retire.
  villes: {
    path: { fr: '/villes', en: '/service-areas' },
    label: { fr: 'Villes', en: 'Service areas' },
    parent: 'home',
    pageName: 'villes/index'
  },
  about: {
    // EN localise via les customRoutes i18n (buildI18nPages branche dans nuxt.config).
    path: { fr: '/a-propos', en: '/about' },
    label: { fr: 'À propos', en: 'About' },
    parent: 'home',
    pageName: 'a-propos'
  },
  // « Blogue » cote usager FR; l'URL /blog reste identique dans les deux langues
  // (seuls les slugs de contenu changent sous /blog).
  blog: {
    path: { fr: '/blog', en: '/blog' },
    label: { fr: 'Blogue', en: 'Blog' },
    parent: 'home',
    pageName: 'blog/index'
  },
  faq: {
    path: { fr: '/faq', en: '/faq' },
    label: { fr: 'FAQ', en: 'FAQ' },
    parent: 'home',
    pageName: 'faq'
  },
  contact: {
    path: { fr: '/contact', en: '/contact' },
    label: { fr: 'Contact', en: 'Contact' },
    parent: 'home',
    pageName: 'contact'
  },
  terms: {
    path: { fr: '/conditions-utilisation', en: '/terms-of-use' },
    label: { fr: 'Conditions d\'utilisation', en: 'Terms of Use' },
    parent: 'home',
    pageName: 'conditions-utilisation'
  },
  privacy: {
    path: { fr: '/politique-confidentialite', en: '/privacy-policy' },
    label: { fr: 'Politique de confidentialite', en: 'Privacy Policy' },
    parent: 'home',
    pageName: 'politique-confidentialite'
  },
  // Showcase: vraie route client-facing, noindex, hors nav principale. Presente
  // pour cabler les customRoutes i18n et le prerendu des deux locales. URL
  // identique fr/en. Pas de parent: aucun fil d'Ariane rendu.
  showcase: {
    path: { fr: '/showcase', en: '/showcase' },
    label: { fr: 'Showcase', en: 'Showcase' },
    pageName: 'showcase/index'
  }
} as const satisfies Record<string, RouteNode>

export type RouteKey = keyof typeof ROUTES

/** Chemin COMPLET (prefixe de locale inclus) d'une route statique. */
export function routePath(key: RouteKey, locale: Locale): string {
  const path = ROUTES[key].path[locale]
  const prefix = localePrefix(locale)
  return path === '/' ? (prefix || '/') : `${prefix}${path}`
}

/** Libelle localise d'une route statique (fil d'Ariane). */
export function routeLabel(key: RouteKey, locale: Locale): string {
  return ROUTES[key].label[locale]
}

// ── Pages du one-pager (palier 1, hors breadcrumbs: layout landing) ──────────

// Le one-pager n'est pas dans ROUTES (route autonome, pas de fil d'Ariane),
// mais ses pages ont besoin de leurs entrees customRoutes (segments legaux EN
// traduits) et de leurs routes de prerendu.
export const ONE_PAGER_PAGES = {
  index: {
    pageName: 'one-pager/index',
    path: { fr: '/one-pager', en: '/one-pager' }
  },
  terms: {
    pageName: 'one-pager/conditions-utilisation',
    path: { fr: '/one-pager/conditions-utilisation', en: '/one-pager/terms-of-use' }
  },
  privacy: {
    pageName: 'one-pager/politique-confidentialite',
    path: { fr: '/one-pager/politique-confidentialite', en: '/one-pager/privacy-policy' }
  }
} as const satisfies Record<string, { pageName: string; path: Record<Locale, string> }>

/** Chemin COMPLET (prefixe inclus) d'une page du one-pager. */
export function onePagerPath(key: keyof typeof ONE_PAGER_PAGES, locale: Locale): string {
  return `${localePrefix(locale)}${ONE_PAGER_PAGES[key].path[locale]}`
}

// ── Routes des documents Sanity (resolution de liens + Studio) ───────────────

export type WfDocType =
  | 'homePage'
  | 'servicesPage'
  | 'blogPage'
  | 'faqPage'
  | 'contactPage'
  | 'onePager'
  | 'serviceCity'
  | 'article'
  | 'category'
  | 'legalPage'

export interface DocRouteSpec {
  /** Nom de page Nuxt pour customRoutes; null = couvert ailleurs (home par la
   *  strategy, article/category par le catch-all /blog, legalPage par ROUTES). */
  pageName: string | null
  /** Pattern d'URL par locale, sans prefixe, segments dynamiques en notation
   *  Nuxt ([param]). */
  urls: Record<Locale, string>
  /** Parametres dynamiques du pattern (ordre des segments). */
  params: readonly ('slug' | 'category')[]
}

export const DOC_ROUTES: Record<WfDocType, DocRouteSpec> = {
  homePage: { pageName: null, urls: ROUTES.home.path, params: [] },
  servicesPage: { pageName: ROUTES.services.pageName, urls: ROUTES.services.path, params: [] },
  blogPage: { pageName: ROUTES.blog.pageName, urls: ROUTES.blog.path, params: [] },
  faqPage: { pageName: ROUTES.faq.pageName, urls: ROUTES.faq.path, params: [] },
  contactPage: { pageName: ROUTES.contact.pageName, urls: ROUTES.contact.path, params: [] },
  onePager: { pageName: ONE_PAGER_PAGES.index.pageName, urls: ONE_PAGER_PAGES.index.path, params: [] },
  // Route dynamique du metier Ancree (remplace le 'project' de Minimaliste): pages
  // service-ville, le « ou » du SEO local, sous le hub /villes (FR) / /service-areas
  // (EN). Le slug de ville est PARTAGE entre langues; seul le segment parent est
  // localise (customRoutes i18n). Cohabite avec les pages par nuisible sous /services
  // (matrice service x lieu). Sitemap et prerendu suivent via DOC_ROUTES.serviceCity.urls.
  serviceCity: {
    pageName: 'villes/[slug]',
    urls: { fr: '/villes/[slug]', en: '/service-areas/[slug]' },
    params: ['slug']
  },
  // Article AVEC categorie (2 segments). Le cas sans categorie (/blog/[slug]) est
  // gere par le catch-all /blog, identique dans les deux langues.
  article: {
    pageName: null,
    urls: { fr: '/blog/[category]/[slug]', en: '/blog/[category]/[slug]' },
    params: ['category', 'slug']
  },
  category: {
    pageName: null,
    urls: { fr: '/blog/[slug]', en: '/blog/[slug]' },
    params: ['slug']
  },
  // Pas de slug sur legalPage: routage par _id deterministe du seed
  // (legalPage-<conditions|confidentialite>-<lang>), voir legalRouteKeyForId.
  legalPage: { pageName: null, urls: ROUTES.terms.path, params: [] }
}

/** Cle de ROUTES d'une page legale, deduite de son _id deterministe du seed
 *  (legalPage-<conditions|confidentialite>-<lang>). null = id inconnu. */
export function legalRouteKeyForId(id: string): Extract<RouteKey, 'terms' | 'privacy'> | null {
  if (id.includes('confidentialite')) return 'privacy'
  if (id.includes('conditions')) return 'terms'
  return null
}

/** Chemin COMPLET (prefixe de locale inclus) d'une page service-ville pour un slug
 *  de ville. Segment parent localise (/villes vs /service-areas), slug partage.
 *  Source unique consommee par les blocs (service-cities) et le hub /villes. */
export function serviceCityPath(slug: string, locale: Locale): string {
  return `${localePrefix(locale)}${DOC_ROUTES.serviceCity.urls[locale].replace('[slug]', slug)}`
}

// ── Pages de service par nuisible (le « quoi » du SEO local) ─────────────────
//
// Pages /services/<slug> ou le slug est RICHE en mots-cles ET TRADUIT par langue
// (FR extermination-fourmis-charpentieres <-> EN carpenter-ant-extermination), au
// contraire des villes (slug partage). La cle stable identifie le nuisible; les
// slugs par langue servent les URL, le hreflang (fr<->en) et le prerendu. Le
// CONTENU (titre, corps, icone) vit dans content/services-detail.ts, keye par la
// meme cle (repli demo par fixtures). Registre = source unique, importe par
// nuxt.config (prerendu + sitemap) et par la page /services/[slug].
export interface ServiceDetailSpec {
  /** Cle stable du nuisible (independante de la langue). */
  key: string
  /** Slug RICHE en mots-cles, traduit par langue. */
  slug: Record<Locale, string>
}

export const SERVICE_DETAILS: readonly ServiceDetailSpec[] = [
  { key: 'fourmis-charpentieres', slug: { fr: 'extermination-fourmis-charpentieres', en: 'carpenter-ant-extermination' } },
  { key: 'souris-rats', slug: { fr: 'extermination-souris-rats', en: 'rodent-extermination' } },
  { key: 'punaises-de-lit', slug: { fr: 'extermination-punaises-de-lit', en: 'bed-bug-extermination' } },
  { key: 'guepes-frelons', slug: { fr: 'extermination-guepes-frelons', en: 'wasp-hornet-extermination' } },
  { key: 'commercial', slug: { fr: 'extermination-commerciale', en: 'commercial-pest-control' } }
]

/** Chemin COMPLET (prefixe inclus) d'une page nuisible, pour une cle et une locale.
 *  Repli sur l'index /services si la cle est inconnue. */
export function serviceDetailPath(key: string, locale: Locale): string {
  const spec = SERVICE_DETAILS.find((s) => s.key === key)
  if (!spec) return routePath('services', locale)
  return `${localePrefix(locale)}/services/${spec.slug[locale]}`
}

/** Resout un slug vers la cle de nuisible, INDEPENDAMMENT de la langue: les 10
 *  slugs (5 nuisibles x 2 langues) sont globalement uniques, donc un slug identifie
 *  un nuisible sans ambiguite. Robuste au prerendu (la locale peut ne pas etre
 *  encore resolue au montage; seul le slug de l'URL fait foi). null si inconnu. */
export function serviceDetailKeyForSlug(slug: string): string | null {
  return SERVICE_DETAILS.find((s) => SUPPORTED_LOCALES.some((l) => s.slug[l] === slug))?.key ?? null
}

/** Specs des slugs par langue d'un nuisible (pour setI18nParams: l'alternate de
 *  langue porte un slug DIFFERENT). null = cle inconnue. */
export function serviceDetailSpec(key: string): ServiceDetailSpec | null {
  return SERVICE_DETAILS.find((s) => s.key === key) ?? null
}

/** Chemins COMPLETS de toutes les pages nuisible d'une locale (prerendu). */
export function serviceDetailPaths(locale: Locale): string[] {
  return SERVICE_DETAILS.map((s) => serviceDetailPath(s.key, locale))
}

// ── Builders i18n (customRoutes de @nuxtjs/i18n, consomme par nuxt.config) ───

/**
 * Mapping `pages` pour customRoutes: 'config'. Une entree par page Nuxt dont la
 * route est localisable: pages statiques de ROUTES, pages du one-pager, pages
 * detail dynamiques (serviceCity). N'EMET QUE les pages dont le pageName est
 * non nul: les fichiers Nuxt correspondants doivent exister, sinon i18n cible
 * une page absente. Au fil de la construction des pages, ajouter leur route ici.
 */
export function buildI18nPages(): Record<string, Record<Locale, string>> {
  const result: Record<string, Record<Locale, string>> = {}
  for (const node of Object.values(ROUTES) as RouteNode[]) {
    if (node.pageName === null) continue
    result[node.pageName] = node.path
  }
  for (const page of Object.values(ONE_PAGER_PAGES)) {
    result[page.pageName] = page.path
  }
  if (DOC_ROUTES.serviceCity.pageName) {
    result[DOC_ROUTES.serviceCity.pageName] = DOC_ROUTES.serviceCity.urls
  }
  // Pages nuisible: le PATTERN d'URL est identique fr/en (/services/[slug]); c'est
  // la VALEUR du slug qui est traduite par langue (setI18nParams dans la page).
  result['services/[slug]'] = { fr: '/services/[slug]', en: '/services/[slug]' }
  return result
}

/** Chemins COMPLETS (prefixe inclus) de toutes les pages statiques d'une
 *  locale: routes de ROUTES + pages du one-pager. Sert PRERENDER_ROUTES. */
export function staticPagePaths(locale: Locale): string[] {
  return [
    ...(Object.keys(ROUTES) as RouteKey[]).map((key) => routePath(key, locale)),
    ...(Object.keys(ONE_PAGER_PAGES) as Array<keyof typeof ONE_PAGER_PAGES>).map(
      (key) => onePagerPath(key, locale)
    )
  ]
}

// ── Fils d'Ariane ────────────────────────────────────────────────────────────

export interface Crumb {
  label: string
  /** Lien; absent = page courante (dernier maillon, non cliquable). */
  to?: string
}

const BY_KEY = new Map<string, RouteNode>(Object.entries(ROUTES))

/** Remonte la chaine des parents d'une route statique (ancetres + self), en
 *  liens localises (prefixe de locale inclus). */
function ancestorChain(key: RouteKey, locale: Locale): Crumb[] {
  const chain: Crumb[] = []
  let currentKey: string | undefined = key
  while (currentKey) {
    const node: RouteNode | undefined = BY_KEY.get(currentKey)
    if (!node) break
    chain.unshift({
      label: node.label[locale],
      to: routePath(currentKey as RouteKey, locale)
    })
    currentKey = node.parent
  }
  return chain
}

/**
 * Fil d'Ariane d'une page, localise.
 *  - Sans `leaf`: la route `key` EST la page courante; son dernier maillon perd
 *    son lien (page courante non cliquable).
 *  - Avec `leaf`: la route `key` est le parent (reste un lien), `leaf` est la
 *    page courante (ex. une ville sous le hub /villes).
 */
export function breadcrumbsFor(key: RouteKey, leaf?: Crumb, locale: Locale = DEFAULT_LOCALE): Crumb[] {
  const chain = ancestorChain(key, locale)
  if (leaf) {
    return [...chain, { label: leaf.label, to: leaf.to }]
  }
  const head = chain.slice(0, -1)
  const current = chain[chain.length - 1]!
  return [...head, { label: current.label }]
}

/**
 * Fil d'Ariane localise a partir de maillons explicites poses sur l'accueil.
 * Utile pour les chemins dynamiques hors route-map (archives de categorie de
 * blog, articles avec categorie). Le dernier maillon est la page courante.
 */
export function breadcrumbsFromTrail(locale: Locale, ...trail: Crumb[]): Crumb[] {
  return [{ label: routeLabel('home', locale), to: routePath('home', locale) }, ...trail]
}
