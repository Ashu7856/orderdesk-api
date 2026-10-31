const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped'], default: 'pending' },
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
