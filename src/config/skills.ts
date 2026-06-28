import { SkillId } from 'src/config/enums'

/**
 * Skill ids — must match keys under `skills.items` in the locale JSON AND a
 * BrandIcon name. Shared by the DOM list (SkillsSection) and the 3D physics
 * sandbox so both stay in sync from one source (DRY).
 */
export const SKILL_IDS: readonly SkillId[] = [
  SkillId.React,
  SkillId.NextDotJs,
  SkillId.TypeScript,
  SkillId.JavaScript,
  SkillId.OpenJdk,
  SkillId.Python,
  SkillId.Php,
  SkillId.Cplusplus,
  SkillId.TailwindCss,
  SkillId.CodeIgniter,
  SkillId.Qt,
  SkillId.Git,
  SkillId.Github,
  SkillId.Subversion,
  SkillId.Jenkins,
  SkillId.GithubActions,
  SkillId.Figma,
  SkillId.Mysql,
  SkillId.Postgresql,
  SkillId.GoogleCloud,
  SkillId.GithubCopilot,
  SkillId.Claude,
  SkillId.Cursor,
]
