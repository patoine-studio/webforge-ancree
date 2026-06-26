// Équilibre l'aperçu services de l'accueil: 3 services (vedette + 2) au lieu de 4.
//
// La mosaïque services se cale sur 16 pistes: rangée pleine à vedette(8) + paire
// (4 + 4), ou deux rangées à 8+4+4 / 8+8. À 4 items, la 4e tuile (span 8) reste
// seule sur la 2e rangée et laisse un vide de 8 pistes (à côté de Punaises de lit).
// On passe donc à 3 services: fourmis (vedette) + souris + guêpes = une rangée
// pleine, tuile vedette conservée. Le CTA « Voir tous les services » couvre le reste.
//
// Live + miroir seed. Idempotent (no-op si déjà 3).
//
// Usage:  node studio/seed/migrate-home-apercu-3.mjs [--dry-run]

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

const ref = (id, key) => ({ _type: 'reference', _ref: id, _key: key })
const ITEMS = {
  fr: [
    ref('service-fourmis-charpentieres-fr', 'sv1'),
    ref('service-souris-rats-fr', 'sv2'),
    ref('service-guepes-frelons-fr', 'sv3'),
  ],
  en: [
    ref('service-fourmis-charpentieres-en', 'sv1'),
    ref('service-souris-rats-en', 'sv2'),
    ref('service-guepes-frelons-en', 'sv3'),
  ],
}
const DOCS = [
  { id: 'homePage-fr', lang: 'fr' },
  { id: 'homePage-en', lang: 'en' },
]

async function migrateLive(id, lang) {
  const doc = await client.getDocument(id)
  if (!doc) throw new Error(`introuvable: ${id}`)
  const sv = (doc.pageBuilder || []).find((b) => b._type === 'services')
  if (!sv) throw new Error(`pas de bloc services: ${id}`)
  if ((sv.items || []).length === 3) {
    console.log(`  ${id}: déjà 3 items, saut.`)
    return
  }
  if (DRY) {
    console.log(`  ${id}: DRY, items -> 3 (fourmis, souris, guêpes)`)
    return
  }
  await client.patch(id).set({ 'pageBuilder[_key=="b2"].items': ITEMS[lang] }).commit({ visibility: 'sync' })
  console.log(`  ${id}: aperçu réduit à 3 (live).`)
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
  let changed = 0
  for (const d of seed.documents) {
    if (d.type !== 'homePage') continue
    const lang = d.content.language
    if (!ITEMS[lang]) continue
    const sv = (d.content.pageBuilder || []).find((b) => b._type === 'services')
    if (!sv || (sv.items || []).length === 3) continue
    sv.items = ITEMS[lang]
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
  console.log(`Aperçu accueil à 3 services (dataset ${client.config().dataset})`)
  for (const { id, lang } of DOCS) await migrateLive(id, lang)
  migrateSeed()
  console.log('Terminé.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
