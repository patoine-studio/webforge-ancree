import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon, EarthGlobeIcon } from '@sanity/icons'
import { SOCIAL_PLATFORM_OPTIONS, SOCIAL_PLATFORMS, type SocialPlatform } from '../../../app/config/socials'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Globales',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'brand', title: 'Marque', default: true },
    { name: 'contact', title: 'Coordonnées' },
    { name: 'nav', title: 'Navigation' },
    { name: 'social', title: 'Réseaux sociaux', icon: EarthGlobeIcon },
    { name: 'footer', title: 'Pied de page' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      group: 'brand',
    }),

    defineField({
      name: 'brand',
      title: 'Marque',
      type: 'object',
      group: 'brand',
      fields: [
        defineField({
          name: 'name',
          title: 'Nom de la marque',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'logo',
          title: 'Logo',
          description: 'Logo affiché dans l\'entête et le pied de page.',
          type: 'image',
        }),
        defineField({
          name: 'homeAriaLabel',
          title: 'Libellé d\'accessibilité du lien logo',
          description: 'Lu par les lecteurs d\'écran sur le lien de retour à l\'accueil.',
          type: 'string',
        }),
        defineField({
          name: 'tagline',
          title: 'Slogan',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'foundedYear',
          title: 'Année de fondation',
          type: 'number',
          validation: (R) => R.integer(),
        }),
      ],
    }),

    defineField({
      name: 'contact',
      title: 'Coordonnées',
      type: 'object',
      group: 'contact',
      // Forme Schema.org conservée telle quelle: ces sous-champs sont seedés et
      // lus par usePageSeo et le noeud LocalBusiness. Ne pas renommer.
      fields: [
        defineField({
          name: 'phoneDisplay',
          title: 'Téléphone (affiché)',
          type: 'string',
        }),
        defineField({
          name: 'phoneHref',
          title: 'Téléphone (href tel:)',
          type: 'string',
        }),
        defineField({
          name: 'emailDisplay',
          title: 'Courriel (affiché)',
          type: 'string',
        }),
        defineField({
          name: 'emailHref',
          title: 'Courriel (href mailto:)',
          type: 'string',
        }),
        defineField({
          name: 'areaName',
          title: 'Zone de service',
          type: 'string',
        }),
        defineField({
          name: 'hours',
          title: 'Heures',
          type: 'string',
        }),
        // Adresse postale du siège (noeud LocalBusiness du SEO). Forme Schema.org.
        defineField({
          name: 'address',
          title: 'Adresse postale',
          type: 'object',
          fields: [
            defineField({
              name: 'streetAddress',
              title: 'Rue et numéro',
              type: 'string',
            }),
            defineField({
              name: 'addressLocality',
              title: 'Ville',
              type: 'string',
            }),
            defineField({
              name: 'addressRegion',
              title: 'Province',
              type: 'string',
            }),
            defineField({
              name: 'postalCode',
              title: 'Code postal',
              type: 'string',
            }),
            defineField({
              name: 'addressCountry',
              title: 'Pays',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'object',
      group: 'nav',
      fields: [
        defineField({
          name: 'landing',
          title: 'Nav du one-pager',
          type: 'object',
          fields: [
            defineField({
              name: 'primary',
              title: 'Liens principaux',
              description: 'Liens de type Ancre, scrollspy du one-pager.',
              type: 'array',
              of: [defineArrayMember({ type: 'link' })],
              validation: (R) => R.required().min(1),
            }),
            defineField({
              name: 'cta',
              title: 'Bouton d\'appel',
              type: 'link',
              validation: (R) => R.required(),
            }),
          ],
        }),
        defineField({
          name: 'multipage',
          title: 'Nav du multipage',
          type: 'object',
          fields: [
            defineField({
              name: 'primary',
              title: 'Liens principaux',
              type: 'array',
              of: [defineArrayMember({ type: 'link' })],
              validation: (R) => R.required().min(1),
            }),
            defineField({
              name: 'cta',
              title: 'Bouton d\'appel',
              type: 'link',
              validation: (R) => R.required(),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'socials',
      title: 'Réseaux sociaux',
      description:
        'Choisir une plateforme et saisir l\'URL du profil. L\'icône et le libellé d\'accessibilité sont déterminés par la plateforme: rien d\'autre à saisir. Une plateforme sans URL n\'est pas affichée.',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          title: 'Réseau social',
          fields: [
            defineField({
              name: 'platform',
              title: 'Plateforme',
              type: 'string',
              options: { list: SOCIAL_PLATFORM_OPTIONS, layout: 'dropdown' },
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL du profil',
              type: 'url',
              validation: (R) => R.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { platform: 'platform', url: 'url' },
            prepare: ({ platform, url }) => ({
              title: SOCIAL_PLATFORMS[platform as SocialPlatform]?.label || platform || '(sans plateforme)',
              subtitle: url || '(sans URL)',
            }),
          },
        }),
      ],
      // Optionnel (pas de min): une plateforme ne peut figurer qu'une seule fois.
      validation: (R) =>
        R.custom((items: Array<{ platform?: string }> | undefined) => {
          if (!items) return true
          const seen = new Set<string>()
          for (const item of items) {
            const platform = item?.platform
            if (!platform) continue
            if (seen.has(platform)) return 'Chaque plateforme ne peut figurer qu\'une seule fois.'
            seen.add(platform)
          }
          return true
        }),
    }),

    defineField({
      name: 'footer',
      title: 'Pied de page',
      type: 'object',
      group: 'footer',
      fields: [
        // Le Footer ne lit PLUS nav.multipage.primary: liens propres au pied de page.
        defineField({
          name: 'primary',
          title: 'Liens primaires',
          description: 'Liens principaux du pied de page.',
          type: 'array',
          of: [defineArrayMember({ type: 'link' })],
          validation: (R) => R.required().min(1),
        }),
        // Optionnels: vides ou absents, normalisés en [] à la résolution.
        defineField({
          name: 'utility',
          title: 'Liens utilitaires, ex. FAQ',
          type: 'array',
          of: [defineArrayMember({ type: 'link' })],
        }),
        defineField({
          name: 'pageLinks',
          title: 'Liens légaux',
          type: 'array',
          of: [defineArrayMember({ type: 'link' })],
        }),
        defineField({
          name: 'copyright',
          title: 'Mention de copyright',
          description: 'Le jeton {year} est remplacé par l\'année courante au build.',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'credit',
          title: 'Crédit studio',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'studio',
              title: 'Studio',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'product',
              title: 'Produit',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'studioUrl',
              title: 'URL du studio',
              type: 'url',
              validation: (R) => R.required(),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'titleSuffix',
          title: 'Suffixe des titres',
          description:
            'Ajouté à la fin du titre de chaque page, sauf l\'accueil et le one-pager qui portent leur titre complet.',
          type: 'string',
        }),
        defineField({
          name: 'defaultDescription',
          title: 'Description par défaut',
          description: 'Repli quand la page n\'a pas de description.',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'defaultOgImage',
          title: 'Image de partage par défaut',
          description: 'Repli og:image global. Dimensions recommandées: 1200 x 630 px.',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: { name: 'brand.name', language: 'language' },
    prepare: ({ name, language }) => ({
      title: 'Globales' + (language ? ' (' + language.toUpperCase() + ')' : ''),
      subtitle: name || 'Configuration du site',
    }),
  },
})
