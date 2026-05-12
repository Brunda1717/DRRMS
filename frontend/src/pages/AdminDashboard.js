import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  getMatches,
  updateMatchStatus,
  getAnalytics
} from '../services/api';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

function AdminDashboard() {

  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);

  const [analytics, setAnalytics] = useState({});

  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {

    fetchMatches();

    fetchAnalytics();

    const interval = setInterval(() => {

      fetchMatches();

      fetchAnalytics();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  // Fetch matches
  const fetchMatches = async () => {

    try {

      const res = await getMatches();

      setMatches(res.data);

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  // Fetch analytics
  const fetchAnalytics = async () => {

    try {

      const res = await getAnalytics();

      setAnalytics(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // Update status
  const handleStatusChange = async (
    matchId,
    newStatus
  ) => {

    try {

      await updateMatchStatus(
        matchId,
        {
          delivery_status: newStatus
        }
      );

      fetchMatches();

      fetchAnalytics();

    } catch (err) {

      console.log(err);

      alert('Failed to update status');

    }

  };

  // Logout
  const handleLogout = () => {

    localStorage.clear();

    navigate('/');

  };

  // Pie Chart Data
  const pieData = [

    {
      name: 'Delivered',
      value: analytics.delivered || 0
    },

    {
      name: 'Pending',
      value: analytics.pending || 0
    }

  ];

  // Bar Chart Data
  const barData = [

    {
      name: 'Donors',
      count: analytics.totalDonors || 0
    },

    {
      name: 'NGOs',
      count: analytics.totalNGOs || 0
    },

    {
      name: 'Victims',
      count: analytics.totalVictims || 0
    },

    {
      name: 'Donations',
      count: analytics.totalDonations || 0
    },

    {
      name: 'Requests',
      count: analytics.totalRequests || 0
    },

    {
      name: 'Matches',
      count: analytics.totalMatches || 0
    }

  ];

  const COLORS = [
    '#00c6ff',
    '#ff9800'
  ];

  return (

    <div
      className="container-fluid p-4 min-vh-100"
      style={{
        background:
          'linear-gradient(135deg, #141e30, #243b55)'
      }}
    >

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h1
            className="fw-bold text-white"
            style={{
              letterSpacing: '1px'
            }}
          >
            DRRMS Admin Dashboard
          </h1>

          <p className="text-light">
            Disaster Resource Monitoring & Analytics
          </p>

        </div>

        <button
          className="btn btn-light px-4 fw-bold"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* Analytics Cards */}

      <div className="row mb-4">

        <div className="col-md-3 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #36d1dc, #5b86e5)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Total Donors</h5>

              <h1 className="fw-bold">
                {analytics.totalDonors || 0}
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #11998e, #38ef7d)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Total NGOs</h5>

              <h1 className="fw-bold">
                {analytics.totalNGOs || 0}
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #ff416c, #ff4b2b)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Total Victims</h5>

              <h1 className="fw-bold">
                {analytics.totalVictims || 0}
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #654ea3, #eaafc8)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Total Matches</h5>

              <h1 className="fw-bold">
                {analytics.totalMatches || 0}
              </h1>

            </div>

          </div>

        </div>

      </div>

      {/* Charts */}

      <div className="row mb-4">

        {/* Pie Chart */}

        <div className="col-md-5 mb-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: '20px'
            }}
          >

            <h4 className="mb-3 text-center fw-bold">
              Delivery Status
            </h4>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {
                    pieData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))
                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar Chart */}

        <div className="col-md-7 mb-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: '20px'
            }}
          >

            <h4 className="mb-3 text-center fw-bold">
              System Statistics
            </h4>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="count"
                  fill="#6a11cb"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Match Table */}

      <div
        className="card border-0 shadow-lg p-4"
        style={{
          borderRadius: '20px'
        }}
      >

        <h4 className="mb-4 fw-bold">
          Live Match Tracking
        </h4>

        {

          loading ? (

            <div className="text-center">

              <p>Loading matches...</p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead
                  style={{
                    background: '#141e30',
                    color: 'white'
                  }}
                >

                  <tr>

                    <th>ID</th>

                    <th>Victim</th>

                    <th>Donor</th>

                    <th>Resource</th>

                    <th>Priority</th>

                    <th>Quantity</th>

                    <th>Status</th>

                    <th>Matched Time</th>

                    <th>Update</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    matches.map((m, index) => (

                      <tr key={index}>

                        <td>{m.match_id}</td>

                        <td>{m.victim_name}</td>

                        <td>{m.donor_name}</td>

                        <td>{m.resource_type}</td>

                        <td>

                          <span className={`badge bg-${
                            m.priority_level === 'critical'
                              ? 'danger'
                              : m.priority_level === 'high'
                              ? 'warning'
                              : m.priority_level === 'medium'
                              ? 'info'
                              : 'success'
                          }`}>

                            {m.priority_level}

                          </span>

                        </td>

                        <td>{m.matched_quantity}</td>

                        <td>

                          <span className={`badge bg-${
                            m.delivery_status === 'delivered'
                              ? 'success'
                              : m.delivery_status === 'in_transit'
                              ? 'info'
                              : 'warning'
                          }`}>

                            {m.delivery_status}

                          </span>

                        </td>

                        <td>

                          {
                            m.matched_at
                              ? new Date(
                                  m.matched_at
                                ).toLocaleString()
                              : 'N/A'
                          }

                        </td>

                        <td>

                          <select
                            className="form-select form-select-sm"
                            value={m.delivery_status}
                            onChange={(e) =>
                              handleStatusChange(
                                m.match_id,
                                e.target.value
                              )
                            }
                          >

                            <option value="pending">
                              Pending
                            </option>

                            <option value="in_transit">
                              In Transit
                            </option>

                            <option value="delivered">
                              Delivered
                            </option>

                          </select>

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

            </div>

          )

        }

      </div>

    </div>

  );
}

export default AdminDashboard;