<script setup lang="ts">
/* Coquille du mode MULTIPAGE (racine /): en-tete en mode multipage (liens de
 * route via le route-map). Le one-pager utilise le layout `landing` (ancres). */
const { t } = useI18n()
</script>

<template>
  <div class="wf-site">
    <a class="wf-skip" href="#main">{{ t('a11y.skip_to_content') }}</a>
    <Header mode="multipage" />
    <main id="main">
      <slot />
    </main>
    <Footer />
    <CallBar />
  </div>
</template>
