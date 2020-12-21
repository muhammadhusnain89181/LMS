import React,{useState} from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Index from '../index/Index'
import StreamForm from '../stream/StreamForm'
import WatchForm from '../watch/WatchForm'
import Register from '../Register/Register'
import Login from '../Login/Login'
import TeacherCourseReport from '../layouts/CourseReport'
import Dashboard from '../StudentHome/Dashboard'
import StudentCourseReport from '../StudentHome/StudentCourseReport'
import AuthApi from '../../utils/AuthApi'
import auth from '../../utils/storage'

function Routes() {
    return (
            <Switch>
              <RouteProtected exact path='/watch/' component={WatchForm} />
              <RouteProtected exact path='/watch/:streamid' component={WatchForm} />
              <RouteProtected exact path='/stream' component={StreamForm} />
              <RouteProtected exact path='/stream/:rdeKey' component={StreamForm} />
              <RouteProtected exact path='/home'component={Index}/>
              <RouteProtected exact path='/reports' component={TeacherCourseReport} />
              <RouteProtected exat path='/dashboard' component={Dashboard}/>
              <RouteProtected exat path='/studentsreports' component={StudentCourseReport}/>
              <RouteRegistration exact path='/register'component={Register}/>
              <RouteRegistration exact path='/'component={Login}/>
            </Switch>
      )
}


const RouteRegistration=({component:Component, ...rest})=>{
  // const auth =auth.authenticated;
  return <Route {...rest} render={ props=> auth.isAuthenticated ?  <Redirect to='/home'/> :  <Component {...props} />} />
}

const RouteProtected=({component:Component, ...rest})=>{
  // const authApi =React.useContext(AuthApi);
  return <Route {...rest} render={ props=> auth.isAuthenticated ? <Component {...props} /> : <Redirect to='/' /> } />
}
export default Routes
