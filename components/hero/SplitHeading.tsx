'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function SplitHeading({ text, className = '', delay = 0, stagger = 0.04 }: SplitHeadingProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLSpanElement>('[data-char]');
    if (chars.length === 0) return;

    gsap.fromTo(
      chars,
      { y: '110%', opacity: 0, rotateX: -60 },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger,
        delay,
      },
    );
  }, [text, delay, stagger]);

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          data-char
          className="inline-block"
          style={{ willChange: 'transform' }}
        >
          <span className="inline-block">{ch === ' ' ? '\u00A0' : ch}</span>
        </span>
      ))}
    </span>
  );
}