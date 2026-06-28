import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Briefcase, GraduationCap } from 'lucide-react'
import { ContentSection } from 'src/components/ui/ContentSection'
import { GlassPanel } from 'src/components/ui/GlassPanel'
import { fadeLeft, VIEWPORT } from 'src/config/motion'
import { SectionGlow, SectionId } from 'src/config/enums'
import { TIMELINE_IDS } from 'src/config/scenes'

export function TimelineSection() {
  const { t } = useTranslation('portfolio')
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <ContentSection
      id={SectionId.Timeline}
      title={t('timeline.title')}
      subtitle={t('timeline.subtitle')}
      glow={SectionGlow.Accent2}
    >
      <div className="relative mt-6 w-full">
        <span
          className="absolute inset-y-2 left-4 w-px -translate-x-1/2 rounded bg-glass-border"
          aria-hidden="true"
        />
        <motion.span
          style={{ scaleY: lineScale }}
          className="absolute inset-y-2 left-4 w-0.5 -translate-x-1/2 origin-top rounded bg-accent"
          aria-hidden="true"
        />
        <ol ref={listRef} className="w-full ps-12 sm:ps-14">
          {[...TIMELINE_IDS].reverse().map((id) => {
            const isStudy = t(`timeline.items.${id}.type`) === 'study'
            const Icon = isStudy ? GraduationCap : Briefcase

            return (
              <motion.li key={id} variants={fadeLeft} className="relative mb-5 last:mb-0">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute -left-12 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white ring-4 ring-bg sm:-left-14 sm:h-8 sm:w-8"
                >
                  <Icon size={13} aria-hidden="true" />
                </motion.span>
                <GlassPanel as="div" className="elevation-hover">
                  <p className="font-mono text-xs text-accent">
                    {t(`timeline.items.${id}.period`)}
                  </p>
                  <h3 className="mt-1 font-medium">{t(`timeline.items.${id}.title`)}</h3>
                  <p className="text-sm text-text-muted">
                    {t(`timeline.items.${id}.organization`)}
                  </p>
                  <p className="mt-2 text-sm text-text">
                    {t(`timeline.items.${id}.description`)}
                  </p>
                </GlassPanel>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </ContentSection>
  )
}
