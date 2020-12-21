import { useState, useEffect } from 'react'
import Peer from 'peerjs'
const Peer=(id)=>{
    const [peer,setPeer]=useState(null);
    useEffect(()=>{
        const newPeer=new Peer(id);
        newPeer.on('open')
    })
}