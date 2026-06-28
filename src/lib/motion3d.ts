import { Vector3 } from 'three'
import type { CameraPose } from 'src/config/scenes'

/** Frame-rate-independent exponential damping (spring-like settle). */
export function damp(
  current: number,
  target: number,
  delta: number,
  rate = 0.0025,
): number {
  const factor = 1 - Math.pow(rate, delta)
  return current + (target - current) * factor
}

const scratchPos = new Vector3()
const scratchLook = new Vector3()

/** Blend camera poses from normalized scroll progress. */
export function interpolateCameraPoses(
  poses: readonly CameraPose[],
  progress: number,
  outPos = scratchPos,
  outLook = scratchLook,
): { position: Vector3; fov: number; lookAt: Vector3 } {
  const last = poses.length - 1
  const t = Math.min(Math.max(progress, 0), 1) * last
  const i = Math.min(Math.floor(t), Math.max(0, last - 1))
  const f = t - i
  const a = poses[i] ?? poses[0]!
  const b = poses[i + 1] ?? a

  outPos.copy(a.position).lerp(b.position, f)
  outLook.copy(a.lookAt).lerp(b.lookAt, f)
  return { position: outPos, fov: a.fov + (b.fov - a.fov) * f, lookAt: outLook }
}

/** Idle float offset — subtle sine oscillation for ambient motion. */
export function idleFloat(time: number, amplitude = 0.08): { y: number; z: number } {
  return {
    y: Math.sin(time * 0.8) * amplitude,
    z: Math.cos(time * 0.6) * amplitude * 0.5,
  }
}
