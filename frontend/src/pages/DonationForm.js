import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import {
  addDonation
} from '../services/api';

function DonationForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    donor_id: '',

    resource_type: '',

    quantity: '',

    location: ''

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addDonation(formData);

      toast.success(
        'Donation added successfully!'
      );

      setFormData({

        donor_id: '',

        resource_type: '',

        quantity: '',

        location: ''

      });

    } catch (err) {

      console.log(err);

      toast.error(
        'Failed to add donation'
      );

    }

  };

  return (

    <div
      className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background:
          'linear-gradient(135deg, #141e30, #243b55)'
      }}
    >

      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: '500px',
          borderRadius: '20px'
        }}
      >

        <h2
          className="text-center mb-4 fw-bold"
          style={{
            color: '#243b55'
          }}
        >
          Add Donation
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Donor ID
            </label>

            <input
              type="number"
              className="form-control"
              name="donor_id"
              value={formData.donor_id}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

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

          <div className="mb-3">

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

          <div className="mb-4">

            <label className="form-label">
              Location
            </label>

            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Submit Donation
          </button>

        </form>

        <button
          className="btn btn-outline-secondary mt-3"
          onClick={() =>
            navigate('/donor-dashboard')
          }
        >
          Back
        </button>

      </div>

    </div>

  );

}

export default DonationForm;