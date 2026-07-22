'use client';

import { useEffect, useState } from 'react';

export function usePointer() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pos;
}

export function useHoverableCursor() {
  useEffect(() => {
    const ring = document.querySelector<HTMLElement>('.cursor-ring');
    if (!ring) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    const enter = () => ring.setAttribute('data-state', 'hover');
    const leave = () => ring.removeAttribute('data-state');

    const targets = document.querySelectorAll(
      'a, button, [role="button"], [data-cursor="pointer"], input, textarea, label'
    );

    targets.forEach((el) => {
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointerleave', leave);
    });

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll('a, button, [role="button"], [data-cursor="pointer"]')
        .forEach((el) => {
          el.removeEventListener('pointerenter', enter);
          el.removeEventListener('pointerleave', leave);
          el.addEventListener('pointerenter', enter);
          el.addEventListener('pointerleave', leave);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener('pointerenter', enter);
        el.removeEventListener('pointerleave', leave);
      });
      observer.disconnect();
    };
  }, []);
}