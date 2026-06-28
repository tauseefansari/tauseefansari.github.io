import { Suspense, useEffect } from 'react'
import { Float } from '@react-three/drei'
import { SECTION_ICON_LIST } from 'src/config/sectionIcons'
import { preloadSectionModel } from 'src/assets/sectionModels'
import { morphCrossfade, smootherstep } from 'src/lib/morphProgress'
import { useStore } from 'src/store/useStore'
import { usePrefersReducedMotion } from 'src/hooks/useMediaQuery'
import { GltfIconModel } from 'src/components/canvas/sculptures/GltfIconModel'

/**
 * Scroll-morphed sculpture — crossfades between section-specific models
 * at real section boundaries (synced with nav active state).
 */
export function MorphingSculpture() {
  const morphState = useStore((s) => s.morphState)
  const footerPinned = useStore((s) => s.footerPinned)
  const reducedMotion = usePrefersReducedMotion()

  const { from, to, blend } = morphState
  const t = smootherstep(blend)
  const { out: outOpacity, in: inOpacity } = morphCrossfade(blend)

  const outScale = 1 - t * 0.06
  const inScale = 0.94 + t * 0.06
  const outY = t * 0.08
  const inY = (1 - t) * -0.08
  const outZ = t * 0.1
  const inZ = (1 - t) * -0.1
  const outSpin = t * 0.04
  const inSpin = (1 - t) * -0.04

  const fromModel = SECTION_ICON_LIST[from]!.modelId
  const toModel = SECTION_ICON_LIST[to]!.modelId
  const morphing = from !== to && blend > 0.001

  useEffect(() => {
    preloadSectionModel(fromModel)
    preloadSectionModel(toModel)
    const ahead =
      SECTION_ICON_LIST[Math.min(to + 1, SECTION_ICON_LIST.length - 1)]?.modelId
    if (ahead) preloadSectionModel(ahead)
  }, [fromModel, toModel, to])

  const content = (
    <group>
      <Suspense fallback={null}>
        <GltfIconModel
          model={fromModel}
          opacity={morphing ? outOpacity : 1}
          scale={morphing ? outScale : 1}
          y={morphing ? outY : 0}
          z={morphing ? outZ : 0}
          morphRotationY={morphing ? outSpin : 0}
        />
        {morphing && inOpacity > 0.01 && (
          <GltfIconModel
            model={toModel}
            opacity={inOpacity}
            scale={inScale}
            y={inY}
            z={inZ}
            morphRotationY={inSpin}
          />
        )}
      </Suspense>
    </group>
  )

  if (reducedMotion || footerPinned) return content

  return (
    <Float speed={0.75} rotationIntensity={0.03} floatIntensity={0.1}>
      {content}
    </Float>
  )
}
