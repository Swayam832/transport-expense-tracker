const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  status: { type: String, required: true },
  vehicleId: { type: String, required: true },
  trips: { type: Number, default: 0 },
  hours: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  salary: { type: Number, default: 0 }, // Added salary field
});

module.exports = mongoose.model('Driver', driverSchema);
