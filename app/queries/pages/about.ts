// Requete scopee — A propos (/a-propos). aboutPage FULL; collections en cartes
// (temoignages et autres blocs eventuels). Param: $language.
import { GLOBALS, singletons, collections } from './_shared'

export const ABOUT_QUERY = /* groq */ `{${GLOBALS},${singletons('aboutPage')},${collections()}}`
