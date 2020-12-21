// server/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Add this to the top of the file
const { roles } = require('../roles.js')
const keys = require('../config/Keys');
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
    console.log(`grantaccess called ${req.user.role}`);
   const permission = roles.can(req.user.role)[action](resource);
   console.log(`${permission.granted}`);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}

exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser;
  if (!user)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}

 
async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}
 
async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.register=async (req,res,next)=>{
  const {errors, isValid} = validateRegisterInput(req.body);
    
  if(!isValid){
      return res.status(400).json(errors);
  }

  User.findOne({email:req.body.email}).then(user=>{

      if(user){
          return res.status(400).json({email:"Email already exists"});
      } else{
          const newUser = new User({
              name:req.body.name,
              password:req.body.password,
              email:req.body.email,
              role:req.body.role || 'student'
          });

          // Hash password before storing in database
          const rounds  = 10;
          bcrypt.genSalt(rounds, (err, salt) => {
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

}
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
exports.signin=async (req,res,next)=>{
  console.log(`login called backend`);
  //Form Valdiation
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
      return res.status(400).json(errors);
  }
  console.log(`valid credentials`);

  const email = req.body.email;
  const password = req.body.password;
 
  //Find user by Email
  User.findOne({email}).then(user=>{
      if(!user){
        console.log(`existing user not found`);
          return res.status(404).json({ emailnotfound: "Email not found" });
      }

  // Check password
  bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
          // Create JWT Payload
          const payload = {
              id: user.id,
              name: user.name,
              email:user.email,
              role:user.role,
          };

          // Sign token
          jwt.sign(
              payload,
              keys.secretOrKey,
              {
               expiresIn: 31556926 
              },
              (err, token) => {
                console.log(`login succesfull`);
              res.json({
                  success: true,
                  token: "Bearer " + token
              });
              }
          );
      } else {
        console.log(`password incorrect`);
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
}

exports.signup = async (req, res, next) => {
    // console.log(`signup called with email id ${req.body.email}`);

 try {
      const { name,email, password, role } = req.body
      const existinguser=await User.findOne({email:email});
      if(existinguser){
        // console.log(`user exist ${email}`);
        return res.status(409).json({data:`Email already registered`})
      }else{              
              const hashedPassword = await hashPassword(password);
              const newUser = new User({name, email, password: hashedPassword, role: role || 'student' });
              const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
              expiresIn: "3d"
              });
              newUser.accessToken = accessToken;
              await newUser.save();
              res.json({
              data: newUser,
              accessToken
              // message:'You have Registered Successfully'
              })
            }
    }
            catch (error) {
              next(error)
        }
}
///-///---///
exports.login = async (req, res, next) => {
  // console.log(`Login called with email id ${req.body.email}`);
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return next(new Error('Email does not exist'))
    //  if (!user) {return res.status(409).json('Email does not exist')};
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return next(new Error('Password is not correct'))
     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
     });
     await User.findByIdAndUpdate(user._id, { accessToken })
    //  console.log(`${user.email} ${user.role} ${user.accessToken}`);
     res.json({
       message:'Succesfully Login',
       user:user,
       auth:true,
     })
    //  res.status(200).send({
    //   user: {name:user.name , email: user.email, role: user.role ,accessToken:user.accessToken}
    //  })
    } catch (error) {
     next(error);
    }
   }
// ...

exports.getUsers = async (req, res, next) => {
 const users = await User.find({});
 res.status(200).json({
  data: users
 });
}

exports.getUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) return next(new Error('User does not exist'));
   res.status(200).json({
   data: user
  });
 } catch (error) {
  next(error)
 }
}

exports.updateUser = async (req, res, next) => {
 try {
  const update = req.body
  const userId = req.params.userId;
  await User.findByIdAndUpdate(userId, update);
  const user = await User.findById(userId)
  res.status(200).json({
   data: user,
   message: 'User has been updated'
  });
 } catch (error) {
  next(error)
 }
}

exports.deleteUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
   data: null,
   message: 'User has been deleted'
  });
 } catch (error) {
  next(error)
 }
}

// ...
