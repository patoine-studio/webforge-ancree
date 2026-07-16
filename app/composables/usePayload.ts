// usePayload: acces SYNCHRONE au graphe de contenu transforme.
//
// Le fetch unique (par langue) vit dans app/plugins/01.content.ts: useAsyncData
// y depose le ContentPayload sous la cle payloadKey(). Ici on ne fait que LIRE ce
// cache (useNuxtData), jamais fetcher: les composables publics (useContent,
// useServices, useServiceCities...) gardent leurs signatures synchrones.
//
// Posture fail-fast: usePayload() lève une erreur 500 quand le
// payload est absent. Plus de retour `null`, plus de repli fixtures runtime: un
// rendu sans contenu doit echouer fort, jamais produire un site vide.
//
// Purete statique: la branche preview (override live) est gardee par la constante
// de compilation __WF_PREVIEW__ (false en build statique) + import.meta.client.
// Rollup elimine la branche morte -> aucune trace visual-editing dans le bundle.

import type { ContentPayload, WfLocale } from '~/sanity/transform'

/** Locale de contenu courante, lue de l'instance i18n de l'app (par $i18n, pas
 *  useI18n): appelable des plugins ET des composables hors setup. Les codes
 *  configures dans nuxt.config sont exactement 'fr' | 'en'. */
export function useWfLocale(): WfLocale {
  return useNuxtApp().$i18n.locale.value as WfLocale
}

/** Cle du payload dans le cache Nuxt, par langue: wf-content-<locale>. */
export function payloadKey(locale: WfLocale = useWfLocale()): string {
  return `wf-content-${locale}`
}

/** Cle de l'etat live (mode preview), par langue: wf-live-payload-<locale>.
 *  Alimentee par le plugin 02.preview-live (client) a chaque snapshot, lue par
 *  usePayload(). Distincte de payloadKey: la base SSR reste la source
 *  d'hydratation, le live n'override qu'apres le handshake, cote client. */
export function livePayloadKey(locale: WfLocale = useWfLocale()): string {
  return `wf-live-payload-${locale}`
}

/** Le graphe de contenu de la langue courante. Lecture synchrone: le plugin
 *  01.content a deja charge (ou echoue fort) avant tout setup de page. THROW si
 *  le payload est absent (fail-fast: aucun repli fixtures). */
export function usePayload(): ContentPayload {
  // Mode preview (client): si le moteur live (plugin 02.preview-live) a un
  // snapshot, il prime sur la base SSR. Branche morte en statique/SSR (gardes
  // __WF_PREVIEW__ + import.meta.client), elaguee par Rollup.
  if (__WF_PREVIEW__ && import.meta.client) {
    const live = useState<ContentPayload | null>(livePayloadKey(), () => null)
    if (live.value) return live.value
  }
  const { data } = useNuxtData<ContentPayload>(payloadKey())
  if (!data.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Contenu Sanity non charge (plugin 01.content)'
    })
  }
  return data.value
}
