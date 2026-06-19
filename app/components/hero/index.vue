<script setup lang="ts">
/* Orchestrateur de heros. <component :is> resout la variante par hero._type;
 * v-bind="hero" diffuse chaque champ de contenu en prop sur le bloc choisi.
 * _type et _key sont absorbes par les props typees, ils ne fuient pas en attrs. */
import type { HeroBlock } from '~/types/blocks'
import { heroBlockMap } from './block-map'

defineProps<{ hero: HeroBlock }>()
</script>

<template>
  <component :is="heroBlockMap[hero._type]" v-bind="hero" />
</template>
