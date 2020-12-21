const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/Keys');
const {v1}=require('uuid')
const passport = require('passport');

// Load User model
const User = require("../models/User");

const hashPassword= async ()=>{
  return await bcrypt.hash(password,10);
}
const validatePassword=async(plainPassword,hashedPassword)=>{
  return await bcrypt.compare(plainPassword,hashedPassword)
}
exports.signup=async(req,res,next)=>{
  try{
    const {email,password,role}=req.body;
    const hashedPassword=await hashedPassword(password);
    const newUser=new User({email,password:hashPassword,role:role || 'basic'});
    const accessToken=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,
      {expiresIn:'1d'});
      newUser.accessToken=accessToken;
      await newUser.save();
      res.json({
        data:newUser,
        accessToken
      });
  }catch(error){next(error)}
}

exports.login=async(res,req,next)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Error('Email does not exist'));
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error('Password is not correct'))
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
     expiresIn: "1d"
    });
    await User.findByIdAndUpdate(user._id, { accessToken })
    res.status(200).json({
     data: { email: user.email, role: user.role },
     accessToken
    })
   } catch (error) {
    next(error);
   }
}
// @route POST api/users/register
// @desc Register user
// @access Public
// router.post("http://localhot:3000/users/register/", async(req, res) => {
//   router.post("/register", async(req, res) => {
  
//   User.findOne({ email: req.body.email }).then(user => {
//     if (user) {
//       return res.status(400).json({ email: "Email already exists" });
//     } else {
//       const newUser = new User({
//         id:v1,
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         courses:req.body.courses
//       });
//       console.log(req.body.name+req.body.email+req.body.password +courses[0]+courses[1]+courses[2])
//       //onmouseleave.log(req.body.name+req.body.email+req.body.password)
//       // Hash password before saving in database
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   });
// });

// // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post("/login", async(req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check if user exists
//     if (user) {
//       // Check password
//      bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           name: user.name
//         };
//         console.log(payload)
//         // Sign token
//         let token=jwt.sign(payload,keys.secretOrKey,{
//             expiresIn: 31556926 // 1 year in seconds
//           },(err, token) => {res.json({
//               success: true,
//               token: "Bearer " + token
//             });
//           }
//         );
//       } 
//       else {
//         return res
//           .status(400)
//           .json({ passwordincorrect: "Password incorrect" });
//       }
//     });
//   }
//    else{return res.status(404).json({ emailnotfound: "Email not found" });}
//   });
// });

module.exports = router;