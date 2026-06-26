// Lot service détail, sous-étape B: le service MODÈLE bout-en-bout (fourmis
// charpentières), à valider avant réplique sur les 4 autres + coquerelles.
//
// Cible (PLAN, décisions Charles): trustBar (crédibilité sous le héros) > editorial
// riche (UN seul, l'intro nu est retiré) > highlights (4 bénéfices Trust, non
// redondants) > faq (par nuisible, VISUEL seulement, pas de balisage FAQPage sur le
// détail) > process (3 temps PROPRES aux fourmis) > testimonials (mode service) >
// ctaBand (contextualisé fourmis).
//
// Crée: faqTheme-fourmis (fr+en) + 5 faqItem-fourmis (fr+en, réponses Portable Text
// avec maillage interne inline) + translation.metadata par paire. Réécrit le
// pageBuilder. Pas de changement de schéma (types existants) -> pas de redeploiement
// Studio. Live d'abord, miroir seed. Idempotent (saute si un bloc faq existe).
//
// Usage:  node studio/seed/migrate-fourmis-detail.mjs [--dry-run]

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

const client = createClient({
  projectId: '5if00rwn',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: readToken(),
  useCdn: false,
})

const ref = (id) => ({ _type: 'reference', _ref: id })

// Réponse Portable Text d'un faqItem: un bloc normal; chaque part est {text} ou
// {text, ref} (lien interne inline résolu au transform). Clés déterministes.
function answer(parts) {
  const children = []
  const markDefs = []
  parts.forEach((p, i) => {
    if (p.ref) {
      const mk = `l${i}`
      markDefs.push({ _key: mk, _type: 'link', type: 'internal', internalRef: ref(p.ref) })
      children.push({ _key: `a0s${i}`, _type: 'span', marks: [mk], text: p.text })
    } else {
      children.push({ _key: `a0s${i}`, _type: 'span', marks: [], text: p.text })
    }
  })
  return [{ _type: 'block', _key: 'a0', style: 'normal', markDefs, children }]
}

// ── faqTheme + faqItems par langue ──────────────────────────────────────────────
const THEME = {
  fr: { title: 'Fourmis charpentières', slug: 'fourmis-charpentieres' },
  en: { title: 'Carpenter ants', slug: 'carpenter-ants' },
}

const ITEMS = {
  fr: [
    {
      key: 'bois',
      q: 'Les fourmis charpentières mangent-elles le bois?',
      a: answer([{ text: 'Non. Contrairement aux termites, elles n\'avalent pas le bois: elles le creusent pour y loger la colonie. Le vrai risque, c\'est l\'affaiblissement de la structure avec le temps, pas une digestion du bois.' }]),
    },
    {
      key: 'securite',
      q: 'Le traitement est-il sûr pour les enfants et les animaux?',
      a: answer([{ text: 'Oui. On applique des produits homologués Santé Canada, ciblés sur le nid et les points d\'entrée, posés par un technicien certifié. Une fois secs, ils ne présentent pas de risque pour la maisonnée.' }]),
    },
    {
      key: 'delai',
      q: 'Combien de temps avant que les fourmis disparaissent?',
      a: answer([{ text: 'L\'activité chute souvent en une à deux semaines, le temps que l\'appât soit rapporté au nid par les ouvrières. On revient confirmer que la colonie est éteinte; si elle persiste, la garantie écrite tient.' }]),
    },
    {
      key: 'recidive',
      q: 'Vais-je devoir retraiter chaque année?',
      a: answer([{ text: 'Pas si la source est traitée et les accès scellés. On vise le nid principal ET les nids satellites, puis on bloque les points d\'entrée liés à l\'humidité. La garantie couvre un retour si elles reviennent dans la période.' }]),
    },
    {
      key: 'zone',
      q: 'Desservez-vous mon secteur sur la Rive-Nord?',
      a: answer([
        { text: 'Oui, de ' },
        { text: 'Terrebonne', ref: 'serviceCity-terrebonne-fr' },
        { text: ' à ' },
        { text: 'Laval', ref: 'serviceCity-laval-fr' },
        { text: ' et toute la couronne nord. Un technicien d\'ici se déplace, souvent sous 24 à 48 h.' },
      ]),
    },
  ],
  en: [
    {
      key: 'bois',
      q: 'Do carpenter ants eat the wood?',
      a: answer([{ text: 'No. Unlike termites, they do not eat the wood: they hollow it out to house the colony. The real risk is the structure weakening over time, not the wood being digested.' }]),
    },
    {
      key: 'securite',
      q: 'Is the treatment safe for children and pets?',
      a: answer([{ text: 'Yes. We apply Health Canada approved products, targeted at the nest and the entry points, by a certified technician. Once dry, they pose no risk to the household.' }]),
    },
    {
      key: 'delai',
      q: 'How long before the ants are gone?',
      a: answer([{ text: 'Activity usually drops within one to two weeks, the time it takes the workers to carry the bait back to the nest. We return to confirm the colony is gone; if it persists, the written guarantee holds.' }]),
    },
    {
      key: 'recidive',
      q: 'Will I have to re-treat every year?',
      a: answer([{ text: 'Not if the source is treated and the access points sealed. We target the main nest AND the satellite nests, then block the moisture-related entry points. The guarantee covers a return visit if they come back within the period.' }]),
    },
    {
      key: 'zone',
      q: 'Do you serve my area on the North Shore?',
      a: answer([
        { text: 'Yes, from ' },
        { text: 'Terrebonne', ref: 'serviceCity-terrebonne-en' },
        { text: ' to ' },
        { text: 'Laval', ref: 'serviceCity-laval-en' },
        { text: ' and the whole north crown. A local technician heads out, often within 24 to 48 hours.' },
      ]),
    },
  ],
}

const ORDER = ['bois', 'securite', 'delai', 'recidive', 'zone']

function themeDoc(lang) {
  return { _id: `faqTheme-fourmis-${lang}`, _type: 'faqTheme', language: lang, title: THEME[lang].title, slug: { _type: 'slug', current: THEME[lang].slug } }
}
function itemDoc(lang, it) {
  return { _id: `faqItem-fourmis-${it.key}-${lang}`, _type: 'faqItem', language: lang, question: it.q, answer: it.a, theme: ref(`faqTheme-fourmis-${lang}`) }
}
function tmDoc(id, schemaType, frId, enId) {
  const tval = (lang, vid) => ({ _key: lang, _type: 'internationalizedArrayReferenceValue', language: lang, value: { _type: 'reference', _ref: vid, _weak: true, _strengthenOnPublish: { type: schemaType } } })
  return { _id: id, _type: 'translation.metadata', schemaTypes: [schemaType], translations: [tval('fr', frId), tval('en', enId)] }
}

// ── Contenu réécrit par langue (highlights, process, faq, ctaBand, trustBar) ─────
const BLOCKS = {
  fr: {
    trustBar: {
      _key: 'pb-trust', _type: 'trustBar',
      items: [
        { _key: 't1', _type: 'proof', icon: 'lucide:award', value: 'Membre ASTTQ', label: 'gestion parasitaire du Québec' },
        { _key: 't2', _type: 'proof', icon: 'lucide:leaf', value: 'Produits homologués', label: 'Santé Canada, sûrs pour la famille' },
        { _key: 't3', _type: 'proof', icon: 'lucide:clock', value: 'Sous 24 à 48 h', label: 'intervention 7 jours sur 7' },
        { _key: 't4', _type: 'proof', icon: 'lucide:badge-check', value: 'Garantie écrite', label: 'retour sans frais' },
      ],
    },
    highlights: {
      heading: 'Ce que comprend l\'intervention',
      items: [
        { _key: 'benefit-0', _type: 'highlight', title: 'Garantie écrite, retour sans frais', body: 'Si les fourmis charpentières reviennent dans la période couverte, on retraite sans vous refacturer.' },
        { _key: 'benefit-1', _type: 'highlight', title: 'Produits homologués Santé Canada', body: 'Ciblés sur le nid, appliqués par un technicien certifié, sûrs pour les enfants et les animaux une fois secs.' },
        { _key: 'benefit-2', _type: 'highlight', title: 'Intervention sous 24 à 48 h', body: 'Une vraie personne répond 7 jours sur 7 et un technicien d\'ici part vers vous rapidement.' },
        { _key: 'benefit-3', _type: 'highlight', title: 'Rapport d\'inspection écrit', body: 'Ce qu\'on a trouvé, traité, et les zones humides à surveiller pour éviter une récidive.' },
      ],
    },
    faq: { _key: 'pb-faq', _type: 'faq', eyebrow: 'Avant d\'appeler', heading: 'Vos questions sur les fourmis charpentières' },
    process: {
      heading: 'Comment on règle une colonie de fourmis charpentières',
      lead: 'Pas de mystère: on traite la source, pas seulement ce que vous voyez.',
      steps: [
        { _key: 's1', _type: 'processStep', title: 'Repérage du nid principal et des satellites', body: 'On suit les galeries jusqu\'à la colonie mère et aux nids satellites, dans les zones humides du bâti.' },
        { _key: 's2', _type: 'processStep', title: 'Traitement appât et barrière', body: 'Appât ciblé rapporté au nid par les ouvrières, plus une barrière sur les points d\'entrée.' },
        { _key: 's3', _type: 'processStep', title: 'Suivi et garantie écrite', body: 'On revient confirmer que la colonie est éteinte; la garantie tient si elles reviennent.' },
      ],
    },
    cta: {
      title: 'Des fourmis charpentières dans le bois? On s\'en occupe.',
      subtitle: 'Un appel, un technicien licencié se déplace, souvent sous 24 à 48 h. Garantie écrite sur la colonie.',
    },
  },
  en: {
    trustBar: {
      _key: 'pb-trust', _type: 'trustBar',
      items: [
        { _key: 't1', _type: 'proof', icon: 'lucide:award', value: 'ASTTQ member', label: 'Quebec pest management' },
        { _key: 't2', _type: 'proof', icon: 'lucide:leaf', value: 'Approved products', label: 'Health Canada, family-safe' },
        { _key: 't3', _type: 'proof', icon: 'lucide:clock', value: 'Within 24 to 48 h', label: 'service seven days a week' },
        { _key: 't4', _type: 'proof', icon: 'lucide:badge-check', value: 'Written guarantee', label: 'free return visit' },
      ],
    },
    highlights: {
      heading: 'What the service includes',
      items: [
        { _key: 'benefit-0', _type: 'highlight', title: 'Written guarantee, free return visit', body: 'If the carpenter ants come back within the covered period, we re-treat at no extra charge.' },
        { _key: 'benefit-1', _type: 'highlight', title: 'Health Canada approved products', body: 'Targeted at the nest, applied by a certified technician, safe for children and pets once dry.' },
        { _key: 'benefit-2', _type: 'highlight', title: 'On site within 24 to 48 h', body: 'A real person answers seven days a week and a local technician heads your way quickly.' },
        { _key: 'benefit-3', _type: 'highlight', title: 'Written inspection report', body: 'What we found, treated, and the damp areas to watch to avoid a return.' },
      ],
    },
    faq: { _key: 'pb-faq', _type: 'faq', eyebrow: 'Before you call', heading: 'Your questions about carpenter ants' },
    process: {
      heading: 'How we clear a carpenter ant colony',
      lead: 'No mystery: we treat the source, not just what you can see.',
      steps: [
        { _key: 's1', _type: 'processStep', title: 'Locating the main nest and satellites', body: 'We follow the galleries to the parent colony and the satellite nests, in the damp areas of the structure.' },
        { _key: 's2', _type: 'processStep', title: 'Bait and barrier treatment', body: 'Targeted bait carried back to the nest by the workers, plus a barrier on the entry points.' },
        { _key: 's3', _type: 'processStep', title: 'Follow-up and written guarantee', body: 'We return to confirm the colony is gone; the guarantee holds if they come back.' },
      ],
    },
    cta: {
      title: 'Carpenter ants in the woodwork? We handle it.',
      subtitle: 'One call and a licensed technician heads out, often within 24 to 48 hours. Written guarantee on the colony.',
    },
  },
}

function faqBlock(lang) {
  const b = BLOCKS[lang].faq
  return { ...b, items: ORDER.map((k, i) => ({ ...ref(`faqItem-fourmis-${k}-${lang}`), _key: `fq${i}` })) }
}

// Reconstruit le pageBuilder: trustBar > editorial RICHE (un seul) > highlights >
// faq > process > testimonials > ctaBand. L'editorial nu (sans heading) est retiré.
function rebuild(pb, lang) {
  const B = BLOCKS[lang]
  const editorials = pb.filter((b) => b._type === 'editorial')
  const rich = editorials.find((e) => e.heading) || editorials[editorials.length - 1]
  const tm = pb.find((b) => b._type === 'testimonials')
  const hl = pb.find((b) => b._type === 'highlights')
  const proc = pb.find((b) => b._type === 'process')
  const cta = pb.find((b) => b._type === 'ctaBand')
  if (!rich || !tm || !hl || !proc || !cta) throw new Error(`${lang}: bloc attendu manquant.`)
  return [
    B.trustBar,
    rich,
    { ...hl, heading: B.highlights.heading, items: B.highlights.items },
    faqBlock(lang),
    { ...proc, heading: B.process.heading, lead: B.process.lead, steps: B.process.steps },
    tm,
    { ...cta, title: B.cta.title, subtitle: B.cta.subtitle },
  ]
}

const LANGS = ['fr', 'en']

async function migrateLive() {
  // 1. Docs FAQ (createOrReplace = idempotent).
  const docs = []
  for (const lang of LANGS) {
    docs.push(themeDoc(lang))
    for (const it of ITEMS[lang]) docs.push(itemDoc(lang, it))
  }
  docs.push(tmDoc('translation-faqTheme-fourmis', 'faqTheme', 'faqTheme-fourmis-fr', 'faqTheme-fourmis-en'))
  for (const k of ORDER) docs.push(tmDoc(`translation-faqItem-fourmis-${k}`, 'faqItem', `faqItem-fourmis-${k}-fr`, `faqItem-fourmis-${k}-en`))

  if (DRY) {
    console.log(`  live: ${docs.length} doc(s) FAQ à créer (DRY): ${docs.map((d) => d._id).join(', ')}`)
  } else {
    let tx = client.transaction()
    for (const d of docs) tx = tx.createOrReplace(d)
    await tx.commit({ visibility: 'sync' })
    console.log(`  live: ${docs.length} doc(s) FAQ créés/remplacés.`)
  }

  // 2. pageBuilder par langue.
  for (const lang of LANGS) {
    const id = `service-fourmis-charpentieres-${lang}`
    const doc = await client.getDocument(id)
    if (!doc) throw new Error(`introuvable: ${id}`)
    if ((doc.pageBuilder || []).some((b) => b._type === 'faq')) {
      console.log(`  ${id}: déjà migré (faq présent), saut.`)
      continue
    }
    const next = rebuild(doc.pageBuilder || [], lang)
    if (DRY) {
      console.log(`  ${id}: DRY -> ${next.map((b) => b._type).join(' > ')}`)
      continue
    }
    await client.patch(id).set({ pageBuilder: next }).commit({ visibility: 'sync' })
    console.log(`  ${id}: pageBuilder reconstruit (live).`)
  }
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
  const have = new Set(seed.documents.map((d) => d.content?._id).filter(Boolean))
  let added = 0
  const push = (content, type) => {
    if (have.has(content._id)) return
    seed.documents.push({ type, content })
    have.add(content._id)
    added++
  }
  for (const lang of LANGS) {
    push(themeDoc(lang), 'faqTheme')
    for (const it of ITEMS[lang]) push(itemDoc(lang, it), 'faqItem')
  }
  push(tmDoc('translation-faqTheme-fourmis', 'faqTheme', 'faqTheme-fourmis-fr', 'faqTheme-fourmis-en'), 'translation.metadata')
  for (const k of ORDER) push(tmDoc(`translation-faqItem-fourmis-${k}`, 'faqItem', `faqItem-fourmis-${k}-fr`, `faqItem-fourmis-${k}-en`), 'translation.metadata')

  let rebuilt = 0
  for (const d of seed.documents) {
    if (d.type !== 'service') continue
    if (!`${d.content._id}`.startsWith('service-fourmis-charpentieres-')) continue
    const lang = d.content.language
    if ((d.content.pageBuilder || []).some((b) => b._type === 'faq')) continue
    d.content.pageBuilder = rebuild(d.content.pageBuilder, lang)
    rebuilt++
  }
  if (DRY) {
    console.log(`  seed: +${added} doc(s), ${rebuilt} pageBuilder(s) (DRY).`)
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n')
  console.log(`  seed-content.json: +${added} doc(s), ${rebuilt} pageBuilder(s) reconstruit(s).`)
}

async function main() {
  console.log(`Sous-étape B, service modèle fourmis (dataset ${client.config().dataset})`)
  await migrateLive()
  migrateSeed()
  console.log('Terminé.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
