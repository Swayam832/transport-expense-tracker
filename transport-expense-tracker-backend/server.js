const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/drivers', require('./routes/drivers'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const vehicleRoutes = require('./routes/vehicles');
const driverRoutes = require('./routes/drivers');
const expenseRoutes = require('./routes/expenses');
const routeRoutes = require('./routes/routes');

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/routes', routeRoutes);

app.get('/', (req, res) => {
  res.send('Transport Expense Tracker Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
