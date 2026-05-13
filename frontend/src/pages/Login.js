import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FADE IN ANIMATION

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll('.fade-in')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();

  }, []);

  // LOGIN FUNCTION

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await loginUser({
        email,
        password
      });

      const {
        token,
        role,
        name,
        user_id
      } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('user_id', user_id);

      if (role === 'ngo') {
        navigate('/ngo-dashboard');
      }

      else if (role === 'donor') {
        navigate('/donor-dashboard');
      }

      else if (role === 'admin') {
        navigate('/admin-dashboard');
      }

    } catch (err) {

      setError('Invalid email or password');

    }

    setLoading(false);

  };

  return (

    <div style={styles.page}>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          font-family:'Poppins',sans-serif;
          overflow-x:hidden;
        }

        .fade-in{
          opacity:0;
          transform:translateY(30px);
          transition:all 0.8s ease;
        }

        .fade-in.visible{
          opacity:1;
          transform:translateY(0);
        }

        .glass-card{
          background:rgba(1,42,74,0.72);
          border:1px solid rgba(79,195,247,0.25);
          backdrop-filter:blur(20px);
          box-shadow:0 20px 60px rgba(0,0,0,0.35);
        }

        .input-box{
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(79,195,247,0.2);
          color:white;
          padding:14px 16px;
          border-radius:14px;
          transition:all 0.3s ease;
          width:100%;
          outline:none;
        }

        .input-box::placeholder{
          color:#8ea9c1;
        }

        .input-box:focus{
          border-color:#4fc3f7;
          box-shadow:0 0 0 4px rgba(79,195,247,0.15);
          background:rgba(255,255,255,0.08);
          transform:translateY(-2px);
        }

        .login-btn{
          background:linear-gradient(135deg,#0288d1,#4fc3f7);
          border:none;
          color:white;
          padding:14px;
          width:100%;
          border-radius:14px;
          font-weight:600;
          transition:all 0.3s ease;
        }

        .login-btn:hover{
          transform:translateY(-3px);
          box-shadow:0 12px 25px rgba(79,195,247,0.35);
        }

        .login-btn:disabled{
          opacity:0.7;
        }

        .register-link{
          color:#4fc3f7;
          text-decoration:none;
          font-weight:600;
          transition:0.3s ease;
        }

        .register-link:hover{
          color:white;
        }

        .floating{
          animation:float 5s ease-in-out infinite;
        }

        @keyframes float{
          0%,100%{
            transform:translateY(0px);
          }

          50%{
            transform:translateY(-15px);
          }
        }

        .pulse{
          animation:pulse 2s infinite;
        }

        @keyframes pulse{
          0%{
            box-shadow:0 0 0 0 rgba(79,195,247,0.5);
          }

          70%{
            box-shadow:0 0 0 20px rgba(79,195,247,0);
          }

          100%{
            box-shadow:0 0 0 0 rgba(79,195,247,0);
          }
        }

      `}</style>

      {/* BACKGROUND OVERLAY */}

      <div style={styles.overlay}></div>

      {/* GRID */}

      <div style={styles.grid}></div>

      {/* NAVBAR */}

      <nav style={styles.navbar}>

        <div style={styles.logoBox}>

          <span style={styles.logoEmoji}>
            🆘
          </span>

          <span style={styles.logoText}>
            DRRMS
          </span>

        </div>

        <button
          style={styles.backBtn}
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>

      </nav>

      {/* MAIN CONTENT */}

      <div style={styles.container}>

        {/* LEFT SIDE */}

        <div
          className="fade-in"
          style={styles.leftSection}
        >

          <div style={styles.badge}>
            🔐 Secure Disaster Relief Access
          </div>

          <h1 style={styles.heading}>
            Welcome Back to
            <br />

            <span style={styles.gradientText}>
              DRRMS Platform
            </span>
          </h1>

          <p style={styles.description}>
            Login to manage disaster relief operations,
            monitor live deliveries, coordinate with NGOs,
            and help resources reach victims faster.
          </p>

          {/* LIVE STATUS CARD */}

          <div
            className="glass-card floating"
            style={styles.infoCard}
          >

            <div style={styles.cardHeader}>

              <h5 style={{
                color:'#4fc3f7',
                margin:0
              }}>
                System Status
              </h5>

              <span style={styles.activeDot}>
                ● Active
              </span>

            </div>

            <div style={styles.statusRow}>
              <span>🚚 Deliveries Active</span>
              <strong>124</strong>
            </div>

            <div style={styles.statusRow}>
              <span>🏢 NGOs Connected</span>
              <strong>18</strong>
            </div>

            <div style={styles.statusRow}>
              <span>❤️ Victims Helped</span>
              <strong>500+</strong>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE LOGIN CARD */}

        <div
          className="fade-in"
          style={styles.rightSection}
        >

          <div
            className="glass-card"
            style={styles.loginCard}
          >

            <div style={{ textAlign:'center' }}>

              <div
                className="pulse"
                style={styles.loginIcon}
              >
                🔑
              </div>

              <h2 style={styles.loginTitle}>
                Login
              </h2>

              <p style={styles.loginSub}>
                Access your disaster management dashboard
              </p>

            </div>

            {

              error && (

                <div style={styles.errorBox}>
                  {error}
                </div>

              )

            }

            <form onSubmit={handleLogin}>

              <div style={{ marginBottom:'20px' }}>

                <label style={styles.label}>
                  Email Address
                </label>

                <input
                  type="email"
                  className="input-box"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

              <div style={{ marginBottom:'24px' }}>

                <label style={styles.label}>
                  Password
                </label>

                <input
                  type="password"
                  className="input-box"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >

                {
                  loading
                    ? 'Logging in...'
                    : 'Login to Dashboard'
                }

              </button>

            </form>

            <p style={styles.bottomText}>

              Don’t have an account?{' '}

              <Link
                to="/register"
                className="register-link"
              >
                Register here
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

const styles = {

  page: {
    minHeight:'100vh',
    position:'relative',
    overflow:'hidden',
    backgroundImage:
      "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop')",
    backgroundSize:'cover',
    backgroundPosition:'center',
    fontFamily:'Poppins, sans-serif'
  },

  overlay: {
    position:'absolute',
    inset:0,
    background:
      'linear-gradient(135deg, rgba(1,42,74,0.94), rgba(1,58,99,0.9), rgba(1,73,124,0.85))'
  },

  grid: {
    position:'absolute',
    inset:0,
    backgroundImage:
      'linear-gradient(rgba(79,195,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.03) 1px, transparent 1px)',
    backgroundSize:'60px 60px'
  },

  navbar: {
    position:'relative',
    zIndex:10,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'22px 50px'
  },

  logoBox: {
    display:'flex',
    alignItems:'center',
    gap:'12px'
  },

  logoEmoji: {
    fontSize:'1.8rem'
  },

  logoText: {
    color:'white',
    fontSize:'1.8rem',
    fontWeight:700,
    fontFamily:'Playfair Display'
  },

  backBtn: {
    background:'transparent',
    border:'1px solid rgba(79,195,247,0.4)',
    color:'#4fc3f7',
    padding:'12px 22px',
    borderRadius:'50px',
    cursor:'pointer',
    fontWeight:600,
    transition:'0.3s ease'
  },

  container: {
    position:'relative',
    zIndex:2,
    minHeight:'calc(100vh - 90px)',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    gap:'60px',
    maxWidth:'1250px',
    margin:'0 auto',
    padding:'20px 30px 60px'
  },

  leftSection: {
    flex:1,
    color:'white'
  },

  badge: {
    display:'inline-flex',
    alignItems:'center',
    gap:'8px',
    background:'rgba(79,195,247,0.12)',
    border:'1px solid rgba(79,195,247,0.35)',
    padding:'10px 20px',
    borderRadius:'50px',
    color:'#4fc3f7',
    marginBottom:'24px',
    fontWeight:500
  },

  heading: {
    fontSize:'4rem',
    lineHeight:1.1,
    fontWeight:800,
    marginBottom:'24px',
    fontFamily:'Playfair Display'
  },

  gradientText: {
    background:
      'linear-gradient(135deg,#4fc3f7,#ffffff,#29b6f6)',
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent'
  },

  description: {
    color:'rgba(255,255,255,0.72)',
    fontSize:'1.05rem',
    lineHeight:1.8,
    maxWidth:'580px',
    marginBottom:'40px'
  },

  infoCard: {
    padding:'28px',
    borderRadius:'24px',
    maxWidth:'420px'
  },

  cardHeader: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:'20px'
  },

  activeDot: {
    color:'#4caf50',
    fontWeight:600
  },

  statusRow: {
    display:'flex',
    justifyContent:'space-between',
    color:'white',
    padding:'14px 0',
    borderBottom:'1px solid rgba(255,255,255,0.08)'
  },

  rightSection: {
    flex:'0 0 430px'
  },

  loginCard: {
    borderRadius:'28px',
    padding:'40px'
  },

  loginIcon: {
    width:'80px',
    height:'80px',
    borderRadius:'50%',
    background:'rgba(79,195,247,0.15)',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize:'2rem',
    margin:'0 auto 20px',
    border:'1px solid rgba(79,195,247,0.35)'
  },

  loginTitle: {
    color:'white',
    fontSize:'2rem',
    fontWeight:700,
    marginBottom:'8px'
  },

  loginSub: {
    color:'#8ea9c1',
    marginBottom:'30px'
  },

  label: {
    color:'#dbefff',
    marginBottom:'8px',
    display:'block',
    fontWeight:500
  },

  errorBox: {
    background:'rgba(255,77,77,0.12)',
    border:'1px solid rgba(255,77,77,0.3)',
    color:'#ff8a8a',
    padding:'12px',
    borderRadius:'12px',
    marginBottom:'20px',
    textAlign:'center'
  },

  bottomText: {
    color:'#9db5cc',
    textAlign:'center',
    marginTop:'26px',
    fontSize:'0.95rem'
  }

};

export default Login;