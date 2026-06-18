<script setup lang="ts">
/* CallBar — barre d'appel collante en bas, MOBILE seulement (famille Ancrée).
 *
 * Le téléphone est le héros: sur petit écran, un rappel d'appel permanent,
 * pleine largeur, cible tactile confortable (>= 48px, DESIGN.md). Ambre de
 * conversion. Lit le numéro depuis siteSettings (un seul point d'édition).
 *
 * Visibilité pilotée par @container site dans global.css (.wf-callbar): masquée
 * au-dessus du breakpoint mobile, où le bouton d'appel du header suffit. */
const site = useContent('site')
const { t } = useI18n()
</script>

<template>
  <a
    class="wf-callbar"
    :href="`tel:${site.contact.phoneE164}`"
    :aria-label="t('a11y.call_label', { phone: site.contact.phone })"
  >
    <Icon name="lucide:phone-call" class="wf-callbar-icon" aria-hidden="true" />
    <span class="wf-callbar-text">{{ t('ui.call_now') }}</span>
    <span class="wf-callbar-num">{{ site.contact.phone }}</span>
  </a>
</template>
