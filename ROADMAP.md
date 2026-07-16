# ROADMAP, webforge-ancree

La famille Ancrée, le pipeline Sanity, les trois modes de rendu et les trois environnements Cloudflare sont en place. La démo Rempart Extermination demeure un gabarit fictif non indexable.

## Chantiers actifs

- **Formulaire de contact réel**: activer Turnstile, Resend et la route serveur pour un premier site client. La démo conserve son succès simulé.
- **Direction photo**: remplacer les images distantes faibles selon [docs/IMAGES-BRIEF.md](./docs/IMAGES-BRIEF.md), sans conserver de copie du dataset dans le dépôt.
- **Finition des blocs**: retravailler les variantes une à une sans modifier leurs contrats Sanity ni la séparation `family/` et `brand/`.
- **Validation de la barre d’appel mobile**: corriger son interaction sur iPhone avant de réactiver `CallBar` dans les layouts.
- **Secret Sanity du preview**: poser le token comme secret runtime du Worker, puis retirer sa valeur du bundle serveur Nitro. Le public est déjà vierge, mais le module Sanity sérialise actuellement le secret de build dans la sortie serveur privée.

## Exploitation

- Conserver `main`, `staging` et `preview` selon le mécanisme documenté dans [docs/DEPLOY-CLOUDFLARE.md](./docs/DEPLOY-CLOUDFLARE.md).
- Poser `NUXT_SANITY_TOKEN` comme secret de build sur chaque environnement.
- Garder `site.indexable: false` et l’en-tête `X-Robots-Tag` tant qu’aucun vrai site client n’est prêt.
- Évaluer Cloudflare Access pour restreindre staging et preview si les brouillons doivent cesser d’être publics par URL.

## Disciplines

Aucune valeur design en dur hors des tokens, aucun texte d’interface hors i18n et aucun contenu de site hors Sanity. Toute mutation de contenu se fait dans le live, sans seed ni miroir du dataset dans le dépôt.
