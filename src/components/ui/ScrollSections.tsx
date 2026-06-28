import { lazy, Suspense } from 'react'
import { HeroSection } from 'src/components/ui/sections/HeroSection'

const BelowFoldSections = lazy(() =>
  import('src/components/ui/BelowFoldSections').then((m) => ({
    default: m.BelowFoldSections,
  })),
)

export function ScrollSections() {
  return (
    <main id="main">
      <HeroSection />
      <Suspense fallback={null}>
        <BelowFoldSections />
      </Suspense>
    </main>
  )
}
