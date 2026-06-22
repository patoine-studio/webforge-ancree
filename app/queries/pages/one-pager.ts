// Requete scopee — One-Pager (/one-pager). onePager FULL; memes collections en
// cartes que l'accueil (services/villes/temoignages/faq selon les blocs).
// Param: $language.
import { GLOBALS, singletons, collections } from './_shared'

export const ONE_PAGER_QUERY = /* groq */ `{${GLOBALS},${singletons('onePager')},${collections()}}`
