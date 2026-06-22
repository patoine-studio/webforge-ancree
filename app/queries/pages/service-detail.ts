// Requete scopee — Detail service (/services/<slug>). Aucun singleton full;
// le service courant ($slug) sort en FULL (intro/benefits deja en carte +
// detail + translations); les autres services restent en carte (PAD des blocs
// lies). Params: $language, $slug.
import { GLOBALS, singletons, collections } from './_shared'

export const SERVICE_DETAIL_QUERY = /* groq */ `{${GLOBALS},${singletons()},${collections('service')}}`
