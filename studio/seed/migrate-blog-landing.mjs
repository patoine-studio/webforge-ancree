// Blog /blog, lot FOND (atterrissage). La page ne rendait que Hero > liste > un CTA
// (le pageBuilder n'etait pas encadre). Avec le nouveau decoupage de blog/index.vue
// (editoriaux de tete = intro avant la liste, le reste apres), on garnit le
// pageBuilder pour la sequence du plan:
//   Hero > editorial (intro) > liste d'articles > testimonials > ctaBand > contact.
//
// Le bloc contact existant (b1) est CONSERVE comme cloture. Editorial/testimonials/
// ctaBand neufs. Le schema autorise deja les 12 blocs: aucun deploy Studio.
//
// Fetch + reconstruction (contact preserve). Live (patch set + publish sync) puis
// miroir seed. Apostrophes droites.
//
// Usage:  node studio/seed/migrate-blog-landing.mjs [--dry-run]

import { createClient } from "@sanity/client"
import { readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const DRY = process.argv.includes("--dry-run")
const here = dirname(fileURLToPath(import.meta.url))
const seedPath = join(here, "..", "seed-content.json")

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

const LANGS = ["fr", "en"]

// Un bloc Portable Text (paragraphe) avec liens internes inline. seg = string |
// { t, ref } ou ref est un id de BASE (suffixe de langue ajoute ici).
function ptBlock(segs, lang, key) {
  const markDefs = []
  const children = []
  let lc = 0
  segs.forEach((seg, i) => {
    const skey = key + "s" + i
    if (typeof seg === "string") {
      children.push({ _type: "span", _key: skey, text: seg, marks: [] })
    } else {
      lc += 1
      const lkey = key + "l" + lc
      markDefs.push({
        _key: lkey,
        _type: "link",
        type: "internal",
        internalRef: { _type: "reference", _ref: seg.ref + "-" + lang },
      })
      children.push({ _type: "span", _key: skey, text: seg.t, marks: [lkey] })
    }
  })
  return { _type: "block", _key: key, style: "normal", markDefs, children }
}

// ── Editorial intro ───────────────────────────────────────────────────────────
const EDITORIAL = {
  fr: {
    eyebrow: "Le carnet de Rempart",
    heading: "Des conseils de terrain, pas de la théorie",
    lead: "Depuis 2008, on traite les nuisibles de la Rive-Nord au quotidien. Ce qu'on voit sur le terrain, on le partage ici: reconnaître un problème tôt, quoi faire avant notre visite, et comment éviter que ça revienne.",
    body: [
      "Nos articles vont droit au but, écrits par les techniciens qui font le travail. Les signes d'une infestation de ",
      { t: "souris", ref: "service-souris-rats" },
      ", les bons réflexes contre les ",
      { t: "punaises de lit", ref: "service-punaises-de-lit" },
      ", la prévention des ",
      { t: "fourmis charpentières", ref: "service-fourmis-charpentieres" },
      ": de quoi agir avant même d'avoir à nous appeler. Et quand il faut intervenir, on est déjà dans votre coin, de ",
      { t: "Laval", ref: "serviceCity-laval" },
      " à ",
      { t: "Repentigny", ref: "serviceCity-repentigny" },
      ".",
    ],
  },
  en: {
    eyebrow: "The Rempart field notes",
    heading: "Field advice, not theory",
    lead: "Since 2008 we have treated North Shore pests every day. What we see in the field, we share here: spotting a problem early, what to do before our visit, and how to keep it from coming back.",
    body: [
      "Our articles get straight to the point, written by the technicians who do the work. The signs of a ",
      { t: "mouse", ref: "service-souris-rats" },
      " infestation, the right reflexes against ",
      { t: "bed bugs", ref: "service-punaises-de-lit" },
      ", preventing ",
      { t: "carpenter ants", ref: "service-fourmis-charpentieres" },
      ": enough to act before you even have to call us. And when treatment is needed, we are already in your area, from ",
      { t: "Laval", ref: "serviceCity-laval" },
      " to ",
      { t: "Repentigny", ref: "serviceCity-repentigny" },
      ".",
    ],
  },
}
function editorial(lang) {
  const e = EDITORIAL[lang]
  return {
    _key: "bl-editorial",
    _type: "editorial",
    eyebrow: e.eyebrow,
    heading: e.heading,
    lead: e.lead,
    segments: [
      {
        _key: "seg0",
        _type: "editorialSegment",
        disposition: "text",
        media: [],
        body: [ptBlock(e.body, lang, "a0")],
      },
    ],
  }
}

// ── Testimonials + ctaBand ────────────────────────────────────────────────────
function testimonials(lang) {
  const c = {
    fr: { eyebrow: "Au-delà du conseil", heading: "Quand le conseil ne suffit plus" },
    en: { eyebrow: "Beyond the advice", heading: "When advice is not enough" },
  }
  return { _key: "bl-tm", _type: "testimonials", mode: "featured", ...c[lang] }
}
function ctaBand(lang) {
  const c = {
    fr: {
      title: "Un nuisible n'attend pas que vous finissiez l'article.",
      subtitle: "Appelez, une vraie personne répond 7 jours sur 7.",
      primary: "Appeler maintenant",
      secondary: "Obtenir une estimation",
    },
    en: {
      title: "A pest will not wait for you to finish the article.",
      subtitle: "Call us, a real person answers seven days a week.",
      primary: "Call now",
      secondary: "Get an estimate",
    },
  }
  const c2 = c[lang]
  return {
    _key: "bl-cta",
    _type: "ctaBand",
    title: c2.title,
    subtitle: c2.subtitle,
    primaryCta: { _type: "link", label: c2.primary, type: "tel" },
    secondaryCta: { _type: "link", label: c2.secondary, type: "anchor", anchor: "contact" },
  }
}

// Reconstruit le pageBuilder: intro editorial, temoignages, ctaBand, contact existant.
function rebuild(pb, lang) {
  const contact = pb.find((b) => b._type === "contact")
  if (!contact) throw new Error("contact introuvable (" + lang + ")")
  return [editorial(lang), testimonials(lang), ctaBand(lang), contact]
}

async function migrateLive() {
  for (const lang of LANGS) {
    const id = "blogPage-" + lang
    const doc = await client.getDocument(id)
    if (!doc) throw new Error("introuvable: " + id)
    const next = rebuild(doc.pageBuilder || [], lang)
    if (DRY) {
      console.log("  " + id + " (DRY): " + next.map((b) => b._type).join(" > "))
      continue
    }
    await client.patch(id).set({ pageBuilder: next }).commit({ visibility: "sync" })
    console.log("  " + id + ": pageBuilder garni (live).")
  }
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, "utf8"))
  for (const lang of LANGS) {
    const id = "blogPage-" + lang
    const d = seed.documents.find((x) => x.content && x.content._id === id)
    if (!d) throw new Error("seed introuvable: " + id)
    d.content.pageBuilder = rebuild(d.content.pageBuilder || [], lang)
  }
  if (DRY) {
    console.log("  SEED (DRY): miroir pret.")
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + "\n")
  console.log("  seed-content.json: miroir ecrit.")
}

async function main() {
  console.log("Blog /blog, atterrissage FOND (dataset " + client.config().dataset + ")")
  await migrateLive()
  migrateSeed()
  console.log("Termine.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
