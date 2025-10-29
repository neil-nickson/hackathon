const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  batchNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  // Add user/shop ID ref if needed for multi-user
});

module.exports = mongoose.model('Inventory', InventorySchema);