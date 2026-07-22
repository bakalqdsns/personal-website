import { projects } from '@/lib/projects';
import type { Project, ProjectType } from '@/lib/projects';

/**
 * Capability axis displayed on the radar chart.
 * Each axis is grounded in real projects — `keywords` come straight from
 * `projects[i].stack`, and `level` is derived from the count, recency and
 * depth of projects that map to this axis.
 */
export interface Skill {
  key: string;
  label: string;
  level: number; // 0..1
  keywords: string[];
  /** Project indices (e.g. "01", "03") that contributed to this axis. */
  evidence: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Define the 5 axes and their matching rules
// ─────────────────────────────────────────────────────────────────────────────

interface AxisRule {
  key: string;
  label: string;
  /** Match against stack names (case-insensitive substring). */
  stackMatch: string[];
  /** Extra score if the project type is in this list. */
  typeMatch: ProjectType[];
  /** Extra score if the project role contains this substring. */
  roleMatch: string[];
  /** Per-project cap before normalization (full marks if you own the axis). */
  fullCredit?: number;
}

type ProjectRole = Project['role'];

const AXES: AxisRule[] = [
  {
    key: 'ai',
    label: 'AI / 计算机视觉',
    stackMatch: ['Python', 'FastAPI', 'PyTorch', 'ComfyUI', 'Grounding DINO', 'SAM2', 'Depth Anything', 'Seedance', 'AI'],
    typeMatch: ['ai', 'film'],
    roleMatch: ['AI', '系统设计', '导演'],
    fullCredit: 2,
  },
  {
    key: 'frontend',
    label: '前端 / 交互',
    stackMatch: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion', 'GSAP', 'Three.js', 'Vue', 'WebGL', 'R3F', 'drei', 'postprocessing', 'GLSL'],
    typeMatch: ['ai', 'game'],
    roleMatch: ['系统设计', '独立开发'],
    fullCredit: 1,
  },
  {
    key: 'backend',
    label: '后端 / 系统',
    stackMatch: ['.NET', 'Vue', 'Entity Framework', 'SQLite', 'Node.js', 'tRPC', 'PostgreSQL', 'Prisma', 'Edge Functions', 'Room', 'OkHttp'],
    typeMatch: ['fullstack', 'mobile'],
    roleMatch: ['系统架构', '后端', '独立开发'],
    fullCredit: 1,
  },
  {
    key: 'engine',
    label: '游戏引擎 / AR',
    stackMatch: ['Unity', 'C#', 'Vuforia', 'AR Foundation', 'Unreal Engine', 'Blueprint', 'AI Perception', 'Behavior Tree', 'Shader Graph', 'URP'],
    typeMatch: ['ar', 'game'],
    roleMatch: ['游戏系统', '核心开发'],
    fullCredit: 1,
  },
  {
    key: 'film',
    label: '影像 / 导演',
    stackMatch: ['Sony', 'DaVinci', 'Seedance'],
    typeMatch: ['film'],
    roleMatch: ['导演', '剪辑'],
    fullCredit: 2,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. Score each axis from real projects
// ─────────────────────────────────────────────────────────────────────────────

function scoreAxis(rule: AxisRule): { score: number; evidence: string[] } {
  let raw = 0;
  const evidence = new Set<string>();

  for (const project of projects) {
    const stacks = project.stack.map((s) => s.name);
    const stackHits = stacks.filter((s) =>
      rule.stackMatch.some((m) => s.toLowerCase().includes(m.toLowerCase())),
    ).length;
    const typeHit = rule.typeMatch.includes(project.type);
    const roleHit = rule.roleMatch.some((r) => project.role.includes(r));

    // project weight: complete > in-progress > planned; recent years weigh more
    const statusWeight = project.status === 'complete' ? 1.0 : project.status === 'in-progress' ? 0.7 : 0.4;
    const yearWeight = project.year >= '2026' ? 1.0 : project.year >= '2025' ? 0.9 : 0.7;
    const weight = statusWeight * yearWeight;

    // Per-project contribution:
    //   - 0.5 base if any stack matches, +0.15 per extra matching stack (max 4)
    //   - +0.3 if project type matches
    //   - +0.2 if project role matches
    let contribution = 0;
    if (stackHits > 0) contribution += 0.5 + 0.15 * Math.min(stackHits - 1, 3);
    if (typeHit) contribution += 0.3;
    if (roleHit) contribution += 0.2;
    contribution *= weight;

    if (contribution > 0) {
      raw += contribution;
      evidence.add(project.index);
    }
  }

  return { score: raw, evidence: Array.from(evidence).sort() };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Keywords per axis = unique stack names from contributing projects
// ─────────────────────────────────────────────────────────────────────────────

function keywordsFor(rule: AxisRule, evidence: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const contributingProjects = projects.filter((p) => evidence.includes(p.index));
  for (const project of contributingProjects) {
    for (const s of project.stack) {
      const matches = rule.stackMatch.some((m) => s.name.toLowerCase().includes(m.toLowerCase()));
      if (matches && !seen.has(s.name)) {
        seen.add(s.name);
        out.push(s.name);
      }
    }
  }
  // Fall back to rule's stackMatch (intersected with project stacks) if empty
  if (out.length === 0) {
    for (const project of projects) {
      for (const s of project.stack) {
        if (!seen.has(s.name)) {
          seen.add(s.name);
          out.push(s.name);
        }
      }
    }
  }
  return out.slice(0, 8);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Compose the final Skill[] with cross-axis relative scaling
// ─────────────────────────────────────────────────────────────────────────────

interface RawAxis {
  rule: AxisRule;
  raw: number;
  evidence: string[];
}

function buildSkills(): Skill[] {
  const raws: RawAxis[] = AXES.map((rule) => {
    const { score, evidence } = scoreAxis(rule);
    return { rule, raw: score, evidence };
  });

  // Find the strongest axis — it anchors the radar scale.
  const max = Math.max(...raws.map((r) => r.raw), 0.01);
  const MIN_LEVEL = 0.4;
  const MAX_LEVEL = 0.95;

  return raws.map(({ rule, raw, evidence }) => {
    const ratio = max === 0 ? MIN_LEVEL : raw / max;
    const level = MIN_LEVEL + (MAX_LEVEL - MIN_LEVEL) * ratio;
    return {
      key: rule.key,
      label: rule.label,
      level: Number(level.toFixed(2)),
      keywords: keywordsFor(rule, evidence),
      evidence,
    };
  });
}

export const skills: Skill[] = buildSkills();

// Re-order axes so the strongest one sits at top, then clockwise by score.
// This keeps the radar polygon visually stable across rebuilds.
export function orderedSkills(): Skill[] {
  return [...skills].sort((a, b) => b.level - a.level);
}