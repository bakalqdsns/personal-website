import type { ProjectStatus } from '@/lib/projects';

const MAP: Record<ProjectStatus, { label: string; cls: string }> = {
  complete: { label: 'COMPLETE', cls: 'border-status-ok/40 bg-status-ok/10 text-status-ok' },
  'in-progress': { label: 'IN PROGRESS', cls: 'border-amber/40 bg-amber/10 text-amber' },
  planned: { label: 'PLANNED', cls: 'border-status-pending/40 bg-white/5 text-muted' },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const m = MAP[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${m.cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {m.label}
    </span>
  );
}