import {
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siOpenjdk,
  siPython,
  siPhp,
  siCplusplus,
  siTailwindcss,
  siCodeigniter,
  siQt,
  siGit,
  siGithub,
  siSubversion,
  siJenkins,
  siGithubactions,
  siFigma,
  siMysql,
  siPostgresql,
  siGooglecloud,
  siGithubcopilot,
  siClaude,
  siCursor,
  siFacebook,
  siInstagram,
  siWhatsapp,
  type SimpleIcon,
} from 'simple-icons'

/**
 * Brand icon registry — single source of truth.
 *
 * To support a new brand mark anywhere in the app (skills grid, social links,
 * etc.) add ONE entry here. The key becomes the public `BrandIconName` and
 * is used as the id everywhere else (skills config, social links config).
 *
 * Note: simple-icons does not ship every brand (LinkedIn, Adobe, AWS, Oracle,
 * VS Code, ChatGPT have all been removed at the brand owners' request). For
 * those, render a custom glyph in the consumer (see `SocialIcon`) or omit.
 * `openjdk` is the closest licensed proxy for "Java".
 */
const BRAND_ICONS = {
  react: siReact,
  nextdotjs: siNextdotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  openjdk: siOpenjdk,
  python: siPython,
  php: siPhp,
  cplusplus: siCplusplus,
  tailwindcss: siTailwindcss,
  codeigniter: siCodeigniter,
  qt: siQt,
  git: siGit,
  github: siGithub,
  subversion: siSubversion,
  jenkins: siJenkins,
  githubactions: siGithubactions,
  figma: siFigma,
  mysql: siMysql,
  postgresql: siPostgresql,
  googlecloud: siGooglecloud,
  githubcopilot: siGithubcopilot,
  claude: siClaude,
  cursor: siCursor,
  facebook: siFacebook,
  instagram: siInstagram,
  whatsapp: siWhatsapp,
} satisfies Record<string, SimpleIcon>

export type BrandIconName = keyof typeof BRAND_ICONS

interface BrandIconProps {
  name: BrandIconName
  size?: number
  /** Use the brand's official color instead of currentColor. */
  colored?: boolean
  className?: string
  title?: string
}

/** Renders an authentic brand logo from simple-icons as an inline SVG. */
export function BrandIcon({
  name,
  size = 24,
  colored = false,
  className,
  title,
}: BrandIconProps) {
  const icon = BRAND_ICONS[name]
  return (
    <svg
      role="img"
      aria-hidden={title ? undefined : true}
      aria-label={title}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={colored ? `#${icon.hex}` : 'currentColor'}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      <path d={icon.path} />
    </svg>
  )
}
