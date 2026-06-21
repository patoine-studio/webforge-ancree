<script setup lang="ts">
/* Page de service par nuisible (le « quoi » du SEO local). Route /services/[slug]
 * ou le slug est RICHE en mots-cles et TRADUIT par langue (FR
 * extermination-fourmis-charpentieres <-> EN carpenter-ant-extermination). On
 * resout le slug courant vers la cle stable du nuisible, on tire le contenu de la
 * fixture (repli demo), et on pose les params i18n pour que l'alternate de langue
 * porte SON propre slug. Sous le contenu propre au nuisible, un maillage croise:
 * le bloc villes desservies (-> /villes) et le bandeau d'appel, repris du payload
 * de l'accueil. En-tete solide (masthead clair, pas de heros). */
import {
  breadcrumbsFor,
  serviceDetailKeyForSlug,
  serviceDetailSpec
} from '~/config/route-map'
import { serviceDetailFixture } from '~/content/services-detail'
import type { HeroPageBlock, PageBlock, ServiceCitiesBlock, CtaBandBlock } from '~/types/blocks'

const { t, locale } = useI18n()
const route = useRoute()
const isEn = computed(() => locale.value === 'en')
const localePrefix = computed(() => (isEn.value ? '/en' : ''))

const slug = computed(() => String(route.params.slug || ''))
const key = computed(() => serviceDetailKeyForSlug(slug.value))
const detail = computed(() => serviceDetailFixture(key.value, isEn.value))

// Slug inconnu: 404 propre (en statique, seuls les slugs connus sont prerendus;
// ce garde couvre une navigation cliente vers un slug inexistant).
if (!detail.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })
}

// Alternate de langue: chaque langue porte SON slug (traduit). Le slug n'est pas
// partage ici, contrairement aux villes.
const setI18nParams = useSetI18nParams()
const spec = serviceDetailSpec(key.value!)
if (spec) {
  setI18nParams({ fr: { slug: spec.slug.fr }, en: { slug: spec.slug.en } })
}

// Masthead (bloc du catalogue de heros, rendu par <Hero>). Fil Accueil > Services
// > [nuisible]; eyebrow = marqueur de service; appel direct.
const heroBlock = computed<HeroPageBlock>(() => ({
  _type: 'hero-page',
  _key: 'masthead',
  crumbs: breadcrumbsFor('services', { label: detail.value!.cardTitle }, locale.value as 'fr' | 'en'),
  eyebrow: detail.value!.eyebrow,
  title: detail.value!.title,
  lead: detail.value!.lead,
  cta: { label: t('hero.cta_primary'), href: t('contact.phone_href') }
}))

// Contenu de l'accueil (payload unique, repli fixtures): source du maillage croise
// (villes desservies + bandeau d'appel), sans dupliquer le contenu.
const home = useHome()
function toContactRoute(href: string | undefined): string | undefined {
  return href === '#contact' ? `${localePrefix.value}/contact` : href
}
const bodyBlocks = computed<PageBlock[]>(() => {
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

// Page nuisible (SEO local): ItemPage + fil Accueil > Services > [nuisible].
usePageSeo({
  title: detail.value!.title,
  description: detail.value!.lead,
  webPageType: 'ItemPage',
  breadcrumbs: breadcrumbsFor('services', { label: detail.value!.cardTitle }, locale.value as 'fr' | 'en')
})
</script>

<template>
  <div v-if="detail" class="pest">
    <Hero :hero="heroBlock" />

    <div class="wf-container pest__body">
      <div class="pest__intro">
        <p v-for="(para, i) in detail.intro" :key="i" class="wf-body-1 wf-text-muted pest__para">{{ para }}</p>
      </div>

      <ul class="pest__highlights" data-reveal-stagger>
        <li v-for="h in detail.highlights" :key="h.title" class="pest__highlight">
          <span class="pest__highlight-icon" aria-hidden="true">
            <Icon :name="h.icon" />
          </span>
          <h2 class="pest__highlight-title wf-h5">{{ h.title }}</h2>
          <p class="pest__highlight-body wf-body-2">{{ h.body }}</p>
        </li>
      </ul>
    </div>

    <PageBuilder :blocks="bodyBlocks" reveal />
  </div>
</template>

<style scoped>
.pest__body {
  padding-block: var(--space-block-default);
  display: grid;
  gap: 4.8rem;
}
.pest__intro {
  max-width: 68ch;
}
.pest__para + .pest__para {
  margin-top: 1.6rem;
}

/* Points forts du nuisible (signes, traitement, garantie): colonnes posees, sans
 * boite de carte (on evite l'empilement de cartes), icone en pastille ambre douce,
 * titre slab. Materiau Ancree, base blanche. */
.pest__highlights {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.2rem;
}
.pest__highlight {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.pest__highlight-icon {
  display: grid;
  place-items: center;
  width: 5.2rem;
  height: 5.2rem;
  border-radius: var(--radius);
  background: var(--accent-call-soft);
  box-shadow: var(--elev-low);
  margin-bottom: 1.8rem;
}
.pest__highlight-icon svg {
  width: 2.8rem;
  height: 2.8rem;
  color: var(--accent-trust);
}
.pest__highlight-title {
  margin: 0;
}
.pest__highlight-body {
  margin-top: 1rem;
  color: var(--text-muted);
}

@container site (min-width: 768px) {
  .pest__highlights {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4rem;
  }
}
</style>
