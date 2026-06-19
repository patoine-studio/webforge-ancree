<script setup lang="ts">
/* En-tete de section partage. Signature Ancree: un court trait ambre (« ancre au
 * sol ») devant un sur-titre en casse normale, jamais une etiquette majuscule
 * traquee. La disposition est dictee par le contenu: avec lead ou CTA, le titre
 * passe a gauche et l'aside a droite (asymetrie posee); sinon titre seul. */
import type { SectionCta } from '~/content/blocks'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    heading: string
    lead?: string
    ctas?: SectionCta[]
  }>(),
  { eyebrow: undefined, lead: undefined, ctas: () => [] }
)

const hasAside = computed(() => Boolean(props.lead) || props.ctas.length > 0)

function ctaKind(href: string): 'internal' | 'external' | 'anchor' {
  if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return 'anchor'
  if (href.startsWith('http')) return 'external'
  return 'internal'
}
</script>

<template>
  <header class="shead" :class="{ 'shead--split': hasAside }" data-reveal-stagger>
    <div class="shead__title-col">
      <p v-if="eyebrow" class="shead__eyebrow wf-caption">
        <span class="shead__tick" aria-hidden="true" />{{ eyebrow }}
      </p>
      <h2 class="shead__heading wf-h2">{{ heading }}</h2>
    </div>
    <div v-if="hasAside" class="shead__aside">
      <p v-if="lead" class="shead__lead wf-body-1 wf-text-muted">{{ lead }}</p>
      <div v-if="ctas.length" class="shead__ctas">
        <Button
          v-for="(cta, i) in ctas"
          :key="cta.href"
          :href="cta.href"
          :kind="ctaKind(cta.href)"
          :variant="i === 0 ? 'primary' : 'ghost'"
          :icon="i === 0 ? 'lucide:arrow-right' : false"
        >
          {{ cta.label }}
        </Button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.shead {
  display: grid;
  gap: 1.8rem 4rem;
}
.shead__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 1.6rem;
  color: var(--text-muted);
}
.shead__tick {
  display: inline-block;
  width: 2.6rem;
  height: 3px;
  border-radius: 2px;
  background: var(--accent-call);
}
.shead__heading {
  max-width: 20ch;
}
.shead__lead {
  max-width: 46ch;
}
.shead__ctas {
  margin-top: 2.4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
}

/* Calage sur la grille de page (16 pistes): le titre tient une large mesure a
 * gauche (cols 1-10), l'accroche et le CTA une mesure plus etroite a droite
 * (cols 11-16). Hierarchie par contraste de largeur, pas par decoration. */
@container site (min-width: 1024px) {
  .shead--split {
    grid-template-columns: repeat(16, minmax(0, 1fr));
    column-gap: 2rem;
    align-items: end;
  }
  .shead--split .shead__title-col {
    grid-column: 1 / span 10;
  }
  .shead--split .shead__aside {
    grid-column: 11 / -1;
  }
}
</style>
