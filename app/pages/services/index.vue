<script setup lang="ts">
/* Index des services. Liste tous les services depuis Sanity (langue courante),
 * repli sur la fixture si vide. En-tete solide (pas de heros): hauteur reservee. */
import { SERVICES_INDEX_QUERY } from '~/sanity/content'

const { t, locale } = useI18n()

const { data: raw } = await useSanityQuery<{ services?: Array<{ _id: string; icon?: string; title: string; body?: string; featured?: boolean }> }>(
  SERVICES_INDEX_QUERY,
  { lang: locale.value }
)

// Repli: items du bloc services de la fixture d'accueil.
const fallback = computed(() => {
  const block = useHomeBlocks().find((b) => b._type === 'services') as { items?: Array<{ icon?: string; title: string; body?: string; featured?: boolean }> } | undefined
  return block?.items ?? []
})

const services = computed(() => {
  const fromSanity = raw.value?.services
  return fromSanity && fromSanity.length ? fromSanity : fallback.value
})

useSeoMeta({
  title: () => `${t('pages.services_heading')} | Rempart Extermination`,
  description: () => t('pages.services_lead')
})
</script>

<template>
  <div class="svc">
    <header class="svc__head">
      <div class="wf-container">
        <p class="svc__kicker wf-caption">
          <span class="svc__tick" aria-hidden="true" />
          {{ t('nav.services') }}
        </p>
        <h1 class="svc__title wf-h1">{{ t('pages.services_heading') }}</h1>
        <p class="svc__lead wf-body-1">{{ t('pages.services_lead') }}</p>
        <div class="svc__actions">
          <Button :href="t('contact.phone_href')" kind="anchor" variant="call" icon="lucide:phone" :pulse="true">
            {{ t('hero.cta_primary') }}
          </Button>
        </div>
      </div>
    </header>

    <div class="wf-container svc__body">
      <ul class="svc__grid">
        <li v-for="(s, i) in services" :key="s.title" class="svc__card" :class="{ 'svc__card--featured': s.featured }">
          <span class="svc__icon-wrap">
            <Icon v-if="s.icon" :name="s.icon" class="svc__icon" aria-hidden="true" />
          </span>
          <h2 class="svc__card-title wf-h4">{{ s.title }}</h2>
          <p class="svc__card-body wf-body-2">{{ s.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.svc__head {
  background: var(--bg-deep);
  color: var(--text-ondeep);
  padding-block: calc(var(--header-height) + 5rem) clamp(4rem, 7vh, 6rem);
}
.svc__kicker {
  display: inline-flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 1.6rem;
  color: color-mix(in oklch, var(--text-ondeep) 72%, transparent);
}
.svc__tick {
  display: inline-block;
  width: 2.6rem;
  height: 3px;
  border-radius: 2px;
  background: var(--accent-call);
}
.svc__title {
  color: var(--text-ondeep);
  max-width: 18ch;
}
.svc__lead {
  margin-top: var(--space-title-lead);
  max-width: 52ch;
  color: color-mix(in oklch, var(--text-ondeep) 86%, transparent);
}
.svc__actions {
  margin-top: var(--space-lead-cta);
}

.svc__body {
  padding-block: var(--space-block-default);
}
.svc__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
.svc__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2.8rem;
  background: var(--bg-lift);
  border: var(--line-soft);
  border-radius: var(--radius-lg);
  box-shadow: var(--elev-low);
}
.svc__card--featured {
  background: var(--bg-deep);
  border-color: transparent;
  color: var(--text-ondeep);
  box-shadow: var(--elev-mid);
}
.svc__icon-wrap {
  display: grid;
  place-items: center;
  width: 5.2rem;
  height: 5.2rem;
  border-radius: var(--radius);
  background: var(--accent-call-soft);
  margin-bottom: 2rem;
}
.svc__card--featured .svc__icon-wrap {
  background: color-mix(in oklch, white 12%, transparent);
}
.svc__icon {
  width: 2.8rem;
  height: 2.8rem;
  color: var(--accent-trust);
}
.svc__card--featured .svc__icon {
  color: var(--accent-call);
}
.svc__card-title {
  margin: 0;
}
.svc__card--featured .svc__card-title {
  color: var(--text-ondeep);
}
.svc__card-body {
  margin-top: 1.2rem;
  color: var(--text-muted);
}
.svc__card--featured .svc__card-body {
  color: color-mix(in oklch, var(--text-ondeep) 80%, transparent);
}

@container site (min-width: 640px) {
  .svc__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@container site (min-width: 1024px) {
  .svc__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
