/* Contrat de contenu du bloc contact. Fichier TYPE-ONLY: la transformation Sanity
 * (app/sanity/transform.ts) COMPOSE cette forme, aucune fonction de repli ici. Le
 * bloc Sanity ne porte que eyebrow/heading/lead; le transform JOINT les
 * coordonnees (NAP structuree de siteSettings.contact) et les libelles de
 * formulaire (i18n, discipline 2: l'interface reste hors Sanity), injectes par
 * resolveBlocks via ContactUiText. La jointure de la NAP est STRUCTUREE (champ par
 * champ), jamais par sous-chaine de label. AUCUNE valeur design ni de contenu ici,
 * que des champs. Aucune numerotation, site-wide. */

// Un element de coordonnee: une etiquette, et soit une valeur simple (avec lien
// optionnel: tel, mailto), soit plusieurs lignes (adresse, heures).
export interface ContactMetaItem {
  label: string
  value?: string
  href?: string // tel:, mailto: ou URL; absent -> texte simple
  lines?: string[] // plusieurs lignes (heures, zone), au lieu de value
}

// Les trois champs du formulaire: nom, coordonnee (telephone ou courriel),
// message. Le contrat porte le libelle et l'obligation; la validation et le
// mouvement appartiennent au composant et au composable.
export interface ContactFormField {
  label: string
  required: boolean
}

export interface ContactForm {
  fields: {
    name: ContactFormField
    contact: ContactFormField
    message: ContactFormField
  }
  submitIdle: string // libelle du bouton au repos
  submitLoading: string // libelle pendant l'envoi
  success: {
    title: string
    body: string
  }
  // Banniere affichee si la soumission echoue (reseau, refus Turnstile, erreur
  // serveur). Le formulaire reste en place pour reessayer. Absente en demo (le
  // succes y est toujours simule), mais le contenu existe pour le vrai endpoint.
  errorBanner: {
    title: string
    body: string
  }
  privacyNote?: string // note de confidentialite sous le bouton
}

export interface ContactContent {
  eyebrow?: string // marqueur de section; absent sur une page dediee (le masthead le porte)
  heading: string
  lead: string
  meta: ContactMetaItem[]
  form: ContactForm
}
