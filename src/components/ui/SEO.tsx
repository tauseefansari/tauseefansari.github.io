import { useTranslation } from 'react-i18next'
import { OG_IMAGE, SEO_STATIC, SITE } from 'src/config/site'
import { absoluteSiteUrl } from 'src/lib/siteUrl'

/**
 * React 19 document metadata — `<title>`, `<meta>`, and `<link>` are hoisted
 * to `<head>` automatically. Translated strings update on language change.
 * Document `lang` is set once in `src/i18n/index.ts`.
 */
export function SEO() {
  const { t } = useTranslation('meta')
  const { t: tp } = useTranslation('portfolio')
  const role = tp('hero.role')

  const title = t('title', { role })
  const description = t('description')
  const ogTitle = t('ogTitle', { role })
  const ogDescription = t('ogDescription')
  const canonical = absoluteSiteUrl()
  const ogImage = absoluteSiteUrl(OG_IMAGE.path)

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE.name} />
      <meta name="color-scheme" content={SEO_STATIC.colorScheme} />
      <meta name="robots" content={SEO_STATIC.robots} />

      <link rel="icon" type="image/svg+xml" href={absoluteSiteUrl('favicon.svg')} />
      <link
        rel="apple-touch-icon"
        href={absoluteSiteUrl('apple-touch-icon.png')}
        sizes="180x180"
      />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:locale" content={SEO_STATIC.locale} />

      <meta name="twitter:card" content={SEO_STATIC.twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}
