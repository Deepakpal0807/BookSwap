const express = require('express');
const router = express.Router();
const User = require('../Models/Book');

// Middleware to log request time
const timeLog = (req, res, next) => {
  // console.log('Time: ', new Date().toISOString());
  next();
};
router.use(timeLog);

// Import User model (assuming 'Book' is the correct model)

// GET route for retrieving books by user email
router.get('/', async (req, res) => {
   
   try {
    const data = await User.find({});
    return res.status(200).json(data);
    }
    catch(error){
        console.error('Error retrieving books:', error);
    }
});

module.exports = router;
