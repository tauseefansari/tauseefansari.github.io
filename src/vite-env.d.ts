/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_BASE?: string
  readonly VITE_RESUME_URL?: string
  readonly VITE_WEB3FORMS_KEY?: string
  readonly VITE_GITHUB_USERNAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Allow importing GLSL shader source as a raw string via `?raw`.
declare module '*.glsl?raw' {
  const value: string
  export default value
}

declare module '*.glb?url' {
  const value: string
  export default value
}

declare module 'lucide-react/dist/esm/icons/*.mjs' {
  export const __iconNode: readonly (readonly [string, Record<string, string>])[]
}
