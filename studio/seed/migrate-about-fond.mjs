// Migration FOND de la page À propos (chantier d'enrichissement E-E-A-T).
//
// Enrichit aboutPage (fr + en): insère un bloc barre de confiance (credentials de
// l'entreprise), un bloc équipe (techniciens nommés) et un bloc points forts
// (garanties) entre le bloc « à propos » et les témoignages, et corrige la stat
// « villes desservies » (7, pas 10) pour la cohérence site-wide.
//
// Séquence cible: about > trustBar > team > highlights > testimonials > ctaBand > contact.
// Signaux d'autorité livrés EN CONTENU (décision Charles 26 juin): aucun groupe
// credentials en siteSettings, aucun changement de composant stylé.
//
// Portraits d'équipe: figures vides (placeholder soigné du fragment <Image>), à
// produire séparément (voir docs/IMAGES-BRIEF.md). Le mandat ne génère pas d'images.
//
// Le live fait foi: on patche le live (insert + set), puis on MIROIR seed-content.json.
// Idempotent: si le bloc 'ap-trust' existe déjà, on saute.
//
// Usage:  node studio/seed/migrate-about-fond.mjs           (live + seed)
//         node studio/seed/migrate-about-fond.mjs --dry-run (n'écrit rien)

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

// ── Blocs neufs par langue ────────────────────────────────────────────────────

const BLOCKS = {
  fr: {
    trustBar: {
      _key: 'ap-trust',
      _type: 'trustBar',
      items: [
        { _key: 't1', _type: 'proof', icon: 'lucide:award', value: 'Membre ASTTQ', label: 'gestion parasitaire du Québec' },
        { _key: 't2', _type: 'proof', icon: 'lucide:shield-check', value: 'Assurance responsabilité', label: 'couverture 2 M$' },
        { _key: 't3', _type: 'proof', icon: 'lucide:leaf', value: 'Produits homologués', label: 'Santé Canada' },
        { _key: 't4', _type: 'proof', icon: 'lucide:badge-check', value: 'Technicien licencié', label: 'certifié en intervention' },
      ],
    },
    team: {
      _key: 'ap-team',
      _type: 'team',
      eyebrow: 'Notre équipe',
      heading: 'Les visages derrière Rempart',
      lead: 'On reste une petite équipe d\'ici, à dessein: vous parlez toujours à quelqu\'un qui connaît votre dossier et votre maison.',
      members: [
        {
          _key: 'm1', _type: 'teamMember',
          name: 'Martin Lefebvre',
          role: 'Fondateur et technicien en chef',
          credentials: 'Membre ASTTQ, certifié en gestion parasitaire',
          bio: 'Il a démarré Rempart à Terrebonne en 2008. Il connaît les maisons de la Rive-Nord comme le fond de sa poche et forme chaque technicien à sa méthode.',
          photo: { _type: 'figure' },
        },
        {
          _key: 'm2', _type: 'teamMember',
          name: 'Julie Caron',
          role: 'Technicienne punaises de lit et détection',
          credentials: 'Certifiée en traitement thermique, maître-chien de détection',
          bio: 'Elle pilote les interventions de punaises de lit, du repérage à la détection canine, avec une discrétion totale.',
          photo: { _type: 'figure' },
        },
        {
          _key: 'm3', _type: 'teamMember',
          name: 'Samuel Ouellet',
          role: 'Technicien rongeurs et exclusion',
          credentials: 'Certifié en gestion parasitaire, spécialiste de l\'exclusion mécanique',
          bio: 'Il traque les points d\'entrée des souris et des rats, puis les scelle pour de bon plutôt que de seulement piéger.',
          photo: { _type: 'figure' },
        },
        {
          _key: 'm4', _type: 'teamMember',
          name: 'Nadia Bélanger',
          role: 'Technicienne commerciale et conformité',
          credentials: 'Certifiée HACCP, programmes préventifs',
          bio: 'Elle bâtit les programmes préventifs des restaurants et des commerces, avec les rapports qu\'exigent les inspections.',
          photo: { _type: 'figure' },
        },
      ],
    },
    highlights: {
      _key: 'ap-highlights',
      _type: 'highlights',
      eyebrow: 'Nos engagements',
      heading: 'Ce que vous obtenez avec Rempart',
      items: [
        { _key: 'h1', _type: 'highlight', title: 'Garantie de retour sans frais', body: 'Si le nuisible revient dans la période couverte, on revient le traiter sans vous refacturer.' },
        { _key: 'h2', _type: 'highlight', title: 'Rapport d\'inspection écrit', body: 'Remis après chaque visite: ce qu\'on a trouvé, ce qu\'on a traité et ce qu\'on recommande.' },
        { _key: 'h3', _type: 'highlight', title: 'Intervention souvent sous 24 à 48 h', body: 'Une vraie personne répond, 7 jours sur 7, et un technicien part vers vous rapidement.' },
        { _key: 'h4', _type: 'highlight', title: 'Estimation gratuite, prix clair', body: 'Le prix est fixé avant qu\'on commence, sans vente sous pression ni surprise sur la facture.' },
      ],
    },
  },
  en: {
    trustBar: {
      _key: 'ap-trust',
      _type: 'trustBar',
      items: [
        { _key: 't1', _type: 'proof', icon: 'lucide:award', value: 'ASTTQ member', label: 'Quebec pest management' },
        { _key: 't2', _type: 'proof', icon: 'lucide:shield-check', value: 'Liability insurance', label: '2 M$ coverage' },
        { _key: 't3', _type: 'proof', icon: 'lucide:leaf', value: 'Approved products', label: 'Health Canada' },
        { _key: 't4', _type: 'proof', icon: 'lucide:badge-check', value: 'Licensed technician', label: 'certified on the job' },
      ],
    },
    team: {
      _key: 'ap-team',
      _type: 'team',
      eyebrow: 'Our team',
      heading: 'The faces behind Rempart',
      lead: 'We stay a small local team on purpose: you always talk to someone who knows your file and your home.',
      members: [
        {
          _key: 'm1', _type: 'teamMember',
          name: 'Martin Lefebvre',
          role: 'Founder and lead technician',
          credentials: 'ASTTQ member, certified in pest management',
          bio: 'He started Rempart in Terrebonne in 2008. He knows North Shore homes inside out and trains every technician in his method.',
          photo: { _type: 'figure' },
        },
        {
          _key: 'm2', _type: 'teamMember',
          name: 'Julie Caron',
          role: 'Bed bug and detection technician',
          credentials: 'Certified in heat treatment, canine detection handler',
          bio: 'She leads bed bug work, from inspection to canine detection, with complete discretion.',
          photo: { _type: 'figure' },
        },
        {
          _key: 'm3', _type: 'teamMember',
          name: 'Samuel Ouellet',
          role: 'Rodent and exclusion technician',
          credentials: 'Certified in pest management, mechanical exclusion specialist',
          bio: 'He hunts down the entry points mice and rats use and seals them for good, instead of just trapping.',
          photo: { _type: 'figure' },
        },
        {
          _key: 'm4', _type: 'teamMember',
          name: 'Nadia Bélanger',
          role: 'Commercial and compliance technician',
          credentials: 'HACCP certified, preventive programs',
          bio: 'She builds preventive programs for restaurants and shops, with the reports inspections require.',
          photo: { _type: 'figure' },
        },
      ],
    },
    highlights: {
      _key: 'ap-highlights',
      _type: 'highlights',
      eyebrow: 'Our commitments',
      heading: 'What you get with Rempart',
      items: [
        { _key: 'h1', _type: 'highlight', title: 'Free return guarantee', body: 'If the pest comes back within the covered period, we come back to treat it at no extra charge.' },
        { _key: 'h2', _type: 'highlight', title: 'Written inspection report', body: 'Handed to you after every visit: what we found, what we treated and what we recommend.' },
        { _key: 'h3', _type: 'highlight', title: 'Often on site within 24 to 48 h', body: 'A real person answers, seven days a week, and a technician heads your way quickly.' },
        { _key: 'h4', _type: 'highlight', title: 'Free estimate, clear price', body: 'The price is set before we start, with no pressure selling and no surprise on the bill.' },
      ],
    },
  },
}

const STAT_VALUE = { fr: '7 villes', en: '7 cities' }
const DOCS = [
  { id: 'aboutPage-fr', lang: 'fr' },
  { id: 'aboutPage-en', lang: 'en' },
]

function newBlocksFor(lang) {
  const b = BLOCKS[lang]
  return [b.trustBar, b.team, b.highlights]
}

// Insère les blocs après le bloc about (b1) dans un pageBuilder donné (mémoire).
function insertIntoPageBuilder(pageBuilder, lang) {
  const out = []
  for (const block of pageBuilder) {
    if (block._type === 'about') {
      // Corrige la stat villes (s3) au passage.
      const stats = (block.stats || []).map((s) =>
        s._key === 's3' ? { ...s, value: STAT_VALUE[lang] } : s
      )
      out.push({ ...block, stats })
      out.push(...newBlocksFor(lang))
    } else {
      out.push(block)
    }
  }
  return out
}

async function migrateLive(id, lang) {
  const doc = await client.getDocument(id)
  if (!doc) throw new Error(`Document live introuvable: ${id}`)
  if ((doc.pageBuilder || []).some((b) => b._key === 'ap-trust')) {
    console.log(`  ${id}: déjà migré (ap-trust présent), saut.`)
    return false
  }
  if (DRY) {
    console.log(`  ${id}: DRY, insertion de trustBar/team/highlights + stat 7 villes`)
    return false
  }
  await client
    .patch(id)
    .set({ 'pageBuilder[_key=="b1"].stats[_key=="s3"].value': STAT_VALUE[lang] })
    .insert('after', 'pageBuilder[_key=="b1"]', newBlocksFor(lang))
    .commit({ visibility: 'sync' })
  console.log(`  ${id}: live patché (3 blocs insérés + stat).`)
  return true
}

function migrateSeed() {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'))
  let changed = 0
  for (const d of seed.documents) {
    if (d.type !== 'aboutPage') continue
    const lang = d.content.language
    if (!BLOCKS[lang]) continue
    if ((d.content.pageBuilder || []).some((b) => b._key === 'ap-trust')) continue
    d.content.pageBuilder = insertIntoPageBuilder(d.content.pageBuilder, lang)
    changed++
  }
  if (DRY) {
    console.log(`  seed: ${changed} doc(s) seraient mis à jour (DRY).`)
    return
  }
  writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n')
  console.log(`  seed-content.json: ${changed} doc(s) mis à jour (miroir).`)
}

async function main() {
  console.log(`Migration FOND À propos (dataset ${client.config().dataset})`)
  for (const { id, lang } of DOCS) await migrateLive(id, lang)
  migrateSeed()
  console.log('Terminé.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
