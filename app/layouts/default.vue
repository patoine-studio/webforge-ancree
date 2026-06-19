<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="wf-site">
    <a class="wf-skip" href="#main">{{ t('a11y.skip_to_content') }}</a>
    <Header />
    <main id="main">
      <slot />
    </main>
    <Footer />
    <CallBar />
  </div>
</template>
