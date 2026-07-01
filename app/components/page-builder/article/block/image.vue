<script setup lang="ts">
/* Image legendee dans le corps d'article: figure arrondie a ombre chaude, filet
 * ambre qui signe le coin bas-gauche (ancrage au sol), legende sobre. */
import type { BlockBase } from '~/types/blocks'
import type { ArticleImageContent } from '~/content/article-blocks'
// Ce fichier s'appelle image.vue: <Image> dans le template se resoudrait vers CE
// composant (auto-reference). L'import nomme leve l'ambiguite (calque Minimaliste).
import ImageFragment from '~/components/fragments/images/Image.vue'

defineProps<BlockBase<'image'> & ArticleImageContent>()
</script>

<template>
  <figure class="article-image">
    <div class="article-image__frame">
      <ImageFragment
        :src="image.src"
        :alt="image.alt"
        :width="image.width"
        :height="image.height"
        :caption="image.caption"
        sizes="xs:100vw sm:100vw md:720px lg:760px xl:760px xxl:760px"
        tone="base"
      />
      <span class="article-image__corner" aria-hidden="true" />
    </div>
    <figcaption v-if="image.caption" class="article-image__caption">{{ image.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.article-image {
  margin: 0;
}
.article-image__frame {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--elev-mid);
}
.article-image__corner {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 5rem;
  height: 0.6rem;
  background: var(--accent-call);
  border-top-right-radius: 2px;
}
.article-image__caption {
  margin-top: 1.2rem;
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--text-muted);
}
</style>
