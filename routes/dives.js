const express = require('express');
const {
  getDives,
  getDive,
  createDive,
  updateDive,
  deleteDive
} = require('../controllers/dives');

const router = express.Router();

router
  .route('/')
  .get(getDives)
  .post(createDive);

router
  .route('/:id')
  .get(getDive)
  .put(updateDive)
  .delete(deleteDive);

module.exports = router;
