const express = require('express')
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
const User = require('../Models/User');
router.get('/', async (req, res) => {
  
    try {
      const { email, password } = req.query; // Use req.query for GET request parameters
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }
  
      // Check password (assuming plaintext for simplicity, use hashing in production)
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  });

// define the about route


module.exports = router