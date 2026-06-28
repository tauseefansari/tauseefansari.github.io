import { I18nNamespace } from 'src/config/enums'

/** i18n namespaces — English only for now. */
export const DEFAULT_LANGUAGE = 'en'

export const NAMESPACES: readonly I18nNamespace[] = [
  I18nNamespace.Portfolio,
  I18nNamespace.Common,
  I18nNamespace.Meta,
]

export const DEFAULT_NAMESPACE = I18nNamespace.Portfolio
