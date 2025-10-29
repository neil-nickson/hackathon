const Inventory = require('./models/Inventory');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('register endpoint hit', req.body);
  try {
    const { name, phone, licenseNumber, password, shopName, address } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [ { phone }, { licenseNumber } ] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone or license already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      name,
      phone,
      licenseNumber,
      password: hashedPassword,
      shopName,
      address
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful.' });

  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
});

const jwt = require('jsonwebtoken');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Find user by phone number
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token, user: {
      name: user.name,
      phone: user.phone,
      licenseNumber: user.licenseNumber,
      shopName: user.shopName,
      address: user.address
    }});

  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});

module.exports = router;

router.post('/inventory/add', async (req, res) => {
  try {
    const { medicineName, quantity, expiryDate, batchNumber } = req.body;
    if (!medicineName || !quantity || !expiryDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const item = new Inventory({
      medicineName,
      quantity,
      expiryDate,
      batchNumber,
    });
    await item.save();
    res.json({ message: 'Stock added successfully', item });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});