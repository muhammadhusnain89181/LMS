import React,{useState,useEffect} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Chat/Messages/Message/Message';
import EmptyEmbed from '../layouts/EmptyEmbed'

import '../ChatModule/ChatModule.css'

const Chatmodule=({messages,name})=>{
    const [stream, setstream] = useState('');
    const [videoRef, setvideoRef] = useState('');
    const [doAllowRD, setDoAllowRD] = useState('');
    const [isRDEActive, setisRDEActive] = useState('');
    return (
        <div class="jumbotron">
        <div class="container-fluid">
          <div class="row-fluid">
            <div class="col-xs-4">
            <div className='status-badges'>
                  <div className='text-muted mt-1'>
                      <button type='button' className={`btn btn-outline-success waves-effect btn-round ${stream === null ? '' : 'disabled'}`}>Start <span className='fas fa-play ml-1'></span></button>
                  </div>
                  <div className='text-muted mt-1'>
                      <button type='button' className={`btn btn-outline-danger waves-effect btn-round ${stream !== null ? '' : 'disabled'}`}>Stop <i className='fas fa-stop'></i></button>
                  </div>
              </div><hr/>
            </div>
            <div class="col-xs-4">
              {/* <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> */}
              <div className='embed-responsive embed-responsive-16by9'>
                   {  stream ? <video ref={videoRef} className='embed-responsive-item' autoPlay /> : <EmptyEmbed />  }
              </div>  <hr className='my-4' />
              {isRDEActive  ? (
                  <div className='custom-control custom-checkbox'>
                    <input onChange={() => setDoAllowRD(!doAllowRD)} type='checkbox' className='custom-control-input' id='defaultChecked2'/>
                    <label className='custom-control-label' htmlFor='defaultChecked2'>Use Remote Desktop</label>
                  </div>
                ) : ''
              }
            </div>
           </div>
          </div>
         </div>
        //--//
        // <div className='jumbotron'>
        //     <div className='status-badges'>
        //         <div className='text-muted mt-1'>
        //             <button type='button' className={`btn btn-outline-success waves-effect btn-round ${stream === null ? '' : 'disabled'}`}>Start <span className='fas fa-play ml-1'></span></button>
        //         </div>
        //         <div className='text-muted mt-1'>
        //             <button type='button' className={`btn btn-outline-danger waves-effect btn-round ${stream !== null ? '' : 'disabled'}`}>Stop <i className='fas fa-stop'></i></button>
        //         </div>
        //     </div><hr/>
        //     <div className='embed-responsive embed-responsive-16by9'>
        //          {  stream ? <video ref={videoRef} className='embed-responsive-item' autoPlay /> : <EmptyEmbed />  }
        //     </div>  <hr className='my-4' />
        //     {isRDEActive  ? (
        //         <div className='custom-control custom-checkbox'>
        //           <input onChange={() => setDoAllowRD(!doAllowRD)} type='checkbox' className='custom-control-input' id='defaultChecked2'/>
        //           <label className='custom-control-label' htmlFor='defaultChecked2'>Use Remote Desktop</label>
        //         </div>
        //       ) : ''
        //     }
        //   </div>
            
    )
}
export default Chatmodule