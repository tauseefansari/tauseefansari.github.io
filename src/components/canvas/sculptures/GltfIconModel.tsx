import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Color, Group, Mesh, MeshStandardMaterial, Vector3 } from 'three'
import { Theme } from 'src/config/enums'
import type { SectionModelId } from 'src/config/enums'
import { SECTION_MODEL_POSE, SECTION_MODEL_URLS } from 'src/assets/sectionModels'
import { useStore } from 'src/store/useStore'
import { useTheme } from 'src/hooks/useTheme'
import { usePrefersReducedMotion } from 'src/hooks/useMediaQuery'

const TARGET_SIZE = 1.38
const GLOBAL_Y = -0.05
const SWAY_Y = 0.08
const SWAY_X = 0.022
const DEFAULT_TILT_X = 0.1

function iconColor(theme: Theme) {
  return theme === Theme.Light ? '#2563eb' : '#3b82f6'
}

function centerAtOrigin(object: Group) {
  const box = new Box3().setFromObject(object)
  const center = new Vector3()
  box.getCenter(center)
  object.position.sub(center)
}

function fitScale(object: Group): number {
  const box = new Box3().setFromObject(object)
  const size = new Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z)
  return maxDim > 1e-6 ? TARGET_SIZE / maxDim : 1
}

function tintClone(scene: Group, color: string, opacity: number) {
  const root = scene.clone(true)
  const base = new Color(color)
  const detail = new Color(color).multiplyScalar(0.84)

  root.traverse((child) => {
    if (!(child instanceof Mesh)) return
    child.castShadow = true
    child.receiveShadow = true

    const mats = Array.isArray(child.material) ? child.material : [child.material]
    const tinted = mats.map(
      (_, index) =>
        new MeshStandardMaterial({
          color: index === 0 ? base : detail,
          roughness: 0.78,
          metalness: 0.06,
          transparent: true,
          opacity,
        }),
    )
    child.material = tinted.length === 1 ? tinted[0]! : tinted
  })

  return root
}

interface GltfIconModelProps {
  model: SectionModelId
  opacity: number
  scale?: number
  y?: number
  z?: number
  morphRotationY?: number
}

export function GltfIconModel({
  model,
  opacity,
  scale = 1,
  y = 0,
  z = 0,
  morphRotationY = 0,
}: GltfIconModelProps) {
  const swayRef = useRef<Group>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { theme } = useTheme()
  const o = Math.min(Math.max(opacity, 0), 1)
  const pose = SECTION_MODEL_POSE[model]
  const { scene } = useGLTF(SECTION_MODEL_URLS[model])

  const staticRotation = useMemo(
    (): [number, number, number] => [
      pose.rotateX ?? DEFAULT_TILT_X,
      pose.rotateY ?? 0,
      pose.rotateZ ?? 0,
    ],
    [pose.rotateX, pose.rotateY, pose.rotateZ],
  )

  const { clone, normalizedScale } = useMemo(() => {
    const tinted = tintClone(scene, iconColor(theme), o)
    centerAtOrigin(tinted)
    const fit = fitScale(tinted) * pose.scale
    return { clone: tinted, normalizedScale: fit }
  }, [scene, theme, o, pose.scale])

  useFrame((state) => {
    const sway = swayRef.current
    if (!sway || reducedMotion || o < 0.15) return
    const pinned = useStore.getState().footerPinned
    const t = state.clock.elapsedTime
    sway.rotation.y = morphRotationY + (pinned ? 0 : Math.sin(t * 0.55) * SWAY_Y)
    sway.rotation.x = pinned ? 0 : Math.sin(t * 0.4) * SWAY_X
    sway.rotation.z = 0
  })

  if (o < 0.01) return null

  return (
    <group
      ref={swayRef}
      scale={scale}
      position={[pose.offsetX ?? 0, y + GLOBAL_Y + (pose.offsetY ?? 0), z]}
    >
      <group rotation={staticRotation}>
        <primitive object={clone} scale={normalizedScale} />
      </group>
    </group>
  )
}
