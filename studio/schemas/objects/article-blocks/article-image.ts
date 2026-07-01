import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const articleImage = defineType({
  name: 'articleImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'figure',
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { filename: 'image.image.asset.originalFilename', media: 'image.image' },
    prepare({ filename, media }) {
      return {
        title: filename || 'Image',
        subtitle: 'Image',
        media,
      }
    },
  },
})
