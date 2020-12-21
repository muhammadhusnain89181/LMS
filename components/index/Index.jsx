import React,{useEffect,useState,createContext,useContext} from 'react'
import Layout from '../layouts/Layout'
import Animated from '../other/Animated'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import {useAlert} from 'react-alert'
import {CardActions,CardActionArea,CardMedia, 
  Theme,makeStyles,createStyles,Grid, Paper} from '@material-ui/core'
import Icon from '../Chat/icons/dotmatrikslogo.png'
import './index.scss'
import path from 'path'
import Courses from '../layouts/courses'
import axios from 'axios'
import Upload from '../Chat/icons/upload.png'
import AuthApi from '../../utils/AuthApi'
import store from 'store'
import StudentDashboard from '../StudentHome/Dashboard'
import TeacherDashboard from '../TeacherHome/TeacherHome'
const useStyles = makeStyles((theme) => createStyles({
  dashboard: {
    paddingLeft:'20px',
    paddingRight:'20px'
      }
}));

const Index = ({location}) => {
  const authApi=useContext(AuthApi)
  const classes=useStyles();
  const alert = useAlert()
  const [newname, setName]= useState('');
  const [newroom, setRoom]= useState('');
  const [file, setFile]= useState('');
  const [data,setData]=useState('');
  // const [teacher,setTeacher]=useState('');
  const [user,setUser]=useState(store.get('user'))
  const currentUser=createContext(store.get('user'));
  // const [token,setToken]=useState(getFromStorage('token'))
  
  useEffect(()=>{
    localStorage.removeItem('course')
    // axios.get('http://localhost:3000/teacher/'+'teacherdemo@gmail.com')
    axios.get('http://localhost:3000/course/teacher/'+user.email)
    .then((response)=>{
      setData(response.data.teachers)
      console.log(`check user is ${user.email}`);
      console.log(`teacher is ${user.role}`);
      // console.log(`teacher is ${store.get('user').id} ::${store.get('user').email} ::${store.get('user').role} :: ${store.get('user').accessToken}`);
    })
    .catch((error)=>console.log(error))
  },[])
  const chooseFile=(event)=>{
    // setFile(event.target.files[0]) 
    const fileReader=new FileReader();
    fileReader.readAsText(event.target.files[0],'UTF-8');
    fileReader.onload=(e)=>{
      console.log(`chooseFile called read file`);
      const fileObject=JSON.parse(e.target.result);
      setFile(fileObject)
    }
  }
  const readFile=()=>{
    // console.log(` user is : ${currentUser} ::: file is : ${file.reg_id}`);
    // if(file && file.reg_id===currentUser.email){
    //     const teacher={          
    //       name:file.projectName,
    //       email:file.reg_id,
    //       contact:file.contact,
    //       address:file.address,
    //       qualification:file.tprojectqualification,
    //       courses:file.courses,
    //     }
    //     console.log(`file is ${teacher.name}`);
    //     axios.post('http://localhost:3000/teacher/addTeacher',teacher).
    //     then((response)=>{
    //         if(response.status===200){
    //           alert.success('File Succesfully Uploaded')
    //         }
    //     })
    // }else{
    //   alert.error('Please select your project')
    // }

    if(file){
      const teacher={
        name:file.projectName,
        email:file.reg_id,
        contact:file.contact,
        address:file.address,
        qualification:file.tprojectqualification,    
      }
      console.log('obj',teacher);
      const newList=file.courses.map((course)=>{
        const newcourse={
        courseName:course.courseName,
        courseCode:course.courseCode,
        creditHours:course.creditHours,
        percomplete:course.percomplete,
        plo:course.plo,
        courseDateCreated:course.courseDateCreated,
        courseDateModified:course.courseDateModified,
        courseStatus:course.courseStatus,
        chapters:course.chapters,
        teachers:[{
          name:file.projectName,
          email:file.reg_id,
          contact:file.contact,
          address:file.address,
          qualification:file.tprojectqualification,
        }],
        students:course.student,
      }
      console.log(`newcourse called ${newcourse.courseName}`);
      axios.post('http://localhost:3000/course/addCourse',newcourse).
        then((response)=>{
            if(response.status===200){
              // alert.success(response)
              alert('File Succesfully Uploaded')
            }
        })
      // console.log('course',newcourse);
      })    
      // file.courses=newList;
      // axios.post('http://localhost:3000/course/addCourse',file).
      //   then((response)=>{
      //       if(response.status===200){
      //         alert(response)
      //         alert.success('File Succesfully Uploaded')
      //       }
      //   })
      // axios.post('http://localhost:3000/course/addCourse',teacher).
      // then((response)=>{
      //   alert(response);
      // }).then((error)=>{
      //   alert(error);
      // })
    }
  }
  const check=()=>{
    console.log(user);
    console.log(user.email);
    console.log(data.length);
  }
  // useEffect(() => {
  //   localStorage.removeItem('course')
  //   console.log(`useEffecr from Index `);
  //   const { name, room } = queryString.parse(location.search);
  //   setName(name);setRoom(room);
  //   console.log(`file 2 is ${file}`);
  // }, [user])  
  return(
    <currentUser.Provider>
      <Layout>
        <Animated>
          { user.role==='student' ? 
          <StudentDashboard/> 
          : <TeacherDashboard/>
      }           
        </Animated>
    </Layout>
    </currentUser.Provider>                
  )
 }
export default Index
