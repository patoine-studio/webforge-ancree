// Texte d'interface du bloc contact, depuis i18n (discipline 2).
//
// En famille Ancree, le contactBlock Sanity ne porte que eyebrow/heading/lead.
// Les ETIQUETTES des coordonnees (NAP) et les LIBELLES du formulaire sont du
// chrome produit: ils restent hors Sanity, dans i18n. transformGraph les recoit
// par son 3e parametre `contactUi` et les joint a la NAP structuree de
// siteSettings. Ce helper assemble ce ContactUiText pour une langue donnee.
//
// Lecture par getLocaleMessage (objet complet de la langue), pas t(): aucune
// interpolation a faire ici, et c'est appelable hors setup (plugins, middleware).
// Les call sites (plugins/01.content, plugins/02.preview-live, middleware/
// 00.preview-content) l'invoquent avant transformGraph.

import type { ContactUiText } from '~/sanity/transform'
import type { Locale } from '~/config/route-map'

interface ContactMessages {
  meta: { phone: string; email: string; area: string; hours: string }
  form: {
    field_name: string
    field_contact: string
    field_message: string
    submit_idle: string
    submit_loading: string
    success_title: string
    success_body: string
    error_title: string
    error_body: string
    privacy_note: string
  }
}

/**
 * Assemble le texte d'interface du bloc contact pour `locale`, depuis les
 * messages i18n charges (cle `contact.meta` + `contact.form`). Retourne la forme
 * exacte attendue par transformGraph (metaLabels joints a la NAP, form integral).
 */
export function resolveContactUi(locale: Locale): ContactUiText {
  const messages = useNuxtApp().$i18n.getLocaleMessage(locale) as unknown as {
    contact: ContactMessages
  }
  const { meta, form } = messages.contact
  return {
    metaLabels: {
      phone: meta.phone,
      email: meta.email,
      area: meta.area,
      hours: meta.hours
    },
    form: {
      fields: {
        name: { label: form.field_name, required: true },
        contact: { label: form.field_contact, required: true },
        message: { label: form.field_message, required: false }
      },
      submitIdle: form.submit_idle,
      submitLoading: form.submit_loading,
      success: { title: form.success_title, body: form.success_body },
      errorBanner: { title: form.error_title, body: form.error_body },
      privacyNote: form.privacy_note
    }
  }
}
