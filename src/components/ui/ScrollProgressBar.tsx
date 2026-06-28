import { useEffect, useRef } from 'react'
import { useStore } from 'src/store/useStore'

/** Thick rounded progress track — sits below nav row (no overlap). */
export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const apply = (p: number) => {
      el.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`
    }
    apply(useStore.getState().scrollProgress)
    return useStore.subscribe((s, prev) => {
      if (s.scrollProgress !== prev.scrollProgress) apply(s.scrollProgress)
    })
  }, [])

  return (
    <div
      className="h-1.5 w-full shrink-0 overflow-hidden rounded-full bg-glass-border/40"
      aria-hidden="true"
    >
      <div
        ref={ref}
        className="h-full origin-left rounded-full bg-linear-to-r from-accent via-cta to-accent-2"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
