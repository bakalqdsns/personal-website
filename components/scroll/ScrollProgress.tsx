'use client';

import { useEffect, useState, useCallback } from 'react';

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'projects', label: 'Projects' },
  { id: 'radar', label: 'Stack' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'about', label: 'About' },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(ratio);

      // Find current section
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <div className="scroll-progress__track">
        <div className="scroll-progress__fill" style={{ height: `${progress * 100}%` }} />
      </div>
      <div className="scroll-progress__dots">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className="scroll-progress__dot"
            data-active={active === s.id}
            aria-label={`跳转到 ${s.label}`}
            data-cursor="pointer"
            onClick={() => jumpTo(s.id)}
            title={s.label}
          />
        ))}
      </div>
    </div>
  );
}