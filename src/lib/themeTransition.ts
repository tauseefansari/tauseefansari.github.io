/** Click origin for the circular theme reveal (viewport coordinates). */
export interface ThemeTransitionOrigin {
  x: number
  y: number
}

export const THEME_TRANSITION_MS = 900

function setTransitionOrigin(origin: ThemeTransitionOrigin) {
  const root = document.documentElement
  root.style.setProperty('--theme-transition-x', `${origin.x}px`)
  root.style.setProperty('--theme-transition-y', `${origin.y}px`)
  root.style.setProperty('--theme-transition-duration', `${THEME_TRANSITION_MS}ms`)
}

function supportsViewTransitions(): boolean {
  return typeof document.startViewTransition === 'function'
}

/**
 * Runs a theme swap with a smooth circular reveal from `origin`.
 * Uses the View Transitions API when available (captures nav + content together).
 */
export function runThemeTransition(
  updateDom: () => void,
  origin?: ThemeTransitionOrigin,
): Promise<void> {
  if (origin) setTransitionOrigin(origin)

  if (origin && supportsViewTransitions()) {
    const root = document.documentElement
    root.dataset.themeTransition = 'active'

    const transition = document.startViewTransition!(() => {
      updateDom()
    })

    return transition.finished.finally(() => {
      delete root.dataset.themeTransition
    })
  }

  if (!origin) {
    updateDom()
    return Promise.resolve()
  }

  const root = document.documentElement
  root.dataset.themeTransition = 'fallback'
  updateDom()

  return new Promise((resolve) => {
    window.setTimeout(() => {
      delete root.dataset.themeTransition
      resolve()
    }, THEME_TRANSITION_MS)
  })
}
