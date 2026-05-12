const express = require('express');

const router = express.Router();

const {
  getMatches,
  createMatch,
  updateStatus
} = require('../controllers/matchController');

router.get('/', getMatches);

router.post('/', createMatch);

router.put('/:id', updateStatus);

module.exports = router;