import { defineType, defineField, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { maxItemsInput } from '../../components/maxItemsInput'
import { pageBuilderField } from '../objects/blocks/page-builder'

export const homePage = defineType({
  name: 'homePage',
  title: 'Accueil',
  type: 'document',
  icon: HomeIcon,
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
      title: 'Héros d\'accueil',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'heroHome' })],
      // Verrouillé à un seul bloc héros (mini-builder): on choisit ou on échange
      // le héros, jamais plus d'un. Les variantes futures s'ajoutent à `of`.
      validation: (R) => R.required().length(1),
      components: { input: maxItemsInput(1) },
    }),
    pageBuilderField,
    // Sur l'accueil, le code neutralise le gabarit de marque (titleTemplate: null):
    // le champ seo.title porte le titre complet.
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
      title: 'Accueil' + (language ? ' (' + language.toUpperCase() + ')' : ''),
    }),
  },
})
