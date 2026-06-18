// Seed EN: legal pages (bank) rebranded Rempart Extermination.
//
// English mirror of banques-legal-fr.mjs: same documents with -en ids, same
// _key values, same structure, same order. Takes the generic legal structure
// from the Minimaliste family (legalPage terms + privacy policy, legalSection /
// legalParagraph / legalList / legalTodo), replacing the brand with Rempart
// Extermination, the sector with pest management and extermination services,
// and the contact details with those of the company sheet (Lévis, QC). The
// legalTodo entries (placeholders to be validated by the client) and the Law 25
// posture are kept. No real legal value (template). Legal page dates (effective,
// updated) are OMITTED: the seed invents no date, the empty field carries the
// "to be filled in by the client" semantics (spec, section 6.16).

export const docs = [
  // ── Legal pages (2 documents) ──────────────────────────────────────────────
  // effective and updated deliberately omitted (spec 6.16: the seed invents
  // no date; the V1 tokens are instructions, not dates).
  {
    _id: 'legalPage-conditions-en',
    _type: 'legalPage',
    language: 'en',
    title: 'Terms of Use',
    sections: [
      {
        _type: 'legalSection',
        _key: 'sec-champ-application',
        title: 'Scope',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "These terms govern the use of the rempartextermination.ca website and any exchange initiated through the contact form. By browsing the site, you accept these terms. The version in force is the one displayed on this page, dated at the top of the document."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-utilisation',
        title: 'Use of the site',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "The site is made available to you for information purposes, to present our pest management services and allow an initial point of contact. By using it, you agree to:"
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'use it lawfully and respectfully;',
              'refrain from harming its security or its operation;',
              'refrain from reproducing, distributing or modifying its content without authorization;',
              'provide accurate information when using the contact form.'
            ]
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-propriete',
        title: 'Intellectual property',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "The texts, photographs, designs, trademarks, graphic elements and source code appearing on the site are our property or are used with permission. Any reproduction, distribution or use, in whole or in part, without prior written authorization is prohibited."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-formulaire',
        title: 'Contact form',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "The contact form lets you send us a request for information or a request for service. Submitting it does not constitute a contract or a confirmation of service. Any agreement relating to a pest management service is the subject of a separate communication between the parties."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-exactitude',
        title: 'Accuracy of information',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "We strive to keep the information on the site accurate and up to date, without guaranteeing that it is free of errors or omissions. It is provided for guidance only and may be changed without notice."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-liens-externes',
        title: 'Links to external sites',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "The site may contain links to third-party sites, such as social media platforms or a review platform, provided for your convenience. These sites are not under our control. We are not responsible for their content, their practices or their privacy policies, and the presence of a link does not constitute an endorsement on our part. We encourage you to review the terms of each site you visit."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-responsabilite',
        title: 'Limitation of liability',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "To the extent permitted by law, we cannot be held liable for:"
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'any direct or indirect damage related to the use of the site or the inability to use it;',
              'an interruption, suspension or discontinuation of the site;',
              'the content or practices of third-party sites accessible through links;',
              'any loss of data related to the use of the site.'
            ]
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "We take reasonable measures to ensure the reliability and security of the site, without being able to guarantee that it is free of any technical defect."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-disponibilite',
        title: 'Site availability',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "We strive to keep the site accessible at all times, without guaranteeing uninterrupted operation. It may be temporarily unavailable due to maintenance, an update or a technical issue."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-droit',
        title: 'Governing law',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "These terms are governed by the laws in force in Quebec."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "If any provision of these terms is found to be invalid or unenforceable, the remaining provisions remain in full force and effect."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-traduction',
        title: 'Translation',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "In the event of a discrepancy in interpretation between the French version of these terms and a translation, the French version prevails."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-modifications',
        title: 'Changes to these terms',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "These terms may be amended from time to time. Any amendment takes effect upon publication on this page, with an update to the date shown at the top of the document. By continuing to use the site, you accept the terms as revised."
          }
        ]
      }
    ]
  },
  {
    _id: 'legalPage-confidentialite-en',
    _type: 'legalPage',
    language: 'en',
    title: 'Privacy Policy',
    sections: [
      {
        _type: 'legalSection',
        _key: 'sec-consentement',
        title: 'Your consent',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "When we collect, use or disclose your personal information, we always do so for specific purposes. Your consent is obtained before or at the time of collection, except in the cases provided for by law, and is valid only for the time needed to fulfill those purposes."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "This consent is explicit: you give it by voluntarily providing your information so that we can follow up on your request, whether through the contact form, by phone or by contacting us directly. If we wish to use your information for another purpose, we will ask for your consent, unless the law allows otherwise."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-renseignements',
        title: 'The information we collect',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: 'When you fill out the contact form, you voluntarily provide us with:'
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'your name;',
              'your email address;',
              'your phone number (optional);',
              'the address where you would like an intervention (optional);',
              'the content of your message.'
            ]
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "As you browse the site, technical data is also collected automatically by our hosting provider: pages viewed, length of visit, device and browser type, referring site, truncated IP address and approximate location. If an analytics tool were enabled on the site, it would collect the same type of data."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-utilisation',
        title: 'How your information is used',
        body: [
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "To be completed: describe the purposes for which you use the information received through the form (for example, responding to a request, preparing a quote, scheduling an intervention or following up on a treatment)."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Analytics data, if such a tool were enabled, would be used solely to understand how the site is visited and to improve it. Your information is used only for the purposes for which it was collected, except with your consent or where the law allows."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-temoins',
        title: 'Cookies',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "The site uses cookies necessary for its operation. Analytics cookies may be added at some point: if so, they would only be set with your consent. On your first visit, a consent banner lets you accept or decline non-essential cookies, and you can change your choice at any time. Until you have accepted, no analytics cookie is set."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-tiers-hebergement',
        title: 'Disclosure to third parties and hosting',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "To operate the site, some information may be processed on our behalf by service providers, grouped into the following categories:"
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'technology services (site hosting, content delivery, storage and backup);',
              'email delivery and spam protection services;',
              'analytics services, where applicable.'
            ]
          },
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "To be completed if applicable: add any other service you use that handles your clients' information (newsletter, quoting software, appointment booking, technician dispatch software)."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-2',
            text: "These providers receive only the information needed to carry out their mandate. Some of your data may be processed or stored on servers located outside Quebec, where privacy laws may differ from ours. We take reasonable measures to ensure it remains protected there."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-conservation',
        title: 'Retention and destruction',
        body: [
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "To be completed: specify how long you keep the information (for example, deleting inquiries that go nowhere after twelve months, keeping intervention files for seven years to meet your tax obligations and for warranty follow-up)."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "Once these periods expire, the information is securely destroyed or anonymized."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-acces-securite',
        title: 'Access and security',
        body: [
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: 'To be completed: state who, within your organization, has access to the information collected (for example, "the owner and the technicians assigned to your file").'
          },
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "The site is served over encrypted HTTPS, and form submissions are forwarded by email without being stored in a publicly exposed database. Since no method of transmission over the Internet is foolproof, we cannot guarantee absolute security, but we apply recognized measures. In the event of a confidentiality incident presenting a risk of serious harm, we will take the measures required by law."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-droits',
        title: 'Your rights',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: 'In accordance with Law 25, you may at any time:'
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'access the information we hold about you;',
              'obtain a copy of the information you have provided to us, in a commonly used digital format;',
              'request its correction or destruction;',
              'withdraw your consent;',
              'file a complaint about how it is handled.'
            ]
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-responsable',
        title: 'Person in charge of the protection of personal information',
        body: [
          {
            _type: 'legalTodo',
            _key: 'todo-1',
            text: "To be completed: the name of the person in charge of the protection of personal information (by default, the business owner). This person handles access requests and complaints, and approved this policy."
          },
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "The content of this policy has been approved by this person. To exercise your rights or file a complaint, contact them at the contact details provided below. We respond to your request within 30 days."
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-coordonnees',
        title: 'Contact us',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "For any question about this policy or your personal information, you can reach us:"
          },
          {
            _type: 'legalList',
            _key: 'list-1',
            items: [
              'Rempart Extermination;',
              '2750 avenue des Lilas, Lévis QC G6W 0M5;',
              'Phone: 418 555 0147;',
              'Email: bonjour@rempartextermination.ca.'
            ]
          }
        ]
      },
      {
        _type: 'legalSection',
        _key: 'sec-modifications',
        title: 'Changes to this policy',
        body: [
          {
            _type: 'legalParagraph',
            _key: 'p-1',
            text: "This policy may be amended from time to time. Any amendment takes effect upon publication on this page, with an update to the date shown at the top of the document."
          }
        ]
      }
    ]
  }
]
