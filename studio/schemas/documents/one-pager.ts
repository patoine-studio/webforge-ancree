import { defineType, defineField, defineArrayMember } from 'sanity'
import { PresentationIcon } from '@sanity/icons'
import { maxItemsInput } from '../../components/maxItemsInput'
import { pageBuilderField } from '../objects/blocks/page-builder'

// Page dédiée du palier One-Pager, mêmes blocs que le multipage, aucun schéma
// dupliqué. Type propre à Ancrée: auparavant le one-pager consommait homePage.
// Le noindex du one-pager reste en code (usePageSeo({ noindex: true })).
export const onePager = defineType({
  name: 'onePager',
  title: 'One-Pager (palier 1)',
  type: 'document',
  icon: PresentationIcon,
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
      title: 'One-Pager (palier 1)' + (language ? ' (' + language.toUpperCase() + ')' : ''),
    }),
  },
})
