# webforge-ancree

Famille de design **Ancrée** du système WebForge de Patoine Studio. La démo fictive **Rempart Extermination** présente la famille dans ses modes multipage, one-pager et vitrine de composants.

Le site est une application Nuxt 4 bilingue générée en statique pour la production et le staging. La branche `preview` produit un Worker SSR réservé au Studio Sanity et à l’édition visuelle. Le gabarit demeure volontairement non indexable.

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

Les conventions détaillées, les identifiants d’environnement et les contrats à préserver vivent dans [CLAUDE.md](./CLAUDE.md). Les travaux encore ouverts vivent dans [ROADMAP.md](./ROADMAP.md).
