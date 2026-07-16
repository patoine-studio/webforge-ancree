/**
 * Source unique du mode preview Sanity. TypeScript sans import, utilisable dans
 * l'application et le serveur.
 *
 * Le module @nuxtjs/sanity pose un cookie quand l'editeur valide un secret via
 * `/preview/enable` (route fournie par le module, active SEULEMENT quand
 * sanity.visualEditing est configure, donc jamais en statique pur). Consommateurs:
 *   - server/api/exit-preview.get.ts : deleteCookie + 204
 *
 * L'activation complète est gardée par la branche WORKERS_CI_BRANCH, le token,
 * le studioUrl et la constante de compilation __WF_PREVIEW__.
 */

export const PREVIEW_COOKIE_NAME = 'sanity-preview-id'

/** Endpoint custom de sortie du preview, sans redirection serveur. */
export const EXIT_PREVIEW_PATH = '/api/exit-preview'

/**
 * Sortie cross-domaine preview -> prod. Le domaine preview sert des brouillons;
 * « Quitter la previsualisation » doit ramener au site PUBLIE, au MEME chemin, sur
 * le domaine de prod. Derivation par convention de nommage des Workers
 * (`<worker>-preview.<zone>` -> `<worker>.<zone>`): on retire le suffixe `-preview`
 * du PREMIER segment de l'hote. Portable sans config par repo de famille.
 *
 * Retourne `null` si l'hote n'est PAS un hote preview (dev local, ou le domaine
 * prod lui-meme): le caller garde alors une navigation relative.
 */
export function prodHostFromPreviewHost(host: string): string | null {
  const prodHost = host.replace(/^([^.]+)-preview\./, '$1.')
  return prodHost === host ? null : prodHost
}
