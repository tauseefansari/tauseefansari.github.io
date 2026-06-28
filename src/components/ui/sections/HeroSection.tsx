import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronDown, FileText } from 'lucide-react'
import { fadeUp, staggerContainer } from 'src/config/motion'
import { SectionId } from 'src/config/enums'
import { SECTION_LAYOUT } from 'src/config/scenes'
import {
  SECTION_GRID,
  contentColumnClasses,
  modelSpacerClasses,
} from 'src/config/sectionLayout'
import { useParallax } from 'src/hooks/useParallax'
import { env, hasResumeUrl } from 'src/config/env'
import { SITE } from 'src/config/site'
import { ExternalLink } from 'src/components/ui/ExternalLink'

const heroGlassCtaClass =
  'glass inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 hover:border-accent/40'

export function HeroSection() {
  const { t } = useTranslation('portfolio')
  const ref = useRef<HTMLElement>(null)
  const y = useParallax(ref, 24)

  const side = SECTION_LAYOUT[SectionId.Hero]

  return (
    <section
      ref={ref}
      id={SectionId.Hero}
      data-section
      aria-labelledby="hero-heading"
      className={`section overflow-hidden ${SECTION_GRID} min-h-dvh items-center`}
    >
      <div className={modelSpacerClasses(side)} aria-hidden="true" />

      <motion.div
        style={{ y }}
        variants={staggerContainer}
        initial={false}
        animate="visible"
        className={contentColumnClasses(side)}
      >
        <motion.p variants={fadeUp} className="font-mono text-sm text-accent">
          {t('hero.greeting')}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          id="hero-heading"
          className="mt-2 bg-linear-to-r from-text to-accent bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl"
        >
          {SITE.name}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-3 text-lg text-text-muted sm:text-xl">
          {t('hero.role')}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-md text-base leading-relaxed text-text-muted"
        >
          {t('hero.tagline')}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-center"
        >
          <a
            href={`#${SectionId.Portfolio}`}
            className="group inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-2"
          >
            {t('hero.cta')}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a href={`#${SectionId.Contact}`} className={heroGlassCtaClass}>
            {t('contact.cta')}
          </a>
          {hasResumeUrl() && (
            <ExternalLink
              href={env.resumeUrl!}
              download
              aria-label={t('hero.resumeAria', { name: SITE.name })}
              className={`${heroGlassCtaClass} gap-2`}
            >
              <FileText size={16} aria-hidden="true" />
              {t('hero.resumeCta')}
            </ExternalLink>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center text-text-muted sm:bottom-12"
      >
        <span className="text-xs uppercase tracking-widest">{t('hero.scrollHint')}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.span>
      </motion.div>
    </section>
  )
}
