import type { SlugValidationContext } from 'sanity'

/**
 * Unicité de slug PAR LANGUE, pour les collections en i18n document-level dont le
 * slug est partagé entre les langues (documentInternationalization: { exclude: true }).
 *
 * Le défaut de Sanity vérifie l'unicité sur tout le dataset: deux traductions qui
 * partagent legitimement le même slug (ex. la ville Laval en fr et en, slug « laval »
 * sur les deux) sont alors marquées en conflit (champ rouge). On scope l'unicité au
 * couple (type, langue) et on exclut le document courant (brouillon + publié): chaque
 * langue ne porte qu'un document par slug, donc la traduction jumelle n'est plus un
 * conflit.
 */
export async function isUniqueAcrossLocale(
  slug: string,
  context: SlugValidationContext,
): Promise<boolean> {
  const { document, getClient } = context
  if (!document) return true
  const client = getClient({ apiVersion: '2024-09-01' })
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type: document._type,
    language: (document as { language?: string }).language ?? null,
  }
  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    _type == $type &&
    language == $language &&
    slug.current == $slug
  ][0]._id)`
  return client.fetch(query, params)
}
