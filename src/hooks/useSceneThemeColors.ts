import { useTheme } from 'src/hooks/useTheme'
import { getSceneTheme } from 'src/theme/sceneTheme'

/** Reactive scene theme colors for R3F layers (DRY bridge from DOM theme). */
export function useSceneThemeColors() {
  const { theme } = useTheme()
  return getSceneTheme(theme)
}
