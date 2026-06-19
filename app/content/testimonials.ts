/* Contrat de contenu du bloc temoignages (mur asymetrique). Miroir de ce que la
 * transformation Sanity produira; AUCUNE valeur design ici, que des champs. La
 * ville de chaque client renforce l'ancrage local (DESIGN.md). Aucun champ de
 * numerotation: jamais de numero affiche, site-wide.
 *
 * Le fixture porte le CONTENU de demo Rempart Extermination (fr et en), en
 * attendant l'architecture Sanity qui le remplacera sans toucher au composant. */

export interface TestimonialItem {
  quote: string
  name: string
  city: string
}

export interface TestimonialsContent {
  eyebrow: string
  heading: string
  items: TestimonialItem[]
}

export function testimonialsFixture(isEn: boolean): TestimonialsContent {
  return isEn
    ? {
        eyebrow: 'What clients say',
        heading: 'The North Shore already trusts us',
        items: [
          {
            quote:
              'Carpenter ants had been coming back every spring for years. The Rempart technician found the nest behind the deck on the first visit, treated it, and we have not seen a single one since.',
            name: 'Geneviève Hébert',
            city: 'Laval'
          },
          {
            quote:
              'They came the same afternoon for a wasp nest right above the front door. Calm, careful, and very reassuring with the kids around.',
            name: 'Martin Bouchard',
            city: 'Terrebonne'
          },
          {
            quote:
              'Discreet, on time, and they explained every step of the bed bug treatment. No judgment, just a clear plan. We finally sleep easy.',
            name: 'Sophie Lemieux',
            city: 'Repentigny'
          },
          {
            quote:
              'We run a small café and needed a preventive program that meets the standards. Rempart set it up, documented everything, and our inspections have been spotless.',
            name: 'Karim Benali',
            city: 'Blainville'
          },
          {
            quote:
              'Mice in the garage every fall. They sealed the entry points instead of just laying traps. That is the difference. A real local crew that knows our houses.',
            name: 'Julie Tremblay',
            city: 'Mascouche'
          },
          {
            quote:
              'Honest pricing, no upselling, and a follow-up call a week later to make sure it worked. You can tell they are from around here.',
            name: 'Éric Lavoie',
            city: 'Boisbriand'
          }
        ]
      }
    : {
        eyebrow: 'Ce qu’on dit de nous',
        heading: 'La Rive-Nord nous fait déjà confiance',
        items: [
          {
            quote:
              'Les fourmis charpentières revenaient chaque printemps depuis des années. Le technicien de Rempart a trouvé le nid derrière le patio dès la première visite, l’a traité, et on n’en a pas revu une seule depuis.',
            name: 'Geneviève Hébert',
            city: 'Laval'
          },
          {
            quote:
              'Ils sont venus le jour même pour un nid de guêpes juste au-dessus de la porte d’entrée. Calmes, méticuleux, et très rassurants avec les enfants autour.',
            name: 'Martin Bouchard',
            city: 'Terrebonne'
          },
          {
            quote:
              'Discrets, à l’heure, et chaque étape du traitement de punaises nous a été expliquée. Aucun jugement, juste un plan clair. On dort enfin tranquilles.',
            name: 'Sophie Lemieux',
            city: 'Repentigny'
          },
          {
            quote:
              'On tient un petit café et il nous fallait un programme préventif conforme aux normes. Rempart l’a monté, tout documenté, et nos inspections sont impeccables.',
            name: 'Karim Benali',
            city: 'Blainville'
          },
          {
            quote:
              'Des souris dans le garage chaque automne. Ils ont scellé les points d’entrée au lieu de juste poser des trappes. C’est ça, la différence. Une vraie équipe locale qui connaît nos maisons.',
            name: 'Julie Tremblay',
            city: 'Mascouche'
          },
          {
            quote:
              'Prix honnête, aucune vente sous pression, et un appel de suivi une semaine plus tard pour confirmer que ça avait marché. On sent qu’ils sont d’ici.',
            name: 'Éric Lavoie',
            city: 'Boisbriand'
          }
        ]
      }
}
