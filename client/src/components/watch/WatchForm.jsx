import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../layouts/Layout'
import Animated from '../other/Animated'
import EmptyEmbed from '../layouts/EmptyEmbed'
import { useAlert } from 'react-alert'
import uuid from 'uuid/v1'
import { object } from 'prop-types'
import './watch-form.scss'
import { getCoords, getNaturalCoords } from '../../utils/coords'
import queryString from 'query-string'
import Chat from '../Chat/Chat'
// Custom hooks
import usePeer from '../../hooks/usePeer'
import useMyPeer from '../../hooks/useMyPeer'
import useSignalingSocket from '../../hooks/useSignalingSocket'
//
import InfoBar from '../Chat/InfoBar/InfoBar'
import Input from '../Chat/Input/Input'
import Messages from '../Chat/Messages/Messages'
import Peer from 'peerjs'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import {useTheme } from '@material-ui/core/styles';
import {Grid,makeStyles,createStyles} from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
const drawerWidth = 400;
const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
  },
  dashboard: {
    flexGrow:1,
    paddingLeft:'20px',
    paddingRight:'20px',
    paddingTop:'20px',
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        marginTop:100,
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding:0,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
}));
const propTypes = { match: object }

const WatchForm = ({ location }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes=useStyles();
  // const {name,room}=queryString.parse(location.search);
  const name='Husnain';const room='742GYCWUEB3683ERS';
  const [streamId, setStreamId] = useState(null)
  const [stream, setStream] = useState(null)
  const [id] = useState(uuid())
  const [isConnectedToStream, setIsConnectedToStream] = useState(null)
  const [RDEConn, setRDEConn] = useState(null);
  //--//
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // RDE
  const [doShowRDControls, setDoShowRDControls] = useState(false)
  const [doShowCloseControls, setDoShowCloseControls] = useState(false)

  const videoRef = useRef(null)
  const videoWithControlsRef = useRef(null)
  const inputRef = useRef(null)

  //const [socket, isConnected] = useSignalingSocket('hightly-dev.herokuapp.com', 'viewer', { peerId: id })
  const [socket, isConnected] = useSignalingSocket('localhost:3000/', 'viewer', { peerId: name })

  // const peer = useMyPeer(name)
  const peer =new Peer(name)

  const alert = useAlert()

  // useEffect(() => {
  //   document.addEventListener('keydown', handleUserInput)
  // }, [])

  useEffect(() => {
    if (doShowCloseControls) {
      document.addEventListener('keydown', handleUserInput)
    }
  }, [doShowRDControls])
  //Check Socket connection
  useEffect(() => {
    if (isConnectedToStream === true) {
      alert.success('Connected to stream')
    } else if (isConnectedToStream === false) {
      alert.info('Disconnected from stream')
    }
  }, [isConnectedToStream])
  //Check Stream Existance
  useEffect(() => {
    if (room && socket) {
      socket.emit('checkStreamExistence', room)
    }
  }, [socket, room])
  //Connect Disconnect
  useEffect(() => {
    if (socket) {
      socket.on('streamExistenceInfo', data => {
        const { active, room } = data

        if (!active) {
          alert.error('This stream does not exist')
        } else {
          setStreamId(room)

          const newUrl = `/watch/?name=${name}&room=${room}`

          window.history.replaceState('watch', 'New stream', newUrl)

          setIsConnectedToStream(true)
        }
      })

      socket.on('disconnectFromStream', () => {
        setStreamId(null)
        setIsConnectedToStream(false)
      })

      if(streamId && peer) {
        // console.log(`stream is ${stream}`);
        socket.emit('offerNewViewer', {
          streamId: streamId,
          viewerId: name,
        })

        socket.emit('setProps', {
          to: streamId
        })
        socket.on('message', message => {
          console.log('Message is called');
          //alert(message);
          console.log(message);
          setMessages(messages => [ ...messages, message ]);
        });
      }
    }
  }, [socket, streamId, peer])
  //call peer
  useEffect(() => {
    if (peer) {
      peer.on('call', call => {
        call.answer()

        call.on('stream', stream => {
          setStream(stream)

          const conn = peer.connect(room)

          conn.on('open', () => {
            conn.on('data', data => { console.log(data) })
            setRDEConn(conn)
          })
        })

        call.on('error', error => console.log(error))
      })
    }
  }, [peer])
  //RDEroom
  useEffect(() => {
    if (RDEConn) {
      // console.log(RDEConn)
      RDEConn.send('лох блядkm')
      // console.log('otpravil suka')
    }
  }, [RDEConn])

  // Display steram on a page
  useEffect(() => {
    // console.log(`stream is ${stream}`);
    if (stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  useEffect(() => {
    if (stream && doShowRDControls) {
      videoWithControlsRef.current.srcObject = stream
    }
  }, [doShowRDControls, videoWithControlsRef, stream])

  const onBtnClick = () => {
    const id = inputRef.current.value;

    // TODO: Add some regex
    if (id.length>=0) {
      socket.emit('checkStreamExistence', id)
    } else {
      alert.error(`Your link or id is invalid`)
    }
  }
  const showCloseControls = e => {
    if (e.key || e.type === 'dblclick') {
      if (e.key === 'Escape' || e.type === 'dblclick') {
        setDoShowCloseControls(true)
        window.setTimeout(() => {
          setDoShowCloseControls(false)
        }, 3000)
      }
    }
  }
  const toggleRDControls = () => {
    setDoShowRDControls(true)
  }
  const handleUserInput = e => {
    if (RDEConn) {
      const defaultMsg = {
        action_type: 'None',
        payload: {
          coords: [0, 0],
          delta_y: 0,
          key: 'k'
        }
      }

      switch (e.type) {
        case 'mousemove':
          const coords = getNaturalCoords()

          let msg = { action_type: 'MouseMove',
            payload: {
              ...defaultMsg.payload,
              coords
            }
          }

          RDEConn.send(JSON.stringify(msg))
          break
      }
    }

    showCloseControls(e)
  }
  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', {message,streamerId:streamId,name:name}, () => setMessage(''));
    }
  }
  return (
  <Layout>
    <div className="watch-form">
            <Helmet>
              <title>PowerTeach &#183; Watch</title>
            </Helmet>
            {doShowRDControls
              ? (
                <div
                  id='videoWrapper'
                  className='video-wrapper'
                  // onKeyDown={handleUserInput}
                >
                  <video
                    id='video'
                    ref={videoWithControlsRef}
                    className={`${!doShowCloseControls ? 'cursor-none' : ''}`}
                    autoPlay='autoplay'
                    onDoubleClick={showCloseControls}
                    onClick={handleUserInput}
                    onKeyDown={handleUserInput}
                    onKeyUp={handleUserInput}
                    onMouseMove={handleUserInput}
                  >
                  </video>
                  <div id='video1'></div>
                  {doShowCloseControls
                    ? (
                      <a onClick={() => setDoShowRDControls(false)} href='#' id='close' className='float'>
                        <i className='fa fa-times my-float'></i>
                      </a>
                    )
                    : ''
                  }
                </div>
              )
              : ''
            }
            {streamId
              ? (
                <div className="outerContainer">
                  <div className={classes.root}>
                    <Drawer
                      className={classes.drawer}
                      variant="persistent"
                      anchor="left"
                      open={open}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                    >
                      <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                      </div>
                      <Divider />
                      <Chat/>
                    </Drawer>
                    <main
                      className={ clsx(classes.content, { [classes.contentShift]: open, })}>
                      <Toolbar> <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
                          edge="start"
                          className={clsx(classes.menuButton, open && classes.hide)} >
                          <ChevronRightIcon /> </IconButton>                    
                      </Toolbar>
                      <div className="sharedScreen border border-dark">
                            <Animated>
                              <div className='jumbotron text-center pt-1'>
                                <hr/>
                                {/* <div className='status-badges-viewer'>
                                  <div className='text-muted mt-1'>
                                  Server connection status:&nbsp;&nbsp;
                                    {isConnected
                                      ? <span className='badge badge-success'>Online</span>
                                      : <span className='badge badge-warning'>Offline</span>
                                    }
                                  </div>
                                </div>
                                <hr className='my-4' /> */}
                                <div className='embed-responsive embed-responsive-16by9'>
                                  {stream
                                  ? <video ref={videoRef} className='embed-responsive-item' controls autoPlay></video>
                                  : <EmptyEmbed role='viewer'/>
                                }
                              </div>
                              <hr/>
                              <button onClick={toggleRDControls} type='button' className='btn btn-outline-primary waves-effect'>
                                <i className='fas fa-compress'></i>
                              </button>
                            </div>
                          </Animated>
                     </div>
                    </main>
                  </div>
                </div>
                // <div className="outerContainer">
                //     <div className="sharedScreen border border-dark">
                //           <Animated>
                //             <div className='jumbotron text-center pt-1'>
                //               <hr/>
                //               {/* <div className='status-badges-viewer'>
                //                 <div className='text-muted mt-1'>
                //                 Server connection status:&nbsp;&nbsp;
                //                   {isConnected
                //                     ? <span className='badge badge-success'>Online</span>
                //                     : <span className='badge badge-warning'>Offline</span>
                //                   }
                //                 </div>
                //               </div>
                //               <hr className='my-4' /> */}
                //               <div className='embed-responsive embed-responsive-16by9'>
                //                 {stream
                //                   ? <video ref={videoRef} className='embed-responsive-item' controls autoPlay></video>
                //                   : <EmptyEmbed role='viewer'/>
                //                 }
                //               </div>
                //               <hr/>
                //               <button onClick={toggleRDControls} type='button' className='btn btn-outline-primary waves-effect'>
                //                 <i className='fas fa-compress'></i>
                //               </button>
                //             </div>
                //           </Animated>
                //     </div>
                // </div>
              )
              : (
                <Animated>
                  <div className='jumbotron text-center pt-1'>
                    <h2 className='card-title h2 mt-4'>Enter Your Room Name</h2>
                    <div className='row d-flex justify-content-center'>
                      <div className='col-xl-7 pb-2'>
                        <p className='card-text'>Enter Room name here to connect to Lecture Delivery</p>
                      </div>
                    </div>
                    <div className='align-center'>
                      <div className='md-form' style={{ 'textAlign': 'left', 'color': '#777' }}>
                        <i className='fas fa-link prefix'></i>
                        <input ref={inputRef} type='text' id='inputIconEx2' className='form-control' />
                        <label htmlFor='inputIconEx2'>Link or stream id</label>
                      </div>
                      <button onClick={onBtnClick} type='button' className='btn btn-outline-success waves-effect btn-round'>Next <span className='fas fa-play ml-1'></span></button>
                    </div>
                  </div>
                </Animated>
              )
            }
    </div>
  </Layout>
  )
}

WatchForm.propTypes = propTypes

export default WatchForm
