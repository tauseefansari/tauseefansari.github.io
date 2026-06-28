import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Vector3 } from 'three'
import { CAMERA_POSES } from 'src/config/scenes'
import { damp, interpolateCameraPoses } from 'src/lib/motion3d'
import { useStore } from 'src/store/useStore'
import { usePointerParallax } from 'src/hooks/usePointerParallax'
import { useIsMobile } from 'src/hooks/useMediaQuery'

const scratchTarget = new Vector3()
const scratchLook = new Vector3()

/** Scroll-driven camera — fixed framing; sculpture carries zig-zag motion. */
export function CameraRig() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera
  const pointer = usePointerParallax()
  const isMobile = useIsMobile()
  const fovRef = useRef(CAMERA_POSES[0]?.fov ?? 38)

  useFrame((_, delta) => {
    const progress = useStore.getState().scrollProgress
    const {
      position,
      fov: targetFov,
      lookAt,
    } = interpolateCameraPoses(CAMERA_POSES, progress, scratchTarget, scratchLook)

    const px = isMobile ? 0 : pointer.current.x * 0.08
    const py = isMobile ? 0 : pointer.current.y * 0.06

    camera.position.x = damp(camera.position.x, position.x + px, delta)
    camera.position.y = damp(camera.position.y, position.y - py, delta)
    camera.position.z = damp(camera.position.z, position.z, delta)
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z)

    fovRef.current = damp(fovRef.current, targetFov, delta)
    if (Math.abs(camera.fov - fovRef.current) > 0.01) {
      camera.fov = fovRef.current
      camera.updateProjectionMatrix()
    }
  })

  return null
}
