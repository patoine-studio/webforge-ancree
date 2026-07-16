# Déploiement Cloudflare de WebForge Ancrée

Runbook de la démo Rempart Extermination. Les trois environnements sont en ligne
et vérifiés depuis le 1er juillet 2026. Le site demeure non indexable tant qu'il
sert de gabarit.

## Identité

- Compte Cloudflare: `Patoine Studio` (`27f4f9d60c66b323730888a958b513a6`).
- Zone: `patoinestudio.ca`.
- Dépôt GitHub: `patoine-studio/webforge-ancree`.
- Projet Sanity: `5if00rwn`, organisation Patoine Studio, dataset `production`.
- Version Node: `.nvmrc` (`24.16.0`).
- Version Yarn: champ `packageManager` (`yarn@4.13.0`).

## Topologie

Cloudflare Workers Builds relie chaque Worker à une branche de production. La
seule action GitHub du dépôt synchronise `main` vers `preview`; elle ne déploie
rien.

| Environnement | Worker | Branche | Domaine | Sortie | Commande de build | Commande de déploiement |
|---|---|---|---|---|---|---|
| Production | `webforge-ancree` | `main` | `webforge-ancree.patoinestudio.ca` | statique | `corepack enable && yarn install --immutable && yarn generate` | `yarn dlx wrangler deploy` |
| Staging | `webforge-ancree-staging` | `staging` | `webforge-ancree-staging.patoinestudio.ca` | statique | `corepack enable && yarn install --immutable && yarn generate` | `yarn dlx wrangler deploy --config wrangler.jsonc --name webforge-ancree-staging` |
| Preview | `webforge-ancree-preview` | `preview` | `webforge-ancree-preview.patoinestudio.ca` | SSR | `corepack enable && yarn install --immutable && yarn build` | `yarn dlx wrangler deploy --config wrangler.preview.jsonc` |

Prod et staging partagent `wrangler.jsonc`. Le staging surcharge le nom au
déploiement. Le preview utilise `wrangler.preview.jsonc`, dont l'entrée serveur
est `.output/server/index.mjs` et les ressources statiques `.output/public`.
`workers.dev` et les URL de preview Cloudflare sont désactivés dans les deux
configurations.

Chaque Worker ne construit que sa branche de production. La racine de build est
la racine du dépôt et le chemin surveillé est `*`.

## Variables et secrets

| Variable | Production | Staging | Preview | Nature |
|---|---|---|---|---|
| `NUXT_PUBLIC_SITE_URL` | URL production | URL staging | URL preview | publique |
| `NUXT_SANITY_TOKEN` | requis | requis | requis | secret serveur |
| `NUXT_PUBLIC_STUDIO_URL` | absente | absente | URL du Studio | publique |

`NUXT_SANITY_TOKEN` permet de lire les documents `translation.metadata` et de
résoudre les alternates hreflang des pages dont le slug est traduit. Il reste
dans `runtimeConfig` privé et ne doit jamais utiliser l'option publique `token`
du module Sanity.

Le mode preview est activé seulement quand les trois conditions suivantes sont
réunies:

- `WORKERS_CI_BRANCH=preview`;
- un `NUXT_SANITY_TOKEN` valide;
- une valeur `NUXT_PUBLIC_STUDIO_URL`.

Dans ce mode, Nuxt produit le serveur Cloudflare, active l'édition visuelle,
charge React et applique `wf-no-motion` à la racine. Les builds statiques ne
doivent contenir ni React d'édition visuelle, ni Stega, ni route de preview.

## Vérification locale

Toujours sélectionner la version Node du dépôt avant un build.

```sh
source ~/.nvm/nvm.sh
nvm use
yarn install --immutable
```

Production ou staging:

```sh
WORKERS_CI_BRANCH=main \
NUXT_PUBLIC_SITE_URL=https://webforge-ancree.patoinestudio.ca \
yarn generate
```

Preview:

```sh
WORKERS_CI_BRANCH=preview \
NUXT_PUBLIC_SITE_URL=https://webforge-ancree-preview.patoinestudio.ca \
NUXT_PUBLIC_STUDIO_URL=https://webforge-ancree.sanity.studio \
yarn build
```

Après chaque build, vérifier:

- la présence des sorties attendues;
- les chemins bilingues et leurs alternates hreflang;
- les URL canoniques de l'environnement;
- la directive `noindex`;
- l'absence de la valeur du token dans tout `.output` statique;
- l'absence de la valeur du token dans `.output/public` du preview;
- l'absence de Stega et du client d'édition visuelle dans le statique;
- la présence de l'édition visuelle et de `wf-no-motion` dans le preview.

Le Studio est déployé séparément avec
`SANITY_STUDIO_PREVIEW_URL=https://webforge-ancree-preview.patoinestudio.ca`.
L'origine preview doit rester autorisée dans le CORS Sanity avec les identifiants.

## Exploitation

- Ne jamais committer un token ni un fichier `.env`.
- Maintenir `site.indexable: false` tant que le dépôt représente une démo.
- Confirmer avant toute création ou modification de Worker, domaine, secret,
  webhook ou configuration Git distante.
- Le preview et le staging peuvent être protégés par Cloudflare Access.
- Un hook de déploiement production peut être relié à un webhook Sanity filtré
  pour ignorer `drafts.**`.
- Si un premier build démarre avant la pose des variables, configurer les
  variables puis relancer le build avant d'attacher le domaine.
- Ne pas renommer `wrangler.jsonc` pour le staging; la surcharge `--name` est
  volontaire.

## Dette de sécurité connue du preview

Le module `@nuxtjs/sanity` exige actuellement une valeur `visualEditing.token` à
la compilation. La sortie publique du preview est vierge, mais la valeur du
secret de build se retrouve dans le bundle serveur privé Nitro. Cette situation
est antérieure au présent audit et ne respecte pas encore la règle stricte « zéro
secret dans tout `.output` ».

La correction sûre demande une opération Cloudflare coordonnée: poser
`NUXT_SANITY_TOKEN` comme secret runtime du Worker preview, faire résoudre ce
secret à l'exécution, puis remplacer la valeur de compilation par un marqueur
non sensible. Ne pas appliquer la seconde étape avant la première, sinon le
preview perd l'accès aux brouillons. Les variables de Workers Builds sont
réservées au build et ne deviennent pas automatiquement des variables runtime.
