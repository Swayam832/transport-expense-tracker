const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
    console.log('Expense saved:', savedExpense); // Log for debugging
  } catch (err) {
    console.error('Error saving expense:', err);
    res.status(400).json({ message: err.message });
  }
});

router.get('/vehicle/:vehicleId', async (req, res) => {
  try {
    const expenses = await Expense.find({ vehicleId: req.params.vehicleId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
