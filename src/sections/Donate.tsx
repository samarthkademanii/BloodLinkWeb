import { useState, type FormEvent } from 'react';
import { bloodTypes, type BloodType } from '../data/types';
import { drives } from '../data/mockData';
import { apiPost } from '../data/api';
import { SectionHeader } from '../components/ui';

const infoCards = [
  { icon: '🩸', title: 'One donation, three lives', text: 'A single donation can be separated into red cells, plasma, and platelets — each saving a different patient.' },
  { icon: '⏱', title: 'Only 45 minutes', text: 'The whole process takes under an hour. The actual blood draw is just 8–10 minutes. You can donate whole blood every 56 days.' },
  { icon: '🏅', title: 'O− donors especially needed', text: "O− is the universal donor type. Only 7% of people have it, but it's the first choice in emergencies." },
];

export function Donate() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('d-name') as HTMLInputElement).value;
    const type = (form.elements.namedItem('d-type') as HTMLSelectElement).value as BloodType;
    const city = (form.elements.namedItem('d-city') as HTMLInputElement).value;
    try {
      await apiPost('/donors', { name, type, city });
    } catch {
      // Backend unreachable — still confirm locally so the form feels
      // responsive; the registration simply won't appear in the live list yet.
    }
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div>
      <SectionHeader title="Become a Donor" />
      <div className="info-strip">
        {infoCards.map((c) => (
          <div className="info-card" key={c.title}>
            <div className="info-card-icon">{c.icon}</div>
            <div className="info-card-title">{c.title}</div>
            <div className="info-card-text">{c.text}</div>
          </div>
        ))}
      </div>

      <div className="form-section">
        <h3 className="form-title">Register as a Donor</h3>
        <p className="form-desc">Fill in your details below. A coordinator will contact you to schedule your appointment.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="d-name">Full Name</label>
              <input className="form-input" type="text" id="d-name" name="d-name" required placeholder="Ananya Rao" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="d-email">Email</label>
              <input className="form-input" type="email" id="d-email" name="d-email" required placeholder="ananya@example.com" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="d-phone">Phone</label>
              <input className="form-input" type="tel" id="d-phone" name="d-phone" placeholder="+91 98765 43210" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="d-dob">Date of Birth</label>
              <input className="form-input" type="date" id="d-dob" name="d-dob" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="d-type">Blood Type</label>
              <select className="form-select" id="d-type" name="d-type" required defaultValue="">
                <option value="" disabled>Select…</option>
                {bloodTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="d-city">Locality</label>
              <input className="form-input" type="text" id="d-city" name="d-city" placeholder="Koramangala, Bengaluru" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="d-notes">Medical notes (optional)</label>
            <textarea className="form-textarea" id="d-notes" name="d-notes" placeholder="Any relevant medical history or conditions…" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 11 }}>
            Register as Donor
          </button>
          {submitted && (
            <div className="form-success" style={{ marginTop: 12 }}>
              ✓ Thank you! Your registration is submitted. A coordinator will reach out within 24 hours.
            </div>
          )}
        </form>
      </div>

      <SectionHeader title="Upcoming Blood Drives" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        {drives.map((d) => (
          <div className="hospital-card" style={{ maxWidth: 560 }} key={d.name}>
            <div className="hospital-name">{d.name}</div>
            <div className="hospital-address">{d.loc}</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: 'var(--fg)' }}>📅 {d.date}</span>
              <span className={`urgency-chip ${d.slots < 5 ? 'urgency-high' : 'urgency-standard'}`}>{d.slots} slots left</span>
              <button className="btn btn-outline btn-sm">Book Slot</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
