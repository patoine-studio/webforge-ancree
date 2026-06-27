// Remplace l'image hero-technicien (hero de la home + one-pager, masthead /faq,
// couverture de l'article fourmis, mastheads et editorials des 6 services) par la
// nouvelle version plus large et plus nette, deja en place dans
// public/images/hero-technicien.jpg.
//
// Methode (live = source de verite): trouve l'asset que le hero de la home reference
// AUJOURD'HUI, uploade la nouvelle image (Sanity dedup par hash de contenu, donc un
// nouvel asset distinct), pose l'alt bilingue dessus, repointe TOUTES les references
// du vieil asset vers le neuf (`references()` les attrape toutes), puis supprime le
// vieil asset devenu orphelin. Idempotent: si la home pointe deja sur la nouvelle
// image (oldId === newId), ne fait que (re)poser l'alt et sort.
//
// Le miroir studio/seed-content.json n'a PAS a changer: il utilise le placeholder
// IMG:hero-technicien qui re-resout vers le nouveau fichier au re-seed. L'alt vit
// dans seed.mjs (ALT_TEXT, mis a jour en parallele).
//
// Usage: node studio/seed/migrate-hero-technicien-replace.mjs [--dry-run]

import { createClient } from '@sanity/client'
import { readFileSync, createReadStream } from 'node:fs'
import { homedir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DRY = process.argv.includes('--dry-run')
const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..', '..')
const IMAGE = join(repoRoot, 'public', 'images', 'hero-technicien.jpg')

// Alt bilingue de la NOUVELLE image (technicien souriant a cote de la camionnette
// dans un quartier au coucher de soleil). Doit rester aligne avec ALT_TEXT de seed.mjs.
const ALT = {
  fr: 'Un technicien de Rempart Extermination devant sa camionnette de service dans un quartier de la Rive-Nord',
  en: 'A Rempart Extermination technician by the service van in a North Shore neighbourhood',
}

function readToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  try {
    const cfg = JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'))
    if (cfg.authToken) return cfg.authToken
  } catch {}
  throw new Error('Aucun token Sanity (SANITY_AUTH_TOKEN ou ~/.config/sanity/config.json).')
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '5if00rwn',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-10-01',
  token: readToken(),
  useCdn: false,
})

// Trouve le premier asset._ref sous un noeud heroImage (le visuel du hero de la home).
function findHeroImageRef(node) {
  if (!node || typeof node !== 'object') return null
  if (Array.isArray(node)) {
    for (const n of node) { const r = findHeroImageRef(n); if (r) return r }
    return null
  }
  if (node._type === 'heroImage' && node.desktop?.asset?._ref) return node.desktop.asset._ref
  for (const v of Object.values(node)) { const r = findHeroImageRef(v); if (r) return r }
  return null
}

// Repointe recursivement tout asset._ref === oldId vers newId. Compte les refs changees.
function repoint(node, oldId, newId, counter) {
  if (Array.isArray(node)) { for (const n of node) repoint(n, oldId, newId, counter); return }
  if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) {
      if (k === '_ref' && node[k] === oldId) { node[k] = newId; counter.n++ }
      else repoint(node[k], oldId, newId, counter)
    }
  }
}

async function main() {
  console.log(`Dataset: ${client.config().dataset} (project ${client.config().projectId})${DRY ? ' [DRY-RUN]' : ''}`)

  // 1. Vieil asset = celui que le hero de la home reference aujourd'hui.
  const home = await client.fetch('*[_id == "homePage-fr"][0]')
  if (!home) throw new Error('homePage-fr introuvable.')
  const oldId = findHeroImageRef(home)
  if (!oldId) throw new Error('Asset du hero de la home introuvable (heroImage.desktop.asset._ref).')
  console.log('Vieil asset (hero home):', oldId)

  // 2. Docs referencant le vieil asset (toutes positions: hero, masthead, cover, editorial).
  const refDocs = await client.fetch('*[references($oldId)]', { oldId })
  console.log(`Docs referencant le vieil asset: ${refDocs.length}`)
  console.log('  ' + refDocs.map((d) => d._id).sort().join(', '))

  if (DRY) {
    console.log('DRY-RUN: aucune ecriture. Nouvelle image:', IMAGE)
    console.log('  alt prevu fr:', ALT.fr)
    console.log('  alt prevu en:', ALT.en)
    return
  }

  // 3. Upload de la nouvelle image (dedup par hash: renvoie l'asset existant si deja la).
  const asset = await client.assets.upload('image', createReadStream(IMAGE), { filename: 'hero-technicien.jpg' })
  const newId = asset._id
  console.log('Nouvel asset:', newId)

  // Alt bilingue sur le nouvel asset (lu par le plugin media et les projections GROQ).
  await client.patch(newId).set({ altText: ALT }).commit()
  console.log('altText pose sur le nouvel asset.')

  // Idempotence: la home pointe deja sur la nouvelle image -> rien a repointer.
  if (oldId === newId) {
    console.log('Deja a jour (le hero pointe deja sur la nouvelle image).')
    return
  }

  // 4. Repointe chaque doc en une transaction (vieil asset -> neuf).
  let tx = client.transaction()
  let totalRefs = 0
  for (const doc of refDocs) {
    const counter = { n: 0 }
    repoint(doc, oldId, newId, counter)
    totalRefs += counter.n
    delete doc._rev
    delete doc._createdAt
    delete doc._updatedAt
    tx = tx.createOrReplace(doc)
  }
  await tx.commit({ visibility: 'sync' })
  console.log(`Repointe ${totalRefs} references dans ${refDocs.length} docs.`)

  // 5. Supprime le vieil asset s'il n'est plus reference par personne.
  const still = await client.fetch('count(*[references($oldId)])', { oldId })
  if (still === 0) {
    await client.delete(oldId)
    console.log('Vieil asset supprime (orphelin).')
  } else {
    console.log(`Vieil asset CONSERVE: encore ${still} reference(s) ailleurs.`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
