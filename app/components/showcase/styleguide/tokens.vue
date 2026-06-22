<script setup lang="ts">
/* Guide de style — tokens de la marque/famille Ancree: palette (pigments +
 * surfaces), geometrie (rayons) et rythme vertical, rendus en vrai depuis les
 * variables CSS. Rendu DANS la section #tokens de /showcase. */
const { t } = useI18n()

const colors = [
  { token: '--navy', label: t('showcase.styleguide.tokens.color.navy') },
  { token: '--blue', label: t('showcase.styleguide.tokens.color.blue') },
  { token: '--amber', label: t('showcase.styleguide.tokens.color.amber') },
  { token: '--slate', label: t('showcase.styleguide.tokens.color.slate') },
  { token: '--paper', label: t('showcase.styleguide.tokens.color.paper') },
  { token: '--bg-alt', label: t('showcase.styleguide.tokens.color.bg_alt') },
  { token: '--bg-deep', label: t('showcase.styleguide.tokens.color.bg_deep') }
]
const radii = [
  { token: '--radius-sm', px: '8px' },
  { token: '--radius', px: '12px' },
  { token: '--radius-md', px: '16px' },
  { token: '--radius-lg', px: '20px' }
]
const rhythm = [
  { token: '--space-block-tight', rem: '5rem' },
  { token: '--space-block-default', rem: '10rem' },
  { token: '--space-block-loose', rem: '13rem' }
]
</script>

<template>
  <div class="sg-tok">
    <h3 class="sg-tok__group wf-caption">{{ t('showcase.styleguide.tokens.colors') }}</h3>
    <ul class="sg-tok__swatches">
      <li v-for="c in colors" :key="c.token" class="sg-tok__swatch">
        <span class="sg-tok__chip" :style="{ background: `var(${c.token})` }" />
        <span class="sg-tok__label">{{ c.label }}</span>
        <code class="sg-tok__token">{{ c.token }}</code>
      </li>
    </ul>

    <h3 class="sg-tok__group wf-caption">{{ t('showcase.styleguide.tokens.radius') }}</h3>
    <ul class="sg-tok__radii">
      <li v-for="r in radii" :key="r.token" class="sg-tok__radius">
        <span class="sg-tok__radius-box" :style="{ borderRadius: `var(${r.token})` }" />
        <code class="sg-tok__token">{{ r.token }}</code>
        <span class="sg-tok__meta">{{ r.px }}</span>
      </li>
    </ul>

    <h3 class="sg-tok__group wf-caption">{{ t('showcase.styleguide.tokens.rhythm') }}</h3>
    <ul class="sg-tok__rhythm">
      <li v-for="s in rhythm" :key="s.token" class="sg-tok__rhythm-row">
        <span class="sg-tok__rhythm-bar" :style="{ height: `var(${s.token})` }" />
        <span class="sg-tok__rhythm-meta">
          <code class="sg-tok__token">{{ s.token }}</code>
          <span class="sg-tok__meta">{{ s.rem }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sg-tok__group {
  margin: 0 0 2rem;
  color: var(--text-muted);
}
.sg-tok__group:not(:first-child) {
  margin-top: 5rem;
}

.sg-tok__swatches {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 2rem;
}
.sg-tok__swatch {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.sg-tok__chip {
  aspect-ratio: 3 / 2;
  border-radius: var(--radius);
  box-shadow: var(--elev-low);
  border: var(--line-soft);
}
.sg-tok__label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text-base);
}

.sg-tok__radii {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
}
.sg-tok__radius {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.sg-tok__radius-box {
  width: 8rem;
  height: 8rem;
  background: var(--bg-deep);
}

.sg-tok__rhythm {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-end;
  gap: 4rem;
}
.sg-tok__rhythm-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
.sg-tok__rhythm-bar {
  width: 2.4rem;
  background: color-mix(in oklch, var(--accent-trust) 30%, var(--bg-alt));
  border-radius: var(--radius-sm);
  border: var(--line-soft);
}
.sg-tok__rhythm-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.sg-tok__token {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  color: var(--text-muted);
}
.sg-tok__meta {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: color-mix(in oklch, var(--text-muted) 75%, transparent);
}
</style>
