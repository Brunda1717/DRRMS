import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NGODashboard() {
  const navigate = useNavigate();
  const [victims, setVictims] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    proof_id: '',
    phone: '',
    address: '',
    disaster_area: '',
    family_size: '',
    priority_level: 'medium'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVictims([...victims, formData]);
    setFormData({
      name: '',
      proof_id: '',
      phone: '',
      address: '',
      disaster_area: '',
      family_size: '',
      priority_level: 'medium'
    });
    alert('Victim registered successfully!');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#e74c3c' }}>NGO Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-danger p-3 text-center">
            <h5>Total Victims</h5>
            <h2>{victims.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning p-3 text-center">
            <h5>Pending Requests</h5>
            <h2>0</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success p-3 text-center">
            <h5>Delivered</h5>
            <h2>0</h2>
          </div>
        </div>
      </div>

      <div className="card p-4 shadow mb-4">
        <h4 className="mb-3">Register New Victim</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Victim Name</label>
              <input type="text" className="form-control"
                name="name" value={formData.name}
                onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Proof ID</label>
              <input type="text" className="form-control"
                name="proof_id" value={formData.proof_id}
                onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control"
                name="phone" value={formData.phone}
                onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Disaster Area</label>
              <input type="text" className="form-control"
                name="disaster_area" value={formData.disaster_area}
                onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Family Size</label>
              <input type="number" className="form-control"
                name="family_size" value={formData.family_size}
                onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Priority Level</label>
              <select className="form-select"
                name="priority_level" value={formData.priority_level}
                onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control"
                name="address" value={formData.address}
                onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-danger">
            Register Victim
          </button>
        </form>
      </div>

      {victims.length > 0 && (
        <div className="card p-4 shadow">
          <h4 className="mb-3">Registered Victims</h4>
          <table className="table table-striped">
            <thead className="table-danger">
              <tr>
                <th>Name</th>
                <th>Disaster Area</th>
                <th>Family Size</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {victims.map((v, index) => (
                <tr key={index}>
                  <td>{v.name}</td>
                  <td>{v.disaster_area}</td>
                  <td>{v.family_size}</td>
                  <td>
                    <span className={`badge bg-${
                      v.priority_level === 'critical' ? 'danger' :
                      v.priority_level === 'high' ? 'warning' :
                      v.priority_level === 'medium' ? 'info' : 'success'
                    }`}>
                      {v.priority_level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NGODashboard;