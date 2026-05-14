import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatches } from '../services/api';

function MatchTracking() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(() => fetchMatches(), 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await getMatches();
      setMatches(res.data);
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
    setLoading(false);
  };

  const filteredMatches = matches
    .filter(m => filter === 'all' ? true : m.delivery_status === filter)
    .filter(m =>
      searchTerm === '' ? true :
      m.victim_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.resource_type?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const pendingCount   = matches.filter(m => m.delivery_status === 'pending').length;
  const transitCount   = matches.filter(m => m.delivery_status === 'in_transit').length;
  const deliveredCount = matches.filter(m => m.delivery_status === 'delivered').length;
  const criticalCount  = matches.filter(m => m.priority_level === 'critical').length;

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

        /* ── Page entrance ── */
        .mt-animate { animation: slideIn 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Staggered children ── */
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.12s; }
        .stagger-3 { animation-delay: 0.19s; }
        .stagger-4 { animation-delay: 0.26s; }

        /* ── Glass panel — teal tint (different from admin blue tint) ── */
        .mt-panel {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(100,220,200,0.18);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          transition: all 0.35s ease;
        }
        .mt-panel:hover {
          border-color: rgba(100,220,200,0.5);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3);
        }

        /* ── Stat cards — horizontal accent bar on left ── */
        .stat-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          padding: 28px 24px;
          transition: all 0.35s ease;
          cursor: default;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 5px; height: 100%;
          background: var(--accent);
          border-radius: 20px 0 0 20px;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          right: -40px; top: -40px;
          width: 120px; height: 120px;
          background: var(--accent);
          opacity: 0.08;
          border-radius: 50%;
          transition: transform 0.5s ease;
        }
        .stat-card:hover::before { transform: scale(1.6); }
        .stat-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        /* ── Back button ── */
        .back-btn {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(100,220,200,0.3);
          color: #fff;
          padding: 10px 22px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .back-btn:hover {
          background: rgba(100,220,200,0.15);
          border-color: #64dcb4;
          transform: translateX(-4px);
          box-shadow: 0 6px 20px rgba(100,220,200,0.2);
        }

        /* ── Inputs ── */
        .mt-input {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(100,220,200,0.2) !important;
          color: white !important;
          border-radius: 14px !important;
          padding: 11px 16px !important;
          transition: all 0.3s ease;
        }
        .mt-input:focus {
          box-shadow: 0 0 0 3px rgba(100,220,200,0.2) !important;
          border-color: #64dcb4 !important;
          outline: none;
        }
        .mt-input::placeholder { color: rgba(255,255,255,0.35); }
        .mt-input option { background: #012a3a; }

        /* ── Table ── */
        .mt-table { border-collapse: separate; border-spacing: 0 5px; width: 100%; }
        .mt-table thead tr th {
          background: rgba(100,220,200,0.12);
          color: rgba(255,255,255,0.85);
          font-weight: 600;
          padding: 14px 16px;
          font-size: 0.82rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: none;
        }
        .mt-table thead tr th:first-child { border-radius: 12px 0 0 12px; }
        .mt-table thead tr th:last-child  { border-radius: 0 12px 12px 0; }
        .mt-table tbody tr { transition: all 0.25s ease; }
        .mt-table tbody tr:hover {
          transform: scale(1.008);
          filter: brightness(1.1);
        }
        .mt-table tbody tr td {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.9);
          padding: 13px 16px;
          border: none;
          font-size: 0.9rem;
          vertical-align: middle;
        }
        .mt-table tbody tr td:first-child { border-radius: 12px 0 0 12px; }
        .mt-table tbody tr td:last-child  { border-radius: 0 12px 12px 0; }

        /* ── Filter pills ── */
        .filter-pill {
          padding: 8px 20px;
          border-radius: 50px;
          border: 1px solid rgba(100,220,200,0.25);
          background: transparent;
          color: rgba(255,255,255,0.65);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .filter-pill:hover {
          border-color: #64dcb4;
          color: #64dcb4;
        }
        .filter-pill.active {
          background: linear-gradient(135deg, #0fa8a0, #64dcb4);
          border-color: transparent;
          color: #012a3a;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(100,220,200,0.35);
        }

        /* ── Live pulse badge ── */
        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(100,220,200,0.12);
          border: 1px solid rgba(100,220,200,0.3);
          border-radius: 50px;
          padding: 4px 12px;
          font-size: 0.78rem;
          color: #64dcb4;
          font-weight: 600;
        }
        .live-dot {
          width: 7px; height: 7px;
          background: #64dcb4;
          border-radius: 50%;
          animation: livePulse 1.6s infinite;
        }
        @keyframes livePulse {
          0%   { box-shadow: 0 0 0 0 rgba(100,220,200,0.7); }
          70%  { box-shadow: 0 0 0 8px rgba(100,220,200,0); }
          100% { box-shadow: 0 0 0 0 rgba(100,220,200,0); }
        }

        /* ── Loading shimmer ── */
        .shimmer {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(100,220,200,0.08) 50%,
            rgba(255,255,255,0.04) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 12px;
          height: 48px;
          margin-bottom: 6px;
        }
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #64dcb4; border-radius: 20px; }

        /* ── Progress bar ── */
        .mt-progress {
          height: 6px;
          border-radius: 30px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
          margin-top: 10px;
        }
        .mt-progress-bar {
          height: 100%;
          border-radius: 30px;
          background: var(--bar-color);
          transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
        }
      `}</style>

      <div className="container-fluid p-4">

        {/* ── HEADER ── */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5 mt-animate">
          <div>
            <div className="live-badge mb-2">
              <span className="live-dot" /> LIVE TRACKING
            </div>
            <h1 style={styles.title}>Match Tracking</h1>
            <p style={styles.subtitle}>Real-time donor ↔ victim resource delivery pipeline</p>
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="row mb-4">
          {[
            { label: 'Pending',   value: pendingCount,   accent: '#f7971e', bg: 'linear-gradient(135deg,rgba(247,151,30,0.12),rgba(255,210,0,0.06))',   icon: '⏳', delay: 'stagger-1' },
            { label: 'In Transit',value: transitCount,   accent: '#4fc3f7', bg: 'linear-gradient(135deg,rgba(79,195,247,0.12),rgba(91,134,229,0.06))',   icon: '🚚', delay: 'stagger-2' },
            { label: 'Delivered', value: deliveredCount, accent: '#38ef7d', bg: 'linear-gradient(135deg,rgba(56,239,125,0.12),rgba(17,153,142,0.06))',   icon: '✅', delay: 'stagger-3' },
            { label: 'Critical',  value: criticalCount,  accent: '#ff6b6b', bg: 'linear-gradient(135deg,rgba(255,107,107,0.12),rgba(255,75,43,0.06))',   icon: '🔴', delay: 'stagger-4' },
          ].map(({ label, value, accent, bg, icon, delay }) => (
            <div className={`col-md-3 col-sm-6 mb-3`} key={label}>
              <div
                className={`stat-card mt-animate ${delay}`}
                style={{ '--accent': accent, background: bg, border: `1px solid ${accent}22` }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 6 }}>{icon}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
                <div style={{ color: '#fff', fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.1 }}>{value}</div>
                <div className="mt-progress">
                  <div
                    className="mt-progress-bar"
                    style={{
                      '--bar-color': accent,
                      width: matches.length ? `${(value / matches.length) * 100}%` : '0%'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTER + SEARCH BAR ── */}
        <div className="mt-panel p-4 mb-4 mt-animate stagger-2">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            {/* Filter pills */}
            <div className="d-flex flex-wrap gap-2">
              {['all', 'pending', 'in_transit', 'delivered'].map(f => (
                <button
                  key={f}
                  className={`filter-pill ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'All Matches' : f === 'in_transit' ? 'In Transit' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            {/* Search */}
            <input
              type="text"
              className="mt-input form-control"
              style={{ maxWidth: 280 }}
              placeholder="🔍  Search victim, donor, resource…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="mt-panel p-4 mt-animate stagger-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>
              All Matches
              <span style={{ marginLeft: 10, fontSize: '0.85rem', color: '#64dcb4', fontWeight: 500 }}>
                ({filteredMatches.length} records)
              </span>
            </h4>
          </div>

          {loading ? (
            <div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="shimmer" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          ) : filteredMatches.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '48px 0', fontSize: '1rem' }}>
              No matches found.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="mt-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Victim</th>
                    <th>Area</th>
                    <th>Donor</th>
                    <th>Resource</th>
                    <th>Qty</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMatches.map((m, index) => (
                    <tr key={index}>
                      <td style={{ color: '#64dcb4', fontWeight: 600 }}>#{m.match_id}</td>
                      <td>{m.victim_name}</td>
                      <td style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>📍 {m.disaster_area}</td>
                      <td>{m.donor_name}</td>
                      <td>{m.resource_type}</td>
                      <td style={{ fontWeight: 600 }}>{m.matched_quantity}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: 50,
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          background:
                            m.priority_level === 'critical' ? 'rgba(255,107,107,0.18)' :
                            m.priority_level === 'high'     ? 'rgba(247,151,30,0.18)' :
                            m.priority_level === 'medium'   ? 'rgba(79,195,247,0.18)' :
                                                              'rgba(56,239,125,0.18)',
                          color:
                            m.priority_level === 'critical' ? '#ff6b6b' :
                            m.priority_level === 'high'     ? '#f7971e' :
                            m.priority_level === 'medium'   ? '#4fc3f7' :
                                                              '#38ef7d',
                          border: `1px solid ${
                            m.priority_level === 'critical' ? '#ff6b6b44' :
                            m.priority_level === 'high'     ? '#f7971e44' :
                            m.priority_level === 'medium'   ? '#4fc3f744' :
                                                              '#38ef7d44'
                          }`
                        }}>
                          {m.priority_level}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: 50,
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          background:
                            m.delivery_status === 'delivered'  ? 'rgba(56,239,125,0.18)' :
                            m.delivery_status === 'in_transit' ? 'rgba(79,195,247,0.18)' :
                                                                  'rgba(247,151,30,0.18)',
                          color:
                            m.delivery_status === 'delivered'  ? '#38ef7d' :
                            m.delivery_status === 'in_transit' ? '#4fc3f7' :
                                                                  '#f7971e',
                          border: `1px solid ${
                            m.delivery_status === 'delivered'  ? '#38ef7d44' :
                            m.delivery_status === 'in_transit' ? '#4fc3f744' :
                                                                  '#f7971e44'
                          }`
                        }}>
                          {m.delivery_status === 'in_transit' ? 'In Transit' : m.delivery_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #011f2e 0%, #012a3a 30%, #013347 60%, #012030 100%)'
  },
  title: {
    fontSize: '2.6rem',
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'Playfair Display',
    lineHeight: 1.15
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '0.95rem',
    marginTop: 4
  }
};

export default MatchTracking;