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
        <div className="flex items-center gap-2">
          {project.links.github || project.links.baiduPan ? (
            <span className="text-white/40">
              {project.links.github ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.7.5.5 5.6.5 11.9c0 5 3.3 9.3 7.8 10.8.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.5 5.6 18.3.5 12 .5z" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 3.2C16.6 2.5 15.4 2 14 2c-2.4 0-4.6.9-6.3 2.4C6.2 5.6 5 7.8 5 10.4c0 2.1 1.1 4 2.9 5.1L6.5 20l5-2.5c.9.4 1.9.6 3 .6 2.8 0 5.3-1.4 6.8-3.6 1.5-2.2 1.9-4.9 1.1-7.4-.3-.9-.9-1.7-1.8-2.3z"/>
                </svg>
              )}
            </span>
          ) : null}
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/55">{project.year}</span>
        </div>
      </div>
    </button>
  );
}