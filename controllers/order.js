const Mutex = require('async-mutex').Mutex;

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Order = require('../models/Order');
const Inventory = require('../models/Inventory');

const mutex = new Mutex();


// @desc      Create new Order
// @route     POST /api/v1/order
// @access    Private
exports.createOrder= asyncHandler(async (req, res, next) => {
  const release = await mutex.acquire();
  const account = req.account._id;
  const { inventory, product, description, quantity, price, shippingAddress } = req.body;
  if (!inventory || ! (typeof inventory === 'string')) {
    release();
    return next(new ErrorResponse('Inventory id is required and should be a string', 400));
  }
  if (!product || ! (typeof product === 'string')) {
    release();
    return next(new ErrorResponse('Product name is required and should be a string', 400));
  }
  if (!description || ! (typeof description === 'string')) {
    release();
    return next(new ErrorResponse('Product description is required and should be a string', 400));
  }
  if (!quantity || ! (typeof quantity === 'number')) {
    release();
    return next(new ErrorResponse('Product quantity is required and should be a number', 400));
  }
  if (!price || ! (typeof price === 'number')) {
    release();
    return next(new ErrorResponse('Product quantity is required and should be a number', 400));
  }
  if (!shippingAddress || ! (typeof shippingAddress === 'string')) {
    release();
    return next(new ErrorResponse('Product shipping address is required and should be a string', 400));
  }
  const amount = quantity * price;
  const inventoryItem = await Inventory.findById(inventory);

  if (!inventoryItem) {
    release();
    return next(new ErrorResponse('Inventory does not exist', 404));
  }

  const { quantityInStock } = inventoryItem;

  if (quantityInStock < quantity) {
    release();
    return next(new ErrorResponse('Inventory item is out of stock', 400));
  } else {
    inventoryItem.quantityInStock -= 1;
    inventoryItem.quantitySold += 1;
    inventoryItem.save();

    const createdOrder = await Order.create({
      account,
      inventory,
      product,
      description,
      quantity,
      price,
      shippingAddress,
      amount
    });

    release();

    res.status(201).json({
      success: true,
      data: createdOrder
    });
  }
});