<script setup lang="ts">
import type { BlockBase } from '~/types/blocks'
import type { BeforeAfterContent } from '~/content/before-after'

// Galerie avant/après: chaque paire montre deux figures côte à côte, coiffées
// d'un badge « Avant » / « Après » (libellés d'UI via i18n, namespace ui.*).
// Le contenu (légendes, alt) vient des props; seuls les badges sont des
// libellés d'interface réutilisables.
const beforeAfter = defineProps<BlockBase<'before-after'> & BeforeAfterContent>()

const { t } = useI18n()

// En-tête rendu seulement s'il porte un titre. Computed rétrécissant: heading
// garanti string pour <SectionHead>, qui l'exige (h2).
const head = computed(() =>
  beforeAfter.heading
    ? { eyebrow: beforeAfter.eyebrow, heading: beforeAfter.heading, lead: beforeAfter.lead }
    : undefined
)
</script>

<template>
  <section class="wf-section wf-before-after">
    <div class="wf-container">
      <SectionHead v-if="head" v-bind="head" />

      <ul class="wf-before-after-grid" data-reveal-stagger>
        <li v-for="(item, i) in beforeAfter.items" :key="i" class="wf-ba-pair">
          <div class="wf-ba-frames">
            <figure class="wf-ba-figure">
              <span class="wf-ba-badge">{{ t('ui.before') }}</span>
              <Image
                :ratio="item.before.ratio"
                :src="item.before.src"
                :alt="item.before.alt"
                :label="item.before.label"
                :caption="item.before.caption"
                sizes="sm:50vw md:50vw lg:25vw xl:25vw xxl:25vw"
              />
            </figure>
            <figure class="wf-ba-figure">
              <span class="wf-ba-badge">{{ t('ui.after') }}</span>
              <Image
                :ratio="item.after.ratio"
                :src="item.after.src"
                :alt="item.after.alt"
                :label="item.after.label"
                :caption="item.after.caption"
                sizes="sm:50vw md:50vw lg:25vw xl:25vw xxl:25vw"
              />
            </figure>
          </div>
          <p v-if="item.caption" class="wf-figcap wf-ba-caption">{{ item.caption }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
