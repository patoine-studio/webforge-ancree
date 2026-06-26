import { defineType, defineField, defineArrayMember } from 'sanity'
import { PinIcon } from '@sanity/icons'
import { maxItemsInput } from '../../components/maxItemsInput'
import { pageBuilderField } from '../objects/blocks/page-builder'
import { isUniqueAcrossLocale } from '../lib/localized-slug'

/**
 * Service par ville: le moteur du SEO local, rendu en page de détail à
 * /villes/<slug> (fr) et /service-areas/<slug> (en).
 *
 * i18n document-level: un document par langue, slug PARTAGÉ entre les langues
 * (documentInternationalization: { exclude: true }; seul le segment parent est
 * localisé). L'unicité du slug est scopée par langue (isUniqueAcrossLocale): la
 * traduction jumelle au même slug n'est pas un conflit.
 *
 * Édition alignée sur les singletons et les services: deux onglets seulement.
 * Contenu porte l'identité de carte (ville, région, note, tri) + un masthead
 * verrouillé (hero[1]) + un pageBuilder de sections. L'onglet SEO porte le référencement.
 */
export const serviceCity = defineType({
  name: 'serviceCity',
  title: 'Service par ville',
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
      name: 'city',
      title: 'Ville',
      type: 'string',
      group: 'content',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'Accessible à /villes/<slug>. Partagé entre les langues.',
      type: 'slug',
      group: 'content',
      options: {
        source: 'city',
        maxLength: 96,
        documentInternationalization: { exclude: true },
        isUnique: isUniqueAcrossLocale,
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'region',
      title: 'Région',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'note',
      title: 'Note (carte)',
      description: 'Courte mention affichée sur la carte de la ville.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      description: 'Position dans la grille des villes (1 = premier).',
      type: 'number',
      group: 'content',
      validation: (R) => R.required().integer().positive(),
    }),
    defineField({
      name: 'featured',
      title: 'Mise en vedette',
      description: 'Sélectionnée par les blocs aperçu de villes en mode vedettes.',
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
    { title: 'Ville (A vers Z)', name: 'cityAsc', by: [{ field: 'city', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'city',
      region: 'region',
      language: 'language',
    },
    prepare: ({ title, region, language }) => ({
      title: title || '(sans ville)',
      subtitle:
        (region ? region : 'Ville') +
        (language ? ' (' + language.toUpperCase() + ')' : ''),
    }),
  },
})
