import React from 'react'

function ShowMessage({message:{text,user},name}) {
  let date=new Date();
  let time=date.getHours() +' : '+ date.getMinutes();
let isSentByCurrentUser = false;
  if(user === name) {
    isSentByCurrentUser = true;
  }
    return (
        isSentByCurrentUser
              ? (
                <div class="outgoing_msg">
                  <div class="sent_msg">
                    <p>{text}</p>
                    <span class="time_date">{time}</span> 
                  </div>
                </div>
              )
              :(
                <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt={name}/> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                   <p>{text}</p>
                      <span class="time_date">{time}</span>
                </div>
              </div>
            </div> 
              )
    )
}

export default ShowMessage
