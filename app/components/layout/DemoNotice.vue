<script setup lang="ts">
import { DEMO_NOTICE_EVENT, DEMO_NOTICE_STORAGE_KEY } from '~/config/demo-notice'

const { t } = useI18n()
const { public: { demoNotice } } = useRuntimeConfig()
const mounted = ref(false)
const reduced = ref(false)
const interactionShown = ref(false)

function persistReduced() {
  try {
    localStorage.setItem(DEMO_NOTICE_STORAGE_KEY, 'reduced')
  } catch {
    // Stockage indisponible: l'etat de la session reste utilisable.
  }
}

function clearPersistedState() {
  try {
    localStorage.removeItem(DEMO_NOTICE_STORAGE_KEY)
  } catch {
    // Stockage indisponible: le repli developpe reste la valeur sure.
  }
}

function reduceNotice() {
  reduced.value = true
  interactionShown.value = false
  persistReduced()
}

function openNotice() {
  reduced.value = false
  clearPersistedState()
}

function showInteractionMessage() {
  interactionShown.value = true
  openNotice()
}

function syncDocumentState() {
  document.documentElement.dataset.wfDemoNotice = reduced.value ? 'reduced' : 'expanded'
}

watch(reduced, () => {
  if (mounted.value) syncDocumentState()
})

onMounted(() => {
  try {
    const stored = localStorage.getItem(DEMO_NOTICE_STORAGE_KEY)
    reduced.value = stored === 'reduced'
    if (stored !== null && stored !== 'reduced') localStorage.removeItem(DEMO_NOTICE_STORAGE_KEY)
  } catch {
    reduced.value = false
  }

  mounted.value = true
  syncDocumentState()
  window.addEventListener(DEMO_NOTICE_EVENT, showInteractionMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener(DEMO_NOTICE_EVENT, showInteractionMessage)
  delete document.documentElement.dataset.wfDemoNotice
})
</script>

<template>
  <Teleport to="body">
    <Transition name="wf-demo-notice" mode="out-in">
      <aside
        v-if="mounted && !reduced"
        key="notice"
        class="wf-demo-notice wf-demo-notice--card"
        :aria-labelledby="'wf-demo-notice-title'"
      >
        <button
          type="button"
          class="wf-demo-notice__reduce"
          :aria-label="t('demo_notice.reduce_aria')"
          @click="reduceNotice"
        >
          <Icon name="lucide:x" aria-hidden="true" />
        </button>
        <p class="wf-demo-notice__label">{{ t('demo_notice.label') }}</p>
        <h2 id="wf-demo-notice-title" class="wf-demo-notice__title">
          {{ t('demo_notice.title') }}
        </h2>
        <p class="wf-demo-notice__body">{{ t('demo_notice.body') }}</p>
        <button
          type="button"
          class="wf-demo-notice__link"
          @click="reduceNotice"
        >
          {{ t('demo_notice.link') }}
        </button>
        <p
          v-if="interactionShown"
          class="wf-demo-notice__feedback"
          role="status"
          aria-live="polite"
        >
          {{ t('demo_notice.interaction_body') }}
          <a :href="demoNotice.projectUrl">{{ t('demo_notice.interaction_link') }}</a>
        </p>
      </aside>

      <button
        v-else-if="mounted"
        key="badge"
        type="button"
        class="wf-demo-notice wf-demo-notice--badge"
        :aria-label="t('demo_notice.open_aria')"
        @click="openNotice"
      >
        <span class="wf-demo-notice__dot" aria-hidden="true" />
        {{ t('demo_notice.badge') }}
      </button>
    </Transition>
  </Teleport>
</template>

<style>
.wf-demo-notice {
  position: fixed;
  right: calc(var(--spacing-unit) * 2);
  bottom: calc(var(--spacing-unit) * 2 + env(safe-area-inset-bottom, 0px));
  z-index: var(--wf-demo-z);
  color: var(--wf-demo-text);
  background: var(--wf-demo-surface);
  border: var(--wf-demo-line);
  border-radius: var(--radius);
  box-shadow: var(--wf-demo-shadow);
  font-family: var(--font-body);
}
.wf-demo-notice--card {
  width: min(var(--wf-demo-width), calc(100vw - var(--spacing-unit) * 4));
  max-height: calc(100dvh - var(--spacing-unit) * 4 - env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
  padding: calc(var(--spacing-unit) * 2.4);
  padding-right: calc(var(--spacing-unit) * 6);
}
.wf-demo-notice__reduce {
  position: absolute;
  top: calc(var(--spacing-unit) * 0.8);
  right: calc(var(--spacing-unit) * 0.8);
  display: grid;
  place-items: center;
  width: var(--wf-demo-control-size);
  height: var(--wf-demo-control-size);
  color: var(--wf-demo-text);
  background: transparent;
  border: 0;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--motion-duration-hover) var(--motion-ease-settle);
}
.wf-demo-notice__reduce:hover { background: color-mix(in oklch, var(--wf-demo-text) 10%, transparent); }
.wf-demo-notice__reduce svg { width: calc(var(--spacing-unit) * 2); height: calc(var(--spacing-unit) * 2); }
.wf-demo-notice__label {
  margin: 0;
  color: var(--wf-demo-muted);
  font-family: var(--font-mono);
  font-size: 1.1rem;
  line-height: 1.4;
  letter-spacing: 0.04em;
}
.wf-demo-notice__title {
  margin: calc(var(--spacing-unit) * 1.2) 0 0;
  color: var(--wf-demo-text);
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
}
.wf-demo-notice__body {
  margin: calc(var(--spacing-unit) * 1.2) 0 0;
  color: var(--wf-demo-muted);
  font-size: 1.4rem;
  line-height: 1.55;
  text-wrap: pretty;
}
.wf-demo-notice__link {
  display: inline-flex;
  align-items: center;
  margin-top: calc(var(--spacing-unit) * 1.8);
  padding: 0;
  color: var(--wf-demo-text);
  background: transparent;
  border: 0;
  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
  text-decoration: underline;
  text-decoration-color: color-mix(in oklch, var(--wf-demo-text) 50%, transparent);
  text-underline-offset: 0.25em;
  cursor: pointer;
}
.wf-demo-notice__feedback {
  margin: calc(var(--spacing-unit) * 1.8) 0 0;
  padding: calc(var(--spacing-unit) * 1.2);
  color: var(--wf-demo-text);
  background: color-mix(in oklch, var(--wf-demo-text) 8%, transparent);
  border-radius: var(--radius-sm);
  font-size: 1.3rem;
  line-height: 1.5;
}
.wf-demo-notice__feedback a {
  display: inline-block;
  color: inherit;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
.wf-demo-notice--badge {
  min-height: var(--wf-demo-control-size);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-unit);
  padding: 0 calc(var(--spacing-unit) * 1.6);
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
}
.wf-demo-notice__dot {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: var(--radius-pill);
  background: var(--wf-demo-focus);
}
.wf-demo-notice :focus-visible,
.wf-demo-notice:focus-visible {
  outline: var(--focus-ring-width) solid var(--wf-demo-focus);
  outline-offset: var(--focus-ring-offset);
}
.wf-demo-notice-enter-active,
.wf-demo-notice-leave-active {
  transition:
    opacity var(--motion-duration-line) var(--motion-ease-settle),
    transform var(--motion-duration-line) var(--motion-ease-settle);
}
.wf-demo-notice-enter-from,
.wf-demo-notice-leave-to {
  opacity: 0;
  transform: translateY(var(--spacing-unit));
}

html[data-wf-site-mode="demo"] .wf-preview {
  top: calc(var(--header-height) + var(--spacing-unit) * 2);
  bottom: auto;
}

@media (max-width: 600px) {
  .wf-demo-notice {
    right: calc(var(--spacing-unit) * 1.6);
    bottom: calc(var(--spacing-unit) * 1.6 + env(safe-area-inset-bottom, 0px));
  }
  .wf-demo-notice--card {
    left: calc(var(--spacing-unit) * 1.6);
    width: auto;
    max-height: calc(100dvh - var(--spacing-unit) * 3.2 - env(safe-area-inset-bottom, 0px));
    padding: calc(var(--spacing-unit) * 2);
    padding-right: calc(var(--spacing-unit) * 5.6);
  }
}

@media (max-width: 800px) {
  html[data-wf-demo-notice="pending"] .consent,
  html[data-wf-demo-notice="expanded"] .consent,
  html[data-wf-demo-notice="expanded"] .wf-preview,
  html[data-wf-consent="visible"] .wf-preview,
  html[data-wf-consent="visible"] .wf-demo-notice--badge {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wf-demo-notice-enter-from,
  .wf-demo-notice-leave-to { transform: none; }
}
</style>
