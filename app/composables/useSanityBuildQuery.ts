/* Requete Sanity lue au BUILD/SSR uniquement, JAMAIS depuis le navigateur.
 *
 * Le site est genere statiquement: les donnees sont lues au prerendu (cote serveur,
 * sans CORS), serialisees dans le payload de chaque route, et la navigation cliente
 * lit ce payload. On NE fetch JAMAIS depuis le client:
 *   - le CDN/API public de Sanity bloque l'origine localhost par CORS (dev), et
 *     `perspective=raw` (defaut du client) renvoie 403 sur une lecture publique;
 *   - un site statique ne doit dependre d'aucun appel reseau a l'execution.
 *
 * Le garde `import.meta.server` coupe le fetch cote client: en navigation cliente
 * sans payload prerendu (dev), la requete rend `null` et l'appelant retombe sur ses
 * fixtures. En prod statique, la navigation cliente lit le payload (donnee Sanity du
 * build), donc aucun fetch. C'est un palier: quand le pipeline de payload unique
 * (plugin de contenu, etape ulterieure) arrivera, il remplacera ces requetes par
 * page par une seule lecture hydratee. */
export function useSanityBuildQuery<T>(key: string, query: string, params: Record<string, unknown>) {
  const sanity = useSanity()
  return useAsyncData<T | null>(key, () =>
    import.meta.server ? (sanity.fetch<T>(query, params) as Promise<T | null>) : Promise.resolve(null)
  )
}
