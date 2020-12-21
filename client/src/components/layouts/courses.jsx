import React, { Component,useEffect } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import {CardActions,CardActionArea,CardMedia, 
    Theme,makeStyles,createStyles,Grid} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '../../components/Chat/icons/22x22.png'
import { CardHeader } from '@material-ui/core';
import NewCard from '../../components/layouts/Card2'
const CoursesList=({User,Teacher})=>{
    useEffect(() => {
        if(Teacher.length>0){
        console.log(`check course : ${Teacher.length} :: ${Teacher[0].percomplete}`);

    }
  },[Teacher])
        // return( Teacher.courses.map((course)=>{
          return( Teacher.map((course)=>{
          return (
                  // course.student.map((student)=>{
                  //   return(
                      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <NewCard User={User} Course={course} percentage={course.percomplete} title={'Coverage'}
                        name={course.courseName} code={course.courseCode} title1={'Complete'} title2={'Incomplete'} />
                      </Grid>
                    // )}
                  // )
                  //  <Grid item xs={12} sm={6} md={4} lg={2} >
                  //       <NewCard Course={course}/>
                  // </Grid>
          )
      })
  )
}
export default CoursesList
