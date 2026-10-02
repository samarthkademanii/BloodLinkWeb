import { useState } from 'react';
import { usePoll } from './data/usePoll';
import type { Alert } from './data/types';
import { alerts as mockAlerts } from './data/mockData';
import { ThemeProvider } from './theme/ThemeContext';
import { Nav, type Page } from './components/Nav';
import { Ticker } from './components/Ticker';
import { Dashboard } from './sections/Dashboard';
import { FindBlood } from './sections/FindBlood';
import { Donate } from './sections/Donate';
import { Hospitals } from './sections/Hospitals';
import { Alerts } from './sections/Alerts';

function AppShell() {
  const [page, setPage] = useState<Page>('dashboard');
  const { data: alerts } = usePoll<Alert[]>('/alerts', mockAlerts);

  return (
    <>
      <Nav page={page} setPage={setPage} alertCount={alerts.filter((a) => a.level === 'critical').length} />
      <Ticker />
      <main className="main">
        {page === 'dashboard' && <Dashboard setPage={setPage} />}
        {page === 'find' && <FindBlood />}
        {page === 'donate' && <Donate />}
        {page === 'hospitals' && <Hospitals />}
        {page === 'alerts' && <Alerts />}
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
