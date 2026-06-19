<script setup lang="ts">
/* Accueil de la demo Rempart Extermination. Le contenu vient de Sanity (une
 * requete au build, transformee vers les formes que les composants consomment).
 * Si le dataset est vide ou injoignable, on retombe sur les fixtures: le site
 * rend toujours. Heros split full bleed, puis la page-builder decline la
 * signature « s'ancre en montant ». */
import { HOME_QUERY, transformHome } from '~/sanity/content'

const { t, locale } = useI18n()

const { data: raw } = await useSanityQuery<unknown>(HOME_QUERY, { lang: locale.value })

const home = computed(() => transformHome(raw.value, locale.value as 'fr' | 'en'))

// Fixtures de repli (contenu identique au seed; garantit un rendu en l'absence
// de donnees Sanity).
const heroFallback = useHeroContent()
const blocksFallback = useHomeBlocks()

const hero = computed(() => home.value?.hero ?? heroFallback.value)
const blocks = computed(() => home.value?.blocks ?? blocksFallback)

useSeoMeta({
  title: () => home.value?.seo.title || t('home.title'),
  description: () => home.value?.seo.description || t('home.lead')
})
</script>

<template>
  <Hero :hero="hero" />
  <PageBuilder :blocks="blocks" reveal />
</template>
