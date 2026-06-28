import path from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import {
  buildSitePageUrl,
  CONTENT_SECURITY_POLICY,
  createPwaIncludeAssets,
  createPwaManifest,
  PWA_DEV_OPTIONS,
  PWA_WORKBOX,
  SEO_STATIC,
  SITE,
  staticPageTitle,
} from './src/config/site.ts'
import { resolveViteBasePath } from './src/lib/url.ts'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

function staticPageDescription(): string {
  const meta = JSON.parse(
    readFileSync(path.join(projectRoot, 'src/i18n/locales/en/meta.json'), 'utf8'),
  ) as { description: string }
  return meta.description.replace('{{name}}', SITE.name)
}

function htmlShellPlugin(): Plugin {
  return {
    name: 'html-shell-inject',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const description = staticPageDescription()

        return html
          .replaceAll('__THEME_COLOR__', SITE.themeColor.dark)
          .replaceAll('__CSP__', CONTENT_SECURITY_POLICY)
          .replaceAll('__DEFAULT_TITLE__', staticPageTitle())
          .replaceAll('__DEFAULT_DESCRIPTION__', description)
          .replaceAll('__COLOR_SCHEME__', SEO_STATIC.colorScheme)
          .replaceAll('__ROBOTS__', SEO_STATIC.robots)
      },
    },
  }
}

/** Writes sitemap.xml and robots.txt with the correct deploy origin + base. */
function seoFilesPlugin(base: string): Plugin {
  return {
    name: 'generate-seo-files',
    closeBundle() {
      const pageUrl = buildSitePageUrl(base)
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${pageUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
      const robots = `User-agent: *
Allow: /

Sitemap: ${pageUrl}sitemap.xml
`
      writeFileSync(path.resolve('dist', 'sitemap.xml'), sitemap, 'utf8')
      writeFileSync(path.resolve('dist', 'robots.txt'), robots, 'utf8')
    },
  }
}

export default defineConfig(({ mode }) => {
  const base = resolveViteBasePath()

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      htmlShellPlugin(),
      seoFilesPlugin(base),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: createPwaIncludeAssets(base),
        manifest: createPwaManifest(base),
        devOptions: PWA_DEV_OPTIONS,
        workbox: {
          globPatterns: [...PWA_WORKBOX.globPatterns],
          maximumFileSizeToCacheInBytes: PWA_WORKBOX.maximumFileSizeToCacheInBytes,
        },
      }),
    ],
    resolve: {
      alias: {
        src: path.join(projectRoot, 'src'),
      },
    },
    build: {
      target: 'es2022',
      sourcemap: mode === 'production' ? 'hidden' : true,
      chunkSizeWarningLimit: 1024,
      modulePreload: {
        resolveDependencies(_filename, deps) {
          return deps.filter(
            (dep) =>
              !dep.includes('vendor-r3f') &&
              !dep.includes('Experience') &&
              !dep.includes('BelowFoldSections') &&
              !dep.includes('Footer'),
          )
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined

            if (id.includes('@react-three') || id.includes('three')) return 'vendor-r3f'
            if (id.includes('gsap')) return 'vendor-gsap'
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (id.includes('lenis')) return 'vendor-lenis'
            if (id.includes('i18next') || id.includes('react-i18next'))
              return 'vendor-i18n'
            if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react'
            return undefined
          },
        },
      },
    },
  }
})
