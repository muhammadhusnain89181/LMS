const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const VisitorSchema=new mongoose.Schema({
  id:{type:String,
    required:true},
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
});
module.exports=Visitor=mongoose.model('visitors',VisitorSchema)