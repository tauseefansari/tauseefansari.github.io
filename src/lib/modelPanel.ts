import { ContentSide, SectionId } from 'src/config/enums'
import { SECTION_LAYOUT, SECTIONS } from 'src/config/scenes'
import { modelViewportMetrics } from 'src/config/sectionLayout'

export const CONTACT_INDEX = SECTIONS.length - 1

const FOOTER_GAP_PX = 20
const CONTACT_GAP_PX = 12

function clampSection(index: number): number {
  return Math.min(Math.max(index, 0), CONTACT_INDEX)
}

/**
 * Vertical px offset for contact only when the footer enters view.
 * Stays 0 while contact is active so the envelope remains fixed & centred
 * like every other section; shifts up only to avoid overlapping the footer.
 */
export function contactPanelOffsetY(): number {
  const footer = document.querySelector('footer')
  if (!footer) return 0

  const footerTop = footer.getBoundingClientRect().top
  if (footerTop >= window.innerHeight) return 0

  const contact = document.getElementById(SectionId.Contact)
  if (!contact) return 0

  const { bottom: panelBottom } = modelViewportMetrics()
  const contactBottom = contact.getBoundingClientRect().bottom
  const maxBottom = Math.min(contactBottom - CONTACT_GAP_PX, footerTop - FOOTER_GAP_PX)
  const overflow = panelBottom - maxBottom

  return overflow > 0 ? -overflow : 0
}

/** True once the footer enters — pin contact section + freeze model sway. */
export function isInFooterZone(): boolean {
  const footer = document.querySelector('footer')
  if (!footer) return false
  return footer.getBoundingClientRect().top <= window.innerHeight * 0.82
}

export function modelPanelLeftForSection(
  sectionIndex: number,
  isMobile: boolean,
): number {
  if (isMobile) return 0

  const id = SECTIONS[clampSection(sectionIndex)] ?? SectionId.Hero
  return SECTION_LAYOUT[id] === ContentSide.Right ? 0 : 50
}

export function resolveActiveSection(): number {
  if (isInFooterZone()) return CONTACT_INDEX

  const sections = document.querySelectorAll<HTMLElement>('[data-section]')
  const last = sections.length - 1
  if (last < 0) return 0

  const center = window.innerHeight * 0.5
  let active = 0
  sections.forEach((el, i) => {
    if (el.getBoundingClientRect().top <= center) active = i
  })

  return clampSection(active)
}

/** Apply vertical tracking only once contact is fully active — not during journey → contact morph. */
export function shouldTrackContactSection(
  _section: number,
  morph: { from: number; to: number; blend: number },
  footerPinned: boolean,
): boolean {
  if (footerPinned) return true
  return morph.from === CONTACT_INDEX && morph.to === CONTACT_INDEX
}
