import { defineType, defineField } from 'sanity'
import { TrendUpwardIcon } from '@sanity/icons'

/**
 * Chiffre de confiance: paire { value, label } affichée dans le bloc À propos.
 * Propre à la présentation des statistiques Ancrée.
 */
export const stat = defineType({
  name: 'stat',
  title: 'Chiffre de confiance',
  type: 'object',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Valeur',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'label',
      title: 'Libellé',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
    prepare: ({ title, subtitle }) => ({
      title: title || '(chiffre sans valeur)',
      subtitle: subtitle || 'Chiffre de confiance',
    }),
  },
})
