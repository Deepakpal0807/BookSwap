const express = require('express');
const router = express.Router();

// Middleware to log request time
const timeLog = (req, res, next) => {
  console.log('Time: ', new Date().toISOString());
  next();
};
router.use(timeLog);

// Import User model (assuming 'Book' is the correct model)
const User = require('../Models/Book');

// GET route for retrieving books by user email
router.get('/', async (req, res) => {
    try {
        const { email } = req.query;
        console.log('email:', email); // This will specifically log the email
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find all books associated with the user's email
        const data = await User.find({ userEmails: email });

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No books found for this user' });
        }

        // Log the data before sending it as a response
        // console.log('Books found:', data);

        // Send the data as a response
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error retrieving books:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
