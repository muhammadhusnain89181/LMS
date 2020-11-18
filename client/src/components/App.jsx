import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index from './index/Index'
import StreamForm from './stream/StreamForm'
import WatchForm from './watch/WatchForm'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from '../javascripts/alert-template'
import './app.scss'

import Chat from '../components/Chat/Chat/Chat'
// import Join from './Join/Join'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import Chatmodule from '../components/ChatModule/ChatModule'

function App () {
  const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2000,
    offset: '30px',
    transition: transitions.SCALE
}

  return (
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <Switch>
          <Route exact path='/watch/' component={WatchForm} />
          <Route exact path='/watch/:streamid' component={WatchForm} />
          <Route exact path='/stream' component={StreamForm} />
          <Route exact path='/stream/:rdeKey' component={StreamForm} />
          <Route exact path='/home'component={Index}/>
          <Route exact path='/'component={Register}/>
        </Switch>
      </AlertProvider>
    </Router>
  )
}

export default App
