const geolib = require('geolib');
const Expense = require('../models/Expense');

// Calculate fuel cost per kilometer for a vehicle
const getFuelCostPerKm = async (vehicleId) => {
  try {
    const fuelExpenses = await Expense.find({ vehicleId, type: 'Fuel' });
    if (fuelExpenses.length === 0) return 0.1; // Default fuel cost per km if no data

    const totalFuelCost = fuelExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );
    const totalDistance = fuelExpenses.length * 100; // Assume 100 km per fuel entry (adjust as needed)
    return totalFuelCost / totalDistance; // Fuel cost per km
  } catch (error) {
    console.error('Error calculating fuel cost:', error);
    return 0.1; // Fallback value
  }
};

// Optimize route based on distance and fuel cost
const optimizeRoute = async (waypoints, vehicleId) => {
  if (!waypoints || waypoints.length <= 1) return waypoints;

  const fuelCostPerKm = await getFuelCostPerKm(vehicleId);
  const unvisited = [...waypoints];
  const optimized = [unvisited.shift()]; // Start with first point

  while (unvisited.length > 0) {
    let bestIdx = 0;
    let minCost = Infinity;
    const lastPoint = optimized[optimized.length - 1];

    unvisited.forEach((point, idx) => {
      const distance =
        geolib.getDistance(
          { latitude: lastPoint.lat, longitude: lastPoint.lng },
          { latitude: point.lat, longitude: point.lng }
        ) / 1000; // Convert meters to kilometers

      // Cost = distance + (distance * fuel cost per km)
      const cost = distance + distance * fuelCostPerKm;
      if (cost < minCost) {
        minCost = cost;
        bestIdx = idx;
      }
    });

    optimized.push(unvisited.splice(bestIdx, 1)[0]);
  }

  return optimized;
};

module.exports = { optimizeRoute };
