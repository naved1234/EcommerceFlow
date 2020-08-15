const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Inventory = require('../models/Inventory');

// @desc      Create new Inventory
// @route     POST /api/v1/inventory
// @access    Private
exports.createInventory = asyncHandler(async (req, res, next) => {

  const inventory = await Inventory.create(req.body);

  res.status(201).json({
    success: true,
    data: inventory
  });
});