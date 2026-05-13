import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
    location: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // ANIMATION

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

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // HANDLE REGISTER

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await registerUser(formData);

      setSuccess(
        'Registration successful! Redirecting to login...'
      );

      setTimeout(() => {

        navigate('/login');

      }, 2000);

    } catch (err) {

      setError(
        'Registration failed. Email may already exist.'
      );

    }

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
          width:100%;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(79,195,247,0.2);
          color:white;
          padding:14px 16px;
          border-radius:14px;
          outline:none;
          transition:all 0.3s ease;
        }

        .input-box::placeholder{
          color:#8ea9c1;
        }

        .input-box:focus{
          border-color:#4fc3f7;
          background:rgba(255,255,255,0.08);
          transform:translateY(-2px);
          box-shadow:0 0 0 4px rgba(79,195,247,0.12);
        }

        .register-btn{
          width:100%;
          padding:14px;
          border:none;
          border-radius:14px;
          background:linear-gradient(135deg,#0288d1,#4fc3f7);
          color:white;
          font-weight:600;
          transition:all 0.3s ease;
        }

        .register-btn:hover{
          transform:translateY(-3px);
          box-shadow:0 12px 25px rgba(79,195,247,0.35);
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

        .role-card{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(79,195,247,0.15);
          border-radius:16px;
          padding:14px;
          transition:0.3s ease;
        }

        .role-card:hover{
          transform:translateY(-5px);
          border-color:#4fc3f7;
          background:rgba(79,195,247,0.08);
        }

        .login-link{
          color:#4fc3f7;
          text-decoration:none;
          font-weight:600;
          transition:0.3s ease;
        }

        .login-link:hover{
          color:white;
        }

      `}</style>

      {/* OVERLAY */}

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

      {/* MAIN CONTAINER */}

      <div style={styles.container}>

        {/* LEFT SECTION */}

        <div
          className="fade-in"
          style={styles.leftSection}
        >

          <div style={styles.badge}>
            🚀 Join Disaster Relief Network
          </div>

          <h1 style={styles.heading}>
            Become a Part of
            <br />

            <span style={styles.gradientText}>
              DRRMS Community
            </span>

          </h1>

          <p style={styles.description}>
            Register as a donor, NGO, or administrator
            and help coordinate disaster relief operations
            with real-time tracking, intelligent matching,
            and resource management.
          </p>

          {/* ROLE CARDS */}

          <div
            className="glass-card floating"
            style={styles.infoCard}
          >

            <h4 style={styles.cardTitle}>
              Platform Roles
            </h4>

            <div style={styles.rolesGrid}>

              <div className="role-card">

                <div style={styles.roleIcon}>
                  ❤️
                </div>

                <h5 style={styles.roleTitle}>
                  Donor
                </h5>

                <p style={styles.roleDesc}>
                  Donate resources and track deliveries.
                </p>

              </div>

              <div className="role-card">

                <div style={styles.roleIcon}>
                  🏢
                </div>

                <h5 style={styles.roleTitle}>
                  NGO
                </h5>

                <p style={styles.roleDesc}>
                  Register victims and manage requests.
                </p>

              </div>

              <div className="role-card">

                <div style={styles.roleIcon}>
                  📊
                </div>

                <h5 style={styles.roleTitle}>
                  Admin
                </h5>

                <p style={styles.roleDesc}>
                  Monitor analytics and deliveries.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div
          className="fade-in"
          style={styles.rightSection}
        >

          <div
            className="glass-card"
            style={styles.registerCard}
          >

            <div style={{ textAlign:'center' }}>

              <div
                className="pulse"
                style={styles.registerIcon}
              >
                ✨
              </div>

              <h2 style={styles.registerTitle}>
                Create Account
              </h2>

              <p style={styles.registerSub}>
                Start your disaster relief journey today
              </p>

            </div>

            {

              error && (

                <div style={styles.errorBox}>
                  {error}
                </div>

              )

            }

            {

              success && (

                <div style={styles.successBox}>
                  {success}
                </div>

              )

            }

            <form onSubmit={handleRegister}>

              <div style={{ marginBottom:'18px' }}>

                <label style={styles.label}>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="input-box"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div style={{ marginBottom:'18px' }}>

                <label style={styles.label}>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className="input-box"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div style={{ marginBottom:'18px' }}>

                <label style={styles.label}>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="input-box"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <div style={{ marginBottom:'18px' }}>

                <label style={styles.label}>
                  Select Role
                </label>

                <select
                  name="role"
                  className="input-box"
                  value={formData.role}
                  onChange={handleChange}
                >

                  <option value="donor">
                    Donor
                  </option>

                  <option value="ngo">
                    NGO
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>

              <div style={{ marginBottom:'24px' }}>

                <label style={styles.label}>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  className="input-box"
                  placeholder="Enter your city"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                type="submit"
                className="register-btn"
              >
                Create Account
              </button>

            </form>

            <p style={styles.bottomText}>

              Already have an account?{' '}

              <Link
                to="/login"
                className="login-link"
              >
                Login here
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
      "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1600&auto=format&fit=crop')",
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
    maxWidth:'1280px',
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
    maxWidth:'520px'
  },

  cardTitle: {
    color:'#4fc3f7',
    marginBottom:'24px',
    fontWeight:700
  },

  rolesGrid: {
    display:'grid',
    gridTemplateColumns:'1fr',
    gap:'16px'
  },

  roleIcon: {
    fontSize:'2rem',
    marginBottom:'10px'
  },

  roleTitle: {
    color:'white',
    marginBottom:'8px'
  },

  roleDesc: {
    color:'#9db5cc',
    fontSize:'0.9rem',
    lineHeight:1.6
  },

  rightSection: {
    flex:'0 0 470px'
  },

  registerCard: {
    borderRadius:'28px',
    padding:'40px'
  },

  registerIcon: {
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

  registerTitle: {
    color:'white',
    fontSize:'2rem',
    fontWeight:700,
    marginBottom:'8px'
  },

  registerSub: {
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

  successBox: {
    background:'rgba(76,175,80,0.12)',
    border:'1px solid rgba(76,175,80,0.3)',
    color:'#81ff9b',
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

export default Register;