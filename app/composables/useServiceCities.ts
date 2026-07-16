// Selection dans la collection de villes desservies (serviceCity, le moteur SEO
// local d'Ancrée, fondé sur les pages de villes et de services).
//
// V2 (Sanity, fail-fast): la collection vient du payload (triee `order asc` par la
// query); le filtrage reste local. Le document porte `translations` (slug partagé fr/en)
// et, pour l'item de détail courant, `body`/`seo`. Les filtres disponibles sont
// featured, exclude, limit et pad.

import type { ServiceCityWithDetail } from '~/sanity/transform'

export interface ServiceCityQuery {
  featured?: boolean
  /** Slug a exclure (autres villes sur une page de detail). */
  exclude?: string
  limit?: number
  /** Completer jusqu'a `limit` avec d'autres villes si la selection est plus courte. */
  pad?: boolean
}

export function useServiceCities(query: ServiceCityQuery = {}): ServiceCityWithDetail[] {
  const cities = usePayload().collections.serviceCities
  let out = cities
  if (query.featured) out = out.filter((c) => c.featured)
  if (query.exclude) out = out.filter((c) => c.slug !== query.exclude)

  // pad: si la selection filtree est plus courte que limit, completer avec
  // d'autres villes (hors doublons et hors exclude), vedettes d'abord, pour ne
  // jamais afficher une grille esseulee.
  if (query.pad && typeof query.limit === 'number' && out.length < query.limit) {
    const have = new Set(out.map((c) => c.slug))
    const fillers = cities
      .filter((c) => !have.has(c.slug) && c.slug !== query.exclude)
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    out = [...out, ...fillers]
  }

  if (typeof query.limit === 'number') out = out.slice(0, query.limit)
  return out
}

export function useServiceCity(slug: string): ServiceCityWithDetail | undefined {
  return usePayload().collections.serviceCities.find((c) => c.slug === slug)
}
