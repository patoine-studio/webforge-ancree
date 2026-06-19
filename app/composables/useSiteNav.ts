/* Source unique de la navigation, partagee par l'en-tete, le menu mobile et le
 * pied de page. Ancres vers les sections de la page d'accueil (one-pager); en
 * multipage ce seront des routes. labelKey est resolu en i18n par le composant. */
export interface NavLink {
  labelKey: string
  href: string
}

export function useSiteNav(): NavLink[] {
  return [
    { labelKey: 'nav.services', href: '#services' },
    { labelKey: 'nav.areas', href: '#cities' },
    { labelKey: 'nav.about', href: '#about' },
    { labelKey: 'nav.reviews', href: '#testimonials' },
    { labelKey: 'nav.faq', href: '#faq' },
    { labelKey: 'nav.contact', href: '#contact' }
  ]
}
