const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createRequest, getRequests } = require('../controllers/sessionController');

router.post('/', auth, createRequest);
router.get('/', auth, getRequests);

module.exports = router;