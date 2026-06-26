import { portableLinkAnnotation } from '../portable-link'

/**
 * Configuration Portable Text des articles (patron simpleBlock de la reference,
 * etendu aux titres et aux listes). L'annotation `link` est PARTAGÉE avec le bloc
 * éditorial (objets/portable-link): lien interne (référence), URL externe ou ancre,
 * résolu au transform (resolveLink, localisé par langue) et rendu par PortableText.vue.
 *
 * Ce n'est PAS un type enregistre: la valeur est reutilisee dans les of: [...] des
 * blocs riches et reste absente du registre index.ts (comme editorialPortableText).
 */
export const articlePortableText = {
  type: 'block' as const,
  styles: [
    { title: 'Paragraphe', value: 'normal' },
    { title: 'Titre de section', value: 'h2' },
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
