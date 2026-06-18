import { defineType, defineField, defineArrayMember } from 'sanity'
import { PinIcon } from '@sanity/icons'

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Bloc: zone de service',
  type: 'object',
  icon: PinIcon,
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
      rows: 3,
    }),
    defineField({
      name: 'areas',
      title: 'Zones desservies',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceAreaItem',
          title: 'Zone',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: 'name' },
          },
        }),
      ],
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { heading: 'heading', areas: 'areas' },
    prepare: ({ heading, areas }) => ({
      title: heading || 'Zone de service',
      subtitle: 'Bloc: zone de service, ' + (areas?.length ?? 0) + ' zones',
    }),
  },
})
