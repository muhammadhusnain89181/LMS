import React,{useState} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index from './index/Index'
import StreamForm from './stream/StreamForm'
import WatchForm from './watch/WatchForm'
import { transitions, positions, Provider as AlertProvider, Provider } from 'react-alert'
import AlertTemplate from '../javascripts/alert-template'
import './app.scss'
import Chat from '../components/Chat/Chat/Chat'
import NavBar from './layouts/Navbar'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
import Chatmodule from '../components/ChatModule/ChatModule'
import CourseReport from './layouts/CourseReport'
import Dashboard from './StudentHome/Dashboard'
import Routes from './routes/Routes'
import AuthApi from '../utils/AuthApi'
if (localStorage.jwtToken) {

  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
function App () {
  const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 3000,
    offset: '30px',
    transition: transitions.SCALE
}
const [auth,setAuth]=useState(false)
  return (
    <Provider>
      <AlertProvider template={AlertTemplate} {...options}>
          <Router>
            <Routes/>
          </Router>
      </AlertProvider>
    </Provider>
    // <Router>
    //   <AlertProvider template={AlertTemplate} {...options}>
    //     <Switch>
    //       <Route exact path='/watch/' component={WatchForm} />
    //       <Route exact path='/watch/:streamid' component={WatchForm} />
    //       <Route exact path='/stream' component={StreamForm} />
    //       <Route exact path='/stream/:rdeKey' component={StreamForm} />
    //       <Route exact path='/home'component={Index}/>
    //       <Route exact path='/reports' component={CourseReport} />
    //       <Route exat path='/dashboard' component={Dashboard}/>
    //       <Route exact path='/register'component={Register}/>
    //       <Route exact path='/'component={Login}/>
    //     </Switch>
    //   </AlertProvider>
    // </Router>
  )
}

export default App
