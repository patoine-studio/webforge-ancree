<script setup lang="ts">
/* Consent — bannière de consentement aux témoins, peau Ancrée.
 *
 * Carte fixe en bas à gauche, NON bloquante (ce n'est pas une modale: elle ne
 * vole pas le focus au chargement, ne piège pas la page, ne la rend pas inerte;
 * rien de mesure ne se charge de toute façon avant le oui). Deux vues dans la
 * même carte:
 *   - main      : titre, explication + lien politique, 3 actions de poids égal
 *                 (Tout accepter / Nécessaires seulement / Personnaliser).
 *   - customize : interrupteurs par catégorie + Enregistrer, avec un bouton Retour.
 * Le panneau customize piège le focus clavier de façon autonome (Tab cycle dans
 * le panneau); Retour rend le focus au déclencheur. La carte de base reste
 * atteignable au clavier sans piéger.
 *
 * La plomberie (store, plugin, config) est portée 1:1 de Minimaliste; SEULE la
 * peau (markup ancré, tokens Ancrée, interrupteur pilule maison) est propre à
 * Ancrée. Catégories pilotées par la config (useContent('consent')):
 * « Nécessaires » implicite et verrouillé en tête, puis les opt-in. Toute la
 * copie vient d'i18n (consent.*), surchargeable string par string via `overrides`.
 *
 * Montée dans les coquilles de site (layouts default + landing), pas sous
 * /showcase. Se téléporte dans <body>.
 */
const props = withDefaults(defineProps<{
  /* Cible du lien « politique de confidentialité ». Qualifiée par le layout
   * (landing: sous /one-pager). */
  policyHref?: string
  /* Surcharge optionnelle de n'importe quelle chaîne. Clé = chemin sous
   * `consent.` dans i18n (ex: 'title', 'categories.analytics.label'). */
  overrides?: Record<string, string>
}>(), {
  policyHref: '/politique-confidentialite',
  overrides: () => ({})
})

const consent = useConsentStore()
const config = useContent('consent')
const { t } = useI18n()

/* Résolution de copie: surcharge de prop d'abord, sinon i18n. */
function copy(key: string): string {
  return props.overrides[key] ?? t(`consent.${key}`)
}

/* Vue courante de la carte. */
const view = ref<'main' | 'customize'>('main')

/* Rendu différé au mount client. Le plugin consent (.client) amorce le store
 * AVANT l'hydratation, donc `bannerVisible` peut déjà être vrai quand Vue hydrate:
 * rendre la carte à ce stade créerait un mismatch d'hydratation (serveur = rien,
 * client = la carte) sur le site généré statiquement. On attend donc le mount. */
const mounted = ref(false)
onMounted(() => { mounted.value = true })

/* Brouillon des bascules opt-in, initialisé depuis l'état courant à l'ouverture
 * du panneau. « Nécessaires » n'y est pas (toujours vrai, verrouillé). */
const draft = reactive<Record<string, boolean>>({})
function initDraft() {
  for (const c of config.value.categories) draft[c.id] = consent.consented(c.id)
}

/* Rouvrir la bannière repart toujours de la vue de base. Réouverture explicite
 * (forceOpen): on déplace le focus sur la carte (tabindex=-1) pour l'annoncer au
 * lecteur d'écran. Au premier affichage (forceOpen faux), on ne vole JAMAIS le
 * focus au chargement. */
const card = ref<HTMLElement | null>(null)
watch(() => consent.bannerVisible, (visible) => {
  if (!visible) return
  view.value = 'main'
  if (consent.forceOpen) nextTick(() => card.value?.focus())
})

/* ── Navigation interne + trap de focus autonome (customize uniquement) ─────── */
const panel = ref<HTMLElement | null>(null)
const back = ref<HTMLElement | null>(null)
let returnFocusEl: HTMLElement | null = null

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

function focusables(): HTMLElement[] {
  if (!panel.value) return []
  return Array.from(panel.value.querySelectorAll<HTMLElement>(FOCUSABLE))
    .filter((el) => el.offsetParent !== null)
}

function onPanelKeydown(e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  const items = focusables()
  if (items.length === 0) return
  const first = items[0]!
  const last = items[items.length - 1]!
  const active = document.activeElement
  if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

function openCustomize(e: MouseEvent) {
  returnFocusEl = e.currentTarget as HTMLElement
  initDraft()
  view.value = 'customize'
  nextTick(() => back.value?.focus())
}

function closeCustomize() {
  view.value = 'main'
  nextTick(() => returnFocusEl?.focus())
}

/* ── Actions ────────────────────────────────────────────────────────────────
 * Après un choix, le store devient valide → bannerVisible passe à false → la
 * carte disparaît (sauf reload symétrique déclenché par le store). */
function onAcceptAll() { consent.acceptAll() }
function onRefuse() { consent.refuse() }
function onSaveCustom() { consent.saveCustom({ ...draft }) }
</script>

<template>
  <Teleport to="body">
    <Transition name="consent">
      <section
        v-if="mounted && consent.bannerVisible"
        ref="card"
        class="consent"
        :aria-label="copy('aria_label')"
        tabindex="-1"
        @keydown="view === 'customize' && onPanelKeydown($event)"
      >
        <!-- Vue de base -->
        <div v-if="view === 'main'" class="consent__view">
          <h2 class="consent__title wf-h5">{{ copy('title') }}</h2>
          <p class="consent__body wf-body-2">{{ copy('body') }}</p>
          <p class="consent__policy wf-body-2">
            {{ copy('policy_prefix') }}
            <NuxtLink :to="policyHref" class="consent__link">{{ copy('policy_link') }}</NuxtLink>
          </p>
          <div class="consent__actions">
            <Button :icon="false" @click="onAcceptAll">{{ copy('accept_all') }}</Button>
            <Button :icon="false" variant="ghost" @click="onRefuse">{{ copy('necessary_only') }}</Button>
            <Button :icon="false" variant="ghost" @click="openCustomize">{{ copy('customize') }}</Button>
          </div>
        </div>

        <!-- Vue personnaliser (même carte, navigation interne) -->
        <div v-else ref="panel" class="consent__view">
          <button ref="back" type="button" class="consent__back" @click="closeCustomize">
            <Icon name="lucide:chevron-left" aria-hidden="true" />
            <span>{{ copy('back') }}</span>
          </button>

          <ul class="consent__cats">
            <!-- Nécessaires: catégorie requise, pas d'interrupteur — libellé + mention « Requis ». -->
            <li class="consent__cat consent__cat--required">
              <span class="consent__cat-label">{{ copy('categories.necessary.label') }}</span>
              <span class="consent__required">{{ copy('required') }}</span>
            </li>
            <!-- Catégories opt-in: libellé + interrupteur. Les descriptions détaillées
                 vivent dans la politique de confidentialité (panneau sobre). -->
            <li v-for="c in config.categories" :key="c.id" class="consent__cat">
              <Switch
                :model-value="draft[c.id] ?? false"
                :label="copy(`categories.${c.id}.label`)"
                @update:model-value="draft[c.id] = $event"
              />
            </li>
          </ul>

          <Button :icon="false" class="consent__save" @click="onSaveCustom">{{ copy('save') }}</Button>
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<style scoped>
.consent {
  position: fixed;
  bottom: clamp(1.2rem, 3vw, 2.4rem);
  left: clamp(1.2rem, 3vw, 2.4rem);
  z-index: 70;
  width: min(38rem, calc(100vw - 2.4rem));
  max-height: calc(100dvh - 4.8rem); /* carte basse: si l'écran est court, elle défile plutôt que déborder */
  overflow-y: auto;
  padding: 2.4rem;
  background: var(--bg-base);
  border: var(--line-soft); /* le token EST le raccourci complet (1px solid couleur) */
  border-radius: var(--radius-lg);
  box-shadow: var(--elev-high);
  outline: none;
}
.consent__view {
  display: flex;
  flex-direction: column;
}

/* ── Vue de base ──────────────────────────────────────────────────────────── */
.consent__title {
  margin: 0 0 0.8rem;
  color: var(--text-base);
}
.consent__body {
  margin: 0 0 0.6rem;
  color: var(--text-muted);
}
.consent__policy {
  margin: 0 0 1.8rem;
  color: var(--text-muted);
}
.consent__link {
  color: var(--accent-trust);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  transition: color var(--motion-duration-hover) var(--motion-ease-out);
}
.consent__link:hover {
  color: var(--text-base);
}
/* Actions empilées pleine largeur: hiérarchie par le remplissage (l'appel plein
 * navy) contre les filets des deux replis, jamais par la taille. Remplace le
 * flex-wrap qui empilait les boutons de travers. */
.consent__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.consent__actions :deep(.btn) {
  width: 100%;
}

/* ── Vue personnaliser ────────────────────────────────────────────────────── */
.consent__back {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  margin: 0 0 1.6rem;
  padding: 0.2rem 0.4rem 0.2rem 0;
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: color var(--motion-duration-hover) var(--motion-ease-out);
}
.consent__back:hover {
  color: var(--text-base);
}
.consent__back:focus-visible {
  outline: var(--focus-ring-width) solid var(--accent-trust);
  outline-offset: var(--focus-ring-offset);
  border-radius: var(--radius-sm);
}
/* Registre sobre: chaque catégorie posée sur un filet, séparée par des lignes
 * (jamais de cartes emboîtées). */
.consent__cats {
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.consent__cat {
  border-top: var(--line-hair);
}
.consent__cat:last-child {
  border-bottom: var(--line-hair);
}
/* Nécessaires: requise, pas d'interrupteur — libellé + « Requis ». Même gabarit
 * de rangée que les catégories à interrupteur (grille 1fr auto, hauteur calée
 * sur la cible tactile du Switch pour que toutes les rangées s'alignent). */
.consent__cat--required {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1.6rem;
  min-height: 4.4rem;
}
.consent__cat-label {
  font-family: var(--font-body);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-base);
}
.consent__required {
  font-family: var(--font-body);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}
.consent__save {
  width: 100%;
}

/* Entrée/sortie: la carte s'ancre en montant (translation depuis le sol +
 * fondu), déceleration expo « settle ». Le kill-switch reduced-motion global la
 * fige; ce bloc annule aussi la translation pour un simple fondu. */
.consent-enter-active,
.consent-leave-active {
  transition:
    opacity var(--motion-duration-expand) var(--motion-ease-out),
    transform var(--motion-duration-expand) var(--motion-ease-settle);
}
.consent-enter-from,
.consent-leave-to {
  opacity: 0;
  transform: translateY(1.2rem);
}
@media (prefers-reduced-motion: reduce) {
  .consent-enter-from,
  .consent-leave-to {
    transform: none;
  }
}
</style>
