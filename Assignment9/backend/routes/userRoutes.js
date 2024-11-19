const express = require('express');
const { login, register } = require('../controller/userController');
const router = express.Router();
const User = require('../models/User'); 

router.get('/all', async (req, res) => {
  try {
    const users = await User.find({}, 'email createdAt password'); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});



router.post('/login', login);
router.post('/register', register); 

  

module.exports = router;






