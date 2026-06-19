/* Directive v-reveal: apparition au defilement du contenu d'une section. La
 * SECTION elle-meme n'est jamais animee (son fond est present tout de suite);
 * seuls les noeuds marques montent et se posent par-dessus. Opt-in (defaut on),
 * v-reveal="false" pour couper. GSAP arrive par import dynamique; garde isConnected
 * pour eviter un ScrollTrigger orphelin si demonte pendant le chargement du chunk. */
import type { Directive } from 'vue'
import { MOTION, motionDisabled } from '~/family/motion'
import { collectRevealTargets } from '~/utils/revealTargets'

type RevealTween = { scrollTrigger?: { kill: () => void }; kill: () => void }

interface RevealEl extends HTMLElement {
  _wfReveal?: RevealTween
}

export const reveal: Directive<RevealEl, boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value === false) return
    if (motionDisabled()) return
    const targets = collectRevealTargets(el)
    if (!targets.length) return
    void (async () => {
      const { gsap, registerGsap } = await import('~/family/motion-gsap')
      if (!el.isConnected) return
      registerGsap()
      el._wfReveal = gsap.from(targets, {
        opacity: 0,
        y: MOTION.reveal.distance,
        duration: MOTION.duration.reveal,
        ease: MOTION.ease.settle,
        stagger: MOTION.reveal.stagger,
        scrollTrigger: { trigger: el, start: MOTION.reveal.start, once: true }
      }) as unknown as RevealTween
    })()
  },
  unmounted(el) {
    el._wfReveal?.scrollTrigger?.kill()
    el._wfReveal?.kill()
  }
}
