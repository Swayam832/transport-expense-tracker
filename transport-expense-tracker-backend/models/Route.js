const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  driverId: { type: String, required: true },
  waypoints: [{ lat: Number, lng: Number }],
  totalDistance: { type: Number },
  totalFuelCost: { type: Number }, // New field
  optimizedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Route', routeSchema);
