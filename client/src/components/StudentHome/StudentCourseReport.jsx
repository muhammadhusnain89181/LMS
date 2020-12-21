import React from 'react'
import { Grid,makeStyles,createStyles, } from '@material-ui/core';
import StudentCourse from './StudentCourse'
import Layout from '../layouts/Layout';
import BarChart from '../layouts/BarChart'
function CourseReport(props) {
    const {course,student}=props.location.state;
    const chartarr=[student.classparticipates,student.marks]
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
                        <StudentCourse Course={course} percentage={course.percomplete} title={'Coverage'}
                        name={course.courseName} code={course.courseCode} title1={'Complete'} title2={'Incomplete'} />
                    </Grid>
                </Grid>
            </div>
        </div>
      </Layout>
    )
}

export default CourseReport
