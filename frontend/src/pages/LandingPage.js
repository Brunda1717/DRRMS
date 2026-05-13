import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '10+', label: 'NGOs Connected' },
    { number: '20+', label: 'Donors Registered' },
    { number: '500+', label: 'Victims Helped' },
    { number: '95%', label: 'Delivery Success' },
  ];

  const features = [
    { icon: '🎯', title: 'Priority-Based Matching', desc: 'Critical victims are matched first. Our smart algorithm ensures the most vulnerable receive aid immediately.', color: '#4fc3f7' },
    { icon: '📦', title: 'Resource Tracking', desc: 'Real-time tracking from donation to delivery. Every resource is monitored — Pending, In Transit, Delivered.', color: '#29b6f6' },
    { icon: '🏢', title: 'NGO Management', desc: 'NGOs can register victims, create resource requests, and manage their disaster relief operations efficiently.', color: '#0288d1' },
    { icon: '❤️', title: 'Donor Portal', desc: 'Donors can easily contribute resources and track exactly where their donations go and who they help.', color: '#0277bd' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Admins get real-time analytics with charts showing donation trends, delivery rates, and resource shortages.', color: '#4fc3f7' },
    { icon: '🔐', title: 'Secure & Role-Based', desc: 'Role-based access control ensures data security. Admins, NGOs, and Donors each see what they need.', color: '#29b6f6' },
  ];

  const steps = [
    { step: '01', title: 'NGO Registers Victims', desc: 'NGOs on the ground register disaster victims with their needs and priority levels.' },
    { step: '02', title: 'Donors Contribute', desc: 'Donors register available resources — food, medicine, clothes, shelter kits.' },
    { step: '03', title: 'System Matches', desc: 'Our matching engine connects donations to requests based on resource type and priority.' },
    { step: '04', title: 'Aid is Delivered', desc: 'Admin approves and tracks delivery until resources reach the victims.' },
  ];

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; }
        .fade-in { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
        .hero-btn { padding: 14px 36px; border-radius: 50px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: 'Poppins', sans-serif; letter-spacing: 0.5px; }
        .hero-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .feature-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(79,195,247,0.2); border-radius: 20px; padding: 36px 28px; transition: all 0.3s ease; position: relative; overflow: hidden; backdrop-filter: blur(10px); }
        .feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent); transform: scaleX(0); transition: transform 0.3s ease; }
        .feature-card:hover { transform: translateY(-8px); border-color: var(--accent); box-shadow: 0 20px 40px rgba(0,0,0,0.3); background: rgba(255,255,255,0.08); }
        .feature-card:hover::before { transform: scaleX(1); }
        .step-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(79,195,247,0.2); border-radius: 20px; padding: 36px; transition: all 0.3s ease; backdrop-filter: blur(10px); }
        .step-card:hover { transform: translateY(-5px); border-color: #4fc3f7; background: rgba(255,255,255,0.08); }
        .stat-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(79,195,247,0.2); border-radius: 16px; padding: 28px; text-align: center; transition: all 0.3s ease; backdrop-filter: blur(10px); }
        .stat-card:hover { background: rgba(79,195,247,0.1); border-color: #4fc3f7; transform: scale(1.05); }
        .nav-link { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 0.95rem; font-family: 'Poppins', sans-serif; transition: color 0.2s; cursor: pointer; font-weight: 500; }
        .nav-link:hover { color: #4fc3f7; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .floating { animation: float 6s ease-in-out infinite; }
        .gradient-text { background: linear-gradient(135deg, #4fc3f7, #ffffff, #29b6f6); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: gradient-shift 3s ease infinite; }
      `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <span style={{ fontSize: '1.8rem' }}>🆘</span>
            <span style={styles.logoText}>DRRMS</span>
          </div>
          <div style={styles.navLinks}>
            <span className="nav-link" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>Features</span>
            <span className="nav-link" onClick={() => document.getElementById('how').scrollIntoView({ behavior: 'smooth' })}>How it Works</span>
            <span className="nav-link" onClick={() => document.getElementById('stats').scrollIntoView({ behavior: 'smooth' })}>Impact</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="hero-btn" style={styles.navLogin} onClick={() => navigate('/login')}>Login</button>
            <button className="hero-btn" style={styles.navRegister} onClick={() => navigate('/register')}>Register Free</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroGrid} />
        <div style={styles.heroInner}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <span>🚨</span> Disaster Relief Platform
            </div>
            <h1 style={styles.heroTitle}>
              Getting Aid to Those<br />
              <span className="gradient-text">Who Need It Most</span>
            </h1>
            <p style={styles.heroSubtitle}>
              DRRMS connects donors, NGOs, and disaster victims through an intelligent resource
              matching system — ensuring the right help reaches the right people at the right time.
            </p>
            <div style={styles.heroBtns}>
              <button className="hero-btn" style={styles.btnPrimary} onClick={() => navigate('/register')}>Get Started Free →</button>
              <button className="hero-btn" style={styles.btnSecondary} onClick={() => navigate('/login')}>Login to Platform</button>
            </div>
            <div style={styles.heroNote}>
              <span style={{ color: '#4fc3f7' }}>✓</span> Free to use &nbsp;&nbsp;
              <span style={{ color: '#4fc3f7' }}>✓</span> No setup required &nbsp;&nbsp;
              <span style={{ color: '#4fc3f7' }}>✓</span> Real-time tracking
            </div>
          </div>

          <div style={styles.heroVisual} className="floating">
            <div style={styles.heroCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                <span style={{ color: '#4fc3f7', fontSize: '0.85rem', fontWeight: 600 }}>Live Matches</span>
                <span style={{ color: '#4caf50', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4caf50', display: 'inline-block' }} /> Active
                </span>
              </div>
              {[
                { victim: 'Suresh Kumar', resource: 'Food Kits', status: 'Delivered', color: '#4caf50' },
                { victim: 'Meena Devi', resource: 'Water Bottles', status: 'In Transit', color: '#29b6f6' },
                { victim: 'Lakshmi S', resource: 'Medicines', status: 'Pending', color: '#ff9800' },
              ].map((m, i) => (
                <div key={i} style={styles.heroMatchRow}>
                  <div>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>{m.victim}</div>
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>{m.resource}</div>
                  </div>
                  <span style={{ padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 500, background: m.color + '22', color: m.color, border: `1px solid ${m.color}44` }}>{m.status}</span>
                </div>
              ))}
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(79,195,247,0.1)', borderRadius: '10px', border: '1px solid rgba(79,195,247,0.2)' }}>
                <div style={{ color: '#4fc3f7', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Today's Impact</div>
                <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>47 Families Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={i} className="stat-card fade-in">
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#4fc3f7', fontFamily: 'Playfair Display' }}>{s.number}</div>
                <div style={{ color: '#aaa', fontSize: '0.95rem', marginTop: '8px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ ...styles.section, background: 'rgba(0,20,40,0.5)' }}>
        <div style={styles.container}>
          <div className="fade-in" style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Features</div>
            <h2 style={styles.sectionTitle}>Everything You Need for<br />Effective Disaster Relief</h2>
            <p style={styles.sectionSubtitle}>A complete platform built for real-world disaster response scenarios</p>
          </div>
          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} className="feature-card fade-in" style={{ '--accent': f.color }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={styles.section}>
        <div style={styles.container}>
          <div className="fade-in" style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Process</div>
            <h2 style={styles.sectionTitle}>How DRRMS Works</h2>
            <p style={styles.sectionSubtitle}>From registration to delivery in four simple steps</p>
          </div>
          <div style={styles.stepsGrid}>
            {steps.map((s, i) => (
              <div key={i} className="step-card fade-in">
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#4fc3f7', opacity: 0.4, fontFamily: 'Playfair Display', marginBottom: '8px' }}>{s.step}</div>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <div style={styles.container}>
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <h2 style={{ ...styles.sectionTitle, fontSize: '2.5rem' }}>Ready to Make a Difference?</h2>
            <p style={{ ...styles.sectionSubtitle, marginBottom: '40px' }}>
              Join NGOs and donors who are already using DRRMS to coordinate disaster relief effectively.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="hero-btn" style={styles.btnPrimary} onClick={() => navigate('/register')}>Register as Donor →</button>
              <button className="hero-btn" style={styles.btnSecondary} onClick={() => navigate('/register')}>Register as NGO</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={styles.logo}>
              <span style={{ fontSize: '1.3rem' }}>🆘</span>
              <span style={{ ...styles.logoText, fontSize: '1.1rem' }}>DRRMS</span>
            </div>
            <p style={{ color: '#555', fontSize: '0.85rem' }}>© 2026 Disaster Relief Resource Management System. Built for humanity.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <span className="nav-link" onClick={() => navigate('/login')}>Login</span>
              <span className="nav-link" onClick={() => navigate('/register')}>Register</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: { background: 'linear-gradient(135deg, #012a4a 0%, #013a63 25%, #01497c 50%, #013a63 75%, #012a4a 100%)', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' },
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(1,42,74,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(79,195,247,0.15)', padding: '0 24px' },
  navInner: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoText: { color: '#fff', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.5px' },
  navLinks: { display: 'flex', gap: '32px' },
  navLogin: { background: 'transparent', border: '1px solid rgba(79,195,247,0.4)', color: '#4fc3f7' },
  navRegister: { background: 'linear-gradient(135deg, #0288d1, #4fc3f7)', border: 'none', color: '#fff' },
  hero: { minHeight: '100vh', position: 'relative', overflow: 'hidden', backgroundImage: `url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(1,42,74,0.93) 0%, rgba(1,58,99,0.88) 50%, rgba(1,73,124,0.85) 100%)' },
  heroGrid: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(79,195,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' },
  heroInner: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', padding: '140px 24px 80px', position: 'relative', zIndex: 1 },
  heroContent: { flex: 1 },
  heroBadge: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(79,195,247,0.15)', border: '1px solid rgba(79,195,247,0.4)', borderRadius: '50px', padding: '8px 20px', color: '#4fc3f7', fontSize: '0.85rem', fontWeight: 500, marginBottom: '24px' },
  heroTitle: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '24px', fontFamily: 'Playfair Display' },
  heroSubtitle: { fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '520px' },
  heroBtns: { display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' },
  heroNote: { color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' },
  btnPrimary: { background: 'linear-gradient(135deg, #0288d1, #4fc3f7)', border: 'none', color: '#fff' },
  btnSecondary: { background: 'transparent', border: '1px solid rgba(79,195,247,0.5)', color: '#4fc3f7' },
  heroVisual: { flex: '0 0 360px' },
  heroCard: { background: 'rgba(1,42,74,0.8)', border: '1px solid rgba(79,195,247,0.3)', borderRadius: '20px', padding: '24px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' },
  heroMatchRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid rgba(79,195,247,0.1)' },
  section: { padding: '100px 24px', background: 'transparent' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  sectionHeader: { textAlign: 'center', marginBottom: '60px' },
  sectionBadge: { display: 'inline-block', background: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.3)', borderRadius: '50px', padding: '6px 20px', color: '#4fc3f7', fontSize: '0.8rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' },
  sectionTitle: { fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: '#fff', fontFamily: 'Playfair Display', marginBottom: '16px', lineHeight: 1.2 },
  sectionSubtitle: { color: '#888', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' },
  cta: { padding: '100px 24px', background: 'linear-gradient(135deg, rgba(1,42,74,0.9), rgba(2,136,209,0.3))', borderTop: '1px solid rgba(79,195,247,0.15)', borderBottom: '1px solid rgba(79,195,247,0.15)' },
  footer: { padding: '32px 24px', background: 'rgba(1,30,50,0.8)', borderTop: '1px solid rgba(79,195,247,0.1)' },
};

export default LandingPage;