'use client';

import { useRef, useState } from 'react';
import type { Project } from '@/lib/projects';
import StatusBadge from '@/components/ui/StatusBadge';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onHoverChange?: (hover: boolean) => void;
  hovered?: boolean;
  className?: string;
}

export default function ProjectCard({ project, onClick, onHoverChange, className = '' }: ProjectCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [tilt, setTilt] = useState<{ rx: number; ry: number; mx: number; my: number }>({ rx: 0, ry: 0, mx: 50, my: 50 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;
    setStyle({
      transform: `perspective(1000px) rotateX(${(-ny * 6).toFixed(2)}deg) rotateY(${(nx * 6).toFixed(2)}deg) translateZ(0)`,
    });
    setTilt({ rx: -ny * 6, ry: nx * 6, mx: (x / rect.width) * 100, my: (y / rect.height) * 100 });
  };

  const handleLeave = () => {
    setStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)' });
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
    onHoverChange?.(false);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="pointer"
      style={style}
      className={`group relative isolate col-span-1 row-span-1 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#16161c] p-5 text-left text-[#f5f5f7] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_20px_60px_-20px_rgba(0,240,255,0.45)] ${className}`}
    >
      {/* cover background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90 transition duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `url(${project.cover.src})`,
          backgroundSize: 'cover',
          backgroundPosition: `${tilt.mx}% ${tilt.my}%`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-black/30 via-black/50 to-black/80" />
      <div
        className="pointer-events-none absolute -inset-px -z-10 opacity-0 transition group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${tilt.mx}% ${tilt.my}%, rgba(0,240,255,0.15), transparent 40%)`,
        }}
      />

      <div className="flex items-start justify-between">
        <span className="font-mono text-xs tracking-widest text-cyan/80">{project.index}</span>
        <StatusBadge status={project.status} />
      </div>

      <div>
        <h3 className="font-display text-2xl font-semibold leading-tight text-[#f5f5f7] md:text-3xl">{project.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-white/55">{project.subtitle}</p>
        <p className="mt-3 line-clamp-2 text-sm text-white/80">{project.summary}</p>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span
              key={s.name}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/80"
            >
              {s.name}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/55">{project.year}</span>
      </div>
    </button>
  );
}