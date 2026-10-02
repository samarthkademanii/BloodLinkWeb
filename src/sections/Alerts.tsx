import { usePoll } from '../data/usePoll';
import { timeAgo, type Alert } from '../data/types';
import { alerts as mockAlerts } from '../data/mockData';
import { LiveDot, SectionHeader } from '../components/ui';

export function Alerts() {
  const { data: alerts, connected } = usePoll<Alert[]>('/alerts', mockAlerts);

  return (
    <div>
      <SectionHeader title="Emergency Alerts" right={<LiveDot connected={connected} />} />
      <div>
        {alerts.map((a, i) => (
          <div className={`alert-card ${a.level}`} key={`${a.title}-${i}`}>
            <div className={`alert-icon ${a.level}`}>{a.icon}</div>
            <div className="alert-body">
              <div className="alert-title">{a.title}</div>
              <div className="alert-text">{a.text}</div>
              <div className="alert-meta">
                {timeAgo(a.createdAt)}
                {a.hospital ? ` · ${a.hospital}` : ''}
              </div>
              <div className="alert-actions">
                {a.level === 'critical' && <button className="btn btn-danger btn-sm">Respond Now</button>}
                <button className="btn btn-outline btn-sm">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
