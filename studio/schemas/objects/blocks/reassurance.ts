import { defineType, defineField, defineArrayMember } from 'sanity'
import { CheckmarkCircleIcon } from '@sanity/icons'

export const reassurance = defineType({
  name: 'reassurance',
  title: 'Bloc: réassurance',
  type: 'object',
  icon: CheckmarkCircleIcon,
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
      title: 'Engagements',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'reassuranceItem',
          title: 'Engagement',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icône',
              description: 'Nom Iconify lucide, ex. lucide:clock',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        }),
      ],
      validation: (R) => R.required().min(1),
    }),
  ],
  preview: {
    select: { heading: 'heading', items: 'items' },
    prepare: ({ heading, items }) => ({
      title: heading || 'Réassurance',
      subtitle: 'Bloc: réassurance, ' + (items?.length ?? 0) + ' items',
    }),
  },
})
