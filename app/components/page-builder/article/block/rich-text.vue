<script setup lang="ts">
/* Texte riche: une suite de blocs Portable Text rendus par le serialiseur maison
 * (titres slab, paragraphes, listes a puce ambre, gras/italique, liens). */
import type { BlockBase } from '~/types/blocks'
import type { ArticleRichTextContent } from '~/content/article-blocks'
// PortableText vit sous page-builder/ (exclu de l'auto-import): import explicite,
// comme les autres consommateurs intra page-builder (block-maps, fragment image).
import PortableText from '~/components/page-builder/article/PortableText.vue'

defineProps<BlockBase<'rich-text'> & ArticleRichTextContent>()
</script>

<template>
  <div class="article-rich">
    <PortableText :value="value" />
  </div>
</template>

<style scoped>
.article-rich {
  display: block;
}
</style>
