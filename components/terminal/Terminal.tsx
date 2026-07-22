'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTerminalStore } from '@/lib/terminalStore';
import { findCommand } from '@/lib/terminalCommands';

interface Line {
  kind: 'input' | 'output' | 'system';
  text: string;
}

const BANNER: Line[] = [
  { kind: 'system', text: '┌─────────────────────────────────────────────┐' },
  { kind: 'system', text: '│  SHOWROOM OS v0.1.0  ·  type "help" to start  │' },
  { kind: 'system', text: '└─────────────────────────────────────────────┘' },
];

const PROMPT = 'guest@showroom ~ $ ';

export default function Terminal() {
  const { open, setOpen, toggle } = useTerminalStore();
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Open / close on global t key handled by useKeyboardShortcuts.
  // We also support click on the floating toggle button.
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, open]);

  const pushLines = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const inputLine: Line = { kind: 'input', text: `${PROMPT}${raw}` };
      if (!trimmed) {
        setLines((p) => [...p, inputLine]);
        return;
      }
      const [name, ...args] = trimmed.split(/\s+/);
      const cmd = findCommand(name.toLowerCase());
      if (!cmd) {
        setLines((p) => [...p, inputLine, { kind: 'output', text: `command not found: ${name}. try "help".` }]);
        setHistory((h) => [...h, trimmed]);
        return;
      }
      const result = cmd.run(args);
      // Handle clear
      const hasClear = result.some((r) => r.text === '__CLEAR__');
      if (hasClear) {
        setLines(BANNER);
        return;
      }
      // type out
      setLines((p) => [...p, inputLine]);
      result.forEach((r, i) => {
        const delay = (r.delay ?? 30) * i + (r.delay ?? 30);
        setTimeout(() => {
          setLines((p) => [...p, { kind: 'output', text: r.text }]);
        }, delay);
      });
      setHistory((h) => [...h, trimmed]);
    },
    [],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input);
      setInput('');
      setHistIdx(null);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === null) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(null);
        setInput('');
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines(BANNER);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Toggle button (fixed, bottom-left) */}
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? '关闭终端' : '打开终端'}
        title="终端 (T)"
        data-cursor="pointer"
        className="fixed bottom-6 left-6 z-[70] grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-black/55 font-mono text-xs text-cyan backdrop-blur-md transition hover:border-cyan/60 hover:text-fg"
      >
        &gt;_
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className="fixed bottom-24 left-6 z-[75] flex h-[320px] w-[min(92vw,480px)] flex-col overflow-hidden rounded-2xl border border-cyan/30 bg-black/80 font-mono text-[12.5px] text-fg shadow-[0_20px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(0,240,255,0.18)] backdrop-blur-md"
            role="dialog"
            aria-label="终端"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-muted">showroom · /bin/tty</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-muted hover:text-fg"
                aria-label="关闭"
              >
                ✕
              </button>
            </div>

            <div
              ref={scrollRef}
              className="no-scrollbar flex-1 overflow-y-auto px-4 py-3"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.kind === 'input'
                      ? 'text-cyan'
                      : l.kind === 'system'
                        ? 'text-violet'
                        : 'text-fg/85'
                  }
                >
                  {l.text || '\u00A0'}
                </div>
              ))}
              <div className="flex items-center gap-1">
                <span className="text-cyan">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  className="flex-1 bg-transparent text-fg outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}