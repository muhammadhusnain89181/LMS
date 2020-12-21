import { useState, useEffect } from 'react'
import Peer from 'peerjs'

const useMyPeer = (id, opts) => {
  const [peer, setPeer] = useState(null)

  useEffect(() => {
    console.log(`usepeer called peer ${peer}`); 
    const newPeer = new Peer(id,{
                  //host: 'https://9000-a8e36848-425b-437e-aab7-5db39f754c5a.ws-eu01.gitpod.io',
                  //host:'localhost',
                  //host:'0.peerjs.com/',
                  host:'dotmatriks.herokuapp.com',                  
                  port: 443,
                  transports: ['websocket'],
                  path: '/',
                  key:'peerjs',
                  secure: true
                });
                 //setPeer(newPeer);
    newPeer.on('open', () => {
      console.log(`usepeer.open : ${peer}`); 
      setPeer(newPeer)
    })

    newPeer.on('close', () => {
      console.log(`usepeer.close  : ${peer}`); 
      setPeer(null)
    })
    console.log(`exported peer is : ${peer}`);  
    return () => newPeer.destroy()
   }, [])
   console.log(`useMyPeer : ${peer}`);
  return peer
}

export default useMyPeer