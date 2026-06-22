// Selection et regroupement dans la banque FAQ.
//
// V2 (Sanity, fail-fast): la banque vient du payload (ids = _id Sanity); le
// filtrage reste local. Porte 1:1 de Minimaliste.
//   - useFaq({ ids }): selections manuelles (bloc faq), resolues dans l'ORDRE des
//     refs, pas l'ordre de la banque;
//   - useFaq({ theme }): theme = SLUG du faqTheme (plus le libelle);
//   - useFaqByTheme(): listing de la page /faq depuis faqPage.sections, une section
//     par theme dans l'ordre des sections.

import { computed, type ComputedRef } from 'vue'
import type { FaqItemPayload } from '~/sanity/transform'

export interface FaqQuery {
  ids?: string[]
  /** Slug du faqTheme (l'identite du theme, plus son libelle affiche). */
  theme?: string
  limit?: number
}

export function useFaq(query: FaqQuery = {}): FaqItemPayload[] {
  let out = usePayload().collections.faqItems
  if (query.ids) {
    // L'ordre des refs fait foi (selection manuelle du bloc faq); une ref brisee
    // (id absent de la banque) est ecartee sans trou.
    const byId = new Map(out.map((f) => [f.id, f]))
    out = query.ids
      .map((id) => byId.get(id))
      .filter((f): f is FaqItemPayload => f !== undefined)
  }
  if (query.theme) out = out.filter((f) => f.theme === query.theme)
  if (typeof query.limit === 'number') out = out.slice(0, query.limit)
  return out
}

export interface FaqThemeGroup {
  /** Titre affiche du theme (faqTheme.title). */
  theme: string
  /** Ancre du groupe: slug du faqTheme (id du groupe + cible du rail). */
  slug: string
  items: FaqItemPayload[]
}

// Slug d'ancre de REPLI (section sans theme seulement, cas Studio degrade):
// minuscules sans accents, non-alphanumeriques en traits d'union. Les themes reels
// portent leur propre slug (faqTheme.slug), jamais une derivation du libelle.
function fallbackSlug(label: string): string {
  return label
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Listing de la page /faq: un groupe par section de faqPage.sections, dans l'ordre
// des sections (la composition se gere au Studio). Items par mode: auto = TOUTES
// les questions du theme, triees alphabetiquement sur la question (locale courante);
// manual = les refs resolues dans leur ordre (useFaq ecarte les refs brisees).
// computed: la page /faq se met a jour in-place en preview (usePayload/useFaq lisent
// le store live). useFaq(query) reste plain (feuille).
export function useFaqByTheme(): ComputedRef<FaqThemeGroup[]> {
  return computed(() => {
    const { $i18n } = useNuxtApp()
    const locale = useWfLocale()
    // Libelle de repli d'une section sans theme (cas Studio degrade: le schema
    // exige le theme sur chaque section); en auto, son pool = les questions sans
    // theme de la banque.
    const noThemeLabel = $i18n.t('faq.no_theme')
    return usePayload().pages.faq.sections.map((section) => {
      let items: FaqItemPayload[]
      if (section.mode === 'auto') {
        const pool = section.theme
          ? useFaq({ theme: section.theme.slug })
          : usePayload().collections.faqItems.filter((f) => !f.theme)
        items = [...pool].sort((a, b) => a.q.localeCompare(b.q, locale))
      } else {
        items = useFaq({ ids: section.refs })
      }
      return {
        theme: section.theme?.title ?? noThemeLabel,
        slug: section.theme?.slug ?? fallbackSlug(noThemeLabel),
        items
      }
    })
  })
}
