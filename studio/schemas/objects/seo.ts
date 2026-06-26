import { defineType, defineField } from 'sanity'
import { SearchIcon } from '@sanity/icons'

/**
 * SEO de page, posé sur CHAQUE document qui rend une page indexable: les pages
 * fixes et le one-pager, les collections service et serviceCity, et désormais
 * article, catégorie et legalPage (modèle d'édition uniforme « Contenu + SEO »).
 * Les banques qui n'ont pas de page propre (testimonial, faqItem, faqTheme) n'en
 * portent pas. Chaque champ vide retombe par dérivation au transform/usePageSeo
 * (titre du héros, accroche, image de couverture), donc zéro orphelin.
 *
 * Sémantique spéciale homePage et onePager: le code y neutralise le gabarit
 * de marque (titleTemplate: null), le champ `title` y porte donc le titre
 * COMPLET.
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO de la page',
  type: 'object',
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'Titre SEO',
      description:
        'Remplace le titre du héros dans la balise title. Le suffixe de marque est ajouté automatiquement, sauf sur l\'accueil et le one-pager.',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description SEO',
      type: 'text',
      rows: 2,
      validation: (R) => R.max(160).warning('Plus de 160 caractères: risque de troncature dans Google'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image de partage',
      description: 'Affichée au partage sur les réseaux. Dimensions recommandées: 1200 x 630 px.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
