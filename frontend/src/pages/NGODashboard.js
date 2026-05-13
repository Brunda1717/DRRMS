import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerVictim, getVictims } from '../services/api';

function NGODashboard() {

  const navigate = useNavigate();

  const ngo_id = localStorage.getItem('user_id');

  const name = localStorage.getItem('name');

  const [victims, setVictims] = useState([]);

  const [loading, setLoading] = useState(true);

  const [priorityFilter, setPriorityFilter] = useState('all');

  const [ngoFilter, setNgoFilter] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    proof_id: '',
    phone: '',
    address: '',
    disaster_area: '',
    family_size: '',
    priority_level: 'medium'
  });

  useEffect(() => {
    fetchVictims();
  }, []);

  const fetchVictims = async () => {

    try {

      const res = await getVictims();

      setVictims(res.data);

    } catch (err) {

      console.error('Error fetching victims:', err);

    }

    setLoading(false);

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

      await registerVictim({
        ...formData,
        ngo_id
      });

      alert('Victim registered successfully!');

      setFormData({
        name: '',
        proof_id: '',
        phone: '',
        address: '',
        disaster_area: '',
        family_size: '',
        priority_level: 'medium'
      });

      fetchVictims();

    } catch (err) {

      alert('Error registering victim');

    }

  };

  const handleLogout = () => {

    localStorage.clear();

    navigate('/');

  };

  const critical = victims.filter(
    v => v.priority_level === 'critical'
  ).length;

  const high = victims.filter(
    v => v.priority_level === 'high'
  ).length;

  // FILTERED VICTIMS

  const filteredVictims = victims.filter((v) => {

    const priorityMatch =
      priorityFilter === 'all'
        ? true
        : v.priority_level === priorityFilter;

    const ngoMatch =
      ngoFilter === ''
        ? true
        : v.ngo_name
            ?.toLowerCase()
            .includes(
              ngoFilter.toLowerCase()
            );

    return priorityMatch && ngoMatch;

  });

  return (

    <div
      className="container-fluid min-vh-100 p-4"
      style={{
        background:
          'linear-gradient(135deg, #141e30, #243b55)'
      }}
    >

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="text-white fw-bold">
            NGO Dashboard — {name}
          </h2>

          <p className="text-light">
            Disaster Victim Management System
          </p>

        </div>

        <button
          className="btn btn-light fw-bold"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* ACTION BUTTONS */}

      <div className="row mb-4">

        <div className="col-md-6 mb-3">

          <div
            className="card border-0 shadow-lg text-center p-4 h-100"
            style={{
              borderRadius: '20px',
              background:
                'linear-gradient(135deg, #11998e, #38ef7d)',
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/request')}
          >

            <h4 className="fw-bold mb-2">
              Create Resource Request
            </h4>

            <p className="mb-0">
              Request emergency resources for victims
            </p>

          </div>

        </div>

        <div className="col-md-6 mb-3">

          <div
            className="card border-0 shadow-lg text-center p-4 h-100"
            style={{
              borderRadius: '20px',
              background:
                'linear-gradient(135deg, #396afc, #2948ff)',
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/map')}
          >

            <h4 className="fw-bold mb-2">
              Open Disaster Map
            </h4>

            <p className="mb-0">
              Track hotspots and delivery routes
            </p>

          </div>

        </div>

      </div>

      {/* ANALYTICS CARDS */}

      <div className="row mb-4">

        <div className="col-md-4 mb-3">

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

              <h1>{victims.length}</h1>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #f7971e, #ffd200)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Critical Cases</h5>

              <h1>{critical}</h1>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #36d1dc, #5b86e5)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>High Priority</h5>

              <h1>{high}</h1>

            </div>

          </div>

        </div>

      </div>

      {/* REGISTER FORM */}

      <div
        className="card border-0 shadow-lg p-4 mb-4"
        style={{
          borderRadius: '20px'
        }}
      >

        <h4 className="mb-4 fw-bold">
          Register New Victim
        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Victim Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Proof ID
              </label>

              <input
                type="text"
                className="form-control"
                name="proof_id"
                value={formData.proof_id}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Phone
              </label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Disaster Area
              </label>

              <input
                type="text"
                className="form-control"
                name="disaster_area"
                value={formData.disaster_area}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Family Size
              </label>

              <input
                type="number"
                className="form-control"
                name="family_size"
                value={formData.family_size}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Priority Level
              </label>

              <select
                className="form-select"
                name="priority_level"
                value={formData.priority_level}
                onChange={handleChange}
              >

                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>

              </select>

            </div>

            <div className="col-12 mb-3">

              <label className="form-label">
                Address
              </label>

              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-danger px-4"
          >
            Register Victim
          </button>

        </form>

      </div>

      {/* VICTIMS TABLE */}

      <div
        className="card border-0 shadow-lg p-4"
        style={{
          borderRadius: '20px'
        }}
      >

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4 className="fw-bold">
            All Registered Victims
          </h4>

          <div className="d-flex gap-2">

            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >

              <option value="all">
                All Priorities
              </option>

              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>

              <option value="critical">
                Critical
              </option>

            </select>

            <input
              type="text"
              className="form-control"
              placeholder="Search NGO"
              value={ngoFilter}
              onChange={(e) =>
                setNgoFilter(e.target.value)
              }
            />

          </div>

        </div>

        {

          loading ? (

            <p>Loading victims...</p>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>Name</th>

                    <th>Disaster Area</th>

                    <th>Family Size</th>

                    <th>Priority</th>

                    <th>NGO</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    filteredVictims.map((v, index) => (

                      <tr key={index}>

                        <td>{v.name}</td>

                        <td>{v.disaster_area}</td>

                        <td>{v.family_size}</td>

                        <td>

                          <span className={`badge bg-${
                            v.priority_level === 'critical'
                              ? 'danger'
                              : v.priority_level === 'high'
                              ? 'warning'
                              : v.priority_level === 'medium'
                              ? 'info'
                              : 'success'
                          }`}>

                            {v.priority_level}

                          </span>

                        </td>

                        <td>{v.ngo_name}</td>

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

export default NGODashboard;