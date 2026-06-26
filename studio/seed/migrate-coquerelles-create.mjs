// Lot service détail, sous-étape C — CRÉATION du 6e service: coquerelles.
// Service neuf (pas un rebuild): document fr+en complet (carte + detailHero masthead +
// pageBuilder sur le modèle validé), faqTheme + 5 faqItems, un témoignage (Laval),
// et toutes les translation.metadata par paire.
//
// Image: detailHero = coquerelle germanique sur fond blanc GÉNÉRÉE (nano-banana-pro),
// public/images/hero-coquerelle.jpg, téléversée comme asset + altText bilingue. Carte
// = hero-technicien (comme les autres). Editorial aside = inspection-rempart.
//
// Ménage lié: le service COMMERCIAL portait l'ancienne image de coquerelle (hero-roach,
// alt « Coquerelle sur fond blanc ») en placeholder. Coquerelles prend l'identité du
// nuisible; commercial bascule sur hero-techVan (camionnette, plus juste pour le B2B).
//
// Live (vrais refs, asset téléversé) puis miroir seed (IMG:). Idempotent.
//
// Usage:  node studio/seed/migrate-coquerelles-create.mjs [--dry-run]

import { createClient } from '@sanity/client'
import { readFileSync, writeFileSync, createReadStream } from 'node:fs'
import { homedir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DRY = process.argv.includes('--dry-run')
const here = dirname(fileURLToPath(import.meta.url))
const seedPath = join(here, '..', 'seed-content.json')
const repoRoot = join(here, '..', '..')

function readToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  const cfg = JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'))
  if (cfg.authToken) return cfg.authToken
  throw new Error('Aucun token Sanity.')
}

const client = createClient({ projectId: '5if00rwn', dataset: 'production', apiVersion: '2024-10-01', token: readToken(), useCdn: false })

const ref = (id) => ({ _type: 'reference', _ref: id })
const figure = (assetRef) => ({ _type: 'figure', image: { _type: 'image', asset: { _ref: assetRef, _type: 'reference' } } })
const IMG_INSPECTION_REAL = 'image-63ce3125380e4bf9994b4261b970c11d5b098d48-1200x896-jpg' // inspection-rempart (paysage)
const ROACH_FILE = join(repoRoot, 'public', 'images', 'hero-coquerelle.jpg')
const ROACH_ALT = { fr: 'Coquerelle germanique en gros plan sur fond blanc', en: 'German cockroach in close-up on a white background' }

function answer(parts) {
  const children = []; const markDefs = []
  parts.forEach((p, i) => {
    if (p.ref) { const mk = `l${i}`; markDefs.push({ _key: mk, _type: 'link', type: 'internal', internalRef: ref(p.ref) }); children.push({ _key: `a0s${i}`, _type: 'span', marks: [mk], text: p.text }) }
    else children.push({ _key: `a0s${i}`, _type: 'span', marks: [], text: p.text })
  })
  return [{ _type: 'block', _key: 'a0', style: 'normal', markDefs, children }]
}
const para = (key, text, style = 'normal') => ({ _type: 'block', _key: key, style, markDefs: [], children: [{ _type: 'span', _key: key + 's', text, marks: [] }] })

const SLUG = 'coquerelles'
const TESTI_KEY = 'rousseau' // témoignage nommé par patronyme, comme les existants (lemieux, benali...)
const THEME = { fr: { title: 'Coquerelles', slug: 'coquerelles' }, en: { title: 'Cockroaches', slug: 'cockroaches' } }
const ORDER = ['cuisine', 'sante', 'soi-meme', 'recidive', 'zone']

// Libellés PARTAGÉS entre services (mêmes bytes que fourmis: apostrophes courbes
// d'origine pour rester cohérent avec les autres pages).
const SHARED = {
  fr: { heroEyebrow: 'Service d’extermination', processEyebrow: 'Comment on intervient', tmEyebrow: 'Ce qu’on dit de nous', tmHeading: 'Ce qu’en disent nos clients', call: 'Appeler maintenant', estimate: 'Obtenir une estimation' },
  en: { heroEyebrow: 'Pest control service', processEyebrow: 'How we work', tmEyebrow: 'What clients say', tmHeading: 'What our clients say', call: 'Call now', estimate: 'Get an estimate' },
}

const SERVICE = {
  fr: {
    title: 'Coquerelles', slug: 'extermination-coquerelles',
    summary: "Elles envahissent la cuisine la nuit et se reproduisent vite. On traite les refuges à la source avec des appâts homologués, pas un nuage d'aérosol.",
    heroLead: "Elles se cachent le jour et envahissent la cuisine la nuit. On traite les refuges à la source.",
  },
  en: {
    title: 'Cockroaches', slug: 'cockroach-extermination',
    summary: "They invade the kitchen at night and breed fast. We treat the harbourages at the source with approved baits, not a cloud of spray.",
    heroLead: "They hide by day and invade the kitchen at night. We treat the harbourages at the source.",
  },
}

const TESTI = {
  fr: { quote: "Coquerelles dans la cuisine d'un triplex. Ils ont trouvé les foyers derrière les électroménagers, posé des appâts et sont revenus vérifier. Trois semaines plus tard, plus rien.", name: 'Daniel Rousseau', context: 'Propriétaire à Laval' },
  en: { quote: "Cockroaches in the kitchen of a triplex. They found the hot spots behind the appliances, set baits and came back to check. Three weeks later, nothing left.", name: 'Daniel Rousseau', context: 'Homeowner in Laval' },
}

const ITEMS = {
  fr: {
    cuisine: { q: "Pourquoi toujours dans la cuisine?", a: answer([{ text: "La coquerelle germanique cherche la chaleur, l'humidité et la nourriture: derrière les électroménagers, sous l'évier, dans la plomberie. Elle se cache le jour et sort la nuit. C'est là qu'on cible le traitement." }]) },
    sante: { q: "Est-ce un risque pour la santé?", a: answer([{ text: "Oui. Les coquerelles contaminent la nourriture et leurs déjections peuvent déclencher allergies et asthme, surtout chez les enfants. On les traite à la source avec des produits homologués Santé Canada." }]) },
    'soi-meme': { q: "Les produits du commerce suffisent-ils?", a: answer([{ text: "Rarement. Les coquerelles se reproduisent vite et résistent à plusieurs aérosols; sans traiter les refuges cachés, la population repart. On utilise des appâts professionnels placés aux bons endroits." }]) },
    recidive: { q: "Comment éviter qu'elles reviennent?", a: answer([{ text: "En traitant les refuges, en scellant les fissures et en gardant les surfaces sèches et propres. On revient confirmer le résultat, et la garantie écrite couvre un retour." }]) },
    zone: { q: "Desservez-vous mon secteur sur la Rive-Nord?", a: answer([{ text: "Oui, de " }, { text: "Laval", ref: 'serviceCity-laval-fr' }, { text: " à " }, { text: "Terrebonne", ref: 'serviceCity-terrebonne-fr' }, { text: " et toute la couronne nord. Un technicien d'ici se déplace, souvent sous 24 à 48 h." }]) },
  },
  en: {
    cuisine: { q: "Why always in the kitchen?", a: answer([{ text: "The German cockroach seeks warmth, moisture and food: behind appliances, under the sink, in the plumbing. It hides by day and comes out at night. That is where we target the treatment." }]) },
    sante: { q: "Is it a health risk?", a: answer([{ text: "Yes. Cockroaches contaminate food and their droppings can trigger allergies and asthma, especially in children. We treat them at the source with Health Canada approved products." }]) },
    'soi-meme': { q: "Are store-bought products enough?", a: answer([{ text: "Rarely. Cockroaches breed fast and resist many sprays; without treating the hidden harbourages, the population bounces back. We use professional baits placed in the right spots." }]) },
    recidive: { q: "How do I keep them from coming back?", a: answer([{ text: "By treating the harbourages, sealing cracks and keeping surfaces dry and clean. We come back to confirm the result, and the written guarantee covers a return." }]) },
    zone: { q: "Do you serve my area on the North Shore?", a: answer([{ text: "Yes, from " }, { text: "Laval", ref: 'serviceCity-laval-en' }, { text: " to " }, { text: "Terrebonne", ref: 'serviceCity-terrebonne-en' }, { text: " and the whole north crown. A local technician heads out, often within 24 to 48 hours." }]) },
  },
}

const BLOCKS = {
  fr: {
    trustBar: { _key: 'pb-trust', _type: 'trustBar', items: [
      { _key: 't1', _type: 'proof', icon: 'lucide:award', value: 'Membre ASTTQ', label: 'gestion parasitaire du Québec' },
      { _key: 't2', _type: 'proof', icon: 'lucide:leaf', value: 'Produits homologués', label: 'Santé Canada, sûrs pour la famille' },
      { _key: 't3', _type: 'proof', icon: 'lucide:clock', value: 'Sous 24 à 48 h', label: 'intervention 7 jours sur 7' },
      { _key: 't4', _type: 'proof', icon: 'lucide:badge-check', value: 'Garantie écrite', label: 'retour sans frais' },
    ] },
    editorial: {
      eyebrow: 'Le nuisible en détail', heading: 'Comprendre une infestation de coquerelles',
      lead: "Elles se cachent le jour et envahissent la cuisine la nuit. Une coquerelle vue, c'est souvent des dizaines cachées. On traite les refuges, pas seulement ce qui se voit.",
      body: [
        para('e1', "La coquerelle germanique aime la chaleur, l'humidité et la nourriture: derrière les électroménagers, sous l'évier, dans les fissures de la cuisine et de la salle de bain. Elle est nocturne; en voir une le jour annonce souvent une population déjà installée. Elle se reproduit vite, ce qui la rend tenace."),
        para('e2h', "Des appâts ciblés, pas un nuage d'aérosol", 'h3'),
        para('e2', "Les aérosols du commerce dispersent les coquerelles sans toucher les refuges, et la population repart. On utilise des appâts professionnels homologués placés aux points stratégiques, on traite à la source, puis on revient confirmer qu'il n'en reste pas."),
      ],
    },
    highlights: { heading: "Ce que comprend l'intervention", items: [
      { _key: 'benefit-0', _type: 'highlight', title: 'Garantie écrite, retour sans frais', body: "Si les coquerelles reviennent dans la période couverte, on retraite sans vous refacturer." },
      { _key: 'benefit-1', _type: 'highlight', title: 'Appâts professionnels, sûrs pour la famille', body: "Des appâts homologués Santé Canada placés hors de portée, sans nuage d'aérosol dans la cuisine." },
      { _key: 'benefit-2', _type: 'highlight', title: 'Intervention sous 24 à 48 h', body: "Une vraie personne répond 7 jours sur 7 et un technicien d'ici part vers vous rapidement." },
      { _key: 'benefit-3', _type: 'highlight', title: 'Traitement des refuges, rapport écrit', body: "On traite là où elles se cachent et on note les points à corriger pour éviter une récidive." },
    ] },
    faq: { eyebrow: "Avant d'appeler", heading: 'Vos questions sur les coquerelles' },
    process: { heading: 'Comment on traite une infestation de coquerelles', lead: "On vise les refuges et la reproduction, pas seulement les coquerelles visibles.", steps: [
      { _key: 's1', _type: 'processStep', title: 'Inspection des refuges', body: "On repère les foyers chauds et humides: électroménagers, plomberie, fissures, là où elles se cachent et se reproduisent." },
      { _key: 's2', _type: 'processStep', title: 'Appâts ciblés et traitement à la source', body: "Des appâts professionnels homologués placés aux points stratégiques, sans aérosol qui les disperse." },
      { _key: 's3', _type: 'processStep', title: 'Contrôle de suivi et garantie écrite', body: "On revient confirmer qu'il n'en reste pas; la garantie tient jusqu'à ce que ce soit réglé." },
    ] },
    cta: { title: 'Des coquerelles dans la cuisine? On les sort pour de bon.', subtitle: "Un appel, un technicien certifié traite à la source, souvent sous 24 à 48 h. Garantie écrite." },
  },
  en: {
    trustBar: { _key: 'pb-trust', _type: 'trustBar', items: [
      { _key: 't1', _type: 'proof', icon: 'lucide:award', value: 'ASTTQ member', label: 'Quebec pest management' },
      { _key: 't2', _type: 'proof', icon: 'lucide:leaf', value: 'Approved products', label: 'Health Canada, family-safe' },
      { _key: 't3', _type: 'proof', icon: 'lucide:clock', value: 'Within 24 to 48 h', label: 'service seven days a week' },
      { _key: 't4', _type: 'proof', icon: 'lucide:badge-check', value: 'Written guarantee', label: 'free return visit' },
    ] },
    editorial: {
      eyebrow: 'The pest in detail', heading: 'Understanding a cockroach infestation',
      lead: "They hide by day and take over the kitchen at night. One cockroach in sight often means dozens out of sight. We treat the harbourages, not just what you can see.",
      body: [
        para('e1', "The German cockroach likes warmth, moisture and food: behind appliances, under the sink, in the cracks of the kitchen and bathroom. It is nocturnal; seeing one in daylight often signals a population already settled in. It breeds fast, which makes it stubborn."),
        para('e2h', "Targeted baits, not a cloud of spray", 'h3'),
        para('e2', "Store-bought sprays scatter cockroaches without reaching the harbourages, and the population bounces back. We use approved professional baits placed at the key points, treat at the source, then come back to confirm none are left."),
      ],
    },
    highlights: { heading: "What the service includes", items: [
      { _key: 'benefit-0', _type: 'highlight', title: 'Written guarantee, free return visit', body: "If the cockroaches come back within the covered period, we re-treat at no extra charge." },
      { _key: 'benefit-1', _type: 'highlight', title: 'Professional baits, family-safe', body: "Health Canada approved baits placed out of reach, with no cloud of spray in the kitchen." },
      { _key: 'benefit-2', _type: 'highlight', title: 'On site within 24 to 48 h', body: "A real person answers seven days a week and a local technician heads your way quickly." },
      { _key: 'benefit-3', _type: 'highlight', title: 'Harbourage treatment, written report', body: "We treat where they hide and note the points to fix to avoid a return." },
    ] },
    faq: { eyebrow: 'Before you call', heading: 'Your questions about cockroaches' },
    process: { heading: 'How we treat a cockroach infestation', lead: "We target the harbourages and the breeding, not just the cockroaches in sight.", steps: [
      { _key: 's1', _type: 'processStep', title: 'Harbourage inspection', body: "We find the warm, humid hot spots: appliances, plumbing, cracks, where they hide and breed." },
      { _key: 's2', _type: 'processStep', title: 'Targeted baits and source treatment', body: "Approved professional baits placed at the key points, without spray that scatters them." },
      { _key: 's3', _type: 'processStep', title: 'Follow-up check and written guarantee', body: "We come back to confirm none are left; the guarantee holds until it is solved." },
    ] },
    cta: { title: 'Cockroaches in the kitchen? We get them out for good.', subtitle: "One call and a certified technician treats at the source, often within 24 to 48 hours. Written guarantee." },
  },
}

function editorialBlock(lang, asideRef) {
  const e = BLOCKS[lang].editorial
  return {
    _key: 'pb-editorial', _type: 'editorial', eyebrow: e.eyebrow, heading: e.heading, lead: e.lead,
    segments: [
      { _key: 'seg0', _type: 'editorialSegment', disposition: 'aside', mediaSide: 'right', body: e.body, media: [{ _key: 'm1', _type: 'figure', image: { _type: 'image', asset: { _ref: asideRef, _type: 'reference' } } }] },
    ],
  }
}
function faqBlock(lang) {
  const b = BLOCKS[lang].faq
  return { _key: 'pb-faq', _type: 'faq', eyebrow: b.eyebrow, heading: b.heading, items: ORDER.map((k, i) => ({ ...ref(`faqItem-${SLUG}-${k}-${lang}`), _key: `fq${i}` })) }
}
function buildPageBuilder(lang, asideRef) {
  const B = BLOCKS[lang], S = SHARED[lang]
  return [
    B.trustBar,
    editorialBlock(lang, asideRef),
    { _key: 'pb-hl', _type: 'highlights', heading: B.highlights.heading, items: B.highlights.items },
    faqBlock(lang),
    { _key: 'pb-proc', _type: 'process', eyebrow: S.processEyebrow, heading: B.process.heading, lead: B.process.lead, steps: B.process.steps },
    { _key: 'pb-tm', _type: 'testimonials', eyebrow: S.tmEyebrow, heading: S.tmHeading, limit: 3, mode: 'service', service: ref(`service-${SLUG}-${lang}`) },
    { _key: 'pb-cta', _type: 'ctaBand', title: B.cta.title, subtitle: B.cta.subtitle, primaryCta: { _type: 'link', label: S.call, type: 'tel' }, secondaryCta: { _type: 'link', anchor: 'contact', internalRef: ref(`contactPage-${lang}`), label: S.estimate, type: 'anchor' } },
  ]
}
function serviceDoc(lang, assets) {
  const s = SERVICE[lang], S = SHARED[lang]
  return {
    _id: `service-${SLUG}-${lang}`, _type: 'service', language: lang,
    icon: 'lucide:utensils', title: s.title, slug: { _type: 'slug', current: s.slug },
    summary: s.summary, image: figure(assets.card), order: 6, featured: false,
    hero: [{ _key: 'hero-coquerelle', _type: 'detailHero', eyebrow: S.heroEyebrow, title: s.title, lead: s.heroLead, image: figure(assets.hero) }],
    pageBuilder: buildPageBuilder(lang, assets.aside),
  }
}
function testimonialDoc(lang) {
  const t = TESTI[lang]
  return { _id: `testimonial-${TESTI_KEY}-${lang}`, _type: 'testimonial', language: lang, quote: t.quote, name: t.name, context: t.context, service: ref(`service-${SLUG}-${lang}`), city: ref(`serviceCity-laval-${lang}`), featured: true, order: 7 }
}
function themeDoc(lang) { return { _id: `faqTheme-${SLUG}-${lang}`, _type: 'faqTheme', language: lang, title: THEME[lang].title, slug: { _type: 'slug', current: THEME[lang].slug } } }
function itemDoc(lang, k) { const it = ITEMS[lang][k]; return { _id: `faqItem-${SLUG}-${k}-${lang}`, _type: 'faqItem', language: lang, question: it.q, answer: it.a, theme: ref(`faqTheme-${SLUG}-${lang}`) } }
function tmDoc(id, schemaType, frId, enId) {
  const tval = (lang, vid) => ({ _key: lang, _type: 'internationalizedArrayReferenceValue', language: lang, value: { _type: 'reference', _ref: vid, _weak: true, _strengthenOnPublish: { type: schemaType } } })
  return { _id: id, _type: 'translation.metadata', schemaTypes: [schemaType], translations: [tval('fr', frId), tval('en', enId)] }
}

const LANGS = ['fr', 'en']

// Tous les documents neufs (service + faq + témoignage + translation.metadata), avec
// les refs d'asset passées (réelles en live, IMG: en seed).
function allDocs(assets) {
  const out = []
  for (const lang of LANGS) {
    out.push(serviceDoc(lang, assets))
    out.push(testimonialDoc(lang))
    out.push(themeDoc(lang))
    for (const k of ORDER) out.push(itemDoc(lang, k))
  }
  out.push(tmDoc(`translation-service-${SLUG}`, 'service', `service-${SLUG}-fr`, `service-${SLUG}-en`))
  out.push(tmDoc(`translation-testimonial-${TESTI_KEY}`, 'testimonial', `testimonial-${TESTI_KEY}-fr`, `testimonial-${TESTI_KEY}-en`))
  out.push(tmDoc(`translation-faqTheme-${SLUG}`, 'faqTheme', `faqTheme-${SLUG}-fr`, `faqTheme-${SLUG}-en`))
  for (const k of ORDER) out.push(tmDoc(`translation-faqItem-${SLUG}-${k}`, 'faqItem', `faqItem-${SLUG}-${k}-fr`, `faqItem-${SLUG}-${k}-en`))
  return out
}
// Type seed (wrapper { type, content }) déduit du _id.
function seedType(id) {
  if (id.startsWith('service-')) return 'service'
  if (id.startsWith('testimonial-')) return 'testimonial'
  if (id.startsWith('faqTheme-')) return 'faqTheme'
  if (id.startsWith('faqItem-')) return 'faqItem'
  if (id.startsWith('translation-')) return 'translation.metadata'
  throw new Error(`type seed inconnu: ${id}`)
}

async function resolveRoachAsset() {
  const fn = 'hero-coquerelle.jpg'
  const existing = await client.fetch('*[_type == "sanity.imageAsset" && originalFilename == $fn][0]._id', { fn })
  if (existing) { console.log(`  asset coquerelle réutilisé -> ${existing}`); await client.patch(existing).set({ altText: ROACH_ALT }).commit(); return existing }
  const asset = await client.assets.upload('image', createReadStream(ROACH_FILE), { filename: fn })
  await client.patch(asset._id).set({ altText: ROACH_ALT }).commit()
  console.log(`  asset coquerelle téléversé -> ${asset._id}`)
  return asset._id
}

async function migrateLive() {
  // Refs d'asset live: detailHero coquerelle (téléversé), carte (hero-technicien depuis
  // fourmis), aside éditorial (inspection-rempart), commercial -> hero-techVan (contact).
  const roachRef = DRY ? 'IMG:hero-coquerelle(DRY)' : await resolveRoachAsset()
  const fourmis = await client.getDocument('service-fourmis-charpentieres-fr')
  const cardRef = fourmis?.image?.image?.asset?._ref
  const contact = await client.getDocument('contactPage-fr')
  const vanRef = contact?.hero?.[0]?.image?.image?.asset?._ref
  if (!cardRef || !vanRef) throw new Error('Réf carte (hero-technicien) ou van (hero-techVan) introuvable en live.')

  const docs = allDocs({ card: cardRef, hero: roachRef, aside: IMG_INSPECTION_REAL })
  if (DRY) {
    console.log(`  live: ${docs.length} doc(s) à créer:`)
    console.log('    ' + docs.map((d) => d._id).join('\n    '))
    console.log(`  commercial-fr/en hero -> hero-techVan (${vanRef})`)
    return
  }
  let tx = client.transaction()
  for (const d of docs) tx = tx.createOrReplace(d)
  await tx.commit({ visibility: 'sync' })
  console.log(`  live: ${docs.length} doc(s) créés/remplacés.`)
  for (const lang of LANGS) {
    await client.patch(`service-commercial-${lang}`).set({ 'hero[0].image': figure(vanRef) }).commit({ visibility: 'sync' })
    console.log(`  service-commercial-${lang}: hero -> hero-techVan.`)
  }
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
  const have = new Set(seed.documents.map((d) => d.content?._id).filter(Boolean))
  const docs = allDocs({ card: 'IMG:hero-technicien', hero: 'IMG:hero-coquerelle', aside: 'IMG:inspection-rempart' })
  let added = 0
  for (const c of docs) { if (have.has(c._id)) continue; seed.documents.push({ type: seedType(c._id), content: c }); have.add(c._id); added++ }
  // Commercial bascule sur hero-techVan dans le seed aussi.
  let reassigned = 0
  for (const d of seed.documents) {
    if (d.type === 'service' && /^service-commercial-/.test(d.content._id)) {
      const h = d.content.hero?.[0]
      if (h && h.image?.image?.asset?._ref !== 'IMG:hero-techVan') { h.image = figure('IMG:hero-techVan'); reassigned++ }
    }
  }
  if (DRY) { console.log(`  seed: +${added} doc(s), commercial réassigné: ${reassigned} (DRY).`); return }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n')
  console.log(`  seed-content.json: +${added} doc(s), commercial réassigné: ${reassigned}.`)
}

async function main() {
  console.log(`Sous-étape C, CRÉATION service coquerelles (dataset ${client.config().dataset})`)
  await migrateLive()
  migrateSeed()
  console.log('Terminé.')
}
main().catch((e) => { console.error(e); process.exit(1) })
