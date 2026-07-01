<script setup lang="ts">
/* Interrupteur: primitive de formulaire accessible, batie sur une case a cocher
 * native (input type=checkbox role=switch reste la vraie commande — clavier,
 * lecteurs d'ecran). L'habillage pilule (piste + knob qui glisse, crochet quand
 * actif) est purement visuel, pilote par les tokens Ancree: piste bleu nuit une
 * fois active, knob blanc qui se pose (settle), crochet navy revele. Le knob ne
 * flotte pas, il glisse et se cale — langage « ancre au sol ». Emet
 * update:modelValue (v-model booleen).
 *
 * Verrouille (disabled): rendu en etat desactive visible; le consommateur affiche
 * alors sa propre mention a cote (ex: « Requis »). Aucune valeur design en dur. */
const props = withDefaults(defineProps<{
  modelValue: boolean
  label: string
  description?: string
  disabled?: boolean
}>(), {
  description: '',
  disabled: false
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const uid = useId()
const id = `switch-${uid}`
const descId = `switch-desc-${uid}`
</script>

<template>
  <div class="switch" :class="{ 'switch--disabled': disabled }">
    <div class="switch__text">
      <label :for="id" class="switch__label">{{ label }}</label>
      <p v-if="description" :id="descId" class="switch__desc">{{ description }}</p>
    </div>
    <input
      :id="id"
      type="checkbox"
      role="switch"
      class="switch__input"
      :checked="modelValue"
      :disabled="disabled"
      :aria-describedby="description ? descId : undefined"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
  </div>
</template>

<style scoped>
.switch {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1.6rem;
  min-height: 4.4rem; /* cible tactile WCAG 2.5.5 (la rangee entiere est cliquable via le label) */
}
.switch__text {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}
.switch__label {
  font-family: var(--font-body); /* meme vocabulaire que la case a cocher soeur */
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-base);
  cursor: pointer;
}
.switch__desc {
  margin: 0;
  font-family: var(--font-body);
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--text-muted);
}

/* Piste. Eteinte: bleu nuit tres dilue, filet a >=3:1 sur blanc (WCAG 1.4.11). */
.switch__input {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  flex: none;
  width: 4.8rem;
  height: 2.8rem;
  border-radius: var(--radius-pill);
  background: color-mix(in oklch, var(--text-base) 16%, transparent);
  border: var(--line-width) solid color-mix(in oklch, var(--text-base) 50%, transparent); /* >=3:1 sur le blanc (WCAG 1.4.11) */
  cursor: pointer;
  transition:
    background-color var(--motion-duration-hover) var(--motion-ease-out),
    border-color var(--motion-duration-hover) var(--motion-ease-out);
}

/* Knob: glisse de gauche a droite et se pose (settle). Ombre chaude a peine
 * percue pour l'asseoir sur la piste sans le faire flotter. */
.switch__input::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0.3rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: var(--bg-lift);
  box-shadow: var(--elev-low);
  transform: translateY(-50%);
  transition: transform var(--motion-duration-line) var(--motion-ease-settle);
}

/* Crochet dans le knob, revele une fois actif. Forme via mask (le data-URI ne
 * porte aucune couleur), teinte navy via background-color. Suit le knob. */
.switch__input::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0.3rem;
  width: 2.2rem;
  height: 2.2rem;
  transform: translateY(-50%);
  background-color: var(--text-base);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3.5 8.5 L6.5 11.5 L12.5 5' fill='none' stroke='%23000' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 1.2rem no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3.5 8.5 L6.5 11.5 L12.5 5' fill='none' stroke='%23000' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 1.2rem no-repeat;
  opacity: 0;
  transition:
    transform var(--motion-duration-line) var(--motion-ease-settle),
    opacity var(--motion-duration-hover) var(--motion-ease-out);
}

.switch__input:checked {
  background: var(--text-base);
  border-color: var(--text-base);
}
/* Course = piste (4.8) - knob (2.2) - 2x inset (0.6) = 2rem. */
.switch__input:checked::before { transform: translate(2rem, -50%); }
.switch__input:checked::after { transform: translate(2rem, -50%); opacity: 1; }

/* Focus clavier: halo bleu confiance, aligne sur la case a cocher soeur. */
.switch__input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent-trust) 24%, transparent);
}

.switch--disabled .switch__input { cursor: not-allowed; opacity: 0.55; }
.switch--disabled .switch__label { cursor: default; }
</style>
