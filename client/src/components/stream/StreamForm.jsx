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
import './stream-form.scss'
import './StreamForm.css'
import queryString from 'query-string'

// Custom hooks
import useSignalingSocket from '../../hooks/useSignalingSocket'
import usePeer from '../../hooks/usePeer'
import newMyPeer from '../../hooks/useMyPeer'
import useRDESocket from '../../hooks/useRDESocket'
//
import InfoBar from '../Chat/InfoBar/InfoBar'
import Input from '../Chat/Input/Input'
import Messages from '../Chat/Messages/Messages'
import Chat from '../Chat/Chat/Chat'
import Chatmodule from '../ChatModule/ChatModule'
import Peer from 'peerjs'

const isProd = process.env.NODE_ENV === 'production'

const StreamForm = ({location}) => {
  const {name,room}=queryString.parse(location.search);
  const [viewersList, setViewersList] = useState({})

  const [id, setId] = useState(uuid());
  const [stream, setStream] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const videoRef = useRef(null)

  // const [socket,     isConnected] = useSignalingSocket('hightly-v.herokuappde.com', 'streamer', { peerId: id })
  const [socket, isConnected] = useSignalingSocket('localhost:3001/', 'streamer', { peerId: name })
  //const [RDEsocket, isRDEActive] = useRDESocket(location.match.params.rdeKey ? location.match.params.rdeKey : '')
  const [RDEsocket, isRDEActive] = useRDESocket('');
  const [doAllowRD, setDoAllowRD] = useState(false);

  const peer = usePeer(room)

  //const peer=newMyPeer(room)

  const alert = useAlert()

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
      alert.success(peer.id);
      setId(peer.room);
      peer.on('connection',(conn)=>{
        conn.on('open',(data)=>{
          console.log(`data : ${data}`);
        })
      })
    }
  }, [peer])

  // Notify user about connection status updates
  useEffect(() => {
    if (isConnected === false) {      
      alert.error('Disconnected from server')
    } else if (isConnected === true ) {
      alert.success(`Connected to server peer ${peer}`)
    } else {
      alert.info('Attempting to connect to server...')
    }
  }, [isConnected])

  useEffect(() => {
    if (socket && viewersList && peer) {
       //socket.emit('createStream',{streamId: peer.id});
      socket.emit('createStream', { streamId: peer.id,name:name,room:peer.id},(error)=>{
        if(error){alert.error(error);}
      });
    
      socket.emit('setProps', { peerId: peer.id })

      socket.on('addNewViewer', viewerId => {
        console.log(`✅ new viewer <${viewerId}> connected`)

        const newViewersList = viewersList

        if (stream) {
            console.log(`stream exist ${stream} viewerId ${viewerId}`);
          const call = peer.call(viewerId, stream)
          if (call) {
            console.log(`calling`);
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
        console.log(`❌ viewer <${viewerId}> disconnected`)

        const newViewersList = viewersList

        delete newViewersList[viewerId]

        setViewersList(newViewersList)
      })
      
      socket.on("roomData", ({ users }) => {
        //setUsers(users);
      });
    }
  }, [socket, viewersList, peer, stream])
  
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
      console.log(`stream && peer && viewersList stream ${stream}`);
      for (const id in viewersList) {
        console.log(`set stream to viewers with id ${id} stream ${stream}`);
        if (!viewersList[id].active) {
          console.log(`viewersList[id].active`);
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

      console.log(`settting stream id called with stream ${capturedStream}`);
      setStream(capturedStream);
      console.log(`stream id set stream ${capturedStream}`);
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
  ///Messages
  return (
    <>
      <div className="outerContainer">
       <InfoBar room={room}/>
      <div className="innerContainer">
        <div className="chatContainer border border-dark">
          <Chat messages={messages} name={name} message={message} setMessage={setMessage} sendMessage={sendMessage}/>
         </div>
        <div className="sharedScreen border border-dark">
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
            <div className='pt-2'>
              <button onClick={startCapture} type='button' className={`btn btn-outline-success waves-effect btn-round ${stream === null ? '' : 'disabled'}`}>Start <span className='fas fa-play ml-1'></span></button>
              <button onClick={stopCapture} type='button' className={`btn btn-outline-danger waves-effect btn-round ${stream !== null ? '' : 'disabled'}`}>Stop <i className='fas fa-stop'></i></button>
            </div>
          </div>
        </Animated>
      </div>
    </div>
  </div>
  </>
  )
}

export default StreamForm
