import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PieChart from './PieChart'
import { Link, Route } from 'react-router-dom';
import CourseReport from './CourseReport';
import {getFromStorage,setInStorage} from '../../utils/storage'

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

export default function MediaCard({User,Course,percentage,title,name,code,title1,title2}) {
  useEffect(() => {
    console.log(`percentage :: ${percentage}`);
  }, [percentage,title,name,code,title1,title2])
  // console.log(`coverage : ${percentage} title :${title}`);
  const classes = useStyles();
  return (  
    <Link to={{
      pathname:'/reports',
      state:{
        fromNotfications:true,
        course:Course, }
        }}>  
      <Card className={classes.root}>
        <CardActionArea>
          <Typography className={classes.title} gutterBottom variant="h5" component="h3"> {title} </Typography>
            <CardMedia className={classes.media}>
              <PieChart 
                className={classes.media}
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
