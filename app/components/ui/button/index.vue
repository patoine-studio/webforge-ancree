<script setup lang="ts">
/* Bouton: primitive de conversion. Element auto-decide (button / NuxtLink / a)
 * pour eviter l'imbrication interactive. Contrat de props stable (cible de la
 * future correspondance Sanity). Variantes propres a Ancree: call (ambre, le
 * geste d'appel), primary (bleu nuit), ghost (filet). tone="ondark" inverse le
 * fantome pour les fonds sombres (heros full bleed). pulse: respiration tres
 * subtile reservee au bouton d'appel (DESIGN.md: attirer sans agresser). */
const props = withDefaults(
  defineProps<{
    href?: string
    kind?: 'internal' | 'external' | 'anchor'
    variant?: 'call' | 'primary' | 'ghost'
    tone?: 'base' | 'ondark'
    size?: 'default' | 'sm'
    type?: 'button' | 'submit'
    disabled?: boolean
    icon?: string | false
    pulse?: boolean
  }>(),
  { variant: 'primary', tone: 'base', size: 'default', type: 'button', disabled: false, pulse: false }
)

const NuxtLink = resolveComponent('NuxtLink')

const tag = computed(() => {
  if (!props.href) return 'button'
  if (props.kind === 'internal') return NuxtLink
  return 'a'
})

const bindings = computed(() => {
  if (!props.href) return { type: props.type, disabled: props.disabled }
  if (props.kind === 'internal') return { to: props.href }
  if (props.kind === 'external') return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return { href: props.href } // anchor, tel:, mailto:
})

const showIcon = computed(() => props.icon !== false)
const iconName = computed(() => (typeof props.icon === 'string' ? props.icon : 'lucide:arrow-right'))
const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  {
    'btn--ondark': props.tone === 'ondark',
    'btn--sm': props.size === 'sm',
    'btn--pulse': props.pulse
  }
])
</script>

<template>
  <component :is="tag" :class="classes" v-bind="bindings">
    <Icon v-if="showIcon" :name="iconName" class="btn__icon" aria-hidden="true" />
    <span class="btn__label"><slot /></span>
  </component>
</template>

<style scoped>
.btn {
  --btn-lift: 2px; /* amplitude du soulevement au survol, source unique du geste */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.4rem 2.2rem;
  border: 0;
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform var(--motion-duration-hover) var(--motion-ease-settle),
    background-color var(--motion-duration-hover) var(--motion-ease-settle),
    box-shadow var(--motion-duration-hover) var(--motion-ease-settle),
    color var(--motion-duration-hover) var(--motion-ease-settle);
}

/* Focus clavier dedie: l'anneau epouse le rayon du bouton (l'outline suit le
 * border-radius reel), au lieu du repli 3px global. Tokenise. */
.btn:focus-visible {
  outline: var(--focus-ring-width) solid var(--accent-trust);
  outline-offset: var(--focus-ring-offset);
  border-radius: var(--radius);
}
/* Sur fond sombre (heros), l'anneau passe au papier pour rester net sur image. */
.btn--ondark:focus-visible {
  outline-color: var(--paper);
}
.btn__icon {
  width: 1.9rem;
  height: 1.9rem;
  flex: none;
}

/* Appel: ambre, le geste de conversion. Texte bleu nuit (contraste fort). */
.btn--call {
  background: var(--accent-call);
  color: var(--text-oncall);
  box-shadow: var(--elev-mid);
}
.btn--call:hover {
  transform: translateY(calc(-1 * var(--btn-lift)));
  box-shadow: var(--elev-high);
  background: color-mix(in oklch, var(--accent-call) 90%, white);
}
/* Appui: le bouton se pose au sol (revient a plat, l'ombre redescend), retour
 * tactile. La respiration se fige a l'appui pour laisser voir l'etat presse. */
.btn--call:active {
  transform: translateY(0);
  box-shadow: var(--elev-mid);
  animation-play-state: paused;
}

/* Primaire: bleu nuit plein. */
.btn--primary {
  background: var(--text-base);
  color: var(--paper);
  box-shadow: var(--elev-low);
}
.btn--primary:hover {
  transform: translateY(calc(-1 * var(--btn-lift)));
  box-shadow: var(--elev-mid);
  background: color-mix(in oklch, var(--text-base) 88%, var(--accent-trust));
}
.btn--primary:active {
  transform: translateY(0);
  box-shadow: var(--elev-low);
}

/* Fantome: filet, fond transparent. Une ombre flush a peine percue le pose sur
 * la surface (sans elle, il parait inacheve a cote du call et du primary). */
.btn--ghost {
  background: transparent;
  color: var(--text-base);
  box-shadow:
    var(--elev-flush),
    inset 0 0 0 var(--line-width) color-mix(in oklch, var(--text-base) 22%, transparent);
}
.btn--ghost:hover {
  background: color-mix(in oklch, var(--text-base) 5%, transparent);
  box-shadow:
    var(--elev-flush),
    inset 0 0 0 var(--line-width) color-mix(in oklch, var(--text-base) 38%, transparent);
}
.btn--ghost:active {
  transform: translateY(1px);
  background: color-mix(in oklch, var(--text-base) 9%, transparent);
}

/* Fantome sur fond sombre (heros full bleed): texte et filet clairs. */
.btn--ghost.btn--ondark {
  color: var(--text-ondeep);
  box-shadow: inset 0 0 0 var(--line-width) color-mix(in oklch, white 42%, transparent);
}
.btn--ghost.btn--ondark:hover {
  background: color-mix(in oklch, white 12%, transparent);
  box-shadow: inset 0 0 0 var(--line-width) color-mix(in oklch, white 70%, transparent);
}
.btn--ghost.btn--ondark:active {
  transform: translateY(1px);
  background: color-mix(in oklch, white 18%, transparent);
}

.btn--sm {
  padding: 1rem 1.6rem;
  font-size: 1.5rem;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Respiration tres subtile du bouton d'appel: un anneau ambre qui s'ouvre et se
 * dissout. Tokenisee, et coupee par le kill-switch reduced-motion global. */
.btn--pulse {
  animation: btn-pulse var(--motion-duration-pulse) ease-in-out infinite;
}
@keyframes btn-pulse {
  0%,
  100% {
    box-shadow: var(--elev-mid), 0 0 0 0 color-mix(in oklch, var(--accent-call) 55%, transparent);
  }
  50% {
    box-shadow: var(--elev-mid), 0 0 0 0.9rem color-mix(in oklch, var(--accent-call) 0%, transparent);
  }
}
</style>
