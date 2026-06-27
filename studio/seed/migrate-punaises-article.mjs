// Blog /blog, lot FOND (article MODELE). Etoffe l'article punaises (3 blocs, trop
// maigre) vers un guide complet, avec l'angle du mandat: « quoi faire avant la
// visite du technicien ». Sections: reconnaitre les signes > reflexes au retour de
// voyage > preparer avant notre visite > pourquoi le traitement maison ne suffit
// pas. Lead et citation conserves (citation re-attribuee a l'auteure). Auteur nomme
// + role (decision no 9): Julie Caron, technicienne punaises de lit. Maillage inline
// vers le service punaises.
//
// Patch live (set body/author/readingTime + publish sync) puis miroir seed.
// Apostrophes droites.
//
// Usage:  node studio/seed/migrate-punaises-article.mjs [--dry-run]

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

// ── Helpers Portable Text (corps d'un articleRichText) ────────────────────────
// blk: un bloc PT. segs = string | { t, ref }. style: normal|h2|h3. listItem: bullet.
function blk(key, style, segs, lang, listItem) {
  const markDefs = []
  const children = []
  let lc = 0
  segs.forEach((seg, i) => {
    const sk = key + "s" + i
    if (typeof seg === "string") {
      children.push({ _type: "span", _key: sk, text: seg, marks: [] })
    } else {
      lc += 1
      const lk = key + "l" + lc
      markDefs.push({
        _key: lk,
        _type: "link",
        type: "internal",
        internalRef: { _type: "reference", _ref: seg.ref + "-" + lang },
      })
      children.push({ _type: "span", _key: sk, text: seg.t, marks: [lk] })
    }
  })
  const b = { _type: "block", _key: key, style, markDefs, children }
  if (listItem) {
    b.listItem = listItem
    b.level = 1
  }
  return b
}
const lead = (key, text) => ({ _key: key, _type: "articleLead", text })
const quote = (key, q, attribution) => ({ _key: key, _type: "articleQuote", quote: q, attribution })
const rich = (key, blocks) => ({ _key: key, _type: "articleRichText", body: blocks })

// ── Corps par langue ──────────────────────────────────────────────────────────
function body(lang) {
  if (lang === "fr") {
    return [
      lead(
        "b1",
        "La punaise de lit fait de l'auto-stop. Elle n'apparaît presque jamais de nulle part: elle arrive dans une valise, un divan d'occasion, le sac d'un invité. La bonne nouvelle, c'est qu'une habitude soignée à la porte en arrête la plupart, et qu'un problème pris tôt se règle vite."
      ),
      rich("b2", [
        blk("b2a", "h2", ["Reconnaître les premiers signes"], lang),
        blk("b2b", "normal", ["Les punaises se cachent le jour et sortent la nuit. On les voit rarement directement, mais leurs traces, oui. Trois indices reviennent souvent:"], lang),
        blk("b2c", "normal", ["des piqûres en ligne ou en grappe, souvent sur les bras et les jambes au réveil;"], lang, "bullet"),
        blk("b2d", "normal", ["de petites taches sombres sur les draps, les coutures du matelas ou le sommier;"], lang, "bullet"),
        blk("b2e", "normal", ["des mues translucides ou de minuscules points blancs, les œufs, dans les recoins du lit."], lang, "bullet"),
        blk("b2f", "normal", ["Au moindre doute, inspectez les coutures du matelas et le tour du sommier à la lampe de poche. Plus c'est pris tôt, plus c'est simple."], lang),
      ]),
      rich("b3", [
        blk("b3a", "h2", ["Au retour de voyage, les bons réflexes"], lang),
        blk("b3b", "normal", ["C'est là que la plupart des infestations commencent. Quelques minutes à la porte évitent bien des mois d'ennuis:"], lang),
        blk("b3c", "normal", ["défaites les bagages dans la salle de bain ou le garage, jamais sur le lit;"], lang, "bullet"),
        blk("b3d", "normal", ["passez tout ce qui se lave à la sécheuse à cycle chaud, au moins trente minutes;"], lang, "bullet"),
        blk("b3e", "normal", ["gardez la valise loin de la chambre quelques jours, idéalement dans un sac fermé."], lang, "bullet"),
      ]),
      rich("b4", [
        blk("b4a", "h2", ["Quoi faire avant notre visite"], lang),
        blk("b4b", "normal", ["Si vous nous appelez pour un ", { t: "traitement contre les punaises", ref: "service-punaises-de-lit" }, ", une bonne préparation rend l'intervention plus efficace. Votre technicien vous remet une liste précise, mais en gros:"], lang),
        blk("b4c", "normal", ["lavez et séchez la literie et les vêtements près du lit, puis rangez-les dans des sacs fermés;"], lang, "bullet"),
        blk("b4d", "normal", ["dégagez le tour du lit et les plinthes pour qu'on accède aux cachettes;"], lang, "bullet"),
        blk("b4e", "normal", ["ne déplacez pas vos affaires d'une pièce à l'autre: ça disperse les punaises au lieu de les contenir;"], lang, "bullet"),
        blk("b4f", "normal", ["surtout, ne jetez pas le matelas: un meuble sorti sans précaution contamine le couloir et tout l'immeuble."], lang, "bullet"),
      ]),
      rich("b5", [
        blk("b5a", "h2", ["Pourquoi le traitement maison ne suffit pas"], lang),
        blk("b5b", "normal", ["Les aérosols de quincaillerie font fuir les punaises sans les éliminer: elles se déplacent et l'infestation s'étale. Un ", { t: "traitement professionnel", ref: "service-punaises-de-lit" }, " combine une chaleur ciblée, un produit résiduel homologué et une visite de contrôle pour casser le cycle au complet. C'est ce suivi, plus que le produit, qui fait la différence."], lang),
      ]),
      quote("b6", "Prise dès la première semaine, une intervention contre les punaises est discrète et rapide. Laissée des mois, c'est une autre histoire.", "Julie Caron, technicienne punaises de lit"),
    ]
  }
  return [
    lead(
      "b1",
      "Bed bugs hitchhike. They almost never appear out of nowhere: they arrive in a suitcase, a second-hand couch, a guest's bag. The good news is that a careful habit at the door stops most of them, and a problem caught early is quick to fix."
    ),
    rich("b2", [
      blk("b2a", "h2", ["Spotting the first signs"], lang),
      blk("b2b", "normal", ["Bed bugs hide by day and come out at night. You rarely see them directly, but you do see their traces. Three clues come up often:"], lang),
      blk("b2c", "normal", ["bites in a line or cluster, often on arms and legs when you wake up;"], lang, "bullet"),
      blk("b2d", "normal", ["small dark specks on the sheets, the mattress seams or the box spring;"], lang, "bullet"),
      blk("b2e", "normal", ["translucent shed skins or tiny white dots, the eggs, in the nooks of the bed."], lang, "bullet"),
      blk("b2f", "normal", ["At the first doubt, inspect the mattress seams and the box spring with a flashlight. The earlier it is caught, the simpler it is."], lang),
    ]),
    rich("b3", [
      blk("b3a", "h2", ["Coming home from a trip"], lang),
      blk("b3b", "normal", ["This is where most infestations start. A few minutes at the door save months of trouble:"], lang),
      blk("b3c", "normal", ["unpack in the bathroom or the garage, never on the bed;"], lang, "bullet"),
      blk("b3d", "normal", ["run everything washable through the dryer on a hot cycle, at least thirty minutes;"], lang, "bullet"),
      blk("b3e", "normal", ["keep the suitcase away from the bedroom for a few days, ideally in a sealed bag."], lang, "bullet"),
    ]),
    rich("b4", [
      blk("b4a", "h2", ["What to do before our visit"], lang),
      blk("b4b", "normal", ["If you call us for a ", { t: "bed bug treatment", ref: "service-punaises-de-lit" }, ", good preparation makes the visit more effective. Your technician gives you a precise list, but in short:"], lang),
      blk("b4c", "normal", ["wash and dry the bedding and the clothes near the bed, then store them in sealed bags;"], lang, "bullet"),
      blk("b4d", "normal", ["clear the area around the bed and the baseboards so we can reach the hiding spots;"], lang, "bullet"),
      blk("b4e", "normal", ["do not move your things from room to room: it spreads the bugs instead of containing them;"], lang, "bullet"),
      blk("b4f", "normal", ["above all, do not throw out the mattress: furniture taken out carelessly contaminates the hallway and the whole building."], lang, "bullet"),
    ]),
    rich("b5", [
      blk("b5a", "h2", ["Why a do-it-yourself treatment is not enough"], lang),
      blk("b5b", "normal", ["Hardware-store sprays drive bed bugs away without killing them: they move and the infestation spreads. A ", { t: "professional treatment", ref: "service-punaises-de-lit" }, " combines targeted heat, an approved residual product and a follow-up visit to break the whole cycle. It is that follow-up, more than the product, that makes the difference."], lang),
    ]),
    quote("b6", "Caught in the first week, a bed bug treatment is quiet and quick. Left for months, it is a different story.", "Julie Caron, bed bug and detection technician"),
  ]
}

const AUTHOR = {
  fr: "Julie Caron, technicienne punaises de lit et détection",
  en: "Julie Caron, bed bug and detection technician",
}

async function migrateLive() {
  for (const lang of LANGS) {
    const id = "article-punaises-" + lang
    const patch = { body: body(lang), author: AUTHOR[lang], readingTime: 7 }
    if (DRY) {
      console.log("  " + id + " (DRY): " + patch.body.length + " blocs, auteur=" + patch.author)
      continue
    }
    await client.patch(id).set(patch).commit({ visibility: "sync" })
    console.log("  " + id + ": etoffe (live).")
  }
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, "utf8"))
  for (const lang of LANGS) {
    const id = "article-punaises-" + lang
    const d = seed.documents.find((x) => x.content && x.content._id === id)
    if (!d) throw new Error("seed introuvable: " + id)
    d.content.body = body(lang)
    d.content.author = AUTHOR[lang]
    d.content.readingTime = 7
  }
  if (DRY) {
    console.log("  SEED (DRY): miroir pret.")
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + "\n")
  console.log("  seed-content.json: miroir ecrit.")
}

async function main() {
  console.log("Article punaises etoffe (dataset " + client.config().dataset + ")")
  await migrateLive()
  migrateSeed()
  console.log("Termine.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
