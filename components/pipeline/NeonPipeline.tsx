'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { pipeline, type PipelineNode } from '@/lib/pipeline';

const statusStyle: Record<PipelineNode['status'], { dot: string; text: string; ring: string }> = {
  done: { dot: 'bg-cyan shadow-[0_0_18px_var(--cyan)]', text: 'text-cyan', ring: 'ring-cyan/60' },
  wip: { dot: 'bg-amber animate-pulseRing', text: 'text-amber', ring: 'ring-amber/60' },
  planned: { dot: 'bg-status-pending', text: 'text-muted', ring: 'ring-status-pending/40' },
};

const statusLabel: Record<PipelineNode['status'], string> = {
  done: '已交付',
  wip: '开发中',
  planned: '规划中',
};

export default function NeonPipeline() {
  const [active, setActive] = useState<PipelineNode | null>(null);

  return (
    <section id="pipeline" className="relative px-6 py-24 md:px-12">
      <div className="mx-auto mb-12 max-w-6xl">
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet" />
          <span>004 · PIPELINE</span>
          <span className="h-px flex-1 bg-line" />
          <a
            href="#projects"
            data-cursor="pointer"
            className="transition hover:text-cyan"
            title="跳转到 AICSS 项目卡片"
          >
            {'// AICSS · 11 NODES'}
          </a>
        </div>
        <h2 className="font-display text-5xl font-bold leading-tight tracking-tightest md:text-7xl">
          <span className="gradient-text">AICSS</span>实施路线
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          <a
            href="#projects"
            data-cursor="pointer"
            className="text-fg underline decoration-cyan/40 underline-offset-4 transition hover:text-cyan"
          >
            AICSS · AI Cinematic Spatial System
          </a>
          的端到端交付路径——从文献调研到 AI 模型部署、分镜生成、图层分割、三维重建与 Blender 自动化合成。
          当前在第 6 步,预计 9 月前内完成剩余 5 个节点。
        </p>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* track */}
        <div className="absolute left-0 right-0 top-7 h-1 rounded-full bg-line md:top-9" aria-hidden />
        <motion.div
          className="absolute left-0 top-7 h-1 rounded-full md:top-9"
          style={{ background: 'linear-gradient(90deg, var(--cyan), var(--violet))' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${(pipeline.filter((n) => n.status !== 'planned').length / pipeline.length) * 100}%` }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          viewport={{ once: true }}
        />

        <ol className="relative grid grid-cols-3 gap-6 md:grid-cols-11">
          {pipeline.map((n) => {
            const s = statusStyle[n.status];
            return (
              <li key={n.id} className="flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => setActive(n)}
                  data-cursor="pointer"
                  className={`relative grid h-12 w-12 place-items-center rounded-full bg-bg ring-2 ${s.ring} transition hover:scale-110 md:h-16 md:w-16`}
                >
                  <span className={`h-3 w-3 rounded-full md:h-4 md:w-4 ${s.dot}`} />
                </button>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted">{n.index}</div>
                <div className={`mt-1 text-xs font-medium md:text-sm ${s.text}`}>{n.title}</div>
                <div className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-widest text-muted md:block">
                  {n.subtitle}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="font-mono text-xs uppercase tracking-[0.32em] text-muted">ETA</div>
          <div className="font-display text-7xl font-bold leading-none tracking-tightest md:text-9xl">
            <span className="gradient-text">2</span>
            <span className="text-fg/40">个月</span>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted">2026 · Q3 </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="关闭"
              onClick={() => setActive(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-card/80 p-8 shadow-2xl backdrop-blur-2xl"
              role="dialog"
            >
              <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
                <span className="text-cyan">{active.index}</span>
                <span>·</span>
                <span>{active.subtitle}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold">{active.title}</h3>
              <p className="mt-4 text-fg/85">{active.detail}</p>
              <div className={`mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-widest ${
                active.status === 'done'
                  ? 'border-cyan/40 bg-cyan/10 text-cyan'
                  : active.status === 'wip'
                    ? 'border-amber/40 bg-amber/10 text-amber'
                    : 'border-white/10 bg-white/5 text-muted'
              }`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {statusLabel[active.status]}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  data-cursor="pointer"
                  className="rounded-full border border-white/15 px-4 py-2 text-sm hover:border-cyan/60 hover:text-cyan"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}