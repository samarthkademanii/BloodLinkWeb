import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Hospital } from '../data/types';
import { distanceKm } from '../data/types';
import { HOSPITAL_COORDS, INDIA_BOUNDS, INDIA_CENTER } from '../data/mockData';

function hospitalCoords(h: Hospital): [number, number] {
  if (HOSPITAL_COORDS[h.name]) return HOSPITAL_COORDS[h.name];
  // Unknown hospital (e.g. one someone registered through the form) — place
  // it near the geographic center of India with a random offset so it
  // doesn't overlap exactly with another unknown one.
  return [INDIA_CENTER[0] + (Math.random() - 0.5) * 4, INDIA_CENTER[1] + (Math.random() - 0.5) * 4];
}

const hospitalIcon = L.divIcon({
  className: '',
  html:
    '<svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.3 21.7 0 14 0z" fill="#C01429" stroke="#fff" stroke-width="1.5"/>' +
    '<circle cx="14" cy="14" r="5.5" fill="#fff"/>' +
    '</svg>',
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -34],
});

const youIcon = L.divIcon({
  className: '',
  html: '<div style="width:16px;height:16px;border-radius:50%;background:#C01429;border:3px solid #fff;box-shadow:0 0 0 2px #C01429"></div>',
  iconSize: [16, 16],
});

// Builds the popup content from real DOM nodes (textContent, never
// innerHTML), so a malicious hospital name/address/phone from the public
// registration endpoint can't inject markup — it just renders as inert text.
function buildPopup(h: Hospital, userCoords: [number, number] | null, coords: [number, number]) {
  const root = document.createElement('div');
  root.className = 'hospital-popup';

  const name = document.createElement('b');
  name.textContent = h.name;
  root.appendChild(name);

  const addr = document.createElement('div');
  addr.className = 'pop-addr';
  addr.append(h.address, document.createElement('br'), h.phone);
  root.appendChild(addr);

  const chips = document.createElement('div');
  Object.entries(h.needs).forEach(([type, level]) => {
    const chip = document.createElement('span');
    chip.className = 'pop-chip';
    const colors =
      level === 'critical'
        ? { bg: '#fdecee', fg: '#c01429' }
        : level === 'low'
          ? { bg: '#fef4e2', fg: '#b97008' }
          : { bg: '#eaf7f0', fg: '#187a44' };
    chip.style.background = colors.bg;
    chip.style.color = colors.fg;
    chip.textContent = type;
    chips.appendChild(chip);
  });
  root.appendChild(chips);

  if (userCoords) {
    const dist = document.createElement('div');
    dist.className = 'pop-dist';
    dist.textContent = `${distanceKm(userCoords, coords).toFixed(1)} km away`;
    root.appendChild(dist);
  }

  return root;
}

export function HospitalMap({ hospitals }: { hospitals: Hospital[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [status, setStatus] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  // Init map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      maxBounds: INDIA_BOUNDS,
      maxBoundsViscosity: 1,
      minZoom: 4,
      fadeAnimation: false, // tiles can get stuck at opacity 0 mid-fade otherwise
    }).setView(INDIA_CENTER, 5);
    // Esri's World Street Map is an English-language basemap by design,
    // unlike OpenStreetMap's default tiles, which render each place's
    // local-script name whenever it has no separate English tag.
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 18,
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Keep markers in sync with hospital data.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = hospitals.map((h) => {
      const coords = hospitalCoords(h);
      const marker = L.marker(coords, { icon: hospitalIcon }).addTo(map);
      marker.bindPopup(buildPopup(h, userCoords, coords));
      return marker;
    });
    if (markersRef.current.length) {
      map.invalidateSize();
      map.fitBounds(L.featureGroup(markersRef.current).getBounds().pad(0.2));
    }
  }, [hospitals, userCoords]);

  function locateMe() {
    if (!navigator.geolocation) {
      setStatus({ kind: 'error', text: 'Geolocation is not supported in this browser.' });
      return;
    }
    setStatus({ kind: 'ok', text: 'Locating you…' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        const map = mapRef.current;
        if (map) {
          if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
          userMarkerRef.current = L.marker(coords, { icon: youIcon }).addTo(map);
        }
        let nearest: { name: string; km: number } | null = null;
        hospitals.forEach((h) => {
          const km = distanceKm(coords, hospitalCoords(h));
          if (!nearest || km < nearest.km) nearest = { name: h.name, km };
        });
        setStatus({
          kind: 'ok',
          text: nearest
            ? `You're located. Nearest hospital: ${(nearest as { name: string; km: number }).name} (${(nearest as { name: string; km: number }).km.toFixed(1)} km away).`
            : "You're located.",
        });
      },
      (err) => {
        setStatus({
          kind: 'error',
          text:
            err.code === err.PERMISSION_DENIED
              ? 'Location permission denied. Enable it in your browser settings to see distances.'
              : 'Could not determine your location.',
        });
      },
    );
  }

  return (
    <>
      <SectionHeaderInline onLocate={locateMe} />
      {status && <div className={`locate-status ${status.kind}`}>{status.text}</div>}
      <div className="map-area">
        <div id="hospital-map" ref={containerRef} />
      </div>
    </>
  );
}

function SectionHeaderInline({ onLocate }: { onLocate: () => void }) {
  return (
    <div className="section-header">
      <h2 className="section-title">
        Hospital Locator <span className="section-sub">Across India</span>
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>🏥 Hospital &nbsp; 📍 You</span>
        <button className="btn btn-outline btn-sm" onClick={onLocate}>
          Use my location
        </button>
      </div>
    </div>
  );
}
