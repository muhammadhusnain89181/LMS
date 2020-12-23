import React,{useEffect,useState,createContext,useContext} from 'react'
import Layout from '../layouts/Layout'
import Animated from '../other/Animated'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import {useAlert} from 'react-alert'
import {CardActions,CardActionArea,CardMedia, 
  Theme,makeStyles,createStyles,Grid, Paper,Button} from '@material-ui/core'
import Icon from '../Chat/icons/dotmatrikslogo.png'
// import './index.scss'
import path from 'path'
import {getFromStorage,setInStorage} from '../../utils/storage'
import Courses from '../layouts/courses'
import axios from 'axios'
import Upload from '../Chat/icons/upload.png'
import AuthApi from '../../utils/AuthApi'
import store from 'store'
import StudentDashboard from '../StudentHome/Dashboard'
import Loader from 'react-loader-spinner'
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { readFileSync } from 'fs'
const useStyles = makeStyles((theme) => createStyles({
  dashboard: {
    paddingLeft:'20px',
    paddingRight:'20px',
      }
}));
function Dashboard(props) {
    const {user}=props.auth;
    const [res,setRes]=useState('');
    const authApi=useContext(AuthApi)
    const classes=useStyles();
    const alert = useAlert();        
    const [file, setFile]= useState('');
    const [data,setData]=useState('');
    const [newname, setName]= useState(user.role);
    const [newroom, setRoom]= useState(user.email);
    const currentUser=createContext(sessionStorage.getItem('user'));
    // const [token,setToken]=useState(getFromStorage('token'))
    
    useEffect(()=>{
      localStorage.removeItem('course')
      // axios.get('http://localhost:3000/teacher/'+'teacherdemo@gmail.com')
      axios.get('http://localhost:3000/course/teacher/'+user.email)
      .then((response)=>{
        setData(response.data.courses)
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
    const readFile= async()=>{
  
      if(file){
          file.courses.map((course)=>{
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
                if(response.status===200){ setRes('200') }
            })
          });
          alert.success('Succesfuly Uploaded')
    }
    }
    const check=()=>{
      console.log(user);
      console.log(user.email);
      console.log(data.length);
    }
    return(
            <div className='jumbotron text-center mainIndex'>
              <div className='card'>
                <div className='card-title h2' onClick={check}>Dotmatriks LMS</div>
                <div className='card-body'>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <input className='card-title h5' type='file' onChange={chooseFile}/>
                    <Button variant="outlined" onClick={readFile} color="default" startIcon={<CloudUploadIcon/>} >
                      Upload
                    </Button>
                    {/* <Button
                      <button className='btn btn-round aqua-gradient' onClick={readFile}>
                      <img src={Upload} />
                    </button> */}
                  </Grid>
                </div> 
              </div>
              <div className="card">
                  <div className="h2">Courses Overview </div>
                  <div className="card-body">
                    <Grid container spacing={4} className={classes.dashboard} justify='center'>
                      {/* { teacher && teacher.courses.length > 0 ? */}
                              
                      { data.length > 0 ?
                      
                        <Courses  User={user} Teacher={data}/>                                               
  
                      : 
                      
                      <>
                        <Loader type='Puff' color='#00BFFF' height={100} width={100} timeout={3000}/>               
                      </>
                      
                      }
                    </Grid>
                  </div>
                  <hr className='my-4' />
                <div className='pt-2'>
                  <Link to={`/stream/?name=${newname}&room=${newroom}`} className='btn btn-round aqua-gradient'>Start Class<span className='fas fa-broadcast-tower ml-1'></span></Link>
                  <Link to={`/watch/?name=${newname}&room=${newroom}`} className='btn waves-effect purple-gradient btn-round'>Join Class <i className='fas fa-eye ml-1'></i></Link>
                </div>
              </div>
                
            </div>               
    )
   }
Dashboard.propTypes = {
logoutUser: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);