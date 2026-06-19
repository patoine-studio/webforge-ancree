/* Parallaxe vertical au defilement: l'image surdimensionnee translate dans son
 * cadre (overflow hidden) sans reveler de bord. ease 'none' obligatoire (un
 * scrub doit suivre le defilement lineairement). Garde explicite motionDisabled():
 * le reset CSS reduced-motion ne couvre PAS les transforms JS. Signature a deux
 * refs (image, cadre); le cadre est le declencheur ScrollTrigger. */
import { onMounted, onUnmounted, type Ref } from 'vue'
import { MOTION, motionDisabled } from '~/family/motion'

type ParallaxTween = { scrollTrigger?: { kill: () => void }; kill: () => void }

export function useParallax(image: Ref<HTMLElement | null>, frame: Ref<HTMLElement | null>): void {
  let tween: ParallaxTween | null = null
  let disposed = false

  onMounted(() => {
    if (motionDisabled()) return
    const el = image.value
    const trigger = frame.value
    if (!el || !trigger) return
    void (async () => {
      const { gsap, registerGsap } = await import('~/family/motion-gsap')
      if (disposed || !el.isConnected) return
      registerGsap()
      tween = gsap.fromTo(
        el,
        { yPercent: MOTION.parallax.travel },
        {
          yPercent: -MOTION.parallax.travel,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: MOTION.parallax.start,
            end: MOTION.parallax.end,
            scrub: MOTION.parallax.scrub
          }
        }
      ) as unknown as ParallaxTween
    })()
  })

  onUnmounted(() => {
    disposed = true
    tween?.scrollTrigger?.kill()
    tween?.kill()
  })
}
