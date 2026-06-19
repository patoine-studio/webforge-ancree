import type { HeroHomeBlock } from '~/types/blocks'

/* PROTOTYPE de validation du heros. Le contenu (textes) vient de l'i18n
 * (discipline 2: aucun texte d'interface ni contenu en dur dans le composant);
 * seule la STRUCTURE du bloc vit ici, en attendant l'architecture Sanity. Apres
 * validation de la disposition, ce composable lira usePayload().heroes.home sans
 * changer son contrat (ComputedRef<HeroHomeBlock>), donc le heros ne bouge pas.
 * Le numero de telephone et l'image de demo seront aussi pilotes par Sanity. */
export function useHeroContent(): ComputedRef<HeroHomeBlock> {
  const { t } = useI18n()

  return computed<HeroHomeBlock>(() => ({
    _type: 'hero-home',
    _key: 'home-hero',
    kicker: t('hero.kicker'),
    title: t('hero.title'),
    lead: t('hero.lead'),
    primaryCta: { label: t('hero.cta_primary'), href: t('contact.phone_href') },
    secondaryCta: { label: t('hero.cta_secondary'), href: '#contact' },
    meta: [
      { icon: 'lucide:shield-check', value: t('hero.proof_1_value'), label: t('hero.proof_1_label') },
      { icon: 'lucide:star', value: t('hero.proof_2_value'), label: t('hero.proof_2_label') },
      { icon: 'lucide:badge-check', value: t('hero.proof_3_value'), label: t('hero.proof_3_label') }
    ],
    visual: {
      ratio: '16/9',
      src: '/images/hero-technicien.jpg',
      alt: t('hero.image_alt'),
      label: '',
      caption: ''
    },
    visualMobile: {
      ratio: '4/5',
      src: '/images/hero-technicien.jpg',
      alt: t('hero.image_alt'),
      label: '',
      caption: ''
    }
  }))
}
