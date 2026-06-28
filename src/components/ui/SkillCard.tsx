import { GlassPanel } from 'src/components/ui/GlassPanel'
import { BrandIcon } from 'src/components/ui/icons/BrandIcon'
import type { SkillId } from 'src/config/enums'

interface SkillCardProps {
  id: SkillId
  label: string
}

export function SkillCard({ id, label }: SkillCardProps) {
  return (
    <GlassPanel
      as="div"
      className="elevation-hover group relative aspect-square overflow-hidden p-3 transition-transform duration-200 hover:-translate-y-0.5 sm:p-4"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/8 via-transparent to-accent-2/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 text-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-glass-border bg-surface/70 shadow-elevation-1 transition-all duration-200 group-hover:scale-105 group-hover:border-accent/35 group-hover:shadow-elevation-2 sm:h-11 sm:w-11">
          <BrandIcon name={id} size={24} colored className="shrink-0" />
        </div>
        <span className="line-clamp-2 text-xs font-medium leading-tight text-text">
          {label}
        </span>
      </div>
    </GlassPanel>
  )
}
