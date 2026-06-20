<script setup lang="ts">
/* Menu mobile: panneau plein ecran ouvert depuis le burger de l'en-tete. Ferme
 * au clic sur un lien, sur le fond, ou avec Echap; verrouille le defilement et
 * pose le focus sur le premier lien. Rendu en position fixe (pas de Teleport,
 * pour rester sain au SSR). Recoit des liens deja normalises {label, href}
 * (l'en-tete les construit selon le mode: ancres en landing, routes en multipage). */
interface MenuLink {
  label: string
  href: string
}

const props = defineProps<{ open: boolean; links: MenuLink[] }>()
const emit = defineEmits<{ close: [] }>()

const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const panelRef = ref<HTMLElement | null>(null)

function close(): void {
  emit('close')
}
function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') close()
}

watch(
  () => props.open,
  (isOpen) => {
    if (!import.meta.client) return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      window.addEventListener('keydown', onKeydown)
      nextTick(() => {
        panelRef.value?.querySelector<HTMLElement>('a, button')?.focus()
      })
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  }
)

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Transition name="mm">
    <div v-if="open" class="mm" role="dialog" aria-modal="true" :aria-label="t('a11y.main_nav')">
      <div class="mm__backdrop" @click="close" />
      <div ref="panelRef" class="mm__panel">
        <div class="mm__bar">
          <span class="mm__brand" aria-hidden="true">
            <strong>Rempart</strong> Extermination
          </span>
          <button type="button" class="mm__close" :aria-label="t('a11y.close_menu')" @click="close">
            <Icon name="lucide:x" aria-hidden="true" />
          </button>
        </div>

        <nav class="mm__nav" :aria-label="t('a11y.main_nav')">
          <a v-for="link in links" :key="link.href" :href="link.href" class="mm__link" @click="close">
            {{ link.label }}
          </a>
        </nav>

        <div class="mm__actions">
          <Button
            :href="t('contact.phone_href')"
            kind="anchor"
            variant="call"
            icon="lucide:phone"
            @click="close"
          >
            {{ t('hero.cta_primary') }}
          </Button>
          <a class="mm__phone" :href="t('contact.phone_href')">{{ t('contact.phone_display') }}</a>
          <a class="mm__lang" :href="switchLocalePath(locale === 'fr' ? 'en' : 'fr')" @click="close">{{ t('home.switch') }}</a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mm {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}
.mm__backdrop {
  position: absolute;
  inset: 0;
  background: color-mix(in oklch, var(--navy) 55%, transparent);
}
.mm__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(86vw, 40rem);
  height: 100%;
  padding: 2.4rem;
  background: var(--bg-base);
  box-shadow: var(--elev-high);
}
.mm__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-height);
}
.mm__brand {
  font-family: var(--font-display);
  font-size: 1.7rem;
  color: var(--text-base);
}
.mm__brand strong {
  font-weight: 800;
}
.mm__close {
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  border: 0;
  border-radius: var(--radius-sm);
  background: color-mix(in oklch, var(--text-base) 5%, transparent);
  color: var(--text-base);
  cursor: pointer;
}
.mm__close svg {
  width: 2.4rem;
  height: 2.4rem;
}

.mm__nav {
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
}
.mm__link {
  padding: 1.6rem 0;
  border-bottom: var(--line-soft);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2.2rem;
  color: var(--text-base);
  text-decoration: none;
}
.mm__link:hover {
  color: var(--accent-trust);
}

.mm__actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.4rem;
  padding-top: 2.4rem;
}
.mm__phone {
  text-align: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--text-base);
  text-decoration: none;
}
.mm__lang {
  text-align: center;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--text-muted);
  text-decoration: none;
}
.mm__lang:hover {
  color: var(--accent-trust);
}

/* Apparition: le panneau glisse, le fond se fond. Coupe en reduced-motion. */
.mm-enter-active,
.mm-leave-active {
  transition: opacity var(--motion-duration-line) var(--motion-ease-settle);
}
.mm-enter-active .mm__panel,
.mm-leave-active .mm__panel {
  transition: transform var(--motion-duration-expand) var(--motion-ease-settle);
}
.mm-enter-from,
.mm-leave-to {
  opacity: 0;
}
.mm-enter-from .mm__panel,
.mm-leave-to .mm__panel {
  transform: translateX(100%);
}
@media (prefers-reduced-motion: reduce) {
  .mm-enter-active,
  .mm-leave-active,
  .mm-enter-active .mm__panel,
  .mm-leave-active .mm__panel {
    transition: none;
  }
}
</style>
