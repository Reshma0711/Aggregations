
const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    _id: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    items: { type: [String], required: true },
    status: { type: String, required: true },
    orderDate: { type: Date, required: true },
  });

  const Order = mongoose.model('orders', orderSchema);

  module.exports = Order