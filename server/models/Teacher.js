const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const teacherSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },    
    contact:{
        type:String,
    },
    address:{
        type:String,
    },
    qualification:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=Teacher=mongoose.model('teachers',teacherSchema)