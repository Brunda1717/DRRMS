const express = require('express');
const router = express.Router();
const { getRequests, addRequest } = require('../controllers/requestController');

router.get('/', getRequests);
router.post('/', addRequest);

module.exports = router;