import { Suspense, useEffect } from 'react'
import { ContactShadows, Environment } from '@react-three/drei'
import { CameraRig } from 'src/components/canvas/CameraRig'
import { BackgroundLayer } from 'src/components/canvas/layers/BackgroundLayer'
import { HeroObject } from 'src/components/canvas/layers/HeroObject'
import { ForegroundLayer } from 'src/components/canvas/layers/ForegroundLayer'
import { useStore } from 'src/store/useStore'
import { useSceneThemeColors } from 'src/hooks/useSceneThemeColors'

export function Scene() {
  const setSceneReady = useStore((s) => s.setSceneReady)
  const colors = useSceneThemeColors()

  useEffect(() => {
    setSceneReady(true)
    return () => setSceneReady(false)
  }, [setSceneReady])

  return (
    <>
      <fog attach="fog" args={[colors.fogColor, colors.fogNear, colors.fogFar]} />
      <Environment preset={colors.environment} />
      <ambientLight intensity={colors.ambientIntensity * 0.85} />
      <directionalLight
        position={colors.directionalPosition}
        intensity={colors.directionalIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.35}
        color={colors.accentEmissive}
      />
      <hemisphereLight args={['#f8fafc', '#0f172a', 0.35]} />

      <CameraRig />
      <BackgroundLayer />

      <Suspense fallback={null}>
        <HeroObject />
      </Suspense>

      <ForegroundLayer />

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.28}
        scale={9}
        blur={2.8}
        far={3.5}
        color="#000000"
      />
    </>
  )
}
