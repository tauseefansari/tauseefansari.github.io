import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { MODEL_SCALE, OBJECT_POSES, SECTIONS } from 'src/config/scenes'
import { damp, idleFloat } from 'src/lib/motion3d'
import { useStore } from 'src/store/useStore'
import { usePointerParallax } from 'src/hooks/usePointerParallax'
import { useIsMobile, usePrefersReducedMotion } from 'src/hooks/useMediaQuery'
import { MorphingSculpture } from 'src/components/canvas/sculptures/MorphingSculpture'

const POS_RATE = 0.018
const ROT_RATE = 0.01

function clampSection(index: number): number {
  return Math.min(Math.max(index, 0), OBJECT_POSES.length - 1)
}

/** Section-synced sculpture — pose matches active section, not scroll progress. */
export function HeroObject() {
  const root = useRef<Group>(null)
  const pointer = usePointerParallax()
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  useFrame((state, delta) => {
    const group = root.current
    if (!group) return

    const pinned = useStore.getState().footerPinned
    const section = pinned ? SECTIONS.length - 1 : useStore.getState().section
    const pose = OBJECT_POSES[clampSection(section)] ?? OBJECT_POSES[0]!

    let scale = MODEL_SCALE
    let targetY = pose.position.y
    let targetZ = pose.position.z

    if (isMobile) {
      targetY -= 0.8
      targetZ -= 1.6
      scale = MODEL_SCALE * 0.55
    }

    const float =
      reducedMotion || pinned ? { y: 0, z: 0 } : idleFloat(state.clock.elapsedTime, 0.04)
    const py = isMobile || reducedMotion || pinned ? 0 : pointer.current.y * 0.02

    group.position.x = damp(group.position.x, 0, delta, POS_RATE)
    group.position.y = damp(group.position.y, targetY - py + float.y, delta, POS_RATE)
    group.position.z = damp(group.position.z, targetZ + float.z, delta, POS_RATE)
    group.rotation.x = damp(
      group.rotation.x,
      pose.rotation.x + py * 0.04,
      delta,
      ROT_RATE,
    )
    group.rotation.y = damp(group.rotation.y, pose.rotation.y, delta, ROT_RATE)
    group.rotation.z = damp(group.rotation.z, pose.rotation.z, delta, ROT_RATE)
    group.scale.setScalar(scale)
  })

  return (
    <group ref={root}>
      <MorphingSculpture />
    </group>
  )
}
