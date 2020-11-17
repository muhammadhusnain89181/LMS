import React,{useEffect,useState} from 'react'
import Layout from '../layouts/Layout'
import Animated from '../other/Animated'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import Icon from '../Chat/icons/dotmatrikslogo.png'
import './index.scss'

const Index = ({location}) => {
  const [newname, setName]= useState('');
  const [newroom, setRoom]= useState('');
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);setRoom(room);
  }, [])  
  return(
  <>
    <Animated>
      <div className='jumbotron text-center mainIndex'>
        <img src={Icon}/>
        <h2 className='card-title h2'>Dotmatriks LMS</h2>
        {/* //<p className='blue-text my-4 font-weight-bold'>Free and intuitive to use</p>
        <div className='row d-flex justify-content-center'>
          <div className='col-xl-7 pb-2'>
            <p className='card-text'>Based on WebRTC technology and websockets, the app creates peer-to-peer connection between streamer and watcher browser</p>
          </div>
        </div> */}
        <hr className='my-4' />
        <div className='pt-2'>
          {/* <Link to='stream' className='btn btn-round aqua-gradient'>Start Stream <span className='fas fa-broadcast-tower ml-1'></span></Link> */}
          <Link to={`/stream/?name=${newname}&room=${newroom}`} className='btn btn-round aqua-gradient'>Start Stream <span className='fas fa-broadcast-tower ml-1'></span></Link>
          <Link to={`/watch/?name=${newname}&room=${newroom}`} className='btn waves-effect purple-gradient btn-round'>Watch Another Stream <i className='fas fa-eye ml-1'></i></Link>
        </div>
      </div>
    </Animated>
  </>
  )
 }

export default Index
