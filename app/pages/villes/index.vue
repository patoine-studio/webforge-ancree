<script setup lang="ts">
/* Hub des villes desservies (le « ou » du SEO local). Masthead hero-page (fil
 * Accueil -> Villes), puis le bloc service-cities (la mosaique des villes, chaque
 * ville mene a /villes/[ville]) et un bandeau d'appel, tous deux repris du payload
 * de l'accueil (contenu reel partage, repli fixtures, rien de duplique). Le geste
 * secondaire du bandeau est recable vers la vraie route /contact. */
import { breadcrumbsFor } from '~/config/route-map'
import type { HeroPageBlock, PageBlock, ServiceCitiesBlock, CtaBandBlock } from '~/types/blocks'

const { t, locale } = useI18n()
const isEn = computed(() => locale.value === 'en')
const localePrefix = computed(() => (isEn.value ? '/en' : ''))

// Masthead de la page (bloc du catalogue de heros, rendu par <Hero>). Eyebrow =
// marqueur local (zone de service), distinct du fil d'Ariane.
const heroBlock = computed<HeroPageBlock>(() => ({
  _type: 'hero-page',
  _key: 'masthead',
  crumbs: breadcrumbsFor('villes', undefined, locale.value as 'fr' | 'en'),
  eyebrow: t('nav.areas'),
  title: t('pages.villes_heading'),
  lead: t('pages.villes_lead'),
  cta: { label: t('hero.cta_primary'), href: t('contact.phone_href') }
}))

// Contenu de l'accueil (payload unique, repli fixtures): on y puise la mosaique de
// villes et le bandeau d'appel, sans dupliquer le contenu.
const home = useHome()

// Recable une ancre du one-pager (#contact) vers la vraie route /contact.
function toContactRoute(href: string | undefined): string | undefined {
  return href === '#contact' ? `${localePrefix.value}/contact` : href
}

const blocks = computed<PageBlock[]>(() => {
  const out: PageBlock[] = []
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

// CollectionPage (hub de villes). Fil d'Ariane = route-map (Accueil -> Villes).
usePageSeo({
  title: t('pages.villes_heading'),
  description: t('pages.villes_lead'),
  webPageType: 'CollectionPage',
  breadcrumbs: breadcrumbsFor('villes', undefined, locale.value as 'fr' | 'en')
})
</script>

<template>
  <div>
    <Hero :hero="heroBlock" />
    <PageBuilder :blocks="blocks" reveal />
  </div>
</template>
