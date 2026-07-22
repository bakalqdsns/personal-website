'use client';

import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { skills } from '@/lib/skills';

const HolographicRadar = dynamic(() => import('./HolographicRadar'), { ssr: false });

export default function SkillPanel() {
  const [active, setActive] = useState<number | null>(null);
  const skill = active !== null ? skills[active] : null;

  return (
    <section id="radar" className="relative px-6 py-24 md:px-12">
      <div className="mx-auto mb-12 max-w-6xl">
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
          <span>003 · STACK</span>
          <span className="h-px flex-1 bg-line" />
          <span>{'// CAPABILITY MATRIX'}</span>
        </div>
        <h2 className="font-display text-5xl font-bold leading-tight tracking-tightest md:text-7xl">
          能力<span className="gradient-text">雷达</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted">点击顶点查看具体关键词,每个维度都映射到一段真实项目经验。</p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-square w-full max-w-[640px] justify-self-center rounded-3xl border border-line bg-card/40 p-4 backdrop-blur-sm">
          <HolographicRadar active={active} onPick={setActive} />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
          <div className="pointer-events-none absolute inset-0 animate-scan bg-gradient-to-r from-transparent via-cyan/10 to-transparent opacity-30" />
        </div>

        <div className="flex flex-col gap-3">
          {skills.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              data-cursor="pointer"
              className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition ${
                active === i
                  ? 'border-cyan/60 bg-cyan/5'
                  : 'border-line/60 bg-card/40 hover:border-violet/40'
              }`}
            >
              <span
                className="grid h-9 w-9 place-items-center rounded-full font-mono text-xs"
                style={{ background: `conic-gradient(var(--cyan) ${s.level * 360}deg, var(--line) 0)` }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-card text-fg">
                  {Math.round(s.level * 100)}
                </span>
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg">{s.label}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {s.keywords.length} KEYWORDS
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted">点击展开关键词</p>
              </div>
              <span className={`text-cyan transition ${active === i ? 'rotate-90' : ''}`}>→</span>
            </button>
          ))}

          <AnimatePresence mode="wait">
            {skill && (
              <motion.div
                key={skill.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-2 rounded-2xl border border-cyan/30 bg-cyan/5 p-5"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">{skill.label} · STACK</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {skill.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-fg/90"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}