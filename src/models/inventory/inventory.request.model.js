const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const inventoryRequestSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  itemId: {
    type: String,
    ref: 'InventoryItem',
    required: true
  },
  requestedQty: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('InventoryRequest', inventoryRequestSchema);
