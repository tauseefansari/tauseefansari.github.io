import type { ReactNode } from 'react'
import { SectionGlow, SectionId } from 'src/config/enums'
import { Section } from 'src/components/ui/Section'
import { SectionHeading } from 'src/components/ui/SectionHeading'

interface ContentSectionProps {
  id: SectionId
  title: string
  subtitle?: string
  glow?: SectionGlow
  className?: string
  contentClassName?: string
  headingClassName?: string
  children: ReactNode
}

/** Standard content section — shell, heading id, and glow in one place (DRY). */
export function ContentSection({
  id,
  title,
  subtitle,
  glow = SectionGlow.None,
  className = '',
  contentClassName = '',
  headingClassName = '',
  children,
}: ContentSectionProps) {
  const headingId = `${id}-heading`

  return (
    <Section
      id={id}
      headingId={headingId}
      glow={glow}
      className={className}
      contentClassName={contentClassName}
    >
      <SectionHeading
        id={headingId}
        title={title}
        subtitle={subtitle}
        className={headingClassName}
        subtitleClassName={headingClassName ? 'text-left' : undefined}
      />
      {children}
    </Section>
  )
}
