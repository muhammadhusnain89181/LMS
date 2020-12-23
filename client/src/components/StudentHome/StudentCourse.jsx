import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PieChart from '../layouts/PieChart'
import { Link, Route } from 'react-router-dom';
import CourseReport from '../layouts/CourseReport';
import store from 'store'
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    paddingLeft:20,
    marginTop:'20px',
  },
  title:{
    marginTop:30,
  },
});

const MediaCard=(props)=>{
  // const MediaCard=(props,{User,Course,percentage,title,name,code,title1,title2})=>{    
  const {Course,percentage,title,name,code,title1,title2}=props;
  const {user}=props.auth;
  const [student,setStudent]=useState('');
  useEffect(() => {
    console.log(`Studentcourses ${JSON.stringify(user.email)}`);
    Course.students.map((student)=>{
      if(student.roll_no===user.email){
        setStudent(student);
      }
    })
    if(student){
    console.log(`student :: ${student.email}`);
  }
  }, [user,Course,percentage,title,name,code,title1,title2])
  // console.log(`coverage : ${percentage} title :${title}`);
  const classes = useStyles();
  return (  
    <Link to={{
      pathname:'/studentsreports',
      state:{
        fromNotfications:true,
        course:Course,
        student:student }
        }}>  
      <Card className={classes.root}>
        <CardActionArea>
          <Typography className={classes.title} gutterBottom variant="h5" component="h3"> {title} </Typography>
            <CardMedia className={classes.media}>
              <PieChart 
                className={classes.media}
                Course={Course}
                percentage={percentage}
                title1={title1}
                title2={title2}
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                {name}
              </Typography>
              <Typography  gutterBottom variant="h5" component="h5">
                {code}
              </Typography>
            </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
MediaCard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(MediaCard);