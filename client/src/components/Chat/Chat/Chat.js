import React, { useState, useEffect } from "react";
//import queryString from 'query-string';
import io from "socket.io-client";
import { useAlert } from 'react-alert'
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import SendIcon from '../icons/send.png'

import './Chat.css';
import ShowMessage from "./ShowMessage";

const Chat = ({ message,messages,name,setMessage,sendMessage }) => {
  return (
      <div class="messaging">
        <div class="mesgs">
          <div class="msg_history">
          { messages.map((message, i) => <div key={i}>
            <ShowMessage message={message} name={name} />
            </div>
            )
          }
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input type="text" class="write_msg" placeholder="Type a message" 
              value={message}
              onChange={({target:{value}})=>{setMessage(value)}}
              onKeyPress={event=>event.key==='Enter' ?sendMessage(event) : null}/>

              <button class="msg_send_btn" type="button" 
              onClick={e=>{sendMessage(e)}}><img src={SendIcon} alt="send" aria-hidden="true"/></button>
              {/* <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button> */}
            </div>
          </div>
        </div>
      </div>
  );
}
export default Chat;
