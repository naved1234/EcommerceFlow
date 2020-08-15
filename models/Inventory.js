const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please add a product name']
  },
  productDescription: {
    type: String,
    required: [true, 'Please add a product description']
  },
  quantityPurchased: {
    type: Number,
    required: [true, 'Please add quantity of product purchased']
  },
  unitPrice: {
    type: Number,
    required: [true, 'Please add a price']
  },
  quantityInStock: {
    type: Number,
    required: [true, 'Please add quantity in stock']
  },
  quantitySold: {
    type: Number,
    required: [true, 'Please add quantity sold']
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

module.exports = mongoose.model('Inventory', InventorySchema);