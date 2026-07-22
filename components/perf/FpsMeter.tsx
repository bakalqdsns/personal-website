'use client';

import { useEffect, useRef, useState } from 'react';

export default function FpsMeter() {
  const [fps, setFps] = useState(0);
  const [mem, setMem] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const frames = useRef<number[]>([]);

  useEffect(() => {
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const delta = now - last;
      last = now;
      frames.current.push(delta);
      if (frames.current.length > 30) frames.current.shift();
      const avg = frames.current.reduce((a, b) => a + b, 0) / frames.current.length;
      const value = avg > 0 ? Math.round(1000 / avg) : 0;
      setFps(value);

      const perf = performance as unknown as { memory?: { usedJSHeapSize: number } };
      if (perf.memory) {
        setMem(Math.round(perf.memory.usedJSHeapSize / 1024 / 1024));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed left-4 top-12 z-[80] select-none font-mono text-[10px] uppercase tracking-widest text-white/30"
      aria-hidden
    >
      <div className="flex items-center gap-2">
        <span className={fps > 50 ? 'text-cyan/70' : fps > 30 ? 'text-amber/70' : 'text-red-400/70'}>
          ● {fps}fps
        </span>
        {mem !== null && <span className="text-white/20">· {mem}MB</span>}
      </div>
    </div>
  );
}