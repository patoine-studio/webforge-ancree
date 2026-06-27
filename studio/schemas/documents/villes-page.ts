import { defineType, defineField, defineArrayMember } from 'sanity'
import { PinIcon } from '@sanity/icons'
import { maxItemsInput } from '../../components/maxItemsInput'
import { pageBuilderField } from '../objects/blocks/page-builder'

export const villesPage = defineType({
  name: 'villesPage',
  title: 'Page Villes',
  type: 'document',
  icon: PinIcon,
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
      name: 'hero',
      title: 'Héros de page',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'pageHero' })],
      // Verrouillé à un seul bloc héros (mini-builder): on choisit ou on échange le
      // héros, jamais plus d'un. Les variantes futures s'ajoutent à `of`.
      validation: (R) => R.required().length(1),
      components: { input: maxItemsInput(1) },
    }),
    // La grille des villes (serviceCity) est rendue par la page, hors builder.
    pageBuilderField,
    defineField({
      name: 'seo',
      title: 'SEO de la page',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: { language: 'language' },
    prepare: ({ language }) => ({
      title: 'Page Villes' + (language ? ' (' + language.toUpperCase() + ')' : ''),
    }),
  },
})
