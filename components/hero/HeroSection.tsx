'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SplitHeading from './SplitHeading';
import Marquee from './Marquee';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-24 md:px-12"
    >
      {ready && <ParticleField />}

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Eyebrow · terminal-style status row */}
        <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan animate-pulseRing" />
          <span>001 · ENTRY</span>
          <span className="h-px flex-1 bg-line" />
          <span className="hidden sm:inline">{'// 数字交互展厅 · READY'}</span>
          <span className="inline sm:hidden">{'// READY'}</span>
        </div>

        {/* Headline — name + tagline.
            Line 1: bilingual name in display size (CN glyphs use .font-cn fallback stack).
            Line 2: present-tense verb phrase + 'the stack' (engineer culture, not toolbox).
            Line 3 (eyebrow): system signature. */}
        <h1 className="font-display cn text-[18vw] font-bold leading-[0.92] tracking-tightest text-fg md:text-[12vw]">
          <span className="block">
            <SplitHeading text="刘 淇" delay={0.1} />
          </span>
        </h1>
        <h2 className="mt-2 font-display text-[8vw] font-bold leading-[0.95] tracking-tightest md:text-[5.5vw]">
          <span className="block">
            <SplitHeading text="OPERATING THE STACK" delay={0.3} className="gradient-text" />
          </span>
        </h2>

        {/* Sign-off · repo-style metadata */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          <span className="text-cyan/80">LIUQI.SH</span>
          <span aria-hidden className="text-line">/</span>
          <span>SHOWROOM</span>
          <span aria-hidden className="text-line">/</span>
          <span>2024 — 2026</span>
          <span aria-hidden className="text-line">/</span>
          <span>v 1.0 · boot sequence ok</span>
        </div>

        {/* Body copy */}
        <p className="mt-10 max-w-2xl text-balance text-base leading-relaxed text-fg/70 md:text-lg">
          我是 <span className="font-medium text-cyan">刘淇</span>,做
          <span className="font-medium text-cyan">视觉工具链</span>、
          <span className="font-medium text-cyan">影像导演</span>、
          <span className="font-medium text-cyan">游戏 / AR</span> 与
          <span className="font-medium text-cyan">全栈系统</span> 的独立工程师。
          每个项目都展开成结构化档案——技术栈、角色定位、关键挑战、影像或界面素材——而不是一张张孤立的截图。
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            data-cursor="pointer"
            className="group inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 font-medium text-black transition hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
          >
            <span>进入作品</span>
            <span className="transition group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#about"
            data-cursor="pointer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-fg/80 transition hover:border-cyan/60 hover:text-cyan"
          >
            <span>关于我</span>
          </a>

          <div className="ml-auto hidden items-center gap-2 rounded-full border border-amber/30 bg-amber/5 px-4 py-2 font-mono text-xs text-amber md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulseRing" />
            状态 · 可立即到岗 · 全职优先
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <Marquee />
      </div>
    </section>
  );
}