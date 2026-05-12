import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatches } from '../services/api';

function MatchTracking() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await getMatches();
      setMatches(res.data);
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
    setLoading(false);
  };

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

        {loading ? (
          <p className="text-center">Loading matches...</p>
        ) : (
          <table className="table table-striped">
            <thead style={{ backgroundColor: '#8e44ad', color: 'white' }}>
              <tr>
                <th>ID</th>
                <th>Victim</th>
                <th>Area</th>
                <th>Donor</th>
                <th>Resource</th>
                <th>Quantity</th>
                <th>Priority</th>
                <th>Status</th>
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
                      m.priority_level === 'critical' ? 'danger' :
                      m.priority_level === 'high' ? 'warning' :
                      m.priority_level === 'medium' ? 'info' : 'success'
                    }`}>
                      {m.priority_level}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${
                      m.delivery_status === 'delivered' ? 'success' :
                      m.delivery_status === 'in_transit' ? 'info' : 'warning'
                    }`}>
                      {m.delivery_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MatchTracking;