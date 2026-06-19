/* Contrat de contenu du bloc FAQ. Miroir de ce que la transformation Sanity
 * produira; AUCUNE valeur design ici, que des champs. Les questions desamorcent
 * les objections frequentes a un service d'extermination (prix, delai, securite,
 * garantie, produits, preparation). Pas de champ de numerotation: jamais de
 * numero affiche, site-wide. */

export interface FaqQuestion {
  q: string
  a: string
}

export interface FaqContent {
  eyebrow: string
  heading: string
  items: FaqQuestion[]
}

// Contenu de demo bilingue (Rempart Extermination, fictif). Six objections
// classiques d'un service d'extermination sur la Rive-Nord, desamorcees avec
// chaleur et franchise.
export function faqFixture(isEn: boolean): FaqContent {
  if (isEn) {
    return {
      eyebrow: 'Good to know',
      heading: 'The questions we hear before every job',
      items: [
        {
          q: 'How much does it cost, and is the estimate really free?',
          a: 'Yes, the estimate is free and with no obligation. We come, we inspect, and you get a clear written price before anything starts. No surprise charges added after the fact, and the price you accept is the price you pay.'
        },
        {
          q: 'How fast can you come out?',
          a: 'For an active infestation we aim to be at your door within twenty-four hours, often the same day across the Rive-Nord and Laval. When you call, we tell you honestly when we can be there rather than making you wait by the phone.'
        },
        {
          q: 'Is the treatment safe for my kids and my pets?',
          a: 'It is. We favour targeted, low-toxicity products applied right where the problem is, never sprayed across your whole home. Your technician tells you exactly which rooms to stay out of and for how long, usually just a few hours until everything has dried.'
        },
        {
          q: 'Do you stand behind the work if the pests come back?',
          a: 'Always. Every residential treatment comes with a written guarantee. If the activity returns within the covered period, we come back and treat again at no extra cost. We are not done until the problem is.'
        },
        {
          q: 'What products do you actually use?',
          a: 'Only products approved by Health Canada, chosen for each situation rather than one generic spray for everything. We are happy to walk you through what we are applying and why, and we leave you the details in writing.'
        },
        {
          q: 'How should I prepare before you arrive?',
          a: 'Very little. We send you a short, plain checklist when we book, usually clearing a few cupboards or moving furniture away from a wall. If you are not sure about something, call us and we will sort it out together before the visit.'
        }
      ]
    }
  }

  return {
    eyebrow: 'Bon à savoir',
    heading: 'Les questions qu’on entend avant chaque intervention',
    items: [
      {
        q: 'Combien ça coûte, et l’estimation est-elle vraiment gratuite?',
        a: 'Oui, l’estimation est gratuite et sans engagement. On se déplace, on inspecte, et vous recevez un prix clair par écrit avant qu’on commence quoi que ce soit. Aucun frais surprise ajouté après coup: le prix que vous acceptez est celui que vous payez.'
      },
      {
        q: 'En combien de temps pouvez-vous intervenir?',
        a: 'Pour une infestation active, on vise une intervention dans les vingt-quatre heures, souvent la journée même sur la Rive-Nord et à Laval. Quand vous appelez, on vous dit franchement quand on peut être là plutôt que de vous laisser attendre.'
      },
      {
        q: 'Le traitement est-il sécuritaire pour mes enfants et mes animaux?',
        a: 'Il l’est. On privilégie des produits ciblés, à faible toxicité, appliqués là où se trouve le problème et jamais répandus dans toute la maison. Votre technicien vous indique précisément les pièces à éviter et pour combien de temps, en général quelques heures, le temps que tout sèche.'
      },
      {
        q: 'Offrez-vous une garantie si les bestioles reviennent?',
        a: 'Toujours. Chaque traitement résidentiel vient avec une garantie écrite. Si l’activité réapparaît pendant la période couverte, on revient traiter sans frais supplémentaires. Le travail n’est pas terminé tant que le problème ne l’est pas.'
      },
      {
        q: 'Quels produits utilisez-vous concrètement?',
        a: 'Uniquement des produits homologués par Santé Canada, choisis selon chaque situation plutôt qu’un seul produit générique pour tout. On vous explique avec plaisir ce qu’on applique et pourquoi, et on vous laisse les détails par écrit.'
      },
      {
        q: 'Comment dois-je préparer les lieux avant votre arrivée?',
        a: 'Très peu de choses. On vous envoie une courte liste simple au moment de la prise de rendez-vous, souvent vider quelques armoires ou écarter un meuble du mur. Si un point vous semble flou, appelez-nous et on règle ça ensemble avant la visite.'
      }
    ]
  }
}
