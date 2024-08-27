const express = require('express');
const router = express.Router();

// Middleware to log request time
const timeLog = (req, res, next) => {
  // console.log('Time: ', new Date().toISOString());
  next();
};
router.use(timeLog);

// Import Book model
const Book = require('../Models/Book');

// POST route for adding a book
router.post('/', async (req, res) => {
  try {
    // console.log(req.body);

    const { bookName, authorName, genre, description, price, images, userEmails } = req.body;

    // Create a new Book document
    const newBook = new Book({
      bookName,
      authorName,
      genre,
      description,
      images,
      price,
      userEmails
    });

    // Save the book to the database
    await newBook.save();

    // Return a success response
    res.status(200).json({ message: 'Book added successfully' });

  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Error adding book' });
  }
});

module.exports = router;
