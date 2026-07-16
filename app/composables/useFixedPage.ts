// useFixedPage: acces SYNCHRONE au document d'une page du payload (heros si la
// page en porte un, pageBuilder semi-resolu, SEO avec replis deja faits au
// transform, et champs propres comme les CTA du blogue ou les sections de la FAQ).
//
// Composable interne ADDITIF: sert usePageHero, les appels usePageSeo des pages et
// les gabarits des pages de détail.

import type { ContentPayload, BlogPagePayload } from '~/sanity/transform'

export function useFixedPage<K extends keyof ContentPayload['pages']>(
  key: K
): ContentPayload['pages'][K] {
  return usePayload().pages[key]
}

/** Copie des pages du blogue (CTA des trois sorties de conversion + en-tete des
 *  articles relies). Liens deja resolus en href au transform. */
export function useBlogPageContent(): BlogPagePayload {
  return useFixedPage('blog')
}
