/** Trimmed env string, or `undefined` when empty / whitespace-only. */
function optionalTrimmed(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

/**
 * Single source for Vite `import.meta.env` access in application code.
 * Import this instead of reading `import.meta.env` directly.
 *
 * Note: `VITE_BASE` is build-only (see `resolveViteBasePath` in `src/lib/url.ts`).
 * Runtime asset paths use `baseUrl` (`import.meta.env.BASE_URL`).
 */
export const env = {
  mode: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  baseUrl: import.meta.env.BASE_URL,
  resumeUrl: optionalTrimmed(import.meta.env.VITE_RESUME_URL),
  web3formsKey: optionalTrimmed(import.meta.env.VITE_WEB3FORMS_KEY),
  /** GitHub username for raw repo asset URLs (project card previews). */
  githubUsername: optionalTrimmed(import.meta.env.VITE_GITHUB_USERNAME),
} as const

/** True when `VITE_RESUME_URL` is set — controls resume download CTAs. */
export function hasResumeUrl(): boolean {
  return Boolean(env.resumeUrl)
}
