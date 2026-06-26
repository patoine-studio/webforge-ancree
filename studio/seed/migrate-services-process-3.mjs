// Reprise FOND /services, retour 1 de Charles: le bloc process (sv-process) tient
// 4 étapes, or le composant process.vue n'aligne que 3 temps sur sa ligne d'horizon;
// la 4e brise la mise en page. On ramène sv-process à 3 temps (fr + en), live + seed.
//
// Leçon figée: le process tient 3 étapes max sur une ligne, jamais 4.
//
// On fusionne « Plan et estimation claire » dans « Inspection et identification »
// (le prix clair se dit au moment où on explique le plan, avant d'agir). Le reste
// inchangé. Titres en groupe nominal (distincts du home, en groupe verbal).
//
// Patch chirurgical: on retrouve le bloc _key === 'sv-process' et on remplace ses
// `steps`. Idempotent: si déjà 3 temps, on saute. Puis MIROIR seed-content.json.
//
// Usage:  node studio/seed/migrate-services-process-3.mjs [--dry-run]

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

const STEPS = {
  fr: [
    { _key: 'p1', _type: 'processStep', title: 'Inspection et identification', body: 'On confirme l\'espèce et on trouve la source, du sous-sol au toit, puis on explique le plan et le prix avant d\'agir.' },
    { _key: 'p2', _type: 'processStep', title: 'Traitement ciblé', body: 'Un technicien certifié applique des produits homologués Santé Canada, sûrs pour la famille et les animaux.' },
    { _key: 'p3', _type: 'processStep', title: 'Suivi et garantie', body: 'On scelle les points d\'entrée, on revient au besoin, et la garantie écrite tient.' },
  ],
  en: [
    { _key: 'p1', _type: 'processStep', title: 'Inspection and identification', body: 'We confirm the species and find the source, basement to roof, then explain the plan and the price before acting.' },
    { _key: 'p2', _type: 'processStep', title: 'Targeted treatment', body: 'A certified technician applies Health Canada approved products, safe for family and pets.' },
    { _key: 'p3', _type: 'processStep', title: 'Follow-up and guarantee', body: 'We seal the entry points, come back if needed, and the written guarantee holds.' },
  ],
}

const DOCS = [
  { id: 'servicesPage-fr', lang: 'fr' },
  { id: 'servicesPage-en', lang: 'en' },
]

async function migrateLive(id, lang) {
  const doc = await client.getDocument(id)
  if (!doc) throw new Error(`introuvable: ${id}`)
  const pb = doc.pageBuilder || []
  const proc = pb.find((b) => b._key === 'sv-process')
  if (!proc) throw new Error(`${id}: bloc sv-process introuvable.`)
  if ((proc.steps || []).length === 3) {
    console.log(`  ${id}: déjà 3 temps, saut.`)
    return
  }
  const next = pb.map((b) => (b._key === 'sv-process' ? { ...b, steps: STEPS[lang] } : b))
  if (DRY) {
    console.log(`  ${id}: DRY -> sv-process ${proc.steps.length} -> ${STEPS[lang].length} temps`)
    return
  }
  await client.patch(id).set({ pageBuilder: next }).commit({ visibility: 'sync' })
  console.log(`  ${id}: sv-process ramené à 3 temps (live).`)
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
  let changed = 0
  for (const d of seed.documents) {
    if (d.type !== 'servicesPage') continue
    const lang = d.content.language
    if (!STEPS[lang]) continue
    const proc = (d.content.pageBuilder || []).find((b) => b._key === 'sv-process')
    if (!proc || (proc.steps || []).length === 3) continue
    proc.steps = STEPS[lang]
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
  console.log(`Reprise FOND /services process 3 temps (dataset ${client.config().dataset})`)
  for (const { id, lang } of DOCS) await migrateLive(id, lang)
  migrateSeed()
  console.log('Terminé.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
