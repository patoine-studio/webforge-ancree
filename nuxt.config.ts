// https://nuxt.com/docs/api/configuration/nuxt-config
//
// webforge-ancree — CANVAS BLANC (reset au scaffold du 19 juin 2026).
// Coquille Nuxt 4 minimale: les modules de la famille (i18n, Sanity, image,
// fonts, icon, seo, pinia) et l'identité Ancrée (project Sanity 5if00rwn,
// déploiement Cloudflare). AUCUN bloc, contenu, schéma ni preview: la
// reconstruction (design + architecture Sanity) repart d'ici.
import tailwindcss from '@tailwindcss/vite'
import { createClient } from '@sanity/client'
import type { CustomRoutePages } from '@nuxtjs/i18n'
// Route-map: source unique du mapping URL <-> contenu. Import RELATIF (jamais ~):
// la fermeture nuxt.config est typecheckee hors du contexte d'alias Nuxt. Plain TS.
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  localePrefix,
  routePath,
  staticPagePaths,
  buildI18nPages,
  DOC_ROUTES,
  type Locale
} from './app/config/route-map'
// Types du payload Sanity brut: RouteSlugs (resultat de ROUTE_SLUGS_QUERY) + SlugRef,
// importes par chemin RELATIF (la fermeture nuxt.config est typecheckee hors alias ~).
import type { RouteSlugs, SlugRef, SlugByLang } from './app/types/sanity'
// Config + garde du blog (PUR TS, importable hors contexte d'alias Nuxt).
import { ARTICLES_PER_PAGE, assertBlogCollections } from './app/content/guards'
// Icônes de marque des réseaux sociaux: sous-ensemble simple-icons bundlé au build.
import { SOCIAL_ICON_NAMES } from './app/config/socials'
import simpleIconsData from '@iconify-json/simple-icons/icons.json'

// Connexion Sanity: constantes de code, override env OPTIONNEL (identité du
// site, invariante par environnement; un fork change ce bloc, pas l'env).
// Dataset 'production' (vidé au reset, l'architecture de contenu sera refaite).
const sanityProjectId = process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '5if00rwn'
const sanityDataset = process.env.NUXT_PUBLIC_SANITY_DATASET || 'production'
const sanityApiVersion = process.env.NUXT_PUBLIC_SANITY_API_VERSION || '2026-06-01'

// Token de LECTURE au build/SSR seulement (jamais NUXT_PUBLIC_: reste cote serveur,
// jamais dans le bundle statique). Requis car le type translation.metadata du plugin
// document-internationalization n'est pas expose en lecture publique sur ce dataset:
// sans token, references() renvoie vide et les alternates hreflang des pages a slug
// traduit (services) cassent. Le site etant genere en statique, le token sert au
// build puis le HTML produit ne le contient pas. Absent = lecture publique (degrade).
const sanityReadToken = process.env.NUXT_SANITY_TOKEN || process.env.SANITY_API_READ_TOKEN || undefined

// URL canonique: partagée site.url (@nuxtjs/seo) et i18n.baseUrl (hreflang
// absolus). Posée par Worker sur Cloudflare (NUXT_PUBLIC_SITE_URL).
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://webforge-ancree.patoinestudio.ca'

// ── Interrupteurs du mode preview (calque webforge-minimaliste, adapte au token
// composite d'Ancree) ─────────────────────────────────────────────────────────
// Le preview (Presentation tool, stega, drafts, SSR) s'active UNIQUEMENT quand:
//   1. la branche de build est `preview` (WORKERS_CI_BRANCH, injecte au build par
//      Cloudflare Workers Builds; undefined en dev local, alors permissif);
//   2. un token de lecture Sanity est pose (sanityReadToken = NUXT_SANITY_TOKEN
//      || SANITY_API_READ_TOKEN, deja declare plus haut) ET NUXT_PUBLIC_STUDIO_URL.
// Le gating par branche est une couche de securite: un token egare sur le Worker
// prod ou staging n'allumerait PAS le preview. Hors preview, les variables vides
// suffisent a ce que @nuxtjs/sanity desactive tout le visual editing (token et
// studioUrl requis, sinon options.visualEditing = undefined): ni stega, ni routes
// /preview/*, ni React dans le build. previewEnabled pilote AUSSI le preset Nitro
// (SSR sur le Worker preview, statique ailleurs).
const studioUrl = process.env.NUXT_PUBLIC_STUDIO_URL
const ciBranch = process.env.WORKERS_CI_BRANCH
const onPreviewBranch = ciBranch === 'preview' || ciBranch === undefined
const previewEnabled = onPreviewBranch && !!sanityReadToken && !!studioUrl

// ── Slugs des routes dynamiques, fetches au BUILD (parade au seul crawl) ──────
// Client @sanity/client direct: le module @nuxtjs/sanity n'existe pas dans le
// contexte de la fermeture nuxt.config. Lecture publique, contenu PUBLIE, CDN.
// Une seule source pour DEUX consommateurs (zero divergence possible): les
// routes de prerendu explicites ET les URLs du sitemap (alternates hreflang).
const sanityBuildClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  // CDN public sans token; avec token (lecture build de translation.metadata), on
  // passe en lecture live authentifiee (le CDN ne sert que le public).
  useCdn: !sanityReadToken,
  token: sanityReadToken,
  perspective: 'published'
})

// i18n document-level: un doc par langue, SLUG PARTAGE fr/en. On fetch par langue
// (chaque arbre de routes a son jeu), puis l'alternate hreflang se deduit du meme
// slug sous l'autre prefixe de locale.
// La collection service (les nuisibles) a un slug RICHE en mots-cles et TRADUIT
// par langue (le doc EN porte SON propre slug, distinct du FR). On projette donc
// pour chaque service de la langue courante la carte de ses slugs par langue
// (translation.metadata du plugin @sanity/document-internationalization): le
// prerendu prend le slug de la langue, le sitemap pose l'alternate sur le slug
// TRADUIT de l'autre langue. Les serviceCity, eux, partagent leur slug fr/en.
const ROUTE_SLUGS_QUERY = `{
  "articles": *[_type == "article" && language == $lang && defined(slug.current)]{ "slug": slug.current, "category": category->slug.current, "slugByLang": *[_type == "translation.metadata" && references(^._id)][0].translations[]{ "lang": _key, "slug": value->slug.current } },
  "categories": *[_type == "category" && language == $lang && defined(slug.current)]{ "slug": slug.current, "slugByLang": *[_type == "translation.metadata" && references(^._id)][0].translations[]{ "lang": _key, "slug": value->slug.current } },
  "cities": *[_type == "serviceCity" && language == $lang && defined(slug.current)]{ "slug": slug.current },
  "services": *[_type == "service" && language == $lang && defined(slug.current)]{
    "slug": slug.current,
    "slugByLang": *[_type == "translation.metadata" && references(^._id)][0].translations[]{ "lang": _key, "slug": value->slug.current }
  }
}`

const EMPTY_SLUGS: RouteSlugs = { articles: [], categories: [], cities: [], services: [] }

// Fetch GRACIEUX: un reseau coupe ne casse pas le build (Ancree retombe partout
// sur ses fixtures). Sans slugs: sitemap dynamique reduit, prerendu rabattu sur
// le crawl. Le site reste noindex tant qu'il n'est pas en ligne; l'avertissement
// signale la degradation sans la masquer.
const slugsByLocale = {} as Record<Locale, RouteSlugs>
for (const locale of SUPPORTED_LOCALES) {
  try {
    slugsByLocale[locale] = await sanityBuildClient.fetch<RouteSlugs>(ROUTE_SLUGS_QUERY, { lang: locale })
  } catch (cause) {
    console.warn(
      `[webforge] Fetch Sanity des slugs (${locale}) echoue (project ${sanityProjectId}, `
      + `dataset ${sanityDataset}): sitemap dynamique et prerendu explicite rabattus sur le crawl.`,
      cause
    )
    slugsByLocale[locale] = EMPTY_SLUGS
  }
}

// Garde du blog (schema d'URL court + plafond d'archive + segment « page »
// reserve), par langue, sur les slugs Sanity injectes. Echec CLAIR du build
// plutot qu'une 404 silencieuse ou des liens de pagination morts. Sur un fetch
// echoue (slugs vides), la garde passe (rien a valider).
for (const locale of SUPPORTED_LOCALES) {
  try {
    assertBlogCollections({
      articlesPerPage: ARTICLES_PER_PAGE,
      articles: slugsByLocale[locale].articles,
      categories: slugsByLocale[locale].categories.map((c) => c.slug)
    })
  } catch (cause) {
    throw new Error(`[webforge] Garde du blog echouee pour la langue « ${locale} »`, { cause })
  }
}

// Nom de marque depuis Sanity (siteSettings.brandName, langue par defaut): alimente
// site.name -> gabarit de titre « %s | {marque} » du module @nuxtjs/seo ET l'identite
// du graphe Schema.org (Organization/WebSite via usePageSeo). Le seed porte le meme
// nom dans les deux langues. Repli gracieux sur le nom de famille si indisponible.
let siteBrandName = 'Ancrée'
try {
  const brand = await sanityBuildClient.fetch<string | null>(
    '*[_type == "siteSettings" && language == $lang][0].brandName',
    { lang: DEFAULT_LOCALE }
  )
  if (brand) siteBrandName = brand
} catch (cause) {
  console.warn(`[webforge] Fetch Sanity du nom de marque echoue: repli sur « ${siteBrandName} ».`, cause)
}

// ── URLs des documents dynamiques (prefixe de locale inclus) ──────────────────
// Definies une seule fois, consommees par le prerendu ET le sitemap.
const homeUrl = (locale: Locale): string => routePath('home', locale)
// Segment derive du route-map (source unique URL<->contenu): si l'URL EN de
// serviceCity se localise un jour, sitemap et prerendu suivent sans divergence.
const cityUrl = (locale: Locale, slug: string): string =>
  `${localePrefix(locale)}${DOC_ROUTES.serviceCity.urls[locale].replace('[slug]', slug)}`
const categoryUrl = (locale: Locale, slug: string): string => `${routePath('blog', locale)}/${slug}`
const articleUrl = (locale: Locale, slug: string, category: string | null): string => {
  const base = routePath('blog', locale)
  return category ? `${base}/${category}/${slug}` : `${base}/${slug}`
}
// Service (les nuisibles): le PATTERN /services/[slug] est partage fr/en, seul le
// slug est traduit par langue. Derive du route-map (DOC_ROUTES.service) pour suivre
// toute localisation future du segment parent sans divergence prerendu/sitemap.
const serviceUrl = (locale: Locale, slug: string): string =>
  `${localePrefix(locale)}${DOC_ROUTES.service.urls[locale].replace('[slug]', slug)}`
// Pages de pagination de la liste (n >= 2): /blog/page/N. Page 1 = /blog nu. Vide
// quand la liste tient sur une page (cas de la demo, 3 articles). Hors sitemap
// (noindex au niveau page), seulement prerendues.
const paginationUrls = (count: number, base: string): string[] =>
  Array.from(
    { length: Math.max(0, Math.ceil(count / ARTICLES_PER_PAGE) - 1) },
    (_, i) => `${base}/page/${i + 2}`
  )

// ── Sitemap: pages indexables, alternates hreflang (modele slug partage) ──────
// La source auto i18n:pages couvre les pages FIXES (route-map, alternates inclus).
// Restent a fournir: l'accueil (pageName null, hors i18n.pages) et TOUTES les
// pages dynamiques (serviceCity, articles, archives de categorie). Slug partage
// fr/en: l'alternate d'un doc = le meme chemin sous l'autre prefixe, emis
// seulement si la traduction existe vraiment (presence par langue ci-dessous).
const LOCALE_HREFLANG: Record<Locale, string> = { fr: 'fr-CA', en: 'en-CA' }

interface SitemapAlternative { hreflang: string; href: string }
interface SitemapUrlEntry { loc: string; _sitemap: string; alternatives: SitemapAlternative[] }

// Presence d'un slug par langue (le doc existe dans la langue ou son slug figure
// au fetch de cette langue): fonde les alternates sans supposer un appariement.
const presenceBySlug = (pick: (s: RouteSlugs) => SlugRef[]): Map<string, Set<Locale>> => {
  const map = new Map<string, Set<Locale>>()
  for (const locale of SUPPORTED_LOCALES) {
    for (const { slug } of pick(slugsByLocale[locale])) {
      if (!map.has(slug)) map.set(slug, new Set())
      map.get(slug)!.add(locale)
    }
  }
  return map
}
const cityPresence = presenceBySlug((s) => s.cities)

// Slug TRADUIT par langue, suivi via translation.metadata (slugByLang): service,
// article ET categorie portent un slug DISTINCT par langue (cf. ROUTE_SLUGS_QUERY).
// L'alternate hreflang de l'autre langue doit pointer le slug TRADUIT, jamais un
// chemin partage (sinon hreflang 404, ex. categorie « nuisibles » -> « pests »).
// Cle = `${sourceLocale}:${slug}` -> { langue -> slug traduit } (langue source incluse).
type ByLang = Partial<Record<Locale, string>>
const buildSlugByLang = (
  pick: (s: RouteSlugs) => Array<{ slug: string; slugByLang?: SlugByLang[] | null }>
): Map<string, ByLang> => {
  const m = new Map<string, ByLang>()
  for (const locale of SUPPORTED_LOCALES) {
    for (const ref of pick(slugsByLocale[locale])) {
      const byLang: ByLang = { [locale]: ref.slug }
      for (const tr of ref.slugByLang ?? []) if (tr.slug) byLang[tr.lang] = tr.slug
      m.set(`${locale}:${ref.slug}`, byLang)
    }
  }
  return m
}
const serviceByLang = buildSlugByLang((s) => s.services)
const articleByLang = buildSlugByLang((s) => s.articles)
const categoryByLang = buildSlugByLang((s) => s.categories)

// Slug d'un doc dans une langue cible (repli gracieux sur le slug source si la
// traduction manque, jamais d'href casse). langsOf: langues ou la paire existe.
const slugIn = (map: Map<string, ByLang>, sourceLocale: Locale, sourceSlug: string, target: Locale): string =>
  map.get(`${sourceLocale}:${sourceSlug}`)?.[target] ?? sourceSlug
const langsOf = (map: Map<string, ByLang>, sourceLocale: Locale, sourceSlug: string): Locale[] => {
  const byLang = map.get(`${sourceLocale}:${sourceSlug}`) ?? {}
  return SUPPORTED_LOCALES.filter((l) => byLang[l])
}

// Alternates: une entree par langue fournie + x-default (langue par defaut si
// presente, sinon la premiere dispo: signale la page de repli inter-langues).
// hrefs relatifs, resolus en absolu par le module sitemap. Deux familles d'appel:
// SLUG PARTAGE (serviceCity) -> langues = presence par slug; SLUG TRADUIT
// (service/article/categorie) -> langues = paire translation.metadata (langsOf).
const buildAlternatives = (locales: Locale[], toUrl: (l: Locale) => string): SitemapAlternative[] => {
  const alternatives = locales.map((l) => ({ hreflang: LOCALE_HREFLANG[l], href: toUrl(l) }))
  const fallback = locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0]
  if (fallback) alternatives.push({ hreflang: 'x-default', href: toUrl(fallback) })
  return alternatives
}

const SITEMAP_DYNAMIC_URLS: SitemapUrlEntry[] = [
  // Accueil des deux locales (jamais dans i18n.pages: pageName null).
  ...SUPPORTED_LOCALES.map((locale) => ({
    loc: homeUrl(locale),
    _sitemap: LOCALE_HREFLANG[locale],
    alternatives: [
      ...SUPPORTED_LOCALES.map((l) => ({ hreflang: LOCALE_HREFLANG[l], href: homeUrl(l) })),
      { hreflang: 'x-default', href: homeUrl(DEFAULT_LOCALE) }
    ]
  })),
  // Pages dynamiques de chaque locale. La pagination /blog/page/N reste absente
  // (noindex, point 2).
  ...SUPPORTED_LOCALES.flatMap((locale) => {
    const slugs = slugsByLocale[locale]
    return [
      // serviceCity: slug PARTAGE fr/en -> presence par slug (meme chemin sous prefixe).
      ...slugs.cities.map((c) => ({
        loc: cityUrl(locale, c.slug),
        _sitemap: LOCALE_HREFLANG[locale],
        alternatives: buildAlternatives(
          SUPPORTED_LOCALES.filter((l) => cityPresence.get(c.slug)?.has(l)),
          (l) => cityUrl(l, c.slug)
        )
      })),
      // Article: slug TRADUIT + categorie potentiellement TRADUITE (ex. « nuisibles »
      // -> « pests »). L'alternate suit la paire translation.metadata pour LES DEUX
      // (article ET categorie), sinon hreflang 404.
      ...slugs.articles.map((a) => ({
        loc: articleUrl(locale, a.slug, a.category),
        _sitemap: LOCALE_HREFLANG[locale],
        alternatives: buildAlternatives(
          langsOf(articleByLang, locale, a.slug),
          (l) => articleUrl(l, slugIn(articleByLang, locale, a.slug, l), a.category ? slugIn(categoryByLang, locale, a.category, l) : null)
        )
      })),
      // Archive de categorie: slug TRADUIT par langue (« nuisibles » -> « pests »).
      ...slugs.categories.map((c) => ({
        loc: categoryUrl(locale, c.slug),
        _sitemap: LOCALE_HREFLANG[locale],
        alternatives: buildAlternatives(
          langsOf(categoryByLang, locale, c.slug),
          (l) => categoryUrl(l, slugIn(categoryByLang, locale, c.slug, l))
        )
      })),
      // Page par nuisible (service): slug TRADUIT par langue, alternate via slugByLang.
      ...slugs.services.map((svc) => ({
        loc: serviceUrl(locale, svc.slug),
        _sitemap: LOCALE_HREFLANG[locale],
        alternatives: buildAlternatives(
          langsOf(serviceByLang, locale, svc.slug),
          (l) => serviceUrl(l, slugIn(serviceByLang, locale, svc.slug, l))
        )
      }))
    ]
  })
]

// Routes de prerendu: pages statiques du route-map (segments EN localises par
// customRoutes) + pages dynamiques explicites depuis les slugs Sanity (plus le
// seul crawl). crawlLinks reste actif en complement (images _ipx, liens).
const DYNAMIC_PRERENDER_ROUTES = SUPPORTED_LOCALES.flatMap((locale) => {
  const slugs = slugsByLocale[locale]
  return [
    ...slugs.cities.map((c) => cityUrl(locale, c.slug)),
    // Pages par nuisible (collection service Sanity): slug traduit par langue.
    ...slugs.services.map((svc) => serviceUrl(locale, svc.slug)),
    ...slugs.articles.map((a) => articleUrl(locale, a.slug, a.category)),
    ...slugs.categories.map((c) => categoryUrl(locale, c.slug)),
    ...paginationUrls(slugs.articles.length, routePath('blog', locale))
  ]
})
const PRERENDER_ROUTES = [
  ...SUPPORTED_LOCALES.flatMap((locale) => staticPagePaths(locale)),
  ...DYNAMIC_PRERENDER_ROUTES
]

// ── Icônes de marque (réseaux sociaux), sous-ensemble bundlé ─────────────────
// On NE bundle PAS la collection simple-icons entière (des milliers d'icônes): on
// dérive une collection custom contenant SEULEMENT les plateformes de
// app/config/socials.ts. Les bodies SVG sont lus au BUILD depuis
// @iconify-json/simple-icons/icons.json (gros fichier, jamais expédié au client) et
// inlinés. Le nom reste canonique `simple-icons:<slug>`; le préfixe n'est PAS dans
// serverBundle.collections, donc la collection complète n'est jamais bundlée.
const socialBrandIcons: Record<string, { body: string }> = {}
for (const name of SOCIAL_ICON_NAMES) {
  const slug = name.replace('simple-icons:', '')
  const icon = (simpleIconsData.icons as Record<string, { body: string }>)[slug]
  if (icon) socialBrandIcons[slug] = { body: icon.body }
}
const socialBrandCollection = {
  prefix: 'simple-icons',
  icons: socialBrandIcons,
  width: simpleIconsData.width ?? 24,
  height: simpleIconsData.height ?? 24
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Le Studio Sanity vit dans studio/ (workspace yarn frère). Nuxt l'ignore.
  ignore: ['studio/**'],

  vite: {
    plugins: [tailwindcss()],
    // __WF_PREVIEW__: constante de COMPILATION derivee des interrupteurs d'env.
    // false en build statique (prod/staging): les branches preview de l'app
    // (plugins 01.content/02.preview-live, middleware, usePayload, bypass de
    // mouvement de la signature « s'ancre en montant ») deviennent du code mort
    // que Rollup elimine (aucun chunk visual editing dans .output/public).
    define: { __WF_PREVIEW__: previewEnabled },
    // Pre-bundle de la stack React/styled-components du visual editing Sanity, en
    // preview SEULEMENT (sinon aucun de ces paquets n'entre dans le build). Calque
    // verbatim de webforge-minimaliste (specificateurs de paquets, rien a adapter).
    ...(previewEnabled
      ? {
          optimizeDeps: {
            include: [
              '@nuxtjs/sanity > @sanity/visual-editing > @sanity/insert-menu',
              '@nuxtjs/sanity > @sanity/visual-editing > @sanity/mutate > lodash/groupBy.js',
              '@nuxtjs/sanity > @sanity/visual-editing > @sanity/ui > styled-components',
              '@nuxtjs/sanity > @sanity/visual-editing > @sanity/visual-editing > react-is',
              '@nuxtjs/sanity > @sanity/visual-editing > react',
              '@nuxtjs/sanity > @sanity/visual-editing > react/jsx-runtime',
              '@nuxtjs/sanity > @sanity/visual-editing > react-dom',
              '@nuxtjs/sanity > @sanity/visual-editing > react-dom/client',
              '@nuxtjs/sanity > @sanity/visual-editing > react-compiler-runtime',
              '@sanity/client',
              '@nuxtjs/sanity > @sanity/client > @sanity/visual-editing',
              '@vue/devtools-core',
              '@vue/devtools-kit',
              '@sanity/image-url'
            ]
          }
        }
      : {})
  },

  // Noms de composants plats (sans prefixe de dossier): <Hero>, <Button>,
  // <Header>, peu importe l'arborescence. Convention de la famille. On limite
  // le scan aux .vue: les block-map.ts ne sont pas des composants (importes
  // explicitement), sinon Nuxt les nomme tous deux « BlockMap » (collision).
  // On IGNORE page-builder/** de l'auto-import: ces blocs (regular, article, leurs
  // index PageBuilder/ArticleBuilder) sont consommes via les block-maps (imports
  // EXPLICITES) et les pages. Sans ca, plusieurs fichiers « image.vue » / « article »
  // produisent le meme nom auto et entrent en collision avec le fragment partage
  // <Image> et le heros <Article>. Calque sur webforge-minimaliste.
  components: [{ path: '~/components', pathPrefix: false, extensions: ['vue'], ignore: ['**/page-builder/**'] }],

  app: {
    head: {
      // Marqueur preview: <html class="wf-no-motion"> en preview SEULEMENT. Ancree
      // coupe le mouvement en JS (family/motion.ts motionDisabled lit __WF_PREVIEW__),
      // mais le masque anti-flash du hero (home.vue) est du CSS pur qui ne voit pas
      // __WF_PREVIEW__. La classe donne au CSS ce signal: html:not(.wf-no-motion)
      // garde le masque hors preview, le leve dans l'iframe (contenu visible d'emblee).
      htmlAttrs: {
        lang: 'fr-CA',
        ...(previewEnabled ? { class: 'wf-no-motion' } : {})
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    },
    // Fondu leger au changement de page (out-in: la page sortante disparait avant
    // l'entree de la suivante, jamais de chevauchement). Le retour en haut reste
    // instantane (app/router.options.ts, behavior: 'instant'); le fondu lisse le
    // changement et masque le micro-flash residuel. Classes .page-* dans main.css;
    // neutralise sous prefers-reduced-motion (transition-duration 0.01ms) et en
    // preview (.wf-no-motion). Pas de duration explicite: Vue detecte la fin via
    // transitionend, donc le fondu s'adapte a ces deux coupures.
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/sanity',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/seo'
  ],

  // Icônes: lucide bundlé en entier (UI), simple-icons réduit au sous-ensemble des
  // réseaux sociaux via customCollections (inliné au build, pas de fetch runtime).
  icon: {
    serverBundle: {
      collections: ['lucide']
    },
    customCollections: [socialBrandCollection]
  },

  // Client Sanity (lecture publique, sans token). useCdn: false — le site est
  // genere statiquement, donc toutes les lectures se font au BUILD: l'API directe
  // garantit du contenu frais (le CDN accuse un leger retard apres publication).
  // Aucune requete Sanity a l'execution (tout est prerendu).
  sanity: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    // PAS de token ici HORS preview: l'option token du module @nuxtjs/sanity
    // atterrit dans la config PUBLIQUE (embarquee dans chaque page). La lecture
    // authentifiee de translation.metadata se fait server-only via un client dedie
    // dans le plugin 01.content (token depuis runtimeConfig prive). Lecture publique.
    perspective: 'published',
    // En preview SEULEMENT: on active le visual editing. Le token (server-only cote
    // module: le proxy /_sanity/visual-editing/fetch le garde au serveur, la copie
    // publique est videe) vient de sanityReadToken, LA MEME source que le gate
    // previewEnabled et le client de build (zero divergence de token).
    ...(previewEnabled
      ? {
          visualEditing: {
            // Mode 'live-visual-editing': edition IN-PLACE. Le module abonne
            // useSanityQuery au queryStore; une mutation du Presentation tool
            // re-evalue la requete COTE CLIENT (zero CPU Worker par frappe). Le
            // plugin 02.preview-live.client.ts garde la requete vivante par route
            // et re-derive transformGraph dans livePayload, lu par usePayload().
            mode: 'live-visual-editing' as const,
            token: sanityReadToken,
            studioUrl,
            stega: true
          }
        }
      : {})
  },

  hooks: {
    'nitro:config'(nitroConfig) {
      if (previewEnabled) {
        // SSR preview: AUCUN prerendu (le draft est rendu a la requete; prerendre
        // figerait le contenu PUBLIE). On neutralise la config heritee de
        // nitro.prerender (routes explicites + crawlLinks).
        if (nitroConfig.prerender) {
          nitroConfig.prerender.routes = []
          nitroConfig.prerender.crawlLinks = false
        }
        return
      }
      // Statique pur (prod/staging): le module @nuxtjs/sanity place une config
      // `stega` dans runtimeConfig.public.sanity (utile au visual editing en
      // preview SSR). Hors preview, elle n'a aucune utilite et fuit dans le HTML
      // genere: on la retire pour garder .output propre (aucun marqueur stega).
      const runtimeConfig = nitroConfig.runtimeConfig as
        | { public?: { sanity?: Record<string, unknown> } }
        | undefined
      const sanityPublic = runtimeConfig?.public?.sanity
      if (sanityPublic) {
        delete sanityPublic.stega
      }
    }
  },

  // Pipeline image (@nuxt/image, IPX). Les images du contenu vivront sur le CDN
  // Sanity; les variantes sont prérendues au build (provider ipxStatic).
  image: {
    // En preview SSR (Worker): sharp ne tourne pas sur workerd, pas d'IPX runtime.
    // Provider `none`: <NuxtImg> sert le `src` cdn.sanity.io tel quel. Hors preview:
    // PAS de provider explicite (ipxStatic au build, ipx en dev).
    ...(previewEnabled ? { provider: 'none' } : {}),
    domains: ['cdn.sanity.io'],
    screens: { xs: 375, sm: 500, md: 640, lg: 1024, xl: 1440, xxl: 1920 }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  // 1. Tokens de la famille (Ancrée) — à rebâtir avec le design.
  // 2. Tokens de la marque (ce site) — surfaces, texte, accent.
  // 3. CSS de base — Tailwind + reset minimal.
  css: [
    '~/family/tokens.css',
    '~/brand/tokens.css',
    '~/assets/css/typography.css',
    '~/assets/css/grid.css',
    '~/assets/css/main.css'
  ],

  // Typographies de la famille Ancree (DESIGN.md). Poids declares explicitement,
  // sinon le navigateur synthetise des faux-gras incoherents. Aucune italique.
  fonts: {
    families: [
      { name: 'Bitter', provider: 'google', weights: [600, 700, 800], styles: ['normal'] },
      { name: 'Source Sans 3', provider: 'google', weights: [400, 600], styles: ['normal'] }
    ]
  },

  // Bilingue: FR à la racine, EN sous /en. Pas de détection navigateur (statique).
  i18n: {
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    baseUrl: siteUrl,
    locales: [
      { code: 'fr', language: 'fr-CA', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-CA', name: 'English', file: 'en.json' }
    ],
    // Segments EN traduits (about, terms-of-use...) depuis le route-map, source
    // unique. buildI18nPages -> Record<string, Record<Locale, string>>; cast a la
    // frontiere (route-map reste plain TS, importable du Studio).
    customRoutes: 'config',
    pages: buildI18nPages() as CustomRoutePages,
    detectBrowserLanguage: false
  },

  site: {
    url: siteUrl,
    // Nom de marque du DEMO (siteSettings.brandName depuis Sanity, fetch au build):
    // alimente le gabarit de titre « %s | {marque} » et l'identite Schema.org. Le
    // nom de famille « Ancrée » est le repli si Sanity est injoignable. Suit le
    // patron Minimaliste (site.name = suffixe de titres depuis le CMS).
    name: siteBrandName,
    defaultLocale: 'fr',
    // Og-image de marque par defaut (repli social quand une page ne fournit pas
    // son propre visuel): carte typographique Ancree/Rempart, fabriquee EXACTEMENT
    // en 1200x630 (public/og-rempart-extermination.png). Chemin relatif, resolu en
    // URL absolue par usePageSeo. Cle custom du site config, lue via useSiteConfig().
    defaultOgImage: '/og-rempart-extermination.png',
    // Gabarit non indexable tant qu'aucun vrai site n'est en ligne.
    indexable: false
  },

  // Pas de génération d'OG en runtime (aucune dépendance chromium en V1).
  // Les og:image sont servies en statique par usePageSeo: visuel propre a la
  // page (cover d'article) en URL absolue derivee de site.url, avec repli sur
  // l'og-image de marque (site.defaultOgImage ci-dessus) quand la page n'en
  // fournit pas. La carte de marque est un asset prerendu dans public/.
  ogImage: { enabled: false },

  // Sitemap: pages indexables, alternates hreflang. Pages FIXES couvertes par la
  // source auto i18n:pages (depuis i18n.pages, alternates inclus). Accueil
  // (pageName null) et pages DYNAMIQUES (serviceCity, articles, archives) par la
  // source webforge:dynamic (memes slugs que le prerendu). On exclut la source
  // auto nuxt:prerender: elle re-listerait les pages dynamiques SANS alternates,
  // en doublon. Showcase et one-pager: noindex au niveau page, hors sitemap.
  sitemap: {
    exclude: ['/showcase', '/en/showcase', '/one-pager/**', '/en/one-pager/**'],
    excludeAppSources: ['nuxt:prerender'],
    sources: [
      {
        context: {
          name: 'webforge:dynamic',
          description: 'Accueil + pages dynamiques (serviceCity, articles, archives) depuis les slugs Sanity. Split par locale + alternates hreflang.'
        },
        urls: SITEMAP_DYNAMIC_URLS
      }
    ]
  },

  // Graphe Schema.org: noeuds par defaut du module DESACTIVES. usePageSeo est la
  // source UNIQUE du graphe (Organization, WebSite, WebPage, BreadcrumbList, et
  // selon la page Article / LocalBusiness / FAQPage), emis sur chaque page qui
  // l'appelle. Les pages hors blog encore sur useSeoMeta direct n'ont pas de
  // graphe tant que le point 7 ne les migre pas (sans impact: site noindex).
  schemaOrg: {
    defaults: false
  },

  // nuxt-seo-utils: fallbackTitle desactive. Les pages posent leur titre via
  // usePageSeo / useSeoMeta; le repli reapplique sinon un titre « {code} -
  // {message} » reactif sur la page d'erreur, battant le titre localise.
  seo: {
    fallbackTitle: false
  },

  nitro: {
    // SSR sur le Worker preview (previewEnabled, build `nuxt build`); statique
    // partout ailleurs (prod/staging, build `nuxt generate`). Le prerendu ci-dessous
    // est neutralise en preview par le hook nitro:config plus haut.
    preset: previewEnabled ? 'cloudflare-module' : 'static',
    prerender: {
      crawlLinks: true,
      // Pages statiques du route-map (segments EN localises) + pages dynamiques
      // explicites (serviceCity, articles, archives) depuis les slugs Sanity.
      // crawlLinks reste actif en complement (images _ipx, liens internes).
      routes: PRERENDER_ROUTES,
      // /en/sitemap.xml: page fantome du prerendu en mode multi-sitemaps (i18n).
      // Le /sitemap.xml FR aboutit sur la routeRule (redirect vers l'index); son
      // jumeau EN n'a ni routeRule ni page -> rendu de l'app. On l'ecarte.
      ignore: ['/en/sitemap.xml']
    }
  },

  // Plomberie backend du formulaire de contact (TERRAIN, niveau demo; pattern
  // adapte de webforge-minimaliste, voir server/api/contact.post.ts). Les cles
  // privees restent cote serveur; turnstileSiteKey est publique (le widget la
  // rend dans le navigateur). EN STATIQUE PUR (preset 'static', cas de la demo):
  // contactDemo: true -> useContactForm simule le succes cote client, AUCUN
  // backend appele, et la route /api/contact n'est meme pas bundlee. Un VRAI
  // site client met contactDemo a false, pose les cles (Resend + Turnstile) et
  // deploie en SSR (preset Workers): submit() poste alors vers /api/contact.
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
    contactToEmail: process.env.CONTACT_TO_EMAIL,
    contactFromEmail: process.env.CONTACT_FROM_EMAIL,
    // Token de lecture Sanity, SERVER-ONLY (jamais dans public): lecture
    // authentifiee de translation.metadata au build via le client dedie du plugin
    // 01.content. Source: NUXT_SANITY_TOKEN (|| SANITY_API_READ_TOKEN en repli).
    sanityReadToken,
    public: {
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
      // URL du Studio pour un eventuel lien « Ouvrir le Studio » du chrome preview.
      // Vide en statique (aucun lien rendu); posee en preview via NUXT_PUBLIC_STUDIO_URL.
      studioUrl: studioUrl || '',
      contactDemo: true,
      // Couture de build pour app/router.options.ts: les slugs de categories du
      // blogue PAR LANGUE (deja fetches pour les routes de prerendu), injectes en
      // config publique. scrollBehavior les lit via useRuntimeConfig (locale
      // derivee du chemin), plus deterministe que lire le payload du plugin
      // 01.content (aucune dependance a l'ordre d'execution des plugins).
      wf: {
        categorySlugs: {
          fr: slugsByLocale.fr.categories.map((c) => c.slug),
          en: slugsByLocale.en.categories.map((c) => c.slug)
        }
      }
    }
  }
})
