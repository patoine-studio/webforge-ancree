<script setup lang="ts">
/* LangSwitcher: bascule FR <-> EN du chrome de nav.
 *
 * Element <a> natif en PLEIN CHARGEMENT, jamais <NuxtLink> ni
 * <SwitchLocalePathLink>: le graphe de contenu est fetche PAR LANGUE par
 * app/plugins/01.content.ts au chargement de l'app (payload wf-content-<locale>,
 * cote serveur seulement). Une navigation client cross-locale garderait le graphe
 * de la langue de depart, et usePayload() leverait « Contenu Sanity non charge ».
 * Le plein chargement relance le plugin SSR sur la langue cible. Le libelle
 * affiche la langue CIBLE (page FR -> « English », page EN -> « Francais »).
 *
 * Resolution de l'URL cible:
 *  - Pages fixes et pagination (/blog/page/N): switchLocalePath() resout par le
 *    nom de route via customRoutes (route-map.buildI18nPages), juste des le rendu
 *    serveur (param n identique aux deux langues, repris de la route courante).
 *  - Pages detail (param `slug`: services au slug TRADUIT par langue, villes au
 *    slug partage, catch-all blog): switchLocalePath n'est juste qu'une fois les
 *    params poses par la page (setI18nParams). Or le Header rend AVANT la page
 *    (ordre SSR): tant que les params ne sont pas poses, repli sur la racine de la
 *    locale cible (jamais un slug FR sous /en, 404 garantie en statique + pages
 *    fantomes via crawlLinks). Cote client, on resynchronise apres le montage
 *    (onMounted + page:finish): le lien devient l'URL exacte traduite.
 */
import { localePrefix, type Locale } from '~/config/route-map'

const { t, locale } = useI18n()
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()

const targetLocale = computed<Locale>(() => (locale.value === 'en' ? 'fr' : 'en'))
const targetRoot = computed(() => localePrefix(targetLocale.value) || '/')

/* Cle meta INTERNE de @nuxtjs/i18n (v10) ou setI18nParams depose les params par
 * locale. setI18nParams ecrit dans l'objet meta BRUT du routeur, hors reactivite
 * Vue: le tick force la reevaluation du computed une fois la page montee
 * (hydratation et navigations client), moment ou les params sont garantis poses.
 * A revalider au bump majeur du module. */
const I18N_PARAMS_META_KEY = 'nuxtI18nInternal'
const tick = ref(0)

const nuxtApp = useNuxtApp()
const unhook = nuxtApp.hook('page:finish', () => {
  tick.value++
})
onMounted(() => {
  tick.value++
})
onBeforeUnmount(() => {
  unhook()
})

const href = computed(() => {
  void tick.value
  if ('slug' in route.params) {
    const params = route.meta[I18N_PARAMS_META_KEY] as Record<string, unknown> | undefined
    if (!params || Object.keys(params).length === 0) return targetRoot.value
  }
  return switchLocalePath(targetLocale.value) || targetRoot.value
})
</script>

<template>
  <a :href="href" :hreflang="targetLocale" :lang="targetLocale">{{ t('home.switch') }}</a>
</template>
