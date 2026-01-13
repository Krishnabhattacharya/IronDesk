const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const inventoryRequestSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => randomUUID()
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
    },
    approval: {
        type: String,
        ref: 'Approval'
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: false }
});

const InventoryRequest = mongoose.model('InventoryRequest', inventoryRequestSchema);

module.exports = InventoryRequest;
