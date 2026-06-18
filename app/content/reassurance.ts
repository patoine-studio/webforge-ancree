// Bloc « reassurance » — CONTRAT.
//
// V2 (Sanity): le contenu vit dans les pageBuilders. Interface consommée par
// types/blocks.ts, le composant et le transform.
//
// Chips de réassurance (intervention le jour même, urgence 24/7, estimation
// gratuite, prix ferme…): une rangée de pilules icône + libellé, sans valeur.

export interface ReassuranceContent {
  // Surtitre optionnel (wf-caption). À mériter, souvent omis.
  eyebrow?: string
  heading?: string
  lead?: string
  // Engagements de réassurance. icon = nom Iconify lucide (ex: 'lucide:clock').
  items: Array<{ icon?: string; label: string }>
}
