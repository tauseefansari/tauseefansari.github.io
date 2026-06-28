/** Scroll-spy / layout section identifiers. */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Portfolio: 'portfolio',
  Skills: 'skills',
  Testimonials: 'testimonials',
  Timeline: 'timeline',
  Contact: 'contact',
} as const
export type SectionId = (typeof SectionId)[keyof typeof SectionId]

/** Which side section content sits on (3D model uses the opposite). */
export const ContentSide = {
  Left: 'left',
  Right: 'right',
} as const
export type ContentSide = (typeof ContentSide)[keyof typeof ContentSide]

/** Portfolio project card ids — match `portfolio.items.*` in i18n. */
export const ProjectId = {
  NextFood: 'nextFood',
  PortfolioBuilder: 'portfolioBuilder',
  StrategyFilter: 'strategyFilter',
  ELearningSystem: 'eLearningSystem',
  ResumeBuilder: 'resumeBuilder',
} as const
export type ProjectId = (typeof ProjectId)[keyof typeof ProjectId]

export const TestimonialId = {
  Aamir: 'aamir',
  Mohsin: 'mohsin',
} as const
export type TestimonialId = (typeof TestimonialId)[keyof typeof TestimonialId]

export const TimelineId = {
  Diploma: 'diploma',
  Bachelor: 'bachelor',
  Mitr: 'mitr',
  Deloitte: 'deloitte',
} as const
export type TimelineId = (typeof TimelineId)[keyof typeof TimelineId]

/** Social link ids — match `common.social.*` in i18n and SocialIcon registry. */
export const SocialId = {
  Linkedin: 'linkedin',
  Github: 'github',
  Facebook: 'facebook',
  Instagram: 'instagram',
  Whatsapp: 'whatsapp',
  Email: 'email',
} as const
export type SocialId = (typeof SocialId)[keyof typeof SocialId]

/** GLB filenames under `src/assets/models/icons/`. */
export const SectionModelId = {
  House: 'house',
  Trophy: 'trophy',
  Laptop: 'laptop',
  Books: 'books',
  Bubble: 'bubble',
  Signpost: 'signpost',
  Letter: 'letter',
} as const
export type SectionModelId = (typeof SectionModelId)[keyof typeof SectionModelId]

export const Theme = {
  Light: 'light',
  Dark: 'dark',
} as const
export type Theme = (typeof Theme)[keyof typeof Theme]

export const I18nNamespace = {
  Portfolio: 'portfolio',
  Common: 'common',
  Meta: 'meta',
} as const
export type I18nNamespace = (typeof I18nNamespace)[keyof typeof I18nNamespace]

/** Section background glow variant. */
export const SectionGlow = {
  Accent: 'accent',
  Accent2: 'accent-2',
  None: 'none',
} as const
export type SectionGlow = (typeof SectionGlow)[keyof typeof SectionGlow]

export const FormStatus = {
  Idle: 'idle',
  Success: 'success',
  Error: 'error',
} as const
export type FormStatus = (typeof FormStatus)[keyof typeof FormStatus]

/** Skill ids — match `skills.items.*` in i18n and BrandIcon slugs. */
export const SkillId = {
  React: 'react',
  NextDotJs: 'nextdotjs',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  OpenJdk: 'openjdk',
  Python: 'python',
  Php: 'php',
  Cplusplus: 'cplusplus',
  TailwindCss: 'tailwindcss',
  CodeIgniter: 'codeigniter',
  Qt: 'qt',
  Git: 'git',
  Github: 'github',
  Subversion: 'subversion',
  Jenkins: 'jenkins',
  GithubActions: 'githubactions',
  Figma: 'figma',
  Mysql: 'mysql',
  Postgresql: 'postgresql',
  GoogleCloud: 'googlecloud',
  GithubCopilot: 'githubcopilot',
  Claude: 'claude',
  Cursor: 'cursor',
} as const
export type SkillId = (typeof SkillId)[keyof typeof SkillId]

export const AboutStatId = {
  Experience: 'experience',
  Designs: 'designs',
  Tests: 'tests',
} as const
export type AboutStatId = (typeof AboutStatId)[keyof typeof AboutStatId]
