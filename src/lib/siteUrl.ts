import { env } from 'src/config/env'
import { SITE } from 'src/config/site'
import { joinOriginPath, stripTrailingSlash } from 'src/lib/url'

/**
 * Site origin for absolute URLs. Uses the live browser origin at runtime so
 * canonical/OG links stay correct on localhost, GitHub Pages, or a custom domain.
 * Falls back to {@link SITE.url} when `window` is unavailable.
 */
export function siteOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return SITE.url
}

/** Absolute URL for SEO, Open Graph, and canonical links. */
export function absoluteSiteUrl(path = ''): string {
  const base = stripTrailingSlash(env.baseUrl)
  return path
    ? joinOriginPath(siteOrigin(), base, path)
    : joinOriginPath(siteOrigin(), base)
}
