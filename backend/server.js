const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const requestRoutes = require('./routes/requestRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/matches', matchRoutes);
app.get('/api/map-data', (req, res) => {

  const db = require('./config/db');

  const donorsQuery = `
    SELECT
      user_id,
      name,
      location,

      CASE
        WHEN location='Bangalore' THEN 12.9716
        WHEN location='Mumbai' THEN 19.0760
        WHEN location='Pune' THEN 18.5204
        WHEN location='Hyderabad' THEN 17.3850
        ELSE 12.2958
      END AS latitude,

      CASE
        WHEN location='Bangalore' THEN 77.5946
        WHEN location='Mumbai' THEN 72.8777
        WHEN location='Pune' THEN 73.8567
        WHEN location='Hyderabad' THEN 78.4867
        ELSE 76.6394
      END AS longitude

    FROM users

    WHERE role='donor'
  `;

  const victimsQuery = `
    SELECT
      victim_id,
      name,
      disaster_area,

      CASE
        WHEN disaster_area='Mysore' THEN 12.2958
        WHEN disaster_area='Chennai' THEN 13.0827
        WHEN disaster_area='Hubli' THEN 15.3647
        WHEN disaster_area='Mangalore' THEN 12.9141
        ELSE 12.2958
      END AS latitude,

      CASE
        WHEN disaster_area='Mysore' THEN 76.6394
        WHEN disaster_area='Chennai' THEN 80.2707
        WHEN disaster_area='Hubli' THEN 75.1240
        WHEN disaster_area='Mangalore' THEN 74.8560
        ELSE 76.6394
      END AS longitude

    FROM victims
  `;

  const ngoQuery = `
    SELECT
      name,
      location,

      CASE
        WHEN location='Mysore' THEN 12.2958
        WHEN location='Chennai' THEN 13.0827
        WHEN location='Hubli' THEN 15.3647
        ELSE 12.2958
      END AS latitude,

      CASE
        WHEN location='Mysore' THEN 76.6394
        WHEN location='Chennai' THEN 80.2707
        WHEN location='Hubli' THEN 75.1240
        ELSE 76.6394
      END AS longitude

    FROM users

    WHERE role='ngo'
  `;

  const routeQuery = `
    SELECT
      u.name AS donor_name,
      v.name AS victim_name,

      CASE
        WHEN u.location='Bangalore' THEN 12.9716
        WHEN u.location='Mumbai' THEN 19.0760
        WHEN u.location='Pune' THEN 18.5204
        ELSE 12.2958
      END AS donor_lat,

      CASE
        WHEN u.location='Bangalore' THEN 77.5946
        WHEN u.location='Mumbai' THEN 72.8777
        WHEN u.location='Pune' THEN 73.8567
        ELSE 76.6394
      END AS donor_lng,

      CASE
        WHEN v.disaster_area='Mysore' THEN 12.2958
        WHEN v.disaster_area='Chennai' THEN 13.0827
        WHEN v.disaster_area='Hubli' THEN 15.3647
        ELSE 12.2958
      END AS victim_lat,

      CASE
        WHEN v.disaster_area='Mysore' THEN 76.6394
        WHEN v.disaster_area='Chennai' THEN 80.2707
        WHEN v.disaster_area='Hubli' THEN 75.1240
        ELSE 76.6394
      END AS victim_lng

    FROM matches m

    JOIN donations d
      ON m.donation_id = d.donation_id

    JOIN users u
      ON d.donor_id = u.user_id

    JOIN resource_requests rr
      ON m.request_id = rr.request_id

    JOIN victims v
      ON rr.victim_id = v.victim_id
  `;

  db.query(donorsQuery, (err, donors) => {

    db.query(victimsQuery, (err, victims) => {

      db.query(ngoQuery, (err, ngos) => {

        db.query(routeQuery, (err, routes) => {

          res.json({
            donors,
            victims,
            ngos,
            routes
          });

        });

      });

    });

  });

});

const PORT = process.env.PORT || 5000;
app.get('/api/map-data', (req, res) => {

  const donorsQuery = `
    SELECT
      name,
      location,

      CASE
        WHEN location = 'Bangalore' THEN 12.9716
        WHEN location = 'Mumbai' THEN 19.0760
        WHEN location = 'Hyderabad' THEN 17.3850
        WHEN location = 'Pune' THEN 18.5204
        WHEN location = 'Jaipur' THEN 26.9124
        ELSE 12.2958
      END AS latitude,

      CASE
        WHEN location = 'Bangalore' THEN 77.5946
        WHEN location = 'Mumbai' THEN 72.8777
        WHEN location = 'Hyderabad' THEN 78.4867
        WHEN location = 'Pune' THEN 73.8567
        WHEN location = 'Jaipur' THEN 75.7873
        ELSE 76.6394
      END AS longitude

    FROM users

    WHERE role = 'donor'
  `;

  const ngoQuery = `
    SELECT
      name,
      location,

      CASE
        WHEN location = 'Mysore' THEN 12.2958
        WHEN location = 'Chennai' THEN 13.0827
        WHEN location = 'Hubli' THEN 15.3647
        WHEN location = 'Mangalore' THEN 12.9141
        ELSE 12.2958
      END AS latitude,

      CASE
        WHEN location = 'Mysore' THEN 76.6394
        WHEN location = 'Chennai' THEN 80.2707
        WHEN location = 'Hubli' THEN 75.1240
        WHEN location = 'Mangalore' THEN 74.8560
        ELSE 76.6394
      END AS longitude

    FROM users

    WHERE role = 'ngo'
  `;

  const victimQuery = `
    SELECT
      name,
      disaster_area,

      CASE
        WHEN disaster_area = 'Mysore' THEN 12.2958
        WHEN disaster_area = 'Chennai' THEN 13.0827
        WHEN disaster_area = 'Hubli' THEN 15.3647
        WHEN disaster_area = 'Mangalore' THEN 12.9141
        ELSE 12.2958
      END AS latitude,

      CASE
        WHEN disaster_area = 'Mysore' THEN 76.6394
        WHEN disaster_area = 'Chennai' THEN 80.2707
        WHEN disaster_area = 'Hubli' THEN 75.1240
        WHEN disaster_area = 'Mangalore' THEN 74.8560
        ELSE 76.6394
      END AS longitude

    FROM victims
  `;

  const db = require('./config/db');

  db.query(donorsQuery, (err, donors) => {

    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    db.query(ngoQuery, (err, ngos) => {

      if (err) {
        return res.status(500).json({
          error: err
        });
      }

      db.query(victimQuery, (err, victims) => {

        if (err) {
          return res.status(500).json({
            error: err
          });
        }

        res.json({
          donors,
          ngos,
          victims
        });

      });

    });

  });

});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});