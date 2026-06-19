/* Face GSAP du mouvement. Chargee UNIQUEMENT par import dynamique
 * (import('~/family/motion-gsap')) depuis les trois consommateurs (directive
 * reveal, useEntrance, useParallax). Ne JAMAIS l'importer statiquement depuis un
 * plugin d'entree, sinon GSAP entre dans chaque page. Vite emet un seul chunk
 * async partage, charge une fois et mis en cache. */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

let registered = false

export function registerGsap(): void {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger, CustomEase)
  // Deceleration marquee « se pose au sol » == cubic-bezier(0.16, 1, 0.3, 1).
  CustomEase.create('settle', 'M0,0 C0.16,1 0.3,1 1,1')
  registered = true
}

export { gsap, ScrollTrigger }
