import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nom du client',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'context',
      title: 'Contexte',
      description: 'Mention affichée sous le nom, par exemple le secteur ou le quartier.',
      type: 'string',
    }),
    defineField({
      name: 'service',
      title: 'Service associé',
      type: 'reference',
      to: [{ type: 'service' }],
      options: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: (document as { language?: string })?.language ?? 'fr' },
        }),
        documentInternationalization: { exclude: true },
      },
    }),
    // Les références service et ville peuvent coexister.
    defineField({
      name: 'city',
      title: 'Ville associée',
      type: 'reference',
      to: [{ type: 'serviceCity' }],
      options: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: (document as { language?: string })?.language ?? 'fr' },
        }),
        documentInternationalization: { exclude: true },
      },
    }),
    defineField({
      name: 'avatar',
      title: 'Photo du client',
      type: 'figure',
    }),
    defineField({
      name: 'note',
      title: 'Note',
      description: 'Appréciation sur cinq, affichée en étoiles.',
      type: 'number',
      validation: (R) => R.min(1).max(5),
    }),
    defineField({
      name: 'source',
      title: 'Provenance',
      description: 'Origine du témoignage, par exemple Google ou une fiche client.',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Témoignage vedette',
      description: 'Sélectionné par les blocs témoignages en mode vedettes.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
      validation: (R) => R.required().integer().positive(),
    }),
  ],
  orderings: [
    { title: 'Ordre de la collection', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { name: 'name', context: 'context', featured: 'featured', media: 'avatar.image', language: 'language' },
    prepare: ({ name, context, featured, media, language }) => ({
      title: name || '(sans nom)',
      subtitle:
        (featured ? 'Vedette, ' : '') +
        (context || '') +
        (language ? ' (' + language.toUpperCase() + ')' : ''),
      media,
    }),
  },
})
