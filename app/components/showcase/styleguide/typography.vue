<script setup lang="ts">
/* Guide de style — typographie de la famille Ancree: familles (Bitter display,
 * Source Sans 3 corps, mono) et echelle (wf-h1..wf-caption), rendues en vrai.
 * Rendu DANS la section #typographie de /showcase (pas de wrapper propre). */
const { t } = useI18n()

const families = [
  { token: '--font-display', label: t('showcase.styleguide.typography.display'), cls: 'wf-h3' },
  { token: '--font-body', label: t('showcase.styleguide.typography.body'), cls: 'wf-body-1' },
  { token: '--font-mono', label: t('showcase.styleguide.typography.mono'), cls: 'sg-mono' }
]
const scale = ['wf-h1', 'wf-h2', 'wf-h3', 'wf-h4', 'wf-h5', 'wf-body-1', 'wf-body-2', 'wf-body-3', 'wf-caption']
</script>

<template>
  <div class="sg-typo">
    <h3 class="sg-typo__group wf-caption">{{ t('showcase.styleguide.typography.families') }}</h3>
    <ul class="sg-typo__families">
      <li v-for="f in families" :key="f.token" class="sg-typo__family">
        <span class="sg-typo__specimen" :class="f.cls" :style="{ fontFamily: `var(${f.token})` }">{{ f.label }}</span>
        <code class="sg-typo__token">{{ f.token }}</code>
      </li>
    </ul>

    <h3 class="sg-typo__group wf-caption">{{ t('showcase.styleguide.typography.scale') }}</h3>
    <ul class="sg-typo__scale">
      <li v-for="cls in scale" :key="cls" class="sg-typo__row">
        <span :class="cls">{{ t('showcase.styleguide.typography.sample') }}</span>
        <code class="sg-typo__token">.{{ cls }}</code>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sg-typo__group {
  margin: 0 0 2rem;
  color: var(--text-muted);
}
.sg-typo__group:not(:first-child) {
  margin-top: 5rem;
}
.sg-typo__families {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2.4rem;
}
.sg-typo__family {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2.4rem;
  flex-wrap: wrap;
  padding-bottom: 2.4rem;
  border-bottom: var(--line-hair);
}
.sg-typo__specimen {
  color: var(--text-base);
}
.sg-mono {
  font-size: 1.8rem;
}
.sg-typo__scale {
  list-style: none;
  margin: 0;
  padding: 0;
}
.sg-typo__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2.4rem;
  padding-block: 1.8rem;
  border-bottom: var(--line-hair);
}
.sg-typo__row > :first-child {
  color: var(--text-base);
  min-width: 0;
}
.sg-typo__token {
  flex: none;
  font-family: var(--font-mono);
  font-size: 1.2rem;
  color: var(--text-muted);
}
</style>
