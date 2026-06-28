import { SECTION_ICON_CONFIG } from 'src/config/sectionIcons'
import { SECTION_META, SECTIONS } from 'src/config/scenes'
import type { SectionId } from 'src/config/enums'

type NavKey = (typeof SECTION_META)[SectionId]['navKey']

export const NAV_ITEMS = SECTIONS.map((section) => ({
  section,
  key: SECTION_META[section].navKey,
  ...SECTION_ICON_CONFIG[section],
})) as readonly {
  section: SectionId
  key: NavKey
  modelId: (typeof SECTION_ICON_CONFIG)[SectionId]['modelId']
  Icon: (typeof SECTION_ICON_CONFIG)[SectionId]['Icon']
}[]

export type NavItemKey = NavKey
