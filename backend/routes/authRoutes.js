const express = require('express');

const router = express.Router();

const {
  register,
  login,
  registerVictim,
  getVictims,
  getAnalytics
} = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.post('/victim', registerVictim);

router.get('/victims', getVictims);

router.get('/analytics', getAnalytics);

module.exports = router;