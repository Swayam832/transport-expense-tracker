const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['Fuel', 'Maintenance', 'Tolls', 'Other'],
  },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Expense', expenseSchema);
