/**
 * Compile-time type safety for translation keys.
 *
 * The English JSON files are treated as the canonical schema. With this in
 * place, `t('hero.title')` autocompletes and a typo like `t('hero.tpyo')`
 * becomes a build error rather than a missing string at runtime.
 */
import 'i18next'
import type portfolio from 'src/i18n/locales/en/portfolio.json'
import type common from 'src/i18n/locales/en/common.json'
import type meta from 'src/i18n/locales/en/meta.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'portfolio'
    resources: {
      portfolio: typeof portfolio
      common: typeof common
      meta: typeof meta
    }
  }
}
