const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const login = require('./Routes/login')
const Signup=require('./Routes/Signup')
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
app.use('/signup',Signup)

// Routes
app.get('/', (req, res) => {

  res.send('Hello World!');
});

//     try {
//       const { email, password } = req.query; // Use req.query for GET request parameters
  
//       if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//       }
  
//       // Find user by email
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid email' });
//       }
  
//       // Check password (assuming plaintext for simplicity, use hashing in production)
//       if (user.password !== password) {
//         return res.status(401).json({ message: 'Invalid password' });
//       }
  
//       res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error logging in' });
//     }
//   });



// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
