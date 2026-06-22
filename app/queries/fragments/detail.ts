// Fragment GROQ: copie de la page de detail d'un service (champ `service.detail`).
// Sous-arbre LOURD, projete seulement pour l'item de detail courant en preview
// (et pour tous au build statique). Imports RELATIFS (fermeture nuxt.config).
//
// Pas de PROJECT_DETAIL: les projets sont abandonnes dans Ancree. La section
// villes reliees (serviceCities) remplace la section projets de Minimaliste; ses
// items viennent des services par ville relies (champ service.related).

import { LINK_PROJECTION } from './link'
import { CTA_BAND_PROJECTION, PROCESS_PROJECTION } from './cta'

/**
 * Copie de la page de detail d'un service (champ `service.detail`): chaque
 * document de la collection porte sa propre copie, composee section par section.
 *   - benefits: titre + bouton (objet link);
 *   - included: titre seul;
 *   - process: bloc processus modelise en place (PROCESS_PROJECTION);
 *   - serviceCities: section villes reliees (eyebrow/heading/lead + bouton);
 *   - testimonials: eyebrow/heading;
 *   - cta: bandeau d'appel de fin (CTA_BAND_PROJECTION).
 */
export const SERVICE_DETAIL_PROJECTION = /* groq */ `{
  benefits{ heading, "cta": cta ${LINK_PROJECTION} },
  included{ heading },
  "process": process ${PROCESS_PROJECTION},
  serviceCities{ eyebrow, heading, lead, "cta": cta ${LINK_PROJECTION} },
  testimonials{ eyebrow, heading },
  "cta": cta ${CTA_BAND_PROJECTION}
}`
