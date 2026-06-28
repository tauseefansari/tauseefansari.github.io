import { useEffect, useState } from 'react'

/** Reactive media-query hook used for responsive + reduced-motion behavior. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the user has requested reduced motion (accessibility). */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** True on small viewports (phones) — drives 3D/physics fallbacks. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}
