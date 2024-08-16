const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  images: [{
    type: String, // Change this to type String to store image URLs
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  userEmails: [
    {
      type: String,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
  ],
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
