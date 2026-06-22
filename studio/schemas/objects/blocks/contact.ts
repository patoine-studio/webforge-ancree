import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

/**
 * Bloc Contact: surtitre, titre et accroche. Les coordonnées affichées
 * (téléphone, courriel, atelier, heures) NE vivent PAS dans le bloc: elles sont
 * jointes depuis siteSettings.contact à la résolution GROQ. Le bloc ne porte que
 * les libellés éditoriaux. Forme propre à Ancrée, conventions alignées sur
 * l'analogue Minimaliste (objects/blocks/contact.ts).
 */
export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Bloc: contact',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Texte d\'amorce',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({
      title: heading || '(sans titre)',
      subtitle: 'Bloc: contact',
    }),
  },
})
