import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Loader } from 'src/components/ui/Loader'
import { Header } from 'src/components/ui/Header'
import { ScrollSections } from 'src/components/ui/ScrollSections'
import { SectionAnnouncer } from 'src/components/ui/SectionAnnouncer'
import { SEO } from 'src/components/ui/SEO'
import { useScrollController } from 'src/hooks/useScrollController'
import { useSmoothScroll } from 'src/hooks/useSmoothScroll'
import { usePrefersReducedMotion } from 'src/hooks/useMediaQuery'
import { scheduleIdleTask } from 'src/lib/idleCallback'

const Footer = lazy(() =>
  import('src/components/ui/Footer').then((m) => ({ default: m.Footer })),
)

// Code-split the entire WebGL layer (three/rapier/drei) into its own chunk so
// the DOM content paints first — keeps LCP fast and the main bundle small.
const Experience = lazy(() =>
  import('src/components/canvas/Experience').then((m) => ({
    default: m.Experience,
  })),
)

/** Idle timeouts — stagger heavy work after hero content is interactive. */
const SCROLL_IDLE_MS = 1800
const EXPERIENCE_IDLE_MS = 4500

/**
 * Orchestration: a fixed WebGL layer behind a scrolling DOM layer. The DOM
 * drives a GSAP timeline whose progress is read by the 3D camera via the store.
 */
export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('common')
  const reducedMotion = usePrefersReducedMotion()
  const [contentReady, setContentReady] = useState(false)
  const [scrollReady, setScrollReady] = useState(false)
  const [experienceReady, setExperienceReady] = useState(false)

  useSmoothScroll(scrollReady)
  useScrollController(scrollRef, scrollReady)

  useEffect(() => {
    if (!contentReady) return
    return scheduleIdleTask(() => setScrollReady(true), SCROLL_IDLE_MS)
  }, [contentReady])

  useEffect(() => {
    if (!scrollReady) return
    return scheduleIdleTask(() => setExperienceReady(true), EXPERIENCE_IDLE_MS)
  }, [scrollReady])

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <SEO />
      <Loader onComplete={() => setContentReady(true)} />

      {/* Keyboard skip-link to the main content (accessibility). */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        {t('a11y.skipToContent')}
      </a>

      <Header />
      <SectionAnnouncer />

      {/* Fixed 3D background — deferred well after LCP to keep mobile TBT low. */}
      {experienceReady && (
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      )}

      {/* Scrolling DOM content on top. */}
      <div ref={scrollRef} className="relative z-10 overflow-x-hidden">
        <ScrollSections />
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </MotionConfig>
  )
}
