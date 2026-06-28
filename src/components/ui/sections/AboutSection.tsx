import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ContentSection } from 'src/components/ui/ContentSection'
import { FadeUpItem, FadeUpList } from 'src/components/ui/FadeUpList'
import { GlassPanel } from 'src/components/ui/GlassPanel'
import { fadeUp } from 'src/config/motion'

import { AboutStatId, SectionGlow, SectionId } from 'src/config/enums'

const STAT_IDS: readonly AboutStatId[] = [
  AboutStatId.Experience,
  AboutStatId.Designs,
  AboutStatId.Tests,
]

export function AboutSection() {
  const { t } = useTranslation('portfolio')

  return (
    <ContentSection
      id={SectionId.About}
      title={t('about.title')}
      glow={SectionGlow.Accent}
    >
      <motion.p variants={fadeUp} className="mt-4 text-lg text-text">
        {t('about.lead')}
      </motion.p>
      <motion.p variants={fadeUp} className="mt-3 text-text-muted">
        {t('about.body')}
      </motion.p>
      <FadeUpList className="mx-auto mt-8 grid w-full max-w-xl gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
        {STAT_IDS.map((id) => (
          <FadeUpItem key={id}>
            <GlassPanel as="div" className="elevation-hover p-4 text-center sm:p-5">
              <p className="text-2xl font-semibold text-accent">
                {t(`about.stats.${id}.value`)}
              </p>
              <p className="mt-1 text-xs text-text-muted sm:text-sm">
                {t(`about.stats.${id}.label`)}
              </p>
            </GlassPanel>
          </FadeUpItem>
        ))}
      </FadeUpList>
    </ContentSection>
  )
}
