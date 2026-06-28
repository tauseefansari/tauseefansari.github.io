import { useEffect } from 'react'
import { usePrefersReducedMotion } from 'src/hooks/useMediaQuery'
import { loadGsapScrollTrigger } from 'src/lib/gsapLoader'

/**
 * Inertial scroll via Lenis, synced with GSAP ScrollTrigger for 3D progress.
 * Respects prefers-reduced-motion — falls back to native scroll.
 * GSAP/Lenis are dynamically imported so they stay off the LCP critical path.
 */
export function useSmoothScroll(enabled = true) {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled || reducedMotion) return

    let disposed = false
    let cleanup: (() => void) | undefined

    void Promise.all([import('lenis'), loadGsapScrollTrigger()]).then(
      ([lenisMod, { gsap, ScrollTrigger }]) => {
        if (disposed) return

        const Lenis = lenisMod.default

        const lenis = new Lenis({
          lerp: 0.09,
          smoothWheel: true,
          wheelMultiplier: 0.85,
          touchMultiplier: 1.4,
          anchors: true,
        })

        lenis.on('scroll', ScrollTrigger.update)

        const tick = (time: number) => {
          lenis.raf(time * 1000)
        }
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        requestAnimationFrame(() => ScrollTrigger.refresh())

        const html = document.documentElement
        const prevBehavior = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'

        cleanup = () => {
          lenis.destroy()
          gsap.ticker.remove(tick)
          html.style.scrollBehavior = prevBehavior
        }
      },
    )

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [enabled, reducedMotion])
}
