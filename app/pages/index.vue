<script setup lang="ts">
/* Accueil MULTIPAGE (mode Multipage, racine /). Une passerelle: le heros, puis
 * un choix d'apercus qui MENENT aux pages dediees (services -> /services, villes
 * -> pages service-ville, temoignages, bandeau d'appel -> /contact). Le contenu
 * profond (a-propos, FAQ, formulaire) vit sur ses pages dediees, joignables par
 * la nav multipage; on ne le duplique pas ici. En-tete en mode multipage (liens
 * de route), via le layout default.
 *
 * Contenu de demo via fixtures (comme les autres pages multipage), en attendant
 * un type de page d'accueil Sanity. Les gestes qui pointaient vers une ancre du
 * one-pager (#contact) sont recables vers la vraie route /contact. */
import type { HeroHomeBlock, PageBlock } from '~/types/blocks'

const { t, locale } = useI18n()
const isEn = computed(() => locale.value === 'en')
const localePrefix = computed(() => (isEn.value ? '/en' : ''))

// Blocs retenus pour la passerelle (apercus + conversion), dans l'ordre de rendu.
const GATEWAY_BLOCKS = new Set(['trust-bar', 'services', 'service-cities', 'testimonials', 'cta-band'])

// Recable une ancre du one-pager (#contact) vers la vraie route /contact.
function toContactRoute(href: string | undefined): string | undefined {
  return href === '#contact' ? `${localePrefix.value}/contact` : href
}

const heroBase = useHeroContent()
const hero = computed<HeroHomeBlock>(() => ({
  ...heroBase.value,
  secondaryCta: { ...heroBase.value.secondaryCta, href: `${localePrefix.value}/contact` }
}))

const blocks = computed<PageBlock[]>(() =>
  useHomeBlocks()
    .filter((b) => GATEWAY_BLOCKS.has(b._type))
    .map((b) => {
      // Bandeau d'appel: geste secondaire vers la vraie route /contact.
      if (b._type === 'cta-band') {
        return { ...b, secondaryCta: b.secondaryCta ? { ...b.secondaryCta, href: toContactRoute(b.secondaryCta.href)! } : undefined }
      }
      // Services (apercu): les cartes ne sont PAS des liens individuels (pas de
      // page par nuisible; les slugs /extermination/* sont des VILLES, pas des
      // services). On neutralise les href des items; le CTA « Voir tous les
      // services » -> /services reste le chemin. Cartes informatives, posees.
      if (b._type === 'services') {
        const items = (b as { items?: Array<Record<string, unknown>> }).items ?? []
        return { ...b, items: items.map((it) => ({ ...it, href: undefined })) }
      }
      return b
    })
)

useSeoMeta({
  title: () => t('home.title'),
  description: () => t('home.lead')
})
</script>

<template>
  <Hero :hero="hero" />
  <PageBuilder :blocks="blocks" reveal />
</template>
