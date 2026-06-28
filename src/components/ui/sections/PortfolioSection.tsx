import { useTranslation } from 'react-i18next'
import { ContentSection } from 'src/components/ui/ContentSection'
import { FadeUpItem, FadeUpList } from 'src/components/ui/FadeUpList'
import { ProjectCard } from 'src/components/ui/ProjectCard'
import { SectionGlow, SectionId } from 'src/config/enums'
import { PROJECT_IDS, PROJECT_LINKS } from 'src/config/scenes'

export function PortfolioSection() {
  const { t } = useTranslation('portfolio')
  const { t: tc } = useTranslation('common')

  return (
    <ContentSection
      id={SectionId.Portfolio}
      title={t('portfolio.title')}
      subtitle={t('portfolio.subtitle')}
      glow={SectionGlow.Accent2}
      contentClassName="text-left lg:w-full lg:max-w-none lg:justify-self-stretch"
      headingClassName="text-left"
    >
      <FadeUpList
        as="div"
        className="grid w-full grid-cols-1 items-stretch gap-y-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6"
      >
        {PROJECT_IDS.map((id) => {
          const name = t(`portfolio.items.${id}.name`)
          const links = PROJECT_LINKS[id]

          return (
            <FadeUpItem key={id} as="div" className="h-full">
              <ProjectCard
                name={name}
                stack={t(`portfolio.items.${id}.stack`)}
                links={links}
                codeAria={tc('a11y.projectRepo', { name })}
                demoAria={tc('a11y.projectDemo', { name })}
              />
            </FadeUpItem>
          )
        })}
      </FadeUpList>
    </ContentSection>
  )
}
