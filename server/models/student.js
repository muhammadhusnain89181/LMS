const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    full_name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      courses:{
        type:Array,
        required:true
      },
      date: {
        type: Date,
        default: Date.now
      }
})

module.exports=mongoose.model('Student',studentSchema)