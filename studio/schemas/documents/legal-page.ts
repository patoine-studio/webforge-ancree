import { defineType, defineField, defineArrayMember } from 'sanity'
import { ClipboardIcon } from '@sanity/icons'

// Exactement 2 instances par langue, avec des ids déterministes
// (legalPage-conditions-<lang>, legalPage-confidentialite-<lang>). Pas de slug:
// les routes sont résolues par le route-map sur _id.
export const legalPage = defineType({
  name: 'legalPage',
  title: 'Page légale',
  type: 'document',
  icon: ClipboardIcon,
  groups: [
    { name: 'content', title: 'Contenu', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'content',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'effective',
      title: 'Date d\'entrée en vigueur',
      description:
        'À fournir par le client. Vide: le site affiche une zone à compléter encadrée à la place de la date.',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'updated',
      title: 'Dernière mise à jour',
      description:
        'À fournir par le client. Vide: le site affiche une zone à compléter encadrée à la place de la date.',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'legalSection' })],
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO de la page',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', updated: 'updated', language: 'language' },
    prepare: ({ title, updated, language }) => ({
      title: title || '(sans titre)',
      subtitle:
        'Mise à jour ' +
        (updated || 'à compléter') +
        (language ? ' (' + language.toUpperCase() + ')' : ''),
    }),
  },
})
