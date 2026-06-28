import { Mail } from 'lucide-react'
import type { ComponentType } from 'react'
import { SocialId } from 'src/config/enums'
import { env } from 'src/config/env'
import { BrandIcon } from 'src/components/ui/icons/BrandIcon'

interface IconProps {
  size?: number
}

/** Hand-authored LinkedIn glyph (simple-icons removed it at LinkedIn's request). */
function LinkedInGlyph({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

/**
 * Renderers for each social-link id. Open for extension (add an entry to
 * support a new social), closed for modification — the consuming code stays
 * the same. Brand marks come from the central `BrandIcon` registry; only
 * non-brand or unavailable glyphs need a custom component.
 */
const SOCIAL_ICONS: Record<SocialId, ComponentType<IconProps>> = {
  [SocialId.Linkedin]: LinkedInGlyph,
  [SocialId.Github]: ({ size = 20 }) => <BrandIcon name="github" size={size} />,
  [SocialId.Facebook]: ({ size = 20 }) => <BrandIcon name="facebook" size={size} />,
  [SocialId.Instagram]: ({ size = 20 }) => <BrandIcon name="instagram" size={size} />,
  [SocialId.Whatsapp]: ({ size = 20 }) => <BrandIcon name="whatsapp" size={size} />,
  [SocialId.Email]: ({ size = 20 }) => <Mail size={size} aria-hidden="true" />,
}

interface SocialIconProps {
  id: SocialId
  size?: number
}

/**
 * Resolves a social link id to its icon via the registry. Returns null and
 * logs in development if a link id has no registered icon, so missing icons
 * fail loud during development without crashing the app in production.
 */
export function SocialIcon({ id, size = 20 }: SocialIconProps) {
  const Icon = SOCIAL_ICONS[id]
  if (!Icon) {
    if (env.isDevelopment) {
      console.warn(`[SocialIcon] No icon registered for id="${id}"`)
    }
    return null
  }
  return <Icon size={size} />
}
