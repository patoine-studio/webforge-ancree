// One-pager FOND: aligner /one-pager sur l'accueil enrichi. L'accueil a gagné deux
// blocs de valeur (process = la méthode, highlights = les engagements) que le
// one-pager n'avait pas. On les CLONE depuis l'accueil (contenu identique = aligné),
// insérés dans l'ordre de l'accueil: process après services, highlights après about.
// Le reste du one-pager (services auto, serviceCities, about, testimonials, faq,
// ctaBand, contact) reste intact. Aucun schéma touché. Idempotent, --dry-run.
// Usage:  node studio/seed/migrate-onepager-align.mjs [--dry-run]
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

const clone = (block, key) => ({ ...structuredClone(block), _key: key })

// Insère process (après services) et highlights (après about), clonés depuis
// l'accueil. Idempotent: si le one-pager a déjà un bloc du type, on ne l'ajoute pas.
function insertValueBlocks(blocks, proc, high) {
  const hasProcess = blocks.some((b) => b._type === "process")
  const hasHighlights = blocks.some((b) => b._type === "highlights")
  const out = []
  for (const b of blocks) {
    out.push(b)
    if (b._type === "services" && !hasProcess) out.push(clone(proc, "op-process"))
    if (b._type === "about" && !hasHighlights) out.push(clone(high, "op-highlights"))
  }
  return out
}

function valueBlocksFrom(home, lang) {
  const proc = (home.pageBuilder || []).find((b) => b._type === "process")
  const high = (home.pageBuilder || []).find((b) => b._type === "highlights")
  if (!proc || !high) throw new Error("accueil process/highlights introuvable: " + lang)
  return { proc, high }
}

async function migrateLive() {
  let tx = client.transaction()
  for (const lang of LANGS) {
    const home = await client.getDocument("homePage-" + lang)
    const op = await client.getDocument("onePager-" + lang)
    if (!home || !op) throw new Error("introuvable: homePage/onePager " + lang)
    const { proc, high } = valueBlocksFrom(home, lang)
    const next = insertValueBlocks(op.pageBuilder || [], proc, high)
    tx = tx.patch("onePager-" + lang, (p) => p.set({ pageBuilder: next }))
    if (DRY) console.log("  onePager-" + lang + " (DRY): " + next.map((b) => b._type).join(" > "))
  }
  if (DRY) return
  await tx.commit({ visibility: "sync" })
  console.log("  live: one-pager aligné (sync).")
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, "utf8"))
  const find = (id) => seed.documents.find((d) => d.content && d.content._id === id)
  for (const lang of LANGS) {
    const home = find("homePage-" + lang)
    const op = find("onePager-" + lang)
    if (!home || !op) throw new Error("seed introuvable: homePage/onePager " + lang)
    const { proc, high } = valueBlocksFrom(home.content, lang)
    op.content.pageBuilder = insertValueBlocks(op.content.pageBuilder || [], proc, high)
  }
  if (DRY) {
    console.log("  SEED (DRY): one-pager aligné prêt.")
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + "\n")
  console.log("  seed-content.json: miroir écrit.")
}

console.log(DRY ? "DRY-RUN" : "LIVE")
await migrateLive()
migrateSeed()
console.log("OK.")
