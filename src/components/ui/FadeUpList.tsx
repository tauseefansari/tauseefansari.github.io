import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from 'src/config/motion'

interface FadeUpListProps {
  children: ReactNode
  className?: string
  as?: 'ul' | 'ol' | 'div'
}

/** Animated list shell — shared grid spacing for card sections. */
export function FadeUpList({
  children,
  className = 'grid w-full gap-4',
  as: Tag = 'ul',
}: FadeUpListProps) {
  return <Tag className={className}>{children}</Tag>
}

interface FadeUpItemProps {
  children: ReactNode
  className?: string
  as?: 'li' | 'div'
}

/** Single stagger child — use inside FadeUpList or Section stagger containers. */
export function FadeUpItem({ as = 'li', children, className }: FadeUpItemProps) {
  if (as === 'div') {
    return (
      <motion.div variants={fadeUp} className={className}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.li variants={fadeUp} className={className}>
      {children}
    </motion.li>
  )
}
