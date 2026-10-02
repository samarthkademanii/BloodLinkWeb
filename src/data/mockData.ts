import type { Alert, BloodRequest, Donor, Drive, Hospital, Inventory } from './types';

// Offline fallback data, used only if the backend can't be reached, matching
// the backend's own seed data so the demo is consistent either way.
export const initialInventory: Inventory = {
  'O−': { units: 2, max: 120 },
  'O+': { units: 89, max: 200 },
  'A−': { units: 18, max: 100 },
  'A+': { units: 134, max: 200 },
  'B−': { units: 7, max: 80 },
  'B+': { units: 61, max: 160 },
  'AB−': { units: 14, max: 60 },
  'AB+': { units: 43, max: 120 },
};

export const donors: Donor[] = [
  { name: 'Ananya Rao', type: 'O−', city: 'Indiranagar, Bengaluru', daysSinceDonation: 0, available: true },
  { name: 'Arjun Mehta', type: 'A+', city: 'Jayanagar, Bengaluru', daysSinceDonation: 12, available: true },
  { name: 'Priya Nair', type: 'B+', city: 'Koramangala, Bengaluru', daysSinceDonation: 45, available: true },
  { name: 'Rohan Kulkarni', type: 'AB+', city: 'Whitefield, Bengaluru', daysSinceDonation: 55, available: false },
  { name: 'Sneha Reddy', type: 'O+', city: 'HSR Layout, Bengaluru', daysSinceDonation: 3, available: true },
  { name: 'Vikram Shetty', type: 'B−', city: 'Electronic City, Bengaluru', daysSinceDonation: 8, available: true },
  { name: 'Fatima Sheikh', type: 'A−', city: 'Andheri, Mumbai', daysSinceDonation: 30, available: false },
  { name: 'Karthik Iyer', type: 'O−', city: 'Connaught Place, Delhi', daysSinceDonation: 0, available: true },
  { name: 'Divya Krishnan', type: 'AB−', city: 'T Nagar, Chennai', daysSinceDonation: 5, available: true },
  { name: 'Sourav Banerjee', type: 'B−', city: 'Park Street, Kolkata', daysSinceDonation: 40, available: false },
  { name: 'Lakshmi Prasad', type: 'A+', city: 'Banjara Hills, Hyderabad', daysSinceDonation: 15, available: true },
  { name: 'Omkar Deshmukh', type: 'O+', city: 'Koregaon Park, Pune', daysSinceDonation: 2, available: true },
];

export const requests: BloodRequest[] = [
  { patient: 'Patient #8841', type: 'O−', hospital: 'Bengaluru City', urgency: 'critical', units: 2, createdAt: new Date(Date.now() - 8 * 60000).toISOString() },
  { patient: 'Patient #9204', type: 'AB+', hospital: 'Whitefield Multispeciality', urgency: 'critical', units: 4, createdAt: new Date(Date.now() - 22 * 60000).toISOString() },
  { patient: 'Patient #7719', type: 'B−', hospital: 'Koramangala ER', urgency: 'high', units: 1, createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
  { patient: 'Patient #8003', type: 'A+', hospital: "St. Mary's", urgency: 'standard', units: 3, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { patient: 'Patient #9910', type: 'O+', hospital: 'HSR Layout Medical', urgency: 'standard', units: 2, createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
  { patient: 'Patient #6652', type: 'AB−', hospital: 'Mumbai Central', urgency: 'critical', units: 2, createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
  { patient: 'Patient #5521', type: 'O+', hospital: 'Delhi NCR Medical', urgency: 'critical', units: 3, createdAt: new Date(Date.now() - 35 * 60000).toISOString() },
  { patient: 'Patient #4410', type: 'A+', hospital: 'Chennai General', urgency: 'high', units: 2, createdAt: new Date(Date.now() - 90 * 60000).toISOString() },
];

export const hospitals: Hospital[] = [
  { name: 'Bengaluru City Hospital', address: '45 MG Road, Bengaluru', phone: '+91 80 4012 3400', needs: { 'O−': 'critical', 'B−': 'critical', 'AB+': 'low', 'A+': 'ok', 'O+': 'ok' } },
  { name: 'Whitefield Multispeciality Hospital', address: '12 ITPL Main Road, Whitefield, Bengaluru', phone: '+91 80 4023 7800', needs: { 'AB+': 'critical', 'A−': 'low', 'B+': 'ok', 'O−': 'low' } },
  { name: 'Koramangala Emergency Care', address: '88 80 Feet Road, Koramangala, Bengaluru', phone: '+91 80 4034 1122', needs: { 'B−': 'critical', 'O−': 'low', 'A+': 'ok', 'AB−': 'low' } },
  { name: "St. Mary's Hospital", address: '45 Sarjapur Road, Jayanagar, Bengaluru', phone: '+91 80 4045 3300', needs: { 'O+': 'ok', 'A+': 'ok', 'B+': 'low', 'AB+': 'ok' } },
  { name: 'HSR Layout Medical Centre', address: '9 27th Main Road, HSR Layout, Bengaluru', phone: '+91 80 4056 9900', needs: { 'O−': 'critical', 'O+': 'low', 'A−': 'ok', 'AB−': 'ok' } },
  { name: 'Electronic City Community Hospital', address: '300 Hosa Road, Electronic City, Bengaluru', phone: '+91 80 4067 4455', needs: { 'A+': 'ok', 'B+': 'ok', 'O+': 'ok', 'AB+': 'low' } },
  { name: 'Mumbai Central Hospital', address: '14 Linking Road, Andheri, Mumbai', phone: '+91 22 4078 2200', needs: { 'O−': 'low', 'B+': 'ok', 'A+': 'ok', 'AB−': 'critical' } },
  { name: 'Delhi NCR Medical Center', address: '7 Barakhamba Road, Connaught Place, New Delhi', phone: '+91 11 4089 3300', needs: { 'O+': 'critical', 'A−': 'low', 'B−': 'ok', 'AB+': 'ok' } },
  { name: 'Chennai General Hospital', address: '22 Usman Road, T Nagar, Chennai', phone: '+91 44 4090 1100', needs: { 'B+': 'low', 'O−': 'ok', 'A+': 'critical', 'AB−': 'ok' } },
  { name: 'Kolkata Emergency Care', address: '5 Park Street, Kolkata', phone: '+91 33 4001 4400', needs: { 'A−': 'critical', 'O+': 'ok', 'B−': 'low', 'AB+': 'ok' } },
  { name: 'Hyderabad Multispeciality Hospital', address: '18 Road No. 12, Banjara Hills, Hyderabad', phone: '+91 40 4056 7700', needs: { 'AB−': 'low', 'O−': 'ok', 'A+': 'ok', 'B+': 'critical' } },
  { name: 'Pune Community Hospital', address: '9 North Main Road, Koregaon Park, Pune', phone: '+91 20 4023 5500', needs: { 'O+': 'low', 'A−': 'ok', 'B+': 'ok', 'AB+': 'critical' } },
];

// Approximate real coordinates for each hospital's locality, used by the
// Hospital Locator map.
export const HOSPITAL_COORDS: Record<string, [number, number]> = {
  'Bengaluru City Hospital': [12.9759, 77.608],
  'Whitefield Multispeciality Hospital': [12.9698, 77.75],
  'Koramangala Emergency Care': [12.9352, 77.6245],
  "St. Mary's Hospital": [12.925, 77.5938],
  'HSR Layout Medical Centre': [12.9121, 77.6446],
  'Electronic City Community Hospital': [12.8452, 77.6602],
  'Mumbai Central Hospital': [19.1197, 72.8468],
  'Delhi NCR Medical Center': [28.6315, 77.2167],
  'Chennai General Hospital': [13.0418, 80.2341],
  'Kolkata Emergency Care': [22.5535, 88.3522],
  'Hyderabad Multispeciality Hospital': [17.4156, 78.4347],
  'Pune Community Hospital': [18.5362, 73.8938],
};
export const INDIA_CENTER: [number, number] = [22.9734, 78.6569];
export const INDIA_BOUNDS: [[number, number], [number, number]] = [
  [6, 68],
  [38, 98],
];

export const drives: Drive[] = [
  { name: 'Cubbon Park Community Drive', loc: 'Cubbon Park, Bengaluru', date: 'Sat Oct 4, 9am – 3pm', slots: 12 },
  { name: 'Indiranagar Civic Blood Drive', loc: '100 Feet Road Community Hall, Indiranagar', date: 'Tue Oct 7, 10am – 6pm', slots: 20 },
  { name: 'City College Campus Drive', loc: 'Student Union Building, Bengaluru', date: 'Thu Oct 9, 11am – 5pm', slots: 8 },
];

export const alerts: Alert[] = [
  {
    level: 'critical',
    icon: '🚨',
    title: 'Critical shortage: O− at Bengaluru City Hospital',
    text: 'Only 2 units remain. O− is needed for emergency trauma patients. O− donors within 10 km have been notified.',
    hospital: 'Bengaluru City Hospital',
    createdAt: new Date(Date.now() - 8 * 60000).toISOString(),
  },
  {
    level: 'critical',
    icon: '🚨',
    title: 'Urgent: AB+ needed at Whitefield Multispeciality',
    text: 'Scheduled surgeries require 4 units of AB+ within 6 hours. Current stock critically low.',
    hospital: 'Whitefield Multispeciality Hospital',
    createdAt: new Date(Date.now() - 22 * 60000).toISOString(),
  },
  {
    level: 'warning',
    icon: '⚠️',
    title: 'Low B− supply — Koramangala Emergency Care',
    text: 'B− stock has dropped to 7 units city-wide. Routine surgeries may be affected if supplies are not replenished within 48 hours.',
    hospital: 'Koramangala Emergency Care',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    level: 'critical',
    icon: '🚨',
    title: 'Critical shortage: AB− at Mumbai Central Hospital',
    text: 'AB− is the rarest type in the network. Only a handful of units remain — AB− donors in Mumbai have been notified.',
    hospital: 'Mumbai Central Hospital',
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    level: 'critical',
    icon: '🚨',
    title: 'Urgent: O+ needed at Delhi NCR Medical Center',
    text: 'Emergency surgeries today require O+ units. Current stock critically low at this location.',
    hospital: 'Delhi NCR Medical Center',
    createdAt: new Date(Date.now() - 35 * 60000).toISOString(),
  },
  {
    level: 'warning',
    icon: '📢',
    title: 'Blood drive this Saturday',
    text: 'Cubbon Park is hosting a blood drive on Saturday Oct 4. 12 donor slots still available.',
    hospital: null,
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    level: 'info',
    icon: '🩸',
    title: 'A− inventory stabilized',
    text: "Following last week's alert, A− supplies have recovered to adequate levels thanks to 14 new donors.",
    hospital: null,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
];
