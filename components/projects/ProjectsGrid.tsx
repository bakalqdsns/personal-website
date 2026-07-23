'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useModalStore } from '@/lib/modalStore';
import { projects } from '@/lib/projects';

export default function ProjectsGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  const openAt = useModalStore((s) => s.openAt);

  // 10 projects — 4-row asymmetric grid (4 cols):
  // Row 1: [          time-fold (full)                     ]
  // Row 2: [ love-remote (2col) ] [ aicss ] [ lims           ]
  // Row 3: [ img-translator (2col) ] [ ue-city ] [ human-docs ]
  // Row 4: [ gd-martial-arts (2col) ] [ ar-ebook ] [ anifocus ]
  const colSpan = (i: number) => {
    const map = [
      'lg:col-span-4 lg:row-span-1', // 01 time-fold — hero, full width
      'lg:col-span-2 lg:row-span-1', // 02 love-remote
      'lg:col-span-1 lg:row-span-1', // 03 aicss
      'lg:col-span-1 lg:row-span-1', // 04 lims
      'lg:col-span-2 lg:row-span-1', // 05 img-translator
      'lg:col-span-1 lg:row-span-1', // 06 ue-city
      'lg:col-span-1 lg:row-span-1', // 07 human-docs
      'lg:col-span-2 lg:row-span-1', // 08 gd-martial-arts
      'lg:col-span-1 lg:row-span-1', // 09 ar-ebook
      'lg:col-span-1 lg:row-span-1', // 10 anifocus
    ];
    return map[i] ?? 'lg:col-span-1 lg:row-span-1';
  };

  return (
    <section id="projects" className="relative px-6 py-24 md:px-12">
      <div className="mx-auto mb-12 max-w-6xl">
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet" />
          <span>002 · INDEX</span>
          <span className="h-px flex-1 bg-line" />
          <span>{`// ${projects.length.toString().padStart(2, '0')} PROJECTS`}</span>
        </div>
        <h2 className="font-display text-5xl font-bold leading-tight tracking-tightest md:text-7xl">
          <span className="gradient-text">作品</span>索引
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          非对称网格,鼠标悬停时卡片做视差倾斜,点击展开项目档案。
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[260px] lg:grid-cols-4 lg:grid-rows-[repeat(4,minmax(0,1fr))]">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            onClick={() => openAt(i)}
            onHoverChange={(h) => setHovered(h ? i : hovered === i ? null : hovered)}
            hovered={hovered === i}
            className={colSpan(i)}
          />
        ))}
      </div>

      <ProjectModal />
    </section>
  );
}