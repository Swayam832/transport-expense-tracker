const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  mileage: { type: Number, required: true },
  lastService: { type: Date, required: true },
  location: { type: { lat: Number, lng: Number }, required: true }, // Added for route optimization
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
