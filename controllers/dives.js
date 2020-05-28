const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Dive = require('../models/Dive');

// @desc    Get all dives for authenticated user
// @route   GET /api/v1/dives
// @access  Public
exports.getDives = asyncHandler(async (req, res, next) => {
  const dives = await Dive.find({ user: req.user.id });
  if (!dives) {
    return next(
      new ErrorResponse(`No dives found for user id ${req.user.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    count: dives.length,
    results: res.advancedResults,
  });
});

// @desc    Get a specific dive by id
// @route   GET /api/v1/dives/:id
// @access  Public
exports.getDive = asyncHandler(async (req, res, next) => {
  const dive = await Dive.findById(req.params.id);
  if (!dive) {
    return next(
      new ErrorResponse(`Dive with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({ success: true, data: dive });
});

// @desc    Create a dive associated with currently authenticated user
// @route   POST /api/v1/dives
// @access  Public
exports.createDive = asyncHandler(async (req, res, next) => {
  // get the user id from req.user and add it to req.body
  req.body.user = req.user.id;

  const newDive = await Dive.create(req.body);

  res.status(201).json({
    success: true,
    data: newDive,
  });
});

// @desc    Update a specific dive by id
// @route   PUT /api/v1/dives/:id
// @access  Public
exports.updateDive = asyncHandler(async (req, res, next) => {
  let diveToUpdate = await Dive.findById(req.params.id);

  if (!diveToUpdate) {
    return next(
      new ErrorResponse(`Dive with id ${req.params.id} not found`, 404)
    );
  }

  // Check for dive ownership or admin role
  if (
    diveToUpdate.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new ErrorResponse('Not authorized to edit this dive', 401));
  }

  diveToUpdate = await Dive.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: diveToUpdate });
});

// @desc    Delete a specific dive by id
// @route   DELETE /api/v1/dives/:id
// @access  Public
exports.deleteDive = asyncHandler(async (req, res, next) => {
  const diveToDelete = await Dive.findById(req.params.id);

  if (!diveToDelete) {
    return next(
      new ErrorResponse(`Dive with id ${req.params.id} not found`, 404)
    );
  }
  // Check for dive ownership or admin role
  if (
    diveToDelete.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new ErrorResponse('Not authorized to delete this dive', 401));
  }

  diveToDelete.remove();

  res.status(200).json({ success: true, data: {} });
});
