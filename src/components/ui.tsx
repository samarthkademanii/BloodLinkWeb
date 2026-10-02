import type { ReactNode } from 'react';

export function LiveDot({ connected }: { connected: boolean }) {
  return <span className={`live-dot${connected ? '' : ' offline'}`}>{connected ? 'Live' : 'Offline · demo data'}</span>;
}

export function SectionHeader({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="section-header">
      <h2 className="section-title">
        {title} {sub ? <span className="section-sub">{sub}</span> : null}
      </h2>
      {right}
    </div>
  );
}

export function StatCard({
  label,
  value,
  valueClass,
  delta,
  deltaClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
  delta?: string;
  deltaClass?: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className={`stat-value${valueClass ? ` ${valueClass}` : ''}`}>{value}</div>
      {delta ? <div className={`stat-delta${deltaClass ? ` ${deltaClass}` : ''}`}>{delta}</div> : null}
    </div>
  );
}

export function Badge({ className, children }: { className: string; children: ReactNode }) {
  return <span className={className}>{children}</span>;
}
