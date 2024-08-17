const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const login = require('./Routes/login')
const Signup=require('./Routes/Signup')
const AddBook=require('./Routes/AddBook');
const Search=require('./Routes/Search');
// Middleware

// Database connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Bookswap', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Define the User model
const User = require('./Models/User'); // Ensure the path to your User model is correct
app.use(bodyParser.json());
app.use(cors());
app.use('/login',login);
app.use('/signup',Signup);
app.use('/addbook',AddBook);
app.use('/Search',Search);

// Routes
app.get('/', (req, res) => {

  res.send('Hello World!');
});
// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
