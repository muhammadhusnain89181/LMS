import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import AlertTemplate from './javascripts/alert-template'
import { transitions, positions, Provider as AlertProvider} from 'react-alert'
import { setCurrentUser, logoutUser } from "./actions/authActions";
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";
import Index from './components/index/Index'
import WatchForm from './components/watch/WatchForm'
import StreamForm from './components/stream/StreamForm'
import TeacherCourseReport from './components/layouts/CourseReport'
import StudentCourseReport from './components/StudentHome/StudentCourseReport'
import Chat from './components/Chat/Chat';
import Dialog from './components/Chat/Dialog'


if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./";
  }
}

function App() {
  const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 3000,
    offset: '30px',
    transition: transitions.SCALE
}
  return (
    <Provider store={store} >
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
            <Route path="/register" component={Register} exact/>
            <Route path="/" component={Login} exact/>
            {/* <Route path="/STREA" component={StreamForm} exact/> */}
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path='/watch/' component={WatchForm} />
                <PrivateRoute exact path='/watch/:streamid' component={WatchForm} />
                <PrivateRoute exact path='/stream' component={StreamForm} />
                <PrivateRoute exact path='/stream/:rdeKey' component={StreamForm} />
                <PrivateRoute exact path='/home'component={Index}/>
                <PrivateRoute exact path='/reports' component={TeacherCourseReport} />
                {/* <RouteProtected exat path='/dashboard' component={Dashboard}/> */}
                <PrivateRoute exat path='/studentsreports' component={StudentCourseReport}/>
            </Switch> 
        </Router>
      </AlertProvider>
    </Provider>
    
  );
}

export default App;
