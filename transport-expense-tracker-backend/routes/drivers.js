const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    console.error('Error fetching drivers:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update driver salary using custom id
router.put('/:id', async (req, res) => {
  try {
    const driver = await Driver.findOneAndUpdate(
      { id: req.params.id }, // Query by custom id field
      { salary: req.body.salary },
      { new: true } // Return updated document
    );
    if (!driver) {
      return res
        .status(404)
        .json({ message: `Driver with id ${req.params.id} not found` });
    }
    res.json(driver);
    console.log('Driver salary updated:', driver);
  } catch (err) {
    console.error('Error updating salary:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
