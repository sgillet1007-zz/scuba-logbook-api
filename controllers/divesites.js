const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const DiveSite = require('../models/DiveSite');

// @desc    Get all known dive sites and locations (original data source: divesites.com api)
// @route   GET /api/v1/divesites
// @access  Public
exports.getDiveSites = asyncHandler(async (req, res, next) => {
  const divesites = await DiveSite.find({});
  if (!divesites) {
    return next(
      new ErrorResponse(`Divesites request could not retrieve any data.`, 404)
    );
  }
  res.status(200).json({
    success: true,
    count: divesites.length,
    results: divesites,
  });
});
