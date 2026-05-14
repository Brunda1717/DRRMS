import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DonorDashboard() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    resource_type: '',
    quantity: '',
    location: '',
    status: 'available'
  });

  useEffect(() => {
    fetchDonations();

    const interval = setInterval(() => {
      fetchDonations();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/donations'
      );

      setDonations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const donationData = {
        donor_id: 1,
        resource_type: formData.resource_type,
        quantity: formData.quantity,
        location: formData.location
      };

      const response = await axios.post(
        'http://localhost:5000/api/donations/add-donation',
        donationData
      );

      alert(response.data.message);

      fetchDonations();

      setFormData({
        resource_type: '',
        quantity: '',
        location: '',
        status: 'available'
      });

    } catch (error) {
      console.log(error);
      alert('Failed to add donation');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const filteredDonations = donations.filter((d) => {
    if (statusFilter === 'all') return true;
    return d.status === statusFilter;
  });

  const totalCount = donations.length;

  const assignedCount = donations.filter(
    d => d.status === 'assigned'
  ).length;

  const deliveredCount = donations.filter(
    d => d.status === 'delivered'
  ).length;

  const availableCount = donations.filter(
    d => d.status === 'available'
  ).length;

  return (
    <div style={styles.page}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Audiowide&display=swap');

        *{
          font-family:'Outfit',sans-serif;
          box-sizing:border-box;
        }

        body{
          margin:0;
          padding:0;
          overflow-x:hidden;
          background:#070b1a;
        }

        /* BACKGROUND IMAGE */
        .bg-image{
          position:fixed;
          inset:0;
          background:
          linear-gradient(rgba(5,10,25,0.82),rgba(5,10,25,0.88)),
          url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop');
          background-size:cover;
          background-position:center;
          z-index:-3;
          animation:bgZoom 18s ease-in-out infinite alternate;
        }

        @keyframes bgZoom{
          from{
            transform:scale(1);
          }
          to{
            transform:scale(1.08);
          }
        }

        /* FLOATING ORBS */
        .orb{
          position:fixed;
          border-radius:50%;
          filter:blur(70px);
          opacity:0.35;
          z-index:-2;
          animation:float 12s ease-in-out infinite;
        }

        .orb1{
          width:320px;
          height:320px;
          background:#00d4ff;
          top:-80px;
          left:-80px;
        }

        .orb2{
          width:280px;
          height:280px;
          background:#7c4dff;
          bottom:-100px;
          right:-70px;
          animation-delay:2s;
        }

        .orb3{
          width:220px;
          height:220px;
          background:#00ff9d;
          top:40%;
          left:60%;
          animation-delay:4s;
        }

        @keyframes float{
          0%{
            transform:translateY(0px) translateX(0px);
          }
          50%{
            transform:translateY(-30px) translateX(20px);
          }
          100%{
            transform:translateY(0px) translateX(0px);
          }
        }

        /* GLASS CARD */
        .glass-card{
          background:rgba(255,255,255,0.06);
          backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,0.12);
          border-radius:28px;
          overflow:hidden;
          position:relative;
          transition:all 0.4s ease;
        }

        .glass-card::before{
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(
            120deg,
            rgba(255,255,255,0.12),
            transparent,
            rgba(255,255,255,0.05)
          );
          opacity:0;
          transition:0.5s;
        }

        .glass-card:hover::before{
          opacity:1;
        }

        .glass-card:hover{
          transform:translateY(-10px) scale(1.01);
          box-shadow:0 25px 60px rgba(0,0,0,0.45);
          border-color:rgba(0,212,255,0.4);
        }

        /* HEADER */
        .dashboard-title{
          font-family:'Audiowide',sans-serif;
          font-size:3rem;
          color:white;
          margin:0;
          letter-spacing:2px;
          text-shadow:0 0 18px rgba(0,212,255,0.4);
          animation:glowPulse 2s infinite alternate;
        }

        @keyframes glowPulse{
          from{
            text-shadow:0 0 10px rgba(0,212,255,0.3);
          }
          to{
            text-shadow:0 0 30px rgba(0,212,255,0.8);
          }
        }

        .subtitle{
          color:rgba(255,255,255,0.7);
          margin-top:10px;
          font-size:1rem;
          display:flex;
          align-items:center;
          gap:10px;
        }

        .pulse-dot{
          width:10px;
          height:10px;
          border-radius:50%;
          background:#00d4ff;
          animation:pulse 1.8s infinite;
        }

        @keyframes pulse{
          0%{
            box-shadow:0 0 0 0 rgba(0,212,255,0.6);
          }
          70%{
            box-shadow:0 0 0 14px rgba(0,212,255,0);
          }
          100%{
            box-shadow:0 0 0 0 rgba(0,212,255,0);
          }
        }

        /* BUTTONS */
        .fancy-btn{
          border:none;
          border-radius:50px;
          padding:12px 28px;
          color:white;
          font-weight:700;
          cursor:pointer;
          position:relative;
          overflow:hidden;
          transition:0.35s;
        }

        .fancy-btn::before{
          content:'';
          position:absolute;
          top:0;
          left:-100%;
          width:100%;
          height:100%;
          background:linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.4),
            transparent
          );
          transition:0.7s;
        }

        .fancy-btn:hover::before{
          left:100%;
        }

        .fancy-btn:hover{
          transform:translateY(-4px) scale(1.03);
        }

        .logout-btn{
          background:linear-gradient(135deg,#ff4d6d,#ff758f);
        }

        .submit-btn{
          background:linear-gradient(135deg,#00c6ff,#0072ff);
          box-shadow:0 10px 25px rgba(0,114,255,0.35);
        }

        /* ACTION CARDS */
        .action-card{
          cursor:pointer;
          transition:0.4s;
          position:relative;
          overflow:hidden;
        }

        .action-card::after{
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(
            120deg,
            rgba(255,255,255,0.12),
            transparent
          );
          opacity:0;
          transition:0.4s;
        }

        .action-card:hover::after{
          opacity:1;
        }

        .action-card:hover{
          transform:translateY(-12px) scale(1.02);
        }

        .action-icon{
          font-size:3rem;
          margin-bottom:12px;
          animation:floatIcon 3s ease-in-out infinite;
        }

        @keyframes floatIcon{
          0%{transform:translateY(0);}
          50%{transform:translateY(-8px);}
          100%{transform:translateY(0);}
        }

        /* METRIC CARDS */
        .metric-card{
          position:relative;
          overflow:hidden;
        }

        .metric-card::before{
          content:'';
          position:absolute;
          width:180px;
          height:180px;
          border-radius:50%;
          background:rgba(255,255,255,0.12);
          top:-70px;
          right:-60px;
        }

        .metric-number{
          font-size:3rem;
          font-weight:800;
          color:white;
          margin-top:10px;
        }

        /* FORM */
        .custom-input{
          width:100%;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.12);
          color:white;
          border-radius:16px;
          padding:14px;
          outline:none;
          transition:0.3s;
        }

        .custom-input:focus{
          border-color:#00d4ff;
          box-shadow:0 0 0 4px rgba(0,212,255,0.15);
          transform:scale(1.01);
        }

        .custom-input::placeholder{
          color:rgba(255,255,255,0.4);
        }

        .custom-input option{
          background:#091120;
          color:white;
        }

        .form-label{
          color:rgba(255,255,255,0.85);
          margin-bottom:8px;
          font-weight:600;
        }

        /* TABLE */
        .donor-table{
          width:100%;
          border-collapse:separate;
          border-spacing:0 10px;
        }

        .donor-table thead th{
          background:rgba(0,212,255,0.12);
          color:#9be8ff;
          padding:16px;
          font-size:0.9rem;
          border:none;
        }

        .donor-table tbody tr{
          transition:0.3s;
        }

        .donor-table tbody tr:hover{
          transform:scale(1.01);
        }

        .donor-table tbody td{
          background:rgba(255,255,255,0.05);
          color:white;
          padding:16px;
        }

        /* ACTIVITY */
        .activity-item{
          background:rgba(255,255,255,0.04);
          border-radius:18px;
          transition:0.35s;
          border:1px solid rgba(255,255,255,0.05);
        }

        .activity-item:hover{
          transform:translateX(8px);
          background:rgba(0,212,255,0.08);
        }

        /* BADGES */
        .status-badge{
          padding:8px 16px;
          border-radius:30px;
          font-size:0.8rem;
          font-weight:700;
          text-transform:uppercase;
        }

        /* FADE */
        .fade-in{
          animation:fadeUp 0.8s ease;
        }

        @keyframes fadeUp{
          from{
            opacity:0;
            transform:translateY(30px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        /* SCROLL */
        ::-webkit-scrollbar{
          width:6px;
        }

        ::-webkit-scrollbar-thumb{
          background:#00d4ff;
          border-radius:20px;
        }
      `}</style>

      <div className="bg-image"></div>
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <div className="container-fluid p-4 fade-in">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">

          <div>
            <h1 className="dashboard-title">
              DONOR HUB
            </h1>

            <div className="subtitle">
              <span className="pulse-dot"></span>
              Real-time disaster relief contribution & tracking
            </div>
          </div>

          <button
            className="fancy-btn logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* ACTION CARDS */}
        <div className="row mb-4">

          <div className="col-md-6 mb-3">

            <div
              className="glass-card action-card p-4"
              style={{
                background:
                  'linear-gradient(135deg,#0f2027,#203a43,#2c5364)'
              }}
              onClick={() => navigate('/map')}
            >

              <div className="action-icon">
                🗺
              </div>

              <h3 className="text-white fw-bold">
                Open Live Map
              </h3>

              <p className="text-light mb-0">
                Track donation delivery routes & hotspot areas
              </p>

            </div>

          </div>

          <div className="col-md-6 mb-3">

            <div
              className="glass-card action-card p-4"
              style={{
                background:
                  'linear-gradient(135deg,#11998e,#38ef7d)'
              }}
              onClick={() => navigate('/donate')}
            >

              <div className="action-icon">
                📦
              </div>

              <h3 className="text-white fw-bold">
                Donate Resources
              </h3>

              <p className="text-light mb-0">
                Add relief resources for disaster victims
              </p>

            </div>

          </div>

        </div>

        {/* METRICS */}
        <div className="row mb-4">

          <div className="col-md-3 mb-3">
            <div
              className="glass-card metric-card p-4"
              style={{
                background:
                  'linear-gradient(135deg,#4568dc,#b06ab3)'
              }}
            >
              <h6 className="text-light">
                Total Donations
              </h6>

              <div className="metric-number">
                {totalCount}
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="glass-card metric-card p-4"
              style={{
                background:
                  'linear-gradient(135deg,#11998e,#38ef7d)'
              }}
            >
              <h6 className="text-light">
                Available
              </h6>

              <div className="metric-number">
                {availableCount}
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="glass-card metric-card p-4"
              style={{
                background:
                  'linear-gradient(135deg,#f7971e,#ffd200)'
              }}
            >
              <h6 className="text-light">
                Assigned
              </h6>

              <div className="metric-number">
                {assignedCount}
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="glass-card metric-card p-4"
              style={{
                background:
                  'linear-gradient(135deg,#00c6ff,#0072ff)'
              }}
            >
              <h6 className="text-light">
                Delivered
              </h6>

              <div className="metric-number">
                {deliveredCount}
              </div>
            </div>
          </div>

        </div>

        {/* ADD DONATION FORM */}
        <div className="glass-card p-4 mb-4">

          <h3 className="text-white fw-bold mb-4">
            ➕ Add New Donation
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Resource Type
                </label>

                <select
                  className="custom-input"
                  name="resource_type"
                  value={formData.resource_type}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Resource
                  </option>

                  <option value="Food Kits">
                    Food Kits
                  </option>

                  <option value="Water Bottles">
                    Water Bottles
                  </option>

                  <option value="Medicines">
                    Medicines
                  </option>

                  <option value="Blankets">
                    Blankets
                  </option>

                  <option value="Clothes">
                    Clothes
                  </option>

                  <option value="Shelter Kits">
                    Shelter Kits
                  </option>

                </select>

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Quantity
                </label>

                <input
                  type="number"
                  className="custom-input"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Location
                </label>

                <input
                  type="text"
                  className="custom-input"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="fancy-btn submit-btn mt-3"
            >
              ✨ Submit Donation
            </button>

          </form>

        </div>

        {/* LIVE FEED */}
        <div className="glass-card p-4 mb-4">

          <h3 className="text-white fw-bold mb-4">
            🔥 Live Donation Feed
          </h3>

          <div style={{
            maxHeight: '320px',
            overflowY: 'auto'
          }}>

            {donations.slice(0, 8).map((d, index) => (

              <div
                key={index}
                className="activity-item p-3 mb-3"
              >

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                  <div>

                    <h5 className="text-white fw-bold mb-1">
                      {d.resource_type}
                    </h5>

                    <p className="text-light mb-1">
                      Qty: {d.quantity} · 📍 {d.location}
                    </p>

                    <small style={{
                      color: '#8fdfff'
                    }}>
                      {d.created_at
                        ? new Date(d.created_at).toLocaleString()
                        : 'N/A'}
                    </small>

                  </div>

                  <span
                    className="status-badge"
                    style={{
                      background:
                        d.status === 'available'
                          ? 'rgba(0,255,157,0.15)'
                          : d.status === 'assigned'
                          ? 'rgba(255,208,0,0.15)'
                          : 'rgba(0,212,255,0.15)',

                      color:
                        d.status === 'available'
                          ? '#00ff9d'
                          : d.status === 'assigned'
                          ? '#ffd000'
                          : '#00d4ff'
                    }}
                  >
                    {d.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* FILTER */}
        <div className="glass-card p-4 mb-4">

          <h3 className="text-white fw-bold mb-4">
            🔍 Filter Donations
          </h3>

          <div className="row">

            <div className="col-md-4">

              <select
                className="custom-input"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >

                <option value="all">
                  All Donations
                </option>

                <option value="available">
                  Available
                </option>

                <option value="assigned">
                  Assigned
                </option>

                <option value="delivered">
                  Delivered
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* TABLE */}
        <div className="glass-card p-4">

          <h3 className="text-white fw-bold mb-4">
            🚚 Donation Records
          </h3>

          <div className="table-responsive">

            <table className="donor-table">

              <thead>

                <tr>
                  <th>Resource</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {filteredDonations.map((d, index) => (

                  <tr key={index}>

                    <td>
                      {d.resource_type}
                    </td>

                    <td>
                      {d.quantity}
                    </td>

                    <td>
                      📍 {d.location}
                    </td>

                    <td>

                      <span
                        className="status-badge"
                        style={{
                          background:
                            d.status === 'available'
                              ? 'rgba(0,255,157,0.15)'
                              : d.status === 'assigned'
                              ? 'rgba(255,208,0,0.15)'
                              : 'rgba(0,212,255,0.15)',

                          color:
                            d.status === 'available'
                              ? '#00ff9d'
                              : d.status === 'assigned'
                              ? '#ffd000'
                              : '#00d4ff'
                        }}
                      >
                        {d.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  }
};

export default DonorDashboard;