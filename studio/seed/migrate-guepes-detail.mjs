// Lot service détail, sous-étape C (modèle fourmis/souris) — service guêpes et frelons.
// Aligne la page sur le modèle validé:
//   trustBar > editorial riche > highlights (bénéfices) > faq par nuisible (PT,
//   maillage, visuel seulement) > process propre aux guêpes > testimonials > ctaBand.
//
// Contenu PROPRE aux guêpes (pas de copier-coller): saison, repérage du va-et-vient,
// danger d'allergie, « on traite à la source avant de sceller, jamais l'inverse ».
// Editorial = UN aside équilibré (modèle souris), image paysage inspection-rempart.
// Crée faqTheme-guepes-frelons + 5 faqItems fr+en + translation.metadata. Pas de
// schéma neuf. Live (vrai ref) puis miroir seed (IMG:). Idempotent (saute si faq présent).
//
// Usage:  node studio/seed/migrate-guepes-detail.mjs [--dry-run]

import { createClient } from '@sanity/client'
import { readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DRY = process.argv.includes('--dry-run')
const here = dirname(fileURLToPath(import.meta.url))
const seedPath = join(here, '..', 'seed-content.json')

function readToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  const cfg = JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'))
  if (cfg.authToken) return cfg.authToken
  throw new Error('Aucun token Sanity.')
}

const client = createClient({ projectId: '5if00rwn', dataset: 'production', apiVersion: '2024-10-01', token: readToken(), useCdn: false })

const ref = (id) => ({ _type: 'reference', _ref: id })
const IMG_REAL = 'image-63ce3125380e4bf9994b4261b970c11d5b098d48-1200x896-jpg' // inspection-rempart (paysage)
const IMG_SEED = 'IMG:inspection-rempart'

function answer(parts) {
  const children = []; const markDefs = []
  parts.forEach((p, i) => {
    if (p.ref) { const mk = `l${i}`; markDefs.push({ _key: mk, _type: 'link', type: 'internal', internalRef: ref(p.ref) }); children.push({ _key: `a0s${i}`, _type: 'span', marks: [mk], text: p.text }) }
    else children.push({ _key: `a0s${i}`, _type: 'span', marks: [], text: p.text })
  })
  return [{ _type: 'block', _key: 'a0', style: 'normal', markDefs, children }]
}
const para = (key, text, style = 'normal') => ({ _type: 'block', _key: key, style, markDefs: [], children: [{ _type: 'span', _key: key + 's', text, marks: [] }] })

const SLUG = 'guepes-frelons'
const THEME = { fr: { title: 'Guêpes et frelons', slug: 'guepes-frelons' }, en: { title: 'Wasps and hornets', slug: 'wasps-and-hornets' } }
const ORDER = ['danger', 'soi-meme', 'delai', 'saison', 'zone']

const ITEMS = {
  fr: {
    danger: { q: "C'est risqué d'attendre?", a: answer([{ text: "Un nid grossit et devient plus agressif avec l'été. Si quelqu'un est allergique ou si le nid est près d'une porte, mieux vaut ne pas attendre. On intervient souvent sous 24 à 48 h." }]) },
    'soi-meme': { q: "Puis-je retirer le nid moi-même?", a: answer([{ text: "Ce n'est pas conseillé: un nid dérangé devient agressif et les piqûres multiples sont dangereuses. Un technicien certifié a le produit homologué et l'équipement pour le faire en sécurité." }]) },
    delai: { q: "Combien de temps avant que ce soit réglé?", a: answer([{ text: "Le nid est neutralisé dès le traitement et l'activité tombe en quelques heures. On revient au besoin, et la garantie écrite couvre un retour au même endroit." }]) },
    saison: { q: "À quel moment de l'année intervenez-vous?", a: answer([{ text: "Surtout de la fin du printemps à l'automne, quand les nids sont actifs. Plus on agit tôt dans la saison, plus le nid est petit et simple à retirer." }]) },
    zone: { q: "Desservez-vous mon secteur sur la Rive-Nord?", a: answer([{ text: "Oui, de " }, { text: "Blainville", ref: 'serviceCity-blainville-fr' }, { text: " à " }, { text: "Terrebonne", ref: 'serviceCity-terrebonne-fr' }, { text: " et toute la couronne nord. Un technicien d'ici se déplace, souvent sous 24 à 48 h." }]) },
  },
  en: {
    danger: { q: "Is it risky to wait?", a: answer([{ text: "A nest grows and turns more aggressive as summer goes on. If someone is allergic or the nest is near a door, it is better not to wait. We often come within 24 to 48 hours." }]) },
    'soi-meme': { q: "Can I remove the nest myself?", a: answer([{ text: "It is not advised: a disturbed nest turns aggressive and multiple stings are dangerous. A certified technician has the approved product and the gear to do it safely." }]) },
    delai: { q: "How long before it is solved?", a: answer([{ text: "The nest is neutralized as soon as it is treated and activity drops within hours. We come back if needed, and the written guarantee covers a return to the same spot." }]) },
    saison: { q: "What time of year do you come out?", a: answer([{ text: "Mostly from late spring to fall, when nests are active. The earlier in the season we act, the smaller and simpler the nest is to remove." }]) },
    zone: { q: "Do you serve my area on the North Shore?", a: answer([{ text: "Yes, from " }, { text: "Blainville", ref: 'serviceCity-blainville-en' }, { text: " to " }, { text: "Terrebonne", ref: 'serviceCity-terrebonne-en' }, { text: " and the whole north crown. A local technician heads out, often within 24 to 48 hours." }]) },
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
      eyebrow: 'Le nuisible en détail', heading: 'Comprendre un nid de guêpes ou de frelons',
      lead: "Un nid grossit tout l'été et devient agressif quand on s'en approche. On le repère, on le traite en sécurité, puis on ferme la porte aux suivants, sans que vous ayez à vous y risquer.",
      body: [
        para('e1', "Une poignée de guêpes au printemps devient une colonie de centaines en août. Le nid se cache souvent dans un soffite, une fissure de revêtement ou sous une galerie; le signe le plus clair, c'est un va-et-vient constant à un point fixe. De près, les guêpes défendent le nid, et une réaction allergique peut être grave."),
        para('e2h', "On traite à la source avant de sceller, jamais l'inverse", 'h3'),
        para('e2', "Boucher l'entrée d'un nid actif force les guêpes à chercher une autre sortie, souvent vers l'intérieur. On traite d'abord le nid à la source avec un produit homologué et l'équipement de protection, puis on scelle les points de nidification une fois la colonie neutralisée."),
      ],
    },
    highlights: { heading: "Ce que comprend l'intervention", items: [
      { _key: 'benefit-0', _type: 'highlight', title: 'Garantie écrite, retour sans frais', body: "Si un nid revient au même endroit dans la période couverte, on retraite sans vous refacturer." },
      { _key: 'benefit-1', _type: 'highlight', title: 'Retrait en sécurité, équipement de protection', body: "On traite le nid à la source avec l'équipement requis, sans vous exposer aux piqûres." },
      { _key: 'benefit-2', _type: 'highlight', title: 'Intervention sous 24 à 48 h', body: "Une vraie personne répond 7 jours sur 7 et un technicien d'ici part vers vous rapidement." },
      { _key: 'benefit-3', _type: 'highlight', title: 'Points de nidification scellés', body: "On ferme les soffites et les fissures par où ils s'installent, avec un rapport des points à surveiller." },
    ] },
    faq: { _key: 'pb-faq', _type: 'faq', eyebrow: "Avant d'appeler", heading: 'Vos questions sur les guêpes et les frelons' },
    process: { heading: 'Comment on retire un nid de guêpes ou de frelons', lead: "On vise le nid à la source, pas seulement les guêpes qui volent.", steps: [
      { _key: 's1', _type: 'processStep', title: 'Repérage du nid', body: "On suit le va-et-vient jusqu'au point d'entrée pour trouver le nid, pas seulement les guêpes visibles." },
      { _key: 's2', _type: 'processStep', title: 'Retrait sécuritaire', body: "On traite le nid à la source avec un produit homologué et l'équipement de protection, puis on le retire quand c'est possible." },
      { _key: 's3', _type: 'processStep', title: 'Prévention des points de nidification', body: "On scelle les soffites et les fissures par où ils s'installent, pour éviter qu'un nid revienne." },
    ] },
    cta: { title: "Un nid de guêpes ou de frelons? On s'en occupe, pas vous.", subtitle: "Un appel, un technicien certifié retire le nid en sécurité, souvent sous 24 à 48 h. Garantie écrite." },
  },
  en: {
    trustBar: { _key: 'pb-trust', _type: 'trustBar', items: [
      { _key: 't1', _type: 'proof', icon: 'lucide:award', value: 'ASTTQ member', label: 'Quebec pest management' },
      { _key: 't2', _type: 'proof', icon: 'lucide:leaf', value: 'Approved products', label: 'Health Canada, family-safe' },
      { _key: 't3', _type: 'proof', icon: 'lucide:clock', value: 'Within 24 to 48 h', label: 'service seven days a week' },
      { _key: 't4', _type: 'proof', icon: 'lucide:badge-check', value: 'Written guarantee', label: 'free return visit' },
    ] },
    editorial: {
      eyebrow: 'The pest in detail', heading: 'Understanding a wasp or hornet nest',
      lead: "A nest grows all summer and turns aggressive when you get close. We locate it, treat it safely, then close the door to the next ones, without you taking the risk.",
      body: [
        para('e1', "A handful of wasps in spring becomes a colony of hundreds by August. The nest often hides in a soffit, a siding crack or under a deck; the clearest sign is steady traffic at one fixed point. Up close, wasps defend the nest, and an allergic reaction can be serious."),
        para('e2h', "We treat at the source before we seal, never the other way around", 'h3'),
        para('e2', "Blocking the entrance of an active nest forces the wasps to find another way out, often indoors. We treat the nest at the source first with an approved product and protective gear, then seal the nesting points once the colony is neutralized."),
      ],
    },
    highlights: { heading: "What the service includes", items: [
      { _key: 'benefit-0', _type: 'highlight', title: 'Written guarantee, free return visit', body: "If a nest comes back in the same spot within the covered period, we re-treat at no extra charge." },
      { _key: 'benefit-1', _type: 'highlight', title: 'Safe removal, protective equipment', body: "We treat the nest at the source with the right gear, without exposing you to stings." },
      { _key: 'benefit-2', _type: 'highlight', title: 'On site within 24 to 48 h', body: "A real person answers seven days a week and a local technician heads your way quickly." },
      { _key: 'benefit-3', _type: 'highlight', title: 'Nesting points sealed', body: "We close the soffits and cracks where they settle, with a report of the points to watch." },
    ] },
    faq: { _key: 'pb-faq', _type: 'faq', eyebrow: 'Before you call', heading: 'Your questions about wasps and hornets' },
    process: { heading: 'How we remove a wasp or hornet nest', lead: "We target the nest at the source, not just the wasps in the air.", steps: [
      { _key: 's1', _type: 'processStep', title: 'Locating the nest', body: "We follow the traffic to the entry point to find the nest, not just the wasps you can see." },
      { _key: 's2', _type: 'processStep', title: 'Safe removal', body: "We treat the nest at the source with an approved product and protective gear, then remove it when possible." },
      { _key: 's3', _type: 'processStep', title: 'Preventing nesting points', body: "We seal the soffits and cracks where they settle, to keep a nest from coming back." },
    ] },
    cta: { title: 'A wasp or hornet nest? We handle it, not you.', subtitle: "One call and a certified technician removes the nest safely, often within 24 to 48 hours. Written guarantee." },
  },
}

function editorial(lang, assetRef) {
  const e = BLOCKS[lang].editorial
  return {
    _key: 'pb-editorial', _type: 'editorial', eyebrow: e.eyebrow, heading: e.heading, lead: e.lead,
    segments: [
      { _key: 'seg0', _type: 'editorialSegment', disposition: 'aside', mediaSide: 'right', body: e.body, media: [{ _key: 'm1', _type: 'figure', image: { _type: 'image', asset: { _ref: assetRef, _type: 'reference' } } }] },
    ],
  }
}
function faqBlock(lang) {
  const b = BLOCKS[lang].faq
  return { ...b, items: ORDER.map((k, i) => ({ ...ref(`faqItem-${SLUG}-${k}-${lang}`), _key: `fq${i}` })) }
}
function themeDoc(lang) { return { _id: `faqTheme-${SLUG}-${lang}`, _type: 'faqTheme', language: lang, title: THEME[lang].title, slug: { _type: 'slug', current: THEME[lang].slug } } }
function itemDoc(lang, k) { const it = ITEMS[lang][k]; return { _id: `faqItem-${SLUG}-${k}-${lang}`, _type: 'faqItem', language: lang, question: it.q, answer: it.a, theme: ref(`faqTheme-${SLUG}-${lang}`) } }
function tmDoc(id, schemaType, frId, enId) {
  const tval = (lang, vid) => ({ _key: lang, _type: 'internationalizedArrayReferenceValue', language: lang, value: { _type: 'reference', _ref: vid, _weak: true, _strengthenOnPublish: { type: schemaType } } })
  return { _id: id, _type: 'translation.metadata', schemaTypes: [schemaType], translations: [tval('fr', frId), tval('en', enId)] }
}

function rebuild(pb, lang, assetRef) {
  const B = BLOCKS[lang]
  const tm = pb.find((b) => b._type === 'testimonials')
  const hl = pb.find((b) => b._type === 'highlights')
  const proc = pb.find((b) => b._type === 'process')
  const cta = pb.find((b) => b._type === 'ctaBand')
  if (!tm || !hl || !proc || !cta) throw new Error(`${lang}: bloc attendu manquant.`)
  return [
    B.trustBar,
    editorial(lang, assetRef),
    { ...hl, heading: B.highlights.heading, items: B.highlights.items },
    faqBlock(lang),
    { ...proc, heading: B.process.heading, lead: B.process.lead, steps: B.process.steps },
    tm,
    { ...cta, title: B.cta.title, subtitle: B.cta.subtitle },
  ]
}

const LANGS = ['fr', 'en']

async function migrateLive() {
  const docs = []
  for (const lang of LANGS) { docs.push(themeDoc(lang)); for (const k of ORDER) docs.push(itemDoc(lang, k)) }
  docs.push(tmDoc(`translation-faqTheme-${SLUG}`, 'faqTheme', `faqTheme-${SLUG}-fr`, `faqTheme-${SLUG}-en`))
  for (const k of ORDER) docs.push(tmDoc(`translation-faqItem-${SLUG}-${k}`, 'faqItem', `faqItem-${SLUG}-${k}-fr`, `faqItem-${SLUG}-${k}-en`))
  if (DRY) { console.log(`  live: ${docs.length} doc(s) FAQ (DRY).`) }
  else { let tx = client.transaction(); for (const d of docs) tx = tx.createOrReplace(d); await tx.commit({ visibility: 'sync' }); console.log(`  live: ${docs.length} doc(s) FAQ créés/remplacés.`) }

  for (const lang of LANGS) {
    const id = `service-${SLUG}-${lang}`
    const doc = await client.getDocument(id)
    if (!doc) throw new Error(`introuvable: ${id}`)
    if ((doc.pageBuilder || []).some((b) => b._type === 'faq')) { console.log(`  ${id}: déjà migré, saut.`); continue }
    const next = rebuild(doc.pageBuilder || [], lang, IMG_REAL)
    if (DRY) { console.log(`  ${id}: DRY -> ${next.map((b) => b._type).join(' > ')}`); continue }
    await client.patch(id).set({ pageBuilder: next }).commit({ visibility: 'sync' })
    console.log(`  ${id}: pageBuilder reconstruit (live).`)
  }
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
  const have = new Set(seed.documents.map((d) => d.content?._id).filter(Boolean))
  let added = 0
  const push = (content, type) => { if (have.has(content._id)) return; seed.documents.push({ type, content }); have.add(content._id); added++ }
  for (const lang of LANGS) { push(themeDoc(lang), 'faqTheme'); for (const k of ORDER) push(itemDoc(lang, k), 'faqItem') }
  push(tmDoc(`translation-faqTheme-${SLUG}`, 'faqTheme', `faqTheme-${SLUG}-fr`, `faqTheme-${SLUG}-en`), 'translation.metadata')
  for (const k of ORDER) push(tmDoc(`translation-faqItem-${SLUG}-${k}`, 'faqItem', `faqItem-${SLUG}-${k}-fr`, `faqItem-${SLUG}-${k}-en`), 'translation.metadata')

  let rebuilt = 0
  for (const d of seed.documents) {
    if (d.type !== 'service' || !`${d.content._id}`.startsWith(`service-${SLUG}-`)) continue
    if ((d.content.pageBuilder || []).some((b) => b._type === 'faq')) continue
    d.content.pageBuilder = rebuild(d.content.pageBuilder, d.content.language, IMG_SEED)
    rebuilt++
  }
  if (DRY) { console.log(`  seed: +${added} doc(s), ${rebuilt} pageBuilder(s) (DRY).`); return }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n')
  console.log(`  seed-content.json: +${added} doc(s), ${rebuilt} pageBuilder(s).`)
}

async function main() {
  console.log(`Sous-étape C, service guêpes et frelons (dataset ${client.config().dataset})`)
  await migrateLive()
  migrateSeed()
  console.log('Terminé.')
}
main().catch((e) => { console.error(e); process.exit(1) })
