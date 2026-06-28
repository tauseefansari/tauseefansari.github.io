import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { Group } from 'three'
import { LAYER_SPEEDS } from 'src/config/scenes'
import { damp } from 'src/lib/motion3d'
import { useStore } from 'src/store/useStore'
import { useSceneThemeColors } from 'src/hooks/useSceneThemeColors'
import { useIsMobile } from 'src/hooks/useMediaQuery'

/** Foreground particles — fastest parallax multiplier. */
export function ForegroundLayer() {
  const group = useRef<Group>(null)
  const colors = useSceneThemeColors()
  const isMobile = useIsMobile()

  useFrame((_, delta) => {
    const groupRef = group.current
    if (!groupRef) return

    const progress = useStore.getState().scrollProgress
    const offset = progress * 4 * LAYER_SPEEDS.foreground
    groupRef.position.z = damp(groupRef.position.z, offset * 0.5, delta)
  })

  if (isMobile) return null

  return (
    <group ref={group}>
      <Sparkles
        count={45}
        scale={16}
        size={2.5}
        speed={0.35}
        opacity={colors.particleOpacity}
        color={colors.particleColor}
      />
    </group>
  )
}
