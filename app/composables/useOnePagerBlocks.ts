// useOnePagerBlocks: assemble la sequence de blocs du one-pager de ce site.
//
// V2 (Sanity, fail-fast): le document onePager porte le pageBuilder; resolveBlocks
// (usePageBlocks.ts) resout les items des blocs intelligents contre les collections
// du payload. Le heros n'en fait PAS partie: ce n'est pas un bloc, la page le rend
// explicitement (<HeroHome>) avant le page-builder.
//
// Adapté à la peau d'Ancrée: le contrat FaqContent n'a pas de
// drapeau faqSchema (la PEAU est intouchable), donc on ne le pose pas ici. Reste la
// decision contextuelle EN CODE (jamais un champ Studio): sur le one-pager, pas de
// pages de detail, donc les cartes services ne sont pas cliquables (href retire).

import { computed, type ComputedRef } from 'vue'
import type { PageBlock } from '~/types/blocks'

// computed: les blocs du one-pager se mettent a jour in-place en preview (template
// auto-unwrap; resolveBlocks/useFixedPage -> usePayload lisent le store live).
export function useOnePagerBlocks(): ComputedRef<PageBlock[]> {
  return computed(() =>
    resolveBlocks(useFixedPage('onePager').pageBuilder).map((block) => {
      // Pas de pages de detail sur le one-pager: cartes services non cliquables.
      if (block._type === 'services') {
        return { ...block, items: block.items.map((it) => ({ ...it, href: undefined })) }
      }
      return block
    })
  )
}
