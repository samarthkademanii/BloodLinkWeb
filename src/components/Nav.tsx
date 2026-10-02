import { useThemeToggle } from '../theme/ThemeContext';

export type Page = 'dashboard' | 'find' | 'donate' | 'hospitals' | 'alerts';

const TABS: { id: Page; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'find', label: 'Find Blood' },
  { id: 'donate', label: 'Donate' },
  { id: 'hospitals', label: 'Hospitals' },
  { id: 'alerts', label: 'Alerts' },
];

export function Nav({ page, setPage, alertCount }: { page: Page; setPage: (p: Page) => void; alertCount: number }) {
  const { theme, toggle } = useThemeToggle();
  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => setPage('dashboard')}>
        <div className="nav-logo-drop" />
        <span className="wordmark">BloodLink</span>
      </button>
      <div className="nav-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`nav-tab${page === t.id ? ' active' : ''}`}
            onClick={() => setPage(t.id)}
            role="tab"
          >
            {t.label}
            {t.id === 'alerts' && alertCount > 0 && (
              <span
                style={{
                  background: 'var(--danger)',
                  color: '#fff',
                  fontSize: 10,
                  padding: '1px 5px',
                  borderRadius: 8,
                  marginLeft: 3,
                }}
              >
                {alertCount}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" title="Toggle theme">
          {theme === 'dark' ? '☾' : '☀'}
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => setPage('donate')}>
          + Donate
        </button>
      </div>
    </nav>
  );
}
