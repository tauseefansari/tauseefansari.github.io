import { useTranslation } from 'react-i18next'
import { Quote } from 'lucide-react'
import { ContentSection } from 'src/components/ui/ContentSection'
import { FadeUpItem, FadeUpList } from 'src/components/ui/FadeUpList'
import { GlassPanel } from 'src/components/ui/GlassPanel'
import { SectionGlow, SectionId } from 'src/config/enums'
import { TESTIMONIAL_IDS } from 'src/config/scenes'

export function TestimonialsSection() {
  const { t } = useTranslation('portfolio')

  return (
    <ContentSection
      id={SectionId.Testimonials}
      title={t('testimonials.title')}
      subtitle={t('testimonials.subtitle')}
      glow={SectionGlow.Accent}
    >
      <FadeUpList>
        {TESTIMONIAL_IDS.map((id) => (
          <FadeUpItem key={id}>
            <GlassPanel as="figure" className="elevation-hover flex flex-col">
              <Quote size={22} aria-hidden="true" className="text-accent" />
              <blockquote className="mt-3 text-sm text-text sm:text-base">
                {t(`testimonials.items.${id}.quote`)}
              </blockquote>
              <figcaption className="mt-4">
                <p className="font-medium">{t(`testimonials.items.${id}.author`)}</p>
                <p className="text-sm text-text-muted">
                  {t(`testimonials.items.${id}.position`)}
                </p>
              </figcaption>
            </GlassPanel>
          </FadeUpItem>
        ))}
      </FadeUpList>
    </ContentSection>
  )
}
