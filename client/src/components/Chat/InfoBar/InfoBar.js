import React from 'react';
import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';
import './InfoBar.css';

const InfoBar = ({ name,room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    {/* <h2 className="roomname">{room}</h2> */}
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;