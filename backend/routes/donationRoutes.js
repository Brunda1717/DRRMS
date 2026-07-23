const express = require('express');

const router = express.Router();

const {
  getDonations,
  addDonation,
  getMyDonations
} = require('../controllers/donationController');


// GET ALL DONATIONS
router.get('/', getDonations);


// ADD DONATION
router.post('/add-donation', addDonation);


// GET MY DONATIONS
router.get('/mydonations/:donorId', getMyDonations);


module.exports = router;
