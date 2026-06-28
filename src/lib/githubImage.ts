import { env } from 'src/config/env'
import type { ProjectLinks } from 'src/config/scenes'

export interface GithubRepoAssetOptions {
  owner?: string
  ref?: string
}

/** Public raw URL for a file committed in a GitHub repo. */
export function githubRepoRawAsset(
  repo: string,
  assetPath: string,
  { owner, ref = 'main' }: GithubRepoAssetOptions = {},
): string | undefined {
  const resolvedOwner = owner ?? env.githubUsername
  if (!resolvedOwner) return undefined

  const path = assetPath.replace(/^\//, '')
  return `https://raw.githubusercontent.com/${resolvedOwner}/${repo}/${ref}/${path}`
}

/** Extract repo slug from a `https://github.com/{owner}/{repo}` URL. */
export function githubRepoFromUrl(githubUrl: string): string | undefined {
  try {
    const { pathname } = new URL(githubUrl)
    const segments = pathname.split('/').filter(Boolean)
    return segments[1]
  } catch {
    return undefined
  }
}

/** Extract username from a `https://github.com/{owner}/{repo}` URL. */
export function githubOwnerFromUrl(githubUrl: string): string | undefined {
  try {
    const { pathname } = new URL(githubUrl)
    return pathname.split('/').filter(Boolean)[0]
  } catch {
    return undefined
  }
}

/** Preview image for a project card — repo asset when configured. */
export function projectPreviewImage(links: ProjectLinks | undefined): string | undefined {
  if (!links?.image) return undefined

  const repo = links.repo ?? (links.github ? githubRepoFromUrl(links.github) : undefined)
  if (!repo) return undefined

  const owner =
    (links.github ? githubOwnerFromUrl(links.github) : undefined) ?? env.githubUsername

  return githubRepoRawAsset(repo, links.image, { owner, ref: links.ref })
}
