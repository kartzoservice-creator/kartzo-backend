const express = require('express');
const router = express.Router(); // Express router import karo
const User = require('../models/User.model'); // User model import karo

// GET - Sabhi users ko retrieve karo
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Database se saare users lao
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Ek specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User nahi mila' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Naya user create karo
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  });

  try {
    const newUser = await user.save(); // Database mein save karo
    res.status(201).json(newUser); // 201 status = successfully created
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 = bad request
  }
});

// PUT - Existing user update karo
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Updated document return karo
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - User delete karo
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User successfully delete ho gaya' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Router ko export karo
module.exports = router;