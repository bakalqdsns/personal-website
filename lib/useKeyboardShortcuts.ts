'use client';

import { useEffect } from 'react';
import { useModalStore } from '@/lib/modalStore';
import { useTerminalStore } from '@/lib/terminalStore';

const SECTIONS = ['hero', 'projects', 'radar', 'pipeline', 'about'] as const;

/**
 * Global keyboard shortcuts:
 *   g - jump to Projects
 *   a - jump to About
 *   h - jump to Hero
 *   r - jump to Radar (stack)
 *   p - jump to Pipeline
 *   t - toggle Terminal
 *   Escape - close current modal / terminal
 *
 * Ignored when focus is inside an input/textarea/contenteditable.
 */
export default function useKeyboardShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();
      const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 40;
        window.scrollTo({ top: y, behavior: 'smooth' });
      };

      const modal = useModalStore.getState();
      const term = useTerminalStore.getState();

      switch (key) {
        case 'g':
          scrollTo('projects');
          break;
        case 'a':
          scrollTo('about');
          break;
        case 'h':
          scrollTo('hero');
          break;
        case 'r':
          scrollTo('radar');
          break;
        case 'p':
          scrollTo('pipeline');
          break;
        case 't':
          term.setOpen(!term.open);
          break;
        case 'arrowleft':
          if (modal.open) {
            e.preventDefault();
            modal.prev();
          }
          break;
        case 'arrowright':
          if (modal.open) {
            e.preventDefault();
            modal.next();
          }
          break;
        case 'escape':
          if (modal.open) modal.close();
          else if (term.open) term.setOpen(false);
          break;
        default:
          return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

export { SECTIONS };