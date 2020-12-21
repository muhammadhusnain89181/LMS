const express=require('express')
const router=express.Router()
const Student=require('../models/student')
const keys=require('../config/keys')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')


router.post("/register/",  async(req,res)=>{
    const student=await Student.findOne({email:req.body.email});
    if(student){
        console.log(`${req.body.email} already exists`);
         return res.json('Email already exists')
        // console.log(`${res.statusCode}`);
        // console.log(`Error ${res.status(409).json(student)}`);
        // return res.status(400).json('Email already exists');
        
    }else{
        const newStudent=new Student({
            full_name:req.body.full_name,
            email:req.body.email,
            password:req.body.password,
            courses:req.body.courses
          });
          console.log(`New Student ${newStudent.full_name} : ${newStudent.email} : 
          ${newStudent.password} : ${newStudent.courses[0]}`);

          bcrypt.hash(newStudent.password, 10, function(err, hash) {
            // Store hash in database
            if(err) {throw err;}
            else{ 
                newStudent.password=hash;
                console.log(hash);
                newStudent.save().then(student=>res.status(201).json(student))
              .catch(err=>console.log(err))
            }
            })
            console.log(`${res}`);
    }
});
//router.get('login')
router.get('/login/:email/:password',async(req,res)=>{
//router.get('/login/',async(req,res)=>{
        
    // console.log(`id ${req.body.email} password ${req.body.password}`)
    const email=req.params.email;
    const password=req.params.password;

    console.log(`id ${email} password ${password}`)
    const student=await Student.findOne({email});
    if(!student){
        
        console.log(`statuscode ${res.statusCode} not registered`);
        return res.status(400).json({email:"Email already exists"});
            // return res.status(404).json({studentnotfound:"Email not registered"});
        }
        else{
            // Check password
            bcrypt.compare(password, student.password).then(isMatch => {
                if (isMatch) {
                 // Passwords match
                 const payload={
                     id:student.id,
                     name:student.name
                 };
                 //Token
                 jwt.sign(
                     payload,
                     keys.secretOrkey,
                     {
                         expiresIn:31556926
                     },
                     (err,token)=>{
                         console.log(`statuscode ${res.statusCode}`);
                          return res.status(201).json({
                             success:true,
                             token:"Bearer"+token
                         });
                     }
                 );
                } else {
                 // Passwords don't match
                 console.log(`statuscode ${res.statusCode} Passwords don't match`);
                 return res.status(400).json({passwordincorrect :"Incorrect password"});
                } 
              });
        }
})

//Getting All Student
router.get('/',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    try{const studenta=await Student.find()
    res.json(studenta)
    }catch(e){
        alert(res)
        res.status(500).json({message:e.message})
    }
})
//Saving a new Student
router.post('/addstudent/',async(req,res)=>{
    console.log(req.body.id)
    const studentinfo=new Student({
        _id:req.body.id,
        name:req.body.name,
        password:req.body.password
    })
    try{
        console.log(studentinfo)
        console.log(req.body.name+req.body.password)
        const student=await Student.findById(req.body.id)
            if(student!=null){
                res.status(400).json('Id already exist')
                console.log('Already Exist'+req.body.id)
            }
            else{
                const newstudent=await studentinfo.save()
                res.status(201).json(newstudent)
                console.log('Saved Sucessfully')
            }
    }
    catch(e){
        res.status(500).json({message:e.message})
        console.log('Exception')
    }
})
//Getting one Student
router.get('/getStudent/:id',async(req,res)=>{
    try
    {
        const student=await Student.findById(req.params.id)
        if(student!=null){
            console.log(student)
            res.status(200).json(student)
            console.log('Sucessfully')
        }
        else{
            res.status(404).json({message:'Not found'});
            console.log('Does not exist')
            }
    }
    catch(e)
    {
        res.status(500).json({message:e.message})
    }
})
//Updating one Student
router.patch('/updateStudent/:id',async(req,res)=>{
    try
    {
        console.log(req.params.id)
            Student.findByIdAndUpdate(req.params.id,
                req.body,
                {new:true},
                (err,student)=> {
                        if (err) return res.status(500).send(err);
                        res.status(201).json(student);
                })
    }
    catch(e)
    {
        res.status(500).json({message:e.message})
    }
})
//Delet One Student
router.delete('/deleteStudent/:id',async(req,res)=>{
    try{
        const student= await Student.findByIdAndDelete(req.params.id)
        if(student!=null){
             await student.remove()
            res.status(201).json({message:"Removed"})
            console.log('Removed Successfully')
        }else{res.status(404)}
    }catch(e){ console.log(e.message)}
})

module.exports=router
