import React, {
  useState,
  useEffect
} from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';

function RequestForm() {

  const [victims, setVictims] = useState([]);

  const [formData, setFormData] = useState({

    victim_id: '',
    resource_type: '',
    quantity_needed: '',
    priority_level: 'medium'

  });

  // Load victims

  useEffect(() => {

    fetchVictims();

  }, []);

  const fetchVictims = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/auth/victims'
      );

      setVictims(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // Handle form changes

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  // Submit request

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        'http://localhost:5000/api/requests',

        formData

      );

      toast.success(res.data.message);

      setFormData({

        victim_id: '',
        resource_type: '',
        quantity_needed: '',
        priority_level: 'medium'

      });

    } catch (err) {

      console.log(err);

      toast.error('Failed to create request');

    }

  };

  return (

    <div className="container mt-4">

      <div className="card p-4 shadow">

        <h3 className="mb-4">
          Create Resource Request
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* Victim */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Select Victim
              </label>

              <select
                className="form-select"
                name="victim_id"
                value={formData.victim_id}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Victim
                </option>

                {

                  victims.map((v) => (

                    <option
                      key={v.victim_id}
                      value={v.victim_id}
                    >

                      {v.name} - {v.disaster_area}

                    </option>

                  ))

                }

              </select>

            </div>

            {/* Resource */}

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

              </select>

            </div>

            {/* Quantity */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Quantity Needed
              </label>

              <input
                type="number"
                className="form-control"
                name="quantity_needed"
                value={formData.quantity_needed}
                onChange={handleChange}
                required
              />

            </div>

            {/* Priority */}

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

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >

            Create Request

          </button>

        </form>

      </div>

    </div>

  );

}

export default RequestForm;