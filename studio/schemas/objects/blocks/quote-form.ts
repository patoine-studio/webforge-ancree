import { defineType, defineField, defineArrayMember } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const quoteForm = defineType({
  name: 'quoteForm',
  title: 'Bloc: formulaire de soumission',
  type: 'object',
  icon: EnvelopeIcon,
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
      name: 'nameLabel',
      title: 'Libellé du champ « nom »',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'phoneLabel',
      title: 'Libellé du champ « téléphone »',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'serviceLabel',
      title: 'Libellé du champ « type de service »',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'serviceOptions',
      title: 'Options de service',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quoteServiceOption',
          title: 'Option',
          fields: [
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
    defineField({
      name: 'submitLabel',
      title: 'Libellé du bouton',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'successTitle',
      title: 'Titre de confirmation',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'successBody',
      title: 'Texte de confirmation',
      type: 'text',
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'privacyNote',
      title: 'Mention de confidentialité',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({
      title: heading || 'Formulaire de soumission',
      subtitle: 'Bloc: formulaire de soumission',
    }),
  },
})
