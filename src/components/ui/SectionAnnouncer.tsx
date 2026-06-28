import { useTranslation } from 'react-i18next'
import { useStore } from 'src/store/useStore'
import { SectionId } from 'src/config/enums'
import { SECTION_META, SECTIONS } from 'src/config/scenes'
import { SITE } from 'src/config/site'

export function SectionAnnouncer() {
  const { t } = useTranslation('portfolio')
  const { t: tc } = useTranslation('common')
  const section = useStore((s) => s.section)
  const id = SECTIONS[section] ?? SectionId.Hero
  const titleKey = SECTION_META[id].titleKey
  const label = titleKey === null ? SITE.name : t(titleKey)

  return (
    <p aria-live="polite" className="sr-only">
      {tc('a11y.sectionChanged', { section: label })}
    </p>
  )
}
