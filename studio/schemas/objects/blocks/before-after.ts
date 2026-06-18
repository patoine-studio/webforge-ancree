import { defineType, defineField, defineArrayMember } from 'sanity'
import { TransferIcon } from '@sanity/icons'

export const beforeAfter = defineType({
  name: 'beforeAfter',
  title: 'Bloc: avant / après',
  type: 'object',
  icon: TransferIcon,
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
    }),
    defineField({
      name: 'lead',
      title: 'Texte d\'amorce',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Paires avant / après',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'beforeAfterItem',
          title: 'Paire',
          fields: [
            defineField({
              name: 'before',
              title: 'Avant',
              type: 'figure',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'after',
              title: 'Après',
              type: 'figure',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Légende',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'caption', media: 'before.image' },
            prepare: ({ title, media }) => ({
              title: title || 'Paire avant / après',
              media,
            }),
          },
        }),
      ],
      validation: (R) => R.required().min(1),
    }),
  ],
  preview: {
    select: { heading: 'heading', items: 'items' },
    prepare: ({ heading, items }) => ({
      title: heading || 'Avant / après',
      subtitle: 'Bloc: avant / après, ' + (items?.length ?? 0) + ' paires',
    }),
  },
})
