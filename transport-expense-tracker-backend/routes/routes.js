const express = require('express');
const router = express.Router();
const Route = require('../models/Route');
const { optimizeRoute } = require('../utils/routeOptimizer');
const geolib = require('geolib');

router.post('/optimize', async (req, res) => {
  const { vehicleId, driverId, waypoints } = req.body;
  try {
    const optimizedWaypoints = await optimizeRoute(waypoints, vehicleId);
    const totalDistance = optimizedWaypoints.reduce((sum, point, i) => {
      if (i === 0) return sum;
      const prev = optimizedWaypoints[i - 1];
      return (
        sum +
        geolib.getDistance(
          { latitude: prev.lat, longitude: prev.lng },
          { latitude: point.lat, longitude: point.lng }
        ) /
          1000
      );
    }, 0);

    const fuelCostPerKm =
      await require('../utils/routeOptimizer').getFuelCostPerKm(vehicleId);
    const totalFuelCost = totalDistance * fuelCostPerKm;

    const route = new Route({
      vehicleId,
      driverId,
      waypoints: optimizedWaypoints,
      totalDistance,
      totalFuelCost, // Add fuel cost to the schema
    });

    const savedRoute = await route.save();
    res.status(201).json(savedRoute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
