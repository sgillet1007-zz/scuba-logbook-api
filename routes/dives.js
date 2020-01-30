const express = require('express');
const {
  getDives,
  getDive,
  createDive,
  updateDive,
  deleteDive
} = require('../controllers/dives');

const Dive = require('../models/Dive');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, advancedResults(Dive), getDives)
  .post(protect, createDive);

router
  .route('/:id')
  .get(protect, getDive)
  .put(protect, updateDive)
  .delete(protect, deleteDive);

module.exports = router;
