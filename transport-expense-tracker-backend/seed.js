const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');
const Driver = require('./models/Driver');
const Expense = require('./models/Expense');
const Route = require('./models/Route');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Remove old data from all collections
    await Vehicle.deleteMany({});
    await Driver.deleteMany({});
    await Expense.deleteMany({});
    await Route.deleteMany({});
    console.log('Old data removed');

    // New data with Pune City vehicle numbers and driver details
    const vehicles = [
      {
        id: 'MH12AB1234',
        type: 'Truck',
        status: 'Active',
        mileage: 25000,
        lastService: '2024-01-15',
        location: { lat: 18.5204, lng: 73.8567 },
      }, // Pune coordinates
      {
        id: 'MH12CD5678',
        type: 'Van',
        status: 'Active',
        mileage: 18000,
        lastService: '2024-02-10',
        location: { lat: 18.5314, lng: 73.8446 },
      },
      {
        id: 'MH12EF9012',
        type: 'Bus',
        status: 'Inactive',
        mileage: 30000,
        lastService: '2023-12-20',
        location: { lat: 18.5089, lng: 73.8792 },
      },
    ];

    const drivers = [
      {
        id: 'D001',
        name: 'Ramesh Patil',
        licenseNumber: 'MH1234567890',
        status: 'Active',
        vehicleId: 'MH12AB1234',
        trips: 45,
        hours: 200,
        score: 88,
      },
      {
        id: 'D002',
        name: 'Suresh Kulkarni',
        licenseNumber: 'MH0987654321',
        status: 'Active',
        vehicleId: 'MH12CD5678',
        trips: 38,
        hours: 180,
        score: 92,
      },
      {
        id: 'D003',
        name: 'Mahesh Deshmukh',
        licenseNumber: 'MH1122334455',
        status: 'Inactive',
        vehicleId: 'MH12EF9012',
        trips: 30,
        hours: 150,
        score: 85,
      },
    ];

    const expenses = [
      {
        vehicleId: 'MH12AB1234',
        type: 'Fuel',
        amount: 4500,
        date: '2024-03-01',
        description: 'Diesel refill at Pune Hwy',
      },
      {
        vehicleId: 'MH12CD5678',
        type: 'Maintenance',
        amount: 3200,
        date: '2024-03-05',
        description: 'Oil change',
      },
      {
        vehicleId: 'MH12EF9012',
        type: 'Tolls',
        amount: 1500,
        date: '2024-02-28',
        description: 'Pune-Mumbai toll',
      },
    ];

    const routes = [
      {
        vehicleId: 'MH12AB1234',
        driverId: 'D001',
        waypoints: [
          { lat: 18.5204, lng: 73.8567 }, // Pune
          { lat: 18.6298, lng: 73.7997 }, // Lonavala
          { lat: 19.076, lng: 72.8777 }, // Mumbai
        ],
        totalDistance: 150, // Approx Pune to Mumbai via Lonavala
      },
    ];

    // Insert new data
    await Vehicle.insertMany(vehicles);
    await Driver.insertMany(drivers);
    await Expense.insertMany(expenses);
    await Route.insertMany(routes);

    console.log('New data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
