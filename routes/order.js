const express = require('express');
const {
  createOrder,
} = require('../controllers/order');

const Order = require('../models/Order');

const router = express.Router();

const { protect } = require('../middleware/auth');

router
  .route('/')
  .post(protect, createOrder);

module.exports = router;