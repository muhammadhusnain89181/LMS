// server/routes/route.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const teacherController=require('../controllers/teacherController')
const courseController=require('../controllers/courseControler')

router.post('/signup', userController.register);

router.post('/login', userController.signin);

router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.post('/teacher/addTeacher',teacherController.addTeacher)

router.get('/teachers',  teacherController.getTeachers);

router.get('/teacher/:teacherId', teacherController.getTeacher);

router.delete('/teacher/:teacherId', teacherController.deleteTeacher);

router.post('/course/addCourse',courseController.addCourse)

router.get('/courses',  courseController.getCourses);

router.get('/course/teacher/:teacherId', courseController.getTeacherCourses);

router.get('/course/student/:studentId', courseController.getStudentCourses);

router.delete('/course/:courseId', courseController.deleteCourse);

router.delete('/courses', courseController.deleteCourses);

module.exports = router;