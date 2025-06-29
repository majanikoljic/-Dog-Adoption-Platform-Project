const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['available', 'adopted'], default: 'available' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  thankYouMessage: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Dog', dogSchema);
// This code defines a Mongoose schema for a Dog model.
// It includes fields for the dog's name, description, status, owner, and adoptedBy.
// The status can be either 'available' or 'adopted', with a default of 'available'.
// The owner and adoptedBy fields reference the User model.