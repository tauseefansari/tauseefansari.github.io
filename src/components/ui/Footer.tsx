import { useTranslation } from 'react-i18next'
import { ArrowUp } from 'lucide-react'
import { SectionId } from 'src/config/enums'
import { SOCIAL_LINKS } from 'src/config/socialLinks'
import { SITE } from 'src/config/site'
import { ExternalLink } from 'src/components/ui/ExternalLink'
import { SocialIcon } from 'src/components/ui/icons/SocialIcon'

/** Minimal footer after the climax chapter. */
export function Footer() {
  const { t } = useTranslation(['portfolio', 'common'])
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-glass-border px-6 py-16 sm:px-12 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.id}>
              <ExternalLink
                href={link.href}
                aria-label={t('common:a11y.socialLink', {
                  name: t(`common:social.${link.id}`),
                })}
                className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-glass hover:text-text"
              >
                <SocialIcon id={link.id} />
              </ExternalLink>
            </li>
          ))}
        </ul>

        <p className="text-sm text-text-muted">{t('portfolio:footer.tagline')}</p>
        <p className="text-xs text-text-muted">
          © {year}{' '}
          <ExternalLink
            href={SITE.url}
            className="transition-colors duration-200 hover:text-text"
          >
            {SITE.name}
          </ExternalLink>
          . {t('portfolio:footer.rights')}
        </p>

        <a
          href={`#${SectionId.Hero}`}
          className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors duration-200 hover:text-text"
        >
          <ArrowUp size={16} aria-hidden="true" />
          {t('portfolio:footer.backToTop')}
        </a>
      </div>
    </footer>
  )
}
