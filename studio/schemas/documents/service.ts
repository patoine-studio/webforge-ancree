import { defineType, defineField, defineArrayMember } from 'sanity'
import { BugIcon } from '@sanity/icons'
import { maxItemsInput } from '../../components/maxItemsInput'
import { LucideIconInput } from '../../components/lucideIconInput'
import { pageBuilderField } from '../objects/blocks/page-builder'
import { isUniqueAcrossLocale } from '../lib/localized-slug'

/**
 * Service: une prestation de la collection, rendue en carte sur la page Services
 * et en page de détail à /services/<slug>.
 *
 * i18n document-level (plugin document-internationalization): un document par
 * langue, champ `language` géré par le plugin (lecture seule, masqué), slug
 * PARTAGÉ entre les langues via documentInternationalization: { exclude: true }.
 *
 * Édition alignée sur les singletons: deux onglets seulement. Contenu porte
 * l'identité de carte (icône, titre, résumé, image, tri) + un masthead verrouillé
 * (hero[1]) + un pageBuilder de sections. Référencement porte le SEO. La page de
 * détail se compose donc en blocs, comme l'accueil ou À propos.
 */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: BugIcon,
  groups: [
    { name: 'content', title: 'Contenu', default: true },
    { name: 'seo', title: 'Référencement' },
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
      name: 'icon',
      title: 'Icône (Iconify lucide)',
      description: 'Affichée sur la carte du service.',
      type: 'string',
      group: 'content',
      components: { input: LucideIconInput },
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'content',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'Accessible à /services/<slug>. Traduit par langue.',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        documentInternationalization: { exclude: true },
        isUnique: isUniqueAcrossLocale,
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Résumé',
      description: 'Texte court affiché sur la carte de la grille des services.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (R) => [
        R.required(),
        R.max(280).warning('Plus de 280 caractères: la carte de la grille devient trop dense'),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Ratio 4:3 sur la carte de la grille.',
      type: 'figure',
      group: 'content',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      description:
        'Position dans la collection (1 = premier). Détermine l\'ordre d\'affichage de la grille.',
      type: 'number',
      group: 'content',
      validation: (R) => R.required().integer().positive(),
    }),
    defineField({
      name: 'featured',
      title: 'Mis en vedette',
      description: 'Met le service en avant sur la page d\'accueil et la grille.',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'hero',
      title: 'En-tête de page',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'detailHero' })],
      // Verrouillé à un seul masthead (mini-builder), comme le héros des singletons.
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
  orderings: [
    { title: 'Ordre de la collection', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', language: 'language', media: 'image.image' },
    prepare: ({ title, slug, language, media }) => ({
      title: title || '(sans titre)',
      subtitle: '/services/' + (slug || '?') + (language ? ' (' + language.toUpperCase() + ')' : ''),
      media,
    }),
  },
})
