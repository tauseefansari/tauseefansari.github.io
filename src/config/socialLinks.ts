import { SocialId } from 'src/config/enums'

export interface SocialLink {
  readonly id: SocialId
  readonly href: string
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: SocialId.Linkedin, href: 'https://www.linkedin.com/in/tauseef-ansari' },
  { id: SocialId.Github, href: 'https://github.com/tauseefansari' },
  { id: SocialId.Facebook, href: 'https://www.facebook.com/tauseef51' },
  {
    id: SocialId.Instagram,
    href: 'https://www.instagram.com/tauseef__ansari?r=nametag',
  },
  { id: SocialId.Whatsapp, href: 'https://wa.me/+919321391048' },
  { id: SocialId.Email, href: 'mailto:tauseef.ansari92786@gmail.com' },
]
