/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import Animated from '../other/Animated'
import EmptyEmbed from '../layouts/EmptyEmbed'
import Layout from '../layouts/Layout'
import Navbar from '../layouts/Navbar'
import { useAlert } from 'react-alert'
import uuid from 'uuid/v1'
import config from '../../config'
// import './stream-form.scss'
import './StreamForm.css'
import queryString from 'query-string'
// Custom hooks
import useSignalingSocket from '../../hooks/useSignalingSocket'
import usePeer from '../../hooks/usePeer'
import useMyPeer from '../../hooks/useMyPeer'
import useRDESocket from '../../hooks/useRDESocket'
//
import InfoBar from '../Chat/InfoBar/InfoBar'
import Input from '../Chat/Input/Input'
import Messages from '../Chat/Messages/Messages'
import Chat from '../Chat/Chat/Chat'
import NewChat from '../Chat/Chat'
import Chatmodule from '../ChatModule/ChatModule'
import store from 'store'
import Peer from 'peerjs'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid,makeStyles,createStyles} from '@material-ui/core'
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {MessageList} from 'react-chat-elements'
import Dialog2 from '../Chat/Dialog'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import {useTheme } from '@material-ui/core/styles';
import Icon from '../Chat/icons/user-profile.png'
const isProd = process.env.NODE_ENV === 'production'
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
const StreamForm = ({location}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const user=store.get('user')
  // const name=user.id;const room=user.email;
  // const {name,room}=queryString.parse(location.search);
  const classes=useStyles();
  const name='Tajammal';const room='742GYCWUEB3683ERS';
  const [viewersList, setViewersList] = useState({})

  const [id, setId] = useState(uuid());
  const [stream, setStream] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const videoRef = useRef(null)

  // const [socket,     isConnected] = useSignalingSocket('hightly-v.herokuappde.com', 'streamer', { peerId: id })
  const [socket, isConnected] = useSignalingSocket('localhost:3000/', 'streamer', { peerId: name })
  // const [RDEsocket, isRDEActive] = useRDESocket(location.match.params.rdeKey ? location.match.params.rdeKey : '')
  const [RDEsocket, isRDEActive] = useRDESocket('');
  const [doAllowRD, setDoAllowRD] = useState(false);

  const peer = usePeer(room)
  // const peer =useMyPeer(room)
  const alert = useAlert()
  // const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  //Check if extension is active
  useEffect(() => {
    if (isRDEActive) {
      alert.success('Remote Desktop Extension is active')
      // const newUrl = `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hightly.semreg.me'}/stream`
      // window.history.replaceState('watch', 'New stream', newUrl)
    }
  }, [isRDEActive])

  // Set stream id
  useEffect(() => {
    if (peer) {
      setId(peer.room)
    }
  }, [peer])

  // Notify user about connection status updates
  useEffect(() => {
    console.log(`socket :: ${socket} :: viewrlist ${viewersList} :: peer ${peer}`);
    if (isConnected === false) {
      alert.error('Disconnected from server')
    } else if (isConnected === true) {
      alert.success('Connected to server')
    } else {
      alert.info('Attempting to connect to server...')
    }
  }, [isConnected])

  useEffect(() => {
    if (socket && viewersList && peer) {
       //socket.emit('createStream',{streamId: peer.id});
       console.log(`createstream called`);
      socket.emit('createStream', { streamId: peer.id,name:name,room:peer.id},(error)=>{
        if(error){alert.error(error);}
      });
    
      socket.emit('setProps', { peerId: peer.id })

      socket.on('addNewViewer', viewerId => {
        console.log(`✅ new viewer <${viewerId}> connected`)

        const newViewersList = viewersList

        if (stream) {
          const call = peer.call(viewerId, stream)

          if (call) {
            newViewersList[viewerId] = { active: true }
            setViewersList(newViewersList)
          } else {
            newViewersList[viewerId] = { active: false }
            setViewersList(newViewersList)
          }
        } else {
          newViewersList[viewerId] = { active: false }
          setViewersList(newViewersList)
        }
      })

      socket.on('removeViewer', viewerId => {
        alert.error(`❌ viewer <${viewerId}> disconnected`)
        console.log(`❌ viewer <${viewerId}> disconnected`)

        const newViewersList = viewersList

        delete newViewersList[viewerId]

        setViewersList(newViewersList)
      })
      
      socket.on("roomData", ({ users }) => {
        //setUsers(users);
      });
    }
  }, [socket, viewersList, peer,stream])
  
  useEffect(()=>{
    if(socket){
      socket.on('message', message => {
        console.log('Message is called');
        //alert(message);
        console.log(message);
        setMessages(messages => [ ...messages, message ]);
      });
    }
  },[socket])
 
  useEffect(() => {
    if (peer && RDEsocket && isRDEActive) {
      peer.on('connection', conn => {
        conn.on('data', data => {
          console.log(data)
        })
      })
    }
  }, [peer, RDEsocket])

  // Display captured video
  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  useEffect(() => {
    if (stream && peer && viewersList) {
      for (const id in viewersList) {
        if (!viewersList[id].active) {
          peer.call(id, stream)

          const newViewersList = viewersList

          newViewersList[id] = { active: true }

          setViewersList(newViewersList)
        }
      }
    }
  }, [stream, peer, viewersList])

  async function startCapture () {
    let displayMediaOptions = {
      cursor: 'always',
      video: {
        width: {
          ideal: 1920,
          max: 1920
        },
        height: { ideal: 1080 }
      }
    }

    const supports = navigator.mediaDevices.getSupportedConstraints()

    if (supports['frameRate'] && supports['aspectRatio']) {
      displayMediaOptions = {
        ...displayMediaOptions,
        video: {
          ...displayMediaOptions.video,
          frameRate: { max: 60 },
          aspectRatio: 1.7777777778
        }
      }
    }

    try {
      const capturedStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)

      setStream(capturedStream)
    } catch (err) {
      console.error(err)
    }
  }

  function stopCapture () {
    if (videoRef.current.srcObject && viewersList) {
      videoRef.current.srcObject
        .getTracks()
        .forEach(track => track.stop())

      setStream(null)
      videoRef.current.srcObject = null

      for (const id in viewersList) {
        const newViewersList = viewersList

        newViewersList[id] = { active: false }

        setViewersList(newViewersList)
      }
    }
  }

  const onInputClick = e => {
    e.target.select()
    document.execCommand('copy')
    alert.success('Coppied co clipboard')
  }
  const sendMessage = (event) => {
    event.preventDefault();
    if(message && socket) {
      socket.emit('sendMessage', {message,streamerId:room,name:name}, () => {
        setMessage('');
      });
    }
  }
  return (
  <Layout>
    <div className="outerContainer">
    <div className={classes.root}>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper, }} >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} </IconButton>
          </div>
          <Divider />
          <Chat messages={messages} name={name} message={message} setMessage={setMessage} sendMessage={sendMessage}/>
          {/* <NewChat socket={socket} streamerId={room} name={name}/> */}
      </Drawer>
      <main
        className={ clsx(classes.content, { [classes.contentShift]: open, })}>
        <Toolbar> 
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)} >
            <ChevronRightIcon /> 
          </IconButton>
          <div className='text-center pt-2'>
            <button onClick={startCapture} type='button' className={`btn btn-outline-success waves-effect btn-round ${stream === null ? '' : 'disabled'}`}>Start <span className='fas fa-play ml-1'></span></button>
            <button onClick={stopCapture} type='button' className={`btn btn-outline-danger waves-effect btn-round ${stream !== null ? '' : 'disabled'}`}>Stop <i className='fas fa-stop'></i></button>
          </div>
        </Toolbar>
        <div className="col-12 sharedScreen border border-dark">
          <Animated> 
            <Helmet>
              <title>{`${stream ? '🔴' : ''}`} PowerTeach &#183; Stream</title>
            </Helmet>
            <div className='jumbotron text-center pt-1'>
            <div className='embed-responsive embed-responsive-16by9'>
              {stream
                ? <video ref={videoRef} className='embed-responsive-item' autoPlay />
                : <EmptyEmbed />
              }
            </div>
            <hr className='my-4' />
            {isRDEActive
              ? (
                <div className='custom-control custom-checkbox'>
                  <input onChange={() => setDoAllowRD(!doAllowRD)} type='checkbox' className='custom-control-input' id='defaultChecked2'/>
                  <label className='custom-control-label' htmlFor='defaultChecked2'>Use Remote Desktop</label>
                </div>
              ) : ''
              }
              {/* <div className='pt-2'>
                <button onClick={startCapture} type='button' className={`btn btn-outline-success waves-effect btn-round ${stream === null ? '' : 'disabled'}`}>Start <span className='fas fa-play ml-1'></span></button>
                <button onClick={stopCapture} type='button' className={`btn btn-outline-danger waves-effect btn-round ${stream !== null ? '' : 'disabled'}`}>Stop <i className='fas fa-stop'></i></button>
              </div> */}
            </div>
          </Animated>
        </div>
      </main>
    </div>
      {/* <div className="col-12 innerContainer">
        <Dialog2/> */}
      {/* <Chat messages={messages} name={name} message={message} setMessage={setMessage} sendMessage={sendMessage}/> */}
        {/* <div className="col-3 chatContainer border border-dark">
          <Chat messages={messages} name={name} message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div> */}
        {/* <div className="col-9 sharedScreen border border-dark">
          <Animated> 
          <button type='button' onClick={handleClickOpen('paper')} className={`btn btn-outline-success waves-effect btn-round ${stream === null ? '' : 'disabled'}`}>Open <span className='fas fa-play ml-1'></span></button>               
            <Helmet>
              <title>{`${stream ? '🔴' : ''}`} PowerTeach &#183; Stream</title>
            </Helmet>
            <div className='jumbotron text-center pt-1'>
            <div className='embed-responsive embed-responsive-21by9'>
              {stream
                ? <video ref={videoRef} className='embed-responsive-item' autoPlay />
                : <EmptyEmbed />
              }
            </div>
            <hr className='my-4' />
            {isRDEActive
              ? (
                <div className='custom-control custom-checkbox'>
                  <input onChange={() => setDoAllowRD(!doAllowRD)} type='checkbox' className='custom-control-input' id='defaultChecked2'/>
                  <label className='custom-control-label' htmlFor='defaultChecked2'>Use Remote Desktop</label>
                </div>
              ) : ''
              }
              <div className='pt-2'>
                <button onClick={startCapture} type='button' className={`btn btn-outline-success waves-effect btn-round ${stream === null ? '' : 'disabled'}`}>Start <span className='fas fa-play ml-1'></span></button>
                <button onClick={stopCapture} type='button' className={`btn btn-outline-danger waves-effect btn-round ${stream !== null ? '' : 'disabled'}`}>Stop <i className='fas fa-stop'></i></button>
              </div>
            </div>
          </Animated> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  </Layout>
  )
}




export default StreamForm
