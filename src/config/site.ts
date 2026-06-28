import type { ManifestOptions } from 'vite-plugin-pwa'
import { buildDeployPageUrl, joinBaseAsset } from '../lib/url.ts'

// ─── Brand ───────────────────────────────────────────────────────────────────

/**
 * Brand / site identity constants.
 *
 * `name` is the single source of truth for the person/brand. It is injected
 * as the default i18next interpolation variable, so every translated string
 * that needs the name simply uses `{{name}}` — no duplication across JSON.
 */
export const SITE = {
  name: 'Tauseef Ansari',
  shortName: 'Tauseef',
  description:
    'AI-Enhanced Software Engineer building high-performance web apps with React, Next.js, and TypeScript.',
  /** GitHub Pages origin — fallback when `window` is unavailable (build-time SEO). */
  url: 'https://tauseefansari.github.io',
  themeColor: { dark: '#09090b', light: '#fafafa' },
} as const

// ─── SEO & document head ─────────────────────────────────────────────────────

export const OG_IMAGE = {
  path: 'og-image.png',
  width: 1200,
  height: 630,
} as const

export const SEO_STATIC = {
  locale: 'en_US',
  twitterCard: 'summary_large_image' as const,
  robots: 'index, follow',
  colorScheme: 'dark light',
} as const

/** Hosts for project preview images (raw GitHub assets). */
export const CSP_IMG_SRC = [
  "'self'",
  'data:',
  'blob:',
  'https://raw.githubusercontent.com',
] as const

/** Injected into `index.html` at build/dev time (see `vite.config.ts`). */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  `img-src ${CSP_IMG_SRC.join(' ')}`,
  "connect-src 'self' blob: data: https://api.web3forms.com https://raw.githubusercontent.com https://raw.githack.com https://dl.polyhaven.org",
  "worker-src 'self'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "object-src 'none'",
].join('; ')

export function staticPageTitle(): string {
  return `${SITE.name} — Portfolio`
}

/** Absolute portfolio URL for sitemap / robots.txt generation at build time. */
export function buildSitePageUrl(base: string): string {
  return buildDeployPageUrl(SITE.url, base)
}

// ─── PWA (build-time — consumed by `vite-plugin-pwa`) ────────────────────────

export const PWA_ASSET_PATHS = [
  'favicon.svg',
  'robots.txt',
  'sitemap.xml',
  'apple-touch-icon.png',
  'pwa-192.png',
  'pwa-512.png',
  'og-image.png',
] as const

export const PWA_CATEGORIES = ['business', 'productivity'] as const

export const PWA_WORKBOX = {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,webmanifest}'],
  maximumFileSizeToCacheInBytes: 5_000_000,
}

export const PWA_DEV_OPTIONS = {
  enabled: false,
  type: 'module' as const,
  navigateFallback: 'index.html',
} as const

export function pwaAssetUrl(base: string, path: string): string {
  return joinBaseAsset(base, path)
}

export function createPwaIncludeAssets(base: string): string[] {
  return PWA_ASSET_PATHS.map((assetPath) => pwaAssetUrl(base, assetPath))
}

export function createPwaManifest(base: string): Partial<ManifestOptions> {
  const icon = (size: number) => ({
    src: pwaAssetUrl(base, `pwa-${size}.png`),
    sizes: `${size}x${size}`,
    type: 'image/png' as const,
    purpose: 'any' as const,
  })

  return {
    id: base,
    name: `${SITE.name} Portfolio`,
    short_name: SITE.shortName,
    description: SITE.description,
    theme_color: SITE.themeColor.dark,
    background_color: SITE.themeColor.dark,
    display: 'standalone',
    orientation: 'portrait',
    scope: base,
    start_url: base,
    categories: [...PWA_CATEGORIES],
    icons: [
      icon(192),
      {
        src: pwaAssetUrl(base, 'pwa-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: pwaAssetUrl(base, 'apple-touch-icon.png'),
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
