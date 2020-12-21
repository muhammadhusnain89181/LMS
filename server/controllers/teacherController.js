const Teacher=require('../models/Teacher');
// const Course=require('../models/Course')
exports.addTeacher=async(req,res,next)=>{
    console.log(`addTeacher called`);
    try{
        const { name,email,contact,address,qualification,courses }=req.body;
        // console.log(`${name}`);
        const existingTeacher=await Teacher.find({email:email});
        if(existingTeacher){
            console.log(`Teacher exist ${existingTeacher.email}`);
            return res.start(409).send('Teacher Already Exist')
        }else{
            console.log(`addTeacher called`);
            const newteacher=new Teacher({
                name:name,
                email:email,
                contact:contact,
                address:address,
                qualification:qualification,
            });
            await newteacher.save();
            res.json({newteacher})
        }
    }
    catch(error){next(error)}
}
exports.getTeacher = async (req, res, next) => {
    try {
     const userId = req.params.teacherId;
     console.log(`email is ${userId}`);
     const teacher = await Teacher.findOne({email:userId});
     console.log(`user is ${teacher}`);
     if (!teacher) return next(new Error('User does not exist'));
      res.status(200).send({teacher});
    } catch (error) {
     next(error)
    }
   }
exports.getTeachers = async (req, res, next) => {
    console.log(`get teachers called server`);
const teachers = await Teacher.find({});
res.status(200).json({
    data: teachers
});
}
exports.deleteTeacher = async (req, res, next) => {
    try{
    const userId = req.params.email;console.log(`delete teacher called with id ${req.params.teacherId}`);
    const teacher=Teacher.findOneAndDelete({email:req.params.teacherId})
  await Teacher.findOneAndDelete(teacher._id);
  res.status(200).json({
   data: '',
   message: 'User has been deleted'
  });
 } catch (error) {
  next(error)
 }
}