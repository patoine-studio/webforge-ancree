<script setup lang="ts">
/* One-pager de la demo Rempart Extermination (mode One-Pager, sous /one-pager).
 * Tout sur une page: heros + tous les blocs, nav par ancres + scrollspy (layout
 * landing, en-tete qualifie par la racine /one-pager). Le contenu vient de Sanity
 * (une requete au build), repli sur les fixtures si le dataset est vide. */
import type { PageBlock } from '~/types/blocks'

definePageMeta({ layout: 'landing' })

const { t } = useI18n()

// Contenu de l'accueil depuis le payload unique (plugin 01.content), repli fixtures.
// Le one-pager rend TOUS les blocs (pas de filtre passerelle, contrairement a /).
const home = useHome()
const hero = computed(() => home.value.hero)

// Cartes de services: pas de lien live tant que les pages par nuisible n'existent
// pas (Phase B); on neutralise les href (comme l'accueil et la showcase), sinon le
// repli fixtures pointerait vers /extermination/<nuisible> (404, segment retire).
// Les ancres internes du one-pager (#contact, etc.) restent valides telles quelles.
const blocks = computed<PageBlock[]>(() =>
  home.value.blocks.map((b) => {
    if (b._type === 'services') {
      const items = (b as { items?: Array<Record<string, unknown>> }).items ?? []
      return { ...b, items: items.map((it) => ({ ...it, href: undefined })) } as PageBlock
    }
    return b
  })
)

// One-pager: gabarit de titre neutralise (le doc porte le titre complet de
// marque), visuel OG du heros. Sous-arbre NOINDEX (vitrine du palier 1 qui
// duplique le multipage), aussi exclu du sitemap (nuxt.config). Le flag reste du
// code (pattern du gabarit), conserve meme si le site bascule indexable.
usePageSeo({
  title: home.value.seo.title || t('home.title'),
  titleTemplate: null,
  description: home.value.seo.description || t('home.lead'),
  image: hero.value.visual.src,
  noindex: true
})
</script>

<template>
  <Hero :hero="hero" />
  <PageBuilder :blocks="blocks" reveal />
</template>
