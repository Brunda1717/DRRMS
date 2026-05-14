import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function RequestForm() {
  const [victims, setVictims] = useState([]);
  const [formData, setFormData] = useState({
    victim_id: '',
    resource_type: '',
    quantity_needed: '',
    priority_level: 'medium'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { fetchVictims(); }, []);

  const fetchVictims = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/victims');
      setVictims(res.data);
    } catch (err) { console.log(err); }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/requests', formData);
      toast.success(res.data.message);
      setSubmitted(true);
      setFormData({ victim_id: '', resource_type: '', quantity_needed: '', priority_level: 'medium' });
    } catch (err) {
      console.log(err);
      toast.error('Failed to create request');
    }
    setSubmitting(false);
  };

  const priorityConfig = {
    low:      { color: '#38ef7d', bg: 'rgba(56,239,125,0.12)',  border: 'rgba(56,239,125,0.35)',  label: 'Low',      icon: '🟢' },
    medium:   { color: '#4fc3f7', bg: 'rgba(79,195,247,0.12)',  border: 'rgba(79,195,247,0.35)',  label: 'Medium',   icon: '🔵' },
    high:     { color: '#f7971e', bg: 'rgba(247,151,30,0.12)',  border: 'rgba(247,151,30,0.35)',  label: 'High',     icon: '🟠' },
    critical: { color: '#ff6b6b', bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.35)', label: 'Critical', icon: '🔴' },
  };

  const currentPriority = priorityConfig[formData.priority_level] || priorityConfig.medium;

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

        /* ── Page entrance ── */
        .rf-page-enter {
          animation: rfPageIn 0.8s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes rfPageIn {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }

        /* ── Floating orbs background ── */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          animation: orbFloat 8s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%);
          top: -100px; left: -80px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(236,72,153,0.14), transparent 70%);
          bottom: -80px; right: -60px;
          animation-delay: 2s;
        }
        .orb-3 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%);
          top: 40%; left: 60%;
          animation-delay: 4s;
        }
        @keyframes orbFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, -30px) scale(1.08); }
        }

        /* ── Glass card ── */
        .rf-card {
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(168,85,247,0.2);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          position: relative;
          z-index: 1;
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .rf-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,
            rgba(168,85,247,0.06) 0%,
            transparent 50%,
            rgba(236,72,153,0.04) 100%);
          pointer-events: none;
        }
        .rf-card:hover {
          border-color: rgba(168,85,247,0.45);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(168,85,247,0.1);
        }

        /* ── Top shimmer line ── */
        .rf-card-shimmer {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent);
          animation: shimmerLine 3s linear infinite;
        }
        @keyframes shimmerLine {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        /* ── Form field labels ── */
        .rf-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 8px;
        }

        /* ── Inputs & selects ── */
        .rf-input {
          width: 100%;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(168,85,247,0.2) !important;
          color: white !important;
          border-radius: 14px !important;
          padding: 13px 16px !important;
          font-size: 0.95rem !important;
          transition: all 0.3s ease;
          appearance: none;
        }
        .rf-input:focus {
          outline: none;
          border-color: #a855f7 !important;
          box-shadow: 0 0 0 3px rgba(168,85,247,0.2) !important;
          background: rgba(168,85,247,0.07) !important;
        }
        .rf-input::placeholder { color: rgba(255,255,255,0.25); }
        .rf-input option { background: #1a0a2e; color: white; }

        /* ── Field wrapper hover lift ── */
        .rf-field {
          transition: transform 0.25s ease;
        }
        .rf-field:focus-within {
          transform: translateY(-2px);
        }

        /* ── Priority radio buttons ── */
        .priority-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        @media (max-width: 600px) {
          .priority-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .priority-option {
          position: relative;
          cursor: pointer;
        }
        .priority-option input { display: none; }
        .priority-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 14px 10px;
          border-radius: 14px;
          border: 1px solid var(--p-border);
          background: var(--p-bg);
          color: var(--p-color);
          font-weight: 600;
          font-size: 0.82rem;
          transition: all 0.25s ease;
          user-select: none;
        }
        .priority-card .p-icon { font-size: 1.4rem; transition: transform 0.3s ease; }
        .priority-option input:checked + .priority-card {
          border-color: var(--p-color);
          box-shadow: 0 0 0 2px var(--p-color), 0 8px 24px rgba(0,0,0,0.3);
          transform: translateY(-3px) scale(1.04);
        }
        .priority-card:hover { transform: translateY(-3px); }
        .priority-card:hover .p-icon { transform: scale(1.2); }

        /* ── Submit button ── */
        .rf-submit {
          position: relative;
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
          background-size: 200% 200%;
          color: white;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.35s ease;
          animation: gradientShift 4s ease infinite;
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .rf-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(168,85,247,0.5);
        }
        .rf-submit:active { transform: translateY(0) scale(0.98); }
        .rf-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }
        .rf-submit .btn-ripple {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          animation: btnRipple 2s linear infinite;
        }
        @keyframes btnRipple {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }

        /* ── Success flash ── */
        .rf-success-ring {
          animation: successPop 0.5s cubic-bezier(0.22,1,0.36,1) both;
          border-color: rgba(56,239,125,0.5) !important;
          box-shadow: 0 0 40px rgba(56,239,125,0.15) !important;
        }
        @keyframes successPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.008); }
          100% { transform: scale(1); }
        }

        /* ── Divider ── */
        .rf-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(236,72,153,0.2), transparent);
          margin: 28px 0;
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #ec4899);
          border-radius: 20px;
        }

        /* ── Stagger animations ── */
        .s1 { animation: rfPageIn 0.7s 0.05s both cubic-bezier(0.22,1,0.36,1); }
        .s2 { animation: rfPageIn 0.7s 0.12s both cubic-bezier(0.22,1,0.36,1); }
        .s3 { animation: rfPageIn 0.7s 0.19s both cubic-bezier(0.22,1,0.36,1); }
        .s4 { animation: rfPageIn 0.7s 0.26s both cubic-bezier(0.22,1,0.36,1); }
        .s5 { animation: rfPageIn 0.7s 0.33s both cubic-bezier(0.22,1,0.36,1); }
      `}</style>

      {/* ── Background orbs ── */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div style={styles.wrapper}>

        {/* ── Header ── */}
        <div className="rf-page-enter" style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={styles.badge}>🆘 &nbsp;Emergency Relief Request</div>
          <h1 style={styles.title}>Create Resource Request</h1>
          <p style={styles.subtitle}>
            Submit a relief request on behalf of disaster-affected victims
          </p>
        </div>

        {/* ── Form card ── */}
        <div className={`rf-card p-4 p-md-5 ${submitted ? 'rf-success-ring' : ''}`}>
          <div className="rf-card-shimmer" />

          <form onSubmit={handleSubmit}>

            {/* ── Row 1: Victim + Resource ── */}
            <div className="row g-4 s1">

              <div className="col-md-6">
                <div className="rf-field">
                  <label className="rf-label">👤 &nbsp;Select Victim</label>
                  <select
                    className="rf-input form-select"
                    name="victim_id"
                    value={formData.victim_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">— Choose a victim —</option>
                    {victims.map((v) => (
                      <option key={v.victim_id} value={v.victim_id}>
                        {v.name} · {v.disaster_area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="rf-field">
                  <label className="rf-label">📦 &nbsp;Resource Type</label>
                  <select
                    className="rf-input form-select"
                    name="resource_type"
                    value={formData.resource_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">— Choose a resource —</option>
                    <option value="Food Kits">🍱 &nbsp;Food Kits</option>
                    <option value="Water Bottles">💧 &nbsp;Water Bottles</option>
                    <option value="Medicines">💊 &nbsp;Medicines</option>
                    <option value="Blankets">🛏 &nbsp;Blankets</option>
                    <option value="Clothes">👕 &nbsp;Clothes</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="rf-divider s2" />

            {/* ── Quantity ── */}
            <div className="s2" style={{ marginBottom: 28 }}>
              <div className="rf-field" style={{ maxWidth: 320 }}>
                <label className="rf-label">🔢 &nbsp;Quantity Needed</label>
                <input
                  type="number"
                  className="rf-input form-control"
                  name="quantity_needed"
                  value={formData.quantity_needed}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* ── Priority selector ── */}
            <div className="s3" style={{ marginBottom: 32 }}>
              <label className="rf-label" style={{ marginBottom: 14 }}>
                ⚡ &nbsp;Priority Level
              </label>

              {/* Visual selected indicator */}
              <div style={{
                marginBottom: 14,
                padding: '10px 16px',
                borderRadius: 12,
                background: currentPriority.bg,
                border: `1px solid ${currentPriority.border}`,
                color: currentPriority.color,
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s ease'
              }}>
                <span>{currentPriority.icon}</span>
                Selected: <strong>{currentPriority.label}</strong>
                <span style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '0.75rem' }}>
                  {formData.priority_level === 'critical' ? 'Immediate action required' :
                   formData.priority_level === 'high'     ? 'Urgent — respond soon' :
                   formData.priority_level === 'medium'   ? 'Moderate urgency' :
                                                            'Non-urgent situation'}
                </span>
              </div>

              <div className="priority-grid">
                {Object.entries(priorityConfig).map(([key, cfg]) => (
                  <label className="priority-option" key={key}>
                    <input
                      type="radio"
                      name="priority_level"
                      value={key}
                      checked={formData.priority_level === key}
                      onChange={handleChange}
                    />
                    <div
                      className="priority-card"
                      style={{
                        '--p-color': cfg.color,
                        '--p-bg': cfg.bg,
                        '--p-border': cfg.border
                      }}
                    >
                      <span className="p-icon">{cfg.icon}</span>
                      <span>{cfg.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="rf-divider s4" />

            {/* ── Submit ── */}
            <div className="s5">
              <button
                type="submit"
                className="rf-submit"
                disabled={submitting}
              >
                <span className="btn-ripple" />
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {submitting
                    ? '⏳  Submitting Request…'
                    : submitted
                    ? '✅  Request Created!'
                    : '🚀  Submit Resource Request'}
                </span>
              </button>

              {submitted && (
                <p style={{
                  textAlign: 'center',
                  color: '#38ef7d',
                  marginTop: 14,
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  animation: 'rfPageIn 0.5s both'
                }}>
                  ✓ &nbsp;Request submitted successfully. The system will auto-match a donor.
                </p>
              )}
            </div>

          </form>
        </div>

        {/* ── Footer note ── */}
        <p style={styles.footerNote}>
          Requests are automatically matched with nearest available donors using the DRRMS engine.
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #0d0618 0%, #160824 35%, #1a0a30 65%, #0f0520 100%)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '48px 16px 64px',
    overflowX: 'hidden'
  },
  wrapper: {
    width: '100%',
    maxWidth: 780,
    position: 'relative',
    zIndex: 1
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(168,85,247,0.15)',
    border: '1px solid rgba(168,85,247,0.35)',
    color: '#c084fc',
    borderRadius: 50,
    padding: '6px 18px',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    marginBottom: 14
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 800,
    color: '#fff',
    fontFamily: 'Syne, sans-serif',
    lineHeight: 1.15,
    margin: '0 0 10px'
  },
  subtitle: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '0.95rem',
    margin: 0
  },
  footerNote: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.25)',
    fontSize: '0.78rem',
    marginTop: 24,
    position: 'relative',
    zIndex: 1
  }
};

export default RequestForm;