# Banque de personnes (auteurs + équipe) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faire des quatre personnes de Rempart un document `person` unique par langue, référencé par `article.author` et par le bloc `team`, pour que l'identité (nom, rôle, bio, portrait) soit une source unique au lieu d'être saisie deux fois.

**Architecture:** Nouveau document `person` (jumeaux fr/en, doc-level i18n + translation.metadata). Le bloc `team` et le champ `article.author` passent de données en clair à des **références** filtrées par langue. Côté app, les projections GROQ déréférencent (`->`), le transform produit un auteur structuré (fail-fast), le byline compose « nom, rôle » et le JSON-LD émet un `schema.org/Person`. Le bloc `team` rend INCHANGÉ (la déréf produit exactement la forme actuelle).

**Tech Stack:** Nuxt 4 statique généré, Sanity (project 5if00rwn, dataset production), @sanity/document-internationalization, @nuxtjs/seo (schema.org), scripts de migration `@sanity/client` Node.

## Global Constraints

- Bilingue fr+en, i18n document-level; `translation.metadata` par paire, format v6 cloné du live (`internationalizedArrayReferenceValue`, `_weak: true`, `_strengthenOnPublish`).
- Typo québécoise soutenue, apostrophes droites, AUCUN tiret cadratin, AUCUNE numérotation d'éléments.
- Aucune valeur design en dur; aucun texte d'interface en dur (i18n); tout contenu dans Sanity. Posture FAIL-FAST: si une référence d'auteur ne résout pas, le build throw.
- NE PAS toucher `app/family/tokens.css` ni `app/components/hero/block/page.vue` (chantier de forme de Charles).
- Voie d'écriture: LIVE fait foi → script `studio/seed/migrate-*.mjs` (lit le token CLI `~/.config/sanity/config.json`, patch live, idempotent) → miroir `studio/seed-content.json` (placeholders `IMG:<clé>`; l'alt vit sur l'asset).
- Build: `NUXT_SANITY_TOKEN=$(node -p "require(require('os').homedir()+'/.config/sanity/config.json').authToken") npx nuxt generate` DOIT être VERT (0 erreur, 0 avertissement, 0 lien cassé). Le token ne doit JAMAIS apparaître dans `.output`.
- Changement de schéma → `sanity schema deploy` + `sanity deploy` (Studio hébergé). Charles autorise d'avance les deploys quand le schéma change.
- Champs `person`: nom, rôle, bio, portrait. PAS de credentials, PAS de slug, aucune route.
- Vérification réelle de ce repo = `sanity schema validate` + `sanity build` + `nuxt typecheck` + `nuxt generate` vert + requêtes GROQ + grep du HTML généré. PAS de suite de tests unitaires (aucune dans le repo); les « tests » sont ces portes de build.
- Commits conventionnels, petits, atomiques, sujets en français. Le push est la décision de Charles.

**Note de couplage (importante):** le changement de TYPE de `article.author` (string → référence) et de `team.members` (objets inline → références) est atomique par nature. Tant que le LIVE n'est pas migré, `nuxt generate` ÉCHOUE (la déréf d'une chaîne/d'objets inline donne null → fail-fast). Donc Task 1 se vérifie par `schema validate`, Task 2 par `nuxt typecheck`, et la porte `nuxt generate` VERTE arrive en Task 3 (après migration du live). C'est voulu et explicite.

---

### Task 1: Schéma Studio — document `person` + références `team`/`article`

**Files:**
- Create: `studio/schemas/documents/person.ts`
- Modify: `studio/schemas/objects/blocks/team.ts` (members inline → array de références)
- Modify: `studio/schemas/documents/article.ts:86-92` (author string → référence)
- Modify: `studio/schemas/index.ts` (import + enregistrement de `person`)
- Modify: `studio/sanity.config.ts` (I18N_SCHEMA_TYPES + NESTED_TYPES + desk « Banques »)

**Interfaces:**
- Produces: document Sanity `person` { language, name (req), role (req), bio, photo: figure }. `team.members[]` = `reference -> person` filtrée par langue. `article.author` = `reference -> person` filtrée par langue, requise.

- [ ] **Step 1: Créer `studio/schemas/documents/person.ts`** (calqué sur `testimonial.ts`)

```ts
import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

/**
 * Banque de personnes: techniciens de Rempart, source unique de l'identité
 * (nom, rôle, bio, portrait). Référencée par le bloc équipe (/a-propos) ET par
 * l'auteur d'un article. i18n document-level: un doc par langue (nom identique,
 * rôle et bio traduits), portrait partagé via l'asset (alt bilingue sur l'asset).
 * Pas de slug: aucune page perso. Aucune numérotation.
 */
export const person = defineType({
  name: 'person',
  title: 'Personne',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio courte',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Portrait',
      type: 'figure',
    }),
  ],
  orderings: [
    { title: 'Nom (A→Z)', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', language: 'language', media: 'photo.image' },
    prepare: ({ title, subtitle, language, media }) => ({
      title: title || '(sans nom)',
      subtitle: (subtitle || 'Personne') + (language ? ' (' + language.toUpperCase() + ')' : ''),
      media,
    }),
  },
})
```

- [ ] **Step 2: `team.ts` — remplacer les membres inline par des références.** Remplacer le `defineField({ name: 'members', ... })` entier (lignes 36-81) par:

```ts
    defineField({
      name: 'members',
      title: 'Membres de l\'équipe',
      description: 'Personnes de la banque, dans l\'ordre d\'affichage. Même langue que la page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'person' }],
          options: {
            filter: ({ document }) => ({
              filter: 'language == $language',
              params: { language: (document as { language?: string })?.language ?? 'fr' },
            }),
          },
        }),
      ],
      validation: (R) => R.required().min(1),
    }),
```

`defineArrayMember`, `UsersIcon` et `anchorField` restent importés/utilisés. L'objet inline `teamMember` et son `preview` disparaissent avec ce remplacement.

- [ ] **Step 3: `article.ts` — author string → référence.** Remplacer le champ author (lignes 86-92) par:

```ts
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      group: 'content',
      to: [{ type: 'person' }],
      // Une personne de la MÊME langue que l'article (i18n document-level),
      // exclue de la copie auto à la traduction (l'éditeur choisit la version EN).
      options: {
        filter: ({ document }) => ({
          filter: 'language == $language',
          params: { language: (document as { language?: string })?.language ?? 'fr' },
        }),
        documentInternationalization: { exclude: true },
      },
      validation: (R) => R.required(),
    }),
```

- [ ] **Step 4: `index.ts` — enregistrer `person`.** Sous le commentaire `// Documents: banques et instances fixes` (après `import { testimonial } ...`, ligne 63) ajouter:

```ts
import { person } from './documents/person'
```

Dans le tableau `schemaTypes`, section banques (après `testimonial,`, ligne 125) ajouter `person,`:

```ts
  // Documents: banques et instances fixes
  testimonial,
  person,
  faqItem,
  faqTheme,
  legalPage,
```

- [ ] **Step 5: `sanity.config.ts` — i18n + desk.**

(a) `I18N_SCHEMA_TYPES` (ligne 49-54): ajouter `'person'` à la dernière ligne:
```ts
  'testimonial', 'faqItem', 'faqTheme', 'legalPage', 'person',
```
(b) `NESTED_TYPES` (ligne 72-75): ajouter `'person'` (rangé manuellement, exclu de l'auto-listing):
```ts
  'testimonial', 'faqItem', 'faqTheme', 'legalPage', 'person',
```
(c) Desk, groupe « Banques » (lignes 238-242): ajouter la liste `person` avant les témoignages:
```ts
      S.listItem().title('Banques').icon(DatabaseIcon).child(
        S.list().title('Banques').items([
          collection(S, 'person', 'Équipe', [{ field: 'name', direction: 'asc' }]),
          collection(S, 'testimonial', 'Témoignages', [{ field: 'order', direction: 'asc' }]),
        ]),
      ),
```

- [ ] **Step 6: Valider le schéma** (porte de cette tâche)

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree/studio && npx sanity schema validate`
Expected: 0 erreur.

- [ ] **Step 7: Build complet du Studio** (attrape les imports cassés, leçon PhoneIcon)

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree/studio && npx sanity build`
Expected: build OK (pas d'erreur Rollup d'import).

- [ ] **Step 8: Commit**

```bash
git add studio/schemas/documents/person.ts studio/schemas/objects/blocks/team.ts studio/schemas/documents/article.ts studio/schemas/index.ts studio/sanity.config.ts
git commit -m "feat(studio): document person, references team et auteur d'article" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Pipeline Nuxt — déréf GROQ + auteur structuré + Person JSON-LD

**Files:**
- Modify: `app/queries/documents.ts:128` (query de prod: author déréf)
- Modify: `app/queries/fragments/cards.ts:53` (query preview: author déréf)
- Modify: `app/queries/blocks/page-builder.ts:112` (team members déréf)
- Modify: `app/types/sanity.ts:414` (SanityArticle.author)
- Modify: `app/content/articles.ts` (type ArticleAuthor + Article.author)
- Modify: `app/sanity/transform.ts` (transformArticleAuthor + transformArticle:1292)
- Modify: `app/composables/useArticles.ts` (helper authorByline)
- Modify: `app/composables/useBlockCatalog.ts:260` (sample byline)
- Modify: `app/pages/blog/[...slug].vue:76,142` (byline + SEO)
- Modify: `app/composables/usePageSeo.ts:55,188-190,247` (PageSeoArticle.author + Person)

**Interfaces:**
- Consumes (de Task 1): `person` référencé, projection `author->{ name, role, "portrait": photo <FIGURE_PROJECTION> }` et `members[]->{ name, role, bio, "photo": photo <FIGURE_PROJECTION> }`.
- Produces: `ArticleAuthor { name: string; role: string; portraitSrc?: string; portraitAlt?: string }` (dans `app/content/articles.ts`); `Article.author: ArticleAuthor`; `authorByline(author: ArticleAuthor): string` (dans `app/composables/useArticles.ts`). `HeroArticleContent.author` reste `string` (INCHANGÉ); `app/components/hero/block/article.vue` INCHANGÉ; `app/content/team.ts` et `transformTeam` INCHANGÉS.

- [ ] **Step 1: `documents.ts:128` — déréf de l'auteur (query de PROD).** Remplacer `    author,` par:

```groq
    "author": author->{ name, role, "portrait": photo ${FIGURE_PROJECTION} },
```

- [ ] **Step 2: `cards.ts:53` — déréf (query preview).** Remplacer `  author,` par:

```groq
  "author": author->{ name, role, "portrait": photo ${FIGURE_PROJECTION} },
```

- [ ] **Step 3: `page-builder.ts:112` — déréf des membres.** Remplacer la ligne `    members[]{ name, role, bio, "photo": photo ${FIGURE_PROJECTION} }` par (ajout du `->`):

```groq
    members[]->{ name, role, bio, "photo": photo ${FIGURE_PROJECTION} }
```

- [ ] **Step 4: `app/types/sanity.ts:414` — forme déréf de l'auteur.** Remplacer `  author?: Maybe<string>` par:

```ts
  author?: Maybe<{ name: string; role: string; portrait?: Maybe<SanityFigure> }>
```

(`SanityTeamBlock.members` reste INCHANGÉ: la déréf produit la même forme `{ name, role, bio?, photo }`.)

- [ ] **Step 5: `app/content/articles.ts` — type ArticleAuthor.** Ajouter l'interface avant `export interface Article` et changer le champ:

```ts
export interface ArticleAuthor {
  name: string
  role: string
  /** Portrait CDN déjà résolu (sert le JSON-LD Person; le byline reste textuel). */
  portraitSrc?: string
  portraitAlt?: string
}
```
Puis dans `Article`, remplacer `  author: string` par `  author: ArticleAuthor`.

- [ ] **Step 6: `transform.ts` — helper auteur (fail-fast) + branchement.** Ajouter le helper juste avant `transformArticle` (ligne 1285):

```ts
/** Auteur d'article: la référence person déréférencée -> objet structuré. Posture
 *  fail-fast: une référence non résolue (person non publiée) interrompt le build. */
function transformArticleAuthor(raw: SanityArticle['author']): ArticleAuthor {
  if (!raw?.name) {
    throw new Error('Article sans auteur résolu: référence « person » manquante ou non publiée.')
  }
  const f = resolveFigure(raw.portrait)
  return {
    name: raw.name,
    role: raw.role,
    portraitSrc: opt(f.src),
    portraitAlt: f.alt || undefined,
  }
}
```
Dans `transformArticle`, remplacer `    author: raw.author ?? '',` par `    author: transformArticleAuthor(raw.author),`. Ajouter `ArticleAuthor` à l'import existant du type `Article` (recherche `from '~/content/articles'` ou chemin relatif équivalent dans transform.ts; ajouter `ArticleAuthor` à la liste).

- [ ] **Step 7: `useArticles.ts` — helper authorByline (DRY).** Ajouter l'import `import type { Article, ArticleAuthor } from '~/content/articles'` (étendre l'import `Article` existant ligne 8) et la fonction après `formatArticleDate` (ligne 45):

```ts
/** Ligne d'auteur affichée (meta du masthead): « Nom, rôle ». Le rôle passe en
 *  minuscule initiale pour lire naturellement après la virgule. */
export function authorByline(author: ArticleAuthor): string {
  const role = author.role.charAt(0).toLowerCase() + author.role.slice(1)
  return `${author.name}, ${role}`
}
```

- [ ] **Step 8: `useBlockCatalog.ts:260` — sample byline.** Remplacer `      author: sampleArticle.author,` par `      author: authorByline(sampleArticle.author),`. Vérifier que `authorByline` est importé de `~/composables/useArticles` (ajouter à l'import si absent).

- [ ] **Step 9: `blog/[...slug].vue` — byline + SEO.** Ajouter `authorByline` à l'import de `~/composables/useArticles`. Remplacer ligne 76 `    author: a.author,` par `    author: authorByline(a.author),`. Remplacer ligne 142 `      author: a.author || undefined,` par:

```ts
      author: { name: a.author.name, jobTitle: a.author.role, image: a.author.portraitSrc || undefined },
```

- [ ] **Step 10: `usePageSeo.ts` — Person enrichi.**
(a) Ligne 55: remplacer `  author?: string` par:
```ts
  author?: { name: string; jobTitle?: string; image?: string }
```
(b) Lignes 188-190: remplacer le corps par:
```ts
    if (input.article.author) {
      meta.articleAuthor = [input.article.author.name]
    }
```
(c) Ligne 247: remplacer par:
```ts
      ...(input.article.author
        ? {
            author: {
              '@type': 'Person',
              name: input.article.author.name,
              ...(input.article.author.jobTitle ? { jobTitle: input.article.author.jobTitle } : {}),
              ...(input.article.author.image ? { image: input.article.author.image } : {}),
            },
          }
        : {}),
```

- [ ] **Step 11: Typecheck** (porte de cette tâche; `generate` est gardé pour Task 3 car le live n'est pas encore migré)

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree && npx nuxt typecheck`
Expected: 0 erreur.

- [ ] **Step 12: Commit**

```bash
git add app/queries/documents.ts app/queries/fragments/cards.ts app/queries/blocks/page-builder.ts app/types/sanity.ts app/content/articles.ts app/sanity/transform.ts app/composables/useArticles.ts app/composables/useBlockCatalog.ts "app/pages/blog/[...slug].vue" app/composables/usePageSeo.ts
git commit -m "feat(blog): auteur d'article reference vers la banque person, byline et JSON-LD Person" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Migration du live + miroir seed + porte `nuxt generate`

**Files:**
- Create: `studio/seed/migrate-person-bank.mjs`
- Modify: `studio/seed-content.json` (écrit par la fonction seed du script)

**Interfaces:**
- Consumes: schéma de Task 1 + pipeline de Task 2. Lit le bloc team LIVE (aboutPage-fr/en) comme source de name/role/bio/portrait.
- Produces (live + seed): 8 docs `person-{martin,julie,samuel,nadia}-{fr,en}`, 4 `translation-person-*`, `team.members` en références, `article.author` en références (punaises→julie, fourmis→martin, souris→samuel).

- [ ] **Step 1: Écrire `studio/seed/migrate-person-bank.mjs`**

```js
// Banque de personnes: extrait les 4 membres inline du bloc team (aboutPage-fr/en),
// crée 8 docs `person` + 4 translation.metadata, repointe team.members et
// article.author vers ces references. Lit le token CLI, idempotent, --dry-run.
import { createClient } from "@sanity/client"
import { readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const DRY = process.argv.includes("--dry-run")
const here = dirname(fileURLToPath(import.meta.url))
const seedPath = join(here, "..", "seed-content.json")
const LANGS = ["fr", "en"]

function readToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  const cfg = JSON.parse(readFileSync(join(homedir(), ".config", "sanity", "config.json"), "utf8"))
  if (cfg.authToken) return cfg.authToken
  throw new Error("Aucun token Sanity.")
}

const client = createClient({
  projectId: "5if00rwn",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: readToken(),
  useCdn: false,
})

// Nom -> base d'id de personne, dans l'ordre d'affichage du bloc team.
const ROSTER = [
  { name: "Martin Lefebvre", base: "person-martin", key: "m1", img: "team-martin" },
  { name: "Julie Caron", base: "person-julie", key: "m2", img: "team-julie" },
  { name: "Samuel Ouellet", base: "person-samuel", key: "m3", img: "team-samuel" },
  { name: "Nadia Bélanger", base: "person-nadia", key: "m4", img: "team-nadia" },
]
const baseByName = Object.fromEntries(ROSTER.map((r) => [r.name, r.base]))

// Article -> personne (par patronyme de base).
const ARTICLE_AUTHOR = {
  "article-punaises": "person-julie",
  "article-fourmis": "person-martin",
  "article-souris": "person-samuel",
}

function tmDoc(base) {
  const tval = (lang) => ({
    _key: lang,
    _type: "internationalizedArrayReferenceValue",
    language: lang,
    value: { _type: "reference", _ref: base + "-" + lang, _weak: true, _strengthenOnPublish: { type: "person" } },
  })
  return { _id: "translation-" + base, _type: "translation.metadata", schemaTypes: ["person"], translations: LANGS.map(tval) }
}

function teamBlockOf(doc) {
  const blocks = doc.pageBuilder || []
  const team = blocks.find((b) => b._type === "team")
  if (!team) throw new Error("bloc team introuvable dans " + doc._id)
  return team
}

async function migrateLive() {
  // 1. Lire les membres inline live, par langue, pour bâtir les docs person.
  const persons = []
  for (const lang of LANGS) {
    const about = await client.getDocument("aboutPage-" + lang)
    if (!about) throw new Error("introuvable: aboutPage-" + lang)
    const team = teamBlockOf(about)
    for (const m of team.members || []) {
      const base = baseByName[m.name]
      if (!base) throw new Error("membre inconnu du roster: " + m.name)
      persons.push({
        _id: base + "-" + lang,
        _type: "person",
        language: lang,
        name: m.name,
        role: m.role,
        bio: m.bio,
        photo: m.photo, // figure avec le vrai _ref d'asset live
      })
    }
  }
  const tms = ROSTER.map((r) => tmDoc(r.base))

  // 2. Reconstruire les blocs team en references (ordre + _key conserves).
  const aboutPatches = []
  for (const lang of LANGS) {
    const about = await client.getDocument("aboutPage-" + lang)
    const next = (about.pageBuilder || []).map((b) => {
      if (b._type !== "team") return b
      return {
        ...b,
        members: ROSTER.map((r) => ({ _key: r.key, _type: "reference", _ref: r.base + "-" + lang })),
      }
    })
    aboutPatches.push({ id: about._id, pageBuilder: next })
  }

  // 3. Repointer les auteurs d'article.
  const articlePatches = []
  for (const [artBase, personBase] of Object.entries(ARTICLE_AUTHOR)) {
    for (const lang of LANGS) {
      articlePatches.push({ id: artBase + "-" + lang, author: { _type: "reference", _ref: personBase + "-" + lang } })
    }
  }

  if (DRY) {
    console.log("  persons:", persons.map((p) => p._id).join(", "))
    console.log("  tms:", tms.map((t) => t._id).join(", "))
    console.log("  about:", aboutPatches.map((a) => a.id).join(", "))
    console.log("  articles:", articlePatches.map((a) => a.id + " -> " + a.author._ref).join(", "))
    return
  }

  let tx = client.transaction()
  for (const p of persons) tx = tx.createOrReplace(p)
  for (const t of tms) tx = tx.createOrReplace(t)
  for (const a of aboutPatches) tx = tx.patch(a.id, (patch) => patch.set({ pageBuilder: a.pageBuilder }))
  for (const a of articlePatches) tx = tx.patch(a.id, (patch) => patch.set({ author: a.author }))
  await tx.commit({ visibility: "sync" })
  console.log("  live: 8 person + 4 tm + about + 6 articles (sync).")
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, "utf8"))

  // Source: les membres inline du seed (par langue) pour name/role/bio.
  const aboutSeed = Object.fromEntries(
    LANGS.map((lang) => [lang, seed.documents.find((d) => d.content && d.content._id === "aboutPage-" + lang)]),
  )

  // 1. Upsert des 8 docs person + 4 tm (wrappers seed).
  const upsert = (wrapper) => {
    const idx = seed.documents.findIndex((d) => d.content && d.content._id === wrapper.content._id)
    if (idx >= 0) seed.documents[idx] = wrapper
    else seed.documents.push(wrapper)
  }
  for (const lang of LANGS) {
    const team = teamBlockOf(aboutSeed[lang].content)
    for (const m of team.members) {
      const base = baseByName[m.name]
      const r = ROSTER.find((x) => x.base === base)
      upsert({
        type: "person",
        content: {
          _id: base + "-" + lang,
          _type: "person",
          language: lang,
          name: m.name,
          role: m.role,
          bio: m.bio,
          photo: { _type: "figure", image: { _type: "image", asset: { _type: "reference", _ref: "IMG:" + r.img } } },
        },
      })
    }
  }
  for (const r of ROSTER) upsert({ type: "translation.metadata", content: tmDoc(r.base) })

  // 2. team.members -> references (par langue).
  for (const lang of LANGS) {
    const team = teamBlockOf(aboutSeed[lang].content)
    team.members = ROSTER.map((r) => ({ _key: r.key, _type: "reference", _ref: r.base + "-" + lang }))
  }

  // 3. article.author -> references.
  for (const [artBase, personBase] of Object.entries(ARTICLE_AUTHOR)) {
    for (const lang of LANGS) {
      const art = seed.documents.find((d) => d.content && d.content._id === artBase + "-" + lang)
      if (!art) throw new Error("seed article introuvable: " + artBase + "-" + lang)
      art.content.author = { _type: "reference", _ref: personBase + "-" + lang }
    }
  }

  if (DRY) {
    console.log("  SEED (DRY): 8 person + 4 tm + team refs + 6 auteurs prets.")
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + "\n")
  console.log("  seed-content.json: miroir ecrit.")
}

console.log(DRY ? "DRY-RUN" : "LIVE")
await migrateLive()
migrateSeed()
console.log("OK.")
```

- [ ] **Step 2: Dry-run** (lecture seule, aucune écriture)

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree && node studio/seed/migrate-person-bank.mjs --dry-run`
Expected: liste 8 person, 4 tm, 2 aboutPage, 6 articles avec leurs cibles; aucune erreur.

- [ ] **Step 3: Exécuter sur le live + le seed**

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree && node studio/seed/migrate-person-bank.mjs`
Expected: « live: 8 person + 4 tm + about + 6 articles (sync). » puis « seed-content.json: miroir ecrit. »

- [ ] **Step 4: Vérifier le live par GROQ**

Run (CLI ou MCP query_documents): 
```
cd /Users/charlespatoine/dev/projects/webforge-ancree/studio && npx sanity documents query '{"persons": count(*[_type=="person"]), "tm": count(*[_type=="translation.metadata" && "person" in schemaTypes]), "teamFr": *[_id=="aboutPage-fr"][0].pageBuilder[_type=="team"][0].members[]->name, "authors": *[_type=="article"]{_id, "author": author->name}}' --dataset production
```
Expected: persons = 8, tm = 4, teamFr = [Martin, Julie, Samuel, Nadia], chaque article a un nom d'auteur résolu (fourmis→Martin, souris→Samuel, punaises→Julie).

- [ ] **Step 5: Porte `nuxt generate` VERTE**

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree && NUXT_SANITY_TOKEN=$(node -p "require(require('os').homedir()+'/.config/sanity/config.json').authToken") npx nuxt generate`
Expected: build VERT, 0 erreur, 0 avertissement, 0 lien cassé (~382 routes, person n'ajoute pas de route).

- [ ] **Step 6: Vérifier l'absence du token dans `.output`**

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree && TOKEN=$(node -p "require(require('os').homedir()+'/.config/sanity/config.json').authToken") && grep -rl "$TOKEN" .output ; echo "exit=$?"`
Expected: aucune ligne, `exit=1` (grep ne trouve rien).

- [ ] **Step 7: Vérifier le rendu SSR** (byline nom+rôle, équipe intacte, Person JSON-LD)

Run: 
```
cd /Users/charlespatoine/dev/projects/webforge-ancree
grep -o "Martin Lefebvre, fondateur[^<]*" .output/public/blog/prevention/prevenir-les-fourmis-charpentieres/index.html | head -1
grep -c "Les visages derrière Rempart" .output/public/a-propos/index.html
grep -o '"@type":"Person"[^}]*"jobTitle"[^}]*' .output/public/blog/prevention/prevenir-les-fourmis-charpentieres/index.html | head -1
```
Expected: la ligne byline « Martin Lefebvre, fondateur et technicien en chef »; le titre d'équipe présent (1); un nœud Person avec jobTitle. (Adapter le chemin si la catégorie/slug diffère; confirmer via la query GROQ du slug si besoin.)

- [ ] **Step 8: Commit**

```bash
git add studio/seed/migrate-person-bank.mjs studio/seed-content.json
git commit -m "feat(content): banque person live + miroir seed, auteurs et equipe references" -m "Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Déploiement du Studio hébergé

**Files:** aucun (action de déploiement; le schéma de Task 1 doit être en place et le live migré).

- [ ] **Step 1: Déployer le manifeste de schéma**

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree/studio && npx sanity schema deploy`
Expected: 1/1 schéma déployé.

- [ ] **Step 2: Déployer le Studio hébergé**

Run: `cd /Users/charlespatoine/dev/projects/webforge-ancree/studio && npx sanity deploy`
Expected: build + déploiement OK vers https://webforge-ancree.sanity.studio/.

- [ ] **Step 3: Vérifier dans le Studio** (manuel, à confirmer avec Charles): groupe « Banques » contient « Équipe » (4 personnes FR); le bloc équipe de /a-propos liste 4 références éditables; l'auteur d'un article est un sélecteur de personne filtré par langue. Pas de commit (déploiement distant).

---

## Self-Review

**Spec coverage** (chaque section du spec → tâche):
- Document `person` (champs sobres) → Task 1 Step 1. ✔
- `team.members` + `article.author` en références filtrées par langue → Task 1 Steps 2-3. ✔
- Enregistrement + i18n + desk → Task 1 Steps 4-5. ✔
- Projections déréf (prod + preview + team) → Task 2 Steps 1-3. ✔
- Transform fail-fast + types → Task 2 Steps 4-6. ✔
- Byline « nom, rôle » (page, hero inchangé) + showcase → Task 2 Steps 7-9. ✔
- JSON-LD Person enrichi → Task 2 Step 10. ✔
- Migration live (8 person + 4 tm + repointage) + miroir seed → Task 3. ✔
- Porte generate verte + token absent + SSR → Task 3 Steps 5-7. ✔
- Deploy schéma + Studio → Task 4. ✔
- Hors périmètre (2 articles neufs, re-maillage, carte byline portrait, credentials, slug, one-pager, légales) → non planifié, conforme. ✔

**Placeholder scan:** aucun TBD/TODO; tout le code est explicite. ✔

**Type consistency:** `ArticleAuthor` défini en Task 2 Step 5, consommé Steps 6-9; `authorByline(author: ArticleAuthor): string` défini Step 7, consommé Steps 8-9; `SanityArticle.author` (Step 4) consommé par `transformArticleAuthor` (Step 6); `PageSeoArticle.author` objet (Step 10a) consommé Steps 10b-c et alimenté par blog page (Step 9). `HeroArticleContent.author` reste `string` (jamais touché) → `article.vue` inchangé. `SanityTeamBlock.members` / `TeamContent` / `transformTeam` / `team.vue` inchangés (la déréf reproduit la forme). Cohérent. ✔
