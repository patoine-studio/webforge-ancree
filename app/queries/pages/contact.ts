// Requete scopee — Contact (/contact). contactPage FULL (le bloc contact joint
// les coordonnees depuis siteSettings.contact au transform; les libelles de
// formulaire viennent de i18n). Param: $language.
import { GLOBALS, singletons, collections } from './_shared'

export const CONTACT_QUERY = /* groq */ `{${GLOBALS},${singletons('contactPage')},${collections()}}`
