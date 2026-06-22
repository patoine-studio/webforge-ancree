import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const articleImage = defineType({
  name: 'articleImage',
  title: 'Article: image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'figure',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Legende',
      type: 'string',
    }),
  ],
  preview: {
    select: { caption: 'caption', label: 'image.label', alt: 'image.alt', media: 'image.image' },
    prepare({ caption, label, alt, media }) {
      return {
        title: caption || label || alt || '(image sans etiquette)',
        subtitle: 'Article: image',
        media,
      }
    },
  },
})
