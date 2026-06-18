// Bloc « service-area » — CONTRAT.
//
// V2 (Sanity): le contenu vit dans les pageBuilders. Interface consommée par
// types/blocks.ts, le composant et le transform.
//
// Zone de service: titre + amorce, une grille de chips de zones desservies
// (chacune coiffée d'une épingle), puis une note optionnelle (ex. « et les
// environs »).

export interface ServiceAreaContent {
  // Surtitre optionnel (wf-caption). À mériter, souvent omis.
  eyebrow?: string
  heading: string
  lead?: string
  // Villes / secteurs desservis.
  areas: Array<{ name: string }>
  // Note optionnelle sous la liste (wf-body-3 muted).
  note?: string
}
