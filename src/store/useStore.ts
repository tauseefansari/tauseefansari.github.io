import { create } from 'zustand'

interface PortfolioState {
  scrollProgress: number
  section: number
  morphState: { from: number; to: number; blend: number }
  footerPinned: boolean
  /** Contact-only vertical panel shift (px) — keeps mail with contact, not footer */
  panelOffsetY: number
  sceneReady: boolean
  canvasVisible: boolean
  setScrollProgress: (p: number) => void
  setSection: (s: number) => void
  setMorphState: (m: { from: number; to: number; blend: number }) => void
  setFooterPinned: (pinned: boolean) => void
  setPanelOffsetY: (y: number) => void
  setSceneReady: (ready: boolean) => void
  setCanvasVisible: (visible: boolean) => void
}

/** Global DOM ↔ WebGL bridge. Canvas reads via getState() — no re-renders on scroll. */
export const useStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  section: 0,
  morphState: { from: 0, to: 0, blend: 0 },
  footerPinned: false,
  panelOffsetY: 0,
  sceneReady: false,
  canvasVisible: true,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setSection: (section) => set({ section }),
  setMorphState: (morphState) => set({ morphState }),
  setFooterPinned: (footerPinned) => set({ footerPinned }),
  setPanelOffsetY: (panelOffsetY) => set({ panelOffsetY }),
  setSceneReady: (sceneReady) => set({ sceneReady }),
  setCanvasVisible: (canvasVisible) => set({ canvasVisible }),
}))
