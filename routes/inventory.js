const express = require('express');
const {
  createInventory,
} = require('../controllers/inventory');

const Inventory = require('../models/Inventory');

const router = express.Router();

const { protect } = require('../middleware/auth');

router
  .route('/')
  .post(protect, createInventory);

module.exports = router;