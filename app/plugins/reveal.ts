/* Enregistre la directive v-reveal globalement. Plugin universel (pas de suffixe
 * .client) pour que la directive se resolve au SSR/prerender sans avertissement;
 * ses hooks ne s'executent que cote client de toute facon. */
import { reveal } from '~/directives/reveal'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
