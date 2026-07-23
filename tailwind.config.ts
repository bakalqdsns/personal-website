import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        cyan: 'var(--cyan)',
        violet: 'var(--violet)',
        amber: 'var(--amber)',
        line: 'var(--line)',
        card: 'var(--card)',
        'status-ok': 'var(--status-ok)',
        'status-warn': 'var(--status-warn)',
        'status-pending': 'var(--status-pending)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(251,191,36,0.6)' },
          '50%': { boxShadow: '0 0 0 10px rgba(251,191,36,0)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        cursorBlink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        pulseRing: 'pulseRing 2.4s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        cursorBlink: 'cursorBlink 1s steps(1) infinite',
        floatY: 'floatY 5s ease-in-out infinite',
        scan: 'scan 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;