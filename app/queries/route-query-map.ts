// Table route -> requete scopee par-page (preview).
//
// C'est le « par-page » du pipeline: chaque route est mappee vers SON fichier de
// requete (app/queries/pages/), miroir du graphe de prod (documents.ts). Source
// de verite des chemins: app/config/route-map.ts (un seul endroit pour les
// segments d'URL, bilingue). Plain TS, imports relatifs.
//
// Famille Ancree: pas de route project; le hub des villes (/villes, /service-areas)
// remplace /projets, et le detail ville (/villes/<slug>) remplace /projets/<slug>.
// Le segment parent des villes est localise (DOC_ROUTES.serviceCity.urls), le slug
// est partage fr/en.

import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  ROUTES,
  ONE_PAGER_PAGES,
  DOC_ROUTES,
  type Locale
} from '../config/route-map'
import { HOME_QUERY } from './pages/home'
import { SERVICES_INDEX_QUERY } from './pages/services-index'
import { SERVICE_DETAIL_QUERY } from './pages/service-detail'
import { VILLES_INDEX_QUERY } from './pages/villes-index'
import { SERVICE_CITY_DETAIL_QUERY } from './pages/service-city-detail'
import { ABOUT_QUERY } from './pages/about'
import { BLOG_INDEX_QUERY } from './pages/blog-index'
import { ARTICLE_DETAIL_QUERY } from './pages/article-detail'
import { FAQ_QUERY } from './pages/faq'
import { CONTACT_QUERY } from './pages/contact'
import { ONE_PAGER_QUERY } from './pages/one-pager'
import { LEGAL_QUERY } from './pages/legal'

export interface PreviewQuery {
  /** La requete GROQ de la route (un des fichiers de pages/). */
  query: string
  /** Slug de l'item de detail (dernier segment); '' pour les routes sans detail.
   *  Toujours passe en param $slug; ignore par les requetes qui ne le referent pas. */
  slug: string
}

/** Retire le prefixe de locale (`/en`) d'un chemin et retourne la locale detectee. */
export function stripLocale(path: string): { locale: Locale; rest: string } {
  for (const loc of SUPPORTED_LOCALES) {
    if (loc === DEFAULT_LOCALE) continue
    const prefix = `/${loc}`
    if (path === prefix) return { locale: loc, rest: '/' }
    if (path.startsWith(`${prefix}/`)) return { locale: loc, rest: path.slice(prefix.length) }
  }
  return { locale: DEFAULT_LOCALE, rest: path || '/' }
}

/** Base d'URL (sans prefixe, sans segment dynamique) du detail ville pour une
 *  locale: /villes (fr) ou /service-areas (en), derivee de DOC_ROUTES.serviceCity. */
function serviceCityBase(locale: Locale): string {
  return DOC_ROUTES.serviceCity.urls[locale].replace('/[slug]', '')
}

/**
 * Deduit la requete scopee + le slug d'un chemin. Les pages fixes -> leur requete
 * de singleton; les pages de detail -> leur requete de detail + $slug (dernier
 * segment). Le cas /blog/<slug> ambigu (categorie vs article) est servi par
 * ARTICLE_DETAIL_QUERY: si $slug est une categorie, aucun article ne matche et la
 * collection reste en cartes (correct pour l'archive). Routes legales et inconnues
 * -> LEGAL_QUERY (chrome global seulement).
 */
export function resolvePreviewQuery(path: string): PreviewQuery {
  const { locale, rest } = stripLocale(path)
  const p = rest.replace(/\/+$/, '') || '/'
  if (p === '/') return { query: HOME_QUERY, slug: '' }

  const segs = p.slice(1).split('/')
  const last = segs[segs.length - 1] ?? ''

  const servicesBase = ROUTES.services.path[locale]
  const villesBase = serviceCityBase(locale)
  const blogBase = ROUTES.blog.path[locale]

  // Pages fixes (correspondance exacte).
  if (p === servicesBase) return { query: SERVICES_INDEX_QUERY, slug: '' }
  if (p === ROUTES.villes.path[locale]) return { query: VILLES_INDEX_QUERY, slug: '' }
  if (p === ROUTES.about.path[locale]) return { query: ABOUT_QUERY, slug: '' }
  if (p === ROUTES.faq.path[locale]) return { query: FAQ_QUERY, slug: '' }
  if (p === ROUTES.contact.path[locale]) return { query: CONTACT_QUERY, slug: '' }
  if (p === ONE_PAGER_PAGES.index.path[locale]) return { query: ONE_PAGER_QUERY, slug: '' }

  // Pages legales (multipage + one-pager): chrome global seulement.
  if (p === ROUTES.terms.path[locale] || p === ROUTES.privacy.path[locale]) return { query: LEGAL_QUERY, slug: '' }
  if (p === ONE_PAGER_PAGES.terms.path[locale] || p === ONE_PAGER_PAGES.privacy.path[locale]) return { query: LEGAL_QUERY, slug: '' }

  // Blog: index + pagination = listing (blogPage full); sinon article/categorie.
  if (p === blogBase) return { query: BLOG_INDEX_QUERY, slug: '' }
  if (p.startsWith(`${blogBase}/page/`)) return { query: BLOG_INDEX_QUERY, slug: '' }
  if (p.startsWith(`${blogBase}/`)) return { query: ARTICLE_DETAIL_QUERY, slug: last }

  // Pages de detail a slug.
  if (p.startsWith(`${servicesBase}/`)) return { query: SERVICE_DETAIL_QUERY, slug: last }
  if (p.startsWith(`${villesBase}/`)) return { query: SERVICE_CITY_DETAIL_QUERY, slug: last }

  // Route inconnue: chrome global, la page gere son propre 404.
  return { query: LEGAL_QUERY, slug: '' }
}
