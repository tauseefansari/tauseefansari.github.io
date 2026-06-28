/**
 * i18next initialization — English-only, bundled from `src/i18n/locales/en`.
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, DEFAULT_NAMESPACE, NAMESPACES } from 'src/i18n/config'
import { SITE } from 'src/config/site'

import enPortfolio from 'src/i18n/locales/en/portfolio.json'
import enCommon from 'src/i18n/locales/en/common.json'
import enMeta from 'src/i18n/locales/en/meta.json'

const resources = {
  en: { portfolio: enPortfolio, common: enCommon, meta: enMeta },
} as const

function syncDocumentLanguage(): void {
  if (typeof document === 'undefined') return
  document.documentElement.lang = DEFAULT_LANGUAGE
  document.documentElement.dir = 'ltr'
}

void i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [DEFAULT_LANGUAGE],
  ns: [...NAMESPACES],
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: false,
    defaultVariables: {
      name: SITE.name,
    },
  },
})

syncDocumentLanguage()

export default i18n
