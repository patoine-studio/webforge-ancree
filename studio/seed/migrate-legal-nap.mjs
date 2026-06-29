// Pages légales FOND: dédup du NAP. La page Conditions hardcodait un téléphone
// (« 450 555 0199 ») qui CONTREDIT le NAP canonique du site (siteSettings.contact
// = 1 888 555-4250). On retire ce numéro dupliqué de la ligne de coordonnées et on
// renvoie vers la source unique (page Contact / pied de page); on garde le courriel
// (cohérent avec le canonique). Parité fr/en déjà bonne (7 sections conditions,
// 8 confidentialité, mêmes clés): on édite les DEUX langues à l'identique.
// Aucun schéma touché. Idempotent, --dry-run.
// Usage:  node studio/seed/migrate-legal-nap.mjs [--dry-run]
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

// Nouveau texte de la ligne de coordonnées (sans téléphone dupliqué). Le courriel
// reste (cohérent avec le canonique); le NAP complet vit une seule fois (Contact).
const COORD_TEXT = {
  fr: "Pour toute question sur ces conditions, écrivez-nous à bonjour@rempart-extermination.ca. Vous trouverez nos coordonnées complètes sur la page Contact.",
  en: "For any question about these terms, write to us at bonjour@rempart-extermination.ca. You will find our full contact details on the Contact page.",
}

// Remplace le texte du paragraphe cond-coordonnees-p1 dans les sections.
function dedupNap(sections, lang) {
  return sections.map((section) => {
    if (section._key !== "cond-coordonnees") return section
    return {
      ...section,
      body: section.body.map((blockItem) =>
        blockItem._key === "cond-coordonnees-p1" ? { ...blockItem, text: COORD_TEXT[lang] } : blockItem,
      ),
    }
  })
}

async function migrateLive() {
  let tx = client.transaction()
  for (const lang of LANGS) {
    const id = "legalPage-conditions-" + lang
    const doc = await client.getDocument(id)
    if (!doc) throw new Error("introuvable: " + id)
    const next = dedupNap(doc.sections || [], lang)
    tx = tx.patch(id, (p) => p.set({ sections: next }))
    if (DRY) console.log("  " + id + " (DRY): coordonnees sans telephone duplique")
  }
  if (DRY) return
  await tx.commit({ visibility: "sync" })
  console.log("  live: NAP legal dedup (sync).")
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, "utf8"))
  for (const lang of LANGS) {
    const id = "legalPage-conditions-" + lang
    const d = seed.documents.find((x) => x.content && x.content._id === id)
    if (!d) throw new Error("seed introuvable: " + id)
    d.content.sections = dedupNap(d.content.sections || [], lang)
  }
  if (DRY) {
    console.log("  SEED (DRY): NAP legal dedup pret.")
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + "\n")
  console.log("  seed-content.json: miroir ecrit.")
}

console.log(DRY ? "DRY-RUN" : "LIVE")
await migrateLive()
migrateSeed()
console.log("OK.")
