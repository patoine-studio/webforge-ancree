<script setup lang="ts">
/* Page legale (gabarit de demo). En-tete solide: hauteur reservee. */
const { t } = useI18n()
useSeoMeta({ title: () => `${t('pages.terms_heading')} | Rempart Extermination` })
</script>

<template>
  <article class="legal">
    <div class="wf-container">
      <p class="legal__kicker wf-caption"><span class="legal__tick" aria-hidden="true" />{{ t('footer.nav_heading') }}</p>
      <h1 class="legal__title wf-h2">{{ t('pages.terms_heading') }}</h1>
      <p class="legal__body wf-body-1 wf-text-muted">{{ t('pages.legal_body') }}</p>
    </div>
  </article>
</template>

<style scoped>
.legal {
  padding-block: calc(var(--header-height) + 5rem) var(--space-block-default);
}
.legal__kicker {
  display: inline-flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 1.6rem;
  color: var(--text-muted);
}
.legal__tick {
  display: inline-block;
  width: 2.6rem;
  height: 3px;
  border-radius: 2px;
  background: var(--accent-call);
}
.legal__body {
  margin-top: var(--space-title-lead);
  max-width: 60ch;
}
</style>
