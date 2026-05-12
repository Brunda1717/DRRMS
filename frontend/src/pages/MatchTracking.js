import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MatchTracking() {
  const navigate = useNavigate();
  const [matches] = useState([
    {
      match_id: 1,
      victim_name: 'Suresh Kumar',
      disaster_area: 'Mysore',
      donor_name: 'Amit Shah',
      resource_type: 'Food Kits',
      matched_quantity: 10,
      delivery_status: 'delivered',
      matched_at: '2026-05-01'
    },
    {
      match_id: 2,
      victim_name: 'Meena Devi',
      disaster_area: 'Mysore',
      donor_name: 'Amit Shah',
      resource_type: 'Water Bottles',
      matched_quantity: 20,
      delivery_status: 'in_transit',
      matched_at: '2026-05-02'
    },
    {
      match_id: 3,
      victim_name: 'Anand Raj',
      disaster_area: 'Chennai',
      donor_name: 'Sunil Donor',
      resource_type: 'Medicines',
      matched_quantity: 5,
      delivery_status: 'pending',
      matched_at: '2026-05-03'
    },
    {
      match_id: 4,
      victim_name: 'Lakshmi S',
      disaster_area: 'Chennai',
      donor_name: 'Rahul Donor',
      resource_type: 'Food Kits',
      matched_quantity: 15,
      delivery_status: 'in_transit',
      matched_at: '2026-05-04'
    },
    {
      match_id: 5,
      victim_name: 'Basavraj',
      disaster_area: 'Hubli',
      donor_name: 'Vikram Donor',
      resource_type: 'Blankets',
      matched_quantity: 10,
      delivery_status: 'pending',
      matched_at: '2026-05-05'
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredMatches = filter === 'all'
    ? matches
    : matches.filter(m => m.delivery_status === filter);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#8e44ad' }}>Match Tracking</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-warning p-3 text-center">
            <h5>Pending</h5>
            <h2>{matches.filter(m => m.delivery_status === 'pending').length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info p-3 text-center">
            <h5>In Transit</h5>
            <h2>{matches.filter(m => m.delivery_status === 'in_transit').length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success p-3 text-center">
            <h5>Delivered</h5>
            <h2>{matches.filter(m => m.delivery_status === 'delivered').length}</h2>
          </div>
        </div>
      </div>

      <div className="card p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>All Matches</h4>
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <table className="table table-striped">
          <thead style={{ backgroundColor: '#8e44ad', color: 'white' }}>
            <tr>
              <th>ID</th>
              <th>Victim</th>
              <th>Area</th>
              <th>Donor</th>
              <th>Resource</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map((m, index) => (
              <tr key={index}>
                <td>{m.match_id}</td>
                <td>{m.victim_name}</td>
                <td>{m.disaster_area}</td>
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
                <td>{m.matched_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MatchTracking;