// Fragment GROQ: siteSettings (le chrome global d'Ancree: marque, coordonnees,
// navigation, reseaux, pied de page, SEO). A partager entre la query de prod et
// la query scopee preview (siteSettings est consomme par Header/Footer sur 100%
// des routes, donc toujours FULL). Import RELATIF (fermeture nuxt.config).
//
// Forme FULL du lot B (studio/schemas/documents/site-settings.ts). Les
// coordonnees suivent la forme Schema.org native d'Ancree
// (phoneDisplay/phoneHref/emailDisplay/emailHref + address structuree), PAS la
// forme contact.phone/email de Minimaliste: ces sous-champs sont seedes et lus
// par usePageSeo et le noeud LocalBusiness. Le contactBlock joint ces
// coordonnees a la resolution (NAP structuree), le bloc lui-meme ne les porte pas.

import { LINK_PROJECTION } from './link'

export const SITE_SETTINGS_PROJECTION = /* groq */ `{
  brand{
    name,
    "logo": { "src": logo.asset->url },
    tagline,
    foundedYear,
    homeAriaLabel
  },
  contact{
    phoneDisplay,
    phoneHref,
    emailDisplay,
    emailHref,
    areaName,
    hours,
    address{
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry
    }
  },
  nav{
    landing{ "primary": primary[] ${LINK_PROJECTION}, "cta": cta ${LINK_PROJECTION} },
    multipage{ "primary": primary[] ${LINK_PROJECTION}, "cta": cta ${LINK_PROJECTION} }
  },
  footer{
    "primary": primary[] ${LINK_PROJECTION},
    "utility": utility[] ${LINK_PROJECTION},
    "pageLinks": pageLinks[] ${LINK_PROJECTION},
    copyright,
    credit{ label, studio, studioUrl, product }
  },
  socials[]{ platform, url },
  seo{
    titleSuffix,
    defaultDescription,
    "defaultOgImage": defaultOgImage.asset->url
  }
}`
