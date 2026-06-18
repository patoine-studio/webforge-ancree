// Bloc « before-after » — CONTRAT.
//
// V2 (Sanity): le contenu vit dans les pageBuilders. Interface consommée par
// types/blocks.ts, le composant et le transform.
//
// Galerie avant/après: chaque paire montre deux figures côte à côte (l'état
// avant intervention, l'état après), coiffées d'un badge « Avant »/« Après »
// (libellés d'UI via i18n), avec une légende de paire optionnelle.

// Figure résolue, identique au shape image des autres blocs media (cf.
// media-text / about): { ratio, src?, alt, label, caption }. Repris localement.
export interface BeforeAfterFigure {
  ratio: string
  // V2: asset Sanity résolu en URL dans la couche d'assemblage (transform).
  src?: string
  alt: string
  label: string
  caption: string
}

export interface BeforeAfterContent {
  // Surtitre optionnel (wf-caption). À mériter, souvent omis.
  eyebrow?: string
  heading?: string
  lead?: string
  // Paires avant/après. caption = légende affichée sous la paire si présente.
  items: Array<{ before: BeforeAfterFigure; after: BeforeAfterFigure; caption?: string }>
}
