import { createContext, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { Theme } from 'src/config/enums'
import { SITE } from 'src/config/site'
import { useCookieState } from 'src/hooks/useCookieState'
import { usePrefersReducedMotion } from 'src/hooks/useMediaQuery'
import { runThemeTransition, type ThemeTransitionOrigin } from 'src/lib/themeTransition'
import { DEFAULT_THEME, getSystemTheme, THEME_COOKIE } from 'src/theme/theme'

export type { ThemeTransitionOrigin } from 'src/lib/themeTransition'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: (origin?: ThemeTransitionOrigin) => void
  setTheme: (theme: Theme, origin?: ThemeTransitionOrigin) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Applies the theme to <html data-theme> (Tailwind tokens key off this) and
 * keeps the <meta name="theme-color"> in sync for the mobile address bar / PWA.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()
  const [theme, persistTheme] = useCookieState<Theme>(
    THEME_COOKIE,
    getSystemTheme() ?? DEFAULT_THEME,
  )

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
  }, [theme])

  const commitTheme = useCallback(
    (next: Theme) => {
      if (next === theme) return

      const root = document.documentElement
      root.dataset.theme = next
      root.style.colorScheme = next
      flushSync(() => persistTheme(next))
    },
    [persistTheme, theme],
  )

  const setTheme = useCallback(
    (next: Theme, origin?: ThemeTransitionOrigin) => {
      if (next === theme) return

      if (reducedMotion || !origin) {
        commitTheme(next)
        return
      }

      void runThemeTransition(() => commitTheme(next), origin)
    },
    [commitTheme, reducedMotion, theme],
  )

  const toggleTheme = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark, origin)
    },
    [setTheme, theme],
  )

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  )

  return (
    <ThemeContext value={value}>
      {/* React 19 hoists this to <head> and keeps theme-color in sync */}
      <meta name="theme-color" content={SITE.themeColor[theme]} />
      {children}
    </ThemeContext>
  )
}
