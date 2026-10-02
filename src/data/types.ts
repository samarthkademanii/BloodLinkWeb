export type BloodType = 'O−' | 'O+' | 'A−' | 'A+' | 'B−' | 'B+' | 'AB−' | 'AB+';

export const bloodTypes: BloodType[] = ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'];

export const compatibility: Record<BloodType, BloodType[]> = {
  'O−': ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A−': ['A−', 'A+', 'AB−', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B−': ['B−', 'B+', 'AB−', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB−': ['AB−', 'AB+'],
  'AB+': ['AB+'],
};

export interface InventoryEntry {
  units: number;
  max: number;
}
export type Inventory = Record<BloodType, InventoryEntry>;

export type StockLevel = 'critical' | 'low' | 'ok';

export interface Hospital {
  name: string;
  address: string;
  phone: string;
  needs: Partial<Record<BloodType, StockLevel>>;
}

export interface Donor {
  name: string;
  type: BloodType;
  city: string;
  daysSinceDonation: number;
  available: boolean;
}

export type Urgency = 'critical' | 'high' | 'standard';

export interface BloodRequest {
  patient: string;
  type: BloodType;
  hospital: string;
  urgency: Urgency;
  units: number;
  createdAt: string;
}

export type AlertLevel = 'critical' | 'warning' | 'info';

export interface Alert {
  level: AlertLevel;
  icon: string;
  title: string;
  text: string;
  createdAt: string;
  hospital: string | null;
}

export interface Drive {
  name: string;
  loc: string;
  date: string;
  slots: number;
}

export function timeAgo(iso: string): string {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

export function levelColor(pct: number, theme: { danger: string; warning: string; success: string }) {
  if (pct < 0.12) return theme.danger;
  if (pct < 0.35) return theme.warning;
  return theme.success;
}

export function levelStatus(pct: number): { label: string; key: StockLevel | 'ok' } {
  if (pct < 0.12) return { label: 'CRITICAL', key: 'critical' };
  if (pct < 0.35) return { label: 'LOW', key: 'low' };
  return { label: pct < 0.7 ? 'ADEQUATE' : 'SURPLUS', key: 'ok' };
}

export function distanceKm([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
