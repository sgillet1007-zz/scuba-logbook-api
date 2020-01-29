const express = require('express');
const {
  getDives,
  getDive,
  createDive,
  updateDive,
  deleteDive
} = require('../controllers/dives');

const router = express.Router();
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getDives)
  .post(protect, createDive);

router
  .route('/:id')
  .get(protect, getDive)
  .put(protect, updateDive)
  .delete(protect, deleteDive);

module.exports = router;
