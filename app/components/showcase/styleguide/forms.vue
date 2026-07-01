<script setup lang="ts">
/* Guide de style — formulaire de la famille Ancree: champs (saisie + erreur +
 * multiligne), selection (case a cocher), retroaction (confirmation) et un exemple
 * complet, rendus EN VRAI depuis les primitives UI de prod. Auto-suffisant: porte
 * ses propres sections ancrees (#champs, #selection, #retroaction, #exemple),
 * rendu directement dans le slot SgNav de /showcase. */
import Input from '~/components/ui/input/index.vue'
import Checkbox from '~/components/ui/checkbox/index.vue'
import Switch from '~/components/ui/switch/index.vue'
import Button from '~/components/ui/button/index.vue'
import FormSuccess from '~/components/domain/form-success/index.vue'

const { t } = useI18n()

const name = ref('')
const message = ref('')
const errored = ref('')
const consent = ref(false)
const analytics = ref(false)

// Exemple complet (etat local, aucun envoi reel: vitrine interne).
const exName = ref('')
const exEmail = ref('')
const exConsent = ref(false)
</script>

<template>
  <div class="sg-forms">
    <section id="champs" class="sg-forms__section">
      <div class="wf-container">
        <h2 class="wf-h3 sg-forms__title">{{ t('showcase.styleguide.forms.section_champs') }}</h2>
        <div class="sg-forms__grid">
          <Input
            id="sg-name"
            v-model="name"
            :label="t('showcase.styleguide.forms.label_name')"
            :optional-label="t('showcase.styleguide.forms.optional')"
          />
          <Input
            id="sg-error"
            v-model="errored"
            :label="t('showcase.styleguide.forms.label_email')"
            :error="t('showcase.styleguide.forms.field_error')"
          />
          <Input
            id="sg-message"
            v-model="message"
            multiline
            :label="t('showcase.styleguide.forms.label_message')"
            :optional-label="t('showcase.styleguide.forms.optional')"
          />
        </div>
      </div>
    </section>

    <section id="selection" class="sg-forms__section">
      <div class="wf-container">
        <h2 class="wf-h3 sg-forms__title">{{ t('showcase.styleguide.forms.section_selection') }}</h2>
        <div class="sg-forms__grid">
          <Checkbox v-model="consent">{{ t('showcase.styleguide.forms.consent') }}</Checkbox>
          <Switch
            v-model="analytics"
            :label="t('showcase.styleguide.forms.switch_label')"
            :description="t('showcase.styleguide.forms.switch_desc')"
          />
          <!-- Verrouillé (catégorie requise): rendu de l'état désactivé, comme « Nécessaires ». -->
          <Switch
            :model-value="true"
            disabled
            :label="t('showcase.styleguide.forms.switch_locked_label')"
            :description="t('showcase.styleguide.forms.switch_locked_desc')"
          />
        </div>
      </div>
    </section>

    <section id="retroaction" class="sg-forms__section">
      <div class="wf-container">
        <h2 class="wf-h3 sg-forms__title">{{ t('showcase.styleguide.forms.section_retroaction') }}</h2>
        <div class="sg-forms__grid">
          <FormSuccess
            :title="t('showcase.styleguide.forms.success_title')"
            :body="t('showcase.styleguide.forms.success_body')"
          />
        </div>
      </div>
    </section>

    <section id="exemple" class="sg-forms__section">
      <div class="wf-container">
        <h2 class="wf-h3 sg-forms__title">{{ t('showcase.styleguide.forms.section_exemple') }}</h2>
        <form class="sg-forms__example" @submit.prevent>
          <Input
            id="sg-ex-name"
            v-model="exName"
            required
            :label="t('showcase.styleguide.forms.label_name')"
            :required-label="t('showcase.styleguide.forms.required')"
          />
          <Input
            id="sg-ex-email"
            v-model="exEmail"
            type="email"
            required
            :label="t('showcase.styleguide.forms.label_email')"
            :required-label="t('showcase.styleguide.forms.required')"
          />
          <Checkbox v-model="exConsent">{{ t('showcase.styleguide.forms.consent') }}</Checkbox>
          <div>
            <Button variant="call" type="submit" icon="lucide:send">{{ t('showcase.styleguide.forms.submit') }}</Button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sg-forms__section {
  padding-block: calc(var(--spacing-unit) * 6);
  border-bottom: var(--line-hair);
  scroll-margin-top: 2rem;
}
.sg-forms__section:first-child {
  padding-top: calc(var(--spacing-unit) * 4);
}
.sg-forms__section:last-child {
  border-bottom: none;
}
.sg-forms__title {
  margin-bottom: calc(var(--spacing-unit) * 3);
}
/* Colonne de lecture: les champs ne s'etalent pas pleine largeur. */
.sg-forms__grid,
.sg-forms__example {
  display: grid;
  gap: 2.4rem;
  max-width: 52rem;
}
</style>
