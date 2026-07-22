'use client';

const ITEMS = [
  'Next.js 15',
  'TypeScript',
  'Three.js',
  'GSAP',
  'Unity · AR',
  'C#',
  'Tailwind',
  'Lenis',
  'WebGL',
  'AI · LLM',
  'React 19',
  'Framer Motion',
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      className="border-y border-line/60 bg-black/30 py-5 backdrop-blur-sm"
      style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)' }}
    >
      <div className="marquee font-mono text-sm uppercase tracking-[0.3em] text-muted">
        {loop.map((item, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 whitespace-nowrap">
            <span>{item}</span>
            <span aria-hidden className="text-cyan/60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}