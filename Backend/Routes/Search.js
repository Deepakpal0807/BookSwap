const express = require('express');
const router = express.Router();
const Book = require('../Models/Book');

// Middleware to log request time
const timeLog = (req, res, next) => {
  // console.log('Time: ', new Date().toISOString());
  next();
};
router.use(timeLog);

// GET route for searching books
router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    const { bookName, authorName, genre } = req.query;

    // Initialize the search query object
    let searchQuery = {};

    // Add conditions based on filled query parameters
    if (bookName) {
      searchQuery.bookName = { $regex: bookName, $options: 'i' };
    }
    if (authorName) {
      searchQuery.authorName = { $regex: authorName, $options: 'i' };
    }
    if (genre) {
      searchQuery.genre = genre;
    }

    // If no search criteria were provided, return an empty array
    if (Object.keys(searchQuery).length === 0) {
      return res.status(200).json([]);
    }

    // Search the books in the database
    const books = await Book.find(searchQuery);

    // Return the search results
    res.status(200).json(books);
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: 'Error searching books' });
  }
});

module.exports = router;
