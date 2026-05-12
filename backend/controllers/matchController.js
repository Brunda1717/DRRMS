const db = require('../config/db');

// Get all matches
exports.getMatches = (req, res) => {

  const sql = `
    SELECT 
      m.match_id,
      m.matched_quantity,
      m.delivery_status,
      m.matched_at,

      v.name AS victim_name,
      v.disaster_area,

      u.name AS donor_name,

      rr.resource_type,
      rr.priority_level

    FROM matches m

    JOIN resource_requests rr
      ON m.request_id = rr.request_id

    JOIN victims v
      ON rr.victim_id = v.victim_id

    JOIN donations d
      ON m.donation_id = d.donation_id

    JOIN users u
      ON d.donor_id = u.user_id

    ORDER BY m.matched_at DESC
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

// Create match
exports.createMatch = (req, res) => {
  const { donation_id, request_id, matched_quantity } = req.body;
  const sql = 'INSERT INTO matches (donation_id, request_id, matched_quantity) VALUES (?, ?, ?)';
  db.query(sql, [donation_id, request_id, matched_quantity], (err, result) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.status(201).json({ message: 'Match created successfully' });
  });
};

// Update delivery status
exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { delivery_status } = req.body;
  const sql = 'UPDATE matches SET delivery_status = ? WHERE match_id = ?';
  db.query(sql, [delivery_status, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json({ message: 'Status updated successfully' });
  });
};