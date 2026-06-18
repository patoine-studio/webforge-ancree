<script setup lang="ts">
import type { BlockBase } from '~/types/blocks'
import type { ServiceAreaContent } from '~/content/service-area'

// Zone de service: en-tête (titre requis + amorce) puis une grille de chips de
// zones desservies, chacune coiffée d'une épingle, et une note optionnelle.
const serviceArea = defineProps<BlockBase<'service-area'> & ServiceAreaContent>()
</script>

<template>
  <section class="wf-section wf-service-area">
    <div class="wf-container">
      <SectionHead :eyebrow="serviceArea.eyebrow" :heading="serviceArea.heading" :lead="serviceArea.lead" />

      <!-- Chips de zone: épingle (décorative) + nom de secteur. -->
      <ul class="wf-area-list" data-reveal-stagger>
        <li v-for="(area, i) in serviceArea.areas" :key="i" class="wf-chip">
          <Icon name="lucide:map-pin" class="wf-chip-icon" aria-hidden="true" />
          <span class="wf-chip-label">{{ area.name }}</span>
        </li>
      </ul>

      <p v-if="serviceArea.note" class="wf-body-3 wf-text-muted wf-area-note">{{ serviceArea.note }}</p>
    </div>
  </section>
</template>
