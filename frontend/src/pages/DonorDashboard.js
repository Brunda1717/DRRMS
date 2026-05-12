import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DonorDashboard() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    resource_type: '',
    quantity: '',
    location: '',
    status: 'available'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDonations([...donations, formData]);
    setFormData({
      resource_type: '',
      quantity: '',
      location: '',
      status: 'available'
    });
    alert('Donation added successfully!');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#27ae60' }}>Donor Dashboard</h2>
        <button className="btn btn-outline-success" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-success p-3 text-center">
            <h5>Total Donations</h5>
            <h2>{donations.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning p-3 text-center">
            <h5>Assigned</h5>
            <h2>{donations.filter(d => d.status === 'assigned').length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info p-3 text-center">
            <h5>Delivered</h5>
            <h2>{donations.filter(d => d.status === 'delivered').length}</h2>
          </div>
        </div>
      </div>

      <div className="card p-4 shadow mb-4">
        <h4 className="mb-3">Add New Donation</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Resource Type</label>
              <select className="form-select"
                name="resource_type" value={formData.resource_type}
                onChange={handleChange} required>
                <option value="">Select Resource</option>
                <option value="Food Kits">Food Kits</option>
                <option value="Water Bottles">Water Bottles</option>
                <option value="Medicines">Medicines</option>
                <option value="Blankets">Blankets</option>
                <option value="Clothes">Clothes</option>
                <option value="Shelter Kits">Shelter Kits</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Quantity</label>
              <input type="number" className="form-control"
                name="quantity" value={formData.quantity}
                onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Location</label>
              <input type="text" className="form-control"
                name="location" value={formData.location}
                placeholder="Enter your city"
                onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Add Donation
          </button>
        </form>
      </div>

      {donations.length > 0 && (
        <div className="card p-4 shadow">
          <h4 className="mb-3">My Donations</h4>
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Resource Type</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d, index) => (
                <tr key={index}>
                  <td>{d.resource_type}</td>
                  <td>{d.quantity}</td>
                  <td>{d.location}</td>
                  <td>
                    <span className={`badge bg-${
                      d.status === 'available' ? 'success' :
                      d.status === 'assigned' ? 'warning' : 'info'
                    }`}>
                      {d.status}
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

export default DonorDashboard;