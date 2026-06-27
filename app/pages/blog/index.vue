<script setup lang="ts">
import PageBuilder from '~/components/page-builder/regular/index.vue'
/* Liste du blog (/blog). Masthead hero-page, puis le pageBuilder ENCADRE la liste:
 * les editoriaux de tete servent d'intro (avant la grille), le reste (temoignages,
 * bandeau d'appel, contact) suit la grille. Contenu du payload unique (fail-fast):
 * articles + categories de useBlog(), heros et pageBuilder du document blogPage,
 * aucun repli fixtures. */
import type { HeroPageBlock } from '~/types/blocks'
import { breadcrumbsFor, routePath, type Locale } from '~/config/route-map'

const { locale } = useI18n()
const loc = computed(() => locale.value as Locale)

const { articles, categories } = useBlog()
const heroContent = usePageHero('blog')
// Page 1 de la liste. La pagination ne s'affiche qu'au-dela d'ARTICLES_PER_PAGE
// (la demo a 3 articles -> une seule page, <Pagination> masque). Les pages
// suivantes vivent sur /blog/page/[n].
const pageData = computed(() => paginate(articles.value, 1))
const cards = computed(() => pageData.value.items.map((a) => toCard(a, loc.value)))

// Heros de page lu du document blogPage (title/lead), fil d'Ariane derive du
// route-map (source unique du chemin), comme le port de Minimaliste.
const heroBlock = computed<HeroPageBlock>(() => ({
  _type: 'hero-page',
  _key: 'masthead',
  crumbs: breadcrumbsFor('blog', undefined, loc.value),
  title: heroContent.value.title,
  lead: heroContent.value.lead
}))

// Le pageBuilder du blogue encadre la liste: les blocs `editorial` de TETE sont
// l'intro (rendue avant la grille), tout le reste suit la grille (temoignages,
// ctaBand, contact). Decoupage a la premiere position non-editoriale.
const blogBlocks = useBlogPageBlocks()
const splitAt = computed(() => {
  const i = blogBlocks.value.findIndex((b) => b._type !== 'editorial')
  return i === -1 ? blogBlocks.value.length : i
})
const introBlocks = computed(() => blogBlocks.value.slice(0, splitAt.value))
const outroBlocks = computed(() => blogBlocks.value.slice(splitAt.value))

// Liste du blog: CollectionPage indexable + BreadcrumbList (route-map). Le nœud
// Article n'est porté que par les pages d'article (catch-all). Schema.org et
// métas via usePageSeo, source unique du SEO de page. Title/description du SEO du
// document blogPage (replis deja faits au transform).
const seo = useFixedPage('blog').seo
usePageSeo({
  title: seo.title,
  description: seo.description,
  webPageType: 'CollectionPage',
  breadcrumbs: breadcrumbsFor('blog', undefined, loc.value)
})
</script>

<template>
  <div>
    <Hero :hero="heroBlock" />
    <PageBuilder :blocks="introBlocks" reveal />
    <section class="blog-list">
      <div class="wf-container">
        <FilterBar :categories="categories" />
        <ArticleGrid :cards="cards" class="blog-list__grid" />
        <Pagination :page="pageData.page" :total-pages="pageData.totalPages" :base-path="routePath('blog', loc)" />
      </div>
    </section>
    <PageBuilder :blocks="outroBlocks" reveal />
  </div>
</template>

<style scoped>
.blog-list {
  padding-block: clamp(3.2rem, 5vh, 4.8rem) var(--space-block-default);
  background: var(--bg-base);
}
.blog-list__grid {
  margin-top: 3.2rem;
}
</style>
