import { defineType, defineField } from 'sanity'
import { PresentationIcon } from '@sanity/icons'

/**
 * Masthead de page de détail: l'en-tête des collections (service, serviceCity),
 * membre unique du champ `hero` (mini-builder verrouillé à un élément, comme le
 * `pageHero` des singletons). Volontairement SANS image pleine: les pages de
 * détail portent un masthead solide, pas le héros pleine image des singletons.
 *
 * Le fil d'Ariane n'est pas stocké (dérivé du route-map au rendu). Le surtitre
 * remplace l'ancien champ `meta` (Repère) du service et l'étiquette « Villes »
 * codée de la ville. L'appel direct se rend par défaut depuis la NAP de la marque
 * quand aucun bouton n'est saisi: le bouton ci-dessous est un override optionnel.
 */
export const detailHero = defineType({
  name: 'detailHero',
  title: 'En-tête de page',
  type: 'object',
  icon: PresentationIcon,
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      description: 'Mention courte au-dessus du titre, ex. Traitement et suivi, ou Villes.',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Accroche',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cta',
      title: 'Bouton (optionnel)',
      description: 'Vide: l\'appel direct de la marque est affiché par défaut.',
      type: 'link',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Posée à côté du titre (split). Service: le nuisible sur fond blanc. Ville: une image partagée.',
      type: 'figure',
    }),
  ],
  preview: {
    select: { title: 'title', eyebrow: 'eyebrow', media: 'image.image' },
    prepare: ({ title, eyebrow, media }) => ({
      title: title || '(en-tête sans titre)',
      subtitle: eyebrow || 'En-tête de page',
      media,
    }),
  },
})
