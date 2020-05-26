const express = require('express');
const { getDiveSites } = require('../controllers/divesites');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getDiveSites);

module.exports = router;
