// Acces a la collection de services (adressable par slug).
//
// V2 (Sanity, fail-fast): lit la collection du payload (deja triee `order asc` par
// la query). Les items portent `translations` (slugs de l'autre langue) et `detail`
// (copie de LEUR page de detail, consommee par useServiceBlocks). Porte 1:1 de
// Minimaliste.

import type { ServiceWithMeta } from '~/sanity/transform'

export function useServices(): ServiceWithMeta[] {
  return usePayload().collections.services
}

export function useService(slug: string): ServiceWithMeta | undefined {
  return useServices().find((s) => s.slug === slug)
}
