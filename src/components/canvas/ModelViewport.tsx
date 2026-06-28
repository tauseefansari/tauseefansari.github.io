import { useEffect, useRef, type ReactNode } from 'react'
import {
  MODEL_VIEWPORT_HEIGHT,
  MODEL_VIEWPORT_TOP,
  SECTION_SHELL,
} from 'src/config/sectionLayout'
import { EASE_OUT_CSS } from 'src/config/motion'
import { modelPanelLeftForSection } from 'src/lib/modelPanel'
import { useStore } from 'src/store/useStore'
import { useIsMobile, usePrefersReducedMotion } from 'src/hooks/useMediaQuery'

interface ModelViewportProps {
  children: ReactNode
  className?: string
}

/**
 * Half-width panel inside max-w-7xl — snaps to active section side (zig-zag).
 * Stays fixed full-viewport.
 */
export function ModelViewport({ children, className = '' }: ModelViewportProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const shell = shellRef.current
    const panel = panelRef.current
    if (!shell || !panel) return

    let lastSection = -1
    let cleanup: (() => void) | undefined
    let disposed = false

    void import('gsap').then(({ gsap }) => {
      if (disposed) return

      const apply = () => {
        const { section, panelOffsetY } = useStore.getState()
        shell.style.transform = `translateY(${panelOffsetY}px)`

        if (section === lastSection) return
        lastSection = section
        const left = modelPanelLeftForSection(section, isMobile)
        panel.style.left = isMobile ? '0%' : `${left}%`
      }

      apply()
      gsap.ticker.add(apply)
      cleanup = () => gsap.ticker.remove(apply)
    })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [isMobile])

  const transition = reducedMotion ? 'none' : `left 0.75s ${EASE_OUT_CSS}`

  return (
    <div
      ref={shellRef}
      className="pointer-events-none fixed inset-x-0 z-0 flex justify-center overflow-hidden will-change-transform"
      style={{ top: MODEL_VIEWPORT_TOP, height: MODEL_VIEWPORT_HEIGHT }}
      aria-hidden="true"
    >
      <div className={`relative h-full ${SECTION_SHELL}`}>
        <div
          ref={panelRef}
          className={`absolute top-0 h-full w-full overflow-hidden lg:w-1/2 ${className}`}
          style={{ transition }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
