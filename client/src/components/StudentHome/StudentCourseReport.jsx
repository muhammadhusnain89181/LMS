import React,{useEffect,useState} from 'react'
import { Grid,makeStyles,createStyles, } from '@material-ui/core';
import {Card,CardActionArea,CardContent,CardMedia,Typography,
    CardActions,Button,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText,} from '@material-ui/core'
import PieChart from '../layouts/PieChart'
import StudentCourse from './StudentCourse'
import Layout from '../layouts/Layout';
import BarChart from '../layouts/BarChart'
import { DataGrid } from '@material-ui/data-grid';
import StudentAttendanceReport from './StudentAttendanceReport';
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
function CourseReport(props) {
    const classes = useStyles();
    let presents,absents;
    const {course,student}=props.location.state;
    const [open,setOpen]=useState(false);
    const [rows,setRows]=useState([]);
    const chartarr=[student.classparticipates,student.marks];
    const columns = [
      { field: 'date', headerName: 'Date', width: 300 },
      { field: 'attendance', headerName: 'Attendance', width: 150 },
    ];
    useEffect(() => {
        if(student){
            var temprows=[];
        student.attendancelist.map((attendance)=>{
            const newattendance={
                date:attendance.date,
                attendance:attendance.attendance,
            }
            temprows.push(newattendance);
        });setRows(temprows)
    }
    }, [])
    const handleClose=(val)=>{
        setOpen(val);
    }
    return (
        <Layout>
            <div className='jumbotron text-center mainIndex'>
            <div className='card-body'>
                <div className="h2">Student Courses Overview </div>
                <Grid container spacing={4}  justify='center'>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <BarChart title='Participation Report' X={['Participation','Marks']} Y={chartarr}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>

                        {/* <StudentCourse Course={course} percentage={course.percomplete} title={'Attendance Report'}
                        name={course.courseName} code={course.courseCode} title1={'Present'} title2={'Absents'} /> */}
                        <Card className={classes.root}>
                        <CardActionArea>
                        <Typography className={classes.title} gutterBottom variant="h5" component="h3"> Attendance Report </Typography>
                            <CardMedia className={classes.media}>
                            <PieChart 
                                className={classes.media}
                                Course={course}
                                percentage={course.percomplete}
                                title1='Present'
                                title2='Absents'
                            />
                            </CardMedia>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h3">
                                {course.courseName}
                            </Typography>
                            <Typography  gutterBottom variant="h5" component="h5">
                                {course.courseCode}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        <Button onClick={()=>{handleClose('true')}} style={{marginLeft:'100px'}} variant='outlined' size="large" color="primary">
                            Show More
                            </Button>                            
                        </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">{`${student.name} Attendance Report`}</DialogTitle>
                    <DialogContent >                        
                    <DialogContentText
                        id="scroll-dialog-description"
                        // ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <StudentAttendanceReport rows={rows}/>
                        {/* <DataGrid  pageSize={10} /> */}
                        {/* {[...new Array(50)]
                        .map(
                            () => `Cras mattis consectetur purus sit amet fermentum.
            Cras justo odio, dapibus ac facilisis in, egestas eget quam.
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')} */}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
      </Layout>
    )
}

export default CourseReport
