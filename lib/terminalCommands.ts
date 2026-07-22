import { projects } from './projects';
import { skills } from './skills';

export interface CommandResult {
  text: string;
  delay?: number; // ms
}

export interface Command {
  name: string;
  description: string;
  run: (args: string[]) => CommandResult[];
}

const pad = (s: string, n: number) => (s.length >= n ? s : s + ' '.repeat(n - s.length));

export const commands: Command[] = [
  {
    name: 'help',
    description: '显示所有命令',
    run: () => [
      { text: 'Available commands:', delay: 30 },
      ...commands.map((c) => ({ text: `  ${pad(c.name, 10)} ${c.description}`, delay: 20 })),
    ],
  },
  {
    name: 'about',
    description: '关于我',
    run: () => [
      { text: '数字交互展厅 · OPERATE THE TOOLBOX', delay: 30 },
      { text: '一个以全栈 / Unity / 游戏 / AI 为核心的作品集。', delay: 20 },
      { text: '当前可立即到岗,全职优先。', delay: 20 },
    ],
  },
  {
    name: 'skills',
    description: '技能关键词',
    run: () =>
      skills.map((s) => ({
        text: `  ${pad(s.label, 10)} ${Math.round(s.level * 100)}%  · ${s.keywords.join(', ')}`,
        delay: 18,
      })),
  },
  {
    name: 'projects',
    description: '列出作品',
    run: () =>
      projects.map((p) => ({
        text: `  ${p.index}  ${p.title}  [${p.status.toUpperCase()}]`,
        delay: 18,
      })),
  },
  {
    name: 'contact',
    description: '联系方式',
    run: () => [
      { text: '  Email   · hello@example.com', delay: 20 },
      { text: '  GitHub  · @showroom', delay: 20 },
      { text: '  WeChat  · 终端只展示公开信息 :)', delay: 20 },
    ],
  },
  {
    name: 'date',
    description: '当前时间',
    run: () => [{ text: new Date().toString(), delay: 0 }],
  },
  {
    name: 'whoami',
    description: '我是谁',
    run: () => [{ text: 'guest@showroom', delay: 0 }],
  },
  {
    name: 'clear',
    description: '清空输出',
    run: () => [{ text: '__CLEAR__', delay: 0 }],
  },
  {
    name: 'echo',
    description: '回显文本: echo <text>',
    run: (args) => [{ text: args.join(' '), delay: 0 }],
  },
];

export function findCommand(name: string): Command | undefined {
  return commands.find((c) => c.name === name);
}