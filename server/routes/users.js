const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require('passport');

// Load User model
const User = require("../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("http://localhot:3001/users/register/", async(req, res) => {
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      console.log(req.body.name+req.body.email+req.body.password)
      //onmouseleave.log(req.body.name+req.body.email+req.body.password)
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (user) {
      // Check password
     bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        console.log(payload)
        // Sign token
        let token=jwt.sign(payload,keys.secretOrKey,{
            expiresIn: 31556926 // 1 year in seconds
          },(err, token) => {res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } 
      else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  }
   else{return res.status(404).json({ emailnotfound: "Email not found" });}
  });
});

module.exports = router;