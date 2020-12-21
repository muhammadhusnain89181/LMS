const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    courseName: {
    type: String,
    required: true
    },
    courseCode: {
    type: String,
    required: true
    },
    creditHours: {
    type: String,
    required: true
    },
    percomplete:{
    type:String,
    required:true
    },
    plo: {
    type: Array,
    required:true
    },
    courseDateCreated: {
    type: String,
    required: true
    },
    courseDateModified: {
    type: String,
    required: true
    },
    courseStatus:{
    type:String,
    required:true
    },
    chapters: {
    type: Array,
    required:true
    },
    teachers: {
    type: Array,
    required:true,
    },    
    students: {
    type: Array,
    required:true
    },
      
})

module.exports=mongoose.model('Course',courseSchema)