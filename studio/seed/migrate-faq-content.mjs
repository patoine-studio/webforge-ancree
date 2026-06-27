// FAQ /faq, lot FOND (contenu): porte les 3 themes combines aux 6 themes fins du
// plan, ~22 questions fr+en avec maillage interne inline (services, villes, blog).
//
// Structure cible (ordre du repertoire): Securite enfants/animaux > Produits >
// Delais et urgence > Prix et estimation > Garantie > Prevention.
//
// Strategie sans orphelin ni suppression:
//  - REUTILISE les 3 themes combines en les RECADRANT (titre + slug):
//      tarification -> « Prix et estimation », intervention -> « Delais et urgence »,
//      traitement -> « Produits utilises ». Ils gardent leur tm.
//  - CREE 3 themes neufs (Securite, Garantie, Prevention) + tm.
//  - REUTILISE 5 items existants (securite, produits, delai, prix, garantie); en
//    recible 2 (securite -> theme Securite, garantie -> theme Garantie). preparation
//    reste hors /faq (couvert sur les pages detail).
//  - CREE 17 items neufs fr+en (Portable Text restreint, liens internes inline) + tm.
//  - Recable faqPage.sections (fr+en) sur les 6 sections.
//
// Le JSON-LD FAQPage de la page passe de 6 a ~22 questions tout seul (meme source).
// Live (createOrReplace/patch + publish sync) puis miroir seed-content.json.
// Idempotent (createOrReplace + set). Apostrophes droites (chaines en guillemets).
//
// Usage:  node studio/seed/migrate-faq-content.mjs [--dry-run]

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

// Portable Text restreint a partir de segments. seg = string | { t, ref } ou ref est
// un id de BASE (le suffixe de langue est ajoute ici): lien interne inline.
function pt(segs, lang) {
  const markDefs = []
  const children = []
  let lc = 0
  segs.forEach((seg, i) => {
    const skey = "a0s" + i
    if (typeof seg === "string") {
      children.push({ _type: "span", _key: skey, text: seg, marks: [] })
    } else {
      lc += 1
      const lkey = "l" + lc
      markDefs.push({
        _key: lkey,
        _type: "link",
        type: "internal",
        internalRef: { _type: "reference", _ref: seg.ref + "-" + lang },
      })
      children.push({ _type: "span", _key: skey, text: seg.t, marks: [lkey] })
    }
  })
  return [{ _type: "block", _key: "a0", style: "normal", markDefs, children }]
}

// ── Themes recadres (titre + slug par langue) ─────────────────────────────────
const THEME_UPDATES = [
  {
    id: "faqTheme-tarification",
    fr: { title: "Prix et estimation", slug: "prix-estimation" },
    en: { title: "Pricing and estimates", slug: "pricing-estimates" },
  },
  {
    id: "faqTheme-intervention",
    fr: { title: "Délais et urgence", slug: "delais-urgence" },
    en: { title: "Timing and urgency", slug: "timing-urgency" },
  },
  {
    id: "faqTheme-traitement",
    fr: { title: "Produits utilisés", slug: "produits-utilises" },
    en: { title: "Products we use", slug: "products-used" },
  },
]

// ── Themes neufs ──────────────────────────────────────────────────────────────
const THEME_NEW = [
  {
    base: "faqTheme-securite",
    fr: { title: "Sécurité enfants et animaux", slug: "securite-enfants-animaux" },
    en: { title: "Children and pet safety", slug: "children-pet-safety" },
  },
  {
    base: "faqTheme-garantie",
    fr: { title: "Garantie", slug: "garantie" },
    en: { title: "Guarantee", slug: "guarantee" },
  },
  {
    base: "faqTheme-prevention",
    fr: { title: "Prévention", slug: "prevention" },
    en: { title: "Prevention", slug: "prevention" },
  },
]

// ── Items recibles (theme seulement, contenu conserve) ────────────────────────
const ITEMS_REPOINT = [
  { id: "faqItem-securite", themeBase: "faqTheme-securite" },
  { id: "faqItem-garantie", themeBase: "faqTheme-garantie" },
]

// ── Items neufs (fr + en, maillage inline) ────────────────────────────────────
const ITEMS_NEW = [
  // Securite enfants et animaux
  {
    base: "faqItem-securite-ecart",
    themeBase: "faqTheme-securite",
    q: {
      fr: "Combien de temps faut-il rester à l'écart de la pièce traitée?",
      en: "How long do we need to stay out of the treated room?",
    },
    a: {
      fr: [
        "En général, deux à quatre heures, le temps que le produit sèche. Votre technicien vous donne le délai exact selon le traitement et la pièce. Pour un traitement de ",
        { t: "punaises de lit", ref: "service-punaises-de-lit" },
        ", où la préparation est plus exigeante, on vous remet des consignes écrites avant de partir.",
      ],
      en: [
        "Usually two to four hours, the time it takes for the product to dry. Your technician gives you the exact window for the treatment and the room. For a ",
        { t: "bed bug", ref: "service-punaises-de-lit" },
        " treatment, where the prep is more demanding, we leave you written instructions before we go.",
      ],
    },
  },
  {
    base: "faqItem-securite-animaux",
    themeBase: "faqTheme-securite",
    q: {
      fr: "Dois-je sortir mes animaux pendant l'intervention?",
      en: "Do I need to take my pets out during the visit?",
    },
    a: {
      fr: [
        "Idéalement, oui. Chiens, chats et oiseaux restent à l'écart de la zone traitée, et on porte une attention particulière aux poissons et aux reptiles, plus sensibles. On vous dit exactement quoi faire selon votre situation. Une fois le séchage terminé, tout le monde reprend sa place.",
      ],
      en: [
        "Ideally, yes. Dogs, cats and birds stay clear of the treated area, and we pay special attention to fish and reptiles, which are more sensitive. We tell you exactly what to do for your situation. Once everything has dried, everyone settles back in.",
      ],
    },
  },
  {
    base: "faqItem-securite-odeur",
    themeBase: "faqTheme-securite",
    q: {
      fr: "Les produits laissent-ils une odeur ou des résidus?",
      en: "Do the products leave a smell or residue?",
    },
    a: {
      fr: [
        "Très peu. Les produits homologués qu'on emploie sont faits pour être discrets une fois secs: pas d'odeur tenace, pas de film sur vos surfaces de vie. On cible les endroits où se cachent les bestioles plutôt que d'asperger toute la maison.",
      ],
      en: [
        "Very little. The approved products we use are made to be discreet once dry: no lingering smell, no film on your living surfaces. We target the spots where pests hide rather than spraying the whole house.",
      ],
    },
  },
  // Produits utilises
  {
    base: "faqItem-produits-homologues",
    themeBase: "faqTheme-traitement",
    q: {
      fr: "Vos produits sont-ils homologués par Santé Canada?",
      en: "Are your products approved by Health Canada?",
    },
    a: {
      fr: [
        "Oui, sans exception. Tout ce qu'on applique est homologué par Santé Canada et utilisé selon les doses prévues. C'est la base d'un travail fait correctement, et c'est aussi ce qui rend le traitement sûr pour votre famille une fois sec. On vous laisse toujours le détail de ce qui a été utilisé.",
      ],
      en: [
        "Yes, without exception. Everything we apply is approved by Health Canada and used at the intended doses. That is the foundation of work done right, and it is also what makes the treatment safe for your family once dry. We always leave you the details of what was used.",
      ],
    },
  },
  {
    base: "faqItem-produits-cible",
    themeBase: "faqTheme-traitement",
    q: {
      fr: "Utilisez-vous le même produit pour tous les nuisibles?",
      en: "Do you use the same product for every pest?",
    },
    a: {
      fr: [
        "Non, et c'est voulu. Une ",
        { t: "souris", ref: "service-souris-rats" },
        " ne se traite pas comme une ",
        { t: "fourmi charpentière", ref: "service-fourmis-charpentieres" },
        " ou une ",
        { t: "punaise de lit", ref: "service-punaises-de-lit" },
        ": chaque espèce a son comportement, ses cachettes et sa biologie. On choisit la méthode et le produit selon ce qu'on trouve à l'inspection, pas une recette unique pour tout.",
      ],
      en: [
        "No, by design. A ",
        { t: "mouse", ref: "service-souris-rats" },
        " is not treated like a ",
        { t: "carpenter ant", ref: "service-fourmis-charpentieres" },
        " or a ",
        { t: "bed bug", ref: "service-punaises-de-lit" },
        ": each species has its own behaviour, hiding spots and biology. We choose the method and the product based on what we find during the inspection, not one recipe for everything.",
      ],
    },
  },
  {
    base: "faqItem-produits-ipm",
    themeBase: "faqTheme-traitement",
    q: {
      fr: "C'est quoi, la gestion parasitaire intégrée?",
      en: "What is integrated pest management?",
    },
    a: {
      fr: [
        "C'est notre façon de travailler: traiter le problème, mais aussi sa cause. Plutôt que d'appliquer un produit et de partir, on identifie l'espèce, on trouve les points d'entrée, on scelle ce qui doit l'être et on vous conseille sur les conditions qui attirent les nuisibles. Moins de produit, des résultats qui durent. C'est l'approche qu'on applique partout, du résidentiel au ",
        { t: "commercial", ref: "service-commercial" },
        ".",
      ],
      en: [
        "It is how we work: treat the problem, but also its cause. Rather than applying a product and leaving, we identify the species, find the entry points, seal what needs sealing and advise you on the conditions that attract pests. Less product, results that last. It is the approach we use everywhere, from homes to ",
        { t: "commercial", ref: "service-commercial" },
        " sites.",
      ],
    },
  },
  // Delais et urgence
  {
    base: "faqItem-delai-horaire",
    themeBase: "faqTheme-intervention",
    q: {
      fr: "Travaillez-vous les soirs et les fins de semaine?",
      en: "Do you work evenings and weekends?",
    },
    a: {
      fr: [
        "Oui. Nos heures vont de 7 h à 21 h en semaine, et de 8 h à 17 h le samedi et le dimanche. Les nuisibles ne prennent pas de congé, et une infestation qui vous empêche de dormir ne devrait pas attendre lundi. Une vraie personne répond au téléphone pendant ces heures.",
      ],
      en: [
        "Yes. Our hours run from 7 a.m. to 9 p.m. on weekdays, and 8 a.m. to 5 p.m. on Saturdays and Sundays. Pests do not take days off, and an infestation keeping you up at night should not have to wait until Monday. A real person answers the phone during those hours.",
      ],
    },
  },
  {
    base: "faqItem-delai-resultats",
    themeBase: "faqTheme-intervention",
    q: {
      fr: "Combien de temps avant de voir des résultats?",
      en: "How long before I see results?",
    },
    a: {
      fr: [
        "Ça dépend du nuisible. Pour des ",
        { t: "guêpes", ref: "service-guepes-frelons" },
        ", c'est souvent réglé en une visite. Pour des ",
        { t: "souris", ref: "service-souris-rats" },
        " ou des ",
        { t: "punaises de lit", ref: "service-punaises-de-lit" },
        ", la population s'éteint sur quelques jours à quelques semaines, le temps que le traitement agisse sur tout le cycle. Votre technicien vous dit à quoi vous attendre, sans rien vous promettre d'impossible.",
      ],
      en: [
        "It depends on the pest. For ",
        { t: "wasps", ref: "service-guepes-frelons" },
        ", it is often handled in a single visit. For ",
        { t: "mice", ref: "service-souris-rats" },
        " or ",
        { t: "bed bugs", ref: "service-punaises-de-lit" },
        ", the population dies off over a few days to a few weeks, the time it takes for the treatment to work through the whole cycle. Your technician tells you what to expect, without promising the impossible.",
      ],
    },
  },
  // Prix et estimation
  {
    base: "faqItem-prix-inspection",
    themeBase: "faqTheme-tarification",
    q: {
      fr: "Le prix peut-il augmenter après l'inspection?",
      en: "Can the price go up after the inspection?",
    },
    a: {
      fr: [
        "Non. L'inspection sert justement à vous donner un prix juste et ferme avant qu'on commence. Le montant que vous acceptez est celui que vous payez, sans extra ajouté en cours de route. Si une situation imprévue change la donne, on vous en parle avant de faire quoi que ce soit, jamais après.",
      ],
      en: [
        "No. The inspection is exactly what lets us give you a fair, firm price before we start. The amount you accept is the amount you pay, with no extras added along the way. If something unexpected changes the picture, we talk to you before doing anything, never after.",
      ],
    },
  },
  {
    base: "faqItem-prix-retour",
    themeBase: "faqTheme-tarification",
    q: {
      fr: "Faut-il payer pour un retour sous garantie?",
      en: "Do I pay for a return visit under guarantee?",
    },
    a: {
      fr: [
        "Jamais. Si l'activité réapparaît pendant la période couverte, le retour est inclus, sans frais. C'est le principe même de la garantie: vous payez pour un résultat, pas pour un nombre de visites.",
      ],
      en: [
        "Never. If activity returns during the covered period, the follow-up is included, at no charge. That is the whole point of the guarantee: you pay for a result, not for a number of visits.",
      ],
    },
  },
  {
    base: "faqItem-prix-forfaits",
    themeBase: "faqTheme-tarification",
    q: {
      fr: "Proposez-vous des forfaits pour les immeubles ou les commerces?",
      en: "Do you offer packages for buildings or businesses?",
    },
    a: {
      fr: [
        "Oui. Pour les propriétaires d'immeubles et les ",
        { t: "commerces", ref: "service-commercial" },
        ", on met en place des programmes d'entretien avec des visites planifiées et des rapports de suivi, à un tarif pensé pour le long terme plutôt que coup par coup. On bâtit le forfait selon votre réalité après une première visite.",
      ],
      en: [
        "Yes. For building owners and ",
        { t: "commercial", ref: "service-commercial" },
        " clients, we set up maintenance programs with scheduled visits and follow-up reports, priced for the long term rather than one-off calls. We build the package around your situation after a first visit.",
      ],
    },
  },
  // Garantie
  {
    base: "faqItem-garantie-duree",
    themeBase: "faqTheme-garantie",
    q: {
      fr: "Combien de temps dure la garantie?",
      en: "How long does the guarantee last?",
    },
    a: {
      fr: [
        "La période dépend du nuisible et du traitement, et elle est écrite noir sur blanc sur votre devis avant qu'on commence. Pour la plupart des interventions résidentielles, elle couvre largement le temps nécessaire pour confirmer que le problème est réglé. Vous n'avez jamais à deviner: c'est sur papier.",
      ],
      en: [
        "The period depends on the pest and the treatment, and it is spelled out in writing on your quote before we start. For most residential jobs, it comfortably covers the time needed to confirm the problem is gone. You never have to guess: it is on paper.",
      ],
    },
  },
  {
    base: "faqItem-garantie-couvre",
    themeBase: "faqTheme-garantie",
    q: {
      fr: "Qu'est-ce que la garantie couvre exactement?",
      en: "What exactly does the guarantee cover?",
    },
    a: {
      fr: [
        "Le retour de l'activité qu'on a traitée. Si l'espèce visée réapparaît pendant la période couverte, on revient l'inspecter et la traiter sans frais. La garantie suppose qu'on a pu faire le travail au complet et que les conseils de prévention ont été suivis: votre technicien vous explique tout ça clairement, sans petits caractères.",
      ],
      en: [
        "The return of the activity we treated. If the targeted species comes back during the covered period, we return to inspect and treat it at no charge. The guarantee assumes we were able to do the full job and that the prevention advice was followed: your technician explains all of it clearly, with no fine print.",
      ],
    },
  },
  // Prevention
  {
    base: "faqItem-prevention-souris",
    themeBase: "faqTheme-prevention",
    q: {
      fr: "Comment éviter que les souris reviennent à l'automne?",
      en: "How do I keep mice from coming back in the fall?",
    },
    a: {
      fr: [
        "Les souris cherchent la chaleur dès les premiers froids. Le plus efficace, c'est de leur fermer la porte: sceller les ouvertures de la taille d'un crayon autour des tuyaux, des fondations et des portes de garage, et ne pas laisser de nourriture accessible. On couvre les réflexes saisonniers dans notre ",
        { t: "guide sur les souris", ref: "article-souris" },
        ", et on s'occupe du scellement quand on traite une ",
        { t: "infestation de souris", ref: "service-souris-rats" },
        ".",
      ],
      en: [
        "Mice look for warmth as soon as the cold sets in. The most effective move is to shut the door on them: seal pencil-sized openings around pipes, foundations and garage doors, and leave no food within reach. We cover the seasonal reflexes in our ",
        { t: "guide on mice", ref: "article-souris" },
        ", and we handle the sealing when we treat a ",
        { t: "mouse infestation", ref: "service-souris-rats" },
        ".",
      ],
    },
  },
  {
    base: "faqItem-prevention-fourmis",
    themeBase: "faqTheme-prevention",
    q: {
      fr: "Comment prévenir les fourmis charpentières?",
      en: "How do I prevent carpenter ants?",
    },
    a: {
      fr: [
        "Elles sont attirées par le bois humide. Gardez le bois de chauffage loin de la maison, réglez les fuites et les gouttières qui mouillent les murs, et taillez les branches qui touchent la toiture. On détaille tout ça dans notre ",
        { t: "article sur les fourmis charpentières", ref: "article-fourmis" },
        "; si elles sont déjà installées, c'est notre ",
        { t: "service de fourmis charpentières", ref: "service-fourmis-charpentieres" },
        " qui prend le relais.",
      ],
      en: [
        "They are drawn to damp wood. Keep firewood away from the house, fix the leaks and gutters that wet the walls, and trim branches that touch the roof. We lay it all out in our ",
        { t: "article on carpenter ants", ref: "article-fourmis" },
        "; if they are already settled in, our ",
        { t: "carpenter ant service", ref: "service-fourmis-charpentieres" },
        " takes over.",
      ],
    },
  },
  {
    base: "faqItem-prevention-punaises",
    themeBase: "faqTheme-prevention",
    q: {
      fr: "Comment éviter de rapporter des punaises de lit en voyage?",
      en: "How do I avoid bringing bed bugs home from a trip?",
    },
    a: {
      fr: [
        "Au retour de voyage, inspectez vos bagages avant de les rentrer, passez les vêtements à la sécheuse à haute température et gardez la valise loin du lit. Quelques réflexes simples évitent bien des soucis: on les a rassemblés dans notre ",
        { t: "guide sur les punaises de lit", ref: "article-punaises" },
        ". Et si le doute s'installe, mieux vaut faire vérifier que d'attendre.",
      ],
      en: [
        "Back from a trip, inspect your luggage before bringing it inside, run clothes through the dryer on high heat and keep the suitcase away from the bed. A few simple reflexes save a lot of trouble: we have gathered them in our ",
        { t: "guide on bed bugs", ref: "article-punaises" },
        ". And if doubt sets in, better to have it checked than to wait.",
      ],
    },
  },
  {
    base: "faqItem-prevention-programme",
    themeBase: "faqTheme-prevention",
    q: {
      fr: "Offrez-vous un programme d'entretien préventif?",
      en: "Do you offer a preventive maintenance program?",
    },
    a: {
      fr: [
        "Oui. Pour les gens qui préfèrent prévenir, on met en place des visites planifiées qui gardent les nuisibles à distance avant qu'ils s'installent. C'est surtout demandé par les ",
        { t: "commerces", ref: "service-commercial" },
        " et les immeubles, mais c'est offert au résidentiel aussi. On bâtit le calendrier selon votre bâtiment et votre secteur.",
      ],
      en: [
        "Yes. For people who would rather prevent than react, we set up scheduled visits that keep pests at bay before they settle in. It is mostly asked for by ",
        { t: "commercial", ref: "service-commercial" },
        " clients and buildings, but it is available for homes too. We build the schedule around your property and your area.",
      ],
    },
  },
]

// ── Sections de /faq (ordre du repertoire) ────────────────────────────────────
const SECTIONS = [
  { themeBase: "faqTheme-securite", items: ["faqItem-securite", "faqItem-securite-ecart", "faqItem-securite-animaux", "faqItem-securite-odeur"] },
  { themeBase: "faqTheme-traitement", items: ["faqItem-produits", "faqItem-produits-homologues", "faqItem-produits-cible", "faqItem-produits-ipm"] },
  { themeBase: "faqTheme-intervention", items: ["faqItem-delai", "faqItem-delai-horaire", "faqItem-delai-resultats"] },
  { themeBase: "faqTheme-tarification", items: ["faqItem-prix", "faqItem-prix-inspection", "faqItem-prix-retour", "faqItem-prix-forfaits"] },
  { themeBase: "faqTheme-garantie", items: ["faqItem-garantie", "faqItem-garantie-duree", "faqItem-garantie-couvre"] },
  { themeBase: "faqTheme-prevention", items: ["faqItem-prevention-souris", "faqItem-prevention-fourmis", "faqItem-prevention-punaises", "faqItem-prevention-programme"] },
]

// ── Construction des documents ────────────────────────────────────────────────
function themeDoc(base, lang, def) {
  return {
    _id: base + "-" + lang,
    _type: "faqTheme",
    language: lang,
    title: def.title,
    slug: { _type: "slug", current: def.slug },
  }
}
function itemDoc(it, lang) {
  return {
    _id: it.base + "-" + lang,
    _type: "faqItem",
    language: lang,
    question: it.q[lang],
    answer: pt(it.a[lang], lang),
    theme: { _type: "reference", _ref: it.themeBase + "-" + lang },
  }
}
function tmDoc(base, type) {
  return {
    _id: "translation-" + base,
    _type: "translation.metadata",
    schemaTypes: [type],
    translations: LANGS.map((lang) => ({
      _key: lang,
      _type: "internationalizedArrayReferenceValue",
      language: lang,
      value: { _type: "reference", _ref: base + "-" + lang, _weak: true, _strengthenOnPublish: { type } },
    })),
  }
}
function sectionsFor(lang) {
  return SECTIONS.map((s) => ({
    _key: s.themeBase,
    theme: { _type: "reference", _ref: s.themeBase + "-" + lang },
    mode: "manual",
    items: s.items.map((b) => ({ _type: "reference", _ref: b + "-" + lang, _key: b })),
  }))
}

// ── LIVE ──────────────────────────────────────────────────────────────────────
async function migrateLive() {
  const tx = client.transaction()
  // Themes recadres
  for (const u of THEME_UPDATES) {
    for (const lang of LANGS) {
      tx.patch(u.id + "-" + lang, {
        set: { title: u[lang].title, slug: { _type: "slug", current: u[lang].slug } },
      })
    }
  }
  // Themes neufs + tm
  for (const t of THEME_NEW) {
    for (const lang of LANGS) tx.createOrReplace(themeDoc(t.base, lang, t[lang]))
    tx.createOrReplace(tmDoc(t.base, "faqTheme"))
  }
  // Items neufs + tm
  for (const it of ITEMS_NEW) {
    for (const lang of LANGS) tx.createOrReplace(itemDoc(it, lang))
    tx.createOrReplace(tmDoc(it.base, "faqItem"))
  }
  // Items recibles (theme seulement)
  for (const r of ITEMS_REPOINT) {
    for (const lang of LANGS) {
      tx.patch(r.id + "-" + lang, {
        set: { theme: { _type: "reference", _ref: r.themeBase + "-" + lang } },
      })
    }
  }
  // faqPage.sections
  for (const lang of LANGS) {
    tx.patch("faqPage-" + lang, { set: { sections: sectionsFor(lang) } })
  }
  if (DRY) {
    console.log("  LIVE (DRY): " + THEME_UPDATES.length * 2 + " themes recadres, " + THEME_NEW.length * 2 + " themes neufs, " + ITEMS_NEW.length * 2 + " items neufs, " + ITEMS_REPOINT.length * 2 + " recibles, 2 faqPage, +tm.")
    return
  }
  await tx.commit({ visibility: "sync" })
  console.log("  LIVE: transaction commitee.")
}

// ── SEED (miroir) ─────────────────────────────────────────────────────────────
function upsert(seed, type, content) {
  const i = seed.documents.findIndex((d) => d.content && d.content._id === content._id)
  if (i >= 0) seed.documents[i] = { type, content }
  else seed.documents.push({ type, content })
}
function patchSeed(seed, id, fn) {
  const d = seed.documents.find((x) => x.content && x.content._id === id)
  if (!d) throw new Error("seed introuvable: " + id)
  fn(d.content)
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, "utf8"))
  // Themes recadres (titre + slug)
  for (const u of THEME_UPDATES) {
    for (const lang of LANGS) {
      patchSeed(seed, u.id + "-" + lang, (c) => {
        c.title = u[lang].title
        c.slug = { _type: "slug", current: u[lang].slug }
      })
    }
  }
  // Themes neufs (+ tm). Le seed faqTheme omet _type (patron existant).
  for (const t of THEME_NEW) {
    for (const lang of LANGS) {
      const doc = themeDoc(t.base, lang, t[lang])
      delete doc._type
      upsert(seed, "faqTheme", doc)
    }
    upsert(seed, "translation.metadata", tmDoc(t.base, "faqTheme"))
  }
  // Items neufs (+ tm)
  for (const it of ITEMS_NEW) {
    for (const lang of LANGS) upsert(seed, "faqItem", itemDoc(it, lang))
    upsert(seed, "translation.metadata", tmDoc(it.base, "faqItem"))
  }
  // Items recibles
  for (const r of ITEMS_REPOINT) {
    for (const lang of LANGS) {
      patchSeed(seed, r.id + "-" + lang, (c) => {
        c.theme = { _type: "reference", _ref: r.themeBase + "-" + lang }
      })
    }
  }
  // faqPage.sections
  for (const lang of LANGS) {
    patchSeed(seed, "faqPage-" + lang, (c) => {
      c.sections = sectionsFor(lang)
    })
  }
  if (DRY) {
    console.log("  SEED (DRY): miroir pret.")
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + "\n")
  console.log("  seed-content.json: miroir ecrit.")
}

async function main() {
  console.log("FAQ /faq, 6 themes fins (dataset " + client.config().dataset + ")")
  await migrateLive()
  migrateSeed()
  console.log("Termine.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
