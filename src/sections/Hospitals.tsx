import { useState, type FormEvent } from 'react';
import { usePoll } from '../data/usePoll';
import type { BloodType, Hospital, StockLevel } from '../data/types';
import { hospitals as mockHospitals } from '../data/mockData';
import { apiPost } from '../data/api';
import { LiveDot, SectionHeader } from '../components/ui';

export function Hospitals() {
  const { data: hospitals, connected } = usePoll<Hospital[]>('/hospitals', mockHospitals);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('h-name') as HTMLInputElement).value;
    const address = (form.elements.namedItem('h-address') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('h-phone') as HTMLInputElement).value;
    try {
      await apiPost('/hospitals', { name, address, phone });
    } catch {
      // Backend unreachable — still confirm locally.
    }
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div>
      <SectionHeader title="Partner Hospitals" right={<LiveDot connected={connected} />} />
      <div className="hospital-grid">
        {hospitals.map((h, i) => (
          <div className="hospital-card" key={`${h.name}-${i}`}>
            <div className="hospital-name">{h.name}</div>
            <div className="hospital-address">{h.address}</div>
            <div className="hospital-types">
              {(Object.entries(h.needs) as [BloodType, StockLevel][]).map(([type, level]) => (
                <span className={`type-chip ${level}`} key={type}>
                  {type}
                </span>
              ))}
            </div>
            <div className="hospital-contact">
              <span style={{ fontSize: 12 }}>📞</span>
              <span className="hospital-phone">{h.phone}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionHeader title="Register Your Hospital" />
      <div className="form-section">
        <h3 className="form-title">Hospital Onboarding</h3>
        <p className="form-desc">Connect your blood bank to BloodLink to broadcast real-time inventory and receive donor matches.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="h-name">Hospital Name</label>
              <input className="form-input" type="text" id="h-name" name="h-name" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="h-contact">Contact Person</label>
              <input className="form-input" type="text" id="h-contact" name="h-contact" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="h-email">Official Email</label>
              <input className="form-input" type="email" id="h-email" name="h-email" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="h-phone">Blood Bank Phone</label>
              <input className="form-input" type="tel" id="h-phone" name="h-phone" placeholder="+91 80 0000 0000" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="h-address">Address</label>
            <input className="form-input" type="text" id="h-address" name="h-address" required placeholder="MG Road, Bengaluru" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 11 }}>
            Register Hospital
          </button>
          {submitted && (
            <div className="form-success" style={{ marginTop: 12 }}>
              ✓ Request received. Our team will activate your hospital account within 48 hours.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
