import { Theme } from 'src/config/enums'

/** Theme constants — single source of truth for the theme cookie + values. */
export const THEME_COOKIE = 'pf_theme'

export const THEMES: readonly Theme[] = [Theme.Light, Theme.Dark]

export const DEFAULT_THEME = Theme.Dark

/** Resolve the OS preference when the user has no stored choice. */
export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? Theme.Light
    : Theme.Dark
}
