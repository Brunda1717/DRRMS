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

  // Fetch donations
  useEffect(() => {

    fetchDonations();

  }, []);

  // Get donations
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

  // Handle form input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Add donation
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

  // Logout
  const handleLogout = () => {

    localStorage.clear();

    navigate('/');

  };

  // FILTERED DONATIONS

  const filteredDonations = donations.filter((d) => {

    if (statusFilter === 'all') return true;

    return d.status === statusFilter;

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
            Donor Dashboard
          </h2>

          <p className="text-light">
            Disaster Resource Donation System
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
            className="card border-0 shadow-lg p-4 text-center text-white"
            style={{
              background:
                'linear-gradient(135deg, #4facfe, #00f2fe)',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/map')}
          >

            <h4 className="fw-bold mb-2">
              Open Map Tracking
            </h4>

            <p className="mb-0">
              View live donor-to-victim routes
            </p>

          </div>

        </div>

        <div className="col-md-6 mb-3">

          <div
            className="card border-0 shadow-lg p-4 text-center text-white"
            style={{
              background:
                'linear-gradient(135deg, #43e97b, #38f9d7)',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/donate')}
          >

            <h4 className="fw-bold mb-2">
              Open Donation Page
            </h4>

            <p className="mb-0">
              Manage and add disaster resources
            </p>

          </div>

        </div>

      </div>

      {/* DASHBOARD CARDS */}

      <div className="row mb-4">

        <div className="col-md-4 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #11998e, #38ef7d)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Total Donations</h5>

              <h1>{donations.length}</h1>

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

              <h5>Assigned</h5>

              <h1>

                {
                  donations.filter(
                    d => d.status === 'assigned'
                  ).length
                }

              </h1>

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

              <h5>Delivered</h5>

              <h1>

                {
                  donations.filter(
                    d => d.status === 'delivered'
                  ).length
                }

              </h1>

            </div>

          </div>

        </div>

      </div>

      {/* ADD DONATION FORM */}

      <div
        className="card border-0 shadow-lg p-4 mb-4"
        style={{
          borderRadius: '20px'
        }}
      >

        <h4 className="mb-4 fw-bold">
          Add New Donation
        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Resource Type
              </label>

              <select
                className="form-select"
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

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Quantity
              </label>

              <input
                type="number"
                className="form-control"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Location
              </label>

              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                placeholder="Enter your city"
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-success px-4"
          >
            Add Donation
          </button>

        </form>

      </div>

      {/* DONATION TABLE */}

      {

        donations.length > 0 && (

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: '20px'
            }}
          >

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h4 className="fw-bold">
                My Donations
              </h4>

              {/* FILTER */}

              <select
                className="form-select w-auto"
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

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>Resource Type</th>

                    <th>Quantity</th>

                    <th>Location</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    filteredDonations.map((d, index) => (

                      <tr key={index}>

                        <td>{d.resource_type}</td>

                        <td>{d.quantity}</td>

                        <td>{d.location}</td>

                        <td>

                          <span className={`badge bg-${
                            d.status === 'available'
                              ? 'success'
                              : d.status === 'assigned'
                              ? 'warning'
                              : 'info'
                          }`}>

                            {d.status}

                          </span>

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

            </div>

          </div>

        )

      }

    </div>

  );

}

export default DonorDashboard;