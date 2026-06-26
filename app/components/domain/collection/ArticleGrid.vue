<script setup lang="ts">
/* Grille de cartes d'article. Deux modes:
 *  - AUTO (defaut, listes et archives): autant de colonnes que la mesure minimale en
 *    permet, responsive sans media query. auto-FILL (pas auto-fit): une carte seule
 *    ou en fin de rangee garde sa largeur de colonne au lieu de s'etirer pleine page.
 *  - FIXE (`columns`, relies): nombre de colonnes borne (1 a 3), cartes a largeur
 *    confortable calees a l'axe gauche sous le titre de section, pour qu'un seul
 *    article relie reste une carte posee et non un bloc pleine page. */
import { computed } from 'vue'
import type { ArticleCardData } from '~/composables/useArticles'

const props = withDefaults(
  defineProps<{
    cards: ArticleCardData[]
    minColWidth?: string
    headingLevel?: 'h2' | 'h3'
    /** >0: borne le nombre de colonnes (1 a 3) plutot que l'auto-remplissage. */
    columns?: number
  }>(),
  { minColWidth: '30rem', headingLevel: 'h2', columns: 0 }
)

const fixedCols = computed(() => (props.columns > 0 ? Math.min(props.columns, 3) : 0))
</script>

<template>
  <ul
    class="agrid"
    :class="{ 'agrid--fixed': fixedCols }"
    :style="fixedCols ? { '--agrid-cols': fixedCols } : { '--agrid-min': minColWidth }"
  >
    <li v-for="card in cards" :key="card.slug" class="agrid__item">
      <ArticleCard :card="card" :heading-level="headingLevel" />
    </li>
  </ul>
</template>

<style scoped>
.agrid {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 2.4rem;
}
/* Mode auto: autant de colonnes que la mesure minimale en permet. auto-fill garde
 * les pistes vides, donc une carte orpheline ne s'etire jamais pleine largeur. */
.agrid:not(.agrid--fixed) {
  grid-template-columns: repeat(auto-fill, minmax(min(var(--agrid-min), 100%), 1fr));
}
/* Mode fixe (relies): 1 colonne au mobile, N (1 a 3) au desktop. La grille est bornee
 * a N cartes confortables et reste calee a gauche (sous le titre), jamais pleine page
 * pour une seule carte. */
.agrid--fixed {
  grid-template-columns: 1fr;
  max-width: 42rem;
}
@container site (min-width: 768px) {
  .agrid--fixed {
    grid-template-columns: repeat(var(--agrid-cols), 1fr);
    max-width: calc(var(--agrid-cols) * 42rem + (var(--agrid-cols) - 1) * 2.4rem);
  }
}
.agrid__item {
  display: flex;
}
.agrid__item > * {
  width: 100%;
}
</style>
