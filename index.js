/**
 * AI Design Skills — host skill provider for DeepSeek Harness.
 *
 * Serves two Agent Skills bundled with this plugin:
 *   - landing-page-design: strategy, structure, copy and a strict visual system
 *   - figma-designer: variables, text styles, auto layout and components
 *
 * The provider follows the shape used by bundled providers such as
 * `@deepseek-ai/dsh-skill-badge`: register synchronously during plugin apply,
 * return candidates from `list()`, and return the full body from `get()`.
 * Skill files are resolved relative to this module, so the provider keeps
 * working whether the bundle is linked from a checkout or copied into the
 * profile.
 *
 * Skill content: MIT, https://github.com/elayadesign/ai-design-skills
 */
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const PROVIDER_NAME = 'ai-design-skills'

/**
 * Ranks defined by @deepseek-ai/dsh-skill: project `.dsh` 100, project
 * `.agents` 200, custom 300, user `.dsh` 400, user `.agents` 500,
 * bundled 600. A custom rank lets project or user copies of the same skill
 * name take precedence over this bundle.
 */
const SKILL_RANK = 300
const SKILL_SOURCE = 'custom'

const SKILL_FILES = [
  {
    name: 'landing-page-design',
    file: new URL('./skills/landing-page-design/SKILL.md', import.meta.url),
  },
  {
    name: 'figma-designer',
    file: new URL('./skills/figma-designer/SKILL.md', import.meta.url),
  },
]

const INVOCATION = { modelInvocable: true, userInvocable: true }

/** Strip one pair of surrounding quotes from a YAML scalar. */
function unquote(value) {
  const trimmed = value.trim()
  if (trimmed.length >= 2) {
    const first = trimmed[0]
    const last = trimmed[trimmed.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return trimmed.slice(1, -1).trim()
    }
  }
  return trimmed
}

/** Read the two frontmatter fields this provider needs, plus the body. */
function splitFrontmatter(raw) {
  const text = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw
  const firstNewline = text.indexOf('\n')
  if (firstNewline < 0 || text.slice(0, firstNewline).replace(/\r$/, '') !== '---') {
    return { data: {}, body: text }
  }
  let lineStart = firstNewline + 1
  while (lineStart <= text.length) {
    const nextNewline = text.indexOf('\n', lineStart)
    const lineEnd = nextNewline < 0 ? text.length : nextNewline
    if (text.slice(lineStart, lineEnd).replace(/\r$/, '') === '---') {
      const header = text.slice(firstNewline + 1, lineStart)
      return { data: parseHeader(header), body: nextNewline < 0 ? '' : text.slice(nextNewline + 1) }
    }
    if (nextNewline < 0) break
    lineStart = nextNewline + 1
  }
  return { data: {}, body: text }
}

function parseHeader(header) {
  const data = {}
  const name = /^name:\s*(.+?)\s*$/m.exec(header)
  if (name !== null) data.name = unquote(name[1])
  const quotedDescription = /^description:\s*"([\s\S]*?)"\s*$/m.exec(header)
  const plainDescription = /^description:\s*(.+?)\s*$/m.exec(header)
  const description = quotedDescription ?? plainDescription
  if (description !== null) data.description = unquote(description[1])
  return data
}

/** Load one bundled skill file and validate its frontmatter identity. */
async function readSkill(entry) {
  const raw = await readFile(entry.file, 'utf8')
  const { data, body } = splitFrontmatter(raw)
  const name = typeof data.name === 'string' && data.name.length > 0 ? data.name : entry.name
  if (name !== entry.name) {
    throw new Error(
      `ai-design-skills: ${fileURLToPath(entry.file)} declares skill "${name}", expected "${entry.name}"`,
    )
  }
  const description = typeof data.description === 'string' ? data.description.trim() : ''
  if (description.length === 0) {
    throw new Error(`ai-design-skills: skill "${entry.name}" has no description in its frontmatter`)
  }
  return {
    name,
    description,
    content: body.trim(),
    directory: fileURLToPath(new URL('./', entry.file)),
  }
}

const provider = {
  name: PROVIDER_NAME,

  async list() {
    const skills = await Promise.all(SKILL_FILES.map(readSkill))
    return skills.map((skill) => ({
      name: skill.name,
      description: skill.description,
      invocation: INVOCATION,
      source: SKILL_SOURCE,
      provider: PROVIDER_NAME,
      rank: SKILL_RANK,
      resourceBase: { kind: 'directory', path: skill.directory },
      locator: { id: skill.name },
    }))
  },

  async get(candidate) {
    const entry = SKILL_FILES.find((item) => item.name === candidate.name)
    if (entry === undefined) return undefined
    const skill = await readSkill(entry)
    return {
      name: skill.name,
      description: skill.description,
      invocation: INVOCATION,
      source: SKILL_SOURCE,
      provider: PROVIDER_NAME,
      resourceBase: { kind: 'directory', path: skill.directory },
      content: skill.content,
    }
  },
}

/** Cordis plugin name. */
export const name = 'ai-design-skills'

/** Service required by the skill provider. */
export const inject = ['skills']

/** Register the AI design skills provider on `ctx.skills`. */
export function apply(ctx) {
  ctx.skills.registerProvider(() => provider)
}
