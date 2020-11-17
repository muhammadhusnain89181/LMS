import React,{useState,useEffect} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Chat/Messages/Message/Message';

const Chatmodule=({messages,name})=>{
    return (
        <form>
            <div class="form-group">
            <ScrollToBottom className="messages">
                {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
            </ScrollToBottom>
            </div>
            <div class="form-group" style={{marginBottom:"5px"}}>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
        </form>
    )
}
export default Chatmodule