// Requete scopee — Detail ville (/villes/<slug>). La ville courante ($slug) sort
// en FULL (body + seo + translations); les autres villes + les blocs lisent les
// collections en cartes. Params: $language, $slug.
// Le document serviceCity porte le détail d'une page locale.
import { GLOBALS, singletons, collections } from './_shared'

export const SERVICE_CITY_DETAIL_QUERY = /* groq */ `{${GLOBALS},${singletons()},${collections('serviceCity')}}`
