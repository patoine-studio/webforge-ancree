<script setup lang="ts">
/* Index des services = hub des pages par nuisible. La grille liste les nuisibles
 * (fixture services-detail) en cartes CLIQUABLES vers /services/<slug-traduit>.
 * Masthead = bloc hero-page (catalogue de heros), fil d'Ariane du route-map. Sous
 * la grille, un corps de page: le bloc « processus » (comment on intervient) puis
 * la REUTILISATION des blocs villes (maillage local) et bandeau d'appel du payload
 * de l'accueil (repli fixtures), pour donner du corps et mener a la conversion. */
import { breadcrumbsFor, serviceDetailPath } from '~/config/route-map'
import { processFixture } from '~/content/process'
import { serviceDetailList } from '~/content/services-detail'
import type { HeroPageBlock, PageBlock, CtaBandBlock, ServiceCitiesBlock } from '~/types/blocks'

const { t, locale } = useI18n()
const isEn = computed(() => locale.value === 'en')
const localePrefix = computed(() => (isEn.value ? '/en' : ''))

// Masthead de la page (bloc du catalogue de heros, rendu par <Hero>). L'eyebrow
// reprend la zone de service (motif local d'Ancree), distinct du fil d'Ariane.
const heroBlock = computed<HeroPageBlock>(() => ({
  _type: 'hero-page',
  _key: 'masthead',
  crumbs: breadcrumbsFor('services', undefined, locale.value as 'fr' | 'en'),
  eyebrow: t('hero.kicker'),
  title: t('pages.services_heading'),
  lead: t('pages.services_lead'),
  cta: { label: t('hero.cta_primary'), href: t('contact.phone_href') }
}))

// Cartes = les pages par nuisible (fixture demo), cliquables vers leur page detail.
// La premiere (fourmis charpentieres) est la carte vedette.
const services = computed(() => serviceDetailList(isEn.value))
function detailHref(key: string): string {
  return serviceDetailPath(key, locale.value as 'fr' | 'en')
}

// Contenu de l'accueil (payload unique, repli fixtures): on y puise les blocs a
// reutiliser plus bas, sans dupliquer le contenu.
const home = useHome()

// Recable une ancre du one-pager (#contact) vers la vraie route /contact (meme
// traitement que l'accueil pour le geste secondaire du bandeau d'appel).
function toContactRoute(href: string | undefined): string | undefined {
  return href === '#contact' ? `${localePrefix.value}/contact` : href
}

// Corps de page sous la grille: nouveau bloc processus, puis villes + bandeau
// d'appel repris de l'accueil (presents seulement s'ils existent au payload).
const bodyBlocks = computed<PageBlock[]>(() => {
  const out: PageBlock[] = [
    { _type: 'process', _key: 'process', ...processFixture(isEn.value) }
  ]
  const cities = home.value.blocks.find((b): b is ServiceCitiesBlock => b._type === 'service-cities')
  if (cities) out.push({ ...cities, _key: 'cities' })
  const cta = home.value.blocks.find((b): b is CtaBandBlock => b._type === 'cta-band')
  if (cta) {
    out.push({
      ...cta,
      _key: 'cta-band',
      secondaryCta: cta.secondaryCta
        ? { ...cta.secondaryCta, href: toContactRoute(cta.secondaryCta.href)! }
        : undefined
    })
  }
  return out
})

// CollectionPage (index de services). Fil d'Ariane = route-map.
usePageSeo({
  title: t('pages.services_heading'),
  description: t('pages.services_lead'),
  webPageType: 'CollectionPage',
  breadcrumbs: breadcrumbsFor('services', undefined, locale.value as 'fr' | 'en')
})
</script>

<template>
  <div class="svc">
    <Hero :hero="heroBlock" />

    <div class="wf-container svc__body">
      <ul class="svc__grid">
        <li v-for="(s, i) in services" :key="s.key" class="svc__card" :class="{ 'svc__card--featured': i === 0 }">
          <NuxtLink :to="detailHref(s.key)" class="svc__card-inner">
            <span class="svc__icon-wrap">
              <Icon :name="s.icon" class="svc__icon" aria-hidden="true" />
            </span>
            <h2 class="svc__card-title wf-h4">{{ s.cardTitle }}</h2>
            <p class="svc__card-body wf-body-2">{{ s.cardTeaser }}</p>
            <span class="svc__more">
              {{ t('ui.learn_more') }}
              <Icon name="lucide:arrow-right" aria-hidden="true" />
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <PageBuilder :blocks="bodyBlocks" reveal />
  </div>
</template>

<style scoped>
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
  border-radius: var(--radius-lg);
}
/* Carte cliquable: meme materiau que le bloc services de l'accueil (ombre chaude,
 * coins doux, soulevement au survol). La carte mene a la page detail du nuisible. */
.svc__card-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 2.8rem;
  background: var(--bg-lift);
  border: var(--line-soft);
  border-radius: var(--radius-lg);
  box-shadow: var(--elev-low);
  color: var(--text-base);
  text-decoration: none;
  transition:
    transform var(--motion-duration-hover) var(--motion-ease-settle),
    box-shadow var(--motion-duration-hover) var(--motion-ease-settle);
}
.svc__card-inner:hover {
  transform: translateY(-4px);
  box-shadow: var(--elev-high);
}
.svc__card--featured .svc__card-inner {
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
/* Affordance « en savoir plus »: le geste de lien, fleche qui glisse au survol. */
.svc__more {
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--accent-trust);
}
.svc__more svg {
  width: 1.7rem;
  height: 1.7rem;
  transition: transform var(--motion-duration-hover) var(--motion-ease-settle);
}
.svc__card-inner:hover .svc__more svg {
  transform: translateX(4px);
}
.svc__card--featured .svc__more {
  color: var(--accent-call);
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
