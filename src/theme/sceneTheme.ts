import { Theme, type Theme as ThemeMode } from 'src/config/enums'

/** WebGL scene configuration per DOM theme — keeps canvas in sync with CSS tokens. */
export interface SceneThemeConfig {
  environment: 'city' | 'warehouse' | 'dawn' | 'night'
  ambientIntensity: number
  directionalIntensity: number
  directionalPosition: [number, number, number]
  fogColor: string
  fogNear: number
  fogFar: number
  particleColor: string
  particleOpacity: number
  accentEmissive: string
  gridColor: string
  midShapeColor: string
  midShapeEmissive: string
}

const SCENE_THEMES: Record<ThemeMode, SceneThemeConfig> = {
  [Theme.Dark]: {
    environment: 'city',
    ambientIntensity: 0.45,
    directionalIntensity: 1.1,
    directionalPosition: [4, 6, 3],
    fogColor: '#09090b',
    fogNear: 4,
    fogFar: 22,
    particleColor: '#3b82f6',
    particleOpacity: 0.35,
    accentEmissive: '#2563eb',
    gridColor: '#27272a',
    midShapeColor: '#3f3f46',
    midShapeEmissive: '#2563eb',
  },
  [Theme.Light]: {
    environment: 'warehouse',
    ambientIntensity: 0.75,
    directionalIntensity: 0.9,
    directionalPosition: [3, 5, 4],
    fogColor: '#f1f5f9',
    fogNear: 6,
    fogFar: 28,
    particleColor: '#2563eb',
    particleOpacity: 0.22,
    accentEmissive: '#1d4ed8',
    gridColor: '#cbd5e1',
    midShapeColor: '#e2e8f0',
    midShapeEmissive: '#3b82f6',
  },
}

export function getSceneTheme(theme: ThemeMode): SceneThemeConfig {
  return SCENE_THEMES[theme]
}
