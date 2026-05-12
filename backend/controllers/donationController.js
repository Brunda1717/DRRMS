const db = require('../config/db');

// Get all donations
exports.getDonations = (req, res) => {
  const sql = `
    SELECT d.*, u.name as donor_name, u.location as donor_location
    FROM donations d
    JOIN users u ON d.donor_id = u.user_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json(results);
  });
};

// Add donation
exports.addDonation = (req, res) => {
  const { donor_id, resource_type, quantity, location } = req.body;
  const sql = 'INSERT INTO donations (donor_id, resource_type, quantity, location) VALUES (?, ?, ?, ?)';
  db.query(sql, [donor_id, resource_type, quantity, location], (err, result) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.status(201).json({ message: 'Donation added successfully' });
  });
};