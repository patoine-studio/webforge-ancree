/* Apparition au CHARGEMENT (pas au defilement) pour le contenu au-dessus de la
 * ligne de flottaison, le heros. Memes marqueurs que v-reveal (data-reveal /
 * data-reveal-stagger). fromTo (et non from): le masque anti-flash a deja mis
 * l'opacite a 0, un simple from lirait 0 comme cible. Le drapeau disposed et la
 * verification isConnected evitent un tween orphelin si demonte pendant l'import. */
import { onMounted, onUnmounted, type Ref } from 'vue'
import { MOTION, motionDisabled } from '~/family/motion'
import { collectRevealTargets } from '~/utils/revealTargets'

type EntranceTween = { kill: () => void }

export function useEntrance(root: Ref<HTMLElement | null>): void {
  let tween: EntranceTween | null = null
  let disposed = false

  onMounted(() => {
    if (motionDisabled()) return
    const el = root.value
    if (!el) return
    const targets = collectRevealTargets(el)
    if (!targets.length) return
    void (async () => {
      try {
        const { gsap, registerGsap } = await import('~/family/motion-gsap')
        if (disposed || !el.isConnected) return
        registerGsap()
        tween = gsap.fromTo(
          targets,
          { opacity: 0, y: MOTION.entrance.distance },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.entrance.duration,
            ease: MOTION.ease.settle,
            stagger: MOTION.entrance.stagger,
            delay: MOTION.entrance.delay
          }
        ) as unknown as EntranceTween
      } catch {
        // GSAP indisponible: on devoile sans animation pour ne JAMAIS laisser le
        // contenu masque par le CSS anti-flash (echec de chargement du chunk).
        targets.forEach((node) => {
          node.style.opacity = '1'
          node.style.transform = 'none'
        })
      }
    })()
  })

  onUnmounted(() => {
    disposed = true
    tween?.kill()
  })
}
