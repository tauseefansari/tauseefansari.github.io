import { ContentSide } from 'src/config/enums'

/** Shared horizontal padding — keeps model panel aligned with section columns. */
export const SECTION_SHELL = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16'

/** Fixed header clearance — nav row + progress bar (keep in sync with Header). */
export const MODEL_VIEWPORT_TOP = '8rem'
export const MODEL_VIEWPORT_HEIGHT = 'calc(100dvh - 8rem)'

const MODEL_VIEWPORT_TOP_REM = 8

/** Pixel bounds of the fixed model shell (below header). */
export function modelViewportMetrics() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const top = MODEL_VIEWPORT_TOP_REM * rem
  const height = window.innerHeight - top
  return { top, height, center: top + height * 0.5, bottom: top + height }
}

/** Vertical rhythm — top clears the fixed header; keep in sync with MODEL_VIEWPORT_TOP. */
export const SECTION_SPACING = 'pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-32 lg:pb-20'

/** Centered 50/50 grid inside max-w-7xl. */
export const SECTION_GRID = `${SECTION_SHELL} relative grid grid-cols-1 ${SECTION_SPACING} lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12`

/** Content column — centered within its zig-zag half. */
export function contentColumnClasses(side: ContentSide, extra = ''): string {
  const base = 'relative z-10 mx-auto w-full max-w-lg text-center'
  const placement =
    side === ContentSide.Right
      ? 'lg:col-start-2 lg:justify-self-center'
      : 'lg:col-start-1 lg:justify-self-center'
  return [base, placement, extra].filter(Boolean).join(' ')
}

/** Empty column — reserves the opposite 50% for the sliding WebGL panel. */
export function modelSpacerClasses(side: ContentSide): string {
  return side === 'right'
    ? 'pointer-events-none hidden min-h-[min(40vh,320px)] lg:col-start-1 lg:row-start-1 lg:block lg:min-h-0'
    : 'pointer-events-none hidden min-h-[min(40vh,320px)] lg:col-start-2 lg:block lg:min-h-0'
}
