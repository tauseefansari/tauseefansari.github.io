import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Group } from 'three'
import { LAYER_SPEEDS } from 'src/config/scenes'
import { damp } from 'src/lib/motion3d'
import { useStore } from 'src/store/useStore'
import { useIsMobile } from 'src/hooks/useMediaQuery'

/** Subtle starfield — bounded, no infinite grid overflow. */
export function BackgroundLayer() {
  const group = useRef<Group>(null)
  const isMobile = useIsMobile()

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const progress = useStore.getState().scrollProgress
    g.position.y = damp(g.position.y, -progress * 1.5 * LAYER_SPEEDS.background, delta)
  })

  return (
    <group ref={group}>
      {!isMobile && (
        <Stars
          radius={50}
          depth={40}
          count={600}
          factor={2}
          saturation={0}
          fade
          speed={0.15}
        />
      )}
    </group>
  )
}
