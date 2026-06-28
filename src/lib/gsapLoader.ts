import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger'
import type { gsap as GsapCore } from 'gsap'

export interface GsapScrollBundle {
  gsap: typeof GsapCore
  ScrollTrigger: typeof ScrollTriggerPlugin
}

let bundle: Promise<GsapScrollBundle> | undefined

/** Single dynamic import for GSAP + ScrollTrigger — avoids duplicate parse/eval. */
export function loadGsapScrollTrigger(): Promise<GsapScrollBundle> {
  if (!bundle) {
    bundle = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapMod, stMod]) => {
        const { gsap } = gsapMod
        const { ScrollTrigger } = stMod
        gsap.registerPlugin(ScrollTrigger)
        return { gsap, ScrollTrigger }
      },
    )
  }
  return bundle
}
