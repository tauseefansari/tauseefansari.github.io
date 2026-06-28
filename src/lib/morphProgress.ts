import { SECTIONS } from 'src/config/scenes'
import { isInFooterZone } from 'src/lib/modelPanel'

export interface MorphState {
  from: number
  to: number
  /** 0→1 blend between `from` and `to` section models */
  blend: number
}

/** Perlin-style smootherstep — softer morph edges. */
export function smootherstep(t: number): number {
  const x = Math.min(Math.max(t, 0), 1)
  return x * x * x * (x * (x * 6 - 15) + 10)
}

/** Staggered crossfade so outgoing fades before incoming fully appears. */
export function morphCrossfade(blend: number): { out: number; in: number } {
  const t = smootherstep(blend)
  const out = 1 - smootherstep(Math.min(t / 0.52, 1))
  const inT = Math.max(0, (t - 0.28) / 0.72)
  const inOpacity = smootherstep(inT)
  return { out, in: inOpacity }
}

function clampIndex(index: number): number {
  return Math.min(Math.max(index, 0), SECTIONS.length - 1)
}

/**
 * Morph tied to real section boundaries (not linear page progress).
 * Pins to contact icon while the footer is visible.
 */
export function resolveMorphState(): MorphState {
  const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')]
  const n = sections.length
  if (n <= 1) return { from: 0, to: 0, blend: 0 }

  const last = n - 1
  if (isInFooterZone()) return { from: last, to: last, blend: 0 }

  const centerY = window.innerHeight * 0.5

  let active = 0
  sections.forEach((el, i) => {
    if (el.getBoundingClientRect().top <= centerY) active = i
  })

  active = clampIndex(active)

  // On the last section, keep blending across the final gap (journey → contact)
  // instead of snapping to contact as soon as its top crosses the viewport centre.
  const morphFrom = active >= last ? last - 1 : active
  const morphTo = active >= last ? last : active + 1

  const cur = sections[morphFrom]!
  const nxt = sections[morphTo]!
  const curRect = cur.getBoundingClientRect()
  const nxtRect = nxt.getBoundingClientRect()

  const gapMid = (curRect.bottom + nxtRect.top) / 2
  const transitionPx = Math.max(140, Math.min(curRect.height, nxtRect.height) * 0.18)
  const distFromMid = centerY - gapMid

  if (distFromMid <= -transitionPx) return { from: morphFrom, to: morphFrom, blend: 0 }
  if (distFromMid >= transitionPx) return { from: morphTo, to: morphTo, blend: 0 }

  const blend = (distFromMid + transitionPx) / (2 * transitionPx)
  return { from: morphFrom, to: morphTo, blend: Math.min(Math.max(blend, 0), 1) }
}
