// Reprise FOND /services, retours 3 + 4 de Charles:
//  - retour 4: ajouter un bloc EDITORIAL (média-texte) pour donner de la texture,
//    pas que des grilles et des listes.
//  - retour 3: deux listes sans image (process + highlights) se suivaient dos à dos.
//    L'editorial s'intercale ENTRE les deux: liste > média-texte > liste. La
//    redondance des deux listes adjacentes est cassée.
//
// Angle (approuvé): « pourquoi Rempart », l'Expérience et l'ancrage local (équipe
// d'ici sur la Rive-Nord depuis 2008), distinct du process (la méthode) et des
// highlights (les garanties). Une image réutilisée (hero-techVan, jusqu'ici sur
// le seul contact), disposition `aside` (sans filet ambre), liens internes inline
// vers Terrebonne, Laval et /a-propos (maillage).
//
// Séquence cible: services > process > EDITORIAL > highlights > testimonials >
//   serviceCities > ctaBand > contact.
//
// Live: vrai _ref d'asset. Seed: placeholder IMG:hero-techVan (résolu par seed.mjs).
// Idempotent (saute si sv-editorial existe). Puis MIROIR seed-content.json.
//
// Usage:  node studio/seed/migrate-services-editorial.mjs [--dry-run]

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

const IMG_REAL = 'image-ac605a7dd89d0dbd792b17adcb68faa5ce0e3ad0-1408x768-jpg' // hero-techVan
const IMG_SEED = 'IMG:hero-techVan'

const span = (key, text, mark) => ({ _key: key, _type: 'span', marks: mark ? [mark] : [], text })
const intLink = (key, ref) => ({ _key: key, _type: 'link', type: 'internal', internalRef: { _ref: ref, _type: 'reference' } })

const CONTENT = {
  fr: {
    eyebrow: 'Pourquoi Rempart',
    heading: 'Des techniciens d\'ici, sur la Rive-Nord depuis 2008',
    lead: 'Le bâti, les saisons et les nuisibles diffèrent d\'un secteur à l\'autre. Nos techniciens connaissent la Rive-Nord parce qu\'ils la couvrent depuis 2008.',
    body: [
      {
        _key: 'sv-ed-b1', _type: 'block', style: 'normal',
        markDefs: [intLink('ttr', 'serviceCity-terrebonne-fr'), intLink('lvl', 'serviceCity-laval-fr')],
        children: [
          span('b1a', 'Partis de '),
          span('b1b', 'Terrebonne', 'ttr'),
          span('b1c', ', on couvre aujourd\'hui '),
          span('b1d', 'Laval', 'lvl'),
          span('b1e', ', Repentigny, Blainville et toute la couronne nord. D\'une année à l\'autre, ce sont les mêmes cycles: fourmis charpentières au printemps, guêpes l\'été, souris qui cherchent la chaleur à l\'automne. On sait quoi chercher, et où.'),
        ],
      },
      {
        _key: 'sv-ed-b2', _type: 'block', style: 'normal',
        markDefs: [intLink('abt', 'aboutPage-fr')],
        children: [
          span('b2a', 'Quand vous appelez, une vraie personne répond et c\'est un technicien certifié qui se déplace, '),
          span('b2b', 'pas un centre d\'appels', 'abt'),
          span('b2c', '. La même équipe d\'un bout à l\'autre du mandat, partout sur la Rive-Nord.'),
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Why Rempart',
    heading: 'Local technicians, on the North Shore since 2008',
    lead: 'The building stock, the seasons and the pests differ from one area to the next. Our technicians know the North Shore because they have worked it since 2008.',
    body: [
      {
        _key: 'sv-ed-b1', _type: 'block', style: 'normal',
        markDefs: [intLink('ttr', 'serviceCity-terrebonne-en'), intLink('lvl', 'serviceCity-laval-en')],
        children: [
          span('b1a', 'We started in '),
          span('b1b', 'Terrebonne', 'ttr'),
          span('b1c', ' and now cover '),
          span('b1d', 'Laval', 'lvl'),
          span('b1e', ', Repentigny, Blainville and the whole north crown. Year after year it is the same cycles: carpenter ants in spring, wasps in summer, mice looking for warmth in fall. We know what to look for, and where.'),
        ],
      },
      {
        _key: 'sv-ed-b2', _type: 'block', style: 'normal',
        markDefs: [intLink('abt', 'aboutPage-en')],
        children: [
          span('b2a', 'When you call, a real person answers and a certified technician comes out, '),
          span('b2b', 'not a call centre', 'abt'),
          span('b2c', '. The same team from start to finish, everywhere on the North Shore.'),
        ],
      },
    ],
  },
}

function editorial(lang, assetRef) {
  const c = CONTENT[lang]
  return {
    _key: 'sv-editorial',
    _type: 'editorial',
    eyebrow: c.eyebrow,
    heading: c.heading,
    lead: c.lead,
    segments: [
      {
        _key: 'sv-ed-seg1',
        _type: 'editorialSegment',
        disposition: 'aside',
        mediaSide: 'right',
        body: c.body,
        media: [
          { _key: 'sv-ed-m1', _type: 'figure', image: { _type: 'image', asset: { _ref: assetRef, _type: 'reference' } } },
        ],
      },
    ],
  }
}

// Insère l'editorial juste après le bloc process (sv-process).
function rebuild(pb, block) {
  const out = []
  for (const b of pb) {
    out.push(b)
    if (b._key === 'sv-process') out.push(block)
  }
  return out
}

const DOCS = [
  { id: 'servicesPage-fr', lang: 'fr' },
  { id: 'servicesPage-en', lang: 'en' },
]

async function migrateLive(id, lang) {
  const doc = await client.getDocument(id)
  if (!doc) throw new Error(`introuvable: ${id}`)
  const pb = doc.pageBuilder || []
  if (pb.some((b) => b._key === 'sv-editorial')) {
    console.log(`  ${id}: déjà migré, saut.`)
    return
  }
  if (!pb.some((b) => b._key === 'sv-process')) throw new Error(`${id}: sv-process introuvable, ancrage impossible.`)
  const next = rebuild(pb, editorial(lang, IMG_REAL))
  if (DRY) {
    console.log(`  ${id}: DRY -> ${next.map((b) => b._key || b._type).join(' > ')}`)
    return
  }
  await client.patch(id).set({ pageBuilder: next }).commit({ visibility: 'sync' })
  console.log(`  ${id}: editorial inséré (live).`)
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
  let changed = 0
  for (const d of seed.documents) {
    if (d.type !== 'servicesPage') continue
    const lang = d.content.language
    if (!CONTENT[lang]) continue
    const pb = d.content.pageBuilder || []
    if (pb.some((b) => b._key === 'sv-editorial')) continue
    d.content.pageBuilder = rebuild(pb, editorial(lang, IMG_SEED))
    changed++
  }
  if (DRY) {
    console.log(`  seed: ${changed} doc(s) (DRY).`)
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n')
  console.log(`  seed-content.json: ${changed} doc(s) mis à jour (miroir).`)
}

async function main() {
  console.log(`Reprise FOND /services editorial (dataset ${client.config().dataset})`)
  for (const { id, lang } of DOCS) await migrateLive(id, lang)
  migrateSeed()
  console.log('Terminé.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
