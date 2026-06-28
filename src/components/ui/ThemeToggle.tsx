import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'
import { Theme } from 'src/config/enums'
import { useTheme } from 'src/hooks/useTheme'

/** Accessible light/dark toggle with a circular full-page reveal on change. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation('common')
  const isDark = theme === Theme.Dark

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }}
      aria-label={isDark ? t('theme.light') : t('theme.dark')}
      title={t('theme.toggle')}
      className="rounded-lg p-2 text-text-muted transition-colors hover:text-text"
    >
      {isDark ? (
        <Sun size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
    </button>
  )
}
