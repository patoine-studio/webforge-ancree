// useHeroContent: acces au contenu du heros d'accueil, homogene avec useContent()
// et useOnePagerBlocks(): la page n'importe jamais le contenu en dur.
//
// Le heros n'est PAS un bloc de page-builder (composant impose par le type de
// page): il a son propre accesseur plutot que de transiter par le page-builder.
//
// V2 (Sanity, fail-fast): deux documents portent un heros d'accueil: homePage (CTA
// en routes, mode multipage) et onePager (CTA en ancres). Le parametre `source`
// (optionnel, defaut 'home') choisit le document. Les CTA sortent du transform deja
// résolus en href: les pages ne les réécrivent plus.

import { computed, type ComputedRef } from 'vue'
import type { HeroHomeBlock } from '~/types/blocks'

// computed: le heros d'accueil/one-pager se met a jour in-place en preview (le
// template auto-unwrap le ref; usePayload() lit le store live).
export function useHeroContent(source: 'home' | 'one-pager' = 'home'): ComputedRef<HeroHomeBlock> {
  return computed(() => {
    const heroes = usePayload().heroes
    return source === 'one-pager' ? heroes.onePager : heroes.home
  })
}
