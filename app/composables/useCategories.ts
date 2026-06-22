// Acces aux categories de blog (collection adressable).
//
// V2 (Sanity, fail-fast): lit la collection du payload (triee `order asc` par la
// query). Les items portent `translations` (slug partage fr/en), consomme par
// setI18nParams sur la page de categorie. Porte 1:1 de Minimaliste.

import type { CategoryContent } from '~/content/blog'
import type { Translated } from '~/sanity/transform'

export function useCategories(): Translated<CategoryContent>[] {
  return usePayload().collections.categories
}

export function useCategory(slug: string): Translated<CategoryContent> | undefined {
  return useCategories().find((c) => c.slug === slug)
}
