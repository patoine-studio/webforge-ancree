<script setup lang="ts">
/* BlockShowcaseItem — un bloc de la vitrine, avec son eventuel controle de
 * variantes (onglets segmentes). Tient son propre etat de selection: changer de
 * variante echange les props passees au composant, rendu EN VRAI dans .wf-site
 * (contexte de requete de conteneur, comme en prod). Voir useBlockCatalog pour le
 * modèle (CatalogItem.variants). */
import { computed, ref } from 'vue'
import type { BlockVariant, CatalogItem } from '~/composables/useBlockCatalog'

const props = defineProps<{ item: CatalogItem; anchorId: string; narrow?: boolean }>()

// Normalisation: un bloc sans `variants` se ramene a une variante unique (ses props
// + son badge fige). Le controle n'apparait qu'au-dela d'une variante.
const variants = computed<BlockVariant[]>(() =>
  props.item.variants?.length
    ? props.item.variants
    : [{ label: props.item.variant ?? '', props: props.item.props }]
)
const defaultIndex = computed(() => {
  const i = variants.value.findIndex((v) => v.isDefault)
  return i === -1 ? 0 : i
})
const selected = ref(defaultIndex.value)
const active = computed(() => variants.value[selected.value] ?? variants.value[0]!)
const hasControl = computed(() => variants.value.length > 1)
</script>

<template>
  <article :id="anchorId" class="wf-bs__item">
    <header class="wf-bs__bar">
      <div class="wf-container wf-bs__bar-inner">
        <span class="wf-bs__name">{{ item.label }}</span>
        <span class="wf-bs__type">{{ item.type }}</span>
        <span v-if="!hasControl && active.label" class="wf-bs__variant">{{ active.label }}</span>

        <!-- Controle de variantes: onglets segmentes (filets). Groupe a bascule. -->
        <div
          v-if="hasControl"
          class="wf-bs__variants"
          role="group"
          :aria-label="`Variantes : ${item.label}`"
        >
          <button
            v-for="(v, i) in variants"
            :key="i"
            type="button"
            class="wf-bs__variant-tab"
            :class="{ 'is-active': i === selected }"
            :aria-pressed="i === selected"
            @click="selected = i"
          >{{ v.label }}</button>
        </div>
      </div>
    </header>

    <!-- .wf-site: contexte de requete de conteneur + tokens, comme en prod.
         `narrow` (blocs d'article) enveloppe le rendu dans une colonne de lecture. -->
    <div class="wf-bs__stage" :class="{ 'is-narrow': narrow }">
      <div class="wf-site">
        <component :is="item.component" v-bind="active.props" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.wf-bs__item {
  margin-bottom: calc(var(--spacing-unit) * 6);
  scroll-margin-top: 2rem;
}
/* Bandeau pleine largeur, texte aligne sur le container. */
.wf-bs__bar {
  background: var(--bg-alt);
  border-block: var(--line-hair);
}
.wf-bs__bar-inner {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: calc(var(--spacing-unit) * 1.5);
  padding-block: calc(var(--spacing-unit) * 1.5);
}
.wf-bs__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--text-base);
}
.wf-bs__type,
.wf-bs__variant {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--text-muted);
  padding: 0.2em 0.6em;
  border: 1px solid color-mix(in oklch, var(--text-base) 15%, transparent);
  border-radius: var(--radius-sm);
}
.wf-bs__variant {
  color: var(--accent-trust);
  border-color: color-mix(in oklch, var(--accent-trust) 30%, transparent);
}

/* Onglets segmentes de variantes, pousses a droite du bandeau. */
.wf-bs__variants {
  margin-left: auto;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  border: var(--line-hair);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.wf-bs__variant-tab {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--text-muted);
  background: transparent;
  border: 0;
  border-left: var(--line-hair);
  padding: 0.35em 0.8em;
  cursor: pointer;
  transition:
    color var(--motion-duration-hover) var(--motion-ease-settle),
    background-color var(--motion-duration-hover) var(--motion-ease-settle);
}
.wf-bs__variant-tab:first-child {
  border-left: 0;
}
.wf-bs__variant-tab:hover {
  color: var(--text-base);
}
.wf-bs__variant-tab.is-active {
  color: var(--accent-trust);
  background: color-mix(in oklch, var(--accent-trust) 8%, transparent);
}
.wf-bs__stage {
  background: var(--bg-base);
}
/* Blocs d'article: contenu etroit (mesure de lecture) centre dans la scene. */
.wf-bs__stage.is-narrow .wf-site {
  max-width: 86rem;
  margin-inline: auto;
  padding-block: calc(var(--spacing-unit) * 4);
}

/* La vitrine montre l'etat FINAL des blocs: on desamorce la signature d'entree
 * (data-reveal, qui se joue en prod via GSAP) pour un guide lisible d'emblee et
 * des captures stables. */
.wf-bs__stage :deep([data-reveal]),
.wf-bs__stage :deep([data-reveal] *),
.wf-bs__stage :deep([data-reveal-stagger]),
.wf-bs__stage :deep([data-reveal-stagger] *) {
  opacity: 1 !important;
  transform: none !important;
}
</style>
