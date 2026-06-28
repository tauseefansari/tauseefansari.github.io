import type { SectionModelId } from 'src/config/enums'

import houseGlb from 'src/assets/models/icons/house.glb?url'
import trophyGlb from 'src/assets/models/icons/trophy.glb?url'
import laptopGlb from 'src/assets/models/icons/laptop.glb?url'
import booksGlb from 'src/assets/models/icons/books.glb?url'
import bubbleGlb from 'src/assets/models/icons/bubble.glb?url'
import signpostGlb from 'src/assets/models/icons/signpost.glb?url'
import letterGlb from 'src/assets/models/icons/letter.glb?url'

export const SECTION_MODEL_URLS: Record<SectionModelId, string> = {
  house: houseGlb,
  trophy: trophyGlb,
  laptop: laptopGlb,
  books: booksGlb,
  bubble: bubbleGlb,
  signpost: signpostGlb,
  letter: letterGlb,
}

export interface SectionModelPose {
  scale: number
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  offsetX?: number
  offsetY?: number
}

/** Per-model pose tuning — see scripts/download-icon-models.mjs for sources. */
export const SECTION_MODEL_POSE: Record<SectionModelId, SectionModelPose> = {
  house: { scale: 1.32, rotateY: 0.28 },
  trophy: { scale: 1.15, rotateY: 0, rotateX: 0, offsetX: -0.18, offsetY: -0.32 },
  laptop: { scale: 1.14, rotateY: -0.38, rotateX: 0.06 },
  books: { scale: 1.28, rotateY: 0.28 },
  bubble: { scale: 1.34, rotateY: -0.22, rotateX: 0.08 },
  signpost: { scale: 1.4, rotateY: -0.32, offsetY: -0.28 },
  letter: { scale: 1.38, rotateX: 0.12, rotateY: -0.48, rotateZ: 0.05 },
}

const preloaded = new Set<string>()

/** Preload a single section GLB — call from the 3D layer when a model is needed next. */
export function preloadSectionModel(modelId: SectionModelId): void {
  const url = SECTION_MODEL_URLS[modelId]
  if (preloaded.has(url)) return
  preloaded.add(url)
  void import('@react-three/drei').then(({ useGLTF }) => useGLTF.preload(url))
}
