const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

const User = mongoose.model('users', userSchema);

module.exports = User