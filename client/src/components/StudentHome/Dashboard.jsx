import React,{useEffect,useState} from 'react'
import {makeStyles,createStyles,Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'
import StudentCourses from './StudentCourses'
import axios from 'axios'
import store from 'store'
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => createStyles({
  dashboard: {
    paddingLeft:'20px',
    paddingRight:'20px',
      }
}));
function Dashboard(props) {
  const {user}=props.auth;
  const [data,setData]=useState('');  
  // const [user,setUser]=useState(store.get('user'));
  useEffect(() => {
    axios.get('http://localhost:3000/course/student/'+'muhammadusama@gmail.com')
      .then((response)=>{
        setData(response.data.courses)
        console.log(`${response.data.courses.length}`);
        // console.log(`check user is ${user.email}`);
        // console.log(`teacher is ${user.role}`);
        // console.log(`teacher is ${store.get('user').id} ::${store.get('user').email} ::${store.get('user').role} :: ${store.get('user').accessToken}`);
      })
      .catch((error)=>console.log(error))
    },[user.id,user.name,user.email])
  const classes =useStyles();
  return (
      <div className='jumbotron text-center mainIndex'>
        <div className='card'>
          <div className='card-title h2'>Welcome to Dotmatriks LMS {user.email}</div>
          <hr className='my-4' />
          <div className='card-body'>
            <div className="h2">Student Courses Overview </div>
            <Grid container spacing={4} className={classes.dashboard} justify='center'>
                { data.length > 0 ?
                
                <StudentCourses User={user} Courses={data}/>

                  : 
                  
                  <>                    
                    <div className='h5'>Loading...</div>                    
                  </>
                  
                  }
            </Grid>
            <hr className='my-4' />
                <div className='pt-2'>
                  <Link to={`/watch/?name=name&room=room`} className='btn waves-effect purple-gradient btn-round'>Join Class <i className='fas fa-eye ml-1'></i></Link>
                </div>
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
