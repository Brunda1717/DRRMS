import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// FIX LEAFLET MARKER ISSUE
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

// CUSTOM ICONS
const donorIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [38, 38]
});
const victimIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
  iconSize: [38, 38]
});

const routes = [
  {
    donor:  { name: 'Bangalore', position: [12.9716, 77.5946], resource: 'Water Bottles' },
    victim: { name: 'Chennai',   position: [13.0827, 80.2707], priority: 'High' },
    status: 'In Transit'
  },
  {
    donor:  { name: 'Mangalore', position: [12.9141, 74.8560], resource: 'Food Kits' },
    victim: { name: 'Mysore',    position: [12.2958, 76.6394], priority: 'Critical' },
    status: 'Delivered'
  }
];

const hotspots = [
  { position: [11.0168, 76.9558], severity: 'Critical' },
  { position: [15.3173, 75.7139], severity: 'Medium' }
];

const stats = [
  { label: 'Active Routes',  value: 5, icon: '🛣',  color: '#06d6a0', glow: 'rgba(6,214,160,0.35)',   bg: 'linear-gradient(135deg,rgba(6,214,160,0.15),rgba(17,153,142,0.08))'  },
  { label: 'Delivered',      value: 3, icon: '✅',  color: '#4fc3f7', glow: 'rgba(79,195,247,0.35)',  bg: 'linear-gradient(135deg,rgba(79,195,247,0.15),rgba(57,106,252,0.08))' },
  { label: 'Critical Zones', value: 2, icon: '🔴',  color: '#ef476f', glow: 'rgba(239,71,111,0.35)',  bg: 'linear-gradient(135deg,rgba(239,71,111,0.15),rgba(255,75,43,0.08))'  },
  { label: 'NGO Support',    value: 8, icon: '🤝',  color: '#ffd166', glow: 'rgba(255,209,102,0.35)', bg: 'linear-gradient(135deg,rgba(255,209,102,0.15),rgba(247,151,30,0.08))' },
];

function MapDashboard() {
  const [activeRoute, setActiveRoute] = useState(null);

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

        /* ── Scanline texture overlay ── */
        .map-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.03) 0px,
            rgba(0,0,0,0.03) 1px,
            transparent 1px,
            transparent 4px
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ── Ambient glow blobs ── */
        .map-blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .map-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(1,73,124,0.35) 0%, transparent 70%);
          top: -200px; left: -150px;
          animation: blobDrift 14s ease-in-out infinite alternate;
        }
        .map-blob-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(6,214,160,0.1) 0%, transparent 70%);
          bottom: -100px; right: -80px;
          animation: blobDrift 11s 2s ease-in-out infinite alternate;
        }
        .map-blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(79,195,247,0.08) 0%, transparent 70%);
          top: 50%; left: 40%;
          animation: blobDrift 9s 4s ease-in-out infinite alternate;
        }
        @keyframes blobDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(35px,-35px) scale(1.1); }
        }

        .map-content { position: relative; z-index: 1; }

        /* ── Entrance animations ── */
        .map-fade-1 { animation: mapFadeUp 0.75s 0.00s cubic-bezier(0.22,1,0.36,1) both; }
        .map-fade-2 { animation: mapFadeUp 0.75s 0.10s cubic-bezier(0.22,1,0.36,1) both; }
        .map-fade-3 { animation: mapFadeUp 0.75s 0.20s cubic-bezier(0.22,1,0.36,1) both; }
        .map-fade-4 { animation: mapFadeUp 0.75s 0.30s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes mapFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Live pulse badge ── */
        .map-live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(6,214,160,0.1);
          border: 1px solid rgba(6,214,160,0.3);
          border-radius: 50px;
          padding: 5px 16px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #06d6a0;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }
        .map-live-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #06d6a0;
          animation: livePulse 1.8s infinite;
        }
        @keyframes livePulse {
          0%   { box-shadow: 0 0 0 0 rgba(6,214,160,0.8); }
          70%  { box-shadow: 0 0 0 10px rgba(6,214,160,0); }
          100% { box-shadow: 0 0 0 0 rgba(6,214,160,0); }
        }

        /* ── Stat cards ── */
        .map-stat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 22px 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
          cursor: default;
        }
        .map-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--s-color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .map-stat:hover::before { opacity: 1; }
        .map-stat:hover {
          transform: translateY(-6px);
          border-color: var(--s-color);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3), 0 0 20px var(--s-glow);
        }
        .map-stat-icon { font-size: 1.8rem; margin-bottom: 6px; }
        .map-stat-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 4px;
        }
        .map-stat-value {
          font-size: 2.6rem;
          font-weight: 800;
          color: var(--s-color);
          line-height: 1;
          font-family: 'Playfair Display', serif;
        }

        /* ── Left side panel ── */
        .map-panel {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .map-panel:hover {
          border-color: rgba(79,195,247,0.25);
          box-shadow: 0 12px 36px rgba(0,0,0,0.25);
        }

        /* ── Panel section divider ── */
        .map-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79,195,247,0.2), transparent);
          margin: 16px 0;
        }

        /* ── Legend items ── */
        .legend-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          color: rgba(255,255,255,0.75);
          font-size: 0.88rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .legend-item:last-child { border-bottom: none; }
        .legend-item:hover { color: #fff; padding-left: 4px; }
        .legend-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .legend-line {
          width: 20px; height: 3px;
          border-radius: 2px;
          flex-shrink: 0;
          background: repeating-linear-gradient(
            90deg,
            #4fc3f7 0px, #4fc3f7 4px,
            transparent 4px, transparent 8px
          );
        }

        /* ── Route cards ── */
        .route-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.28s ease;
          position: relative;
          overflow: hidden;
        }
        .route-card::after {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 3px; height: 100%;
          background: var(--rc-color);
          border-radius: 14px 0 0 14px;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }
        .route-card:hover::after,
        .route-card.rc-active::after { transform: scaleY(1); }
        .route-card:hover,
        .route-card.rc-active {
          border-color: var(--rc-color);
          background: rgba(255,255,255,0.07);
          transform: translateX(4px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
        }
        .route-arrow {
          display: inline-block;
          margin: 0 6px;
          color: #4fc3f7;
          animation: arrowBounce 1.5s ease-in-out infinite;
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(4px); }
        }

        /* ── Status pill ── */
        .status-pill {
          display: inline-block;
          padding: 3px 12px;
          border-radius: 50px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          border: 1px solid var(--sp-border);
          background: var(--sp-bg);
          color: var(--sp-color);
        }

        /* ── Map wrapper ── */
        .map-wrapper {
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(79,195,247,0.2);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.05),
            0 24px 60px rgba(0,0,0,0.5),
            0 0 60px rgba(79,195,247,0.08);
          transition: box-shadow 0.4s ease;
        }
        .map-wrapper:hover {
          box-shadow:
            0 0 0 1px rgba(79,195,247,0.15),
            0 24px 60px rgba(0,0,0,0.5),
            0 0 80px rgba(79,195,247,0.14);
        }

        /* ── Map corner badge ── */
        .map-corner-badge {
          position: absolute;
          top: 16px; left: 16px;
          z-index: 999;
          background: rgba(1,42,74,0.88);
          border: 1px solid rgba(79,195,247,0.35);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 8px 14px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #4fc3f7;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 8px;
          pointer-events: none;
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #4fc3f7, #06d6a0);
          border-radius: 20px;
        }
        ::-webkit-scrollbar-track { background: transparent; }

        /* ── Leaflet popup override ── */
        .leaflet-popup-content-wrapper {
          background: rgba(1,42,74,0.95) !important;
          border: 1px solid rgba(79,195,247,0.3) !important;
          border-radius: 14px !important;
          color: #fff !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
        }
        .leaflet-popup-tip { background: rgba(1,42,74,0.95) !important; }
        .leaflet-popup-content { color: rgba(255,255,255,0.9) !important; }

        /* ── Section title ── */
        .panel-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 16px;
        }
      `}</style>

      {/* ── Background ── */}
      <div className="map-page map-blob map-blob-1" />
      <div className="map-blob map-blob-2" />
      <div className="map-blob map-blob-3" />

      <div className="map-content container-fluid p-4 p-md-5">

        {/* ── HEADER ── */}
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-5 map-fade-1">
          <div>
            <div className="map-live mb-3">
              <span className="map-live-dot" /> Live Monitoring
            </div>
            <h1 style={styles.title}>DRRMS Smart Route Tracking</h1>
            <p style={styles.subtitle}>
              Live donor-to-victim disaster delivery monitoring across regions
            </p>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="row g-3 mb-4 map-fade-2">
          {stats.map((s) => (
            <div className="col-md-3 col-sm-6" key={s.label}>
              <div
                className="map-stat"
                style={{ '--s-color': s.color, '--s-glow': s.glow, background: s.bg }}
              >
                <div className="map-stat-icon">{s.icon}</div>
                <div className="map-stat-label">{s.label}</div>
                <div className="map-stat-value">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="row g-4 map-fade-3">

          {/* ── LEFT PANEL ── */}
          <div className="col-md-3">

            {/* Legend */}
            <div className="map-panel p-4 mb-4">
              <h6 className="panel-title">🗺 Map Legend</h6>
              <div className="map-divider" style={{ marginTop: 0 }} />
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#4fc3f7' }} />
                Donor Location
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#ef476f' }} />
                Victim Area
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: '#ff9800', width: 14, height: 14, borderRadius: 3 }} />
                Disaster Hotspot
              </div>
              <div className="legend-item">
                <span className="legend-line" />
                Delivery Route
              </div>
            </div>

            {/* Live deliveries */}
            <div className="map-panel p-4">
              <h6 className="panel-title">🚚 Live Deliveries</h6>
              <div className="map-divider" style={{ marginTop: 0 }} />
              {routes.map((route, index) => {
                const isDelivered = route.status === 'Delivered';
                const rcColor = isDelivered ? '#06d6a0' : '#4fc3f7';
                return (
                  <div
                    key={index}
                    className={`route-card ${activeRoute === index ? 'rc-active' : ''}`}
                    style={{ '--rc-color': rcColor }}
                    onClick={() => setActiveRoute(activeRoute === index ? null : index)}
                  >
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginBottom: 6 }}>
                      {route.donor.name}
                      <span className="route-arrow">→</span>
                      {route.victim.name}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', marginBottom: 8 }}>
                      📦 {route.donor.resource}
                    </div>
                    <span
                      className="status-pill"
                      style={{
                        '--sp-color':  isDelivered ? '#06d6a0' : '#4fc3f7',
                        '--sp-bg':     isDelivered ? 'rgba(6,214,160,0.15)' : 'rgba(79,195,247,0.15)',
                        '--sp-border': isDelivered ? 'rgba(6,214,160,0.3)'  : 'rgba(79,195,247,0.3)',
                      }}
                    >
                      {route.status}
                    </span>
                  </div>
                );
              })}

              <div className="map-divider" />

              {/* Hotspot summary */}
              <h6 className="panel-title" style={{ fontSize: '0.95rem', marginBottom: 12 }}>
                🔥 Hotspot Zones
              </h6>
              {hotspots.map((spot, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: index < hotspots.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
                    📍 {spot.position[0].toFixed(2)}, {spot.position[1].toFixed(2)}
                  </span>
                  <span
                    className="status-pill"
                    style={{
                      '--sp-color':  spot.severity === 'Critical' ? '#ef476f' : '#ffd166',
                      '--sp-bg':     spot.severity === 'Critical' ? 'rgba(239,71,111,0.15)' : 'rgba(255,209,102,0.15)',
                      '--sp-border': spot.severity === 'Critical' ? 'rgba(239,71,111,0.3)'  : 'rgba(255,209,102,0.3)',
                    }}
                  >
                    {spot.severity}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ── MAP ── */}
          <div className="col-md-9 map-fade-4">
            <div className="map-wrapper" style={{ position: 'relative' }}>

              {/* Corner badge */}
              <div className="map-corner-badge">
                <span className="map-live-dot" style={{ width: 7, height: 7 }} />
                LIVE MAP
              </div>

              <MapContainer
                center={[12.9716, 77.5946]}
                zoom={6}
                style={{ height: '78vh', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {routes.map((route, index) => (
                  <React.Fragment key={index}>
                    <Marker position={route.donor.position} icon={donorIcon}>
                      <Popup>
                        <strong>🔵 Donor Location</strong><br />
                        {route.donor.name}<br />
                        Resource: {route.donor.resource}
                      </Popup>
                    </Marker>
                    <Marker position={route.victim.position} icon={victimIcon}>
                      <Popup>
                        <strong>🔴 Victim Area</strong><br />
                        {route.victim.name}<br />
                        Priority: {route.victim.priority}
                      </Popup>
                    </Marker>
                    <Polyline
                      positions={[route.donor.position, route.victim.position]}
                      pathOptions={{
                        color: route.status === 'Delivered' ? '#06d6a0' : '#4fc3f7',
                        weight: 4,
                        dashArray: '10 6',
                        opacity: activeRoute === null || activeRoute === index ? 1 : 0.3
                      }}
                    />
                  </React.Fragment>
                ))}

                {hotspots.map((spot, index) => (
                  <CircleMarker
                    key={index}
                    center={spot.position}
                    radius={45}
                    pathOptions={{
                      color:       spot.severity === 'Critical' ? '#ef476f' : '#ffd166',
                      fillColor:   spot.severity === 'Critical' ? '#ef476f' : '#ffd166',
                      fillOpacity: 0.25,
                      weight: 2
                    }}
                  >
                    <Popup>
                      <strong>⚠️ Disaster Hotspot</strong><br />
                      Severity: {spot.severity}
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #010e1a 0%, #012030 35%, #012a4a 65%, #010e1a 100%)',
    overflowX: 'hidden'
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 800,
    color: '#fff',
    fontFamily: 'Playfair Display, serif',
    lineHeight: 1.12,
    margin: '0 0 8px'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '0.95rem',
    margin: 0
  }
};

export default MapDashboard;