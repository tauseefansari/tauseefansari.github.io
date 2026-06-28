import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import i18next from 'eslint-plugin-i18next'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dev-dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // React Three Fiber mutates refs/uniforms every frame inside useFrame — that
  // is the intended rendering model and bypasses React's immutability rules.
  {
    files: ['src/components/canvas/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/immutability': 'off',
    },
  },
  // Enforce "no hard-coded text": every literal in the DOM UI must come from
  // i18next. Scoped to ui/ so it never fights three.js / shader code.
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    plugins: { i18next },
    rules: {
      'i18next/no-literal-string': [
        'warn',
        {
          mode: 'jsx-text-only',
          'should-validate-template': true,
        },
      ],
    },
  },
  // Prettier last — disables stylistic rules that would conflict.
  prettier,
])
