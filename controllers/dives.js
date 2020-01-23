const asyncHandler = require('../middleware/async');

// @desc    Get all dives
// @route   GET /api/v1/dives
// @access  Public
exports.getDives = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all dives' });
});

// @desc    Create a dive
// @route   POST /api/v1/dives
// @access  Public
exports.createDive = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new dive' });
});

// @desc    Get a specific dive by id
// @route   GET /api/v1/dives/:id
// @access  Public
exports.getDive = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show dive ${req.params.id}` });
});

// @desc    Update a specific dive by id
// @route   PUT /api/v1/dives/:id
// @access  Public
exports.updateDive = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update dive ${req.params.id}` });
});

// @desc    Delete a specific dive by id
// @route   DELETE /api/v1/dives/:id
// @access  Public
exports.deleteDive = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete dive ${req.params.id}` });
});
