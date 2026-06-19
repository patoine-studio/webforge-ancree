/* Contrat de contenu du bandeau d'appel (cta-band): un moment fort, pleine
 * largeur en bleu nuit, qui pousse au geste de conversion (appel telephonique).
 * Miroir de ce que la transformation Sanity produira; AUCUNE valeur design ici,
 * que des champs. La disposition, les couleurs et le mouvement vivent dans le
 * composant et les tokens. */

export interface CtaLink {
  label: string
  href: string
}

export interface CtaBandContent {
  title: string
  subtitle?: string
  primaryCta: CtaLink // le geste d'appel (href tel:)
  secondaryCta?: CtaLink // alternative douce (route interne, ex estimation)
}

/* Fixture bilingue de la demo Rempart Extermination. Affirmatif, chaud, direct,
 * adresse au client (on, vous). primaryCta pointe vers un tel:, secondaryCta vers
 * une route interne d'estimation. */
export function ctaBandFixture(isEn: boolean): CtaBandContent {
  if (isEn) {
    return {
      title: 'A pest to deal with? We can be at your place today.',
      subtitle:
        'One call and a licensed technician is on the way. No long wait, no surprise on the bill, a guarantee in writing.',
      primaryCta: { label: 'Call now', href: 'tel:+14505550199' },
      secondaryCta: { label: 'Get an estimate', href: '#contact' }
    }
  }
  return {
    title: 'Un nuisible à régler? On peut être chez vous aujourd’hui.',
    subtitle:
      'Un appel et un technicien licencié part vers vous. Pas de longue attente, pas de surprise sur la facture, une garantie écrite.',
    primaryCta: { label: 'Appeler maintenant', href: 'tel:+14505550199' },
    secondaryCta: { label: 'Obtenir une estimation', href: '#contact' }
  }
}
