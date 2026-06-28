import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ContentSide, SectionGlow, SectionId } from 'src/config/enums'
import { SECTION_LAYOUT } from 'src/config/scenes'
import {
  SECTION_GRID,
  contentColumnClasses,
  modelSpacerClasses,
} from 'src/config/sectionLayout'
import { staggerContainer, VIEWPORT } from 'src/config/motion'

interface SectionProps {
  id: SectionId
  headingId: string
  children: ReactNode
  className?: string
  /** Extra classes on the text column (width, alignment, etc.). */
  contentClassName?: string
  /** Override layout; defaults to zig-zag map in scenes.ts */
  contentSide?: ContentSide
  glow?: SectionGlow
}

const GLOW: Record<SectionGlow, Record<ContentSide, string>> = {
  [SectionGlow.Accent]: {
    left: 'before:bg-[radial-gradient(ellipse_70%_55%_at_15%_30%,var(--color-glow),transparent)]',
    right:
      'before:bg-[radial-gradient(ellipse_70%_55%_at_85%_30%,var(--color-glow),transparent)]',
  },
  [SectionGlow.Accent2]: {
    left: 'before:bg-[radial-gradient(ellipse_65%_50%_at_20%_25%,color-mix(in_srgb,var(--color-accent-2)_22%,transparent),transparent)]',
    right:
      'before:bg-[radial-gradient(ellipse_65%_50%_at_80%_25%,color-mix(in_srgb,var(--color-accent-2)_22%,transparent),transparent)]',
  },
  [SectionGlow.None]: { left: '', right: '' },
}

const SHELL =
  'section overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:-z-10'

/**
 * Zig-zag split: content alternates left/right; 3D model fills the opposite half.
 */
export function Section({
  id,
  headingId,
  children,
  className = '',
  contentClassName = '',
  contentSide,
  glow = SectionGlow.None,
}: SectionProps) {
  const side = contentSide ?? SECTION_LAYOUT[id]
  const glowClass = GLOW[glow][side]

  return (
    <motion.section
      id={id}
      data-section
      aria-labelledby={headingId}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={`${SHELL} ${SECTION_GRID} min-h-dvh items-start lg:items-center ${glowClass} ${className}`}
    >
      <div className={contentColumnClasses(side, contentClassName)}>{children}</div>
      <div className={modelSpacerClasses(side)} aria-hidden="true" />
    </motion.section>
  )
}
