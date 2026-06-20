# webforge-ancree

Repo de la **famille de design Ancrée** (2e famille WebForge) de [Patoine Studio](https://patoinestudio.ca). Construit en Nuxt 4 statique généré. **Un repo par famille de design** (polyrepo): ce repo est la famille Ancrée; les autres familles vivent dans leurs propres repos.

## État

La famille Ancrée est largement bâtie. Démo: **Rempart Extermination** (extermination résidentielle, Rive-Nord de Montréal, fictif), le site qui démontre la famille. Le site reste `site.indexable: false` (gabarit noindex tant qu'aucun vrai site n'est en ligne).

- **Modules**: i18n (fr racine, en sous `/en`), Sanity (`@nuxtjs/sanity`), image, fonts, icon, seo (`@nuxtjs/seo`), pinia. Config dans `nuxt.config.ts`.
- **Identité**: package `webforge-ancree`, project Sanity `5if00rwn` (« WebForge - Ancrée », org Patoine Studio `o7R0d3u6V`), dataset `production`, déploiement Cloudflare Workers (`wrangler.jsonc` / `wrangler.preview.jsonc`, domaines `*.patoinestudio.ca`).
- **Design**: peau propre à Ancrée, base **BLANCHE** (la palette crème de DESIGN.md est surclassée), Bitter slab, grille **16 colonnes**, ombres chaudes, asymétrie posée, mouvement « s'ancre au sol ». Tokens dans `app/family/tokens.css` (famille) et `app/brand/tokens.css` (marque). Vitrine sur `/showcase`.
- **Modes**: multipage à la racine `/`, one-pager sous `/one-pager`, showcase sous `/showcase`. Routage = source unique `app/config/route-map.ts` (bilingue, customRoutes i18n, breadcrumbs).
- **Contenu (Sanity)**: dataset seedé (**62 docs** publiés fr+en: siteSettings, homePage, service, serviceCity, testimonial, faqItem, category, article). Schémas **pleins** dans `studio/schemas/index.ts`. Pipeline GROQ + transform pur + repli fixtures (le site rend toujours). i18n document-level (champ `language`), slug partagé fr/en. Re-seed: `studio/seed-content.json` (miroir du live; le live fait foi).
- **Blog**: complet (liste, archives de catégorie, articles, Portable Text riche, pagination numérotée dormante sous le seuil). `serviceCity` (`/extermination/[slug]`) = moteur SEO local (remplace les projets, abandonnés).
- **SEO**: `usePageSeo` (graphe Schema.org site-wide), JSON-LD, sitemap dynamique avec alternates hreflang. Marque depuis Sanity.

**Reste à bâtir** (voir [ROADMAP.md](./ROADMAP.md) et [DESIGN.md](./DESIGN.md)): pipeline de payload unique + mode preview Sanity, formulaire de contact réel (Turnstile + Resend), SEO avancé (LocalBusiness adresse complète, og-image) et déploiement Cloudflare.

## Vocabulaire WebForge

- **Système** = WebForge (système de produits PS pour PME).
- **Famille de design** = axe esthétique (Minimaliste, Ancrée, etc.). Une famille = preset de tokens + variantes typographiques + bibliothèque de variantes de blocs. **Une famille = un repo.**
- **Mode** = palier d'usage (One-Pager, Multipage, Builder avec CMS Sanity).
- **Démo** = site fictif qui démontre une famille (la démo d'Ancrée est Rempart Extermination).
- **Client** = site réel (repo séparé, consommera les packages WebForge plus tard).

## Les trois disciplines de code (intactes)

1. **Aucune valeur design en dur.** Tout par tokens CSS ou props. Les valeurs hardcodées vivent uniquement dans les fichiers de tokens (`app/family/tokens.css`, `app/brand/tokens.css`). Jamais de `color: #xxx` dans un composant.
2. **Aucun texte d'interface en dur** (Nuxt i18n): a11y universelle + chrome produit générique.
3. **Aucun contenu en dur**: le contenu vit dans Sanity (queries au build, transformation pure, lecture synchrone par les composables), avec repli sur des fixtures pour que le site rende toujours.

## Conventions

- **Commits**: format conventionnel (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), petits et atomiques, scope optionnel.
- **Layout**: CSS Grid par défaut; flex pour les petits éléments inline.
- **Typographie des textes** (docs, commits, communication): aucun tiret cadratin, aucun middle dot comme séparateur, français québécois soutenu et direct, sans buzzwords.
- **Jamais de numérotation** d'éléments, site-wide.

## Cadence

Charles tranche les décisions structurantes. Une action à la fois en série, check-in après chaque tâche significative, franchise totale.
