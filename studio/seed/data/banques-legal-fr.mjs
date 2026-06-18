// Seed FR: pages légales (banque) rebrandées Rempart Extermination.
//
// Reprend la structure légale générique de la famille Minimaliste (legalPage
// conditions + politique de confidentialité, legalSection / legalParagraph /
// legalList / legalTodo), en remplaçant la marque par Rempart Extermination, le
// secteur par les services de gestion parasitaire et d'extermination, et les
// coordonnées par celles de la fiche compagnie (Lévis, QC). Les legalTodo
// (placeholders à valider par le client) et la posture Loi 25 sont conservés.
// Aucune valeur juridique réelle (gabarit). Les dates des pages légales
// (effective, updated) sont OMISES: le seed n'invente aucune date, le champ
// vide porte la sémantique « à remplir par le client » (spec, section 6.16).

export const docs = [
  // ── Pages légales (2 documents) ────────────────────────────────────────────
  // effective et updated omis volontairement (spec 6.16: le seed n'invente
  // aucune date; les jetons V1 sont des consignes, pas des dates).
  {
    _id: 'legalPage-conditions-fr',
    _type: 'legalPage',
    language: 'fr',
    title: "Conditions d'utilisation",
    sections: [
      {
        _type: 'legalSection',
        _key: 'sec-champ-application',
        title: "Champ d'application",
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Les présentes conditions encadrent l'utilisation du site rempartextermination.ca et tout échange initié à partir du formulaire de contact. En naviguant sur le site, vous acceptez ces conditions. La version en vigueur est celle affichée sur la présente page, datée en haut du document."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-utilisation',
        title: 'Utilisation du site',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Le site est mis à votre disposition à titre informatif, pour présenter nos services de gestion parasitaire et permettre une première prise de contact. En l'utilisant, vous vous engagez à :"
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'en faire un usage légal et respectueux;',
              'ne pas nuire à sa sécurité ni à son fonctionnement;',
              'ne pas reproduire, distribuer ou modifier son contenu sans autorisation;',
              'fournir des renseignements exacts lorsque vous utilisez le formulaire de contact.'
            ]
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-propriete',
        title: 'Propriété intellectuelle',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Les textes, photographies, designs, marques, éléments graphiques et le code source figurant sur le site sont notre propriété ou sont utilisés avec autorisation. Toute reproduction, distribution ou utilisation, totale ou partielle, sans autorisation écrite préalable est interdite."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-formulaire',
        title: 'Formulaire de contact',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Le formulaire de contact permet de nous transmettre une demande de renseignements ou une demande d'intervention. Son envoi ne constitue ni un contrat ni une confirmation de prestation. Toute entente relative à un service de gestion parasitaire fait l'objet d'une communication distincte entre les parties."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-exactitude',
        title: "Exactitude de l'information",
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Nous nous efforçons de garder les informations du site à jour et exactes, sans toutefois garantir qu'elles sont exemptes d'erreurs ou d'omissions. Elles sont fournies à titre indicatif et peuvent être modifiées sans préavis."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-liens-externes',
        title: 'Liens vers des sites externes',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Le site peut contenir des liens vers des sites tiers, par exemple des réseaux sociaux ou une plateforme d'avis, fournis pour votre commodité. Ces sites ne sont pas sous notre contrôle. Nous ne sommes pas responsables de leur contenu, de leurs pratiques ni de leurs politiques de confidentialité, et la présence d'un lien ne constitue pas une approbation de notre part. Nous vous invitons à consulter les conditions propres à chaque site que vous visitez."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-responsabilite',
        title: 'Limitation de responsabilité',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Dans les limites permises par la loi, nous ne pouvons être tenus responsables :"
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              "de tout dommage direct ou indirect lié à l'utilisation du site ou à l'impossibilité de l'utiliser;",
              "d'une interruption, d'une suspension ou d'une cessation du site;",
              'du contenu ou des pratiques des sites tiers accessibles par des liens;',
              "d'une perte de données liée à l'utilisation du site."
            ]
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "Nous prenons des moyens raisonnables pour assurer la fiabilité et la sécurité du site, sans pouvoir garantir qu'il est exempt de tout défaut technique."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-disponibilite',
        title: 'Disponibilité du site',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Nous nous efforçons de garder le site accessible en tout temps, sans en garantir un fonctionnement ininterrompu. Il peut être temporairement indisponible en raison d'une maintenance, d'une mise à jour ou d'un problème technique."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-droit',
        title: 'Droit applicable',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Les présentes conditions sont régies par les lois en vigueur au Québec."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "Si une disposition des présentes conditions est jugée invalide ou inapplicable, les autres dispositions demeurent pleinement en vigueur."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-traduction',
        title: 'Traduction',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "En cas de divergence d'interprétation entre la version française des présentes conditions et une traduction, la version française prévaut."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-modifications',
        title: 'Modifications à ces conditions',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Ces conditions peuvent être modifiées de temps à autre. Toute modification entre en vigueur dès sa publication sur cette page, avec mise à jour de la date indiquée en haut du document. En continuant d'utiliser le site, vous acceptez les conditions ainsi révisées."
          }
        ]
      }
    ]
  },
  {
    _id: 'legalPage-confidentialite-fr',
    _type: 'legalPage',
    language: 'fr',
    title: 'Politique de confidentialité',
    sections: [
      {
        _type: 'legalSection',
        _key: 'sec-consentement',
        title: 'Votre consentement',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Lorsque nous recueillons, utilisons ou communiquons vos renseignements personnels, nous le faisons toujours dans des buts précis. Votre consentement est obtenu avant ou au moment de la collecte, sauf dans les cas prévus par la loi, et ne vaut que pour la durée nécessaire à ces buts."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "Ce consentement est explicite: vous le donnez en nous transmettant volontairement vos renseignements pour que nous puissions donner suite à votre demande, que ce soit par le formulaire de contact, par téléphone ou en communiquant directement avec nous. Si nous souhaitons utiliser vos renseignements à une autre fin, nous vous en demanderons le consentement, sauf si la loi l'autorise."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-renseignements',
        title: 'Les renseignements que nous recueillons',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: 'Lorsque vous remplissez le formulaire de contact, vous nous transmettez volontairement :'
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'votre nom;',
              'votre adresse courriel;',
              'votre numéro de téléphone (facultatif);',
              "l'adresse où vous souhaitez une intervention (facultatif);",
              'le contenu de votre message.'
            ]
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "En naviguant sur le site, des données techniques sont aussi recueillies automatiquement par notre hébergeur : pages consultées, durée de la visite, type d'appareil et de navigateur, site de provenance, adresse IP tronquée et localisation approximative. Si un outil de mesure d'audience était activé sur le site, il recueillerait le même type de données."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-utilisation',
        title: "L'utilisation de vos renseignements",
        body: [
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "À compléter : décrivez les fins pour lesquelles vous utilisez les renseignements reçus par le formulaire (par exemple répondre à une demande, préparer une soumission, planifier une intervention ou assurer le suivi d'un traitement)."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Les données de mesure d'audience, si un tel outil était activé, serviraient uniquement à comprendre la fréquentation du site et à l'améliorer. Vos renseignements ne sont utilisés qu'aux fins pour lesquelles ils ont été recueillis, sauf avec votre consentement ou si la loi l'autorise."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-temoins',
        title: 'Témoins de connexion',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Le site utilise des témoins nécessaires à son fonctionnement. Des témoins de mesure d'audience pourraient s'y ajouter : le cas échéant, ils ne seraient déposés qu'avec votre consentement. Lors de votre première visite, une bannière de consentement vous permet d'accepter ou de refuser les témoins non essentiels, et vous pouvez modifier votre choix en tout temps. Tant que vous n'avez pas accepté, aucun témoin de mesure n'est déposé."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-tiers-hebergement',
        title: 'Communication à des tiers et hébergement',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Pour faire fonctionner le site, certains renseignements peuvent être traités pour notre compte par des fournisseurs de services, regroupés dans les catégories suivantes :"
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'services de technologie (hébergement du site, diffusion de contenu, stockage et sauvegarde);',
              "services d'acheminement de courriels et de protection contre les pourriels;",
              "services de mesure d'audience, le cas échéant."
            ]
          },
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "À compléter si applicable : ajoutez tout autre service que vous utilisez et qui touche des renseignements de vos clients (infolettre, logiciel de soumission, prise de rendez-vous, logiciel de répartition des techniciens)."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "Ces fournisseurs ne reçoivent que les renseignements nécessaires à l'exécution de leur mandat. Certaines de vos données peuvent être traitées ou conservées sur des serveurs situés à l'extérieur du Québec, où les lois sur la protection des renseignements personnels peuvent différer des nôtres. Nous prenons des moyens raisonnables pour qu'elles y demeurent protégées."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-conservation',
        title: 'Conservation et destruction',
        body: [
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "À compléter : précisez combien de temps vous conservez les renseignements (par exemple, suppression des demandes sans suite après douze mois, conservation des dossiers d'intervention sept ans pour vos obligations fiscales et le suivi de garantie)."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Au terme de ces délais, les renseignements sont détruits ou anonymisés de façon sécuritaire."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-acces-securite',
        title: 'Accès et sécurité',
        body: [
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "À compléter : indiquez qui, dans votre organisation, a accès aux renseignements recueillis (par exemple « le propriétaire et les techniciens affectés à votre dossier »)."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Le site est servi en HTTPS chiffré, et les soumissions du formulaire sont acheminées par courriel sans être stockées dans une base de données exposée publiquement. Aucune méthode de transmission sur Internet n'étant infaillible, nous ne pouvons garantir une sécurité absolue, mais nous appliquons des mesures reconnues. En cas d'incident de confidentialité présentant un risque de préjudice sérieux, nous prendrons les mesures requises par la loi."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-droits',
        title: 'Vos droits',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: 'Conformément à la Loi 25, vous pouvez en tout temps :'
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'accéder aux renseignements que nous détenons sur vous;',
              'obtenir une copie des renseignements que vous nous avez fournis, dans un format numérique couramment utilisé;',
              'en demander la rectification ou la destruction;',
              'retirer votre consentement;',
              'déposer une plainte concernant leur traitement.'
            ]
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-responsable',
        title: 'Responsable de la protection des renseignements',
        body: [
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "À compléter : le nom de la personne responsable de la protection des renseignements personnels (par défaut, le propriétaire de l'entreprise). C'est elle qui traite les demandes d'accès et les plaintes, et qui a approuvé la présente politique."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Le contenu de la présente politique a été approuvé par cette personne. Pour exercer vos droits ou déposer une plainte, communiquez avec elle aux coordonnées indiquées ci-dessous. Nous traitons votre demande dans un délai de 30 jours."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-coordonnees',
        title: 'Nous joindre',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Pour toute question relative à la présente politique ou à vos renseignements personnels, vous pouvez nous joindre :"
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'Rempart Extermination;',
              '2750 avenue des Lilas, Lévis QC G6W 0M5;',
              'Téléphone : 418 555 0147;',
              'Courriel : bonjour@rempartextermination.ca.'
            ]
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-modifications',
        title: 'Modifications à cette politique',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Cette politique peut être modifiée de temps à autre. Toute modification entre en vigueur dès sa publication sur cette page, avec mise à jour de la date indiquée en haut du document."
          }
        ]
      }
    ]
  }
]
