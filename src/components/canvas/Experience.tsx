import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useTranslation } from 'react-i18next'
import { useIsMobile } from 'src/hooks/useMediaQuery'
import { Scene } from 'src/components/canvas/Scene'
import { ModelViewport } from 'src/components/canvas/ModelViewport'
import { useStore } from 'src/store/useStore'

export function Experience() {
  const isMobile = useIsMobile()
  const { t } = useTranslation('common')
  const canvasVisible = useStore((s) => s.canvasVisible)

  return (
    <ModelViewport
      className="transition-opacity duration-500"
      // opacity on inner wrapper so panel position isn't affected
    >
      <div className="h-full w-full" style={{ opacity: canvasVisible ? 1 : 0 }}>
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
          camera={{ fov: 38, near: 0.1, far: 50, position: [0, 0, 5.2] }}
          className="h-full w-full bg-transparent"
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <span className="sr-only">{t('a11y.canvasLabel')}</span>
    </ModelViewport>
  )
}
