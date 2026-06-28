import { useContext } from 'react'
import { ThemeContext } from 'src/theme/ThemeProvider'

/** Access the current theme + setters. Must be used inside <ThemeProvider>. */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
