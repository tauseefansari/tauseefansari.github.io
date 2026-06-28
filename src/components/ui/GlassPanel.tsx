import type { ComponentType, JSX, ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  'aria-labelledby'?: string
}

/** Glass card primitive with consistent internal padding (DRY). */
export function GlassPanel({
  children,
  className = '',
  as = 'div',
  ...rest
}: GlassPanelProps) {
  const Tag = as as unknown as ComponentType<{ className?: string; children?: ReactNode }>
  return (
    <Tag className={`glass p-8 sm:p-10 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
