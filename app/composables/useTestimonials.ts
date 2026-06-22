// Selection dans la banque de temoignages.
//
// V2 (Sanity, fail-fast): la banque vient du payload (triee `order asc` par la
// query, ids = _id Sanity); le filtrage reste local. Calque sur Minimaliste, avec
// le filtre `city` (slug de serviceCity) a la place de `project`.

import type { TestimonialPayload } from '~/sanity/transform'

export interface TestimonialQuery {
  ids?: string[]
  service?: string
  /** Slug de la ville (serviceCity) liee au temoignage. Remplace `project`. */
  city?: string
  featured?: boolean
  limit?: number
  /** Completer jusqu'a `limit` avec d'autres temoignages si la selection est plus courte. */
  pad?: boolean
}

export function useTestimonials(query: TestimonialQuery = {}): TestimonialPayload[] {
  const testimonials = usePayload().collections.testimonials
  let out = testimonials
  if (query.ids) {
    // L'ordre des ids fait foi (selection manuelle), pas l'ordre de la banque;
    // une ref brisee est ecartee sans trou. Meme regle que useFaq({ ids }).
    const byId = new Map(out.map((t) => [t.id, t]))
    out = query.ids.map((id) => byId.get(id)).filter((t): t is TestimonialPayload => t !== undefined)
  }
  if (query.service) out = out.filter((t) => t.service === query.service)
  if (query.city) out = out.filter((t) => t.city === query.city)
  if (query.featured) out = out.filter((t) => t.featured)

  // pad: si la selection filtree est plus courte que limit, completer avec
  // d'autres temoignages (hors doublons), vedettes d'abord, pour remplir la grille.
  if (query.pad && typeof query.limit === 'number' && out.length < query.limit) {
    const have = new Set(out.map((t) => t.id))
    const fillers = testimonials
      .filter((t) => !have.has(t.id))
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    out = [...out, ...fillers]
  }

  if (typeof query.limit === 'number') out = out.slice(0, query.limit)
  return out
}
