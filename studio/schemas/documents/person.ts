import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

/**
 * Banque de personnes: techniciens de Rempart, source unique de l'identité
 * (nom, rôle, bio, portrait). Référencée par le bloc équipe (/a-propos) ET par
 * l'auteur d'un article. i18n document-level: un doc par langue (nom identique,
 * rôle et bio traduits), portrait partagé via l'asset (alt bilingue sur l'asset).
 * Pas de slug: aucune page perso. Aucune numérotation.
 */
export const person = defineType({
  name: 'person',
  title: 'Personne',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio courte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Portrait',
      type: 'figure',
    }),
  ],
  orderings: [
    { title: 'Nom (A→Z)', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', language: 'language', media: 'photo.image' },
    prepare: ({ title, subtitle, language, media }) => ({
      title: title || '(sans nom)',
      subtitle: (subtitle || 'Personne') + (language ? ' (' + language.toUpperCase() + ')' : ''),
      media,
    }),
  },
})
