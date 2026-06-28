import { useTranslation } from 'react-i18next'
import { ContentSection } from 'src/components/ui/ContentSection'
import { FadeUpItem, FadeUpList } from 'src/components/ui/FadeUpList'
import { SkillCard } from 'src/components/ui/SkillCard'
import { SectionGlow, SectionId } from 'src/config/enums'
import { SKILL_IDS } from 'src/config/skills'

export function SkillsSection() {
  const { t } = useTranslation('portfolio')

  return (
    <ContentSection
      id={SectionId.Skills}
      title={t('skills.title')}
      subtitle={t('skills.subtitle')}
      glow={SectionGlow.Accent}
      className="lg:items-start"
    >
      <FadeUpList className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {SKILL_IDS.map((id) => (
          <FadeUpItem key={id}>
            <SkillCard id={id} label={t(`skills.items.${id}`)} />
          </FadeUpItem>
        ))}
      </FadeUpList>
    </ContentSection>
  )
}
