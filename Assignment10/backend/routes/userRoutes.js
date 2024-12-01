const express = require('express');
const { login, register } = require('../controller/userController');
const Job = require('../models/Job');
const User = require('../models/User'); 
const router = express.Router();


router.post('/register', async (req, res) => {
  const { email, password, type, fullName } = req.body;

  if (!email || !password || !type || !fullName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['employee', 'admin'].includes(type)) {
    return res.status(400).json({ message: 'Invalid user type. Must be "employee" or "admin".' });
  }

  try {
    const newUser = await User.create({ email, password, type, fullName });
    res.status(201).json({
      message: 'User registered successfully',
      user: { email: newUser.email, type: newUser.type, fullName: newUser.fullName },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});



router.get('/all', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 

  try {
    const skip = (page - 1) * limit; 
    const users = await User.find({}, '-password') 
      .skip(skip)
      .limit(Number(limit)); 

    const totalUsers = await User.countDocuments(); 
    const totalPages = Math.ceil(totalUsers / limit); 

    res.json({
      users,
      totalUsers,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

router.delete('/', async (req, res) => {
  const { email, fullName } = req.body;

  if (!email && !fullName) {
    return res.status(400).json({ message: 'Email or fullName is required to delete a user' });
  }

  try {
    let user;

    if (email) {
      user = await User.findOneAndDelete({ email });
    } else if (fullName) {
      user = await User.findOneAndDelete({ fullName });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});



router.post('/login', login);
router.post('/register', register); 


module.exports = router;
