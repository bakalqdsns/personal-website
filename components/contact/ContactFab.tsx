'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ContactChannel {
  id: string;
  label: string;
  value: string;
  displayValue: string;
  href?: string;
  hint: string;
}

const CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    label: 'Email',
    value: '3489241152@qq.com',
    displayValue: '3489241152@qq.com',
    href: 'mailto:3489241152@qq.com',
    hint: '最快回复 · 1h 内',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'bakalqdsns',
    displayValue: 'github.com/bakalqdsns',
    href: 'https://github.com/bakalqdsns',
    hint: '看代码 · 提 Issue',
  },
  {
    id: 'wechat',
    label: 'WeChat',
    value: '琉琦ruki',
    displayValue: 'rukisama1469',
    hint: '添加请备注来源',
  },
  {
    id: 'qq',
    label: 'QQ',
    value: '3489241152',
    displayValue: '3489241152',
    hint: '工作日白天在线',
  },
];

function CopyIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function CheckIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

function CloseIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ChatIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function ContactFab() {
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const handleCopy = async (channel: ContactChannel) => {
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopiedId(channel.id);
      setTimeout(() => setCopiedId((cur) => (cur === channel.id ? null : cur)), 1600);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = channel.value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopiedId(channel.id);
        setTimeout(() => setCopiedId((cur) => (cur === channel.id ? null : cur)), 1600);
      } catch {
        // no-op
      }
      document.body.removeChild(ta);
    }
  };

  if (!mounted) return null;

  const fab = (
    <>
      {/* ============== Floating Trigger ==============
          Design goals:
          - High contrast on ANY background (white card grids, dark hero, gradients).
          - Solids + 1px ring + cyan glow + backdrop-blur; never relies on alpha alone.
      */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="pointer"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 220, damping: 22 }}
        style={{
          position: 'fixed',
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          right: '1.5rem',
          transform: 'translateZ(0)',
          isolation: 'isolate',
          willChange: 'transform',
          background: 'var(--bg)',
          boxShadow:
            '0 8px 28px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.04), 0 0 22px rgba(0, 240, 255, 0.28)',
        }}
        className="group z-50 flex items-center gap-2.5 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--fg)] backdrop-blur-md transition hover:-translate-y-0.5"
        aria-label="打开联系方式面板"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-amber/15 text-amber transition group-hover:bg-amber group-hover:text-[var(--bg)]">
          <ChatIcon className="h-3.5 w-3.5" />
        </span>
        <span className="font-medium">联系我</span>
        <span aria-hidden className="text-cyan transition group-hover:translate-x-0.5">→</span>
      </motion.button>

      {/* ============== Overlay + Panel ============== */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="contact-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              transform: 'translateZ(0)',
              isolation: 'isolate',
              willChange: 'opacity',
              background: 'color-mix(in srgb, var(--bg) 60%, transparent)',
              backdropFilter: 'blur(6px) saturate(120%)',
              WebkitBackdropFilter: 'blur(6px) saturate(120%)',
            }}
            className="z-40 flex items-end justify-end p-4 sm:p-10"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="联系方式"
          >
            <motion.div
              key="contact-panel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                marginBottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))',
                transform: 'translateZ(0)',
                willChange: 'transform, opacity',
                background: 'var(--card)',
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px var(--line), 0 0 0 4px color-mix(in srgb, var(--cyan) 12%, transparent), 0 0 60px color-mix(in srgb, var(--cyan) 18%, transparent)',
              }}
              className="relative w-full max-w-md origin-bottom-right overflow-hidden rounded-3xl"
            >
              {/* Accent gradient strip on top edge */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, var(--cyan), var(--violet), var(--amber))' }}
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-5">
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan">
                    006 · CONTACT
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">开个口子聊一下</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">挑个顺手的渠道,通常看到就会回复。</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  data-cursor="pointer"
                  style={{ background: 'var(--bg)' }}
                  className="shrink-0 rounded-full border border-[var(--line)] p-2 text-[var(--muted)] transition hover:border-cyan hover:text-cyan hover:shadow-[0_0_18px_rgba(0,240,255,0.35)]"
                  aria-label="关闭"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Channels */}
              <ul className="space-y-2 px-6 pb-2">
                {CHANNELS.map((c) => (
                  <li
                    key={c.id}
                    style={{ background: 'var(--bg)' }}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] px-4 py-3 transition hover:border-cyan hover:shadow-[0_0_22px_rgba(0,240,255,0.18)]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                          {c.label}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                          · {c.hint}
                        </span>
                      </div>
                      <div className="mt-0.5 truncate font-mono text-sm font-medium text-[var(--fg)]">
                        {c.displayValue}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {c.href && (
                        <a
                          href={c.href}
                          target={c.href.startsWith('http') ? '_blank' : undefined}
                          rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                          data-cursor="pointer"
                          className="rounded-lg border border-[var(--line)] bg-transparent px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--fg)] transition hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
                          aria-label={`打开 ${c.label}`}
                        >
                          Open
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopy(c)}
                        data-cursor="pointer"
                        aria-label={`复制 ${c.label}`}
                        title="复制"
                        className="rounded-lg border border-[var(--line)] p-1.5 text-[var(--fg)] transition hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {copiedId === c.id ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="inline-flex text-cyan"
                            >
                              <CheckIcon />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="inline-flex"
                            >
                              <CopyIcon />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTA strip */}
              <div className="mx-6 mt-4 mb-6 flex items-center gap-3 rounded-2xl border border-cyan/30 bg-cyan/[0.08] px-4 py-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan/15 text-cyan">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                    response time
                  </div>
                  <div className="text-xs text-[var(--fg)]">
                    工作日 1h 内 · 周末可能延后一些
                  </div>
                </div>
              </div>

              {/* Footer hint */}
              <div className="flex items-center gap-2 px-6 pb-5 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                <span className="h-px flex-1 bg-[var(--line)]" />
                <span>ESC / 点击外部关闭</span>
                <span className="h-px flex-1 bg-[var(--line)]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(fab, document.body);
}
