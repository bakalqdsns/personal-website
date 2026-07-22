'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useModalStore } from '@/lib/modalStore';
import { projects } from '@/lib/projects';
import StatusBadge from '@/components/ui/StatusBadge';
import VideoPlayer from '@/components/ui/VideoPlayer';

const TYPE_LABEL: Record<string, string> = {
  fullstack: '全栈项目',
  ar: 'AR / Unity',
  game: '游戏',
  ai: 'AI 应用',
  pipeline: '工作流',
  mobile: '移动应用',
  film: '影像作品',
};

export default function ProjectModal() {
  const { open, index, close, next, prev } = useModalStore();
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const project = projects[index];

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    },
    [open, close, next, prev],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // focus trap
      setTimeout(() => dialogRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [index]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal
          aria-labelledby="modal-title"
        >
          <button
            type="button"
            aria-label="关闭"
            onClick={close}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className="relative z-10 flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[color-mix(in_srgb,var(--card)_85%,transparent)] shadow-[0_30px_120px_rgba(0,0,0,0.6)] outline-none backdrop-blur-2xl md:flex-row"
          >
            {/* Media column */}
            <div className="relative flex h-[40%] w-full flex-col bg-black/30 md:h-full md:w-1/2">
              <div className="relative flex-1 overflow-hidden">
                {/* Only render the active item — zero DOM overhead for all other media */}
                {project.media[active]?.type === 'video' ? (
                  <VideoPlayer
                    src={project.media[active]!.src}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <motion.img
                    key={project.media[active]?.src}
                    src={project.media[active]?.src ?? project.cover.src}
                    alt={project.media[active]?.alt ?? project.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                )}

                <button
                  type="button"
                  aria-label="上一张"
                  onClick={() => setActive((a) => (a - 1 + project.media.length) % project.media.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-fg/80 backdrop-blur-md hover:border-cyan/60 hover:text-cyan"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="下一张"
                  onClick={() => setActive((a) => (a + 1) % project.media.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-fg/80 backdrop-blur-md hover:border-cyan/60 hover:text-cyan"
                >
                  →
                </button>
              </div>

              {/* thumbnails */}
              <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-black/30 p-3 no-scrollbar">
                {project.media.map((m, i) => (
                  <button
                    key={m.src}
                    type="button"
                    aria-label={`第 ${i + 1} 张`}
                    onClick={() => setActive(i)}
                    className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                      i === active ? 'border-cyan' : 'border-white/10'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Text column */}
            <div className="flex h-[60%] w-full flex-col overflow-y-auto p-6 md:h-full md:w-1/2 md:p-10">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
                  <span className="text-cyan">{project.index}</span>
                  <span>·</span>
                  <span>{TYPE_LABEL[project.type]}</span>
                </div>
                <StatusBadge status={project.status} />
              </div>

              <h2 id="modal-title" className="font-display text-3xl font-bold leading-tight md:text-4xl">
                {project.title}
              </h2>
              <p className="mt-2 text-sm uppercase tracking-widest text-muted">{project.subtitle}</p>

              <p className="mt-5 text-fg/85">{project.summary}</p>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">角色</dt>
                  <dd className="mt-1 text-fg">{project.role}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">年份</dt>
                  <dd className="mt-1 text-fg">{project.year}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">技术栈</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s.name}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-fg/80"
                      >
                        {s.name}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted">关键指标</h3>
                <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-lg border border-cyan/20 bg-cyan/5 px-3 py-2 text-sm text-cyan"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted">工程挑战</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-fg/85">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="pointer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm hover:border-cyan/60 hover:text-cyan"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5C5.7.5.5 5.6.5 11.9c0 5 3.3 9.3 7.8 10.8.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.5 5.6 18.3.5 12 .5z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="pointer"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-sm font-medium text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                  >
                    完整演示 →
                  </a>
                )}
                <button
                  type="button"
                  onClick={close}
                  data-cursor="pointer"
                  className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted hover:text-fg"
                >
                  关闭 <span className="font-mono text-xs">ESC</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}