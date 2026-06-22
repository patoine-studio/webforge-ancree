<script setup lang="ts">
/* Guide de style — atomes/composants de la famille Ancree: boutons (variantes +
 * fond sombre), liens, icones et accordeon, rendus EN VRAI depuis les composants
 * UI de prod. Rendu DANS la section #composants de /showcase. */
import Button from '~/components/ui/button/index.vue'
import Accordion from '~/components/ui/accordion/index.vue'

const { t } = useI18n()

const icons = ['lucide:phone', 'lucide:arrow-right', 'lucide:map-pin', 'lucide:shield-check', 'lucide:chevron-down']

const accItems = [
  { title: t('showcase.styleguide.atoms.acc1_q'), content: t('showcase.styleguide.atoms.acc1_a') },
  { title: t('showcase.styleguide.atoms.acc2_q'), content: t('showcase.styleguide.atoms.acc2_a') }
]
</script>

<template>
  <div class="sg-atoms">
    <h3 class="sg-atoms__group wf-caption">{{ t('showcase.styleguide.atoms.buttons') }}</h3>
    <div class="sg-atoms__row">
      <Button variant="call" icon="lucide:phone">{{ t('hero.cta_primary') }}</Button>
      <Button variant="primary" icon="lucide:arrow-right">{{ t('ui.learn_more') }}</Button>
      <Button variant="ghost" :icon="false">{{ t('nav.contact') }}</Button>
      <Button variant="primary" size="sm" icon="lucide:arrow-right">{{ t('showcase.styleguide.atoms.sm') }}</Button>
      <Button variant="primary" :icon="false" disabled>{{ t('showcase.styleguide.atoms.disabled') }}</Button>
    </div>

    <h3 class="sg-atoms__group wf-caption">{{ t('showcase.styleguide.atoms.buttons_ondark') }}</h3>
    <div class="sg-atoms__row sg-atoms__row--dark">
      <Button variant="call" icon="lucide:phone">{{ t('hero.cta_primary') }}</Button>
      <Button variant="ghost" tone="ondark" :icon="false">{{ t('nav.contact') }}</Button>
    </div>

    <h3 class="sg-atoms__group wf-caption">{{ t('showcase.styleguide.atoms.icon') }}</h3>
    <ul class="sg-atoms__icons">
      <li v-for="name in icons" :key="name" class="sg-atoms__icon">
        <Icon :name="name" aria-hidden="true" />
        <code class="sg-atoms__token">{{ name }}</code>
      </li>
    </ul>

    <h3 class="sg-atoms__group wf-caption">{{ t('showcase.styleguide.atoms.accordion') }}</h3>
    <Accordion :items="accItems" :heading-level="4" :default-open="[0]" />
  </div>
</template>

<style scoped>
.sg-atoms__group {
  margin: 0 0 2rem;
  color: var(--text-muted);
}
.sg-atoms__group:not(:first-child) {
  margin-top: 5rem;
}
.sg-atoms__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
}
.sg-atoms__row--dark {
  padding: 2.8rem;
  background: var(--bg-deep);
  border-radius: var(--radius);
}
.sg-atoms__icons {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
}
.sg-atoms__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  font-size: 2.4rem;
  color: var(--text-base);
}
.sg-atoms__token {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--text-muted);
}
</style>
