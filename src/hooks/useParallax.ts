import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import type { RefObject } from 'react'

/**
 * Returns a MotionValue that translates an element on the Y axis as it scrolls
 * through the viewport, producing a parallax effect. `strength` is the pixel
 * offset range (positive = moves slower/up).
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  strength = 80,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  return useTransform(scrollYProgress, [0, 1], [strength, -strength])
}
