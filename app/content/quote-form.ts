// Bloc « quote-form » — CONTRAT.
//
// V2 (Sanity): le contenu vit dans les pageBuilders. Interface consommée par
// types/blocks.ts, le composant et le transform.
//
// Formulaire de soumission à 3 champs (nom, téléphone, type de service),
// simulé 100 % côté client: au submit valide, le panneau affiche un message de
// succès. Tous les libellés viennent du CONTENU (Sanity), jamais de i18n.

export interface QuoteFormContent {
  // Surtitre optionnel (wf-caption). À mériter, souvent omis.
  eyebrow?: string
  heading: string
  lead?: string
  // Libellés des champs (contenu, pas i18n: ils décrivent CE formulaire-ci).
  labels: { name: string; phone: string; service: string }
  // Options du menu déroulant de type de service.
  serviceOptions: string[]
  // Libellé du bouton d'envoi.
  submit: string
  // Message de confirmation affiché après une soumission valide.
  success: { title: string; body: string }
  // Mention de confidentialité optionnelle sous le bouton (wf-body-3 muted).
  privacyNote?: string
}
