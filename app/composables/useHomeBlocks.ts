import type { PageBlock } from '~/types/blocks'
import { aboutFixture } from '~/content/about'
import { testimonialsFixture } from '~/content/testimonials'
import { faqFixture } from '~/content/faq'
import { ctaBandFixture } from '~/content/cta-band'
import { contactFixture } from '~/content/contact'
import { serviceCityPath, serviceDetailPath } from '~/config/route-map'

/* PROTOTYPE de contenu pour la validation des dispositions. Le CONTENU de demo
 * vit ici en attendant l'architecture Sanity (qui le remplacera sans toucher aux
 * composants ni aux contrats). L'interface (chrome) reste en i18n; ici c'est du
 * contenu fictif Rempart Extermination, fr et en, qui sera seede dans Sanity.
 * Icones et liens partages, textes localises. Aucune numerotation, jamais. */
export function useHomeBlocks(): PageBlock[] {
  const { locale } = useI18n()
  const isEn = locale.value === 'en'
  const p = isEn ? '/en' : ''

  const citySlugs = [
    { name: 'Laval', slug: 'laval', featured: true },
    { name: 'Terrebonne', slug: 'terrebonne' },
    { name: 'Repentigny', slug: 'repentigny' },
    { name: 'Blainville', slug: 'blainville' },
    { name: 'Mascouche', slug: 'mascouche' },
    { name: 'Boisbriand', slug: 'boisbriand' },
    { name: 'Saint-Eustache', slug: 'saint-eustache' }
  ]
  const cityNote = isEn ? 'Residential and commercial' : 'Résidentiel et commercial'

  const trust: PageBlock = {
    _type: 'trust-bar',
    _key: 'trust',
    items: isEn
      ? [
          { icon: 'lucide:clipboard-check', value: 'Free estimate', label: 'No obligation, by phone' },
          { icon: 'lucide:award', value: '15 years of experience', label: 'Rooted on the North Shore' },
          { icon: 'lucide:clock', value: 'Same-day service', label: 'Often within 24 hours' },
          { icon: 'lucide:leaf', value: 'Safe for your family', label: 'and your pets' }
        ]
      : [
          { icon: 'lucide:clipboard-check', value: 'Estimation gratuite', label: 'Sans engagement, par téléphone' },
          { icon: 'lucide:award', value: '15 ans d’expérience', label: 'Ancrés sur la Rive-Nord' },
          { icon: 'lucide:clock', value: 'Service le jour même', label: 'Souvent en moins de 24 h' },
          { icon: 'lucide:leaf', value: 'Sûr pour la famille', label: 'et les animaux de compagnie' }
        ]
  }

  const services: PageBlock = {
    _type: 'services',
    _key: 'services',
    eyebrow: isEn ? 'What we handle' : 'Ce qu’on règle',
    heading: isEn ? 'One pest, one clear solution' : 'Un nuisible, une solution claire',
    lead: isEn
      ? 'Residential and commercial, handled by certified technicians with products safe for family and pets.'
      : 'Résidentiel et commercial, traités par des techniciens certifiés avec des produits sûrs pour la famille et les animaux.',
    ctaLabel: isEn ? 'See all services' : 'Voir tous les services',
    ctaHref: `${p}/services`,
    items: isEn
      ? [
          { icon: 'lucide:bug', title: 'Ants and cockroaches', body: 'Targeted colony treatment, inside and around the foundation, with follow-up to keep them from coming back.', href: serviceDetailPath('fourmis-charpentieres', 'en'), featured: true },
          { icon: 'lucide:rat', title: 'Mice and rats', body: 'Inspection, entry-point sealing and complete rodent control.', href: serviceDetailPath('souris-rats', 'en') },
          { icon: 'lucide:bed', title: 'Bed bugs', body: 'Discreet, guaranteed thermal and residual treatment so you sleep easy.', href: serviceDetailPath('punaises-de-lit', 'en') },
          { icon: 'lucide:hexagon', title: 'Wasps and hornets', body: 'Safe nest removal, high or low, with no risk to the family.', href: serviceDetailPath('guepes-frelons', 'en') },
          { icon: 'lucide:building-2', title: 'Commercial pest control', body: 'Preventive programs for restaurants, shops and buildings, compliant with standards.', href: serviceDetailPath('commercial', 'en') }
        ]
      : [
          { icon: 'lucide:bug', title: 'Fourmis et coquerelles', body: 'Traitement ciblé des colonies, à l’intérieur comme autour de la fondation, avec un suivi pour empêcher le retour.', href: serviceDetailPath('fourmis-charpentieres', 'fr'), featured: true },
          { icon: 'lucide:rat', title: 'Souris et rats', body: 'Inspection, scellement des points d’entrée et contrôle complet des rongeurs.', href: serviceDetailPath('souris-rats', 'fr') },
          { icon: 'lucide:bed', title: 'Punaises de lit', body: 'Traitement thermique et résiduel, discret et garanti, pour dormir tranquille.', href: serviceDetailPath('punaises-de-lit', 'fr') },
          { icon: 'lucide:hexagon', title: 'Guêpes et frelons', body: 'Retrait sécuritaire des nids, en hauteur ou au sol, sans risque pour la famille.', href: serviceDetailPath('guepes-frelons', 'fr') },
          { icon: 'lucide:building-2', title: 'Extermination commerciale', body: 'Programmes préventifs pour restaurants, commerces et immeubles, conformes aux normes.', href: serviceDetailPath('commercial', 'fr') }
        ]

  }

  const cities: PageBlock = {
    _type: 'service-cities',
    _key: 'cities',
    eyebrow: isEn ? 'Close to home' : 'Près de chez vous',
    heading: isEn ? 'We cover the whole North Shore' : 'On dessert toute la Rive-Nord',
    lead: isEn
      ? 'A local crew, already in your area, that knows the region’s pests.'
      : 'Une équipe locale, déjà dans votre secteur, qui connaît les nuisibles de la région.',
    areaLabel: isEn ? 'Our service area' : 'Notre zone de service',
    areaName: isEn ? 'North Shore of Montreal and Laval' : 'Rive-Nord de Montréal et Laval',
    areaNote: isEn
      ? 'Fast response across the north suburbs, often the same day.'
      : 'Intervention rapide partout dans la couronne nord, souvent le jour même.',
    cities: citySlugs.map((c) => ({
      name: c.name,
      href: serviceCityPath(c.slug, locale.value as 'fr' | 'en'),
      note: cityNote,
      featured: c.featured
    }))
  }

  const about: PageBlock = { _type: 'about', _key: 'about', ...aboutFixture(isEn) }
  const testimonials: PageBlock = { _type: 'testimonials', _key: 'testimonials', ...testimonialsFixture(isEn) }
  const faq: PageBlock = { _type: 'faq', _key: 'faq', ...faqFixture(isEn) }
  const ctaBand: PageBlock = { _type: 'cta-band', _key: 'cta-band', ...ctaBandFixture(isEn) }
  const contact: PageBlock = { _type: 'contact', _key: 'contact', ...contactFixture(isEn) }

  return [trust, services, cities, about, testimonials, faq, ctaBand, contact]
}
