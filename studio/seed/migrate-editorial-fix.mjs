// Retours Charles (via /impeccable) sur les editorials de détail:
//  1. Fourmis: le seg0 est un `duo` dont les images ne correspondent PAS à leurs
//     fentes de ratio (hero-rempart PORTRAIT forcé en fente WIDE -> recadré « coupé »;
//     inspection-rempart PAYSAGE forcé en fente PORTRAIT). Le décalage du diptyque
//     ajoute du vide. -> seg0 passe en `aside` avec UNE image paysage (inspection-
//     rempart), hero-rempart retiré. seg1 `band` (hero-technicien 16/9) reste, il
//     tombe juste sur son ratio.
//  2. Souris: seg0 `aside` (texte court) + seg1 `text` -> texte court à côté d'une
//     image plus haute = vide, puis un 2e bloc de texte qui pend. -> fusion en UN
//     seul `aside` équilibré (tout le texte à côté de l'image).
//
// On RÉUTILISE les objets figure existants (refs correctes par source: réel en live,
// IMG: en seed). Live puis miroir seed. Idempotent (seg0 déjà `aside` -> saut).
//
// Usage:  node studio/seed/migrate-editorial-fix.mjs [--dry-run]

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

const refOf = (fig) => fig?.image?.asset?._ref || ''
const isInspection = (fig) => /inspection-rempart|63ce3125380e4bf9994b4261b970c11d5b098d48/.test(refOf(fig))

// Editorial riche de fourmis (heading « Comprendre la fourmi charpentière »): seg0
// duo -> aside avec la seule image paysage (inspection-rempart).
function fixFourmis(ed) {
  const seg0 = ed.segments[0]
  if (seg0.disposition === 'aside') return false
  const keep = (seg0.media || []).find(isInspection) || (seg0.media || [])[1]
  seg0.disposition = 'aside'
  seg0.mediaSide = 'right'
  seg0.media = keep ? [keep] : []
  return true
}

// Editorial de souris (heading « Comprendre une infestation… »): fusionne seg0
// (aside) + seg1 (text) en UN aside équilibré (tout le texte, l'image conservée).
function fixSouris(ed) {
  if (ed.segments.length === 1 && ed.segments[0].disposition === 'aside') return false
  const a = ed.segments[0]
  const b = ed.segments[1]
  const merged = {
    _key: a._key || 'seg0',
    _type: 'editorialSegment',
    disposition: 'aside',
    mediaSide: 'right',
    body: [...(a.body || []), ...(b ? b.body || [] : [])],
    media: a.media || [],
  }
  ed.segments = [merged]
  return true
}

function richEditorial(doc, headMatch) {
  return (doc.pageBuilder || []).find((b) => b._type === 'editorial' && (b.heading || '').includes(headMatch))
}

async function migrateLive() {
  for (const lang of ['fr', 'en']) {
    // Fourmis
    {
      const id = `service-fourmis-charpentieres-${lang}`
      const doc = await client.getDocument(id)
      const ed = richEditorial(doc, lang === 'fr' ? 'fourmi charpentière' : 'carpenter ant')
      if (ed && fixFourmis(ed)) {
        if (DRY) console.log(`  ${id}: DRY seg0 duo -> aside`)
        else { await client.patch(id).set({ pageBuilder: doc.pageBuilder }).commit({ visibility: 'sync' }); console.log(`  ${id}: seg0 -> aside (live).`) }
      } else console.log(`  ${id}: rien à faire.`)
    }
    // Souris
    {
      const id = `service-souris-rats-${lang}`
      const doc = await client.getDocument(id)
      const ed = richEditorial(doc, lang === 'fr' ? 'infestation de souris' : 'mouse and rat')
      if (ed && fixSouris(ed)) {
        if (DRY) console.log(`  ${id}: DRY fusion -> 1 aside`)
        else { await client.patch(id).set({ pageBuilder: doc.pageBuilder }).commit({ visibility: 'sync' }); console.log(`  ${id}: editorial fusionné (live).`) }
      } else console.log(`  ${id}: rien à faire.`)
    }
  }
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
  let changed = 0
  for (const d of seed.documents) {
    if (d.type !== 'service') continue
    const id = d.content._id
    if (/^service-fourmis-charpentieres-/.test(id)) {
      const ed = richEditorial(d.content, d.content.language === 'fr' ? 'fourmi charpentière' : 'carpenter ant')
      if (ed && fixFourmis(ed)) changed++
    }
    if (/^service-souris-rats-/.test(id)) {
      const ed = richEditorial(d.content, d.content.language === 'fr' ? 'infestation de souris' : 'mouse and rat')
      if (ed && fixSouris(ed)) changed++
    }
  }
  if (DRY) { console.log(`  seed: ${changed} editorial(s) (DRY).`); return }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n')
  console.log(`  seed-content.json: ${changed} editorial(s).`)
}

async function main() {
  console.log(`Fix editorials détail (dataset ${client.config().dataset})`)
  await migrateLive()
  migrateSeed()
  console.log('Terminé.')
}
main().catch((e) => { console.error(e); process.exit(1) })
