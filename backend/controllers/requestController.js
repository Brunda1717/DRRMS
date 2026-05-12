const db = require('../config/db');

// Get all requests
exports.getRequests = (req, res) => {
  const sql = `
    SELECT rr.*, v.name as victim_name, v.disaster_area
    FROM resource_requests rr
    JOIN victims v ON rr.victim_id = v.victim_id
    ORDER BY FIELD(rr.priority_level, 'critical', 'high', 'medium', 'low')
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json(results);
  });
};

// Add request
exports.addRequest = (req, res) => {
  const { victim_id, resource_type, quantity_needed, priority_level } = req.body;
  const sql = 'INSERT INTO resource_requests (victim_id, resource_type, quantity_needed, priority_level) VALUES (?, ?, ?, ?)';
  db.query(sql, [victim_id, resource_type, quantity_needed, priority_level], (err, result) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.status(201).json({ message: 'Request added successfully' });
  });
};