import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ContentSection } from 'src/components/ui/ContentSection'
import { GlassPanel } from 'src/components/ui/GlassPanel'
import { ContactForm } from 'src/components/ui/ContactForm'
import { fadeUp } from 'src/config/motion'
import { SectionGlow, SectionId } from 'src/config/enums'

export function ContactSection() {
  const { t } = useTranslation('portfolio')

  return (
    <ContentSection
      id={SectionId.Contact}
      title={t('contact.title')}
      subtitle={t('contact.tagline')}
      glow={SectionGlow.Accent}
    >
      <motion.div variants={fadeUp} className="mt-6 w-full">
        <GlassPanel as="div" className="flex flex-col">
          <ContactForm />
        </GlassPanel>
      </motion.div>
    </ContentSection>
  )
}
