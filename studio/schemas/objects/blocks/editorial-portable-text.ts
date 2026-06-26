import { portableLinkAnnotation } from '../portable-link'

/**
 * Configuration Portable Text du bloc éditorial. L'annotation `link` est PARTAGÉE
 * avec le corps d'article (objets/portable-link): lien interne (référence), URL
 * externe ou ancre, résolu au transform (resolveLink, localisé par langue) et rendu
 * par le sérialiseur partagé PortableText.vue.
 *
 * Ce n'est PAS un type enregistré: la valeur est réutilisée dans le `of: [...]` du
 * champ body des segments, et reste absente du registre index.ts (comme
 * articlePortableText).
 */
export const editorialPortableText = {
  type: 'block' as const,
  styles: [
    { title: 'Paragraphe', value: 'normal' },
    { title: 'Sous-titre', value: 'h3' },
  ],
  lists: [
    { title: 'Liste a puces', value: 'bullet' },
    { title: 'Liste numerotee', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Gras', value: 'strong' },
      { title: 'Italique', value: 'em' },
    ],
    annotations: [portableLinkAnnotation],
  },
}
