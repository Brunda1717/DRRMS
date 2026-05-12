import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([
    { match_id: 1, victim_name: 'Suresh Kumar', donor_name: 'Amit Shah', resource_type: 'Food Kits', matched_quantity: 10, delivery_status: 'pending' },
    { match_id: 2, victim_name: 'Meena Devi', donor_name: 'Amit Shah', resource_type: 'Water Bottles', matched_quantity: 20, delivery_status: 'in_transit' },
    { match_id: 3, victim_name: 'Anand Raj', donor_name: 'Sunil Donor', resource_type: 'Medicines', matched_quantity: 5, delivery_status: 'delivered' },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...matches];
    updated[index].delivery_status = newStatus;
    setMatches(updated);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const totalMatches = matches.length;
  const pending = matches.filter(m => m.delivery_status === 'pending').length;
  const inTransit = matches.filter(m => m.delivery_status === 'in_transit').length;
  const delivered = matches.filter(m => m.delivery_status === 'delivered').length;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#2c3e50' }}>Admin Dashboard</h2>
        <button className="btn btn-outline-dark" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-dark p-3 text-center">
            <h5>Total Matches</h5>
            <h2>{totalMatches}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning p-3 text-center">
            <h5>Pending</h5>
            <h2>{pending}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info p-3 text-center">
            <h5>In Transit</h5>
            <h2>{inTransit}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success p-3 text-center">
            <h5>Delivered</h5>
            <h2>{delivered}</h2>
          </div>
        </div>
      </div>

      <div className="card p-4 shadow">
        <h4 className="mb-3">Delivery Tracking</h4>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Match ID</th>
              <th>Victim</th>
              <th>Donor</th>
              <th>Resource</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m, index) => (
              <tr key={index}>
                <td>{m.match_id}</td>
                <td>{m.victim_name}</td>
                <td>{m.donor_name}</td>
                <td>{m.resource_type}</td>
                <td>{m.matched_quantity}</td>
                <td>
                  <span className={`badge bg-${
                    m.delivery_status === 'delivered' ? 'success' :
                    m.delivery_status === 'in_transit' ? 'info' : 'warning'
                  }`}>
                    {m.delivery_status}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={m.delivery_status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;