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
                <div className="outgoing_msg">
                  <div className="sent_msg">
                    <p>{text}</p>
                    <span className="time_date">{time}</span> 
                  </div>
                </div>
              )
              :(
                <div className="incoming_msg">
              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                   <p>{text}</p>
                      <span className="time_date">{time}</span>
                </div>
              </div>
            </div> 
              )
    )
}

export default ShowMessage
