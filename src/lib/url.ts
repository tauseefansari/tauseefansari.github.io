/** Strip a trailing slash (empty string stays empty). */
export function stripTrailingSlash(value: string): string {
  return value.replace(/\/$/, '')
}

/** Ensure a trailing slash (root `/` unchanged). */
export function ensureTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`
}

/** Remove a leading slash from an asset path segment. */
export function normalizeAssetPath(path: string): string {
  return path.replace(/^\//, '')
}

/**
 * Vite `base` for GitHub Pages project sites.
 * `VITE_BASE` is build-only — runtime code uses `import.meta.env.BASE_URL`.
 */
export function resolveViteBasePath(raw = process.env.VITE_BASE ?? '/'): string {
  let base = raw

  // Git Bash on Windows expands `/portfolio/` into a filesystem path.
  if (/^[A-Za-z]:[/\\]/.test(base)) {
    const segments = base.replace(/\\/g, '/').split('/').filter(Boolean)
    const repoName = segments.at(-1) ?? ''
    base = repoName ? `/${repoName}/` : '/'
  }

  const normalized = base.startsWith('/') ? base : `/${base}`
  return ensureTrailingSlash(normalized)
}

/** Join an origin with optional path segments (no duplicate slashes). */
export function joinOriginPath(origin: string, ...segments: string[]): string {
  const parts = [
    stripTrailingSlash(origin),
    ...segments.flatMap((s) => s.split('/')).filter(Boolean),
  ]
  return parts.join('/')
}

/** Resolve a public asset under a Vite `base` (e.g. `/portfolio/`). */
export function joinBaseAsset(base: string, assetPath: string): string {
  return `${ensureTrailingSlash(base)}${normalizeAssetPath(assetPath)}`
}

/** Homepage URL for sitemap / robots.txt at build time. */
export function buildDeployPageUrl(origin: string, base: string): string {
  const basePath = stripTrailingSlash(base)
  return basePath
    ? `${stripTrailingSlash(origin)}/${basePath}/`
    : `${stripTrailingSlash(origin)}/`
}
