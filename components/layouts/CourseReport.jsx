import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import NewCard from './Card2'
import { Route } from 'react-router-dom';
import {getFromStorage} from '../../utils/storage'
import { Grid,makeStyles,createStyles, } from '@material-ui/core';
import StudentParticipation from './StudentParticipation'
import BarChart from './BarChart'
const useStyles = makeStyles((theme) => createStyles({
    dashboard: {
          paddingLeft:'20px',
          paddingRight:'20px',
        },
  }));
function TeacherCourseReport(props) {
    console.log(props);
    let settime=1,usedTime=0;
    const classes=useStyles();
    const Course=props.location.state.course;
    const percent=Course.percomplete;
    const [xarr,setXarr]=useState([]);
    const [yarr,setYarr]=useState([]);
    const [chartarr,SetChartArray]=useState([])
    const [depth,SetDepth]=useState('');
    const [quality,SetQuality]=useState('');
    const [activetab,setActiveTab]=useState();
    const [action,setAction]=useState('participation');

    useEffect(() => {
        reportChart(action);
        console.log(`xarr length ${xarr.length} : yarr length ${yarr.length} :::: course complete perncet :: ${Course.percomplete}`);
    }, [settime,usedTime,Course])

    const reportChart=(action,arrsize)=>{
        setActiveTab(action)
        setXarr([]);setYarr([]); SetChartArray([]);
        if(arrsize)
        {   
            // console.log(`size is ${arrsize}`);
            console.log(`size is ${arrsize}`);
            for(var i=0;i<arrsize;i++){
                xarr.push(0);yarr.push(0);                
            }            
        }
        else{
            Course.plo.map((i)=>{xarr.push(0);yarr.push(0)})
        } //SetChartArray([]);}            
        Course.chapters.forEach(chapter => {
            chapter.teacherLectures.forEach(lecture=>{
                lecture.slides.forEach(slide=>{
                    // console.log(`set Time ${settime} : usedTime : ${usedTime}`);
                    settime +=slide.time; usedTime +=slide.timeused;
                    // console.log(`set Time slide :${slide.time} :: ${settime} :=: usedTime slide : ${slide.timeused} :: ${usedTime}`);
                    slide.hotspots.forEach(hotspot=>
                        {
                            if(action==='plo')
                            {
                                // console.log(`plo called xarr size ${xarr.length} yarr size ${yarr.length}`);
                                console.log(`PLO called`);
                                const index=Course.plo.findIndex((item)=> item===hotspot.plo)
                                xarr[index]++; 
                                if(hotspot.status===true){
                                yarr[index]++; 
                            }
                            }else if(action==='blooms'){
                                // const index=Course.plo.findIndex((item)=> item===hotspot.plo)
                                // console.log(`plo called xarr size ${xarr.length} yarr size ${yarr.length}`);
                                // console.log(`blooms called ${hotspot.BloomTaxonomy} new ${hotspot.BloomTaxonomy-1}`);
                                console.log(`BLOOMS called`);
                                xarr[hotspot.BloomTaxonomy-2]++; 
                                if(hotspot.status===true){
                                yarr[hotspot.BloomTaxonomy-2]++;
                                }
                            }
                            else if(action==='solo'){
                                // const index=Course.plo.findIndex((item)=> item===hotspot.plo)
                                // console.log(`plo called xarr size ${xarr.length} yarr size ${yarr.length}`);
                                console.log(`SOLO called`);
                                xarr[hotspot.SoloTaxonom-2]++; 
                                if(hotspot.status===true){
                                yarr[hotspot.SoloTaxonom-2]++;
                            }
                        }             
                    })
                })
            })            
        });
        calDepth(settime,usedTime);
        percenTage(xarr,yarr);
    }
    const percenTage=(a,b)=>{
        console.log(`X.length: ${a.length} :  Y.length: ${b.length}`);
        var newarr=new Array(a.length)
        for(var i=0;i<a.length ;i++)
        {
            // console.log(`percenTage ${i} :  ${a[i]} : ${b[i]}`);
            if(a[i]>0){
                console.log(`check xaxis val ${i} : ${a[i]} : ${b[i]} : ${((b[i]/a[i])*100)}`);
                // chartarr[i]=((b[i]/a[i])*100);
                newarr[i]=Math.round( ((b[i]/a[i])*100) );
                // console.log(`check xaxis val : ${i} : ${chartarr[i]}`);
            }
            else{chartarr[i]=0}
        }
        SetChartArray(newarr);
        chartarr.map((i)=>{
            console.log(`Y array passed to char length is : ${chartarr.length} item is ${i}`);
        })        
    }
    const calDepth=(set,used)=>{
        const caldepth= Math.round( (Course.percomplete/3) + ( ((used/set)/3) ) )
        const calquality=Math.round( (Course.percomplete/2) + ( ((used/set)/2) ) )
        SetDepth(caldepth); SetQuality(calquality);

        console.log(`Caourse depth :${caldepth} ::: ${depth} Caourse Quality is :${calquality} ::: ${quality}`);

    }
    return (
        <Layout>
            <div className="card text-center">
                    <div className="card-header">
                        <div className='h2'>Course Report</div>
                        <ul className="nav nav-tabs ">                            
                            <li className="nav-item">
                                <a className="nav-link active" onClick={()=>{reportChart();setAction('participation')}}>Participation</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " onClick={()=>{reportChart();setAction('coverage')}}>Coverage</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={()=>{reportChart('blooms',6);setAction('blooms')}}>Blooms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={()=>{reportChart('solo',5);setAction('solo')}}>Solo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={()=>{reportChart('plo');setAction('plo')}}>Lo's</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        { 
                            action=='coverage' ? 
                            <>
                            <h1>Course Coverage</h1>
                            
                            <Grid container spacing={4} className={classes.dashboard} justify='center'>
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <NewCard Course={Course} percentage={Course.percomplete} title={'Coverage'}
                                        name={Course.courseName} code={Course.courseCode} title1={'Complete'} title2={'InComplete'} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <NewCard Course={Course} percentage={quality} title={'Quality'}
                                        name={Course.courseName} code={Course.courseCode} title1={'Quality'} title2={'InQuality'} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <NewCard Course={Course} percentage={depth} title={'Depth'}
                                        name={Course.courseName} code={Course.courseCode} title1={'Depth'} title2={'In-Depth'} />
                                </Grid>                                
                            </Grid>
                            </> 
                            :
                            action==='participation' ? 

                            <>
                                <h1>Participation</h1>
                                <StudentParticipation Students={Course.students}/>
                            </> 

                            :
                            action==='blooms' ? 
                            <>
                                <BarChart title='Blooms Report' X={['Create','Evaluate','Analyze','Apply','Understand','Remeber']} Y={chartarr}/>
                            </> 
                            :
                            action==='solo' ? 
                            <>
                                <BarChart title='Solo Report' X={['Pre Structural','Uni Structural','Multi Structural','Relational Structural','Extended Structural']} Y={chartarr} />
                                {/* <BarChart title='Solo Report' X={['Pre Structural','Uni Structural','Multi Structural','Relational Structural','Extended Structural']} Y={[22,15,36,55,11]}/> */}
                            </> 
                            :
                            action==='plo' ? 
                            <>
                                <BarChart title='LOs Report' X={Course.plo} Y={chartarr}/>
                                {/* <BarChart X={[Course.plo]} Y={[20,38,8,55,12]}/> */}
                            </> 
                            : ''
                        }
                    </div>
            </div>
        </Layout>
    )
}

export default TeacherCourseReport
