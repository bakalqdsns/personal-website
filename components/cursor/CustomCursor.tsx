'use client';

import { useEffect, useRef } from 'react';

/**
 * Two-layer custom cursor:
 *   - ring: 48px hollow circle, follows with eased lerp (~0.18)
 *   - dot:  6px  solid dot, follows precisely
 *
 * Hover detection runs on every `pointermove` (not `pointerover`) to avoid
 * the boundary-bug where moving directly between adjacent interactive
 * elements skips a fire. The `data-state` attribute is written through a
 * ref instead of React state so we don't re-render the page on every move.
 *
 * Hidden on coarse pointers (touch devices).
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    // ── hover detection ────────────────────────────────────────────────
    // Walk up from event.target. `closest` covers portals too, because the
    // event still bubbles from the real element (not the portal host).
    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      const hit = el.closest(
        'a[href], button, [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="menuitem"], [data-cursor="pointer"], [tabindex]:not([tabindex="-1"])',
      );
      if (!hit) return false;
      // Exclude non-clickable interactive-looking elements:
      //   - native form controls (we want the I-beam cursor there)
      //   - explicitly disabled buttons / links / aria-disabled
      const tag = hit.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return false;
      if ((hit as HTMLElement).isContentEditable) return false;
      if ((hit as HTMLButtonElement).disabled) return false;
      if (hit.hasAttribute('disabled')) return false;
      if (hit.getAttribute('aria-disabled') === 'true') return false;
      // Links with no href / javascript: void should also be ignored.
      if (tag === 'A') {
        const href = (hit as HTMLAnchorElement).getAttribute('href');
        if (!href || href.trim() === '' || href.trim().startsWith('javascript:')) return false;
      }
      return true;
    };

    const setHover = (on: boolean) => {
      const ring = ringRef.current;
      if (!ring) return;
      const next = on ? 'hover' : 'idle';
      if (ring.dataset.state !== next) ring.dataset.state = next;
    };

    // `pointermove` fires for every pixel — guaranteed to update state.
    // Cheap because we only toggle the attribute when it actually changes.
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
      setHover(isInteractive(e.target as Element));
    };

    // Reset when pointer leaves the document entirely (alt-tab, leave window).
    const onLeave = (e: PointerEvent) => {
      if (e.relatedTarget === null) setHover(false);
    };
    const onBlur = () => setHover(false);

    // `pointerover` is kept as a backup because in some browsers
    // `pointermove` won't fire while the cursor is stationary (e.g.
    // accessibility hover on a static page). It just makes the ring
    // snap to the correct state without dragging the dot.
    const onOver = (e: Event) => {
      setHover(isInteractive(e.target as Element));
    };

    // ── ring lerp loop ─────────────────────────────────────────────────
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x - 24}px, ${current.current.y - 24}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onLeave, { passive: true });
    window.addEventListener('blur', onBlur);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onLeave);
      window.removeEventListener('blur', onBlur);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-state="idle" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
