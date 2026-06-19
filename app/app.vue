<script setup lang="ts">
// Liens alternate hreflang fr-CA / en-CA / x-default sur les deux arbres de
// langue (plomberie i18n SEO conservée). useLocaleHead({ seo: true }) active
// l'émission des alternates; on ne lie ici que les rel=alternate.
const i18nHead = useLocaleHead({ dir: false, lang: false, seo: true })
useHead(() => ({
  link: (i18nHead.value.link ?? []).filter((l) => l.rel === 'alternate')
}))

// Overlay de grille, outil dev seulement (touche `g`). Hors bundle de prod.
const isDev = import.meta.dev
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <DevGrid v-if="isDev" />
</template>
