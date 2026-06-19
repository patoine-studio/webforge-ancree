/* Table de dispatch des variantes de heros: un _type (kebab-case) vers un
 * composant. Mecanisme repris tel quel du systeme. Une seule variante pour
 * l'instant (split asymetrique); les variantes pleine-image et centree
 * rejoindront le catalogue ensuite. */
import HeroHome from './block/home.vue'

export const heroBlockMap = {
  'hero-home': HeroHome
} as const

export type HeroBlockType = keyof typeof heroBlockMap
