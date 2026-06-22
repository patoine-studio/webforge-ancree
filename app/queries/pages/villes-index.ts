// Requete scopee — Villes desservies (/villes). villesPage FULL; la grille de
// villes + les blocs lisent les collections en cartes. Param: $language.
// (Analogue du projects-index de Minimaliste: serviceCity remplace project.)
import { GLOBALS, singletons, collections } from './_shared'

export const VILLES_INDEX_QUERY = /* groq */ `{${GLOBALS},${singletons('villesPage')},${collections()}}`
