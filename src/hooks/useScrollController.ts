import type { RefObject } from 'react'
import { useEffect } from 'react'
import { SectionId } from 'src/config/enums'
import {
  contactPanelOffsetY,
  isInFooterZone,
  resolveActiveSection,
  shouldTrackContactSection,
} from 'src/lib/modelPanel'
import { resolveMorphState } from 'src/lib/morphProgress'
import { loadGsapScrollTrigger } from 'src/lib/gsapLoader'
import { useStore } from 'src/store/useStore'
import { usePrefersReducedMotion } from 'src/hooks/useMediaQuery'

/**
 * Master scroll progress (0→1) for subtle parallax + active section index.
 * Section index uses viewport-center detection so uneven heights stay in sync.
 * GSAP is dynamically imported so it stays off the LCP critical path.
 */
export function useScrollController(
  scrollRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled) return

    let disposed = false
    let cleanup: (() => void) | undefined

    void loadGsapScrollTrigger().then(({ gsap, ScrollTrigger }) => {
      if (disposed) return

      const {
        setScrollProgress,
        setSection,
        setMorphState,
        setFooterPinned,
        setPanelOffsetY,
        setCanvasVisible,
      } = useStore.getState()

      const syncSection = () => {
        const footerPinned = isInFooterZone()
        const section = resolveActiveSection()
        const morphState = resolveMorphState()

        setFooterPinned(footerPinned)
        setSection(section)
        setMorphState(morphState)

        const trackContact = shouldTrackContactSection(section, morphState, footerPinned)
        setPanelOffsetY(trackContact ? contactPanelOffsetY() : 0)
      }

      const onScroll = () => syncSection()

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: scrollRef.current ?? undefined,
          start: 'top top',
          endTrigger: `#${SectionId.Contact}`,
          end: 'bottom bottom',
          scrub: reducedMotion ? true : 1.4,
          onUpdate: (self) => {
            setScrollProgress(self.progress)
            syncSection()
          },
        })

        window.addEventListener('scroll', onScroll, { passive: true })

        setCanvasVisible(true)
        syncSection()
      }, scrollRef)

      cleanup = () => {
        window.removeEventListener('scroll', onScroll)
        ctx.revert()
      }
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [scrollRef, reducedMotion, enabled])
}
