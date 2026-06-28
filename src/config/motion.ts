import type { Variants } from 'framer-motion'

/** Shared animation language — consumed by chapters and chrome (DRY). */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const EASE_OUT_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const DURATION = 0.35

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
}

export const VIEWPORT = { once: false, amount: 0.15 } as const
