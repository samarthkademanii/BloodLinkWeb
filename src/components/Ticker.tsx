const LINES = [
  '🚨 Bengaluru City Hospital critically low on O− — 2 units remaining',
  '⚠️ Whitefield Multispeciality needs AB+ donors urgently — surgery queue backed up',
  '📢 Blood Drive: Cubbon Park, Saturday 9am–3pm',
  '🩸 Koramangala Emergency Care: B− supply at critical level — immediate donations needed',
];

export function Ticker() {
  return (
    <div className="alert-ticker" role="alert" aria-live="polite">
      <span className="alert-ticker-badge">Urgent</span>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div className="alert-ticker-scroll">
          {[...LINES, ...LINES].map((line, i) => (
            <span key={i}>{line} &nbsp;·&nbsp;</span>
          ))}
        </div>
      </div>
    </div>
  );
}
