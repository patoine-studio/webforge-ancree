// useSocials: acces aux reseaux sociaux du site, reutilisable hors du Pied de page.
//
// Derive de l'identite du site (useContent('site')). Les reseaux sont resolus au
// transform (plateforme, url, icone, libelle via app/config/socials.ts) et poses sur
// `site.socials` du payload. Retourne un computed pour rester reactif en preview;
// liste vide si aucune plateforme.

import { computed, type ComputedRef } from 'vue'
import type { SocialLink } from '~/sanity/transform'

export function useSocials(): ComputedRef<SocialLink[]> {
  const site = useContent('site')
  return computed(() => site.value.socials)
}
