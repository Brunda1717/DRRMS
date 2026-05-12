const express = require('express');

const router = express.Router();

const {
  getDonations,
  addDonation
} = require('../controllers/donationController');

router.get('/', getDonations);

router.post('/add-donation', addDonation);

module.exports = router;