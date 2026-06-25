import { defineField } from 'sanity'

/**
 * Configuration Portable Text du bloc éditorial. Comme articlePortableText, mais
 * l'annotation `link` accepte des LIENS INTERNES (référence vers une page, un
 * service, une ville, un article…), une URL externe ou une ancre. Le href est
 * résolu au transform (docPath/resolveLink, localisé par langue) puis rendu par le
 * sérialiseur partagé PortableText.vue (interne -> NuxtLink, externe -> <a> sûr).
 *
 * Ce n'est PAS un type enregistré: la valeur est réutilisée dans le `of: [...]` du
 * champ body des segments, et reste absente du registre index.ts (comme
 * articlePortableText).
 *
 * Pas de type « Appel (téléphone) » inline: un appel passe par un bloc CTA, jamais
 * un tel: au fil du texte (cohérent avec articlePortableText).
 */
const INTERNAL_REF_TARGETS = [
  { type: 'homePage' },
  { type: 'servicesPage' },
  { type: 'villesPage' },
  { type: 'aboutPage' },
  { type: 'blogPage' },
  { type: 'faqPage' },
  { type: 'contactPage' },
  { type: 'onePager' },
  { type: 'service' },
  { type: 'serviceCity' },
  { type: 'article' },
  { type: 'category' },
  { type: 'legalPage' },
]

export const editorialPortableText = {
  type: 'block' as const,
  styles: [
    { title: 'Paragraphe', value: 'normal' },
    { title: 'Sous-titre', value: 'h3' },
  ],
  lists: [
    { title: 'Liste a puces', value: 'bullet' },
    { title: 'Liste numerotee', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Gras', value: 'strong' },
      { title: 'Italique', value: 'em' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object' as const,
        title: 'Lien',
        fields: [
          defineField({
            name: 'type',
            title: 'Type de lien',
            type: 'string',
            options: {
              list: [
                { title: 'Page interne (référence)', value: 'internal' },
                { title: 'URL externe', value: 'external' },
                { title: 'Ancre (#section)', value: 'anchor' },
              ],
              layout: 'radio',
            },
            initialValue: 'internal',
            validation: (R) => R.required(),
          }),
          defineField({
            name: 'internalRef',
            title: 'Page interne',
            description: 'Pour le type Ancre, laisser vide signifie page courante.',
            type: 'reference',
            to: INTERNAL_REF_TARGETS,
            hidden: ({ parent }) => parent?.type !== 'internal' && parent?.type !== 'anchor',
            options: {
              filter: ({ document }) => ({
                filter: 'language == $language',
                params: { language: (document as { language?: string })?.language ?? 'fr' },
              }),
              documentInternationalization: { exclude: true },
            },
            validation: (R) =>
              R.custom((value, ctx) => {
                const parent = ctx.parent as { type?: string } | undefined
                if (parent?.type === 'internal' && !value) return 'Référence requise'
                return true
              }),
          }),
          defineField({
            name: 'externalUrl',
            title: 'URL externe',
            type: 'url',
            hidden: ({ parent }) => parent?.type !== 'external',
            validation: (R) =>
              R.uri({ scheme: ['http', 'https', 'mailto'] }).custom((value, ctx) => {
                const parent = ctx.parent as { type?: string } | undefined
                if (parent?.type === 'external' && !value) return 'URL requise'
                return true
              }),
          }),
          defineField({
            name: 'anchor',
            title: 'Ancre',
            description: 'Sans le #, ex: contact',
            type: 'string',
            hidden: ({ parent }) => parent?.type !== 'anchor',
            validation: (R) =>
              R.custom((value, ctx) => {
                const parent = ctx.parent as { type?: string } | undefined
                if (parent?.type !== 'anchor') return true
                if (!value) return 'Ancre requise'
                if (!/^[a-z0-9][a-z0-9-]*$/.test(value)) {
                  return 'Ancre invalide: minuscules, chiffres et traits d\'union, sans # ni espace'
                }
                return true
              }),
          }),
        ],
      },
    ],
  },
}
