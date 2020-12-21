const express=require('express')
const router=express.Router()
const Visitor=require('../models/Visitor')
const {v4:uuidv4}=require('uuid')

router.get('/getAllVisitor',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    //res.status(200).json(`server is up and running`)
    try{
        const newvisitor=await Visitor.find();       
        res.status(201).json(newvisitor)
    }
    catch(e)
    {res.status(500).json({messgae:e.message})}
})
//Add Visitor
router.post('/addVisitor',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin' , 'http://localhost:3001');
    const visitor=new Visitor({
        id:uuidv4(),
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        courses:req.body.courses
    });try{
        if(visitor!=null){
            console.log(visitor)
            const newvisitor=await visitor.save()
            res.status(201).json(newvisitor)                    
    }else{res.status(404).json('User is empty')}
}catch(e){res.status(500).json({message:e.message})}
})
//Update Visitor
router.post('/checkout/:id',async(req,res)=>{
    console.log('checkout is called'+req.params.id+" : "+req.body._id+" : "+req.body.full_name);
    Visitor.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          res.json(data)
          console.log('Student updated successfully !')
        }
      })
    //console.log(Visitor.findById(req.params.id));
})
//Remove Visitor
router.delete('/deleteVisitor/:id',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    Visitor.findByIdAndDelete({_id:req.params.id}, function(err, visitor){
        if(err) res.json(err);
        else res.status(201).json('Successfully removed');
    });
})
router.get('/getByPurpose/:purpose',async(req,res)=>{
    //console.log(req.params.startdate + req.params.startdate +req.params.purpose)
    var result=await Visitor.find();
    const all=[];
    const visitors = Visitor.find({purpose_of_visit:req.params.purpose});
    //const visitors = Visitor.find();    //{$gte: "2020-04-04T19:00:00.000Z", "$lt": new Date("2014-04-04")    
    // const visitors = Visitor.find({ 
    //     date:{
    //           $gte: new Date(new Date(req.params.startdate).setHours(00, 00, 00)),
    //           $lt: new Date(new Date(req.params.enddate).setHours(23, 59, 59))
    //          }
    //         })  //.sort({ date: 'asc'})
    //      console.log(result)
    result.forEach(element => {
        if(element.purpose_of_visit===req.params.purpose)
        {
            all.push(element);
            //console.log("element : "+element._id);          
        }        
    });
    //console.log(all)
    res.status(201).json(result);
})
router.get('/getSpecificV/:startdate',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    try{
        var all=await Visitor.find();
        const result=[];
        all.forEach(element => {
            if(element.date===req.params.startdate)
                result.push(element);
                //res.status(201).json(element);
        });
        //const newvisitor=await Visitor.fin .find();
        res.status(201).json(result)
    }
    catch(e)
    {res.status(500).json({messgae:e.message})}
})
module.exports=router