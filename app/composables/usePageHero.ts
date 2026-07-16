// usePageHero: acces au contenu d'un heros de page de niveau 2 (masthead). Homogene
// avec useHeroContent() (accueil): le heros vit sur le document de page fixe
// correspondant, lu via le payload.

import { computed, type ComputedRef } from 'vue'
import type { ContentPayload } from '~/sanity/transform'
import type { HeroPageBlock } from '~/types/blocks'

// Cles des pages qui portent un heros de page (masthead). Les pages d'accueil et
// du one-pager portent un heros d'ACCUEIL (useHeroContent), pas un heros de page.
export type PageHeroKey = 'services' | 'villes' | 'about' | 'blog' | 'faq' | 'contact'

// computed: le heros de page se met a jour in-place en preview (template
// auto-unwrap; useFixedPage -> usePayload lit le store live).
export function usePageHero(key: PageHeroKey): ComputedRef<HeroPageBlock> {
  return computed(() => {
    const page = useFixedPage(key) as ContentPayload['pages'][PageHeroKey]
    return page.hero
  })
}
