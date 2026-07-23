const db = require('../config/db');


// GET ALL DONATIONS
exports.getDonations = (req, res) => {

  const sql = `
    SELECT
      d.*,
      u.name AS donor_name,
      u.location AS donor_location
    FROM donations d
    JOIN users u
    ON d.donor_id = u.user_id
  `;

  db.query(sql, (err, results) => {

    if (err) {
      return res.status(500).json({
        error: 'Server error'
      });
    }

    res.json(results);

  });

};


// ADD DONATION
exports.addDonation = (req, res) => {

  const {
    donor_id,
    resource_type,
    quantity,
    location
  } = req.body;

  const sql = `
    INSERT INTO donations
    (donor_id, resource_type, quantity, location)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [donor_id, resource_type, quantity, location],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          error: 'Server error'
        });
      }

      res.status(201).json({
        message: 'Donation added successfully'
      });

    }
  );

};
// GET MY DONATIONS
exports.getMyDonations = (req, res) => {

  const donorId = req.params.donorId;

  const sql = `
    SELECT
      d.donation_id,
      d.resource_type,
      d.quantity,
      d.location,
      d.status,
      d.created_at,

      m.matched_at,

      IFNULL(r.location, 'Not Assigned Yet') AS request_location,

      IFNULL(u.name, 'NGO Not Assigned') AS ngo_name

    FROM donations d

    LEFT JOIN matches m
    ON d.donation_id = m.donation_id

    LEFT JOIN requests r
    ON m.request_id = r.request_id

    LEFT JOIN users u
    ON r.ngo_id = u.user_id

    WHERE d.donor_id = ?

    ORDER BY d.donation_id DESC
  `;

  db.query(sql, [donorId], (err, results) => {

    if (err) {

      console.log(err);

      return res.status(500).json({
        error: 'Server error'
      });

    }

    res.json(results);

  });

};