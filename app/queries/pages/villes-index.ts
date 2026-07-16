// Requete scopee — Villes desservies (/villes). villesPage FULL; la grille de
// villes + les blocs lisent les collections en cartes. Param: $language.
// L'index regroupe les pages locales serviceCity publiées.
import { GLOBALS, singletons, collections } from './_shared'

export const VILLES_INDEX_QUERY = /* groq */ `{${GLOBALS},${singletons('villesPage')},${collections()}}`
