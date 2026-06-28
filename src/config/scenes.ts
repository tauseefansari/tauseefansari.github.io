import { Vector3 } from 'three'
import {
  ContentSide,
  ProjectId,
  SectionId,
  TestimonialId,
  TimelineId,
} from 'src/config/enums'

export const SECTIONS: readonly SectionId[] = [
  SectionId.Hero,
  SectionId.About,
  SectionId.Portfolio,
  SectionId.Skills,
  SectionId.Testimonials,
  SectionId.Timeline,
  SectionId.Contact,
]

/** Nav + screen-reader labels keyed by section — single source for navigation & announcer. */
export const SECTION_META = {
  [SectionId.Hero]: { navKey: 'nav.home', titleKey: null },
  [SectionId.About]: { navKey: 'nav.about', titleKey: 'about.title' },
  [SectionId.Portfolio]: { navKey: 'nav.work', titleKey: 'portfolio.title' },
  [SectionId.Skills]: { navKey: 'nav.skills', titleKey: 'skills.title' },
  [SectionId.Testimonials]: {
    navKey: 'nav.testimonials',
    titleKey: 'testimonials.title',
  },
  [SectionId.Timeline]: { navKey: 'nav.timeline', titleKey: 'timeline.title' },
  [SectionId.Contact]: { navKey: 'nav.contact', titleKey: 'contact.title' },
} as const satisfies Record<SectionId, { navKey: string; titleKey: string | null }>

export const SECTION_LAYOUT: Record<SectionId, ContentSide> = {
  [SectionId.Hero]: ContentSide.Right,
  [SectionId.About]: ContentSide.Left,
  [SectionId.Portfolio]: ContentSide.Right,
  [SectionId.Skills]: ContentSide.Left,
  [SectionId.Testimonials]: ContentSide.Right,
  [SectionId.Timeline]: ContentSide.Left,
  [SectionId.Contact]: ContentSide.Right,
}

export const PROJECT_IDS: readonly ProjectId[] = [
  ProjectId.NextFood,
  ProjectId.PortfolioBuilder,
  ProjectId.StrategyFilter,
  ProjectId.ELearningSystem,
  ProjectId.ResumeBuilder,
]

/** External links per project (not translatable — URLs live here, copy in i18n). */
export interface ProjectLinks {
  github?: string
  demo?: string
  /** GitHub repo slug under `tauseefansari`. */
  repo?: string
  /** Path to preview image in the repo, e.g. `assets/pizza.jpg`. */
  image?: string
  /** Git branch for `image` (defaults to `main`). */
  ref?: string
}

export const PROJECT_LINKS: Partial<Record<ProjectId, ProjectLinks>> = {
  [ProjectId.NextFood]: {
    github: 'https://github.com/tauseefansari/next-food',
    demo: 'https://next-food-nextjs.vercel.app/',
    repo: 'next-food',
    image: 'assets/pizza.jpg',
  },
  [ProjectId.PortfolioBuilder]: {
    github: 'https://github.com/tauseefansari/Portfolio-Builder',
    demo: 'https://tauseefansari.github.io/Portfolio-Builder',
    repo: 'Portfolio-Builder',
    image: 'public/assets/images/portfolio5.png',
  },
  [ProjectId.StrategyFilter]: {
    github: 'https://github.com/tauseefansari/strategy-filter',
    repo: 'strategy-filter',
    image: 'public/vite.svg',
  },
  [ProjectId.ELearningSystem]: {
    github: 'https://github.com/tauseefansari/E-Learning-System',
    repo: 'E-Learning-System',
    image: 'output/ss1.PNG',
    ref: 'master',
  },
  [ProjectId.ResumeBuilder]: {
    github: 'https://github.com/tauseefansari/Resume-Builder',
    demo: 'https://github-custom-resume.netlify.app/',
    repo: 'Resume-Builder',
    image: 'public/logo512.png',
  },
}

export const TESTIMONIAL_IDS: readonly TestimonialId[] = [
  TestimonialId.Aamir,
  TestimonialId.Mohsin,
]

export const TIMELINE_IDS: readonly TimelineId[] = [
  TimelineId.Diploma,
  TimelineId.Bachelor,
  TimelineId.Mitr,
  TimelineId.Deloitte,
]

/** Uniform sculpture scale — never changes between sections. */
export const MODEL_SCALE = 1.18

/** Side marker magnitude: pose.x is ±SIDE (not world units). Panel handles horizontal placement. */
export const MODEL_SIDE_MARKER = 1

const MODEL_Z = -0.9

/** Fixed camera — sculpture centered in the sliding half-width panel. */
const CAMERA_POSITION = new Vector3(0, 0, 5.2)
const CAMERA_LOOK_AT = new Vector3(0, 0, 0)
const CAMERA_FOV = 38

export interface ObjectPose {
  position: Vector3
  rotation: Vector3
  scale: number
}

export interface CameraPose {
  position: Vector3
  fov: number
  lookAt: Vector3
}

/** Model sits on the opposite side from content. */
function modelSide(contentSide: ContentSide): ContentSide {
  return contentSide === ContentSide.Right ? ContentSide.Left : ContentSide.Right
}

function pose(contentSide: ContentSide, y = 0): ObjectPose {
  const side = modelSide(contentSide)
  const marker = side === ContentSide.Left ? -MODEL_SIDE_MARKER : MODEL_SIDE_MARKER
  return {
    position: new Vector3(marker, y, MODEL_Z),
    rotation: new Vector3(0.04, side === ContentSide.Left ? 0.42 : -0.42, 0),
    scale: MODEL_SCALE,
  }
}

/** Zig-zag sculpture poses — alternating sides, constant scale. */
export const OBJECT_POSES: readonly ObjectPose[] = SECTIONS.map((id) =>
  pose(SECTION_LAYOUT[id]),
)

/** Single fixed camera pose — prevents zoom/size drift while scrolling. */
export const CAMERA_POSES: readonly CameraPose[] = SECTIONS.map(() => ({
  position: CAMERA_POSITION.clone(),
  fov: CAMERA_FOV,
  lookAt: CAMERA_LOOK_AT.clone(),
}))

export const LAYER_SPEEDS = {
  background: 0.25,
  foreground: 1.1,
} as const
