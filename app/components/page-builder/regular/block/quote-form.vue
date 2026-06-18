<script setup lang="ts">
import type { BlockBase } from '~/types/blocks'
import type { QuoteFormContent } from '~/content/quote-form'

// Panneau de conversion: formulaire de soumission à 3 champs (nom, téléphone,
// type de service), simulé 100 % côté client. Au submit valide (nom + téléphone
// remplis), le panneau bascule sur l'état succès. Aucun backend, aucune
// validation lourde. Tous les libellés viennent du CONTENU (props), pas de i18n.
const quoteForm = defineProps<BlockBase<'quote-form'> & QuoteFormContent>()

const vals = reactive({ name: '', phone: '', service: '' })
const sent = ref(false)

// Options du <Select>: la valeur EST le libellé (choix de service simple, pas
// de code interne).
const serviceOptions = computed(() =>
  quoteForm.serviceOptions.map((label) => ({ label, value: label }))
)

function onSubmit() {
  // Soumission simulée: succès dès que nom + téléphone sont renseignés.
  if (vals.name.trim() && vals.phone.trim()) {
    sent.value = true
  }
}
</script>

<template>
  <section class="wf-section wf-quote-form">
    <div class="wf-container">
      <div class="wf-quote-panel">
        <div class="wf-quote-head">
          <div v-if="quoteForm.eyebrow" class="wf-caption">{{ quoteForm.eyebrow }}</div>
          <h2 class="wf-h2">{{ quoteForm.heading }}</h2>
          <p v-if="quoteForm.lead" class="wf-body-2 wf-text-muted">{{ quoteForm.lead }}</p>
        </div>

        <!-- État succès: remplace le formulaire sur place une fois la soumission
             simulée acceptée. role=status l'annonce aux lecteurs d'écran. -->
        <div v-if="sent" class="wf-quote-success" role="status">
          <h3 class="wf-h3">{{ quoteForm.success.title }}</h3>
          <p class="wf-body-2 wf-text-muted">{{ quoteForm.success.body }}</p>
        </div>

        <form v-else class="wf-quote-fields" novalidate @submit.prevent="onSubmit">
          <Input
            v-model="vals.name"
            :label="quoteForm.labels.name"
            type="text"
            required
            autocomplete="name"
          />
          <Input
            v-model="vals.phone"
            :label="quoteForm.labels.phone"
            type="tel"
            required
            autocomplete="tel"
          />
          <Select
            v-model="vals.service"
            :label="quoteForm.labels.service"
            :options="serviceOptions"
          />

          <Button type="submit" class="wf-btn-call wf-quote-submit" :icon="false">
            {{ quoteForm.submit }}
          </Button>

          <p v-if="quoteForm.privacyNote" class="wf-body-3 wf-text-muted wf-quote-privacy">
            {{ quoteForm.privacyNote }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
