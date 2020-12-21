const Course=require('../models/Course');

exports.addCourse=async(req,res,next)=>{
    console.log(`addCourse called`);
    try{
        const {courseName,courseCode,creditHours,percomplete,plo,
            courseDateCreated,courseDateModified,courseStatus,chapters,
            teachers,students}=req.body;
            const options={
                new:true,
                upsert:true,
                overwrite:true,
            }
            const update={
                courseName:courseName,
                courseCode:courseCode,
                creditHours:creditHours,
                percomplete:percomplete,
                plo:plo,
                courseDateCreated:courseDateCreated,
                courseDateModified:courseDateModified,
                courseStatus:courseStatus,
                chapters:chapters,
                teachers:teachers,
                students:students
            }
            console.log(`course exist ${update.courseCode}`);
            const result=await Course.findOneAndUpdate({courseCode:courseCode},update,options,(doc,err)=>{

                if(err){
                    res.json({err})
                }else{
                    res.json({doc});
                }
            })       
            //-///--///////////    
        // }
        // else{const course=new Course({ 
        //     courseName:courseName,
        //     courseCode:courseCode,
        //     creditHours:creditHours,
        //     percomplete:percomplete,
        //     plo:plo,
        //     courseDateCreated:courseDateCreated,
        //     courseDateModified:courseDateModified,
        //     courseStatus:courseStatus,
        //     chapters:chapters,
        //     teachers:teachers,
        //     students:students
        // });   
        // console.log(`body is ${course.courseName} : ${course.courseCode} : ${course.creditHours} 
        //         ::${students.length} `);
        //     await course.save();
        //     res.json({course})}
    }
    catch(error){next(error)}
}
exports.getTeacherCourses = async (req, res, next) => {
    try {
        console.log(`getTeacherCourses`);
     const teacherId = req.params.teacherId;
     const courses = await Course.find({'teachers.email':teacherId});
    //  if (!teacher) return next(new Error('User does not exist'));
      res.status(200).send({courses});
    } catch (error) {
     next(error)
    }
   }
exports.getStudentCourses = async (req, res, next) => {
try {
    const studentId = req.params.studentId;
    console.log(`getStudentCourses ::: ${studentId}`);
    const courses = await Course.find({'students.roll_no':studentId});
//  console.log(`user is ${courses}`);
//  if (!teacher) return next(new Error('User does not exist'));
    res.status(200).send({courses});
} catch (error) {
    next(error)
}
}
exports.getCourses = async (req, res, next) => {
    console.log(`get courses called server`);
    const courses = await Course.find({});
    res.status(200).json({
    data: courses
});
}
exports.deleteCourse = async (req, res, next) => {
    try{
    const Code = req.params.courseId;console.log(`delete course called with id ${req.params.courseId}`);
    const course=Course.findOneAndRemove({courseCode:Code})
    console.log(course);
  res.status(200).json({
   data: '',
   message: 'User has been deleted'
  });
 } catch (error) {
  next(error)
 }
}
exports.deleteCourses = async (req, res, next) => {
    try{
    await Course.deleteMany();
    res.status(200).json({
         data: '',
        message: 'All User has been deleted'
  });
 } catch (error) {
  next(error)
 }
}