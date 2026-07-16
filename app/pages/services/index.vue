<script setup lang="ts">
import PageBuilder from '~/components/page-builder/regular/index.vue'
/* Index des services = hub des pages par nuisible. Masthead = bloc hero-page
 * (document servicesPage), le fil d'Ariane vient du route-map. Le corps de page,
 * dont l'UNIQUE grille de services (bloc `services` en tete du pageBuilder, cartes
 * CLIQUABLES vers /services/<slug>), vient du pageBuilder du document servicesPage,
 * resolu par useServicesPageBlocks. */
import { breadcrumbsFor } from '~/config/route-map'
import type { HeroPageBlock } from '~/types/blocks'

const { t, locale } = useI18n()
const loc = computed(() => locale.value as 'fr' | 'en')

// Fil d'Ariane (route-map): le Hero d'Ancree ne prend pas de prop breadcrumbs
// separee, on injecte donc crumbs dans le bloc masthead.
const breadcrumbs = computed(() => breadcrumbsFor('services', undefined, loc.value))

// Masthead de la page (document servicesPage, rendu par <Hero>). On reprend le hero
// du payload (titre, accroche, appel) et on lui ajoute le fil d'Ariane (route-map)
// et l'eyebrow d'ancrage local (i18n, libelle d'interface hors Sanity).
const pageHero = usePageHero('services')
const heroBlock = computed<HeroPageBlock>(() => ({
  ...pageHero.value,
  crumbs: breadcrumbs.value,
  eyebrow: pageHero.value.eyebrow ?? t('hero.kicker')
}))

// Corps de page: pageBuilder du document servicesPage (grille de services en tete,
// puis differenciateur, maillage villes, bandeau d'appel), resolu contre les
// collections. La grille de cartes vit DANS le bloc `services` (plus de doublon avec
// une seconde grille codee en dur dans la page).
const blocks = useServicesPageBlocks()

// SEO du document servicesPage (payload, par locale). Fil d'Ariane = route-map.
const seo = useFixedPage('services').seo
usePageSeo({
  title: seo.title,
  description: seo.description,
  webPageType: 'CollectionPage',
  breadcrumbs: breadcrumbs.value
})
</script>

<template>
  <div>
    <Hero :hero="heroBlock" />
    <PageBuilder :blocks="blocks" reveal />
  </div>
</template>
