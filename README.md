# webforge-ancree

Famille de design **Ancrée** du système WebForge de Patoine Studio. La démo fictive **Rempart Extermination** présente la famille dans ses modes multipage, one-pager et vitrine de composants.

Le site est une application Nuxt 4 bilingue générée en statique pour la production et le staging. La branche `preview` produit un Worker SSR réservé au Studio Sanity et à l’édition visuelle. Le gabarit demeure volontairement non indexable.

## État opérationnel

État vérifié le 12 août 2026.

| Environnement | Worker | Branche | Domaine | État |
| --- | --- | --- | --- | --- |
| Production | `webforge-ancree` | `main` | `webforge-ancree.patoinestudio.ca` | En ligne, statique, public et `noindex` |
| Staging | `webforge-ancree-staging` | `staging` | `webforge-ancree-staging.patoinestudio.ca` | En ligne, statique, protégé par Cloudflare Access |
| Preview | `webforge-ancree-preview` | `preview` | `webforge-ancree-preview.patoinestudio.ca` | En ligne, SSR, protégé par Cloudflare Access |

Cloudflare Workers Builds relie chaque Worker à sa branche. Le workflow GitHub
`Sync preview from main` garde `preview` identique à `main`; il ne déploie pas
lui-même. La dernière synchronisation observée était réussie le 7 août 2026.

## Services et comptes vérifiés

| Service | Compte ou projet | Rôle |
| --- | --- | --- |
| Cloudflare | Patoine Studio, compte `27f4f9d60c66b323730888a958b513a6`, connexion `charles@patoinestudio.ca` | Workers, domaines et Access |
| Sanity | Organisation Patoine Studio `o7R0d3u6V`, projet `5if00rwn`, dataset `production` | Contenu bilingue, Studio et preview |
| GitHub Actions | Dépôt `patoine-studio/webforge-ancree` | Miroir de `main` vers `preview` seulement |

Le Studio est `webforge-ancree.sanity.studio`. Aucun service Google ni outil de
mesure n’est actif. Le code Resend et Turnstile est un patron inactif de futur
site client; la démo ne soumet aucun vrai formulaire.

## Variables et secrets, sans valeurs

| Noms | Nature et usage |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_SITE_MODE` | Variables publiques propres à chaque Worker |
| `NUXT_SANITY_TOKEN` | Secret de build requis sur production, staging et preview |
| `NUXT_PUBLIC_STUDIO_URL` | URL publique du Studio, preview seulement |
| `WORKERS_CI_BRANCH` | Variable injectée par Workers Builds pour activer le bon mode |
| `SANITY_API_READ_TOKEN` | Ancien alias accepté en repli pour le token de lecture |
| `NUXT_PUBLIC_SANITY_PROJECT_ID`, `NUXT_PUBLIC_SANITY_DATASET`, `NUXT_PUBLIC_SANITY_API_VERSION` | Overrides publics optionnels des constantes Sanity |
| `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_STUDIO_PREVIEW_URL` | Overrides du Studio et de sa cible de preview |
| `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Patron de formulaire réel, inactif dans la démo |

Wrangler ne rapporte actuellement aucun secret runtime sur ces trois Workers.
`NUXT_SANITY_TOKEN` vit dans les variables privées de Workers Builds. La dette
connue du bundle serveur preview est documentée dans
`docs/DEPLOY-CLOUDFLARE.md`; aucune valeur privée ne doit entrer dans Git.

## Démarrer

```bash
nvm use
yarn install
yarn dev
```

Le contenu vient du dataset Sanity live. Un token de lecture est requis pour générer des alternates hreflang complets sur les documents à slug traduit.

```bash
NUXT_SANITY_TOKEN=<token> yarn generate
```

Le Studio Sanity est le seul workspace Yarn du dépôt.

```bash
yarn studio:dev
yarn studio:build
```

## Structure

```text
webforge-ancree/
├── app/                    application Nuxt, famille, marque et pipeline Sanity
├── i18n/                   traductions d’interface françaises et anglaises
├── public/                 favicons, image sociale, en-têtes et llms.txt
├── server/                 routes réservées au contact réel et au preview SSR
├── studio/                 Studio Sanity, schémas et aperçus de blocs
├── docs/                   runbook Cloudflare et documents de direction actifs
├── nuxt.config.ts          modules, SEO, prérendu et gating preview
├── wrangler.jsonc          Workers statiques de production et staging
└── wrangler.preview.jsonc  Worker SSR de preview
```

Les conventions détaillées et l’état canonique pour Codex vivent dans
[AGENTS.md](./AGENTS.md). `CLAUDE.md` reste un pont de compatibilité. Les
identifiants d’environnement vivent dans
[docs/DEPLOY-CLOUDFLARE.md](./docs/DEPLOY-CLOUDFLARE.md), et les travaux encore
ouverts dans [ROADMAP.md](./ROADMAP.md).
