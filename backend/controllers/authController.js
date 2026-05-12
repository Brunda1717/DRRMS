const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  const { name, email, password, role, location } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, role, location) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role, location], (err, result) => {
      if (err) return res.status(500).json({ error: 'Email already exists' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      if (results.length === 0) return res.status(401).json({ error: 'User not found' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

      const token = jwt.sign(
        { user_id: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        role: user.role,
        name: user.name,
        user_id: user.user_id
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};