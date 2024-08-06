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
router.post('/', async (req, res) => {
  
    
        // console.log(req.body.data.avatar);
        try {
          const { email, password, name, city, state, pincode } = req.body.data;
      
          if (!email || !password || !name || !city || !state || !pincode) {
            return res.status(400).json({ message: 'All fields are required' });
          }
      
          const newUser = new User({
            email,
            password,
            name,
            city,
            state,
            pincode,
          });
      
          await newUser.save();
      
          res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
        //   console.error(error);
          res.status(500).json({ message: 'Error creating user' });
        }
      });

// define the about route


module.exports = router