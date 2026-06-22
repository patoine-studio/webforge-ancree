// Requete scopee — FAQ (/faq). faqPage FULL (+ sections, deja dans le squelette);
// la banque faqItems complete (filtrage par theme cote client). Param: $language.
import { GLOBALS, singletons, collections } from './_shared'

export const FAQ_QUERY = /* groq */ `{${GLOBALS},${singletons('faqPage')},${collections()}}`
