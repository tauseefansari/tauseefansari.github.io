import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import { ExternalLink } from 'src/components/ui/ExternalLink'
import { GlassPanel } from 'src/components/ui/GlassPanel'
import { BrandIcon } from 'src/components/ui/icons/BrandIcon'
import type { ProjectLinks } from 'src/config/scenes'
import { projectPreviewImage } from 'src/lib/githubImage'

interface ProjectCardProps {
  name: string
  stack: string
  links?: ProjectLinks
  codeAria: string
  demoAria: string
}

export function ProjectCard({
  name,
  stack,
  links,
  codeAria,
  demoAria,
}: ProjectCardProps) {
  const imageUrl = projectPreviewImage(links)
  const previewHref = links?.demo ?? links?.github

  return (
    <GlassPanel
      as="article"
      className="elevation-hover group flex h-full flex-col overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-0.5"
    >
      {imageUrl && (
        <div className="relative aspect-4/3 w-full overflow-hidden bg-surface">
          {previewHref ? (
            <ExternalLink
              href={previewHref}
              aria-label={links?.demo ? demoAria : codeAria}
              className="block h-full w-full"
            >
              <img
                src={imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </ExternalLink>
          ) : (
            <img
              src={imageUrl}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="text-sm font-semibold leading-snug text-text sm:text-base">
          {name}
        </h3>

        {stack && (
          <p className="line-clamp-2 text-xs leading-relaxed text-text-muted">{stack}</p>
        )}

        {(links?.github || links?.demo) && (
          <div className="mt-auto flex gap-1.5 pt-0.5">
            {links.github && (
              <ExternalLink
                href={links.github}
                aria-label={codeAria}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-glass-border text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <BrandIcon name="github" size={15} />
              </ExternalLink>
            )}
            {links.demo && (
              <ExternalLink
                href={links.demo}
                aria-label={demoAria}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-glass-border text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                <ExternalLinkIcon size={15} aria-hidden="true" />
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </GlassPanel>
  )
}
