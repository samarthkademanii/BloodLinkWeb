import { useMemo, useState } from 'react';
import { usePoll } from '../data/usePoll';
import { bloodTypes, compatibility, levelColor, type BloodType, type Hospital, type Inventory } from '../data/types';
import { hospitals as mockHospitals, initialInventory } from '../data/mockData';
import { SectionHeader } from '../components/ui';

export function FindBlood() {
  const { data: inventory } = usePoll<Inventory>('/inventory', initialInventory);
  const { data: hospitals } = usePoll<Hospital[]>('/hospitals', mockHospitals);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<BloodType | 'all'>('all');

  const results = useMemo(() => {
    const rows: { type: BloodType; hospital: string; address: string; units: number; pct: number }[] = [];
    hospitals.forEach((h) => {
      (Object.entries(h.needs) as [BloodType, string][]).forEach(([type]) => {
        if (filter !== 'all' && filter !== type) return;
        const q = query.toLowerCase();
        if (q && !h.name.toLowerCase().includes(q) && !h.address.toLowerCase().includes(q)) return;
        const inv = inventory[type];
        const pct = inv ? inv.units / inv.max : 0;
        rows.push({ type, hospital: h.name, address: h.address, units: inv?.units ?? 0, pct });
      });
    });
    rows.sort((a, b) => a.pct - b.pct);
    return rows;
  }, [hospitals, inventory, query, filter]);

  return (
    <div>
      <SectionHeader title="Find Blood" />
      <div className="search-bar">
        <div className="search-input-wrap">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Hospital name or location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {(['all', ...bloodTypes] as (BloodType | 'all')[]).map((t) => (
          <button
            key={t}
            className={`filter-chip${filter === t ? ' active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t === 'all' ? 'All Types' : t}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          No results found
        </div>
      ) : (
        <div className="find-results">
          {results.map((r, i) => {
            const color = levelColor(r.pct, { danger: 'var(--danger)', warning: 'var(--warning)', success: 'var(--success)' });
            return (
              <div className="find-card" key={`${r.hospital}-${r.type}-${i}`}>
                <div className="find-card-top">
                  <div className="find-card-type" style={{ color }}>
                    {r.type}
                  </div>
                  <div className="find-card-units">
                    <span style={{ fontSize: 18, fontWeight: 500, color, fontVariantNumeric: 'tabular-nums' }}>{r.units}</span>
                    <br />
                    units
                  </div>
                </div>
                <div className="find-card-hospital">{r.hospital}</div>
                <div className="find-card-dist">{r.address}</div>
                <button className="btn btn-outline btn-sm" style={{ marginTop: 4 }}>
                  Contact Blood Bank
                </button>
              </div>
            );
          })}
        </div>
      )}

      <SectionHeader title="Blood Type Compatibility" />
      <div className="compat-table overflow-x">
        <table>
          <thead>
            <tr>
              <th>Donor Type</th>
              {bloodTypes.map((t) => (
                <th key={t}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloodTypes.map((donor) => (
              <tr key={donor}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent)' }}>{donor}</td>
                {bloodTypes.map((recv) => (
                  <td key={recv}>
                    {compatibility[donor].includes(recv) ? (
                      <span className="compat-yes">✓</span>
                    ) : (
                      <span className="compat-no">–</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
