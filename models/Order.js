const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
    required: true
  },
  inventory: {
    type: mongoose.Schema.ObjectId,
    ref: 'Inventory',
    required: true
  },
  product: {
    type: String,
    required: [true, 'Please add the product in the order']
  },
  description: {
    type: String,
    required: [true, 'Please add the product description in the order']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity of product in the order']
  },
  price: {
    type: Number,
    required: [true, 'Please add price of product in the order']
  },
  amount: {
    type: Number,
    required: [true, 'Please add total amount in the order']
  },
  shippingAddress: {
    type: String,
    required: [true, 'Please add the product in the order']
  },
  createdAtUTC: {
    type: Date,
    default: Date.now
  },
  modifiedAtUTC: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Order', OrderSchema);