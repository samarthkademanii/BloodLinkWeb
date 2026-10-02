import { usePoll } from '../data/usePoll';
import { bloodTypes, levelColor, levelStatus, timeAgo, type BloodRequest, type Donor, type Hospital, type Inventory } from '../data/types';
import { donors as mockDonors, hospitals as mockHospitals, initialInventory, requests as mockRequests } from '../data/mockData';
import { LiveDot, SectionHeader, StatCard } from '../components/ui';
import { HospitalMap } from '../components/HospitalMap';
import type { Page } from '../components/Nav';

export function Dashboard({ setPage }: { setPage: (p: Page) => void }) {
  const { data: inventory, connected } = usePoll<Inventory>('/inventory', initialInventory);
  const { data: donors } = usePoll<Donor[]>('/donors', mockDonors);
  const { data: requests } = usePoll<BloodRequest[]>('/requests', mockRequests);
  const { data: hospitals } = usePoll<Hospital[]>('/hospitals', mockHospitals);

  const totalUnits = bloodTypes.reduce((sum, t) => sum + inventory[t].units, 0);

  return (
    <div>
      <div className="stat-strip">
        <StatCard label="Units Available" value={totalUnits.toLocaleString()} valueClass="accent" delta="↑ 34 since yesterday" deltaClass="up" />
        <StatCard label="Registered Donors" value="8,412" delta="↑ 12 this week" deltaClass="up" />
        <StatCard label="Active Requests" value={String(requests.length)} delta="↑ 8 since yesterday" deltaClass="down" />
        <StatCard label="Lives Saved (YTD)" value="3,891" valueClass="success" delta="↑ 23 this month" deltaClass="up" />
      </div>

      <SectionHeader title="Blood Inventory" sub="All types · Pan-India network" right={<LiveDot connected={connected} />} />
      <div className="inventory-grid">
        {bloodTypes.map((t) => {
          const entry = inventory[t];
          const pct = entry.units / entry.max;
          const color = levelColor(pct, { danger: 'var(--danger)', warning: 'var(--warning)', success: 'var(--success)' });
          const status = levelStatus(pct);
          const statusBg = status.key === 'critical' ? 'var(--danger-soft)' : status.key === 'low' ? 'var(--warning-soft)' : 'var(--success-soft)';
          return (
            <div
              key={t}
              className="blood-card"
              style={{ '--level-color': color, '--status-bg': statusBg, '--status-fg': color } as React.CSSProperties}
            >
              <div className="blood-type-label">{t}</div>
              <div className="blood-units">{entry.units}</div>
              <div className="blood-units-label">units</div>
              <div className="blood-status">{status.label}</div>
              <div className="blood-bar-bg">
                <div className="blood-bar-fill" style={{ width: `${Math.min(100, Math.round(pct * 100))}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Active Requests</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setPage('find')}>
              View all →
            </button>
          </div>
          <div className="panel-body">
            {requests.map((r, i) => (
              <div className="request-row" key={`${r.patient}-${i}`}>
                <div className="blood-badge">
                  <span>{r.type}</span>
                </div>
                <div className="request-info">
                  <div className="request-patient">{r.patient}</div>
                  <div className="request-detail">
                    {r.hospital} · {r.units} unit{r.units > 1 ? 's' : ''} · {timeAgo(r.createdAt)}
                  </div>
                </div>
                <span className={`urgency-chip urgency-${r.urgency}`}>{r.urgency}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Available Donors Nearby</span>
            <button className="btn btn-ghost btn-sm">Filter</button>
          </div>
          <div className="panel-body">
            {donors.map((d, i) => {
              const initials = d.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
              const dotClass = d.available ? 'available' : d.daysSinceDonation > 50 ? 'cooldown' : 'unavailable';
              const lastDon = d.daysSinceDonation === 0 ? 'Donated today' : `Last donated ${d.daysSinceDonation}d ago`;
              return (
                <div className="donor-row" key={`${d.name}-${i}`}>
                  <div className="donor-avatar">{initials}</div>
                  <div className="donor-info">
                    <div className="donor-name">{d.name}</div>
                    <div className="donor-meta">
                      {d.city} · {lastDon}
                    </div>
                  </div>
                  <div className="donor-type">{d.type}</div>
                  <div className={`status-dot ${dotClass}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <HospitalMap hospitals={hospitals} />
    </div>
  );
}
