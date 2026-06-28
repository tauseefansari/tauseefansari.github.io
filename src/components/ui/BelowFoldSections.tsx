import { AboutSection } from 'src/components/ui/sections/AboutSection'
import { PortfolioSection } from 'src/components/ui/sections/PortfolioSection'
import { SkillsSection } from 'src/components/ui/sections/SkillsSection'
import { TestimonialsSection } from 'src/components/ui/sections/TestimonialsSection'
import { TimelineSection } from 'src/components/ui/sections/TimelineSection'
import { ContactSection } from 'src/components/ui/sections/ContactSection'

/** Below-the-fold sections — code-split so hero/LCP stays off the critical path. */
export function BelowFoldSections() {
  return (
    <>
      <AboutSection />
      <PortfolioSection />
      <SkillsSection />
      <TestimonialsSection />
      <TimelineSection />
      <ContactSection />
    </>
  )
}
