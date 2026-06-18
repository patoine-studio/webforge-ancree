<script setup lang="ts">
import type { BlockBase } from '~/types/blocks'
import type { ReassuranceContent } from '~/content/reassurance'

// Chips de réassurance (intervention le jour même, urgence 24/7, estimation
// gratuite, prix ferme…). En-tête rendu seulement s'il porte un titre. Computed
// rétrécissant: heading garanti string pour <SectionHead>, qui l'exige (h2).
const reassurance = defineProps<BlockBase<'reassurance'> & ReassuranceContent>()

const head = computed(() =>
  reassurance.heading
    ? { eyebrow: reassurance.eyebrow, heading: reassurance.heading, lead: reassurance.lead }
    : undefined
)
</script>

<template>
  <section class="wf-section wf-reassurance">
    <div class="wf-container">
      <SectionHead v-if="head" v-bind="head" />

      <!-- Rangée de pilules: chaque chip = icône (décorative, le sens passe par
           le libellé) + libellé. Réutilise le vocabulaire .wf-chip de la famille. -->
      <ul class="wf-reassurance-chips" data-reveal-stagger>
        <li v-for="(item, i) in reassurance.items" :key="i" class="wf-chip">
          <Icon
            v-if="item.icon"
            :name="item.icon"
            class="wf-chip-icon"
            aria-hidden="true"
          />
          <span class="wf-chip-label">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
