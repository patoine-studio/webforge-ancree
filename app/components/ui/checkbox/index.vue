<script setup lang="ts">
/* Case à cocher: primitive de formulaire accessible. Le libellé passe par le slot
 * par défaut (permet d'y glisser un lien, ex. acceptation d'une politique).
 * Présentationnel: la validation vit dans le formulaire. Émet update:modelValue
 * (v-model booléen) et blur. focus() exposé pour que la vue replace le focus sur
 * la case quand elle est la première erreur à la soumission (bouton toujours
 * actif). Aucune valeur design en dur: tout par tokens. */
defineProps<{
  modelValue: boolean
  required?: boolean
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  blur: []
}>()

const uid = useId()
const id = `check-${uid}`
const errorId = `err-${uid}`

const control = ref<HTMLInputElement | null>(null)
defineExpose({ focus: () => control.value?.focus() })
</script>

<template>
  <div class="check" :class="{ 'check--error': !!error }">
    <div class="check__row">
      <input
        :id="id"
        ref="control"
        type="checkbox"
        class="check__input"
        :checked="modelValue"
        :required="required"
        :aria-required="required || undefined"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? errorId : undefined"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        @blur="emit('blur')"
      >
      <label :for="id" class="check__label"><slot /></label>
    </div>
    <p v-if="error" :id="errorId" class="check__error" role="alert">
      <Icon name="lucide:alert-circle" class="check__error-icon" aria-hidden="true" />
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.check {
  display: grid;
  gap: 0.8rem;
}
.check__row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.check__input {
  flex: none;
  width: 2rem;
  height: 2rem;
  margin-top: 0.25rem;
  accent-color: var(--accent-trust);
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.check__input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent-trust) 24%, transparent);
}
.check__label {
  font-family: var(--font-body);
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--text-base);
  cursor: pointer;
}
.check__label :deep(a) {
  color: var(--accent-trust);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.check__label :deep(a:hover) {
  color: var(--accent-call);
}
.check--error .check__input {
  accent-color: var(--error);
  box-shadow: 0 0 0 2px color-mix(in oklch, var(--error) 38%, transparent);
}
.check__error {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  font-family: var(--font-body);
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--error);
}
.check__error-icon {
  width: 1.7rem;
  height: 1.7rem;
  flex: none;
}
</style>
