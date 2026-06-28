import {
  House,
  Trophy,
  Laptop,
  Layers,
  Quote,
  Route,
  Mail,
  type LucideIcon,
} from 'lucide-react'
import { SectionId, SectionModelId } from 'src/config/enums'
import { SECTIONS } from 'src/config/scenes'

export interface SectionIconConfig {
  modelId: SectionModelId
  Icon: LucideIcon
}

/** Section → nav icon + 3D model (decoupled: Lucide for nav, GLB for canvas). */
export const SECTION_ICON_CONFIG: Record<SectionId, SectionIconConfig> = {
  [SectionId.Hero]: { modelId: SectionModelId.House, Icon: House },
  [SectionId.About]: { modelId: SectionModelId.Trophy, Icon: Trophy },
  [SectionId.Portfolio]: { modelId: SectionModelId.Laptop, Icon: Laptop },
  [SectionId.Skills]: { modelId: SectionModelId.Books, Icon: Layers },
  [SectionId.Testimonials]: { modelId: SectionModelId.Bubble, Icon: Quote },
  [SectionId.Timeline]: { modelId: SectionModelId.Signpost, Icon: Route },
  [SectionId.Contact]: { modelId: SectionModelId.Letter, Icon: Mail },
}

export const SECTION_ICON_LIST: readonly SectionIconConfig[] = SECTIONS.map(
  (id) => SECTION_ICON_CONFIG[id],
)
